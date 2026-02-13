import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Ons Team | Dutch School Nairobi' : 'Our Team | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Maak kennis met ons team van toegewijde professionals die elk kind persoonlijk kennen.'
      : 'Meet our team of dedicated professionals who know every child personally.',
  };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <TeamSections />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('teamPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('teamPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          {t('title')}
        </h2>
        <p className="text-lg text-muted leading-relaxed">
          {t('content')}
        </p>
      </div>
    </section>
  );
}

function TeamSections() {
  const t = useTranslations('teamPage');

  const sections = [
    {
      title: t('leadership.title'),
      description: t('leadership.description'),
      color: 'primary',
    },
    {
      title: t('teachers.title'),
      description: t('teachers.description'),
      color: 'secondary',
    },
    {
      title: t('support.title'),
      description: t('support.description'),
      color: 'accent',
    },
  ];

  const colorClasses = {
    primary: 'border-primary bg-primary/5',
    secondary: 'border-secondary bg-secondary/5',
    accent: 'border-accent bg-accent/5',
  };

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border-2 ${colorClasses[section.color as keyof typeof colorClasses]}`}
            >
              <h3 className="text-xl font-bold text-foreground mb-4">
                {section.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('teamPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
