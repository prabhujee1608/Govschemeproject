import React from 'react';
import { Mic, ArrowRight, UserCheck, Cpu, Search, FileSpreadsheet, ShieldAlert, Sparkles } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
            <Cpu className="h-3.5 w-3.5" /> Core System Architecture
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-indigo-950 sm:text-4xl">
            From One Conversation to Actionable Guidance
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            How Vaani-Setu transforms audio signals and natural chat queries into structured eligibility checklists.
          </p>
        </div>

        {/* Dynamic Graphic Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-7 items-center gap-4 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-inner">
          
          {/* Step 1: Input */}
          <div className="lg:col-span-1 flex flex-col items-center text-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-3 animate-pulse">
              <Mic className="h-6 w-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Voice Input</h4>
            <p className="text-[10px] text-slate-500 mt-1">Sanskrit, Hindi, Bengali, etc.</p>
          </div>

          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <ArrowRight className="h-6 w-6 text-orange-500" />
          </div>

          {/* Step 2: NLP */}
          <div className="lg:col-span-1 flex flex-col items-center text-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">NLU Engine</h4>
            <p className="text-[10px] text-slate-500 mt-1">Intent extraction & Translation</p>
          </div>

          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <ArrowRight className="h-orange-500 w-6 text-orange-500" />
          </div>

          {/* Step 3: Match Engine */}
          <div className="lg:col-span-1 flex flex-col items-center text-center p-4 bg-white rounded-xl border border-orange-200 shadow-md ring-2 ring-orange-500/20">
            <div className="h-12 w-12 rounded-full bg-orange-600 flex items-center justify-center text-white mb-3 shadow-md">
              <Search className="h-6 w-6" />
            </div>
            <h4 className="text-xs font-bold text-indigo-950">Match Engine</h4>
            <p className="text-[10px] text-slate-600 mt-1">Rules validation algorithm</p>
          </div>

          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <ArrowRight className="h-6 w-6 text-orange-500" />
          </div>

          {/* Step 4: Guidance */}
          <div className="lg:col-span-1 flex flex-col items-center text-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Checklist & Action</h4>
            <p className="text-[10px] text-slate-500 mt-1">Direct links & files ready</p>
          </div>

        </div>

        {/* Security Warning Box */}
        <div className="mt-8 flex gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-xs sm:text-sm">
          <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Trust & Integrity Protocol: </span>
            This AI engine matches credentials to rules stored in our schema layers. Eligibility reports are estimated results. Users must proceed to verify matches on certified government platforms before final submission.
          </div>
        </div>

      </div>
    </section>
  );
};
