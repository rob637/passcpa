/**
 * 404 Not Found Page
 * 
 * Shown when a user navigates to a route that doesn't exist.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="text-center max-w-md">
        {/* 404 heading */}
        <h1 className="text-8xl font-bold text-primary-500 dark:text-primary-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
          Page Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/home"
            className="btn btn-primary inline-flex items-center justify-center gap-2 px-6 py-3"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
