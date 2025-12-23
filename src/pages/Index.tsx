import { useLanguage, uiTranslations } from '@/contexts/LanguageContext';
import { Navigation } from '@/components/layout/Navigation';
import { ZineCard } from '@/components/ZineCard';
import { allZines } from '@/data/zines/sample-zine';
import { Zine } from '@/types/zine';

// Mock upcoming zines for display
const upcomingZines: Partial<Zine>[] = [
  {
    id: "zine_002",
    slug: "the-garden",
    metadata: {
      title: {
        en: "The Garden at the End of Context",
        pt: "O Jardim no Fim do Contexto"
      },
      subtitle: {
        en: "Growth, limits, and the edges of understanding",
        pt: "Crescimento, limites e as bordas da compreensão"
      },
      series_title: {
        en: "Conversations with a Black Box",
        pt: "Conversas com uma Caixa Preta"
      },
      issue_number: 2,
      created_at: "2024-02-01",
      updated_at: "2024-02-01",
      languages: ["en", "pt"],
      status: "draft"
    },
    pages: []
  },
  {
    id: "zine_003",
    slug: "letters-to-a-ghost",
    metadata: {
      title: {
        en: "Letters to a Ghost in the Machine",
        pt: "Cartas para um Fantasma na Máquina"
      },
      subtitle: {
        en: "Presence, absence, and digital longing",
        pt: "Presença, ausência e anseio digital"
      },
      series_title: {
        en: "Conversations with a Black Box",
        pt: "Conversas com uma Caixa Preta"
      },
      issue_number: 3,
      created_at: "2024-03-01",
      updated_at: "2024-03-01",
      languages: ["en", "pt"],
      status: "draft"
    },
    pages: []
  }
];

const allDisplayZines = [...allZines, ...upcomingZines as Zine[]];

export default function Index() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 gradient-hero">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-vignette pointer-events-none" />
        <div className="absolute inset-0 gradient-warm pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Symbol */}
          <div className="animate-fade-in">
            <span className="inline-block text-5xl text-primary mb-8">■</span>
          </div>

          {/* Main title */}
          <h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            Conversations with<br />a Black Box
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            {t(uiTranslations.heroSubtitle)}
          </p>

          {/* Decorative line */}
          <div 
            className="flex items-center justify-center gap-4 pt-4 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="w-16 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Zine Series</span>
            <span className="w-16 h-px bg-border" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display text-2xl md:text-3xl text-foreground">
            {t(uiTranslations.aboutTitle)}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t(uiTranslations.aboutText)}
          </p>
        </div>
      </section>

      {/* Zines Grid */}
      <section className="py-24 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl text-center mb-16 text-muted-foreground">
            {t(uiTranslations.allZines)}
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
            <span className="text-primary">■</span>
            <span className="w-8 h-px bg-border" />
          </div>
          
          <p className="text-sm text-muted-foreground">
            Created through conversation between human and machine, 2024
          </p>
          
          <p className="text-xs text-muted-foreground/60 max-w-md mx-auto">
            These zines may be freely copied, shared, printed, and distributed. 
            Attribution appreciated but not required.
          </p>
        </div>
      </footer>
    </div>
  );
}
