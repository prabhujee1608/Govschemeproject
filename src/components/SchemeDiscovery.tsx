import React from 'react';
import { Search, MapPin, Briefcase, IndianRupee, HelpCircle, CheckCircle2, ChevronRight, FileCheck, ArrowUpRight } from 'lucide-react';
import { Scheme } from '@/data/schemes';
import { t } from '../data/translations';

interface SchemeDiscoveryProps {
  schemes: Scheme[];
  onCheckEligibility: (scheme: Scheme) => void;
  onViewDocuments: (scheme: Scheme) => void;
  language: string;
}

export const SchemeDiscovery: React.FC<SchemeDiscoveryProps> = ({
  schemes,
  onCheckEligibility,
  onViewDocuments,
  language
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedRuralUrban, setSelectedRuralUrban] = React.useState('All');
  const [selectedGender, setSelectedGender] = React.useState('All');

  const categories = ['All', 'Agriculture', 'Healthcare', 'Housing', 'Financial Assistance', 'Women & Child', 'Social Security'];

  const filteredSchemes = schemes.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesRuralUrban = selectedRuralUrban === 'All' || 
                             s.criteria.ruralUrban === 'Both' || 
                             s.criteria.ruralUrban === selectedRuralUrban;
                             
    const matchesGender = selectedGender === 'All' || 
                          !s.criteria.genders || 
                          s.criteria.genders.includes(selectedGender);

    return matchesSearch && matchesCategory && matchesRuralUrban && matchesGender;
  });

  return (
    <div className="py-8 transition-colors">
      {/* Filter panel */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8 transition-colors">
        <h3 className="text-lg font-bold text-indigo-950 dark:text-white mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-orange-600" /> {t("disc.filterTitle", language)}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t("disc.searchLabel", language)}</label>
            <input
              type="text"
              placeholder={t("disc.searchPlaceholder", language)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t("disc.categoryLabel", language)}</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-slate-800"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{t("cat." + c, language)}</option>
              ))}
            </select>
          </div>

          {/* Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t("disc.regionLabel", language)}</label>
            <select
              value={selectedRuralUrban}
              onChange={(e) => setSelectedRuralUrban(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-slate-800"
            >
              <option value="All">{t("disc.regionAll", language)}</option>
              <option value="Rural">{t("disc.regionRural", language)}</option>
              <option value="Urban">{t("disc.regionUrban", language)}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <div 
              key={scheme.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-orange-200 dark:hover:border-orange-500/35 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/40 text-indigo-850 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                    {t("cat." + scheme.category, language)}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {scheme.department.split(' ')[1] || 'Central Govt'}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-indigo-950 dark:text-white mb-2 leading-snug">{scheme.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">{scheme.description}</p>

                <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl mb-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-350 leading-normal">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-450 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {language === 'hi' ? 'मुख्य लाभ:' : 'Key Benefits:'}
                      </span> {scheme.benefits}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => onCheckEligibility(scheme)}
                  className="flex-1 rounded-lg bg-orange-600 py-2 px-3 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 transition flex items-center justify-center gap-1.5"
                >
                  {t("disc.checkBtn", language)} <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onViewDocuments(scheme)}
                  className="rounded-lg border border-slate-300 dark:border-slate-600 hover:border-orange-600 text-slate-750 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 py-2 px-3.5 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <FileCheck className="h-4 w-4" /> {t("disc.docsBtn", language)}
                </button>
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-200 dark:border-slate-700 py-2 px-3 text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition flex items-center justify-center"
                  title="Official Portal Link"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <p className="text-slate-500 dark:text-slate-400 font-medium">{t("disc.noMatch", language)}</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedRuralUrban('All'); setSelectedGender('All'); }}
              className="mt-3 text-sm text-orange-600 dark:text-orange-400 font-semibold hover:underline"
            >
              {language === 'hi' ? 'सभी फ़िल्टर रीसेट करें' : 'Reset All Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
