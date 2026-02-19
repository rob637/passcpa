import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Mail, CheckCircle, XCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { logger } from '../../utils/logger';

/**
 * Email Unsubscribe Page
 * 
 * Handles email unsubscription for marketing/drip emails.
 * - Logged in users: Immediate one-click unsubscribe
 * - Logged out users with email param: Look up and unsubscribe
 * - Logged out users without email: Show email input form
 */
const Unsubscribe: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get('email');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState(emailParam || '');
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-unsubscribe for logged-in users
  useEffect(() => {
    if (!authLoading && user && status === 'idle') {
      handleUnsubscribeLoggedIn();
    }
  }, [user, authLoading, status]);

  // Auto-unsubscribe if email param is provided
  useEffect(() => {
    if (!authLoading && !user && emailParam && status === 'idle') {
      handleUnsubscribeByEmail(emailParam);
    }
  }, [emailParam, authLoading, user, status]);

  const handleUnsubscribeLoggedIn = async () => {
    if (!user) return;
    
    setStatus('loading');
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        emailUnsubscribed: true,
        emailUnsubscribedAt: new Date()
      });
      logger.info('User unsubscribed from emails', { uid: user.uid });
      setStatus('success');
    } catch (error) {
      logger.error('Failed to unsubscribe', { error });
      setErrorMessage('Something went wrong. Please try again or contact support.');
      setStatus('error');
    }
  };

  const handleUnsubscribeByEmail = async (emailToUnsubscribe: string) => {
    setStatus('loading');
    try {
      // Look up user by email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', emailToUnsubscribe.toLowerCase().trim()));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        // No user found - still show success (don't reveal if email exists)
        logger.info('Unsubscribe attempted for non-existent email', { email: emailToUnsubscribe });
        setStatus('success');
        return;
      }
      
      // Update the user's document
      const userDoc = snapshot.docs[0];
      await updateDoc(userDoc.ref, {
        emailUnsubscribed: true,
        emailUnsubscribedAt: new Date()
      });
      
      logger.info('User unsubscribed by email', { email: emailToUnsubscribe });
      setStatus('success');
    } catch (error) {
      logger.error('Failed to unsubscribe by email', { error, email: emailToUnsubscribe });
      setErrorMessage('Something went wrong. Please try again or contact support.');
      setStatus('error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      handleUnsubscribeByEmail(email.trim());
    }
  };

  // Loading state
  if (authLoading || (status === 'loading')) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Processing your request...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            You've been unsubscribed
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You won't receive any more marketing emails from VoraPrep. 
            You'll still receive essential account emails (password resets, purchase confirmations).
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to VoraPrep
          </Link>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {errorMessage}
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Idle state - show form for logged-out users
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-8">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Unsubscribe from emails
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          Enter your email address to unsubscribe from VoraPrep marketing emails.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary py-3"
          >
            Unsubscribe
          </button>
        </form>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
          This only unsubscribes you from marketing emails. You'll still receive 
          essential account emails like password resets and purchase confirmations.
        </p>
      </div>
    </div>
  );
};

export default Unsubscribe;
