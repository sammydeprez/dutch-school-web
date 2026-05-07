import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Heart, Lightbulb, RefreshCw, Quote, Sparkles } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Onze Visie & Missie | Dutch School Nairobi' : 'Our Vision & Mission | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Groots in Kleinschaligheid - waar elk kind gezien, gekend en gewaardeerd wordt. Onze visie, missie en kernwaarden.'
      : 'Greatness in Intimacy - where every child is seen, known, and valued. Our vision, mission, and core values.',
  };
}

export default async function VisionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <MissionVisionSection />
      <MottoSection />
      <ValuesSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('visionPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function PhilosophySection() {
  const t = useTranslations('visionPage.philosophy');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
          {t('title')}
        </h2>
        <p className="text-lg text-muted leading-relaxed text-center mb-12">
          {t('content')}
        </p>

        <div className="bg-primary/5 p-8 lg:p-12 rounded-3xl border-2 border-primary relative">
          <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/20" />
          <p className="text-xl lg:text-2xl text-foreground font-medium text-center italic pl-8">
            {t('quote')}
          </p>
        </div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  const t = useTranslations('visionPage');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 lg:p-10 rounded-3xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('mission.title')}
            </h3>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>{t('mission.content')}</p>
              <p>{t('mission.paragraph2')}</p>
              <p>{t('mission.paragraph3')}</p>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-lg font-semibold text-primary text-center italic">
                &ldquo;{t('mission.missionQuote')}&rdquo;
              </p>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-3xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('vision.title')}
            </h3>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>{t('vision.content')}</p>
              <p>{t('vision.paragraph2')}</p>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-lg font-semibold text-primary text-center italic">
                &ldquo;{t('vision.visionQuote')}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MottoSection() {
  const t = useTranslations('visionPage.motto');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex w-16 h-16 mx-auto rounded-2xl bg-primary/10 items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {t('title')}
        </h2>
        <p className="text-2xl lg:text-3xl text-primary font-bold mb-6">
          {t('subtitle')}
        </p>
        <p className="text-lg text-muted leading-relaxed">
          {t('content')}
        </p>
      </div>
    </section>
  );
}

function ValuesSection() {
  const t = useTranslations('visionPage.values');

  const values = [
    {
      icon: Heart,
      title: t('connect.title'),
      description: t('connect.description'),
      color: 'primary',
    },
    {
      icon: Lightbulb,
      title: t('inspire.title'),
      description: t('inspire.description'),
      color: 'secondary',
    },
    {
      icon: RefreshCw,
      title: t('move.title'),
      description: t('move.description'),
      color: 'accent',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-surface p-8 rounded-2xl text-center">
              <div className={`w-16 h-16 mx-auto rounded-2xl ${colorClasses[value.color as keyof typeof colorClasses]} flex items-center justify-center mb-6`}>
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('visionPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
