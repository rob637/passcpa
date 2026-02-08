
import { CheckCircle, BookOpen, TrendingUp, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export default function CIAInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Certified Internal Auditor (CIA)
            </h1>
            <p className="text-xl text-amber-100 mb-8">
              Master the global benchmark for internal auditing. Our adaptive platform helps you pass all three parts of the CIA exam faster.
            </p>
            <div className="flex gap-4">
              <Button 
                variant="secondary"
                className="bg-white text-amber-700 hover:bg-amber-50"
                onClick={() => navigate('/cia/dashboard')}
              >
                Start Studying
              </Button>
              <Button 
                variant="ghost"
                className="border border-white text-white hover:bg-white/10"
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="elevated" className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Global Recognition</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">170+ Countries</p>
              </div>
          </Card>
          <Card variant="elevated" className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Certified Professionals</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">175,000+</p>
              </div>
          </Card>
          <Card variant="elevated" className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Salary Increase</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">Up to 51%</p>
              </div>
          </Card>
        </div>
      </div>

      {/* Content Section */}
      <div id="details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">Why Become a CIA?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Credibility & Respect</h3>
                  <p className="text-slate-600 dark:text-slate-400">The only globally recognized internal audit certification, instantly proving your expertise.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Career Advancement</h3>
                  <p className="text-slate-600 dark:text-slate-400">CIAs are more likely to hold senior internal audit positions and earn higher salaries.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Universal Skills</h3>
                  <p className="text-slate-600 dark:text-slate-400">Gain knowledge applicable across any industry, organization size, or geographic location.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 text-sm">1</span>
                  Part 1: Essentials
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Focuses on the basics of internal auditing, independence, objectivity, and governance.</p>
                <div className="flex items-center text-sm text-slate-500">
                  <BookOpen className="w-4 h-4 mr-2" /> 125 Questions • 2.5 Hours
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 text-sm">2</span>
                  Part 2: Practice
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Covers managing the internal audit function, planning, and performing engagements.</p>
                <div className="flex items-center text-sm text-slate-500">
                  <BookOpen className="w-4 h-4 mr-2" /> 100 Questions • 2.0 Hours
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 text-sm">3</span>
                  Part 3: Business Knowledge
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Addresses business acumen, simple accounting, IT, and financial management.</p>
                <div className="flex items-center text-sm text-slate-500">
                  <BookOpen className="w-4 h-4 mr-2" /> 100 Questions • 2.0 Hours
                </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
