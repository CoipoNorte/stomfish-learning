import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../i18n/translations';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.es;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('stomfish-lang') as Language;
      if (saved === 'es' || saved === 'en') return saved;
      // Detect browser language
      const browserLang = navigator.language.slice(0, 2);
      return browserLang === 'es' ? 'es' : 'en';
    }
    return 'es';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('stomfish-lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
