import React from 'react';
import { Mic, MicOff, Globe, Sparkles, Send, Bot, User, CheckCircle2, ChevronRight, CornerDownRight } from 'lucide-react';
import { Scheme } from '@/data/schemes';

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
  const [messages, setMessages] = React.useState<Message[]>([
    {
      sender: 'bot',
      text: "नमस्ते! मैं वाणी-सेतु AI सहायक हूँ। मुझे अपने बारे में बताएँ ताकि मैं आपके लिए सही सरकारी योजनाएँ खोज सकूँ। (Hello! I am Vaani-Setu AI. Tell me about yourself to match government schemes.)"
    }
  ]);
  const [inputText, setInputText] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Fallback simulation text triggers
  const getSimulatedResponse = (text: string): { reply: string; matches: Scheme[] } => {
    const inputClean = text.toLowerCase();
    
    if (inputClean.includes('किसान') || inputClean.includes('farmer') || inputClean.includes('खेती') || inputClean.includes('kisan') || inputClean.includes('rain') || inputClean.includes('बारिश')) {
      const pmKisan = schemes.find(s => s.id === 'pm-kisan');
      const pmKusum = schemes.find(s => s.id === 'pm-kusum');
      return {
        reply: "किसान परिवारों और कृषि हेतु 'PM-KISAN' तथा सोलर पंप स्थापना व बंजर भूमि उपयोग के लिए 'PM-KUSUM' योजनाएं प्रासंगिक हैं। नीचे दी गई योजनाओं को देखें:",
        matches: [pmKisan, pmKusum].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('चिकित्सा') || inputClean.includes('medical') || inputClean.includes('hospital') || inputClean.includes('स्वास्थ्य') || inputClean.includes('health') || inputClean.includes('बीमारी') || inputClean.includes('इलाज')) {
      const ayushman = schemes.find(s => s.id === 'ayushman-bharat');
      const insurance = schemes.find(s => s.id === 'pm-jeevan-suraksha');
      return {
        reply: "चिकित्सा सहायता एवं स्वास्थ्य बीमा हेतु 'Ayushman Bharat (PM-JAY)' (₹5 लाख तक मुफ्त इलाज) तथा 'PM Jeevan Jyoti & Suraksha Bima' (किफायती जीवन व दुर्घटना बीमा) प्रासंगिक हैं:",
        matches: [ayushman, insurance].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('पेंशन') || inputClean.includes('pension') || inputClean.includes('old age') || inputClean.includes('insurance') || inputClean.includes('atal') || inputClean.includes('सुरक्षा')) {
      const atal = schemes.find(s => s.id === 'atal-pension');
      const jandhan = schemes.find(s => s.id === 'pm-jandhan');
      const insurance = schemes.find(s => s.id === 'pm-jeevan-suraksha');
      return {
        reply: "वृद्धावस्था पेंशन और वित्तीय सुरक्षा हेतु 'Atal Pension Yojana', बैंकिंग सुविधाओं के लिए 'PM Jan Dhan Yojana' तथा बीमा के लिए 'PM Jeevan Jyoti & Suraksha Bima' मुख्य रूप से अनुकूल हैं:",
        matches: [atal, jandhan, insurance].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('महिला') || inputClean.includes('बच्ची') || inputClean.includes('girl') || inputClean.includes('daughter') || inputClean.includes('sukanya') || inputClean.includes('matru')) {
      const ssy = schemes.find(s => s.id === 'sukanya-samriddhi');
      const matru = schemes.find(s => s.id === 'pm-matru-vandana');
      const ujjwala = schemes.find(s => s.id === 'pm-ujjwala');
      return {
        reply: "महिला एवं बाल विकास कल्याण हेतु 'Sukanya Samriddhi Yojana' (बचत योजना), 'PM Matru Vandana Yojana' (गर्भवती माताओं के लिए नकद पोषण लाभ) तथा 'PM Ujjwala Yojana' (मुफ्त गैस कनेक्शन) उपलब्ध हैं:",
        matches: [ssy, matru, ujjwala].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('गरीब') || inputClean.includes('income') || inputClean.includes('house') || inputClean.includes('घर') || inputClean.includes('awas') || inputClean.includes('solar') || inputClean.includes('बिजली')) {
      const pmay = schemes.find(s => s.id === 'pm-awas-yojana');
      const surya = schemes.find(s => s.id === 'pm-surya-ghar');
      return {
        reply: "कम आय परिवारों के लिए पक्का मकान निर्माण हेतु 'Pradhan Mantri Awas Yojana' तथा 300 यूनिट मुफ्त बिजली हेतु 'PM Surya Ghar' योजनाएं उपलब्ध हैं:",
        matches: [pmay, surya].filter(Boolean) as Scheme[]
      };
    }

    if (inputClean.includes('skill') || inputClean.includes('रोजगार') || inputClean.includes('job') || inputClean.includes('training') || inputClean.includes('mgnrega') || inputClean.includes('vishwakarma')) {
      const mgnrega = schemes.find(s => s.id === 'mgnrega');
      const vishwakarma = schemes.find(s => s.id === 'pm-vishwakarma');
      const pmkvy = schemes.find(s => s.id === 'pm-kaushal-vikas');
      return {
        reply: "कौशल विकास व ग्रामीण रोजगार के लिए 'MGNREGA' (100 दिन की रोजगार गारंटी), 'PM Vishwakarma Yojana' (पारंपरिक कारीगरों के लिए औजार व लोन) तथा 'PM Kaushal Vikas Yojana' (मुफ्त स्किल कोर्स) अनुकूल हैं:",
        matches: [mgnrega, vishwakarma, pmkvy].filter(Boolean) as Scheme[]
      };
    }

    // Default general response
    return {
      reply: "आपकी जानकारी दर्ज कर ली गई है। यहाँ हमारे डेटाबेस से कुछ मुख्य कल्याणकारी योजनाएँ दी गई हैं जो आपके लिए अनुकूल हो सकती हैं:",
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

      // Trigger Text-to-Speech if supported
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(result.reply.replace(/<\/?[^>]+(>|$)/g, ""));
        speech.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        window.speechSynthesis.speak(speech);
      }
    }, 1500);
  };

  // Browser Speech Recognition triggers
  const startSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
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
              <h3 className="text-sm font-bold tracking-wide">Vaani-Setu Assistant</h3>
              <p className="text-[10px] text-slate-300 dark:text-slate-400">Supported in Hindi / English / regional</p>
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
                  : 'bg-white dark:bg-slate-850 text-slate-805 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
              }`}>
                <div className="flex items-center gap-1.5 mb-1.5 opacity-75 text-[10px]">
                  {msg.sender === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                  <span>{msg.sender === 'user' ? 'Citizen' : 'Vaani-Setu AI'}</span>
                </div>
                <p className="leading-relaxed">{msg.text}</p>

                {/* Inline matched cards helper */}
                {msg.matchedSchemes && msg.matchedSchemes.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2 text-slate-900 dark:text-white">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Potential matches found:</p>
                    {msg.matchedSchemes.map(sch => (
                      <div key={sch.id} className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-750 hover:border-orange-500 transition flex items-center justify-between gap-2">
                        <span className="text-xs font-bold truncate pr-2">{sch.name}</span>
                        <button
                          onClick={() => onSelectScheme(sch)}
                          className="text-[10px] font-bold text-orange-600 dark:text-orange-400 hover:underline flex-shrink-0 flex items-center"
                        >
                          Details <ChevronRight className="h-3 w-3" />
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
                <span>AI typing response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          
          {/* Quick chip queries */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleSendMessage("मैं एक गरीब किसान हूँ, मुझे खेती के लिए सहायता चाहिए")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              🌾 Farmer Scheme (किसान योजना)
            </button>
            <button
              onClick={() => handleSendMessage("I am looking for health insurance for my family")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              🏥 Medical Help (चिकित्सा/इलाज)
            </button>
            <button
              onClick={() => handleSendMessage("Tell me about insurance coverage")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              🛡️ Life & Accident Insurance (बीमा)
            </button>
            <button
              onClick={() => handleSendMessage("I need skill training and rural jobs")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              🛠️ Skills & Jobs (रोजगार)
            </button>
            <button
              onClick={() => handleSendMessage("What schemes are available for heavy rain or water pumps?")}
              className="text-[11px] font-semibold text-slate-650 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              🌧️ Solar Pumps / Rain (बारिश)
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
              placeholder={isListening ? "Listening... Speak now" : "Type your query here..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              disabled={isListening}
              className="flex-1 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-750 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800 dark:text-white"
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
          <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Matched Profile & Actions</span>
          <h4 className="text-base font-bold text-indigo-950 dark:text-white mt-1 mb-4">Eligible Scheme Quick View</h4>
          
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Vaani-Setu extracts factors like location, earnings, and family size to filter our national welfare database.
          </p>

          <div className="space-y-3.5">
            <div className="p-3.5 bg-orange-50/50 dark:bg-orange-955/10 rounded-xl border border-orange-100 dark:border-orange-900/30 text-xs">
              <span className="font-bold text-orange-850 dark:text-orange-400">🎙 Voice Waveform</span>
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
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Interactive Help Parameters</span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Click the microphone icon and speak in Hindi or English (e.g. "I am a poor farmer"). The AI voice synthesis responds with matches.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 dark:text-slate-550 text-center">
          Prototype matches are advisory. Final approvals require verified official portals.
        </div>
      </div>

    </div>
  );
};
