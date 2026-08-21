import React from 'react';
import { Mic, MicOff, Globe, Sparkles, Send, Bot, User, CheckCircle2, ChevronRight, CornerDownRight, Briefcase, IndianRupee, MapPin, Calendar, Users } from 'lucide-react';
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

export interface ProfileState {
  occupation?: string;
  income?: number;
  age?: number;
  location?: string;
  familySize?: number;
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

  // Stateful profile for conversational tracking
  const [profile, setProfile] = React.useState<ProfileState>({});
  const [lastAsked, setLastAsked] = React.useState<keyof ProfileState | null>(null);

  // Initialize and update greeting message when language changes
  React.useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: language === 'hi' 
          ? "नमस्ते! मैं वाणी-सेतु एआई हूँ। कृपया मुझे अपनी स्थिति के बारे में बताएं (जैसे: 'मेरे पापा किसान हैं और उनकी आय 1.5 लाख है') ताकि मैं आपके लिए उपयुक्त योजनाएं खोज सकूं।"
          : "Hello! I am Vaani-Setu AI. Tell me about your situation (e.g. 'My father is a farmer and his income is 1.5 lakh') so I can discover suitable schemes for you."
      }
    ]);
  }, [language]);

  // Extract entities from user text
  const parseEntities = (text: string, currentAsked: keyof ProfileState | null): ProfileState => {
    const cleanText = text.toLowerCase();
    const newProfile: ProfileState = {};

    // 1. Occupation
    if (cleanText.includes('farmer') || cleanText.includes('किसान') || cleanText.includes('खेती') || cleanText.includes('kisan')) {
      newProfile.occupation = 'Farmer';
    } else if (cleanText.includes('vendor') || cleanText.includes('विक्रेता') || cleanText.includes('rehri') || cleanText.includes('thela')) {
      newProfile.occupation = 'Street Vendor';
    } else if (cleanText.includes('student') || cleanText.includes('छात्र') || cleanText.includes('padhai')) {
      newProfile.occupation = 'Student';
    } else if (cleanText.includes('shopkeeper') || cleanText.includes('दुकानदार') || cleanText.includes('dokan')) {
      newProfile.occupation = 'Shopkeeper';
    } else if (cleanText.includes('worker') || cleanText.includes('मजदूर') || cleanText.includes('labour') || cleanText.includes('majdoor')) {
      newProfile.occupation = 'Unorganized Worker';
    }

    // 2. Income parsing
    // Match lakhs
    const lakhMatch = cleanText.match(/(\d+(\.\d+)?)\s*(lakh|lakhs|लाख|l)/);
    if (lakhMatch) {
      newProfile.income = parseFloat(lakhMatch[1]) * 100000;
    } else {
      // Match thousands
      const thousandMatch = cleanText.match(/(\d+(\.\d+)?)\s*(thousand|हजार|k)/);
      if (thousandMatch) {
        newProfile.income = parseFloat(thousandMatch[1]) * 1000;
      } else {
        // Direct number match if last asked was income
        const directNum = cleanText.match(/\b\d{4,7}\b/);
        if (directNum) {
          newProfile.income = parseInt(directNum[0], 10);
        } else if (currentAsked === 'income') {
          const simpleNum = cleanText.match(/\b\d+\b/);
          if (simpleNum) {
            const val = parseFloat(simpleNum[0]);
            newProfile.income = val < 20 ? val * 100000 : val; // assume lakh if < 20
          }
        }
      }
    }

    // 3. Age parsing
    const ageMatch = cleanText.match(/(\d+)\s*(years|year|साल|वर्ष|age|उम्र)/);
    if (ageMatch) {
      newProfile.age = parseInt(ageMatch[1], 10);
    } else if (currentAsked === 'age') {
      const simpleNum = cleanText.match(/\b\d+\b/);
      if (simpleNum) {
        newProfile.age = parseInt(simpleNum[0], 10);
      }
    }

    // 4. Location parsing
    if (cleanText.includes('village') || cleanText.includes('rural') || cleanText.includes('गांव') || cleanText.includes('ग्रामीण') || cleanText.includes('gramin')) {
      newProfile.location = 'Rural';
    } else if (cleanText.includes('urban') || cleanText.includes('city') || cleanText.includes('town') || cleanText.includes('शहर') || cleanText.includes('शहरी') || cleanText.includes('shahar')) {
      newProfile.location = 'Urban';
    }

    // 5. Family size parsing
    const familyMatch = cleanText.match(/(\d+)\s*(members|member|people|kids|children|परिवार|बच्चे|सदस्य)/);
    if (familyMatch) {
      newProfile.familySize = parseInt(familyMatch[1], 10);
    } else if (currentAsked === 'familySize') {
      const simpleNum = cleanText.match(/\b\d+\b/);
      if (simpleNum) {
        newProfile.familySize = parseInt(simpleNum[0], 10);
      }
    }

    return newProfile;
  };

  // Calculate matched schemes based on extracted profile state
  const getMatchedSchemes = (prof: ProfileState): Scheme[] => {
    return schemes.filter(scheme => {
      let matchCount = 0;
      let totalChecked = 0;

      if (scheme.criteria.occupations && prof.occupation) {
        totalChecked++;
        if (scheme.criteria.occupations.includes(prof.occupation)) matchCount++;
      }
      if (scheme.criteria.maxIncome && prof.income) {
        totalChecked++;
        if (prof.income <= scheme.criteria.maxIncome) matchCount++;
      }
      if (scheme.criteria.minAge && prof.age) {
        totalChecked++;
        if (prof.age >= scheme.criteria.minAge) matchCount++;
      }
      if (scheme.criteria.maxAge && prof.age) {
        totalChecked++;
        if (prof.age <= scheme.criteria.maxAge) matchCount++;
      }
      if (scheme.criteria.ruralUrban && scheme.criteria.ruralUrban !== 'Both' && prof.location) {
        totalChecked++;
        if (scheme.criteria.ruralUrban === prof.location) matchCount++;
      }

      // If we don't have details, default match some based on category keywords
      if (totalChecked === 0) return false;
      return matchCount / totalChecked >= 0.5;
    });
  };

  // Dialog State Machine Response Generator
  const getStatefulResponse = (text: string, currentProfile: ProfileState): { reply: string; matches: Scheme[]; nextAsk: keyof ProfileState | null } => {
    // 1. Merge new profile state
    const extracted = parseEntities(text, lastAsked);
    const updatedProfile = { ...currentProfile, ...extracted };
    setProfile(updatedProfile);

    // 2. Identify missing parameters in order of importance
    let nextAsk: keyof ProfileState | null = null;
    let reply = '';
    
    if (!updatedProfile.occupation) {
      nextAsk = 'occupation';
      reply = language === 'hi'
        ? "आप क्या काम करते हैं? (जैसे: किसान, सड़क विक्रेता, मजदूर, छात्र, या स्व-रोजगार)"
        : "What is your occupation? (e.g. Farmer, Street Vendor, Unorganized Worker, Student, Shopkeeper)";
    } else if (updatedProfile.income === undefined) {
      nextAsk = 'income';
      reply = language === 'hi'
        ? "आपकी पारिवारिक वार्षिक आय (annual income) कितनी है?"
        : "What is your annual household income? (e.g. 1.5 Lakh, 80,000)";
    } else if (!updatedProfile.age) {
      nextAsk = 'age';
      reply = language === 'hi'
        ? "आपकी या लाभार्थी की आयु (age) कितनी है?"
        : "What is your or the beneficiary's age?";
    } else if (!updatedProfile.location) {
      nextAsk = 'location';
      reply = language === 'hi'
        ? "क्या आप ग्रामीण (village) क्षेत्र में रहते हैं या शहरी (city)?"
        : "Do you live in a rural (village) or urban (city) area?";
    }

    // 3. Find matches
    let matches = getMatchedSchemes(updatedProfile);
    if (matches.length === 0) {
      // Fallback to keyword matching
      const inputClean = text.toLowerCase();
      if (inputClean.includes('किसान') || inputClean.includes('farmer') || inputClean.includes('खेती') || inputClean.includes('kisan')) {
        matches = schemes.filter(s => s.id === 'pm-kisan' || s.id === 'pm-kusum');
      } else if (inputClean.includes('health') || cleanTextContains(inputClean, ['स्वास्थ्य', 'insurance', 'medical'])) {
        matches = schemes.filter(s => s.id === 'ayushman-bharat' || s.id === 'pm-jeevan-suraksha');
      } else {
        matches = schemes.slice(0, 3);
      }
    }

    // If everything is collected, announce potential matches
    if (!nextAsk) {
      reply = language === 'hi'
        ? `आपके जवाबों के आधार पर ${matches.length} योजनाएं potentially suitable (सटीक मिलान) हैं। आप नीचे विवरण देख सकते हैं।`
        : `Based on your answers, ${matches.length} schemes are potentially suitable for you. Please check the recommendations below.`;
    } else {
      // If we just got some new info, prepend acknowledgement
      let ack = '';
      if (Object.keys(extracted).length > 0) {
        const lastKey = Object.keys(extracted)[0];
        const lastVal = extracted[lastKey as keyof ProfileState];
        if (lastKey === 'occupation') {
          ack = language === 'hi' ? `ठीक है, आप ${lastVal === 'Farmer' ? 'किसान' : lastVal} हैं। ` : `Understood, you are a ${lastVal}. `;
        } else if (lastKey === 'income') {
          ack = language === 'hi' ? `पारिवारिक आय ₹${lastVal?.toLocaleString()} प्रति वर्ष दर्ज की गई है। ` : `Income recorded as ₹${lastVal?.toLocaleString()} per year. `;
        } else if (lastKey === 'age') {
          ack = language === 'hi' ? `आपकी आयु ${lastVal} वर्ष है। ` : `Age recorded as ${lastVal} years. `;
        } else if (lastKey === 'location') {
          ack = language === 'hi' ? `स्थान ${lastVal === 'Rural' ? 'ग्रामीण' : 'शहरी'} क्षेत्र। ` : `Location recorded as ${lastVal}. `;
        }
      }
      reply = ack + reply;
    }

    return { reply, matches, nextAsk };
  };

  const cleanTextContains = (text: string, keywords: string[]): boolean => {
    return keywords.some(k => text.includes(k));
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
      const result = getStatefulResponse(textToSend, profile);
      setLastAsked(result.nextAsk);
      
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
    }, 1200);
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
            {language === 'hi' ? 'वास्तविक समय प्रोफाइल निष्कर्षण' : 'Real-time Profile Extraction'}
          </span>
          <h4 className="text-base font-bold text-indigo-950 dark:text-white mt-1 mb-4">
            {language === 'hi' ? 'एआई द्वारा निकाली गई जानकारी' : 'Extracted Profile State'}
          </h4>
          
          <div className="space-y-3">
            {/* Occupation */}
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              profile.occupation 
                ? 'border-emerald-250 bg-emerald-50/30 dark:bg-emerald-950/10' 
                : 'border-slate-100 bg-slate-50/50 dark:bg-slate-800/50 opacity-60'
            }`}>
              <div className="flex items-center gap-2">
                <Briefcase className={`h-4 w-4 ${profile.occupation ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {language === 'hi' ? 'व्यवसाय' : 'Occupation'}
                </span>
              </div>
              <span className={`text-xs font-bold ${profile.occupation ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
                {profile.occupation 
                  ? (language === 'hi' 
                      ? (profile.occupation === 'Farmer' ? 'किसान' : profile.occupation === 'Street Vendor' ? 'सड़क विक्रेता' : profile.occupation === 'Student' ? 'छात्र' : profile.occupation === 'Shopkeeper' ? 'दुकानदार' : 'मजदूर') 
                      : profile.occupation) 
                  : (language === 'hi' ? 'प्रतीक्षा करें...' : 'Waiting...')}
              </span>
            </div>

            {/* Income */}
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              profile.income !== undefined 
                ? 'border-emerald-250 bg-emerald-50/30 dark:bg-emerald-950/10' 
                : 'border-slate-100 bg-slate-50/50 dark:bg-slate-800/50 opacity-60'
            }`}>
              <div className="flex items-center gap-2">
                <IndianRupee className={`h-4 w-4 ${profile.income !== undefined ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {language === 'hi' ? 'वार्षिक आय' : 'Annual Income'}
                </span>
              </div>
              <span className={`text-xs font-bold ${profile.income !== undefined ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
                {profile.income !== undefined ? `₹${profile.income.toLocaleString()}` : (language === 'hi' ? 'प्रतीक्षा करें...' : 'Waiting...')}
              </span>
            </div>

            {/* Age */}
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              profile.age 
                ? 'border-emerald-250 bg-emerald-50/30 dark:bg-emerald-950/10' 
                : 'border-slate-100 bg-slate-50/50 dark:bg-slate-800/50 opacity-60'
            }`}>
              <div className="flex items-center gap-2">
                <Calendar className={`h-4 w-4 ${profile.age ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {language === 'hi' ? 'आयु' : 'Age'}
                </span>
              </div>
              <span className={`text-xs font-bold ${profile.age ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
                {profile.age ? `${profile.age} ${language === 'hi' ? 'वर्ष' : 'years'}` : (language === 'hi' ? 'प्रतीक्षा करें...' : 'Waiting...')}
              </span>
            </div>

            {/* Location */}
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              profile.location 
                ? 'border-emerald-250 bg-emerald-50/30 dark:bg-emerald-950/10' 
                : 'border-slate-100 bg-slate-50/50 dark:bg-slate-800/50 opacity-60'
            }`}>
              <div className="flex items-center gap-2">
                <MapPin className={`h-4 w-4 ${profile.location ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {language === 'hi' ? 'क्षेत्र' : 'Location'}
                </span>
              </div>
              <span className={`text-xs font-bold ${profile.location ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
                {profile.location 
                  ? (language === 'hi' ? (profile.location === 'Rural' ? 'ग्रामीण' : 'शहरी') : profile.location) 
                  : (language === 'hi' ? 'प्रतीक्षा करें...' : 'Waiting...')}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-orange-50/50 dark:bg-orange-955/10 rounded-xl border border-orange-100 dark:border-orange-900/30 text-xs">
            <span className="font-bold text-orange-850 dark:text-orange-400 flex items-center gap-1">
              <span>🎙</span> {language === 'hi' ? 'वॉयस इनपुट वेवफॉर्म' : 'Voice Input Waveform'}
            </span>
            <div className="flex items-center gap-1.5 mt-2 h-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                <span 
                  key={val} 
                  className={`w-1 bg-orange-500 rounded-full transition-all duration-300 ${
                    isListening ? 'animate-bounce h-5' : 'h-1.5'
                  }`}
                  style={{ animationDelay: `${val * 60}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 dark:text-slate-550 text-center">
          {language === 'hi'
            ? 'वाणी-सेतु आपकी प्राकृतिक भाषा से स्वचालित रूप से मापदंडों को निकालता है।'
            : 'Vaani-Setu automatically extracts eligibility parameters from your natural speech.'
          }
        </div>
      </div>

    </div>
  );
};
