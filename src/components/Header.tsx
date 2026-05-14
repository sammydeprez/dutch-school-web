'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { NavigationDropdown, type NavDropdown } from './ui';

export default function Header() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for header shrink animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const aboutDropdown: NavDropdown = {
    label: t('about'),
    items: [
      { href: '/about', label: t('aboutOverview') },
      { href: '/about/vision', label: t('vision') },
      { href: '/about/team', label: t('team') },
      { href: '/about/campus', label: t('campus') },
    ],
  };

  const programsDropdown: NavDropdown = {
    label: t('programs'),
    sections: [
      {
        label: t('education'),
        href: '/education',
        items: [
          { href: '/education/toddler', label: t('toddler') },
          { href: '/education/primary', label: t('primary') },
          { href: '/education/curriculum', label: t('curriculum') },
          { href: '/education/language-club', label: t('languageClub') },
          { href: '/education/skills-club', label: t('skillsClub') },
          { href: '/education/library', label: t('library') },
        ],
      },
      {
        label: t('ntc'),
        href: '/ntc',
        items: [
          { href: '/ntc/schedule', label: t('ntcSchedule') },
          { href: '/ntc/fees', label: t('ntcFees') },
        ],
      },
      {
        label: t('adultClasses'),
        href: '/adult-classes',
        items: [
          { href: '/adult-classes/schedule', label: t('adultClassesSchedule') },
          { href: '/adult-classes/fees', label: t('adultClassesFees') },
        ],
      },
      {
        label: t('studentSupport'),
        href: '/student-support',
        items: [],
      },
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

  const contactLink = { href: '/contact', label: t('contact') };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header
      className={`
        sticky top-0 z-50
        backdrop-blur-sm border-b border-border
        transition-all duration-300
        ${isScrolled
          ? 'bg-white/98 shadow-md'
          : 'bg-white/95'
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`
            flex items-center justify-between
            transition-all duration-300
            ${isScrolled ? 'h-16' : 'h-20'}
          `}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/logo-text-right.png"
              alt="Dutch School Nairobi"
              width={200}
              height={48}
              className={`
                h-auto object-contain
                transition-all duration-300
                ${isScrolled ? 'w-28 sm:w-32' : 'w-32 sm:w-40'}
              `}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavigationDropdown dropdown={aboutDropdown} />
            <NavigationDropdown dropdown={programsDropdown} />
            <NavigationDropdown dropdown={practicalDropdown} />
            <NavigationDropdown dropdown={communityDropdown} />

            <Link
              href={contactLink.href}
              className={`
                nav-link-animated
                text-sm font-medium transition-colors hover:text-primary
                ${isActive(contactLink.href) ? 'text-primary active' : 'text-foreground'}
              `}
            >
              {contactLink.label}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            <Link
              href="/enrollment"
              className="
                hidden sm:inline-flex items-center justify-center
                px-5 py-2.5 bg-primary text-white font-medium rounded-full
                hover:bg-primary-dark
                transition-all duration-300
                hover:shadow-lg hover:shadow-primary/25
                hover:scale-105
                active:scale-95
              "
            >
              {t('applyNow')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                lg:hidden p-2 text-foreground hover:text-primary
                transition-all duration-300
                hover:bg-surface rounded-lg
                active:scale-95
              "
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`
                    w-6 h-6 absolute inset-0
                    transition-all duration-300
                    ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}
                  `}
                />
                <X
                  className={`
                    w-6 h-6 absolute inset-0
                    transition-all duration-300
                    ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}
                  `}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            lg:hidden
            overflow-hidden
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-[calc(100vh-80px)] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              <div className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
                <NavigationDropdown
                  dropdown={aboutDropdown}
                  mobile
                  onItemClick={() => setIsMenuOpen(false)}
                />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <NavigationDropdown
                  dropdown={programsDropdown}
                  mobile
                  onItemClick={() => setIsMenuOpen(false)}
                />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <NavigationDropdown
                  dropdown={practicalDropdown}
                  mobile
                  onItemClick={() => setIsMenuOpen(false)}
                />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <NavigationDropdown
                  dropdown={communityDropdown}
                  mobile
                  onItemClick={() => setIsMenuOpen(false)}
                />
              </div>

              <Link
                href={contactLink.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  px-4 py-3 rounded-lg text-base font-medium
                  transition-all duration-300
                  animate-fade-in-up
                  ${isActive(contactLink.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-surface'
                  }
                `}
                style={{ animationDelay: '250ms' }}
              >
                {contactLink.label}
              </Link>

              <Link
                href="/enrollment"
                onClick={() => setIsMenuOpen(false)}
                className="
                  mt-2 mx-4 inline-flex items-center justify-center
                  px-5 py-3 bg-primary text-white font-medium rounded-full
                  hover:bg-primary-dark
                  transition-all duration-300
                  animate-fade-in-up
                  active:scale-95
                "
                style={{ animationDelay: '300ms' }}
              >
                {t('applyNow')}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
