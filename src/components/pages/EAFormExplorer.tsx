import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Search,
  ArrowLeft,
  Calendar,
  Layers,
  Info,
  ChevronRight,
  ArrowRightLeft,
  Book,
} from 'lucide-react';
import clsx from 'clsx';
import { IRS_FORM_GUIDE } from '../../data/ea/reference-data/irs-form-guide';

type FormEntry = {
  form: string;
  name: string;
  purpose: string;
  dueDate?: string;
  extension?: string;
  deadline?: string;
  notes?: string;
  keySchedules?: string[];
  triggers?: string[];
  related?: string;
  keyItems?: string[];
  threshold?: string;
  rate?: string;
  parts?: string[];
};

type FormCategory = {
  category: string;
  forms: FormEntry[];
};

const EAFormExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForm, setSelectedForm] = useState<FormEntry | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareForm, setCompareForm] = useState<FormEntry | null>(null);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return Object.values(IRS_FORM_GUIDE).filter(v => typeof v === 'object' && 'category' in v) as FormCategory[];
    
    // Filter categories to only those containing matching forms
    const result: FormCategory[] = [];
    
    Object.values(IRS_FORM_GUIDE).forEach((val) => {
      if (typeof val === 'object' && 'forms' in val) {
        const cat = val as FormCategory;
        const matchingForms = cat.forms.filter(f => 
          f.form.toLowerCase().includes(searchTerm.toLowerCase()) || 
          f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.purpose.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (matchingForms.length > 0) {
          result.push({ ...cat, forms: matchingForms });
        }
      }
    });
    return result;
  }, [searchTerm]);

  const handleFormSelect = (form: FormEntry) => {
    if (compareMode) {
      if (selectedForm && selectedForm.form === form.form) return;
      setCompareForm(form);
    } else {
      setSelectedForm(form);
      setCompareForm(null); // Reset compare if switching normally
    }
  };

  const toggleCompareMode = () => {
    if (compareMode) {
      setCompareMode(false);
      setCompareForm(null);
    } else {
      setCompareMode(true);
    }
  };

  const FormCard = ({ form, isComparison = false }: { form: FormEntry, isComparison?: boolean }) => (
    <div className={clsx("h-full overflow-y-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6", isComparison ? "border-indigo-200" : "")}>
       <div className="flex items-start justify-between mb-4">
         <div>
           <div className="text-3xl font-bold text-slate-800 font-mono mb-1">{form.form}</div>
           <div className="text-lg font-medium text-slate-600 leading-tight">{form.name}</div>
         </div>
         {isComparison && (
           <div className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold uppercase">
             Comparing
           </div>
         )}
       </div>

       <div className="space-y-6">
         <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
           <div className="flex items-center gap-2 text-blue-800 font-semibold mb-1">
             <Info className="w-4 h-4" /> Purpose
           </div>
           <p className="text-blue-900">{form.purpose}</p>
         </div>

         <div className="grid grid-cols-1 gap-4">
            {(form.dueDate || form.deadline) && (
              <div className="bg-slate-50 p-3 rounded-md">
                 <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
                   <Calendar className="w-4 h-4" /> Due Date / Deadline
                 </div>
                 <div className="text-slate-900">{form.dueDate || form.deadline}</div>
              </div>
            )}
            
            {(form.extension) && (
              <div className="bg-slate-50 p-3 rounded-md">
                 <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
                   <ClockIcon className="w-4 h-4" /> Extension
                 </div>
                 <div className="text-slate-900">{form.extension}</div>
              </div>
            )}
         </div>

         {/* Dynamic Attributes */}
         {(form.keySchedules || form.keyItems || form.parts) && (
            <div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2 border-b pb-1">
                <Layers className="w-4 h-4" /> Key Components
              </div>
              <ul className="space-y-1">
                {(form.keySchedules || form.keyItems || form.parts || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
         )}

         {(form.notes || form.related || form.threshold) && (
           <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2">
                <Book className="w-4 h-4" /> Notes & Thresholds
              </div>
              <ul className="space-y-2 text-sm text-amber-900">
                {form.threshold && <li><strong>Threshold:</strong> {form.threshold}</li>}
                {form.rate && <li><strong>Rate:</strong> {form.rate}</li>}
                {form.related && <li><strong>Related:</strong> {form.related}</li>}
                {form.notes && <li>{form.notes}</li>}
              </ul>
           </div>
         )}
       </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-50">
       {/* Header */}
       <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <Link to="/ea" className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
               <ArrowLeft className="w-5 h-5" />
             </Link>
             <div>
               <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                 <FileText className="w-6 h-6 text-indigo-600" />
                 Interactive Form Explorer
               </h1>
               <p className="text-sm text-slate-500">Visualize and compare IRS forms for the EA Exam</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={toggleCompareMode}
               className={clsx(
                 "btn-secondary flex items-center gap-2",
                 compareMode ? "bg-indigo-100 border-indigo-200 text-indigo-700" : ""
               )}
             >
               <ArrowRightLeft className="w-4 h-4" />
               {compareMode ? 'Exit Compare' : 'Compare Forms'}
             </button>
          </div>
       </div>

       <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-200">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search forms..." 
                   className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
               </div>
               {compareMode && (
                 <div className="mt-2 text-xs text-indigo-600 font-medium bg-indigo-50 p-2 rounded text-center">
                   Select a second form to compare
                 </div>
               )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-4">
              {filteredCategories.map((cat, i) => (
                <div key={i}>
                  <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {cat.category}
                  </div>
                  <div className="space-y-1">
                    {cat.forms.map((form) => {
                      const isActive = selectedForm?.form === form.form;
                      const isCompare = compareForm?.form === form.form;
                      
                      return (
                        <button
                          key={form.form}
                          onClick={() => handleFormSelect(form)}
                          className={clsx(
                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group",
                            isActive 
                              ? "bg-slate-100 text-slate-900 font-medium" 
                              : isCompare
                                ? "bg-indigo-50 text-indigo-700 font-medium border border-indigo-200"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          <span className="truncate">{form.form}</span>
                          {(isActive || isCompare) && <ChevronRight className="w-3 h-3 opacity-50" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden p-6 bg-slate-50">
             {!selectedForm ? (
               <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <FileText className="w-16 h-16 mb-4 opacity-20" />
                  <p>Select a form to view details</p>
               </div>
             ) : compareMode ? (
                <div className="h-full grid grid-cols-2 gap-6">
                   <FormCard form={selectedForm} />
                   {compareForm ? (
                     <FormCard form={compareForm} isComparison />
                   ) : (
                     <div className="border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 bg-slate-100/50">
                        <div className="text-center">
                          <ArrowRightLeft className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>Select a second form from the sidebar<br/>to compare</p>
                        </div>
                     </div>
                   )}
                </div>
             ) : (
               <div className="h-full max-w-3xl mx-auto">
                 <FormCard form={selectedForm} />
               </div>
             )}
          </div>
       </div>
    </div>
  );
};

const ClockIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default EAFormExplorer;
