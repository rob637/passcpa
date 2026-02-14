import React from 'react';
import { PageHeader } from '../navigation';
import Leaderboard from '../Leaderboard';
import { useCourse } from '../../hooks/useCourse';

const Community: React.FC = () => {
  const { course } = useCourse();
  const examName = course?.shortName || 'exam';
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHeader 
        title="Community" 
        subtitle={`See how you compare with other ${examName} candidates`}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Leaderboard />
      </div>
    </div>
  );
};

export default Community;
