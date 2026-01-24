// Question Bank Service
// Provides access to CPA exam questions from Firebase Firestore

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  writeBatch,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Fetch questions from Firebase with optional filters
 * Supports both legacy topicId and new Blueprint-based filtering
 */
export async function fetchQuestions(options = {}) {
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
    mode = 'random', // random, weak, review, exam
    excludeIds = [],
    cursor = null,
  } = options;

  try {
    const questionsRef = collection(db, 'questions');
    const constraints = [];

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
    if (difficulty && difficulty !== 'all') {
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

    // Filter excluded
    if (excludeIds.length > 0) {
      questions = questions.filter((q) => !excludeIds.includes(q.id));
    }

    // Shuffle and limit
    questions = shuffleArray(questions).slice(0, count);

    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

/**
 * Get a single question by ID
 */
export async function getQuestionById(questionId) {
  try {
    const questionRef = doc(db, 'questions', questionId);
    const snapshot = await getDoc(questionRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching question:', error);
    return null;
  }
}

/**
 * Get questions for weak areas based on user's performance
 */
export async function getWeakAreaQuestions(userId, section, count = 10) {
  try {
    // Get user's progress by topic
    const progressRef = doc(db, 'users', userId, 'progress', 'topics');
    const progressSnap = await getDoc(progressRef);
    const progress = progressSnap.exists() ? progressSnap.data() : {};

    // Find topics with accuracy < 70%
    const weakTopics = Object.entries(progress)
      .filter(([_, data]) => {
        const accuracy = data.correct / (data.attempted || 1);
        return accuracy < 0.7 && data.attempted >= 3;
      })
      .sort((a, b) => {
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
    const questions = [];
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
    console.error('Error fetching weak area questions:', error);
    return fetchQuestions({ section, count });
  }
}

/**
 * Get total question count for a section
 */
export async function getQuestionCount(section) {
  try {
    const questionsRef = collection(db, 'questions');
    const q = section ? query(questionsRef, where('section', '==', section)) : questionsRef;

    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting question count:', error);
    return 0;
  }
}

/**
 * Add a single question to Firestore
 */
export async function addQuestion(question) {
  try {
    const questionsRef = collection(db, 'questions');
    const docRef = await addDoc(questionsRef, {
      ...question,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding question:', error);
    throw error;
  }
}

/**
 * Seed questions to Firestore (batch)
 */
export async function seedQuestions(questions) {
  const batch = writeBatch(db);

  for (const question of questions) {
    const questionRef = doc(collection(db, 'questions'));
    batch.set(questionRef, {
      ...question,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await batch.commit();
  console.log(`Seeded ${questions.length} questions`);
  return questions.length;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
