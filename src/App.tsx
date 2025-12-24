import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "@/contexts/ConfigContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import { prefetchZineAssets } from "@/lib/offline";
import Index from "./pages/Index";
import ZineReadPage from "./pages/ZineReadPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const hasPrefetched = useRef(false);

  useEffect(() => {
    if (hasPrefetched.current) {
      return;
    }

    hasPrefetched.current = true;
    void prefetchZineAssets();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <ThemeInitializer />
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/read/:slug" element={<ZineReadPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
