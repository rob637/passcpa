import React, { useState, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  FileText,
  BookOpen,
  BarChart3,
  Settings,
  Users,
} from 'lucide-react';
import clsx from 'clsx';

// Admin email whitelist
const ADMIN_EMAILS = ['admin@passcpa.com'];

// Sample data structure
const EXAM_SECTIONS = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];

const QuestionEditor = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email));

  // Sample questions for demo (in production, these would come from Firestore)
  const [questions, setQuestions] = useState([
    {
      id: 'q-demo-1',
      section: 'FAR',
      topic: 'Revenue Recognition',
      subtopic: 'ASC 606',
      difficulty: 'medium',
      question: 'Under ASC 606, when should revenue be recognized?',
      options: [
        'When cash is received',
        'When a performance obligation is satisfied',
        'At the end of the reporting period',
        'When the contract is signed',
      ],
      correctAnswer: 1,
      explanation: 'Under ASC 606, revenue is recognized when a performance obligation is satisfied.',
      blueprintArea: 'Area I',
      reference: 'ASC 606-10-25',
    },
  ]);

  // Form state for new/edit question
  const [formData, setFormData] = useState({
    section: 'FAR',
    topic: '',
    subtopic: '',
    difficulty: 'medium',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    blueprintArea: '',
    reference: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSaveQuestion = () => {
    if (!formData.question || !formData.explanation) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingQuestion) {
      // Update existing
      setQuestions((prev) =>
        prev.map((q) => (q.id === editingQuestion.id ? { ...formData, id: editingQuestion.id } : q))
      );
    } else {
      // Add new
      const newQuestion = {
        ...formData,
        id: `q-${Date.now()}`,
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }

    resetForm();
  };

  const handleEditQuestion = (question) => {
    setFormData(question);
    setEditingQuestion(question);
    setIsEditing(true);
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      section: 'FAR',
      topic: '',
      subtopic: '',
      difficulty: 'medium',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      blueprintArea: '',
      reference: '',
    });
    setEditingQuestion(null);
    setIsEditing(false);
  };

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = selectedSection === 'all' || q.section === selectedSection;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesSection && matchesDifficulty;
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Access Denied
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            You don't have permission to access the admin area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Question Editor
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Create and manage exam questions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {user?.email}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Question
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={clsx('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="all">All Sections</option>
                  {EXAM_SECTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="all">All Levels</option>
                  {DIFFICULTY_LEVELS.map((d) => (
                    <option key={d} value={d} className="capitalize">{d}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {questions.length}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Total Questions</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {questions.filter((q) => q.difficulty === 'easy').length}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Easy</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">
              {questions.filter((q) => q.difficulty === 'medium').length}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Medium</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {questions.filter((q) => q.difficulty === 'hard').length}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Hard</div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
              Questions ({filteredQuestions.length})
            </h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium rounded">
                        {q.section}
                      </span>
                      <span className={clsx(
                        'px-2 py-0.5 text-xs font-medium rounded',
                        q.difficulty === 'easy' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                        q.difficulty === 'medium' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                        q.difficulty === 'hard' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      )}>
                        {q.difficulty}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{q.topic}</span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 line-clamp-2">
                      {q.question}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditQuestion(q)}
                      className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredQuestions.length === 0 && (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                No questions found. Create one to get started!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {editingQuestion ? 'Edit Question' : 'New Question'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Section and Difficulty */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Section *
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => handleInputChange('section', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    {EXAM_SECTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Difficulty *
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    {DIFFICULTY_LEVELS.map((d) => (
                      <option key={d} value={d} className="capitalize">{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Topic */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Topic *
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    placeholder="e.g., Revenue Recognition"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Subtopic
                  </label>
                  <input
                    type="text"
                    value={formData.subtopic}
                    onChange={(e) => handleInputChange('subtopic', e.target.value)}
                    placeholder="e.g., ASC 606"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Question *
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) => handleInputChange('question', e.target.value)}
                  rows={3}
                  placeholder="Enter the question text..."
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Answer Options */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Answer Options *
                </label>
                <div className="space-y-2">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={formData.correctAnswer === index}
                        onChange={() => handleInputChange('correctAnswer', index)}
                        className="w-4 h-4"
                      />
                      <span className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Select the radio button next to the correct answer
                </p>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Explanation *
                </label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => handleInputChange('explanation', e.target.value)}
                  rows={4}
                  placeholder="Explain why the correct answer is correct..."
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Reference */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Blueprint Area
                  </label>
                  <input
                    type="text"
                    value={formData.blueprintArea}
                    onChange={(e) => handleInputChange('blueprintArea', e.target.value)}
                    placeholder="e.g., Area I, Content Group A"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Reference
                  </label>
                  <input
                    type="text"
                    value={formData.reference}
                    onChange={(e) => handleInputChange('reference', e.target.value)}
                    placeholder="e.g., ASC 606-10-25, IRC §199A"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-slate-800 p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveQuestion}
                className="btn-primary flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingQuestion ? 'Update Question' : 'Save Question'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionEditor;
