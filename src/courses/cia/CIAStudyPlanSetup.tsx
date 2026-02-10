
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Save } from 'lucide-react';
import { CIASectionId, CIA_SECTION_CONFIG, generateCIAStudyPlan, CIAWeeklySchedule, DEFAULT_WEEKLY_SCHEDULE } from '../../utils/ciaStudyPlanner';
import { useAuth } from '../../hooks/useAuth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import logger from '../../utils/logger';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export default function CIAStudyPlanSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [examDates, setExamDates] = useState<Record<CIASectionId, Date | null>>({
    CIA1: null,
    CIA2: null,
    CIA3: null,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weeklySchedule, _setWeeklySchedule] = useState<CIAWeeklySchedule>(DEFAULT_WEEKLY_SCHEDULE);
  const [loading, setLoading] = useState(false);

  const handleDateSelect = (section: CIASectionId, date: Date | undefined) => {
    setExamDates(prev => ({
      ...prev,
      [section]: date || null
    }));
  };

  const handleSavePlan = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const plan = generateCIAStudyPlan(examDates, weeklySchedule);
      
      // Save to Firestore
      await setDoc(doc(db, 'users', user.uid, 'settings', 'ciaStudyPlan'), plan);
      
      logger.info('CIA Study plan saved', { planId: plan.id });
      navigate('/cia/dashboard');
    } catch (error) {
      logger.error('Failed to save study plan', error);
      // alert('Failed to save plan'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">Setup Your CIA Study Plan</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Tell us your exam dates and weekly availability to build a personalized roadmap.</p>

      <div className="grid gap-8">
        <Card>
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <CalendarIcon className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Exam Dates</h2>
          </div>
          
          <div className="space-y-6">
            {(Object.keys(CIA_SECTION_CONFIG) as CIASectionId[]).map((sectionId) => (
              <div key={sectionId} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: CIA_SECTION_CONFIG[sectionId].color }}>
                    {CIA_SECTION_CONFIG[sectionId].shortName}
                  </h3>
                  <p className="text-sm text-slate-500">{CIA_SECTION_CONFIG[sectionId].name}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Target Exam Date</label>
                  <input 
                    type="date"
                    className="input max-w-xs dark:[color-scheme:dark]"
                    onChange={(e) => handleDateSelect(sectionId, e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly schedule config could go here */}
        
        <div className="flex justify-end">
          <Button 
            variant="primary"
            size="lg"
            onClick={handleSavePlan} 
            disabled={loading}
            loading={loading}
            rightIcon={Save}
          >
            {loading ? 'Generating Plan...' : 'Create Study Plan'}
          </Button>
        </div>
      </div>
    </div>
  );
}
