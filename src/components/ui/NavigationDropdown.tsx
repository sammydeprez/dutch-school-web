'use client';

import { useState, useRef, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
}

export interface NavSection {
  label: string;
  href?: string;
  items: NavItem[];
}

export interface NavDropdown {
  label: string;
  items?: NavItem[];
  sections?: NavSection[];
}

interface NavigationDropdownProps {
  dropdown: NavDropdown;
  onItemClick?: () => void;
  mobile?: boolean;
}

function collectHrefs(dropdown: NavDropdown): string[] {
  if (dropdown.sections) {
    return dropdown.sections.flatMap((s) => [
      ...(s.href ? [s.href] : []),
      ...s.items.map((i) => i.href),
    ]);
  }
  return (dropdown.items ?? []).map((i) => i.href);
}

export default function NavigationDropdown({ dropdown, onItemClick, mobile = false }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hrefs = collectHrefs(dropdown);
  const isActive = hrefs.some((href) => pathname === href || pathname.startsWith(href + '/'));
  const isItemActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  useEffect(() => {
    if (!mobile) {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobile]);

  const handleMouseEnter = () => {
    if (!mobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!mobile) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    }
  };

  if (mobile) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-foreground hover:bg-surface'
          }`}
        >
          <span>{dropdown.label}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && dropdown.sections && (
          <div className="mt-1 ml-4 space-y-3">
            {dropdown.sections.map((section, i) => (
              <div key={i}>
                {section.href ? (
                  <Link
                    href={section.href}
                    onClick={onItemClick}
                    className={`block px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      isItemActive(section.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-surface'
                    }`}
                  >
                    {section.label}
                  </Link>
                ) : (
                  <div className="px-4 py-2 text-sm font-semibold text-foreground">
                    {section.label}
                  </div>
                )}
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onItemClick}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm transition-colors ${
                      isItemActive(item.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted hover:bg-surface hover:text-foreground'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}

        {isOpen && !dropdown.sections && (
          <div className="mt-1 ml-4 space-y-1">
            {(dropdown.items ?? []).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                  isItemActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted hover:bg-surface hover:text-foreground'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
          isActive ? 'text-primary' : 'text-foreground'
        }`}
      >
        <span>{dropdown.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && dropdown.sections && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-border p-5 grid grid-cols-3 gap-x-6 gap-y-4 min-w-[640px]">
            {dropdown.sections.map((section, i) => (
              <div key={i}>
                {section.href ? (
                  <Link
                    href={section.href}
                    className={`block text-sm font-semibold mb-2 pb-2 border-b border-border transition-colors ${
                      isItemActive(section.href)
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {section.label}
                  </Link>
                ) : (
                  <div className="text-sm font-semibold text-foreground mb-2 pb-2 border-b border-border">
                    {section.label}
                  </div>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-2 py-1.5 text-sm rounded-md transition-colors ${
                        isItemActive(item.href)
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted hover:bg-surface hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && !dropdown.sections && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-border py-2 min-w-[200px]">
            {(dropdown.items ?? []).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 text-sm transition-colors ${
                  isItemActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-surface hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
