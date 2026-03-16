import re

with open('src/services/questionService.ts', 'r') as f:
    content = f.read()

replacement = """    let questions: Question[] = [];

    // Automatically resolve the courseId for this section using COURSES registry
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
      questions = courseData.questions.filter((q: any) => q.section === section);
    } else {
      logger.warn(`Could not find a registered course containing section ${section}`);
    }

    // LRU eviction"""

pattern = re.compile(r'    let questions: Question\[\] = \[\];.*?// LRU eviction', re.DOTALL)

new_content = pattern.sub(replacement, content)

with open('src/services/questionService.ts', 'w') as f:
    f.write(new_content)

print("Updated questionService.ts")
