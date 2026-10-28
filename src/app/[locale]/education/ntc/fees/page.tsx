import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Banknote, School, Laptop } from 'lucide-react';
import { PageHero, PageCTA, InfoTable } from '@/components/ui';
import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/education/ntc/fees'),
    title: locale === 'nl' ? 'NTC Schoolgeld | Dutch School Nairobi' : 'NTC Fees | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Schoolgeld en tarieven voor het NTC programma.'
      : 'Fees and rates for the NTC program.',
  };
}

export default async function NTCFeesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/education/ntc/fees" />
      <HeroSection />
      <IntroSection />
      <RatesSection />
      <DetailsSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('ntcFeesPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('ntcFeesPage.intro');

  return (
    <section className="pt-20 lg:pt-28 pb-10 bg-white">
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

function RatesSection() {
  const t = useTranslations('ntcFeesPage');

  return (
    <section className="pb-20 lg:pb-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <InfoTable
          title={t('onLocation.title')}
          icon={School}
          rows={t.raw('onLocation.rows') as string[][]}
          alignLastRight
        />
        <InfoTable
          title={t('online.title')}
          icon={Laptop}
          rows={t.raw('online.rows') as string[][]}
          alignLastRight
        />
        <p className="text-muted text-center">{t('perYear')}</p>
      </div>
    </section>
  );
}

function DetailsSection() {
  const t = useTranslations('ntcFeesPage');

  const paragraphs = t.raw('onlineExplanation.paragraphs') as string[];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-foreground mb-4">
            {t('onlineExplanation.title')}
          </h3>
          <div className="space-y-3">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-foreground mb-4">
            {t('important.title')}
          </h3>
          <p className="text-muted leading-relaxed">
            {t('important.content')}
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('ntcFeesPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
