const fs = require('fs');
const path = require('path');

// Files to update (production code, not test files)
const filesToUpdate = [
  'src/services/questionService.ts',
  'src/services/lessonService.ts',
  'src/services/tbsService.ts',
  'src/services/wcService.ts',
  'src/services/pushNotifications.ts',
  'src/services/performance.ts',
  'src/services/analytics.ts',
  'src/services/offlineCache.ts',
  'src/services/errorTracking.ts',
  'src/services/aiService.ts',
  'src/services/subscription.ts',
  'src/services/notifications.ts',
  'src/providers/StudyProvider.tsx',
  'src/providers/AuthProvider.tsx',
  'src/data/lessonMatrix.ts',
  'src/config/blueprintConfig.ts',
  'src/main.tsx',
  'src/components/pages/Flashcards.tsx',
  'src/components/pages/ExamSimulator.tsx',
  'src/components/pages/WrittenCommunication.tsx',
  'src/components/pages/Progress.tsx',
  'src/components/pages/LessonMatrix.tsx',
  'src/components/pages/TimedQuiz.tsx',
  'src/components/pages/LessonViewer.tsx',
  'src/components/pages/auth/Register.tsx',
  'src/components/pages/auth/ForgotPassword.tsx',
  'src/components/pages/auth/Login.tsx',
  'src/components/pages/Dashboard.tsx',
  'src/components/pages/Lessons.tsx',
  'src/components/pages/AdminSeed.tsx',
  'src/components/pages/Settings.tsx',
  'src/components/pages/Practice.tsx',
  'src/components/pages/Onboarding.tsx',
  'src/components/pages/AITutor.tsx',
  'src/components/pages/Landing.tsx',
  'src/components/pages/admin/WCEditor.tsx',
  'src/components/pages/admin/QuestionEditor.tsx',
  'src/components/pages/admin/LessonEditor.tsx',
  'src/components/pages/admin/AdminCMS.tsx',
  'src/components/pages/admin/TBSEditor.tsx',
  'src/components/common/Bookmarks.tsx',
  'src/components/common/ErrorBoundary.tsx',
  'src/components/common/GlobalSearch.tsx',
  'src/components/common/QuestionFlagging.tsx',
];

let totalReplaced = 0;

filesToUpdate.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    console.log('Skipping (not found):', file);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  const originalContent = content;
  
  // Skip if no console statements
  if (!content.match(/console\./)) {
    return;
  }
  
  // Check if logger import already exists
  if (!content.includes("import logger from")) {
    // Determine relative path based on file location
    let relativePath;
    if (file.includes('pages/auth/') || file.includes('pages/admin/')) {
      relativePath = '../../../utils/logger';
    } else if (file.includes('pages/') || file.includes('common/')) {
      relativePath = '../../utils/logger';
    } else {
      relativePath = '../utils/logger';
    }
    
    // Add import after first import
    const importMatch = content.match(/^import[^;]+;/m);
    if (importMatch) {
      content = content.replace(importMatch[0], importMatch[0] + "\nimport logger from '" + relativePath + "';");
    }
  }
  
  // Replace console statements
  let count = 0;
  content = content.replace(/console\.log\(/g, () => { count++; return 'logger.log('; });
  content = content.replace(/console\.warn\(/g, () => { count++; return 'logger.warn('; });
  content = content.replace(/console\.error\(/g, () => { count++; return 'logger.error('; });
  content = content.replace(/console\.info\(/g, () => { count++; return 'logger.info('; });
  
  totalReplaced += count;
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content);
    console.log('Updated:', file, '(' + count + ' replacements)');
  }
});

console.log('\nTotal console statements replaced:', totalReplaced);
