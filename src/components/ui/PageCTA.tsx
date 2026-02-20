'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface PageCTAProps {
  title: string;
  subtitle: string;
  buttons: CTAButton[];
}

export default function PageCTA({ title, subtitle, buttons }: PageCTAProps) {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-primary relative overflow-hidden">
      {/* Animated background decorations */}
      <div
        className="
          absolute top-0 right-0 w-64 h-64
          bg-white/10 rounded-full blur-3xl
          cta-decoration
        "
      />
      <div
        className="
          absolute bottom-0 left-0 w-48 h-48
          bg-white/10 rounded-full blur-3xl
          cta-decoration
        "
        style={{ animationDelay: '2s' }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className={`
            text-3xl sm:text-4xl font-bold text-white mb-4
            transition-all duration-700
            ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }
          `}
        >
          {title}
        </h2>
        <p
          className={`
            text-white/80 mb-8
            transition-all duration-700 delay-150
            ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }
          `}
        >
          {subtitle}
        </p>
        <div
          className={`
            flex flex-col sm:flex-row gap-4 justify-center
            transition-all duration-700 delay-300
            ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }
          `}
        >
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className={`
                group
                inline-flex items-center justify-center gap-2
                px-8 py-4 font-semibold rounded-full
                transition-all duration-300
                hover:shadow-lg hover:scale-105
                active:scale-95
                ${button.variant === 'secondary'
                  ? 'bg-primary-dark text-white hover:bg-foreground'
                  : 'bg-white text-primary hover:bg-surface'
                }
              `}
            >
              {button.label}
              {button.variant !== 'secondary' && (
                <ArrowRight
                  className="
                    w-5 h-5
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
