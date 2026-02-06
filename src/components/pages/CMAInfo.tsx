import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Calendar, 
  Clock, 
  Users, 
  Briefcase, 
  CheckCircle, 
  BookOpen, 
  GraduationCap,
  Globe,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { CMA_COURSE } from '../../courses/cma';

const CMAInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
          Certified Management Accountant
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          The CMA® (Certified Management Accountant) certification is the global benchmark for 
          management accountants and financial professionals.
        </p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="card p-6 text-center hover:scale-105 transition-transform duration-300 border-purple-100 dark:border-purple-900/20 shadow-lg shadow-purple-900/5">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
            <Globe className="w-7 h-7" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">50%</div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Global Pass Rate</div>
        </div>
        
        <div className="card p-6 text-center hover:scale-105 transition-transform duration-300 border-emerald-100 dark:border-emerald-900/20 shadow-lg shadow-emerald-900/5">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
            <DollarSign className="w-7 h-7" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">+58%</div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Higher Salary</div>
        </div>

        <div className="card p-6 text-center hover:scale-105 transition-transform duration-300 border-blue-100 dark:border-blue-900/20 shadow-lg shadow-blue-900/5">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
            <Award className="w-7 h-7" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">2</div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Exam Parts</div>
        </div>

        <div className="card p-6 text-center hover:scale-105 transition-transform duration-300 border-orange-100 dark:border-orange-900/20 shadow-lg shadow-orange-900/5">
          <div className="bg-orange-100 dark:bg-orange-900/30 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
            <Clock className="w-7 h-7" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">12-18</div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Months Avg. Time</div>
        </div>
      </div>

      {/* Exam Structure */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-purple-600" />
          Exam Structure & Content
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {CMA_COURSE.sections.map((section, index) => (
            <div key={section.id} className="card overflow-hidden border-0 shadow-xl dark:shadow-2xl dark:shadow-slate-900/20">
              <div className={`h-2 w-full bg-gradient-to-r ${index === 0 ? 'from-purple-500 to-indigo-500' : 'from-indigo-500 to-blue-500'}`} />
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                      index === 0 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                    }`}>
                      {section.shortName}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {section.name.split(': ')[1]}
                    </h3>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-center min-w-[80px]">
                    <div className="text-sm text-slate-500 font-medium">Weight</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-slate-100">50%</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {section.blueprintAreas.map(area => (
                    <div key={area.id} className="flex items-start gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mt-2 group-hover:bg-purple-500 transition-colors" />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{area.name}</span>
                          <span className="text-slate-400 text-xs tabular-nums">{area.weight}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    4 Hours
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    100 MCQs + 2 Essays
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testing Windows */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 mb-16 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              When Can You Test?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              The CMA exam is offered during three testing windows each year. 
              You can take Part 1 and Part 2 in any order.
            </p>
            
            <div className="space-y-4">
              {[
                { window: 'January/February', status: 'Active Window' },
                { window: 'May/June', status: 'Upcoming' },
                { window: 'September/October', status: 'Upcoming' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 font-semibold text-slate-900 dark:text-slate-100">
                    {item.window}
                  </div>
                  <div className="text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8" />
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 relative z-10">
              Pass Requirements
            </h3>
            
            <ul className="space-y-5 relative z-10">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-slate-900 dark:text-slate-100">360 / 500 Score</span>
                  <span className="text-sm text-slate-500">Scaled score required to pass each part</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-slate-900 dark:text-slate-100">50% MCQ Correct</span>
                  <span className="text-sm text-slate-500">Must answer at least 50% of MCQs correctly to advance to essays</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-slate-900 dark:text-slate-100">Bachelor's Degree</span>
                  <span className="text-sm text-slate-500">Required for certification (not to take exam)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-slate-900 dark:text-slate-100">2 Years Experience</span>
                  <span className="text-sm text-slate-500">Professional experience in management accounting/finance</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link 
          to="/cma" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-purple-600/25 transition-all hover:-translate-y-1"
        >
          Start Your CMA Journey
          <TrendingUp className="w-5 h-5" />
        </Link>
        <div className="mt-4 text-sm text-slate-500">
          Already a member? <Link to="/login" className="text-purple-600 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default CMAInfo;
