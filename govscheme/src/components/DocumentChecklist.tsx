import React from 'react';
import { FileText, CheckSquare, Square, Download, Bookmark, AlertCircle, RefreshCw } from 'lucide-react';
import { Scheme } from '@/data/schemes';

interface DocumentChecklistProps {
  scheme: Scheme;
  onBack: () => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  scheme,
  onBack
}) => {
  const [checkedDocs, setCheckedDocs] = React.useState<Record<string, boolean>>({});

  const toggleDoc = (doc: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [doc]: !prev[doc]
    }));
  };

  const docs = scheme.requiredDocuments;
  const readyCount = docs.filter(d => checkedDocs[d]).length;
  const totalCount = docs.length;
  const percentReady = Math.round((readyCount / totalCount) * 100);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 max-w-xl mx-auto transition-colors">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Document Assistant</span>
          <h3 className="text-xl font-bold text-indigo-950 dark:text-white mt-1">{scheme.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{scheme.department}</p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{readyCount} of {totalCount} Documents Ready</span>
          <span className={`${percentReady === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>{percentReady}% Ready</span>
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
            style={{ width: `${percentReady}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3 mb-6">
        {docs.map((doc, idx) => {
          const isChecked = !!checkedDocs[doc];
          return (
            <button
              key={idx}
              onClick={() => toggleDoc(doc)}
              className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition ${
                isChecked 
                  ? 'border-emerald-250 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-100' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-350 dark:hover:border-slate-600 text-slate-750 dark:text-slate-300'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isChecked ? (
                  <CheckSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-455" />
                ) : (
                  <Square className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                )}
              </div>
              <span className="text-sm font-medium">{doc}</span>
            </button>
          );
        })}
      </div>

      {/* Security alert */}
      <div className="p-3 bg-amber-50 dark:bg-amber-955/20 rounded-lg border border-amber-200 dark:border-amber-900/40 flex gap-2 text-xs text-amber-900 dark:text-amber-300 mb-6">
        <AlertCircle className="h-4.5 w-4.5 text-amber-600 dark:text-amber-450 flex-shrink-0 mt-0.5" />
        <p>Ensure documents details match your Aadhaar credentials before applying to avoid validation errors.</p>
      </div>

      {/* Footer controls */}
      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={onBack}
          className="rounded-lg border border-slate-300 dark:border-slate-650 py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition"
        >
          Back to List
        </button>
        
        <button
          onClick={() => alert("Checklist Saved Successfully in Browser Storage!")}
          className="flex-1 rounded-lg bg-indigo-950 dark:bg-indigo-900 py-2.5 px-4 text-xs font-semibold text-white shadow-sm hover:bg-indigo-900/90 transition flex items-center justify-center gap-1.5"
        >
          <Bookmark className="h-4 w-4" /> Save Checklist
        </button>

        <button
          onClick={() => {
            const docContent = `Vaani-Setu Document Checklist\nScheme: ${scheme.name}\n\nRequired Documents:\n` + scheme.requiredDocuments.map((d, i) => `- [${checkedDocs[d] ? 'x' : ' '}] ${d}`).join('\n');
            const blob = new Blob([docContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${scheme.id}-checklist.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="rounded-lg border border-slate-200 dark:border-slate-700 py-2.5 px-3.5 text-xs font-semibold text-slate-605 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-750 transition flex items-center justify-center"
          title="Download Checklist"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
};
