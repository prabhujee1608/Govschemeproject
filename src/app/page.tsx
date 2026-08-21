'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { SchemeDiscovery } from '@/components/SchemeDiscovery';
import { EligibilityChecker } from '@/components/EligibilityChecker';
import { DocumentChecklist } from '@/components/DocumentChecklist';
import { ApplicationTimeline } from '@/components/ApplicationTimeline';
import { FAQ } from '@/components/FAQ';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { schemesData, Scheme } from '@/data/schemes';
import { Mic, ArrowRight, ShieldAlert, Sparkles, BookOpen, HeartPulse, Tractor, HandCoins, AlertCircle, FileCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { t } from '@/data/translations';
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

export default function Home() {
  const [currentTab, setCurrentTab] = React.useState('home');
  const [language, setLanguage] = React.useState('hi');
  const [selectedScheme, setSelectedScheme] = React.useState<Scheme | null>(null);
  const [checklistScheme, setChecklistScheme] = React.useState<Scheme | null>(null);
  const [timelineScheme, setTimelineScheme] = React.useState<Scheme | null>(null);
  const [eligibilityMatches, setEligibilityMatches] = React.useState<Array<{ scheme: Scheme; score: number; reason: string }> | null>(null);

  // User Auth States
  const [user, setUser] = React.useState<{ name: string } | null>(null);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      setUser({ name: usernameInput });
      setIsLoginOpen(false);
      setUsernameInput('');
      setPasswordInput('');
      triggerConfetti();
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Trigger confetti for matches
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800">
      
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        language={language} 
        setLanguage={setLanguage} 
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1">

        {/* Home Tab */}
        {currentTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-indigo-950 py-20 text-white">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.15),transparent_50%)]" />
              
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Callout */}
                <div className="lg:col-span-6 space-y-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge", language)}
                  </span>
                  
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                    {t("hero.title1", language)}<br/>
                    <span className="bg-gradient-to-r from-orange-400 via-white to-emerald-400 bg-clip-text text-transparent">
                      {t("hero.title2", language)}
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-350 leading-relaxed max-w-lg">
                    {t("hero.subtitle", language)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        const element = document.getElementById('ai-assistant');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="rounded-lg bg-orange-600 hover:bg-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition flex items-center gap-2"
                    >
                      <Mic className="h-4.5 w-4.5" /> {t("hero.cta.start", language)}
                    </button>
                    
                    <button
                      onClick={() => setCurrentTab('schemes')}
                      className="rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-900/50 px-6 py-3 text-sm font-semibold text-slate-200 transition"
                    >
                      {t("hero.cta.explore", language)}
                    </button>
                  </div>
                </div>

                {/* Hero Interactive Widget */}
                <div className="lg:col-span-6">
                  <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/10 p-6 shadow-2xl">
                    <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-4">
                      <div className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />
                      {t("hero.preview.live", language)}
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <span className="text-[10px] font-bold text-orange-400 uppercase block mb-1">{t("hero.preview.citizen", language)}</span>
                        {t("hero.preview.citizenText", language)}
                      </div>
                      
                      <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-slate-200">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">{t("hero.preview.assistant", language)}</span>
                        {t("hero.preview.assistantText", language)}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Problem Section */}
            <section className="py-16 bg-white border-b border-slate-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-extrabold text-indigo-950 sm:text-4xl tracking-tight">
                    {t("problem.title", language)}
                  </h2>
                  <p className="mt-4 text-base text-slate-650 max-w-2xl mx-auto">
                    {t("problem.subtitle", language)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                  {[
                    { title: t("problem.c1.title", language), desc: t("problem.c1.desc", language) },
                    { title: t("problem.c2.title", language), desc: t("problem.c2.desc", language) },
                    { title: t("problem.c3.title", language), desc: t("problem.c3.desc", language) },
                    { title: t("problem.c4.title", language), desc: t("problem.c4.desc", language) }
                  ].map((prob, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between hover:border-orange-200 transition">
                      <h4 className="font-bold text-indigo-950 text-base">{prob.title}</h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{prob.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Visual Flow diagram */}
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex flex-col md:flex-row items-center justify-around gap-2 text-center text-xs font-bold text-orange-900">
                  <span>{t("problem.flow.c1", language)}</span>
                  <ChevronRight className="h-4 w-4 hidden md:block text-orange-500" />
                  <span>{t("problem.flow.c2", language)}</span>
                  <ChevronRight className="h-4 w-4 hidden md:block text-orange-500" />
                  <span>{t("problem.flow.c3", language)}</span>
                  <ChevronRight className="h-4 w-4 hidden md:block text-orange-500" />
                  <span>{t("problem.flow.c4", language)}</span>
                  <ChevronRight className="h-4 w-4 hidden md:block text-orange-500" />
                  <span className="text-red-650">{t("problem.flow.c5", language)}</span>
                </div>

              </div>
            </section>

            {/* Solution Section */}
            <section className="py-16 bg-slate-50">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{t("sol.tag", language)}</span>
                  <h2 className="mt-2 text-3xl font-extrabold text-indigo-950 sm:text-4xl">
                    {t("sol.title", language)}
                  </h2>
                  <p className="mt-3 text-base text-slate-600">
                    {t("sol.subtitle", language)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { num: "01", title: t("sol.s1.title", language), desc: t("sol.s1.desc", language) },
                    { num: "02", title: t("sol.s2.title", language), desc: t("sol.s2.desc", language) },
                    { num: "03", title: t("sol.s3.title", language), desc: t("sol.s3.desc", language) },
                    { num: "04", title: t("sol.s4.title", language), desc: t("sol.s4.desc", language) },
                    { num: "05", title: t("sol.s5.title", language), desc: t("sol.s5.desc", language) }
                  ].map((sol, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-250/70 shadow-sm flex flex-col justify-between hover:shadow transition">
                      <div>
                        <span className="text-2xl font-black text-orange-400 block mb-2">{sol.num}</span>
                        <h4 className="font-bold text-indigo-950 text-sm">{sol.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{sol.desc}</p>
                    </div>
                  ))}
                </div>

              </div>
            </section>
            {/* Assistant Demo Section */}
            <section className="py-16 bg-white border-t border-slate-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-950">
                    {t("assistant.title", language)}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    {t("assistant.subtitle", language)}
                  </p>
                </div>

                <VoiceAssistant 
                  schemes={schemesData}
                  onSelectScheme={(sch) => {
                    setSelectedScheme(sch);
                    setCurrentTab('schemes-view');
                  }}
                  onCheckEligibility={(sch) => {
                    setChecklistScheme(sch);
                    setCurrentTab('documents');
                  }}
                  language={language}
                />
              </div>
            </section>

            {/* Architecture Diagram */}
            <ArchitectureDiagram />

            {/* How It Works Journey */}
            <section id="how-it-works" className="py-16 bg-slate-50 border-t border-slate-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-extrabold text-indigo-950">
                    {t("journey.title", language)}
                  </h2>
                  <p className="text-sm text-slate-650 mt-2">{t("journey.subtitle", language)}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                  {[
                    { step: language === 'hi' ? "01 पूछें" : "01 ASK", desc: t("journey.s1", language) },
                    { step: language === 'hi' ? "02 जानकारी लें" : "02 EXTRACT", desc: t("journey.s2", language) },
                    { step: language === 'hi' ? "03 मिलान करें" : "03 MATCH", desc: t("journey.s3", language) },
                    { step: language === 'hi' ? "04 स्पष्टीकरण" : "04 EXPLAIN", desc: t("journey.s4", language) },
                    { step: language === 'hi' ? "05 तैयार करें" : "05 PREPARE", desc: t("journey.s5", language) },
                    { step: language === 'hi' ? "06 आवेदन करें" : "06 ACT", desc: t("journey.s6", language) }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 text-center flex flex-col justify-between">
                      <span className="text-xs font-bold text-orange-600 uppercase block mb-1">{item.step}</span>
                      <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* Impact Section */}
            <section className="py-16 bg-white border-t border-slate-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{t("impact.tag", language)}</span>
                  <h2 className="mt-2 text-3xl font-extrabold text-indigo-950">
                    {t("impact.title", language)}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  {[
                    { val: t("impact.i1.val", language), label: t("impact.i1.label", language) },
                    { val: t("impact.i2.val", language), label: t("impact.i2.label", language) },
                    { val: t("impact.i3.val", language), label: t("impact.i3.label", language) },
                    { val: t("impact.i4.val", language), label: t("impact.i4.label", language) }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="text-4xl font-extrabold text-orange-600 mb-2">{stat.val}</div>
                      <div className="text-xs font-semibold text-indigo-950 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Future Vision Section */}
            <section className="py-16 bg-slate-900 text-white">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {t("roadmap.tag", language)}
                  </span>
                  <h2 className="text-3xl font-extrabold sm:text-4xl">
                    {t("roadmap.title", language)}
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    {t("roadmap.subtitle", language)}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
                    {[
                      { ph: t("roadmap.p1.tag", language), title: t("roadmap.p1.title", language), desc: t("roadmap.p1.desc", language) },
                      { ph: t("roadmap.p2.tag", language), title: t("roadmap.p2.title", language), desc: t("roadmap.p2.desc", language) },
                      { ph: t("roadmap.p3.tag", language), title: t("roadmap.p3.title", language), desc: t("roadmap.p3.desc", language) }
                    ].map((phase, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-bold text-orange-400 block mb-1">{phase.ph}</span>
                        <h4 className="font-bold text-sm text-slate-100">{phase.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{phase.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* Schemes Tab */}
        {currentTab === 'schemes' && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-indigo-950 sm:text-4xl">
                {t("disc.title", language)}
              </h2>
              <p className="mt-3 text-base text-slate-650">
                {t("disc.subtitle", language)}
              </p>
            </div>

            <SchemeDiscovery 
              schemes={schemesData}
              onCheckEligibility={(scheme) => {
                // Initialize checker with this scheme focus
                setSelectedScheme(scheme);
                setCurrentTab('checker');
              }}
              language={language}
              onViewDocuments={(scheme) => {
                setChecklistScheme(scheme);
                setCurrentTab('documents');
              }}
            />
          </section>
        )}

        {/* Eligibility Checker Tab */}
        {currentTab === 'checker' && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-indigo-950">
                {t("checker.title", language)}
              </h2>
              <p className="mt-3 text-base text-slate-650">
                {t("checker.subtitle", language)}
              </p>
            </div>

            {!eligibilityMatches ? (
              <EligibilityChecker 
                schemes={schemesData}
                onFinishCheck={(matches) => {
                  setEligibilityMatches(matches);
                  triggerConfetti();
                }}
                language={language}
              />
            ) : (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-emerald-50 rounded-2xl border border-emerald-250 p-6 text-center">
                  <h3 className="text-lg font-bold text-emerald-900">{t("checker.resultsTitle", language)}</h3>
                  <p className="text-xs text-emerald-750 mt-1">{t("checker.resultsSubtitle", language)}</p>
                </div>

                <div className="space-y-4">
                  {eligibilityMatches.map(({ scheme, score, reason }) => (
                    <div key={scheme.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="inline-block text-[10px] font-bold text-orange-600 uppercase tracking-wide mb-1">
                            {t("cat." + scheme.category, language)}
                          </span>
                          <h4 className="text-base font-bold text-indigo-950">{scheme.name}</h4>
                          <p className="text-xs text-slate-600 mt-2">{reason}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            score >= 80 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : score >= 50 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-slate-100 text-slate-700'
                          }`}>
                            {score}% {language === 'hi' ? 'मिलान' : 'Match'}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setChecklistScheme(scheme);
                            setCurrentTab('documents');
                          }}
                          className="flex-1 rounded-lg bg-indigo-950 py-2 px-3 text-xs font-semibold text-white hover:bg-indigo-900 transition flex items-center justify-center gap-1.5"
                        >
                          {language === 'hi' ? 'दस्तावेज़ चेकलिस्ट' : 'Checklist'}
                        </button>
                        <button
                          onClick={() => {
                            setTimelineScheme(scheme);
                            setCurrentTab('timeline');
                          }}
                          className="flex-1 rounded-lg border border-slate-300 py-2 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                          {language === 'hi' ? 'आवेदन मार्गदर्शिका' : 'Filing Guide'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setEligibilityMatches(null)}
                    className="text-sm font-semibold text-orange-600 hover:underline"
                  >
                    {t("checker.reset", language)}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Documents Checklist View */}
        {currentTab === 'documents' && checklistScheme && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <DocumentChecklist 
              scheme={checklistScheme}
              onBack={() => {
                setCurrentTab('schemes');
                setChecklistScheme(null);
              }}
              language={language}
            />
          </section>
        )}

        {/* Timeline View */}
        {currentTab === 'timeline' && timelineScheme && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <ApplicationTimeline 
              scheme={timelineScheme}
              onBack={() => {
                setCurrentTab('checker');
                setTimelineScheme(null);
              }}
              language={language}
            />
          </section>
        )}

        {/* Single Scheme Detail View */}
        {currentTab === 'schemes-view' && selectedScheme && (
          <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{t("cat." + selectedScheme.category, language)}</span>
              <h2 className="text-2xl font-bold text-indigo-950 mt-1 mb-2">{selectedScheme.name}</h2>
              <p className="text-xs text-slate-400 mb-6">{selectedScheme.department}</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 block mb-2">{language === 'hi' ? 'विवरण' : 'Description'}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedScheme.description}</p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h4 className="text-sm font-bold text-slate-900 block mb-2">{language === 'hi' ? 'लाभ' : 'Benefits'}</h4>
                  <p className="text-sm text-slate-600">{selectedScheme.benefits}</p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h4 className="text-sm font-bold text-slate-900 block mb-2">{language === 'hi' ? 'आवश्यक दस्तावेजों की चेकलिस्ट' : 'Required Documents Checklist'}</h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {selectedScheme.requiredDocuments.map((doc, idx) => (
                      <li key={idx}>
                        {language === 'hi'
                          ? (docTranslations[doc]?.["hi"] || doc)
                          : doc
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    setCurrentTab('home');
                    setSelectedScheme(null);
                  }}
                  className="rounded-lg border border-slate-300 py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  {language === 'hi' ? 'विवरण बंद करें' : 'Close Detail'}
                </button>
                <button
                  onClick={() => {
                    setChecklistScheme(selectedScheme);
                    setCurrentTab('documents');
                  }}
                  className="flex-1 rounded-lg bg-orange-600 py-2.5 px-4 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 transition"
                >
                  {language === 'hi' ? 'दस्तावेज सत्यापित करें और चेकलिस्ट सेटअप करें' : 'Verify Documents & Setup Checklist'}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* About Tab */}
        {currentTab === 'about' && (
          <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
              <h2 className="text-3xl font-extrabold text-indigo-950">
                {language === 'hi' ? 'वाणी-सेतु के बारे में' : 'About Vaani-Setu'}
              </h2>
              <p className="text-sm text-slate-650 leading-relaxed">
                {language === 'hi' ? (
                  <>
                    वाणी-सेतु की परिकल्पना <strong>राष्ट्रीय हैकाथॉन ग्रैंड फिनाले</strong> में सार्वजनिक कल्याण वितरण में सूचना अंतराल को पाटने के लिए एक समाधान के रूप में की गई थी। 
                    वेब ऑडियो इंटरफेस को संरचित योजना पात्रता नियमों के साथ जोड़कर, हम नागरिकों को वॉयस इनपुट का उपयोग करके महत्वपूर्ण कल्याणकारी संसाधनों की खोज करने में सक्षम बनाते हैं।
                  </>
                ) : (
                  <>
                    Vaani-Setu was conceived at the <strong>National Hackathon Grand Finale</strong> as a solution to bridge information gaps in public welfare distribution. 
                    By combining web audio interfaces with structured scheme eligibility rules, we enable citizens to discover vital resources using voice input.
                  </>
                )}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-indigo-950 text-sm">
                    {language === 'hi' ? 'स्थानीय संवादों को सशक्त बनाना' : 'Empowering Local Dialogues'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'hi'
                      ? 'हिंदी, बंगाली और अन्य क्षेत्रीय भाषाओं में बोलकर प्रश्नों को सुनता और उत्तर देता है।'
                      : 'Accepts and speaks answers in native regional languages like Hindi and Bengali.'
                    }
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-indigo-950 text-sm">
                    {language === 'hi' ? 'सुरक्षा और गोपनीयता पहले' : 'Security & Privacy First'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'hi'
                      ? 'नागरिकों का जनसांख्यिकीय विवरण स्थानीय ब्राउज़र रनटाइम में संसाधित होता है। कोई स्थायी ट्रैकिंग नहीं की जाती।'
                      : 'Demographics are processed on the client browser. No persistent tracking is gathered.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How It Works Tab */}
        {currentTab === 'how-it-works' && (
          <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
              <h2 className="text-3xl font-extrabold text-indigo-950">
                {language === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
              </h2>
              <p className="text-sm text-slate-650 leading-relaxed">
                {language === 'hi'
                  ? 'वाणी-सेतु आपके लिए संघीय और राज्य कल्याणकारी लाभों की पात्रता का अनुमान लगाने के लिए नियम मिलान इंजन का उपयोग करता है। नीचे हमारी कार्यप्रवाह यात्रा का अनुसरण करें:'
                  : 'Vaani-Setu uses a rule matching engine to estimate your eligibility for federal and state benefits. Follow our workflow journey:'
                }
              </p>
              
              <div className="relative border-l-2 border-orange-500 ml-4 pl-6 space-y-6">
                {[
                  { 
                    title: language === 'hi' ? "1. अपनी जिज्ञासा बोलें" : "1. Speak your query", 
                    desc: language === 'hi' ? "सीधे सहायक में हिंदी, अंग्रेजी, मराठी या बंगाली में बोलें।" : "Speak directly into the assistant in Hindi, English, Marathi or Bengali." 
                  },
                  { 
                    title: language === 'hi' ? "2. इकाई रूपरेखा विश्लेषण" : "2. Entity profiling", 
                    desc: language === 'hi' ? "मंच विवरणों (जैसे व्यवसाय, राज्य, लिंग, आय, आयु) को स्वचालित रूप से फ़िल्टर करता है।" : "The platform filters parameters (occupation, state, gender, income, age)." 
                  },
                  { 
                    title: language === 'hi' ? "3. नियम गणना" : "3. Rules computation", 
                    desc: language === 'hi' ? "आपके डेटा की तुलना योजना के पात्रता नियमों (जैसे भूमि स्वामित्व, आयु सीमा) से की जाती है।" : "Your data is compared against constraints (such as land ownership, age limits)." 
                  },
                  { 
                    title: language === 'hi' ? "4. चेकलिस्ट असेंबली" : "4. Checklist assembly", 
                    desc: language === 'hi' ? "एक कस्टम, डाउनलोड करने योग्य चेकलिस्ट में आवश्यक दस्तावेजों को सत्यापित करें।" : "Verify documents in a custom, downloadable checklist." 
                  }
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-10 h-6 w-6 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-xs font-bold text-orange-600">
                      {idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-indigo-950">{step.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Tab */}
        {currentTab === 'faq' && <FAQ language={language} />}

      </main>

      <Footer setCurrentTab={setCurrentTab} />

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-2xl border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
              <h3 className="text-lg font-bold text-indigo-950 dark:text-white">{t("login.title", language)}</h3>
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-semibold"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t("login.nameLabel", language)}</label>
                <input
                  type="text"
                  required
                  placeholder={t("login.namePlaceholder", language)}
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t("login.idLabel", language)}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800 dark:text-white"
                />
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-955/40 rounded-lg text-[11px] text-indigo-850 dark:text-indigo-300">
                {t("login.note", language)}
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-orange-600 hover:bg-orange-700 text-white py-2.5 text-sm font-semibold shadow-sm transition"
              >
                {t("login.submit", language)}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
