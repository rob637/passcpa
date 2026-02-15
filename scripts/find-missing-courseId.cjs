/**
 * Find lessons missing courseId field
 */
const fs = require('fs');
const path = require('path');

const courseDirectories = [
  { course: 'cpa', dir: 'src/data/cpa/lessons' },
  { course: 'ea', dir: 'src/data/ea/lessons' },
  { course: 'cma', dir: 'src/data/cma/lessons' },
  { course: 'cia', dir: 'src/data/cia/lessons' },
  { course: 'cisa', dir: 'src/data/cisa/lessons' },
];

let totalMissing = 0;

for (const { course, dir } of courseDirectories) {
  if (!fs.existsSync(dir)) continue;
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find all lessons by looking for { followed by id:
    const lines = content.split('\n');
    let inLesson = false;
    let currentId = null;
    let hasCourseId = false;
    let lessonStart = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Start of a lesson object
      if (line.match(/^\s*{\s*$/) || line.match(/^\s*\[\s*$/)) {
        continue;
      }
      
      // Found id field - start tracking
      const idMatch = line.match(/^\s+id:\s*['"]([^'"]+)['"]/);
      if (idMatch) {
        // If we were tracking a lesson without courseId, report it
        if (currentId && !hasCourseId) {
          console.log(`Missing courseId: ${filePath} - ID: ${currentId} (line ${lessonStart})`);
          totalMissing++;
        }
        
        currentId = idMatch[1];
        hasCourseId = false;
        lessonStart = i + 1;
      }
      
      // Found courseId
      if (line.match(/^\s+courseId:/)) {
        hasCourseId = true;
      }
      
      // End of lesson (content: { or next id)
      if (line.match(/^\s+content:\s*{/)) {
        if (currentId && !hasCourseId) {
          console.log(`Missing courseId: ${filePath} - ID: ${currentId} (line ${lessonStart})`);
          totalMissing++;
        }
        currentId = null;
        hasCourseId = false;
      }
    }
  }
}

console.log(`\nTotal lessons missing courseId: ${totalMissing}`);
