/**
 * TBS Editor - Admin CRUD interface for Task-Based Simulations
 */

import { useState, useEffect, useCallback } from 'react';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { fetchAllTBS, addTBS, updateTBS, deleteTBS } from '../../../services/tbsService';
import type { TBS, ExamSection, Difficulty } from '../../../types';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Save,
  X,
  AlertCircle,
  Loader,
  Grid3X3,
  Clock,
  ArrowLeft,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import clsx from 'clsx';

// Admin email whitelist
const ADMIN_EMAILS = ['admin@voraprep.com'];

const EXAM_SECTIONS: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
const DIFFICULTY_LEVELS: Difficulty[] = ['easy', 'medium', 'hard'];
const TBS_TYPES = [
  'journal_entry',
  'document_review',
  'research',
  'reconciliation',
  'calculation',
  'analysis',
];

// Local types for TBS editor form (simplified for editing)
interface EditorTBSQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

interface EditorTBSExhibit {
  id: string;
  title: string;
  type: string;
  content: string;
}

const TBSEditor = () => {
  const { user, userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTBS, setEditingTBS] = useState<TBS | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState(true);
  const [expandedExhibits, setExpandedExhibits] = useState(true);

  // Data State
  const [tbsList, setTBSList] = useState<TBS[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email || ''));

  const loadTBS = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchAllTBS();
      setTBSList(data);
    } catch (err) {
      logger.error('Error loading TBS:', err);
      setError('Failed to load TBS. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadTBS();
    }
  }, [isAdmin, loadTBS]);

  // Form state
  const [formData, setFormData] = useState<{
    section: ExamSection;
    type: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    estimatedTime: number;
    scenario: string;
    exhibits: EditorTBSExhibit[];
    questions: EditorTBSQuestion[];
    blueprintArea: string;
  }>({
    section: 'FAR',
    type: 'journal_entry',
    title: '',
    description: '',
    difficulty: 'medium',
    estimatedTime: 20,
    scenario: '',
    exhibits: [],
    questions: [],
    blueprintArea: '',
  });

  const resetForm = () => {
    setFormData({
      section: 'FAR',
      type: 'journal_entry',
      title: '',
      description: '',
      difficulty: 'medium',
      estimatedTime: 20,
      scenario: '',
      exhibits: [],
      questions: [],
      blueprintArea: '',
    });
    setEditingTBS(null);
    setIsEditing(false);
  };

  const handleEdit = (tbs: TBS) => {
    setEditingTBS(tbs);
    setFormData({
      section: tbs.section,
      type: tbs.type,
      title: tbs.title || '',
      description: tbs.description || '',
      difficulty: tbs.difficulty,
      estimatedTime: tbs.estimatedTime || 20,
      scenario: tbs.scenario || '',
      // Cast TBS types to editor types (editor uses simplified forms)
      exhibits: (tbs.exhibits || []) as EditorTBSExhibit[],
      questions: (tbs.questions || []) as EditorTBSQuestion[],
      blueprintArea: tbs.blueprintArea || '',
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.scenario) {
      setError('Please fill in title and scenario');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const tbsData: Omit<TBS, 'id'> = {
        section: formData.section,
        type: formData.type as TBS['type'],
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        estimatedTime: formData.estimatedTime,
        scenario: formData.scenario,
        // Cast editor types to TBS types (editor uses simplified forms)
        exhibits: formData.exhibits as TBS['exhibits'],
        questions: formData.questions as TBS['questions'],
        blueprintArea: formData.blueprintArea,
      };

      if (editingTBS) {
        await updateTBS(editingTBS.id, tbsData);
        setSuccessMessage('TBS updated successfully!');
      } else {
        await addTBS(tbsData);
        setSuccessMessage('TBS created successfully!');
      }

      resetForm();
      await loadTBS();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error saving TBS:', err);
      setError('Failed to save TBS. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this TBS?')) return;

    setIsLoading(true);
    try {
      await deleteTBS(id);
      await loadTBS();
      setSuccessMessage('TBS deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error deleting TBS:', err);
      setError('Failed to delete TBS.');
    } finally {
      setIsLoading(false);
    }
  };

  // Question management
  const addQuestion = () => {
    const newQuestion: EditorTBSQuestion = {
      id: `q-${Date.now()}`,
      type: 'multiple_choice',
      prompt: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      points: 1,
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (index: number, field: keyof EditorTBSQuestion, value: unknown) => {
    const updated = [...formData.questions];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, questions: updated }));
  };

  const removeQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  // Exhibit management
  const addExhibit = () => {
    const newExhibit: EditorTBSExhibit = {
      id: `ex-${Date.now()}`,
      title: '',
      type: 'document',
      content: '',
    };
    setFormData((prev) => ({
      ...prev,
      exhibits: [...prev.exhibits, newExhibit],
    }));
  };

  const updateExhibit = (index: number, field: keyof EditorTBSExhibit, value: unknown) => {
    const updated = [...formData.exhibits];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, exhibits: updated }));
  };

  const removeExhibit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      exhibits: prev.exhibits.filter((_, i) => i !== index),
    }));
  };

  // Filter TBS
  const filteredTBS = tbsList.filter((tbs) => {
    const matchesSearch =
      (tbs.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      tbs.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = selectedSection === 'all' || tbs.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  // Stats by section
  const stats = EXAM_SECTIONS.map((section) => ({
    section,
    count: tbsList.filter((t) => t.section === section).length,
  }));

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
                  <Grid3X3 className="w-6 h-6 text-orange-600" />
                  TBS Editor
                </h1>
                <p className="text-sm text-gray-500">Manage Task-Based Simulations</p>
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setIsEditing(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              <Plus className="w-4 h-4" />
              New TBS
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
          {stats.map(({ section, count }) => (
            <div key={section} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500">{section}</div>
            </div>
          ))}
          <div className="bg-orange-50 p-4 rounded-lg shadow-sm border border-orange-200">
            <div className="text-2xl font-bold text-orange-700">{tbsList.length}</div>
            <div className="text-sm text-orange-600">Total</div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {editingTBS ? 'Edit TBS' : 'Create New TBS'}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, section: e.target.value as ExamSection }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {EXAM_SECTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {TBS_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, difficulty: e.target.value as Difficulty }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {DIFFICULTY_LEVELS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Est. Time (min)
                </label>
                <input
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      estimatedTime: parseInt(e.target.value) || 20,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Lease Classification Analysis"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Brief description of what this TBS covers"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Blueprint Area</label>
              <input
                type="text"
                value={formData.blueprintArea}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, blueprintArea: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., I.A.1 - Revenue Recognition"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Scenario</label>
              <textarea
                value={formData.scenario}
                onChange={(e) => setFormData((prev) => ({ ...prev, scenario: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg font-mono text-sm"
                rows={6}
                placeholder="The main scenario/problem statement for this TBS..."
              />
            </div>

            {/* Exhibits Section */}
            <div className="border border-gray-200 rounded-lg mb-4">
              <button
                type="button"
                onClick={() => setExpandedExhibits(!expandedExhibits)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <span className="font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Exhibits ({formData.exhibits.length})
                </span>
                {expandedExhibits ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedExhibits && (
                <div className="p-4 border-t border-gray-200 space-y-4">
                  {formData.exhibits.map((exhibit, idx) => (
                    <div key={exhibit.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Exhibit {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeExhibit(idx)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          value={exhibit.title}
                          onChange={(e) => updateExhibit(idx, 'title', e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                          placeholder="Exhibit title"
                        />
                        <select
                          value={exhibit.type}
                          onChange={(e) => updateExhibit(idx, 'type', e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                        >
                          <option value="document">Document</option>
                          <option value="spreadsheet">Spreadsheet</option>
                          <option value="form">Form</option>
                          <option value="email">Email</option>
                        </select>
                      </div>
                      <textarea
                        value={exhibit.content}
                        onChange={(e) => updateExhibit(idx, 'content', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded font-mono text-sm"
                        rows={4}
                        placeholder="Exhibit content (can include markdown or HTML)..."
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExhibit}
                    className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 w-full justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    Add Exhibit
                  </button>
                </div>
              )}
            </div>

            {/* Questions Section */}
            <div className="border border-gray-200 rounded-lg mb-4">
              <button
                type="button"
                onClick={() => setExpandedQuestions(!expandedQuestions)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <span className="font-medium flex items-center gap-2">
                  <Grid3X3 className="w-4 h-4" />
                  Questions ({formData.questions.length})
                </span>
                {expandedQuestions ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedQuestions && (
                <div className="p-4 border-t border-gray-200 space-y-4">
                  {formData.questions.map((question, idx) => (
                    <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Question {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeQuestion(idx)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <select
                          value={question.type}
                          onChange={(e) => updateQuestion(idx, 'type', e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                        >
                          <option value="multiple_choice">Multiple Choice</option>
                          <option value="fill_in">Fill In</option>
                          <option value="dropdown">Dropdown</option>
                          <option value="numeric">Numeric</option>
                        </select>
                        <input
                          type="number"
                          value={question.points}
                          onChange={(e) =>
                            updateQuestion(idx, 'points', parseInt(e.target.value) || 1)
                          }
                          className="p-2 border border-gray-300 rounded"
                          placeholder="Points"
                        />
                      </div>
                      <textarea
                        value={question.prompt}
                        onChange={(e) => updateQuestion(idx, 'prompt', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        rows={2}
                        placeholder="Question prompt..."
                      />
                      {question.type === 'multiple_choice' && (
                        <div className="space-y-2 mb-2">
                          {(question.options || ['', '', '', '']).map((opt: string, optIdx: number) => (
                            <input
                              key={optIdx}
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOptions = [...(question.options || [])];
                                newOptions[optIdx] = e.target.value;
                                updateQuestion(idx, 'options', newOptions);
                              }}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder={`Option ${optIdx + 1}`}
                            />
                          ))}
                        </div>
                      )}
                      <input
                        type="text"
                        value={question.correctAnswer}
                        onChange={(e) => updateQuestion(idx, 'correctAnswer', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        placeholder="Correct answer"
                      />
                      <textarea
                        value={question.explanation}
                        onChange={(e) => updateQuestion(idx, 'explanation', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        rows={2}
                        placeholder="Explanation..."
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 w-full justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    Add Question
                  </button>
                </div>
              )}
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
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingTBS ? 'Update' : 'Create'}
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
              placeholder="Search TBS..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Sections</option>
            {EXAM_SECTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* TBS List */}
        {isLoading && !tbsList.length ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Section</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Difficulty
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTBS.map((tbs) => (
                  <tr key={tbs.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{tbs.title}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>{tbs.questions?.length || 0} questions</span>
                        <span>•</span>
                        <span>{tbs.exhibits?.length || 0} exhibits</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm font-medium">
                        {tbs.section}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">
                      {tbs.type.replace(/_/g, ' ')}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tbs.estimatedTime}m
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          'px-2 py-1 rounded text-sm font-medium',
                          tbs.difficulty === 'easy' && 'bg-green-100 text-green-700',
                          tbs.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700',
                          tbs.difficulty === 'hard' && 'bg-red-100 text-red-700'
                        )}
                      >
                        {tbs.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(tbs)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tbs.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTBS.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No TBS found
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

export default TBSEditor;
