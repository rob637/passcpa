import fs from 'fs';
const text = fs.readFileSync('src/test/components/pages/Settings.test.tsx', 'utf-8');
const searchStr = "vi.mock('../../../providers/CourseProvider'";
const mockStr = `vi.mock('../../../hooks/useStudyPlan', () => ({
  useStudyPlan: vi.fn(() => ({
    studyPlan: null,
    isLoading: false,
    error: null,
    updateStudyPlan: vi.fn(),
    refreshPlan: vi.fn(),
  })),
  default: vi.fn(() => ({
    studyPlan: null,
    isLoading: false,
    error: null,
    updateStudyPlan: vi.fn(),
    refreshPlan: vi.fn(),
  })),
}));\n\nvi.mock('../../../providers/CourseProvider'`;

if (text.includes(searchStr)) {
  fs.writeFileSync('src/test/components/pages/Settings.test.tsx', text.replace(searchStr, mockStr));
}
