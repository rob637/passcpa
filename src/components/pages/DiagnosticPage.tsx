/**
 * Public Diagnostic Quiz Page
 * 
 * This is the public-facing diagnostic quiz that can be shared
 * on forums, social media, etc. for lead capture.
 */

import { useParams } from 'react-router-dom';
import { DiagnosticQuiz } from './admin/DiagnosticLeadMagnet';

export default function DiagnosticPage() {
  const { configId } = useParams<{ configId: string }>();
  
  if (!configId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Diagnostic Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }
  
  return <DiagnosticQuiz configId={configId} />;
}
