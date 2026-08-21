import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { t } from '../data/translations';

interface FAQProps {
  language: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqDataMap: Record<string, FAQItem[]> = {
  en: [
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
  ],
  hi: [
    {
      question: "वाणी-सेतु क्या है?",
      answer: "वाणी-सेतु भारतीय नागरिकों के लिए डिज़ाइन किया गया एक बहुभाषी, वॉयस-फर्स्ट एआई पोर्टल है। यह उपयोगकर्ताओं को सार्वजनिक कल्याणकारी योजनाओं की खोज करने के लिए प्राकृतिक स्थानीय भाषा (हिंदी, बंगाली, मराठी, आदि) में अपनी आवश्यकताओं को व्यक्त करने की अनुमति देता है।"
    },
    {
      question: "वाणी-सेतु प्रासंगिक योजनाओं को कैसे खोजता है?",
      answer: "हमारा मिलान इंजन उपयोगकर्ता की बातचीत से विभिन्न विवरणों (जैसे व्यवसाय, लिंग, राज्य, आयु, परिवार का आकार, आय) की समीक्षा करता है और हमारे डेटाबेस में निर्दिष्ट योजनाओं के नियमों के खिलाफ उनकी जांच करता है, जिससे एक मिलान स्कोर प्राप्त होता है।"
    },
    {
      question: "कौन सी भाषाएँ समर्थित हैं?",
      answer: "वर्तमान में, हमारा प्रोटोटाइप इंटरफ़ेस और वॉयस मॉड्यूल हिंदी (हिन्दी), अंग्रेजी, बंगाली (বাংলা), मराठी (मराठी), तमिल (தமிழ்), कन्नड़, तेलुगु, गुजराती और पंजाबी का समर्थन करते हैं।"
    },
    {
      question: "क्या वाणी-सेतु पात्रता की गारंटी देता है?",
      answer: "नहीं। वाणी-सेतु योजनाओं के मानदंडों के विवरण के आधार पर संभावित पात्रता का अनुमान प्रदान करता है। उपयोगकर्ताओं को हमेशा अंतिम आवेदन करने से पहले सीधे आधिकारिक सरकारी विभागों से जानकारी सत्यापित करनी चाहिए।"
    },
    {
      question: "क्या वाणी-सेतु सीधे आवेदन जमा करता है?",
      answer: "नहीं। सिस्टम की विश्वसनीयता बनाए रखने और बिचौलियों के खतरों से बचने के लिए, हम आपको आवश्यक दस्तावेजों की चेकलिस्ट दिखाते हैं और आपको सीधे सही आधिकारिक पोर्टलों से जोड़ते हैं।"
    },
    {
      question: "नागरिकों की जानकारी का प्रबंधन कैसे किया जाता है?",
      answer: "हम सुरक्षा को प्राथमिकता देते हैं। यह प्रोटोटाइप बातचीत को पूरी तरह से आपके स्थानीय ब्राउज़र रनटाइम के भीतर संसाधित करता है। कोई भी व्यक्तिगत फाइल या रिकॉर्ड बाहरी डेटाबेस में नहीं भेजा जाता है।"
    },
    {
      question: "क्या मैं मोबाइल पर वाणी-सेतु का उपयोग कर सकता हूँ?",
      answer: "हाँ, वाणी-सेतु को मोबाइल-फर्स्ट रिस्पॉन्सिव दिशानिर्देशों का उपयोग करके बनाया गया है। आप किसी भी आधुनिक मोबाइल ब्राउज़र से सीधे वॉयस सर्च शुरू कर सकते हैं।"
    },
    {
      question: "मैं आधिकारिक योजना की जानकारी कहाँ सत्यापित कर सकता हूँ?",
      answer: "सटीक सत्यापन की गारंटी के लिए प्रत्येक योजना कार्ड में आधिकारिक केंद्र और राज्य सरकार के पोर्टलों (जैसे pmkisan.gov.in या pmjay.gov.in) के सीधे लिंक शामिल हैं।"
    }
  ]
};

export const FAQ: React.FC<FAQProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = faqDataMap[language] || faqDataMap["en"];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-950/40 text-orange-850 dark:text-orange-350">
            <HelpCircle className="h-3.5 w-3.5" /> {t("faq.tag", language)}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-white sm:text-4xl">
            {t("faq.title", language)}
          </h2>
          <p className="mt-4 text-base text-slate-650 dark:text-slate-400">
            {t("faq.subtitle", language)}
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
