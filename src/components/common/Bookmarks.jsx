import { useState, useEffect, useCallback } from 'react';
import { Bookmark, BookmarkCheck, StickyNote, X, Edit3, Trash2, Save, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { doc, setDoc, deleteDoc, collection, query, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import clsx from 'clsx';

// Hook for bookmarks and notes
export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState({});
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);

  // Load bookmarks and notes
  useEffect(() => {
    if (!user?.uid) {
      setBookmarks({});
      setNotes({});
      setLoading(false);
      return;
    }

    // Subscribe to bookmarks
    const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks');
    const unsubBookmarks = onSnapshot(bookmarksRef, (snapshot) => {
      const data = {};
      snapshot.docs.forEach((doc) => {
        data[doc.id] = { id: doc.id, ...doc.data() };
      });
      setBookmarks(data);
    });

    // Subscribe to notes
    const notesRef = collection(db, 'users', user.uid, 'notes');
    const unsubNotes = onSnapshot(notesRef, (snapshot) => {
      const data = {};
      snapshot.docs.forEach((doc) => {
        data[doc.id] = { id: doc.id, ...doc.data() };
      });
      setNotes(data);
      setLoading(false);
    });

    return () => {
      unsubBookmarks();
      unsubNotes();
    };
  }, [user?.uid]);

  // Toggle bookmark
  const toggleBookmark = useCallback(
    async (itemId, itemType, itemData = {}) => {
      if (!user?.uid) return;

      const bookmarkRef = doc(db, 'users', user.uid, 'bookmarks', itemId);

      if (bookmarks[itemId]) {
        await deleteDoc(bookmarkRef);
      } else {
        await setDoc(bookmarkRef, {
          type: itemType,
          createdAt: new Date(),
          ...itemData,
        });
      }
    },
    [user?.uid, bookmarks]
  );

  // Check if bookmarked
  const isBookmarked = useCallback(
    (itemId) => {
      return !!bookmarks[itemId];
    },
    [bookmarks]
  );

  // Save note
  const saveNote = useCallback(
    async (itemId, content, itemData = {}) => {
      if (!user?.uid) return;

      const noteRef = doc(db, 'users', user.uid, 'notes', itemId);

      if (!content.trim()) {
        await deleteDoc(noteRef);
      } else {
        await setDoc(
          noteRef,
          {
            content,
            updatedAt: new Date(),
            ...itemData,
          },
          { merge: true }
        );
      }
    },
    [user?.uid]
  );

  // Get note
  const getNote = useCallback(
    (itemId) => {
      return notes[itemId]?.content || '';
    },
    [notes]
  );

  // Get all bookmarks
  const getAllBookmarks = useCallback(() => {
    return Object.values(bookmarks).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [bookmarks]);

  // Get all notes
  const getAllNotes = useCallback(() => {
    return Object.values(notes).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [notes]);

  return {
    bookmarks,
    notes,
    loading,
    toggleBookmark,
    isBookmarked,
    saveNote,
    getNote,
    getAllBookmarks,
    getAllNotes,
  };
};

// Bookmark Button Component
export const BookmarkButton = ({ itemId, itemType, itemData, size = 'md' }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(itemId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleBookmark(itemId, itemType, itemData);
      }}
      className={clsx(
        'rounded-lg transition-colors',
        size === 'sm' && 'p-1.5',
        size === 'md' && 'p-2',
        bookmarked
          ? 'text-primary-600 bg-primary-50 hover:bg-primary-100'
          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
      )}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {bookmarked ? (
        <BookmarkCheck className={clsx(size === 'sm' ? 'w-4 h-4' : 'w-5 h-5')} />
      ) : (
        <Bookmark className={clsx(size === 'sm' ? 'w-4 h-4' : 'w-5 h-5')} />
      )}
    </button>
  );
};

// Notes Panel Component
export const NotesPanel = ({ itemId, itemData, isOpen, onClose }) => {
  const { getNote, saveNote } = useBookmarks();
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setContent(getNote(itemId));
    }
  }, [isOpen, itemId, getNote]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveNote(itemId, content, itemData);
    setIsSaving(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-warning-500" />
            <h3 className="font-semibold text-slate-900">Notes</h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add your notes here..."
            className="w-full h-40 p-3 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 p-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 btn-primary py-2.5 flex items-center justify-center gap-2"
          >
            {isSaving ? <span className="animate-spin">⏳</span> : <Save className="w-4 h-4" />}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Notes Button Component
export const NotesButton = ({ itemId, itemData, size = 'md' }) => {
  const { getNote } = useBookmarks();
  const [isOpen, setIsOpen] = useState(false);
  const hasNote = !!getNote(itemId);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={clsx(
          'rounded-lg transition-colors',
          size === 'sm' && 'p-1.5',
          size === 'md' && 'p-2',
          hasNote
            ? 'text-warning-600 bg-warning-50 hover:bg-warning-100'
            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
        )}
        title={hasNote ? 'Edit note' : 'Add note'}
      >
        <StickyNote className={clsx(size === 'sm' ? 'w-4 h-4' : 'w-5 h-5')} />
      </button>

      <NotesPanel
        itemId={itemId}
        itemData={itemData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default { useBookmarks, BookmarkButton, NotesButton, NotesPanel };
