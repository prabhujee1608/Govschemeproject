import React from 'react';
import { ClipboardList, FileText, Globe, CheckSquare, Compass, ShieldAlert } from 'lucide-react';
import { Scheme } from '@/data/schemes';
import { t } from '../data/translations';

interface ApplicationTimelineProps {
  scheme: Scheme;
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

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({
  scheme,
  onBack,
  language
}) => {
  const translateDoc = (doc: string): string => {
    if (language === 'en') return doc;
    return docTranslations[doc]?.[language] || doc;
  };

  const translatedDocs = scheme.requiredDocuments.map(translateDoc);

  const steps = [
    {
      title: language === 'hi' ? "चरण 1: पात्रता मानदंड जांचें" : "Step 1: Check Eligibility Parameters",
      desc: language === 'hi' 
        ? "पुष्टि करें कि आपके जनसांख्यिकीय विवरण, आयु रिकॉर्ड और वार्षिक आय वर्ग आवश्यकताओं के अनुरूप हैं।"
        : "Confirm your detailed demographic parameters, age records, and annual income brackets align with requirements.",
      icon: Compass,
      color: "bg-orange-100 text-orange-600 border-orange-200"
    },
    {
      title: language === 'hi' ? "चरण 2: दस्तावेज एकत्र करें" : "Step 2: Assemble Documentation",
      desc: language === 'hi'
        ? `सभी अनिवार्य प्रमाण पत्र एकत्र करें: ${translatedDocs.slice(0, 3).join(', ')}, और अन्य सहायक दस्तावेज।`
        : `Gather all mandatory certificates: ${scheme.requiredDocuments.slice(0, 3).join(', ')}, and other supporting records.`,
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600 border-indigo-200"
    },
    {
      title: language === 'hi' ? "चरण 3: आधिकारिक पोर्टल लिंक खोलें" : "Step 3: Access Official Portal Link",
      desc: language === 'hi'
        ? `आधिकारिक प्रशासनिक लैंडिंग पृष्ठ पर जाएं: ${scheme.officialUrl.replace('https://', '')}।`
        : `Navigate to the authorized administrative landing page: ${scheme.officialUrl.replace('https://', '')}.`,
      icon: Globe,
      color: "bg-emerald-100 text-emerald-600 border-emerald-200"
    },
    {
      title: language === 'hi' ? "चरण 4: पंजीकरण और आवेदन दर्ज करें" : "Step 4: Register & File Application",
      desc: language === 'hi'
        ? "अपने आधार क्रेडेंशियल्स का उपयोग करके एक प्रोफ़ाइल पंजीकृत करें, आधिकारिक फ़ॉर्म भरें, फ़ाइलें अपलोड करें और समीक्षा के लिए भेजें।"
        : "Register a profile using your Aadhaar credentials, populate the official form layout, upload files, and send for review.",
      icon: ClipboardList,
      color: "bg-amber-100 text-amber-600 border-amber-200"
    },
    {
      title: language === 'hi' ? "चरण 5: पंजीकरण ट्रैक करें" : "Step 5: Follow Registration Logs",
      desc: language === 'hi'
        ? "अपना आवेदन आईडी नोट करें, पुष्टि प्रमाण प्रिंट करें, और पोर्टल ट्रैकिंग द्वारा प्रगति की निगरानी करें।"
        : "Record your application ID, print confirmation proofs, and track progress using portal tracking indices.",
      icon: CheckSquare,
      color: "bg-purple-100 text-purple-600 border-purple-200"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto transition-colors">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
          {language === 'hi' ? 'आवेदन की समयरेखा' : 'Filing Timeline Guidance'}
        </span>
        <h3 className="text-xl font-bold text-indigo-950 dark:text-white mt-1">
          {language === 'hi' ? `${scheme.name} के लिए आवेदन` : `Applying for ${scheme.name}`}
        </h3>
        <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">
          {language === 'hi'
            ? 'आवेदन जमा करते समय समस्याओं से बचने के लिए इस योजनाबद्ध समयरेखा प्रक्रिया की समीक्षा करें।'
            : 'Review this structured timeline workflow to avoid filing issues.'
          }
        </p>
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
          <span className="font-semibold">
            {language === 'hi' ? 'महत्वपूर्ण सूचना:' : 'Important Trust Warning:'}
          </span>{' '}
          {language === 'hi'
            ? 'आधिकारिक सरकारी पोर्टल पर आवेदन के विवरण और पात्रता मानदंडों को हमेशा सत्यापित करें। वाणी-सेतु मार्गदर्शिकाएँ दिखाता है लेकिन यह सीधे आवेदन जमा करने का पोर्टल नहीं है।'
            : 'Always verify application details and eligibility parameters on the official government portal. Vaani-Setu displays guides based on database records but is not a portal submittal platform.'
          }
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={onBack}
          className="rounded-lg border border-slate-300 dark:border-slate-650 py-2.5 px-4 text-xs font-semibold text-slate-750 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition"
        >
          {language === 'hi' ? 'पीछे जाएं' : 'Back to list'}
        </button>

        <a
          href={scheme.officialUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-lg bg-orange-600 py-2.5 px-4 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 transition flex items-center justify-center gap-1.5"
        >
          {language === 'hi' ? 'आधिकारिक पोर्टल पर जाएँ' : 'Proceed to Official Portal'}
        </a>
      </div>

    </div>
  );
};
