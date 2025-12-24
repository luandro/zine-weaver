import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Language, LocalizedString } from '@/types/zine';
import { useConfig } from './ConfigContext';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: LocalizedString) => string;
  toggleLanguage: () => void;
  supportedLanguages: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

// Fallback UI translations (used if config fails to load)
const fallbackTranslations: Record<string, LocalizedString> = {
  readNow: { en: "Read Now", pt: "Ler Agora" },
  comingSoon: { en: "Coming Soon", pt: "Em Breve" },
  available: { en: "Available", pt: "Disponível" },
  issue: { en: "Issue", pt: "Edição" },
  page: { en: "Page", pt: "Página" },
  of: { en: "of", pt: "de" },
  close: { en: "Close", pt: "Fechar" },
  previous: { en: "Previous", pt: "Anterior" },
  next: { en: "Next", pt: "Próximo" },
  language: { en: "Language", pt: "Idioma" },
  switchLanguage: { en: "Switch language", pt: "Mudar idioma" },
  english: { en: "English", pt: "Inglês" },
  portuguese: { en: "Portuguese", pt: "Português" },
  currentLanguage: { en: "Current language: English", pt: "Idioma atual: Português" },
  backToHome: { en: "Back to Home", pt: "Voltar ao Início" },
};

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  const { site } = useConfig();
  const [language, setLanguage] = useState<Language>(
    (site?.metadata.defaultLanguage as Language) || defaultLanguage
  );

  const supportedLanguages = useMemo(
    () => site?.metadata.supportedLanguages || ['en', 'pt'],
    [site?.metadata.supportedLanguages]
  );

  const t = useCallback((text: LocalizedString): string => {
    return text[language] || text.en || '';
  }, [language]);

  const toggleLanguage = useCallback(() => {
    if (supportedLanguages.length === 2) {
      setLanguage(prev => prev === supportedLanguages[0] ? supportedLanguages[1] as Language : supportedLanguages[0] as Language);
    }
  }, [supportedLanguages]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage, supportedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// UI translations - now loaded from config with fallback
export function useUITranslations() {
  const { content } = useConfig();
  return content?.ui || fallbackTranslations;
}

// Backward compatibility export
export const uiTranslations = fallbackTranslations;
