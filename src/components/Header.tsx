'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/programs', label: t('programs') },
    { href: '/enrollment', label: t('enrollment') },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo-icon.png"
              alt="Dutch School Nairobi"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <div>
              <span className="text-base sm:text-xl font-bold text-foreground">Dutch School</span>
              <span className="block text-xs sm:text-sm text-muted -mt-0.5 sm:-mt-1">NAIROBI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            <Link
              href="/enrollment"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
            >
              {t('applyNow')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-surface'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/enrollment"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 mx-4 inline-flex items-center justify-center px-5 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
              >
                {t('applyNow')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
