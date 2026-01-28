/**
 * Written Communication Editor - Admin CRUD interface for WC tasks
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import {
  fetchAllWCTasks,
  addWCTask,
  updateWCTask,
  deleteWCTask,
  getWCStats,
} from '../../../services/wcService';
import type { WCTask, ExamSection, Difficulty } from '../../../types';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Save,
  X,
  AlertCircle,
  Loader,
  FileText,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import clsx from 'clsx';

// Admin email whitelist
const ADMIN_EMAILS = ['admin@voraprep.com'];

const EXAM_SECTIONS: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
const DIFFICULTY_LEVELS: Difficulty[] = ['easy', 'medium', 'hard'];

const WCEditor = () => {
  const { user, userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<WCTask | null>(null);
  
  // Data State
  const [tasks, setTasks] = useState<WCTask[]>([]);
  const [stats, setStats] = useState<{ section: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || ADMIN_EMAILS.includes(user?.email || ''));

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchAllWCTasks();
      setTasks(data);
      const statsData = await getWCStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error loading WC tasks:', err);
      setError('Failed to load WC tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadTasks();
    }
  }, [isAdmin, loadTasks]);

  // Form state
  const [formData, setFormData] = useState<{
    section: ExamSection;
    topic: string;
    difficulty: Difficulty;
    estimatedTime: number;
    scenario: string;
    instructions: string;
    sampleResponse: string;
  }>({
    section: 'FAR',
    topic: '',
    difficulty: 'medium',
    estimatedTime: 15,
    scenario: '',
    instructions: '',
    sampleResponse: '',
  });

  const resetForm = () => {
    setFormData({
      section: 'FAR',
      topic: '',
      difficulty: 'medium',
      estimatedTime: 15,
      scenario: '',
      instructions: '',
      sampleResponse: '',
    });
    setEditingTask(null);
    setIsEditing(false);
  };

  const handleEdit = (task: WCTask) => {
    setEditingTask(task);
    setFormData({
      section: task.section,
      topic: task.topic,
      difficulty: task.difficulty,
      estimatedTime: task.estimatedTime || 15,
      scenario: task.scenario || '',
      instructions: task.instructions || '',
      sampleResponse: task.sampleResponse || '',
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!formData.topic || !formData.scenario) {
      setError('Please fill in topic and scenario');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const taskData: Omit<WCTask, 'id'> = {
        section: formData.section,
        type: 'written_communication',
        topic: formData.topic,
        difficulty: formData.difficulty,
        estimatedTime: formData.estimatedTime,
        scenario: formData.scenario,
        instructions: formData.instructions,
        sampleResponse: formData.sampleResponse,
      };

      if (editingTask) {
        await updateWCTask(editingTask.id, taskData);
        setSuccessMessage('WC task updated successfully!');
      } else {
        await addWCTask(taskData);
        setSuccessMessage('WC task created successfully!');
      }

      resetForm();
      await loadTasks();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving WC task:', err);
      setError('Failed to save WC task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this WC task?')) return;

    setIsLoading(true);
    try {
      await deleteWCTask(id);
      await loadTasks();
      setSuccessMessage('WC task deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting WC task:', err);
      setError('Failed to delete WC task.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.scenario?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = selectedSection === 'all' || task.section === selectedSection;
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
                  <FileText className="w-6 h-6 text-purple-600" />
                  Written Communication Editor
                </h1>
                <p className="text-sm text-gray-500">Manage WC prompts and scenarios</p>
              </div>
            </div>
            <button
              onClick={() => { resetForm(); setIsEditing(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" />
              New WC Task
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {stats.map(({ section, count }) => (
            <div key={section} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500">{section}</div>
            </div>
          ))}
          <div className="bg-purple-50 p-4 rounded-lg shadow-sm border border-purple-200">
            <div className="text-2xl font-bold text-purple-700">{tasks.length}</div>
            <div className="text-sm text-purple-600">Total</div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {editingTask ? 'Edit WC Task' : 'Create New WC Task'}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Est. Time (minutes)</label>
                <input
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 15 }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Internal Control Memo"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Scenario</label>
              <textarea
                value={formData.scenario}
                onChange={(e) => setFormData(prev => ({ ...prev, scenario: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg font-mono text-sm"
                rows={6}
                placeholder="The business scenario that sets up the writing task..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions (optional)</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Specific instructions for the candidate..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sample Response (optional)</label>
              <textarea
                value={formData.sampleResponse}
                onChange={(e) => setFormData(prev => ({ ...prev, sampleResponse: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg font-mono text-sm"
                rows={6}
                placeholder="A model answer for reference..."
              />
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
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingTask ? 'Update' : 'Create'}
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
              placeholder="Search WC tasks..."
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

        {/* Tasks List */}
        {isLoading && !tasks.length ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Topic</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Section</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Difficulty</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTasks.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{task.topic}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">
                        {task.scenario?.substring(0, 100)}...
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm font-medium">
                        {task.section}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.estimatedTime}m
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx(
                        'px-2 py-1 rounded text-sm font-medium',
                        task.difficulty === 'easy' && 'bg-green-100 text-green-700',
                        task.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700',
                        task.difficulty === 'hard' && 'bg-red-100 text-red-700',
                      )}>
                        {task.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No WC tasks found
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

export default WCEditor;
