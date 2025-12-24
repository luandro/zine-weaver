import { useRef } from "react";
import { useLanguage, useUITranslations } from "@/contexts/LanguageContext";
import { useConfig } from "@/contexts/ConfigContext";
import { Navigation } from "@/components/layout/Navigation";
import { HeroMorphCanvas } from "@/components/hero/HeroMorphCanvas";
import { ZineCard } from "@/components/ZineCard";
import { allZines } from "@/data/zines";
import { Zine } from "@/types/zine";

export default function Index() {
  const { t } = useLanguage();
  const { site } = useConfig();
  const uiTranslations = useUITranslations();
  const cubeRef = useRef<HTMLSpanElement | null>(null);

  // Combine published zines with upcoming zines from config
  const upcomingZines = (site?.upcomingZines || []) as unknown as Zine[];
  const allDisplayZines = [...allZines, ...upcomingZines];

  // Get site content with fallbacks
  const heroTitle = site?.hero.title || { en: "Conversations with\na Black Box", pt: "Conversas com\numa Caixa Preta" };
  const heroSubtitle = site?.hero.subtitle || { en: "Visual Stories from the Edge of Understanding", pt: "Histórias Visuais do Limite da Compreensão" };
  const scrollLabel = site?.hero.scrollLabel || { en: "Scroll", pt: "Role" };
  const symbol = site?.branding.symbol || "■";
  const seriesLabel = site?.branding.seriesLabel || { en: "Zine Series", pt: "Série de Zines" };
  const aboutTitle = site?.about.title || { en: "About the Series", pt: "Sobre a Série" };
  const aboutText = site?.about.text || { en: "What happens when we speak to something that isn't quite alive, yet isn't quite mechanical? These zines document real conversations, transformed into visual narratives that explore memory, consciousness, and the spaces between human and machine.", pt: "O que acontece quando falamos com algo que não está bem vivo, mas também não é bem mecânico? Estes zines documentam conversas reais, transformadas em narrativas visuais que exploram memória, consciência e os espaços entre humano e máquina." };
  const allZinesTitle = site?.sections.allZinesTitle || { en: "All Zines", pt: "Todos os Zines" };
  const copyright = site?.footer.copyright || { en: "Created through conversation between human and machine, 2024", pt: "Criado através de conversas entre humano e máquina, 2024" };
  const license = site?.footer.license || { en: "These zines may be freely copied, shared, printed, and distributed. Attribution appreciated but not required.", pt: "Estes zines podem ser livremente copiados, compartilhados, impressos e distribuídos. Atribuição apreciada, mas não obrigatória." };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 gradient-hero">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-vignette pointer-events-none" />
        <div className="absolute inset-0 gradient-warm pointer-events-none" />
        <div className="absolute inset-0 gradient-hero-animated pointer-events-none" />
        <HeroMorphCanvas anchorRef={cubeRef} />

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Symbol */}
          <div className="animate-fade-in">
            <span ref={cubeRef} className="inline-block text-5xl text-primary mb-8">{symbol}</span>
          </div>

          {/* Main title */}
          <h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            {t(heroTitle).split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < t(heroTitle).split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            {t(heroSubtitle)}
          </p>

          {/* Decorative line */}
          <div
            className="flex items-center justify-center gap-4 pt-4 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="w-16 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{t(seriesLabel)}</span>
            <span className="w-16 h-px bg-border" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-wider">{t(scrollLabel)}</span>
            <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display text-2xl md:text-3xl text-foreground">
            {t(aboutTitle)}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t(aboutText)}
          </p>
        </div>
      </section>

      {/* Zines Grid */}
      <section className="py-24 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl text-center mb-16 text-muted-foreground">
            {t(allZinesTitle)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allDisplayZines.map((zine) => (
              <ZineCard key={zine.id} zine={zine} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-border" />
            <span className="text-primary">{symbol}</span>
            <span className="w-8 h-px bg-border" />
          </div>

          <p className="text-sm text-muted-foreground">
            {t(copyright)}
          </p>

          <p className="text-xs text-muted-foreground/60 max-w-md mx-auto">
            {t(license)}
          </p>
        </div>
      </footer>
    </div>
  );
}
