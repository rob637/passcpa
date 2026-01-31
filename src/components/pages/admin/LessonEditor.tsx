/**
 * Lesson Editor - Admin CRUD interface for lessons
 */

import { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import {
  fetchAllLessons,
  addLesson,
  updateLesson,
  deleteLesson,
  getLessonStats,
} from '../../../services/lessonService';
import type { Lesson, ExamSection, Difficulty, LessonContentSection } from '../../../types';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Save,
  X,
  AlertCircle,
  Loader,
  BookOpen,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// Admin email whitelist
const ADMIN_EMAILS = ['admin@voraprep.com'];

const EXAM_SECTIONS: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
const DIFFICULTY_LEVELS: Difficulty[] = ['easy', 'medium', 'hard'];
const CONTENT_TYPES = ['text', 'list', 'table', 'callout', 'example', 'warning', 'summary'] as const;

const LessonEditor = () => {
  const { user, userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  
  // Data State
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [stats, setStats] = useState<{ total: number; bySection: Record<string, number> } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email || ''));

  const loadLessons = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchAllLessons();
      setLessons(data);
      const statsData = await getLessonStats();
      setStats(statsData);
    } catch (err) {
      logger.error('Error loading lessons:', err);
      setError('Failed to load lessons. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadLessons();
    }
  }, [isAdmin, loadLessons]);

  // Form state
  const [formData, setFormData] = useState<{
    section: ExamSection;
    title: string;
    description: string;
    order: number;
    duration: number;
    difficulty: Difficulty;
    topics: string;
    blueprintArea: string;
    contentSections: LessonContentSection[];
  }>({
    section: 'FAR',
    title: '',
    description: '',
    order: 0,
    duration: 30,
    difficulty: 'medium',
    topics: '',
    blueprintArea: '',
    contentSections: [{ title: 'Introduction', type: 'text', content: '' }],
  });

  const resetForm = () => {
    setFormData({
      section: 'FAR',
      title: '',
      description: '',
      order: 0,
      duration: 30,
      difficulty: 'medium',
      topics: '',
      blueprintArea: '',
      contentSections: [{ title: 'Introduction', type: 'text', content: '' }],
    });
    setEditingLesson(null);
    setIsEditing(false);
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormData({
      section: lesson.section,
      title: lesson.title,
      description: lesson.description,
      order: lesson.order,
      duration: lesson.duration,
      difficulty: lesson.difficulty,
      topics: lesson.topics?.join(', ') || '',
      blueprintArea: lesson.blueprintArea || '',
      contentSections: lesson.content?.sections || [{ title: 'Introduction', type: 'text', content: '' }],
    });
    setIsEditing(true);
  };

  const handleAddContentSection = () => {
    setFormData(prev => ({
      ...prev,
      contentSections: [...prev.contentSections, { title: '', type: 'text', content: '' }]
    }));
  };

  const handleRemoveContentSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contentSections: prev.contentSections.filter((_, i) => i !== index)
    }));
  };

  const handleContentSectionChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contentSections: prev.contentSections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      setError('Please fill in title and description');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const lessonData: Omit<Lesson, 'id'> = {
        section: formData.section,
        title: formData.title,
        description: formData.description,
        order: formData.order,
        duration: formData.duration,
        difficulty: formData.difficulty,
        topics: formData.topics.split(',').map(t => t.trim()).filter(Boolean),
        blueprintArea: formData.blueprintArea || undefined,
        content: { sections: formData.contentSections },
      };

      if (editingLesson) {
        await updateLesson(editingLesson.id, lessonData);
        setSuccessMessage('Lesson updated successfully!');
      } else {
        await addLesson(lessonData);
        setSuccessMessage('Lesson created successfully!');
      }

      resetForm();
      await loadLessons();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error saving lesson:', err);
      setError('Failed to save lesson. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;

    setIsLoading(true);
    try {
      await deleteLesson(id);
      await loadLessons();
      setSuccessMessage('Lesson deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error deleting lesson:', err);
      setError('Failed to delete lesson.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter lessons
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = selectedSection === 'all' || lesson.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don&apos;t have permission to access this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/cms" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Lesson Editor
                </h1>
                <p className="text-sm text-gray-500">Manage lesson content</p>
              </div>
            </div>
            <button
              onClick={() => { resetForm(); setIsEditing(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              New Lesson
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {successMessage}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-6">
          {stats && Object.entries(stats.bySection).map(([section, count]) => (
            <div key={section} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500">{section}</div>
            </div>
          ))}
          {stats && (
            <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
              <div className="text-2xl font-bold text-green-700">{stats.total}</div>
              <div className="text-sm text-green-600">Total</div>
            </div>
          )}
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {editingLesson ? 'Edit Lesson' : 'Create New Lesson'}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value as ExamSection }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {EXAM_SECTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as Difficulty }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {DIFFICULTY_LEVELS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Lesson title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Brief description of the lesson"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blueprint Area</label>
                <input
                  type="text"
                  value={formData.blueprintArea}
                  onChange={(e) => setFormData(prev => ({ ...prev, blueprintArea: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Area I"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Topics (comma-separated)</label>
              <input
                type="text"
                value={formData.topics}
                onChange={(e) => setFormData(prev => ({ ...prev, topics: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="topic1, topic2, topic3"
              />
            </div>

            {/* Content Sections */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Content Sections</label>
                <button
                  type="button"
                  onClick={handleAddContentSection}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add Section
                </button>
              </div>
              
              {formData.contentSections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                  <div className="flex items-center gap-4 mb-2">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleContentSectionChange(index, 'title', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      placeholder="Section title"
                    />
                    <select
                      value={section.type}
                      onChange={(e) => handleContentSectionChange(index, 'type', e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg"
                    >
                      {CONTENT_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {formData.contentSections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveContentSection(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <textarea
                    value={typeof section.content === 'string' ? section.content : JSON.stringify(section.content || '')}
                    onChange={(e) => handleContentSectionChange(index, 'content', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={4}
                    placeholder="Section content (text or JSON for complex types)"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingLesson ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lessons..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Sections</option>
            {EXAM_SECTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Lessons List */}
        {isLoading && !lessons.length ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Section</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Duration</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Difficulty</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLessons.map(lesson => (
                  <tr key={lesson.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{lesson.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">{lesson.description}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                        {lesson.section}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.duration}m
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx(
                        'px-2 py-1 rounded text-sm font-medium',
                        lesson.difficulty === 'easy' && 'bg-green-100 text-green-700',
                        lesson.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700',
                        lesson.difficulty === 'hard' && 'bg-red-100 text-red-700',
                      )}>
                        {lesson.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(lesson)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(lesson.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredLessons.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No lessons found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default LessonEditor;
