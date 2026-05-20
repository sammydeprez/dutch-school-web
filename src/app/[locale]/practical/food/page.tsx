import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Apple, Clock, Droplets, BookOpen } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Eten en drinken | Dutch School Nairobi' : 'Food & Drink | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Snacks, lunch en eetmomenten samen met de klas op de Dutch School.'
      : 'Snacks, lunch and eating times together as a class at the Dutch School.',
  };
}

export default async function FoodPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <SectionsList />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('foodPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('foodPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-muted leading-relaxed">
          {t('content')}
        </p>
      </div>
    </section>
  );
}

function SectionsList() {
  const tSchedule = useTranslations('foodPage.schedule');
  const tHealthy = useTranslations('foodPage.healthy');
  const tWater = useTranslations('foodPage.water');
  const tSocial = useTranslations('foodPage.social');

  const sections = [
    { icon: Clock, title: tSchedule('title'), content: tSchedule('content'), color: 'primary' as const },
    { icon: Apple, title: tHealthy('title'), content: tHealthy('content'), color: 'secondary' as const },
    { icon: Droplets, title: tWater('title'), content: tWater('content'), color: 'accent' as const },
    { icon: BookOpen, title: tSocial('title'), content: tSocial('content'), color: 'primary' as const },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl">
              <div className={`w-12 h-12 rounded-xl ${colorClasses[section.color]} flex items-center justify-center mb-4`}>
                <section.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {section.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('foodPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
