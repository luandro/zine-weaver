import { useEffect } from "react";
import { useConfig } from "@/contexts/ConfigContext";
import { initializeTheme } from "@/lib/themeLoader";

/**
 * Component that initializes theme on mount and whenever theme config changes
 */
export function ThemeInitializer() {
  const { theme } = useConfig();

  useEffect(() => {
    if (theme) {
      initializeTheme(theme);
    }
  }, [theme]);

  return null;
}
