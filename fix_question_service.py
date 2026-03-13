import re

with open('src/services/questionService.ts', 'r') as f:
    content = f.read()

replacement = """    let questions: Question[] = [];

    // Find courseId for this section
    let targetCourseId: CourseId | null = null;
    for (const [courseId, course] of Object.entries(COURSES)) {
      if (course.sections.some(s => s.id === section) || section.startsWith(courseId.toUpperCase() + '-')) {
        targetCourseId = courseId as CourseId;
        break;
      }
    }

    if (targetCourseId) {
      const { loadCourseData } = await import('./courseDataLoader');
      const courseData = await loadCourseData(targetCourseId);
      questions = courseData.questions.filter(q => q.section === section);
    } else {
      logger.warn(`Could not find course mapping for section ${section}`);
    }

    // LRU eviction"""

pattern = re.compile(r'    let questions: Question\[\] = \[\];.*?// LRU eviction', re.DOTALL)

new_content = pattern.sub(replacement, content)
print("Before:", len(content), "After:", len(new_content))

with open('src/services/questionService.ts', 'w') as f:
    f.write(new_content)
print("Replacement successful")
