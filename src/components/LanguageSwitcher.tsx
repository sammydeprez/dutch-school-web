'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: 'en' | 'nl') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-surface rounded-full p-1">
      <button
        onClick={() => switchLocale('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          locale === 'en'
            ? 'bg-white text-primary shadow-sm'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        <span className="text-base">🇬🇧</span>
        <span className="hidden sm:inline">EN</span>
      </button>
      <button
        onClick={() => switchLocale('nl')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          locale === 'nl'
            ? 'bg-white text-primary shadow-sm'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Schakel naar Nederlands"
      >
        <span className="text-base">🇳🇱</span>
        <span className="hidden sm:inline">NL</span>
      </button>
    </div>
  );
}
