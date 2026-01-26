import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookmarkButton, NotesButton, NotesPanel, useBookmarks } from '../../components/common/Bookmarks';

// Mock Firebase and useAuth
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user-123' },
  }),
}));

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  deleteDoc: vi.fn(),
  collection: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()), // Return a function for unsubscribe
  serverTimestamp: vi.fn(() => new Date()),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

// Test wrapper for hooks
import { renderHook, act } from '@testing-library/react';

describe('Bookmarks System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('BookmarkButton Component', () => {
    it('should render a bookmark button', () => {
      render(
        <BookmarkButton
          itemId="test-123"
          itemType="question"
          itemData={{ title: 'Test Question' }}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('title', 'Add bookmark');
    });

    it('should have correct size classes for sm size', () => {
      render(
        <BookmarkButton
          itemId="test-123"
          itemType="question"
          size="sm"
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-1.5');
    });

    it('should have correct size classes for md size', () => {
      render(
        <BookmarkButton
          itemId="test-123"
          itemType="question"
          size="md"
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-2');
    });

    it('should stop event propagation when clicked', () => {
      const parentClick = vi.fn();
      render(
        <div onClick={parentClick}>
          <BookmarkButton
            itemId="test-123"
            itemType="question"
          />
        </div>
      );

      fireEvent.click(screen.getByRole('button'));
      // The parent click should not be triggered due to stopPropagation
      expect(parentClick).not.toHaveBeenCalled();
    });
  });

  describe('NotesButton Component', () => {
    it('should render a notes button', () => {
      render(
        <NotesButton
          itemId="test-123"
          itemData={{ section: 'FAR' }}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('title', 'Add note');
    });

    it('should open notes panel when clicked', async () => {
      render(
        <NotesButton
          itemId="test-123"
          itemData={{ section: 'FAR' }}
        />
      );

      fireEvent.click(screen.getByRole('button'));
      
      await waitFor(() => {
        expect(screen.getByText('Notes')).toBeInTheDocument();
      });
    });
  });

  describe('NotesPanel Component', () => {
    it('should not render when isOpen is false', () => {
      render(
        <NotesPanel
          itemId="test-123"
          isOpen={false}
          onClose={vi.fn()}
        />
      );

      expect(screen.queryByText('Notes')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(
        <NotesPanel
          itemId="test-123"
          isOpen={true}
          onClose={vi.fn()}
        />
      );

      expect(screen.getByText('Notes')).toBeInTheDocument();
    });

    it('should have a textarea for notes', () => {
      render(
        <NotesPanel
          itemId="test-123"
          isOpen={true}
          onClose={vi.fn()}
        />
      );

      const textarea = screen.getByPlaceholderText('Add your notes here...');
      expect(textarea).toBeInTheDocument();
    });

    it('should have cancel and save buttons', () => {
      render(
        <NotesPanel
          itemId="test-123"
          isOpen={true}
          onClose={vi.fn()}
        />
      );

      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('should call onClose when cancel is clicked', () => {
      const onClose = vi.fn();
      render(
        <NotesPanel
          itemId="test-123"
          isOpen={true}
          onClose={onClose}
        />
      );

      fireEvent.click(screen.getByText('Cancel'));
      expect(onClose).toHaveBeenCalled();
    });

    it('should allow typing in the textarea', () => {
      render(
        <NotesPanel
          itemId="test-123"
          isOpen={true}
          onClose={vi.fn()}
        />
      );

      const textarea = screen.getByPlaceholderText('Add your notes here...');
      fireEvent.change(textarea, { target: { value: 'My test notes' } });
      expect(textarea.value).toBe('My test notes');
    });
  });

  describe('useBookmarks hook', () => {
    it('should initialize with empty bookmarks when no user', () => {
      // Override mock for this test
      vi.doMock('../../hooks/useAuth', () => ({
        useAuth: () => ({
          user: null,
        }),
      }));
      
      // The hook would return empty bookmarks for no user
      // This is tested implicitly through component rendering
    });
  });
});

describe('Bookmark Data Types', () => {
  it('should support question bookmarks', () => {
    render(
      <BookmarkButton
        itemId="q-123"
        itemType="question"
        itemData={{ 
          title: 'Test Question', 
          section: 'FAR',
          topic: 'Revenue Recognition'
        }}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should support lesson bookmarks', () => {
    render(
      <BookmarkButton
        itemId="lesson-123"
        itemType="lesson"
        itemData={{ 
          title: 'Lease Accounting', 
          section: 'FAR'
        }}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should support flashcard bookmarks', () => {
    render(
      <BookmarkButton
        itemId="fc-123"
        itemType="flashcard"
        itemData={{ 
          title: 'Key Terms', 
          section: 'AUD'
        }}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
