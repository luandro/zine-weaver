import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zine, Page } from '@/types/zine';
import { useLanguage, uiTranslations } from '@/contexts/LanguageContext';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ZineReaderProps {
  zine: Zine;
}

export function ZineReader({ zine }: ZineReaderProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const swipeStateRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    isHorizontal: false,
    isVertical: false,
  });

  const totalPages = zine.pages.length;
  const currentPage = zine.pages[currentPageIndex];
  const swipeMinDistance = 10;
  const axisLockDistance = 10;

  const goToNextPage = useCallback(() => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  }, [currentPageIndex, totalPages]);

  const goToPrevPage = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  }, [currentPageIndex]);

  const handleClose = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNextPage();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'Escape':
          handleClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage, handleClose]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPageIndex]);

  const resetSwipeState = useCallback(() => {
    swipeStateRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      isHorizontal: false,
      isVertical: false,
    };
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') {
      return;
    }

    swipeStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      isHorizontal: false,
      isVertical: false,
    };
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const swipeState = swipeStateRef.current;
    if (swipeState.pointerId !== event.pointerId || swipeState.isHorizontal || swipeState.isVertical) {
      return;
    }

    const deltaX = event.clientX - swipeState.startX;
    const deltaY = event.clientY - swipeState.startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < axisLockDistance && absY < axisLockDistance) {
      return;
    }

    if (absX > absY) {
      swipeState.isHorizontal = true;
    } else {
      swipeState.isVertical = true;
    }
  }, [axisLockDistance]);

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const swipeState = swipeStateRef.current;
    if (swipeState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - swipeState.startX;

    if (swipeState.isHorizontal && Math.abs(deltaX) >= swipeMinDistance) {
      if (deltaX < 0) {
        goToNextPage();
      } else {
        goToPrevPage();
      }
    }

    resetSwipeState();
  }, [goToNextPage, goToPrevPage, resetSwipeState, swipeMinDistance]);

  const handlePointerCancel = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (swipeStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    resetSwipeState();
  }, [resetSwipeState]);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close reader"
          >
            <X size={20} />
          </button>

          {/* Page indicator */}
          <div className="text-sm text-muted-foreground font-mono">
            <span>{t(uiTranslations.page)}</span>
            <span className="mx-2 text-foreground">{currentPageIndex + 1}</span>
            <span>{t(uiTranslations.of)}</span>
            <span className="ml-2">{totalPages}</span>
          </div>

          {/* Language switcher */}
          <LanguageSwitcher variant="compact" />
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${((currentPageIndex + 1) / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* Page content */}
      <main
        className="pt-16 pb-24"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{ touchAction: 'pan-y' }}
      >
        <div 
          key={currentPageIndex}
          className="animate-fade-in"
        >
          {/* Cover pages get special treatment */}
          {currentPage.page_type === 'cover' ? (
            <div>
              {currentPage.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto px-6 py-12">
              {currentPage.page_title && (
                <h2 className="font-display text-2xl mb-8 text-center text-muted-foreground">
                  {t(currentPage.page_title)}
                </h2>
              )}
              <div className="space-y-2">
                {currentPage.blocks.map((block) => (
                  <BlockRenderer key={block.id} block={block} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-4 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Previous button */}
          <button
            onClick={goToPrevPage}
            disabled={currentPageIndex === 0}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-sm transition-all duration-200",
              "border border-border",
              currentPageIndex === 0 
                ? "btn-disabled" 
                : "hover:border-primary/50 hover:text-primary"
            )}
            aria-label="Previous page"
            aria-disabled={currentPageIndex === 0}
          >
            <ChevronLeft size={16} />
            <span className="text-sm hidden sm:inline">{t(uiTranslations.previous)}</span>
          </button>

          {/* Page dots */}
          <div className="flex items-center gap-1.5">
            {zine.pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPageIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  i === currentPageIndex 
                    ? "bg-primary scale-125" 
                    : "bg-muted hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === currentPageIndex ? 'page' : undefined}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={goToNextPage}
            disabled={currentPageIndex === totalPages - 1}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-sm transition-all duration-200",
              "border border-border",
              currentPageIndex === totalPages - 1 
                ? "btn-disabled" 
                : "hover:border-primary/50 hover:text-primary"
            )}
            aria-label="Next page"
            aria-disabled={currentPageIndex === totalPages - 1}
          >
            <span className="text-sm hidden sm:inline">{t(uiTranslations.next)}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
