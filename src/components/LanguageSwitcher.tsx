'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const switchLocale = (newLocale: 'en' | 'nl') => {
    if (newLocale === locale || isAnimating) return;

    setIsAnimating(true);

    // Small delay for animation feedback
    setTimeout(() => {
      router.replace(pathname, { locale: newLocale });
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div
      className="
        flex items-center gap-1
        bg-surface rounded-full p-1
        transition-all duration-300
        hover:shadow-md
      "
    >
      <button
        onClick={() => switchLocale('en')}
        disabled={isAnimating}
        className={`
          flex items-center gap-1.5
          px-3 py-1.5 rounded-full
          text-sm font-medium
          transition-all duration-300
          ${locale === 'en'
            ? 'bg-white text-primary shadow-sm scale-105'
            : 'text-muted hover:text-foreground hover:bg-white/50'
          }
          ${isAnimating ? 'pointer-events-none' : ''}
          active:scale-95
        `}
        aria-label="Switch to English"
      >
        <span
          className={`
            text-base
            transition-transform duration-300
            ${locale === 'en' ? 'scale-110' : 'scale-100'}
          `}
        >
          🇬🇧
        </span>
        <span
          className={`
            hidden sm:inline
            transition-all duration-300
            ${locale === 'en' ? 'font-semibold' : ''}
          `}
        >
          EN
        </span>
      </button>
      <button
        onClick={() => switchLocale('nl')}
        disabled={isAnimating}
        className={`
          flex items-center gap-1.5
          px-3 py-1.5 rounded-full
          text-sm font-medium
          transition-all duration-300
          ${locale === 'nl'
            ? 'bg-white text-primary shadow-sm scale-105'
            : 'text-muted hover:text-foreground hover:bg-white/50'
          }
          ${isAnimating ? 'pointer-events-none' : ''}
          active:scale-95
        `}
        aria-label="Schakel naar Nederlands"
      >
        <span
          className={`
            text-base
            transition-transform duration-300
            ${locale === 'nl' ? 'scale-110' : 'scale-100'}
          `}
        >
          🇳🇱
        </span>
        <span
          className={`
            hidden sm:inline
            transition-all duration-300
            ${locale === 'nl' ? 'font-semibold' : ''}
          `}
        >
          NL
        </span>
      </button>
    </div>
  );
}
