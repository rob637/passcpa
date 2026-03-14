/**
 * LinkedIn Posts Admin — Manage story-style LinkedIn posts
 * 
 * Features:
 * - View all posts by status (draft, approved, posted, failed)
 * - Full post preview
 * - Edit post content
 * - Approve posts for auto-posting
 * - Manual "Post Now" option
 * - Create new posts
 * 
 * Workflow:
 * 1. Posts start as 'draft'
 * 2. Admin reviews and approves → status becomes 'approved'
 * 3. Scheduled function posts on Mon/Wed/Fri → status becomes 'posted'
 */

import { useState, useEffect, useCallback } from 'react';
import {
  collection, query, orderBy, getDocs, doc, updateDoc, addDoc, deleteDoc,
  Timestamp, limit,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../../../config/firebase';
import {
  FileText, Check, X, Eye, Edit3, Plus,
  Calendar, RefreshCw, Send, Trash2, Clock, CheckCircle, AlertCircle,
  Filter, Linkedin, MessageSquare, User, ExternalLink,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import logger from '../../../utils/logger';

// ============================================================================
// Types
// ============================================================================

type PostStatus = 'draft' | 'approved' | 'posted' | 'failed';
type PostType = 'founder-story' | 'dear-candidate' | 'data-insight' | 'user-win' | 'industry';

interface LinkedInPost {
  id: string;
  content: string;
  type: PostType;
  author: string;
  status: PostStatus;
  scheduledFor?: Timestamp | null;
  approvedAt?: Timestamp;
  postedAt?: Timestamp;
  failedAt?: Timestamp;
  linkedInPostId?: string;
  postUrl?: string;
  error?: string;
  createdAt: Timestamp;
}

type FilterStatus = 'all' | PostStatus;

const POST_TYPE_LABELS: Record<PostType, { label: string; emoji: string }> = {
  'founder-story': { label: 'Founder Story', emoji: '📖' },
  'dear-candidate': { label: 'Dear Candidate', emoji: '✉️' },
  'data-insight': { label: 'Data Insight', emoji: '📊' },
  'user-win': { label: 'User Win', emoji: '🎉' },
  'industry': { label: 'Industry', emoji: '💡' },
};

const STATUS_STYLES: Record<PostStatus, { bg: string; text: string; icon: typeof Clock }> = {
  draft: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', icon: Edit3 },
  approved: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', icon: Clock },
  posted: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', icon: CheckCircle },
  failed: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: AlertCircle },
};

// Import posts from external file for cleaner code
import { LINKEDIN_POSTS } from '../../../data/linkedin-posts';

// ============================================================================
// Main Component
// ============================================================================

export default function LinkedInPosts() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<LinkedInPost | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('draft');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editType, setEditType] = useState<PostType>('founder-story');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<PostType>('founder-story');
  const [seeding, setSeeding] = useState(false);

  // Fisher-Yates shuffle for randomizing posts
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Seed sample posts (shuffled for variety)
  const handleSeedPosts = async () => {
    if (!confirm(`This will add ${LINKEDIN_POSTS.length} LinkedIn posts as drafts (shuffled order). Continue?`)) return;
    
    setSeeding(true);
    try {
      // Shuffle posts so they're not grouped by category
      const shuffledPosts = shuffleArray(LINKEDIN_POSTS);
      
      let added = 0;
      for (const post of shuffledPosts) {
        await addDoc(collection(db, 'linkedin_story_posts'), {
          content: post.content,
          type: post.type,
          author: post.author,
          exam: post.exam || null, // Optional exam tag
          status: 'draft' as PostStatus,
          scheduledFor: null,
          createdAt: Timestamp.now(),
        });
        added++;
      }
      alert(`Created ${added} posts as drafts (shuffled). Review and approve them to schedule for posting.`);
      loadPosts();
    } catch (err) {
      logger.error('[LinkedInPosts] Seed failed:', err);
      alert('Failed to seed posts. Check console for details.');
    } finally {
      setSeeding(false);
    }
  };

  // Load posts
  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      // Always load all posts and filter client-side for reliability
      // (Firestore composite indexes can take time to build)
      const q = query(
        collection(db, 'linkedin_story_posts'),
        orderBy('createdAt', 'desc'),
        limit(200),
      );

      const snapshot = await getDocs(q);
      let items: LinkedInPost[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as LinkedInPost));

      // Client-side filtering
      if (filterStatus !== 'all') {
        items = items.filter(post => post.status === filterStatus);
      }

      setPosts(items);
    } catch (err) {
      logger.error('[LinkedInPosts] Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Approve post
  const handleApprove = async (post: LinkedInPost) => {
    setActionLoading(post.id);
    try {
      await updateDoc(doc(db, 'linkedin_story_posts', post.id), {
        status: 'approved',
        approvedAt: Timestamp.now(),
      });
      loadPosts();
      setSelectedPost(null);
      logger.info(`[LinkedInPosts] Approved: ${post.id}`);
    } catch (err) {
      logger.error('[LinkedInPosts] Approve failed:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Reject/unpublish post (back to draft)
  const handleReject = async (post: LinkedInPost) => {
    setActionLoading(post.id);
    try {
      await updateDoc(doc(db, 'linkedin_story_posts', post.id), {
        status: 'draft',
      });
      loadPosts();
      setSelectedPost(null);
    } catch (err) {
      logger.error('[LinkedInPosts] Reject failed:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Post immediately using Cloud Function
  const handlePostNow = async (post: LinkedInPost) => {
    if (!confirm('Post this to LinkedIn immediately?')) return;
    
    setActionLoading(post.id);
    try {
      const postNow = httpsCallable(functions, 'postLinkedInStoryNow');
      const result = await postNow({ postId: post.id });
      logger.info('[LinkedInPosts] Posted immediately:', result.data);
      loadPosts();
      setSelectedPost(null);
    } catch (err: unknown) {
      const error = err as Error;
      logger.error('[LinkedInPosts] Post failed:', error);
      alert(`Failed to post: ${error.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete post
  const handleDelete = async (post: LinkedInPost) => {
    if (!confirm('Delete this post permanently?')) return;
    
    setActionLoading(post.id);
    try {
      await deleteDoc(doc(db, 'linkedin_story_posts', post.id));
      loadPosts();
      setSelectedPost(null);
    } catch (err) {
      logger.error('[LinkedInPosts] Delete failed:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Save edit
  const handleSaveEdit = async () => {
    if (!selectedPost) return;
    
    setActionLoading(selectedPost.id);
    try {
      await updateDoc(doc(db, 'linkedin_story_posts', selectedPost.id), {
        content: editContent,
        type: editType,
      });
      setEditMode(false);
      loadPosts();
      setSelectedPost(prev => prev ? { ...prev, content: editContent, type: editType } : null);
    } catch (err) {
      logger.error('[LinkedInPosts] Save failed:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Create new post
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    
    setActionLoading('new');
    try {
      await addDoc(collection(db, 'linkedin_story_posts'), {
        content: newPostContent.trim(),
        type: newPostType,
        author: 'Rob',
        status: 'draft',
        scheduledFor: null,
        createdAt: Timestamp.now(),
      });
      setShowNewPostForm(false);
      setNewPostContent('');
      setNewPostType('founder-story');
      loadPosts();
    } catch (err) {
      logger.error('[LinkedInPosts] Create failed:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Stats
  const draftCount = posts.filter(p => p.status === 'draft').length;
  const approvedCount = posts.filter(p => p.status === 'approved').length;
  const postedCount = posts.filter(p => p.status === 'posted').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">LinkedIn Posts</h1>
              <p className="text-sm text-gray-500">Manage story-style posts for LinkedIn</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={loadPosts}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="secondary"
              onClick={handleSeedPosts}
              disabled={seeding || loading}
            >
              {seeding ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-1" />
                  Seed Posts
                </>
              )}
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowNewPostForm(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              New Post
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard label="Drafts" value={draftCount} icon={Edit3} color="gray" />
          <StatsCard label="Approved" value={approvedCount} icon={Clock} color="blue" />
          <StatsCard label="Posted" value={postedCount} icon={CheckCircle} color="green" />
          <StatsCard 
            label="Next Post" 
            value={approvedCount > 0 ? 'Scheduled' : 'None'} 
            icon={Calendar} 
            color="purple"
            subtitle={approvedCount > 0 ? 'Mon/Wed/Fri 9 AM' : undefined}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-4 h-4 text-gray-400" />
          {(['draft', 'approved', 'posted', 'failed', 'all'] as FilterStatus[]).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Post List */}
          <div className="col-span-1 space-y-3">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : posts.length === 0 ? (
              <Card className="p-6 text-center">
                <MessageSquare className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No {filterStatus} posts</p>
              </Card>
            ) : (
              posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  selected={selectedPost?.id === post.id}
                  onClick={() => {
                    setSelectedPost(post);
                    setEditMode(false);
                    setEditContent(post.content);
                    setEditType(post.type);
                  }}
                />
              ))
            )}
          </div>

          {/* Post Preview / Editor */}
          <div className="col-span-2">
            {selectedPost ? (
              <Card className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {POST_TYPE_LABELS[selectedPost.type]?.emoji || '📝'}
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {POST_TYPE_LABELS[selectedPost.type]?.label || selectedPost.type}
                    </span>
                    <StatusBadge status={selectedPost.status} />
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Content */}
                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Post Type
                      </label>
                      <select
                        value={editType}
                        onChange={e => setEditType(e.target.value as PostType)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {Object.entries(POST_TYPE_LABELS).map(([key, { label, emoji }]) => (
                          <option key={key} value={key}>
                            {emoji} {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Post Content
                        <span className="float-right text-gray-400 font-normal">
                          {editContent.length}/3000
                        </span>
                      </label>
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        maxLength={3000}
                        rows={16}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="primary" onClick={handleSaveEdit} loading={actionLoading === selectedPost.id}>
                        Save Changes
                      </Button>
                      <Button variant="ghost" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm font-sans">
                        {selectedPost.content}
                      </pre>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {selectedPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {selectedPost.createdAt?.toDate().toLocaleDateString()}
                      </span>
                      <span>{selectedPost.content.length} chars</span>
                    </div>

                    {/* Posted URL */}
                    {selectedPost.postUrl && (
                      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <a
                          href={selectedPost.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-green-700 dark:text-green-300 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View on LinkedIn
                        </a>
                      </div>
                    )}

                    {/* Error */}
                    {selectedPost.error && (
                      <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-300 text-sm">
                        Error: {selectedPost.error}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.status === 'draft' && (
                        <>
                          <Button
                            variant="primary"
                            onClick={() => handleApprove(selectedPost)}
                            loading={actionLoading === selectedPost.id}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve for Posting
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setEditMode(true);
                              setEditContent(selectedPost.content);
                              setEditType(selectedPost.type);
                            }}
                          >
                            <Edit3 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </>
                      )}

                      {selectedPost.status === 'approved' && (
                        <>
                          <Button
                            variant="primary"
                            onClick={() => handlePostNow(selectedPost)}
                            loading={actionLoading === selectedPost.id}
                          >
                            <Send className="w-4 h-4 mr-1" />
                            Post Now
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleReject(selectedPost)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Back to Draft
                          </Button>
                        </>
                      )}

                      {selectedPost.status === 'failed' && (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() => handleApprove(selectedPost)}
                            loading={actionLoading === selectedPost.id}
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Retry
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setEditMode(true);
                              setEditContent(selectedPost.content);
                              setEditType(selectedPost.type);
                            }}
                          >
                            <Edit3 className="w-4 h-4 mr-1" />
                            Edit & Retry
                          </Button>
                        </>
                      )}

                      {selectedPost.status !== 'posted' && (
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(selectedPost)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </Card>
            ) : showNewPostForm ? (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Create New Post
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Post Type
                    </label>
                    <select
                      value={newPostType}
                      onChange={e => setNewPostType(e.target.value as PostType)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {Object.entries(POST_TYPE_LABELS).map(([key, { label, emoji }]) => (
                        <option key={key} value={key}>
                          {emoji} {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Post Content
                      <span className="float-right text-gray-400 font-normal">
                        {newPostContent.length}/3000
                      </span>
                    </label>
                    <textarea
                      value={newPostContent}
                      onChange={e => setNewPostContent(e.target.value)}
                      maxLength={3000}
                      rows={16}
                      placeholder="Write your story here..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={handleCreatePost}
                      loading={actionLoading === 'new'}
                      disabled={!newPostContent.trim()}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Create Draft
                    </Button>
                    <Button variant="ghost" onClick={() => setShowNewPostForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <Eye className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500">Select a post to preview</p>
                <p className="text-sm text-gray-400 mt-2">
                  Posts auto-publish Mon/Wed/Fri at 9 AM EST
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function PostCard({ post, selected, onClick }: { post: LinkedInPost; selected: boolean; onClick: () => void }) {
  const typeInfo = POST_TYPE_LABELS[post.type] || { label: post.type, emoji: '📝' };
  const preview = post.content.slice(0, 80).replace(/\n/g, ' ') + (post.content.length > 80 ? '...' : '');
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        selected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-transparent bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm">{typeInfo.emoji}</span>
        <span className="text-xs text-gray-500">{typeInfo.label}</span>
        <StatusBadge status={post.status} small />
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
        {preview}
      </p>
      <p className="text-xs text-gray-400 mt-2">
        {post.createdAt?.toDate().toLocaleDateString()}
      </p>
    </button>
  );
}

function StatusBadge({ status, small }: { status: PostStatus; small?: boolean }) {
  const style = STATUS_STYLES[status];
  const Icon = style.icon;
  
  return (
    <span className={`inline-flex items-center gap-1 ${small ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-sm'} rounded-full ${style.bg} ${style.text}`}>
      <Icon className={small ? 'w-3 h-3' : 'w-4 h-4'} />
      {status}
    </span>
  );
}

function StatsCard({ label, value, icon: Icon, color, subtitle }: { 
  label: string; 
  value: number | string; 
  icon: typeof Clock;
  color: 'gray' | 'blue' | 'green' | 'purple';
  subtitle?: string;
}) {
  const colors = {
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );
}
