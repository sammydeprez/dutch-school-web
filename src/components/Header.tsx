'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { NavigationDropdown, type NavDropdown } from './ui';

export default function Header() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const aboutDropdown: NavDropdown = {
    label: t('about'),
    items: [
      { href: '/about', label: t('aboutOverview') },
      { href: '/about/vision', label: t('vision') },
      { href: '/about/team', label: t('team') },
      { href: '/about/campus', label: t('campus') },
    ],
  };

  const educationDropdown: NavDropdown = {
    label: t('education'),
    items: [
      { href: '/education', label: t('educationOverview') },
      { href: '/education/toddler', label: t('toddler') },
      { href: '/education/primary', label: t('primary') },
      { href: '/education/ntc', label: t('ntc') },
      { href: '/education/curriculum', label: t('curriculum') },
      { href: '/education/language-club', label: t('languageClub') },
      { href: '/education/skills-club', label: t('skillsClub') },
    ],
  };

  const practicalDropdown: NavDropdown = {
    label: t('practical'),
    items: [
      { href: '/practical', label: t('practicalOverview') },
      { href: '/practical/schedule', label: t('schedule') },
      { href: '/practical/transport', label: t('transport') },
      { href: '/practical/fees', label: t('fees') },
    ],
  };

  const communityDropdown: NavDropdown = {
    label: t('community'),
    items: [
      { href: '/community', label: t('communityOverview') },
      { href: '/community/parents', label: t('parents') },
      { href: '/community/events', label: t('events') },
    ],
  };

  const singleLinks = [
    { href: '/', label: t('home') },
  ];

  const studentSupportLink = { href: '/student-support', label: t('studentSupport') };
  const contactLink = { href: '/contact', label: t('contact') };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-text-right.png"
              alt="Dutch School Nairobi"
              width={200}
              height={48}
              className="h-auto w-32 sm:w-40 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Home link */}
            {singleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Dropdown menus */}
            <NavigationDropdown dropdown={aboutDropdown} />
            <NavigationDropdown dropdown={educationDropdown} />

            {/* Student Support single link */}
            <Link
              href={studentSupportLink.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(studentSupportLink.href) ? 'text-primary' : 'text-foreground'
              }`}
            >
              {studentSupportLink.label}
            </Link>

            <NavigationDropdown dropdown={practicalDropdown} />
            <NavigationDropdown dropdown={communityDropdown} />

            {/* Contact link */}
            <Link
              href={contactLink.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(contactLink.href) ? 'text-primary' : 'text-foreground'
              }`}
            >
              {contactLink.label}
            </Link>
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
              {/* Home link */}
              {singleLinks.map((link) => (
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

              {/* Dropdown menus as accordions */}
              <NavigationDropdown
                dropdown={aboutDropdown}
                mobile
                onItemClick={() => setIsMenuOpen(false)}
              />
              <NavigationDropdown
                dropdown={educationDropdown}
                mobile
                onItemClick={() => setIsMenuOpen(false)}
              />

              {/* Student Support single link */}
              <Link
                href={studentSupportLink.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(studentSupportLink.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-surface'
                }`}
              >
                {studentSupportLink.label}
              </Link>

              <NavigationDropdown
                dropdown={practicalDropdown}
                mobile
                onItemClick={() => setIsMenuOpen(false)}
              />
              <NavigationDropdown
                dropdown={communityDropdown}
                mobile
                onItemClick={() => setIsMenuOpen(false)}
              />

              {/* Contact link */}
              <Link
                href={contactLink.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(contactLink.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-surface'
                }`}
              >
                {contactLink.label}
              </Link>

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
