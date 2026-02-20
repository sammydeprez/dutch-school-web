'use client';

import { LucideIcon } from 'lucide-react';

export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'red';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: ColorVariant;
  className?: string;
}

const colorClasses: Record<ColorVariant, string> = {
  primary: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white',
  secondary: 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-foreground',
  accent: 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white',
  red: 'bg-red/10 text-red group-hover:bg-red group-hover:text-white',
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color = 'primary',
  className = '',
}: FeatureCardProps) {
  return (
    <div
      className={`
        group
        p-6 rounded-2xl bg-surface
        transition-all duration-300 ease-out
        hover:bg-white hover:shadow-xl hover:-translate-y-2
        cursor-default
        ${className}
      `}
    >
      <div
        className={`
          w-14 h-14 rounded-xl
          flex items-center justify-center mb-5
          transition-all duration-300
          ${colorClasses[color]}
        `}
      >
        <Icon
          className="
            w-7 h-7
            transition-transform duration-300
            group-hover:scale-110 group-hover:rotate-6
          "
        />
      </div>
      <h3
        className="
          text-xl font-semibold text-foreground mb-3
          transition-colors duration-300
          group-hover:text-primary
        "
      >
        {title}
      </h3>
      <p className="text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
