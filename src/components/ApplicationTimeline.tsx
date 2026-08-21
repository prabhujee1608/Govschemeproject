import React from 'react';
import { ClipboardList, FileText, Globe, CheckSquare, Compass, ShieldAlert } from 'lucide-react';
import { Scheme } from '@/data/schemes';

interface ApplicationTimelineProps {
  scheme: Scheme;
  onBack: () => void;
}

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({
  scheme,
  onBack
}) => {
  const steps = [
    {
      title: "Step 1: Check Eligibility Parameters",
      desc: "Confirm your detailed demographic parameters, age records, and annual income brackets align with requirements.",
      icon: Compass,
      color: "bg-orange-100 text-orange-600 border-orange-200"
    },
    {
      title: "Step 2: Assemble Documentation",
      desc: `Gather all mandatory certificates: ${scheme.requiredDocuments.slice(0, 3).join(', ')}, and other supporting records.`,
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600 border-indigo-200"
    },
    {
      title: "Step 3: Access Official Portal Link",
      desc: `Navigate to the authorized administrative landing page: ${scheme.officialUrl.replace('https://', '')}.`,
      icon: Globe,
      color: "bg-emerald-100 text-emerald-600 border-emerald-200"
    },
    {
      title: "Step 4: Register & File Application",
      desc: "Register a profile using your Aadhaar credentials, populate the official form layout, upload files, and send for review.",
      icon: ClipboardList,
      color: "bg-amber-100 text-amber-600 border-amber-200"
    },
    {
      title: "Step 5: Follow Registration Logs",
      desc: "Record your application ID, print confirmation proofs, and track progress using portal tracking indices.",
      icon: CheckSquare,
      color: "bg-purple-100 text-purple-600 border-purple-200"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto transition-colors">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Filing Timeline Guidance</span>
        <h3 className="text-xl font-bold text-indigo-950 dark:text-white mt-1">Applying for {scheme.name}</h3>
        <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">Review this structured timeline workflow to avoid filing issues.</p>
      </div>

      {/* Timeline stack */}
      <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 pl-6 space-y-8 mb-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative">
              {/* Icon Marker */}
              <div className={`absolute -left-10 top-0.5 h-8 w-8 rounded-full border flex items-center justify-center bg-white dark:bg-slate-805 shadow-sm dark:border-slate-700 ${step.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div>
                <h4 className="text-sm sm:text-base font-bold text-indigo-950 dark:text-white">{step.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 mt-1.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical warning */}
      <div className="p-4 bg-amber-50 dark:bg-amber-955/20 rounded-xl border border-amber-200 dark:border-amber-900/40 flex gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-300 mb-8">
        <ShieldAlert className="h-5.5 w-5.5 text-amber-600 dark:text-amber-450 flex-shrink-0" />
        <div>
          <span className="font-semibold">Important Trust Warning:</span> Always verify application details and eligibility parameters on the official government portal. Vaani-Setu displays guides based on database records but is not a portal submittal platform.
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={onBack}
          className="rounded-lg border border-slate-300 dark:border-slate-650 py-2.5 px-4 text-xs font-semibold text-slate-750 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition"
        >
          Back to list
        </button>

        <a
          href={scheme.officialUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-lg bg-orange-600 py-2.5 px-4 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 transition flex items-center justify-center gap-1.5"
        >
          Proceed to Official Portal
        </a>
      </div>

    </div>
  );
};
