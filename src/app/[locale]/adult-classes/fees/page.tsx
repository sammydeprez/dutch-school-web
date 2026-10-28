import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Banknote, BookOpen, CreditCard } from 'lucide-react';
import { PageHero, PageCTA, InfoTable } from '@/components/ui';
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
      <CoursesSection />
      <DetailsSection />
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

function CoursesSection() {
  const t = useTranslations('adultClassesFeesPage.courses');

  return (
    <section className="pb-20 lg:pb-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <InfoTable
          title={t('title')}
          headers={t.raw('headers') as string[]}
          rows={t.raw('rows') as string[][]}
          alignLastRight
        />
      </div>
    </section>
  );
}

function DetailsSection() {
  const t = useTranslations('adultClassesFeesPage');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-foreground">{t('payment.title')}</h3>
          </div>
          <p className="text-muted leading-relaxed">{t('payment.content')}</p>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-foreground">{t('materials.title')}</h3>
          </div>
          <p className="text-muted leading-relaxed mb-4">{t('materials.content')}</p>
          <InfoTable
            headers={t.raw('materials.headers') as string[]}
            rows={t.raw('materials.rows') as string[][]}
            alignLastRight
          />
        </div>
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
