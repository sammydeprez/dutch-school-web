import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Banknote } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/adult-classes/fees'),
    title: locale === 'nl'
      ? 'Cursusgeld Dutch Adult Classes | Dutch School Nairobi'
      : 'Dutch Adult Classes Fees | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Cursusgeld en tarieven voor de Dutch Adult Classes.'
      : 'Course fees and rates for the Dutch Adult Classes.',
  };
}

export default async function AdultClassesFeesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/adult-classes/fees" />
      <HeroSection />
      <IntroSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('adultClassesFeesPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('adultClassesFeesPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex w-16 h-16 mx-auto rounded-2xl bg-primary/10 items-center justify-center mb-6">
          <Banknote className="w-8 h-8 text-primary" />
        </div>
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
  const t = useTranslations('adultClassesFeesPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
