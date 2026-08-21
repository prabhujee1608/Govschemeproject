import React from 'react';
import { User, MapPin, Briefcase, IndianRupee, HelpCircle, Check, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { Scheme } from '@/data/schemes';
import { t } from '../data/translations';

interface EligibilityCheckerProps {
  schemes: Scheme[];
  onFinishCheck: (matches: Array<{ 
    scheme: Scheme; 
    score: number; 
    reason: string;
    breakdown: {
      occupationScore: number;
      occupationMax: number;
      occupationPassed: boolean;
      incomeScore: number;
      incomeMax: number;
      incomePassed: boolean;
      ageScore: number;
      ageMax: number;
      agePassed: boolean;
      locationScore: number;
      locationMax: number;
      locationPassed: boolean;
      documentsScore: number;
      documentsMax: number;
      documentsPassed: boolean;
    };
    whyRecommended: string[];
    whyNotEligible: string[];
    circumstancesChangeAdvice?: string;
  }>) => void;
  language: string;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
  schemes,
  onFinishCheck,
  language
}) => {
  const [step, setStep] = React.useState(1);
  const [age, setAge] = React.useState<number>(30);
  const [gender, setGender] = React.useState<string>('Male');
  const [state, setState] = React.useState<string>('Uttar Pradesh');
  const [ruralUrban, setRuralUrban] = React.useState<'Rural' | 'Urban'>('Rural');
  const [occupation, setOccupation] = React.useState<string>('Farmer');
  const [income, setIncome] = React.useState<number>(80000);
  const [familySize, setFamilySize] = React.useState<number>(4);

  const totalSteps = 5;

  const calculateMatches = () => {
    const results = schemes.map((scheme) => {
      const whyRecommended: string[] = [];
      const whyNotEligible: string[] = [];

      // 1. Occupation Match (30 pts)
      let occupationScore = 30;
      let occupationPassed = true;
      if (scheme.criteria.occupations) {
        if (scheme.criteria.occupations.includes(occupation)) {
          whyRecommended.push(language === 'hi' ? `व्यवसाय: ${occupation === 'Farmer' ? 'किसान' : occupation}` : `Occupation: ${occupation}`);
        } else {
          occupationScore = 0;
          occupationPassed = false;
          whyNotEligible.push(language === 'hi' ? 'व्यवसाय पात्रता मानदंड से मेल नहीं खाता' : 'Occupation does not match requirement');
        }
      } else {
        whyRecommended.push(language === 'hi' ? 'सभी व्यवसायों के लिए खुला है' : 'Open to all occupations');
      }

      // 2. Income Match (20 pts)
      let incomeScore = 20;
      let incomePassed = true;
      if (scheme.criteria.maxIncome) {
        if (income <= scheme.criteria.maxIncome) {
          whyRecommended.push(language === 'hi' ? `आय सीमा के भीतर है (₹${income.toLocaleString()} <= ₹${scheme.criteria.maxIncome.toLocaleString()})` : `Meets income criteria`);
        } else {
          incomeScore = 0;
          incomePassed = false;
          whyNotEligible.push(language === 'hi' ? `वार्षिक आय सीमा (₹${scheme.criteria.maxIncome.toLocaleString()}) से अधिक है` : `Income exceeds threshold of ₹${scheme.criteria.maxIncome.toLocaleString()}`);
        }
      } else {
        whyRecommended.push(language === 'hi' ? 'कोई आय सीमा नहीं' : 'No income threshold');
      }

      // 3. Age Match (15 pts)
      let ageScore = 15;
      let agePassed = true;
      if (scheme.criteria.minAge && age < scheme.criteria.minAge) {
        ageScore = 0;
        agePassed = false;
        whyNotEligible.push(language === 'hi' ? `न्यूनतम आयु ${scheme.criteria.minAge} वर्ष से कम है` : `Age is below minimum required (${scheme.criteria.minAge})`);
      }
      if (scheme.criteria.maxAge && age > scheme.criteria.maxAge) {
        ageScore = 0;
        agePassed = false;
        whyNotEligible.push(language === 'hi' ? `अधिकतम आयु ${scheme.criteria.maxAge} वर्ष से अधिक है` : `Age exceeds maximum allowed (${scheme.criteria.maxAge})`);
      }
      if (agePassed) {
        whyRecommended.push(language === 'hi' ? `आयु पात्रता सीमा में है (${age} वर्ष)` : `Meets age criteria (${age} years)`);
      }

      // 4. Location Match (15 pts)
      let locationScore = 15;
      let locationPassed = true;
      if (scheme.criteria.ruralUrban && scheme.criteria.ruralUrban !== 'Both') {
        if (scheme.criteria.ruralUrban === ruralUrban) {
          whyRecommended.push(language === 'hi' ? `क्षेत्र से मेल खाता है (${ruralUrban === 'Rural' ? 'ग्रामीण' : 'शहरी'})` : `Location matches (${ruralUrban})`);
        } else {
          locationScore = 0;
          locationPassed = false;
          whyNotEligible.push(language === 'hi' ? `केवल ${scheme.criteria.ruralUrban === 'Rural' ? 'ग्रामीण' : 'शहरी'} क्षेत्रों के लिए उपलब्ध है` : `Only available in ${scheme.criteria.ruralUrban} areas`);
        }
      } else {
        whyRecommended.push(language === 'hi' ? 'सभी क्षेत्रों में उपलब्ध है' : 'Available for all regions');
      }

      // 5. Documents Match (20 pts)
      let documentsScore = 20;
      let documentsPassed = true;
      const missingDocs: string[] = [];

      // Determine typical missing documents based on occupation / criteria
      if (scheme.id === 'pm-kisan' || scheme.id === 'pm-kusum') {
        documentsScore = 12; // missing land documents
        documentsPassed = false;
        missingDocs.push(language === 'hi' ? 'भूमि स्वामित्व दस्तावेज (Land Record)' : 'Land Ownership Documents');
      } else if (scheme.criteria.maxIncome && incomeScore > 0) {
        // e.g. needs income certificate
        documentsScore = 15;
        documentsPassed = false;
        missingDocs.push(language === 'hi' ? 'आय प्रमाण पत्र (Income Certificate)' : 'Income Certificate');
      }

      if (documentsPassed) {
        whyRecommended.push(language === 'hi' ? 'आवश्यक पहचान पत्र उपलब्ध है' : 'Required identity proof available');
      } else {
        missingDocs.forEach(doc => {
          whyNotEligible.push(language === 'hi' ? `${doc} आवश्यक है` : `${doc} required`);
        });
      }

      const totalScore = occupationScore + incomeScore + ageScore + locationScore + documentsScore;
      const reasonStr = whyNotEligible.length > 0
        ? (language === 'hi' 
            ? `पात्रता ${totalScore}%: कुछ मानदंड अपूर्ण हैं।` 
            : `Eligibility: ${totalScore}%. Some criteria not met.`)
        : (language === 'hi' 
            ? "सभी जनसांख्यिकीय और वित्तीय मानदंडों को पूरा करता है।" 
            : "Matches all demographic and financial criteria.");

      const circumstancesChangeAdvice = whyNotEligible.length > 0
        ? (language === 'hi' 
            ? "यदि आपकी परिस्थितियां बदलती हैं (जैसे आय सीमा में आना या आवश्यक दस्तावेज अपडेट करना) तो आप पात्र हो सकते हैं।" 
            : "You may become eligible if your circumstances change (e.g. income falls within range or updating missing documents).")
        : undefined;

      return {
        scheme,
        score: totalScore,
        reason: reasonStr,
        breakdown: {
          occupationScore,
          occupationMax: 30,
          occupationPassed,
          incomeScore,
          incomeMax: 20,
          incomePassed,
          ageScore,
          ageMax: 15,
          agePassed,
          locationScore,
          locationMax: 15,
          locationPassed,
          documentsScore,
          documentsMax: 20,
          documentsPassed
        },
        whyRecommended,
        whyNotEligible,
        circumstancesChangeAdvice
      };
    });

    // Sort by match score descending
    const sorted = results.sort((a, b) => b.score - a.score);
    onFinishCheck(sorted);
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      calculateMatches();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto transition-colors">
      
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          <span>{language === 'hi' ? `चरण ${step} / ${totalSteps}` : `Step ${step} of ${totalSteps}`}</span>
          <span>{Math.round((step / totalSteps) * 100)}% {language === 'hi' ? 'पूर्ण' : 'Complete'}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-emerald-600 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form content */}
      <div className="min-h-[220px] flex flex-col justify-center">
        
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-950 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5 text-orange-600" /> {language === 'hi' ? 'बुनियादी जनसांख्यिकी' : 'Basic Demographics'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-705 dark:text-slate-300 mb-1">{t("checker.age", language)}</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-305 dark:border-slate-650 bg-white dark:bg-slate-750 text-slate-800 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  min="1"
                  max="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-705 dark:text-slate-300 mb-1">{t("checker.gender", language)}</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-lg border border-slate-305 dark:border-slate-650 bg-white dark:bg-slate-750 text-slate-800 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Male" className="dark:bg-slate-800">{language === 'hi' ? 'पुरुष' : 'Male'}</option>
                  <option value="Female" className="dark:bg-slate-800">{language === 'hi' ? 'महिला' : 'Female'}</option>
                  <option value="Other" className="dark:bg-slate-800">{language === 'hi' ? 'अन्य' : 'Other'}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-950 dark:text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-600" /> {language === 'hi' ? 'क्षेत्रीय विवरण' : 'Regional Profile'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-705 dark:text-slate-300 mb-1">{t("checker.state", language)}</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full rounded-lg border border-slate-305 dark:border-slate-650 bg-white dark:bg-slate-750 text-slate-800 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Uttar Pradesh" className="dark:bg-slate-800">Uttar Pradesh (उत्तर प्रदेश)</option>
                  <option value="Bihar" className="dark:bg-slate-800">Bihar (बिहार)</option>
                  <option value="West Bengal" className="dark:bg-slate-800">West Bengal (पश्चिम बंगाल)</option>
                  <option value="Maharashtra" className="dark:bg-slate-800">Maharashtra (महाराष्ट्र)</option>
                  <option value="Tamil Nadu" className="dark:bg-slate-800">Tamil Nadu (तमिलनाडु)</option>
                  <option value="Madhya Pradesh" className="dark:bg-slate-800">Madhya Pradesh (मध्य प्रदेश)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-705 dark:text-slate-300 mb-1">{t("checker.area", language)}</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setRuralUrban('Rural')}
                    className={`py-2 px-3 rounded-lg border text-sm font-semibold transition ${
                      ruralUrban === 'Rural'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {language === 'hi' ? 'ग्रामीण (गांव)' : 'Rural'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRuralUrban('Urban')}
                    className={`py-2 px-3 rounded-lg border text-sm font-semibold transition ${
                      ruralUrban === 'Urban'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {language === 'hi' ? 'शहरी (शहर)' : 'Urban'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-950 dark:text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-orange-600" /> {language === 'hi' ? 'व्यावसायिक स्थिति' : 'Professional Status'}
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-755 dark:text-slate-300 mb-1">{t("checker.occupation", language)}</label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full rounded-lg border border-slate-305 dark:border-slate-650 bg-white dark:bg-slate-750 text-slate-800 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Farmer" className="dark:bg-slate-800">{language === 'hi' ? 'किसान (Farmer)' : 'Farmer'}</option>
                <option value="Street Vendor" className="dark:bg-slate-800">{language === 'hi' ? 'सड़क विक्रेता (Street Vendor)' : 'Street Vendor / Hawkers'}</option>
                <option value="Unorganized Worker" className="dark:bg-slate-800">{language === 'hi' ? 'असंगठित मजदूर (Labourer)' : 'Unorganized Worker / Labourer'}</option>
                <option value="Student" className="dark:bg-slate-800">{language === 'hi' ? 'छात्र (Student)' : 'Student'}</option>
                <option value="Self-employed" className="dark:bg-slate-800">{language === 'hi' ? 'स्व-रोजगार / दुकानदार' : 'Self-employed / Shop owner'}</option>
                <option value="Unemployed" className="dark:bg-slate-800">{language === 'hi' ? 'बेरोजगार (Unemployed)' : 'Unemployed'}</option>
              </select>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-950 dark:text-white flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-orange-600" /> {language === 'hi' ? 'पारिवारिक आय' : 'Household Income'}
            </h3>
            <div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1">
                <span>{t("checker.income", language)}</span>
                <span className="font-semibold text-indigo-950 dark:text-white">₹{income.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="600000"
                step="10000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-550 mt-1">
                <span>₹20,000</span>
                <span>₹3,00,000</span>
                <span>₹6,00,000+</span>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-950 dark:text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-600" /> {language === 'hi' ? 'पारिवारिक विवरण' : 'Family Details'}
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-705 dark:text-slate-300 mb-1">{language === 'hi' ? 'परिवार का कुल आकार' : 'Total Family Size'}</label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5, '6+'].map((num) => {
                  const sizeVal = num === '6+' ? 6 : Number(num);
                  const isSelected = familySize === sizeVal;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFamilySize(sizeVal)}
                      className={`h-10 w-10 rounded-lg border text-sm font-bold flex items-center justify-center transition ${
                        isSelected 
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400' 
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Button navigation footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition ${
            step === 1 
              ? 'text-slate-350 dark:text-slate-600 cursor-not-allowed' 
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <ArrowLeft className="h-4 w-4" /> {language === 'hi' ? 'पीछे' : 'Back'}
        </button>

        <button
          onClick={nextStep}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition shadow-sm"
        >
          {step === totalSteps 
            ? (language === 'hi' ? 'मिलान परिणाम देखें' : 'View Matches') 
            : (language === 'hi' ? 'आगे बढ़ें' : 'Continue')
          } <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
};
