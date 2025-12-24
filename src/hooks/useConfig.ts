import { useState, useEffect } from "react";
import type { ThemeConfig, SiteConfig, ContentConfig } from "@/types/config";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Hook to load and manage theme configuration
 */
export function useThemeConfig() {
  const [config, setConfig] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadThemeConfig() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/config/theme.json`);
        if (!response.ok) {
          throw new Error(`Failed to load theme config: ${response.statusText}`);
        }
        const data = await response.json();
        setConfig(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error loading theme"));
        console.error("Error loading theme config:", err);
      } finally {
        setLoading(false);
      }
    }

    void loadThemeConfig();
  }, []);

  return { config, loading, error };
}

/**
 * Hook to load and manage site configuration
 */
export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadSiteConfig() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/config/site.json`);
        if (!response.ok) {
          throw new Error(`Failed to load site config: ${response.statusText}`);
        }
        const data = await response.json();
        setConfig(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error loading site config"));
        console.error("Error loading site config:", err);
      } finally {
        setLoading(false);
      }
    }

    void loadSiteConfig();
  }, []);

  return { config, loading, error };
}

/**
 * Hook to load and manage content/translations configuration
 */
export function useContentConfig() {
  const [config, setConfig] = useState<ContentConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadContentConfig() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/config/content.json`);
        if (!response.ok) {
          throw new Error(`Failed to load content config: ${response.statusText}`);
        }
        const data = await response.json();
        setConfig(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error loading content"));
        console.error("Error loading content config:", err);
      } finally {
        setLoading(false);
      }
    }

    void loadContentConfig();
  }, []);

  return { config, loading, error };
}
