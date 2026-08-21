import React from 'react';
import { User, MapPin, Briefcase, IndianRupee, HelpCircle, Check, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { Scheme } from '@/data/schemes';
import { t } from '../data/translations';

interface EligibilityCheckerProps {
  schemes: Scheme[];
  onFinishCheck: (matches: Array<{ scheme: Scheme; score: number; reason: string }>) => void;
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
      let score = 100;
      const reasons: string[] = [];

      // Age check
      if (scheme.criteria.minAge && age < scheme.criteria.minAge) {
        score -= 20;
        reasons.push(language === 'hi' 
          ? `न्यूनतम आयु ${scheme.criteria.minAge} वर्ष आवश्यक है (आपकी आयु: ${age} वर्ष)`
          : `Minimum age required is ${scheme.criteria.minAge} (You are ${age})`
        );
      }
      if (scheme.criteria.maxAge && age > scheme.criteria.maxAge) {
        score -= 20;
        reasons.push(language === 'hi'
          ? `अधिकतम आयु सीमा ${scheme.criteria.maxAge} वर्ष है (आपकी आयु: ${age} वर्ष)`
          : `Maximum age limit is ${scheme.criteria.maxAge} (You are ${age})`
        );
      }

      // Gender check
      if (scheme.criteria.genders && !scheme.criteria.genders.includes(gender)) {
        score -= 30;
        reasons.push(language === 'hi'
          ? `मुख्य रूप से केवल ${scheme.criteria.genders.map(g => g === 'Female' ? 'महिलाओं' : g === 'Male' ? 'पुरुषों' : 'अन्य').join(', ')} के लिए केंद्रित है`
          : `Targeted primarily for ${scheme.criteria.genders.join(', ')}`
        );
      }

      // Occupation check
      if (scheme.criteria.occupations && !scheme.criteria.occupations.includes(occupation)) {
        score -= 25;
        reasons.push(language === 'hi'
          ? `विशेष रूप से इन व्यवसायों के लिए अनुकूलित है: ${scheme.criteria.occupations.map(o => o === 'Farmer' ? 'किसान' : o).join(', ')}`
          : `Tailored for occupations: ${scheme.criteria.occupations.join(', ')}`
        );
      }

      // Income check
      if (scheme.criteria.maxIncome && income > scheme.criteria.maxIncome) {
        score -= 35;
        reasons.push(language === 'hi'
          ? `अधिकतम आय सीमा ₹${scheme.criteria.maxIncome.toLocaleString()} है (आपकी आय: ₹${income.toLocaleString()})`
          : `Income threshold is ₹${scheme.criteria.maxIncome.toLocaleString()} (Your income: ₹${income.toLocaleString()})`
        );
      }

      // Rural/Urban check
      if (scheme.criteria.ruralUrban && scheme.criteria.ruralUrban !== 'Both' && scheme.criteria.ruralUrban !== ruralUrban) {
        score -= 15;
        reasons.push(language === 'hi'
          ? `${scheme.criteria.ruralUrban === 'Rural' ? 'ग्रामीण' : 'शहरी'} क्षेत्रों में ही उपलब्ध है`
          : `Available in ${scheme.criteria.ruralUrban} regions`
        );
      }

      const matchScore = Math.max(20, score);
      const reasonStr = reasons.length > 0 
        ? (language === 'hi' ? `अधिकांश मानदंड पूरे होते हैं। ${reasons[0]}` : `Meets most criteria. ${reasons[0]}`)
        : (language === 'hi' ? "सभी जनसांख्यिकीय और वित्तीय मानदंडों को पूरा करता है।" : "Matches all demographic and financial criteria criteria criteria.");

      return {
        scheme,
        score: matchScore,
        reason: reasonStr
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
