import React from 'react';
import { CheckSquare, Square, Download, Bookmark, AlertCircle, Info, HelpCircle } from 'lucide-react';
import { Scheme } from '@/data/schemes';

interface DocumentChecklistProps {
  scheme: Scheme;
  recommendedSchemes?: Scheme[];
  onBack: () => void;
  language: string;
}

const docTranslations: Record<string, Record<string, string>> = {
  "Aadhaar Card": { "hi": "आधार कार्ड" },
  "Land Ownership Documents": { "hi": "भूमि स्वामित्व दस्तावेज" },
  "Bank Account Details": { "hi": "बैंक खाता विवरण" },
  "Mobile Number linked with Aadhaar": { "hi": "आधार से लिंक मोबाइल नंबर" },
  "Ration Card": { "hi": "राशन कार्ड" },
  "Income Certificate": { "hi": "आय प्रमाण पत्र" },
  "Affidavit of no pucca house": { "hi": "पक्के मकान न होने का हलफनामा" },
  "Bank Account Passbook": { "hi": "बैंक पासबुक विवरण" },
  "Mudra Application Form": { "hi": "मुद्रा आवेदन पत्र" },
  "Business Plan": { "hi": "व्यावसायिक योजना" },
  "PAN Card": { "hi": "पैन कार्ड" },
  "Address Proof of Business": { "hi": "व्यवसाय के पते का प्रमाण" },
  "Electricity Bill": { "hi": "बिजली बिल" },
  "Rooftop Ownership Proof": { "hi": "छत के स्वामित्व का प्रमाण" },
  "BPL Ration Card": { "hi": "बीपीएल राशन कार्ड" },
  "Address Proof": { "hi": "पते का प्रमाण" },
  "Caste Certificate": { "hi": "जाति प्रमाण पत्र" },
  "Age Proof": { "hi": "आयु प्रमाण पत्र" },
  "Disability Certificate": { "hi": "विकलांगता प्रमाण पत्र" },
  "Self-Declaration Form": { "hi": "स्व-घोषणा पत्र" },
  "Educational Certificates": { "hi": "शैक्षिक प्रमाण पत्र" },
  "Passport Size Photographs": { "hi": "पासपोर्ट आकार की तस्वीरें" }
};

const docGuidance: Record<string, { why: string; how: string }> = {
  "Land Ownership Documents": {
    why: "Required for farmer schemes (like PM-KISAN/PM-KUSUM) to verify cultivable land records.",
    how: "Apply online at your state Bhulekh portal (e.g., Bhulekh UP) or visit the local Patwari / Tehsildar office."
  },
  "Land Registry documents": {
    why: "Required for farmer schemes (like PM-KISAN/PM-KUSUM) to verify cultivable land records.",
    how: "Apply online at your state Bhulekh portal (e.g., Bhulekh UP) or visit the local Patwari / Tehsildar office."
  },
  "Income Certificate": {
    why: "Required for low-income schemes (like Ayushman Bharat) to verify financial eligibility.",
    how: "Apply at the state e-District portal online or visit the local Common Service Center (CSC) / Jan Seva Kendra."
  },
  "Aadhaar Card": {
    why: "Primary identity proof needed for Direct Benefit Transfer (DBT) verifications.",
    how: "Visit the nearest Aadhaar Enrolment Centre or update minor details on the UIDAI portal."
  },
  "Bank Account Details": {
    why: "Needed to transfer cash subsidies directly to your account.",
    how: "Open a PM Jan Dhan savings account at any local branch or Post Office with Aadhaar card."
  },
  "Bank Account Passbook": {
    why: "Needed to transfer cash subsidies directly to your account.",
    how: "Open a PM Jan Dhan savings account at any local branch or Post Office with Aadhaar card."
  },
  "Ration Card": {
    why: "Needed for food security or BPL family verification.",
    how: "Apply through your state food portal online or submit forms at the local Block Development Office."
  },
  "BPL Ration Card": {
    why: "Needed for food security or BPL family verification.",
    how: "Apply through your state food portal online or submit forms at the local Block Development Office."
  },
  "Electricity Bill": {
    why: "Required to verify solar power connection status for rooftop solar.",
    how: "Get a copy from the local electricity DISCOM office or download from the DISCOM portal."
  },
  "Rooftop Ownership Proof": {
    why: "Required to prove domestic building roof ownership for solar panels.",
    how: "Provide your property tax receipt or house registry deed."
  }
};

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  scheme,
  recommendedSchemes = [],
  onBack,
  language
}) => {
  const [viewMode, setViewMode] = React.useState<'single' | 'all'>('single');
  const [checkedDocs, setCheckedDocs] = React.useState<Record<string, boolean>>({});
  const [activeGuide, setActiveGuide] = React.useState<string | null>(null);

  const translateDoc = (doc: string): string => {
    if (language === 'en') return doc;
    return docTranslations[doc]?.[language] || doc;
  };

  const toggleDoc = (doc: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [doc]: !prev[doc]
    }));
  };

  // Get documents lists
  const singleDocs = scheme.requiredDocuments;
  
  // Aggregate all unique documents from recommended schemes
  const allRecommendedDocs = React.useMemo(() => {
    const list = new Set<string>();
    recommendedSchemes.forEach(s => {
      s.requiredDocuments.forEach(doc => list.add(doc));
    });
    // Fallback if none provided
    if (list.size === 0) {
      singleDocs.forEach(doc => list.add(doc));
    }
    return Array.from(list);
  }, [recommendedSchemes, singleDocs]);

  const activeDocs = viewMode === 'single' ? singleDocs : allRecommendedDocs;
  const readyCount = activeDocs.filter(d => checkedDocs[d]).length;
  const totalCount = activeDocs.length;
  const percentReady = Math.round((readyCount / totalCount) * 100) || 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 max-w-xl mx-auto transition-colors">
      
      {/* Tab Selector */}
      <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1 mb-6">
        <button
          onClick={() => setViewMode('single')}
          className={`flex-1 text-center py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            viewMode === 'single'
              ? 'bg-white dark:bg-slate-800 text-indigo-950 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {language === 'hi' ? `${scheme.name.split(' ')[0]} दस्तावेज` : 'This Scheme'}
        </button>
        <button
          onClick={() => setViewMode('all')}
          className={`flex-1 text-center py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            viewMode === 'all'
              ? 'bg-white dark:bg-slate-800 text-indigo-950 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {language === 'hi' ? 'सभी योजनाओं के दस्तावेज़' : 'Documents needed for all my schemes'}
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
            {language === 'hi' ? 'स्मार्ट दस्तावेज़ प्रबंधक' : 'Smart Document Manager'}
          </span>
          <h3 className="text-lg font-bold text-indigo-950 dark:text-white mt-0.5">
            {viewMode === 'single' ? scheme.name : (language === 'hi' ? 'एकत्रित दस्तावेज़ सूची' : 'Combined Welfare Documents Checklist')}
          </h3>
          {viewMode === 'single' && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{scheme.department}</p>
          )}
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>
            {language === 'hi' 
              ? `${readyCount} / ${totalCount} दस्तावेज़ तैयार` 
              : `${readyCount} of ${totalCount} Documents Ready`
            }
          </span>
          <span className={`${percentReady === 100 ? 'text-emerald-605 dark:text-emerald-400 font-bold' : 'text-slate-550'}`}>
            {percentReady}% {language === 'hi' ? 'तैयार' : 'Ready'}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
            style={{ width: `${percentReady}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-4 mb-6">
        {activeDocs.map((doc, idx) => {
          const isChecked = !!checkedDocs[doc];
          const hasGuidance = !!docGuidance[doc];
          const isGuideOpen = activeGuide === doc;

          return (
            <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleDoc(doc)}
                className={`w-full flex items-start gap-3 p-3.5 text-left transition ${
                  isChecked 
                    ? 'bg-emerald-50/20 dark:bg-emerald-950/10 text-slate-800 dark:text-slate-100' 
                    : 'bg-white dark:bg-slate-800 text-slate-750 dark:text-slate-300'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isChecked ? (
                    <CheckSquare className="h-5 w-5 text-emerald-650 dark:text-emerald-500" />
                  ) : (
                    <Square className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold block">{translateDoc(doc)}</span>
                  {!isChecked && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-500 font-bold block mt-1">
                      {language === 'hi' ? '⚠ अनुपलब्ध दस्तावेज़' : '⚠ Missing document'}
                    </span>
                  )}
                </div>
              </button>

              {/* Action and Why required box */}
              {!isChecked && hasGuidance && (
                <div className="bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-150 p-3.5 text-xs space-y-2">
                  <div className="text-slate-600 dark:text-slate-350">
                    <span className="font-bold text-slate-850 dark:text-slate-200">
                      {language === 'hi' ? 'क्यों आवश्यक है: ' : 'Why required: '}
                    </span>
                    {docGuidance[doc].why}
                  </div>
                  
                  <div>
                    <button
                      onClick={() => setActiveGuide(isGuideOpen ? null : doc)}
                      className="text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      {language === 'hi' ? 'प्राप्त करने का तरीका जानें' : 'Action: Learn how to obtain it'}
                    </button>
                    
                    {isGuideOpen && (
                      <div className="mt-2 p-3 bg-orange-50/50 dark:bg-orange-955/10 rounded-lg border border-orange-100 text-[11px] text-slate-700 leading-relaxed">
                        <span className="font-bold text-orange-850 dark:text-orange-400 block mb-1">
                          {language === 'hi' ? 'आवेदन करने के कदम:' : 'Steps to Obtain:'}
                        </span>
                        {docGuidance[doc].how}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Security alert */}
      <div className="p-3 bg-amber-50 dark:bg-amber-955/20 rounded-lg border border-amber-200 dark:border-amber-900/40 flex gap-2 text-xs text-amber-900 dark:text-amber-300 mb-6">
        <AlertCircle className="h-4.5 w-4.5 text-amber-600 dark:text-amber-450 flex-shrink-0 mt-0.5" />
        <p>
          {language === 'hi'
            ? 'अस्वीकृति से बचने के लिए आवेदन करने से पहले सुनिश्चित करें कि दस्तावेजों का विवरण आपके आधार विवरण से मेल खाता हो।'
            : 'Ensure documents details match your Aadhaar credentials before applying to avoid validation errors.'
          }
        </p>
      </div>

      {/* Footer controls */}
      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={onBack}
          className="rounded-lg border border-slate-300 dark:border-slate-650 py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition"
        >
          {language === 'hi' ? 'पीछे जाएं' : 'Back to List'}
        </button>
        
        <button
          onClick={() => alert(language === 'hi' ? "चेकलिस्ट ब्राउज़र स्टोरेज में सफलतापूर्वक सहेजी गई!" : "Checklist Saved Successfully in Browser Storage!")}
          className="flex-1 rounded-lg bg-indigo-950 dark:bg-indigo-900 py-2.5 px-4 text-xs font-semibold text-white shadow-sm hover:bg-indigo-900/90 transition flex items-center justify-center gap-1.5"
        >
          <Bookmark className="h-4 w-4" /> {language === 'hi' ? 'चेकलिस्ट सहेजें' : 'Save Checklist'}
        </button>

        <button
          onClick={() => {
            const docContent = `Vaani-Setu Document Checklist\nScheme: ${scheme.name}\n\nRequired Documents:\n` + activeDocs.map((d, i) => `- [${checkedDocs[d] ? 'x' : ' '}] ${translateDoc(d)}`).join('\n');
            const blob = new Blob([docContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `unified-checklist.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="rounded-lg border border-slate-200 dark:border-slate-700 py-2.5 px-3.5 text-xs font-semibold text-slate-605 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-755 transition flex items-center justify-center"
          title="Download Checklist"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
};
