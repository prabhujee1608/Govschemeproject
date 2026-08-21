import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Vaani-Setu?",
    answer: "Vaani-Setu is a multilingual, voice-first AI portal designed for Indian citizens. It breaks down access barriers by letting users express their needs in natural local speech (Hindi, Bengali, Marathi, etc.) to discover corresponding public welfare schemes."
  },
  {
    question: "How does Vaani-Setu find relevant schemes?",
    answer: "Our match engine reviews variables from user conversations (e.g. occupation, gender, state, age, family size, income) and checks them against rules criteria specified for schemes from our knowledge database, yielding a prioritized match rating."
  },
  {
    question: "Which languages are supported?",
    answer: "Currently, our prototype interface and speech modules support Hindi (हिन्दी), English, Bengali (বাংলা), Marathi (मराठी), and Tamil (தமிழ்)."
  },
  {
    question: "Does Vaani-Setu guarantee eligibility?",
    answer: "No. Vaani-Setu provides estimates and matching indicators based on criteria details. Users should always check parameters directly with official government departments prior to final filing."
  },
  {
    question: "Does Vaani-Setu submit applications directly?",
    answer: "No. To maintain system reliability and avoid middleman hazards, we map out exact document checklists and link you directly to the correct official portals where applications are authorized."
  },
  {
    question: "How is citizen information handled?",
    answer: "We prioritize security. This prototype processes conversations entirely within your local browser runtime. No personal files or records are sent to outside databases."
  },
  {
    question: "Can I use Vaani-Setu on mobile?",
    answer: "Yes, Vaani-Setu is built using mobile-first responsive guidelines. You can trigger voice searches directly from any modern mobile browser."
  },
  {
    question: "Where can I verify the official scheme information?",
    answer: "Each scheme card contains direct links to official Central and State government portals (such as pmkisan.gov.in or pmjay.gov.in) to guarantee accurate verification."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-950/40 text-orange-850 dark:text-orange-350">
            <HelpCircle className="h-3.5 w-3.5" /> FAQ Support
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-650 dark:text-slate-400">
            Get answers to general concerns regarding safety, data handling, and search matching.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-850 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                >
                  <span className="text-sm sm:text-base pr-4 text-indigo-950 dark:text-white">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 bg-orange-50/20 dark:bg-slate-900/40">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
