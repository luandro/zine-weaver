import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language, LocalizedString } from '@/types/zine';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: LocalizedString) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = useCallback((text: LocalizedString): string => {
    return text[language] || text.en || '';
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'pt' : 'en');
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
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

// UI translations
export const uiTranslations: Record<string, LocalizedString> = {
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
  seriesDescription: {
    en: "A series of visual stories exploring the strange intimacy of conversing with artificial minds.",
    pt: "Uma série de histórias visuais explorando a estranha intimidade de conversar com mentes artificiais."
  },
  heroSubtitle: {
    en: "Visual Stories from the Edge of Understanding",
    pt: "Histórias Visuais do Limite da Compreensão"
  },
  aboutTitle: { en: "About the Series", pt: "Sobre a Série" },
  aboutText: {
    en: "What happens when we speak to something that isn't quite alive, yet isn't quite mechanical? These zines document real conversations, transformed into visual narratives that explore memory, consciousness, and the spaces between human and machine.",
    pt: "O que acontece quando falamos com algo que não está bem vivo, mas também não é bem mecânico? Estes zines documentam conversas reais, transformadas em narrativas visuais que exploram memória, consciência e os espaços entre humano e máquina."
  },
  allZines: { en: "All Zines", pt: "Todos os Zines" },
  backToHome: { en: "Back to Home", pt: "Voltar ao Início" },
};
