import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

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
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-white/80 mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors ${
                button.variant === 'secondary'
                  ? 'bg-primary-dark text-white hover:bg-foreground'
                  : 'bg-white text-primary hover:bg-surface'
              }`}
            >
              {button.label}
              {button.variant !== 'secondary' && <ArrowRight className="w-5 h-5" />}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
