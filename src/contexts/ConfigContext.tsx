import React, { createContext, useContext, ReactNode } from "react";
import type { ThemeConfig, SiteConfig, ContentConfig } from "@/types/config";
import { useThemeConfig, useSiteConfig, useContentConfig } from "@/hooks/useConfig";

interface ConfigContextType {
  theme: ThemeConfig | null;
  site: SiteConfig | null;
  content: ContentConfig | null;
  loading: boolean;
  error: Error | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const { config: theme, loading: themeLoading, error: themeError } = useThemeConfig();
  const { config: site, loading: siteLoading, error: siteError } = useSiteConfig();
  const { config: content, loading: contentLoading, error: contentError } = useContentConfig();

  const loading = themeLoading || siteLoading || contentLoading;
  const error = themeError || siteError || contentError;

  return (
    <ConfigContext.Provider value={{ theme, site, content, loading, error }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}
