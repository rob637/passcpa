const fs = require('fs');
const path = require('path');

const fixes = JSON.parse(fs.readFileSync('ALL_EXAMS_CRITICAL_FIXES.json', 'utf8'));

// Group by exam and section to minimize file I/O
const fixesByFile = {};

fixes.forEach(fix => {
    // The report uses "cfp-pcr" for section, "cfp" for exam.
    // The file path is content/exam/section/questions.json
    const key = `${fix.exam}/${fix.section}`;
    if (!fixesByFile[key]) fixesByFile[key] = [];
    fixesByFile[key].push(fix);
});

Object.entries(fixesByFile).forEach(([fileKey, fileFixes]) => {
    const [exam, section] = fileKey.split('/');
    // Try lowercase path first
    let jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
    if (!fs.existsSync(jsonPath)) {
         jsonPath = path.join(__dirname, '..', 'content', exam, section.toUpperCase(), 'questions.json');
    }
    
    if (fs.existsSync(jsonPath)) {
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        let updated = 0;
        data.questions = data.questions.map(q => {
            const fix = fileFixes.find(f => f.id === q.id);
            if (fix) {
                console.log(`Fixing ${q.id}: Changing correctAnswer from ${q.correctAnswer} (${fix.currentAnswer}) to ${fix.proposedIndex} (${fix.proposedAnswer})`);
                q.correctAnswer = fix.proposedIndex;
                updated++;
            }
            return q;
        });
        
        if (updated > 0) {
            fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
            console.log(`Saved ${updated} fixes to ${fileKey}`);
        }
    } else {
        console.error(`Could not find file for ${fileKey}`);
    }
});
