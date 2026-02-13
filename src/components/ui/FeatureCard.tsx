import { LucideIcon } from 'lucide-react';

export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'red';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: ColorVariant;
}

const colorClasses: Record<ColorVariant, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
  red: 'bg-red/10 text-red',
};

export default function FeatureCard({ icon: Icon, title, description, color = 'primary' }: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-2xl bg-surface hover:bg-white hover:shadow-xl transition-all duration-300">
      <div className={`w-14 h-14 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-5`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
