// Question Bank Service
// Provides access to CPA exam questions from Firebase Firestore
// Supports multi-course architecture with backwards compatibility

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  writeBatch,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Question, ExamSection, Difficulty, CourseId } from '../types';
import { DEFAULT_COURSE_ID } from '../types/course';
import logger from '../utils/logger';

interface FetchQuestionsOptions {
  section?: ExamSection;
  topicId?: string;
  blueprintArea?: string;
  blueprintGroup?: string;
  blueprintTopic?: string;
  hr1Only?: boolean;
  difficulty?: Difficulty;
  count?: number;
  mode?: 'random' | 'weak' | 'review' | 'exam';
  excludeIds?: string[];
  cursor?: any;
  courseId?: CourseId; // Multi-course support
}

/**
 * Fetch questions from Firebase with optional filters
 * Supports both legacy topicId and new Blueprint-based filtering
 * @param options - Filter options including optional courseId
 */
export async function fetchQuestions(options: FetchQuestionsOptions = {}): Promise<Question[]> {
  const {
    section,
    topicId,
    // New Blueprint-based filters (2026 AICPA structure)
    blueprintArea,
    blueprintGroup,
    blueprintTopic,
    // H.R. 1 filter (for questions affected by July 2026 tax changes)
    hr1Only,
    difficulty,
    count = 10,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // mode = 'random', // random, weak, review, exam
    excludeIds = [],
    cursor = null,
    courseId = DEFAULT_COURSE_ID, // Multi-course support with backwards compatibility
  } = options;

  try {
    const questionsRef = collection(db, 'questions');
    const constraints: QueryConstraint[] = [];

    if (section) {
      constraints.push(where('section', '==', section));
    }
    // Legacy topic filter
    if (topicId) {
      constraints.push(where('topicId', '==', topicId));
    }
    // New Blueprint filters (2026)
    if (blueprintArea) {
      constraints.push(where('blueprintArea', '==', blueprintArea));
    }
    if (blueprintGroup) {
      constraints.push(where('blueprintGroup', '==', blueprintGroup));
    }
    if (blueprintTopic) {
      constraints.push(where('blueprintTopic', '==', blueprintTopic));
    }
    // H.R. 1 filter
    if (hr1Only) {
      constraints.push(where('hr1', '==', true));
    }
    if (difficulty) {
      constraints.push(where('difficulty', '==', difficulty));
    }

    constraints.push(limit(count * 2)); // Fetch extra to filter/shuffle

    if (cursor) {
      constraints.push(startAfter(cursor));
    }

    const q = query(questionsRef, ...constraints);
    const snapshot = await getDocs(q);

    let questions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filter by courseId (including legacy questions without courseId)
    questions = questions.filter((q: any) => {
      const questionCourseId = q.courseId || DEFAULT_COURSE_ID;
      return questionCourseId === courseId;
    });

    // Filter excluded
    if (excludeIds.length > 0) {
      questions = questions.filter((q) => !excludeIds.includes(q.id));
    }

    // Shuffle and limit
    const shuffled = shuffleArray(questions);
    
    if (shuffled.length === 0) {
      logger.log('No questions found in Firestore, attempting local fallback...');
      return await fetchLocalQuestions(options);
    }

    return shuffled.slice(0, count) as Question[];

  } catch (error) {
    logger.warn('Error fetching questions, failing back to local data:', error);
    return await fetchLocalQuestions(options);
  }
}

/**
 * Fallback to local data when Firestore is empty or fails
 */
async function fetchLocalQuestions(options: FetchQuestionsOptions): Promise<Question[]> {
  const { section, difficulty, count = 10, excludeIds = [] } = options;
  
  try {
    const localData = await import('../data/questions');
    let candidates: any[] = [];

    switch (section) {
      case 'FAR': candidates = localData.FAR_ALL; break;
      case 'AUD': candidates = localData.AUD_ALL; break;
      case 'REG': candidates = localData.REG_ALL; break;
      case 'BEC': candidates = localData.BEC_ALL; break;
      case 'BAR': candidates = localData.BAR_ALL; break;
      case 'ISC': candidates = localData.ISC_ALL; break;
      case 'TCP': candidates = localData.TCP_ALL; break;
      default: 
        // If no section specified, we might want to search all? 
        // For now, return empty to avoid massive memory usage unless needed
        candidates = [];
    }

    // Filter
    const filtered = candidates.filter(q => {
      if (difficulty && q.difficulty !== difficulty) return false;
      if (excludeIds.includes(q.id)) return false;
      return true;
    });

    const shuffled = shuffleArray(filtered);
    return shuffled.slice(0, count) as Question[];
  } catch (err) {
    logger.error('Local fallback failed:', err);
    return [];
  }
}

/**
 * Get a single question by ID
 */
export async function getQuestionById(questionId: string): Promise<Question | null> {
  try {
    const questionRef = doc(db, 'questions', questionId);
    const snapshot = await getDoc(questionRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Question;
    }
    return null;
  } catch (error) {
    logger.error('Error fetching question:', error);
    return null;
  }
}

/**
 * Get questions for weak areas based on user's performance
 */
export async function getWeakAreaQuestions(userId: string, section: ExamSection, count = 10): Promise<Question[]> {
  try {
    // Get user's progress by topic
    const progressRef = doc(db, 'users', userId, 'progress', 'topics');
    const progressSnap = await getDoc(progressRef);
    const progress = progressSnap.exists() ? progressSnap.data() : {};

    // Find topics with accuracy < 70%
    const weakTopics = Object.entries(progress)
      .filter(([_, data]: [string, any]) => {
        const accuracy = data.correct / (data.attempted || 1);
        return accuracy < 0.7 && data.attempted >= 3;
      })
      .sort((a: any, b: any) => {
        const accA = a[1].correct / (a[1].attempted || 1);
        const accB = b[1].correct / (b[1].attempted || 1);
        return accA - accB; // Weakest first
      })
      .map(([topicId]) => topicId);


    if (weakTopics.length === 0) {
      // No weak areas identified, return random questions
      return fetchQuestions({ section, count });
    }

    // Get questions from weak topics
    const questions: Question[] = [];
    const perTopic = Math.ceil(count / weakTopics.length);

    for (const topicId of weakTopics.slice(0, 3)) {
      const topicQuestions = await fetchQuestions({
        section,
        topicId,
        count: perTopic,
      });
      questions.push(...topicQuestions);
    }

    return shuffleArray(questions).slice(0, count);
  } catch (error) {
    logger.error('Error fetching weak area questions:', error);
    return fetchQuestions({ section, count });
  }
}

/**
 * Get total question count for a section
 */
export async function getQuestionCount(section?: ExamSection): Promise<number> {
  try {
    const questionsRef = collection(db, 'questions');
    const q = section ? query(questionsRef, where('section', '==', section)) : questionsRef;

    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    logger.error('Error getting question count:', error);
    return 0;
  }
}

/**
 * Add a single question to Firestore
 */
export async function addQuestion(question: Omit<Question, 'id'>): Promise<string> {
  try {
    const questionsRef = collection(db, 'questions');
    const docRef = await addDoc(questionsRef, {
      ...question,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    logger.error('Error adding question:', error);
    throw error;
  }
}

/**
 * Seed questions to Firestore (batch)
 */
export async function seedQuestions(questions: Question[]): Promise<number> {
  const batch = writeBatch(db);

  for (const question of questions) {
    const questionRef = doc(collection(db, 'questions'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = question; // Remove potentially existing ID
    batch.set(questionRef, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await batch.commit();
  logger.log(`Seeded ${questions.length} questions`);
  return questions.length;
}

/**
 * Update an existing question
 */
export async function updateQuestion(id: string, data: Partial<Question>): Promise<void> {
  try {
    const questionRef = doc(db, 'questions', id);
    await updateDoc(questionRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.error('Error updating question:', error);
    throw error;
  }
}

/**
 * Delete a question
 */
export async function deleteQuestion(id: string): Promise<void> {
  try {
    const questionRef = doc(db, 'questions', id);
    await deleteDoc(questionRef);
  } catch (error) {
    logger.error('Error deleting question:', error);
    throw error;
  }
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
