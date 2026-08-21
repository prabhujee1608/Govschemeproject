import React from 'react';
import { Mic, MicOff, Globe, Sparkles, Send, Bot, User, CheckCircle2, ChevronRight, CornerDownRight } from 'lucide-react';
import { Scheme } from '@/data/schemes';
import { t } from '../data/translations';

interface VoiceAssistantProps {
  schemes: Scheme[];
  onSelectScheme: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  language: string;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  matchedSchemes?: Scheme[];
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  schemes,
  onSelectScheme,
  onCheckEligibility,
  language
}) => {
  const [isListening, setIsListening] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputText, setInputText] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Initialize and update greeting message when language changes
  React.useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: t("assist.welcome", language)
      }
    ]);
  }, [language]);

  // Fallback simulation text triggers
  const getSimulatedResponse = (text: string): { reply: string; matches: Scheme[] } => {
    const inputClean = text.toLowerCase();
    
    if (inputClean.includes('किसान') || inputClean.includes('farmer') || inputClean.includes('खेती') || inputClean.includes('kisan') || inputClean.includes('rain') || inputClean.includes('बारिश')) {
      const pmKisan = schemes.find(s => s.id === 'pm-kisan');
      const pmKusum = schemes.find(s => s.id === 'pm-kusum');
      return {
        reply: t("reply.kisan", language),
        matches: [pmKisan, pmKusum].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('चिकित्सा') || inputClean.includes('medical') || inputClean.includes('hospital') || inputClean.includes('स्वास्थ्य') || inputClean.includes('health') || inputClean.includes('बीमारी') || inputClean.includes('इलाज')) {
      const ayushman = schemes.find(s => s.id === 'ayushman-bharat');
      const insurance = schemes.find(s => s.id === 'pm-jeevan-suraksha');
      return {
        reply: t("reply.health", language),
        matches: [ayushman, insurance].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('पेंशन') || inputClean.includes('pension') || inputClean.includes('old age') || inputClean.includes('insurance') || inputClean.includes('atal') || inputClean.includes('सुरक्षा')) {
      const atal = schemes.find(s => s.id === 'atal-pension');
      const jandhan = schemes.find(s => s.id === 'pm-jandhan');
      const insurance = schemes.find(s => s.id === 'pm-jeevan-suraksha');
      return {
        reply: t("reply.pension", language),
        matches: [atal, jandhan, insurance].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('महिला') || inputClean.includes('बच्ची') || inputClean.includes('girl') || inputClean.includes('daughter') || inputClean.includes('sukanya') || inputClean.includes('matru')) {
      const ssy = schemes.find(s => s.id === 'sukanya-samriddhi');
      const matru = schemes.find(s => s.id === 'pm-matru-vandana');
      const ujjwala = schemes.find(s => s.id === 'pm-ujjwala');
      return {
        reply: t("reply.women", language),
        matches: [ssy, matru, ujjwala].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('गरीब') || inputClean.includes('income') || inputClean.includes('house') || inputClean.includes('घर') || inputClean.includes('awas') || inputClean.includes('solar') || inputClean.includes('बिजली')) {
      const pmay = schemes.find(s => s.id === 'pm-awas-yojana');
      const surya = schemes.find(s => s.id === 'pm-surya-ghar');
      return {
        reply: t("reply.housing", language),
        matches: [pmay, surya].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('skill') || inputClean.includes('रोजगार') || inputClean.includes('job') || inputClean.includes('training') || inputClean.includes('mgnrega') || inputClean.includes('vishwakarma')) {
      const mgnrega = schemes.find(s => s.id === 'mgnrega');
      const vishwakarma = schemes.find(s => s.id === 'pm-vishwakarma');
      const pmkvy = schemes.find(s => s.id === 'pm-kaushal-vikas');
      return {
        reply: t("reply.jobs", language),
        matches: [mgnrega, vishwakarma, pmkvy].filter(Boolean) as Scheme[]
      };
    }

    // Default general response
    return {
      reply: t("reply.default", language),
      matches: schemes.slice(0, 3)
    };
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    // Simulate response delay
    setTimeout(() => {
      const result = getSimulatedResponse(textToSend);
      const botMsg: Message = {
        sender: 'bot',
        text: result.reply,
        matchedSchemes: result.matches
      };
      setMessages(prev => [...prev, botMsg]);
      setIsProcessing(false);

      // Trigger Text-to-Speech mapping to user selection
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(result.reply.replace(/<\/?[^>]+(>|$)/g, ""));
        const langMapping: { [key: string]: string } = {
          hi: 'hi-IN',
          en: 'en-IN',
          bn: 'bn-IN',
          mr: 'mr-IN',
          ta: 'ta-IN',
          kn: 'kn-IN',
          te: 'te-IN',
          gu: 'gu-IN',
          pa: 'pa-IN'
        };
        speech.lang = langMapping[language] || 'hi-IN';
        window.speechSynthesis.speak(speech);
      }
    }, 1550);
  };

  // Browser Speech Recognition triggers
  const startSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        
        const langMapping: { [key: string]: string } = {
          hi: 'hi-IN',
          en: 'en-IN',
          bn: 'bn-IN',
          mr: 'mr-IN',
          ta: 'ta-IN',
          kn: 'kn-IN',
          te: 'te-IN',
          gu: 'gu-IN',
          pa: 'pa-IN'
        };
        recognition.lang = langMapping[language] || 'hi-IN';
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleSendMessage(transcript);
        };

        recognition.onerror = (e: any) => {
          console.error(e);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        // Speech not supported fallback
        setIsListening(true);
        setTimeout(() => {
          setIsListening(false);
          const mockText = language === 'hi' 
            ? "मैं एक गरीब किसान हूँ, मुझे खेती के लिए सहायता चाहिए" 
            : "I am a street vendor with low income, help me get a loan";
          handleSendMessage(mockText);
        }, 2000);
      }
    }
  };

  return (
    <div id="ai-assistant" className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[500px] transition-colors">
      
      {/* Left Chat Window */}
      <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
        
        {/* Assistant Header */}
        <div className="p-4 bg-indigo-950 dark:bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold tracking-wide">
                {language === 'hi' ? 'वाणी-सेतु सहायक' : 'Vaani-Setu Assistant'}
              </h3>
              <p className="text-[10px] text-slate-300 dark:text-slate-400">
                {language === 'hi' ? 'हिंदी / अंग्रेजी / क्षेत्रीय भाषाओं में समर्थित' : 'Supported in Hindi / English / regional'}
              </p>
            </div>
          </div>
          <Sparkles className="h-4.5 w-4.5 text-orange-400" />
        </div>

        {/* Messages Body */}
        <div className="p-4 flex-1 space-y-4 overflow-y-auto max-h-[360px]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-orange-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-1.5 mb-1.5 opacity-75 text-[10px] text-slate-500">
                  {msg.sender === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                  <span>{msg.sender === 'user' ? (language === 'hi' ? 'नागरिक' : 'Citizen') : 'Vaani-Setu AI'}</span>
                </div>
                <p className="leading-relaxed text-slate-800">{msg.text}</p>

                {/* Inline matched cards helper */}
                {msg.matchedSchemes && msg.matchedSchemes.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2 text-slate-900">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {language === 'hi' ? 'संभावित मिलान मिले:' : 'Potential matches found:'}
                    </p>
                    {msg.matchedSchemes.map(sch => (
                      <div key={sch.id} className="p-2 bg-slate-50 rounded-lg border border-slate-200 hover:border-orange-500 transition flex items-center justify-between gap-2">
                        <span className="text-xs font-bold truncate pr-2 text-slate-800">{sch.name}</span>
                        <button
                          onClick={() => onSelectScheme(sch)}
                          className="text-[10px] font-bold text-orange-600 hover:underline flex-shrink-0 flex items-center"
                        >
                          {language === 'hi' ? 'विवरण' : 'Details'} <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none p-3 text-xs text-slate-550 dark:text-slate-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span>{language === 'hi' ? 'एआई जवाब खोज रहा है...' : 'AI typing response...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          
          {/* Quick chip queries */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleSendMessage(language === 'hi' ? "मैं एक गरीब किसान हूँ, मुझे खेती के लिए सहायता चाहिए" : "I am a poor farmer, I need agricultural support")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              {t("assist.sample.kisan", language)}
            </button>
            <button
              onClick={() => handleSendMessage(language === 'hi' ? "मुझे अपने परिवार के लिए स्वास्थ्य बीमा की आवश्यकता है" : "I am looking for health insurance for my family")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              {t("assist.sample.health", language)}
            </button>
            <button
              onClick={() => handleSendMessage(language === 'hi' ? "पेंशन या बीमा योजनाओं के बारे में बताएं" : "Tell me about pension or insurance schemes")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              {t("assist.sample.pension", language)}
            </button>
            <button
              onClick={() => handleSendMessage(language === 'hi' ? "मुझे कौशल विकास और ग्रामीण रोजगार चाहिए" : "I need skill training and rural jobs")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              {t("assist.sample.jobs", language)}
            </button>
            <button
              onClick={() => handleSendMessage(language === 'hi' ? "किफायती आवास या सोलर रूफटॉप योजनाएं" : "Affordable housing or solar rooftop schemes")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              {t("assist.sample.housing", language)}
            </button>
          </div>

          <div className="flex gap-2 items-center mt-1">
            <button
              onClick={startSpeechRecognition}
              className={`h-11 w-11 rounded-full flex items-center justify-center transition shadow-sm ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/40'
              }`}
              title="Speak Naturally"
            >
              <Mic className="h-5 w-5" />
            </button>

            <input
              type="text"
              placeholder={isListening ? t("assist.listening", language) : t("assist.placeholder", language)}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              disabled={isListening}
              className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder-slate-400"
            />

            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim()}
              className="h-10 w-10 bg-indigo-950 dark:bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-indigo-900 dark:hover:bg-slate-750 disabled:opacity-50 transition"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Information Window */}
      <div className="lg:col-span-5 p-6 bg-white dark:bg-slate-800 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
            {language === 'hi' ? 'मिलान प्रोफाइल और क्रियाएं' : 'Matched Profile & Actions'}
          </span>
          <h4 className="text-base font-bold text-indigo-950 dark:text-white mt-1 mb-4">
            {language === 'hi' ? 'योग्य योजना त्वरित दृश्य' : 'Eligible Scheme Quick View'}
          </h4>
          
          <p className="text-xs text-slate-550 dark:text-slate-405 leading-relaxed mb-4">
            {language === 'hi'
              ? 'वाणी-सेतु हमारे राष्ट्रीय कल्याण डेटाबेस को फ़िल्टर करने के लिए स्थान, कमाई और परिवार के आकार जैसे कारकों को निकालता है।'
              : 'Vaani-Setu extracts factors like location, earnings, and family size to filter our national welfare database.'
            }
          </p>

          <div className="space-y-3.5">
            <div className="p-3.5 bg-orange-50/50 dark:bg-orange-955/10 rounded-xl border border-orange-100 dark:border-orange-900/30 text-xs">
              <span className="font-bold text-orange-850 dark:text-orange-400">
                {language === 'hi' ? '🎙 वॉयस वेवफॉर्म' : '🎙 Voice Waveform'}
              </span>
              <div className="flex items-center gap-1.5 mt-2 h-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
                  <span 
                    key={val} 
                    className={`w-1 bg-orange-500 rounded-full transition-all duration-300 ${
                      isListening ? 'animate-bounce h-5' : 'h-2'
                    }`}
                    style={{ animationDelay: `${val * 75}ms` }}
                  />
                ))}
              </div>
            </div>

            <div className="p-3.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/30 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                {language === 'hi' ? 'इंटरैक्टिव सहायता पैरामीटर' : 'Interactive Help Parameters'}
              </span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'माइक आइकन पर क्लिक करें और हिंदी या अंग्रेजी में बोलें (जैसे "मैं एक गरीब किसान हूँ")। एआई आवाज संश्लेषण मिलान के साथ प्रतिक्रिया करता है।'
                  : 'Click the microphone icon and speak in Hindi or English (e.g. "I am a poor farmer"). The AI voice synthesis responds with matches.'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 dark:text-slate-550 text-center">
          {language === 'hi'
            ? 'प्रोटोटाइप मिलान केवल सलाह के लिए हैं। अंतिम मंजूरी के लिए आधिकारिक पोर्टल से सत्यापन आवश्यक है।'
            : 'Prototype matches are advisory. Final approvals require verified official portals.'
          }
        </div>
      </div>

    </div>
  );
};
