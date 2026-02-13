import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Talenclub | Dutch School Nairobi' : 'Language Club | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Extra talen leren naast Nederlands en Engels: Frans en Kiswahili.'
      : 'Learn additional languages beyond Dutch and English: French and Kiswahili.',
  };
}

export default async function LanguageClubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <LanguagesSection />
      <ScheduleSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('languageClubPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('languageClubPage.intro');

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

function LanguagesSection() {
  const tFrench = useTranslations('languageClubPage.french');
  const tKiswahili = useTranslations('languageClubPage.kiswahili');

  const frenchFeatures = [
    tFrench('features.0'),
    tFrench('features.1'),
    tFrench('features.2'),
  ];

  const kiswahiliFeatures = [
    tKiswahili('features.0'),
    tKiswahili('features.1'),
    tKiswahili('features.2'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* French */}
          <div className="bg-white p-8 lg:p-10 rounded-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4">
              {tFrench('ages')}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {tFrench('title')}
            </h3>
            <p className="text-muted mb-6">
              {tFrench('content')}
            </p>
            <ul className="space-y-3">
              {frenchFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kiswahili */}
          <div className="bg-white p-8 lg:p-10 rounded-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full text-sm text-secondary font-medium mb-4">
              {tKiswahili('ages')}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {tKiswahili('title')}
            </h3>
            <p className="text-muted mb-6">
              {tKiswahili('content')}
            </p>
            <ul className="space-y-3">
              {kiswahiliFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const t = useTranslations('languageClubPage.schedule');

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

function CTASection() {
  const t = useTranslations('languageClubPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
