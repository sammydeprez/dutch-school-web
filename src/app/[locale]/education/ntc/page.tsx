import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Check } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/education/ntc'),
    title: locale === 'nl' ? 'NTC - Nederlands Taal en Cultuur | Dutch School Nairobi' : 'NTC - Dutch Language and Culture | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'NTC-programma voor Nederlandstalige kinderen op andere internationale scholen. Behoud en ontwikkel het Nederlands.'
      : 'NTC program for Dutch-speaking children at other international schools. Maintain and develop Dutch language skills.',
  };
}

export default async function NTCPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Structured data for NTC program
  const programSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: locale === 'nl' ? 'NTC - Nederlandse Taal en Cultuur' : 'NTC - Dutch Language and Culture',
    description: locale === 'nl'
      ? 'Naschoolse Nederlandse Taal- en Cultuurlessen voor kinderen van 2,5 tot 16 jaar die een internationale of lokale school bezoeken, op locaties in Nairobi en online.'
      : 'After-school Dutch Language and Culture lessons for children aged 2.5 to 16 attending an international or local school, at locations in Nairobi and online.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Dutch School Nairobi',
      url: 'https://www.dutchschool.ke',
    },
    educationalProgramMode: 'part-time',
    programPrerequisites: locale === 'nl'
      ? 'Nederlandstalige achtergrond, 2,5 tot 16 jaar'
      : 'Dutch-speaking background, ages 2.5 to 16',
    occupationalCategory: 'Language Education',
    teaches: [
      locale === 'nl' ? 'Nederlandse taal (lezen, schrijven, spreken)' : 'Dutch language (reading, writing, speaking)',
      locale === 'nl' ? 'Nederlandse cultuur en tradities' : 'Dutch culture and traditions',
      locale === 'nl' ? 'Nederlandse geschiedenis en geografie' : 'Dutch history and geography',
    ],
    offers: {
      '@type': 'Offer',
      category: locale === 'nl' ? 'Parttime onderwijs' : 'Part-time education',
      availableAtOrFrom: {
        '@type': 'Place',
        name: 'Dutch School Nairobi',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nairobi',
          addressCountry: 'KE',
        },
      },
    },
  };

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/education/ntc" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema) }}
      />
      <HeroSection />
      <IntroSection />
      <GoalsSection />
      <ApproachSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('ntcPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('ntcPage.intro');

  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg text-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoalsSection() {
  const t = useTranslations('ntcPage.goals');

  const items = t.raw('items') as string[];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
          {t('title')}
        </h2>
        <p className="text-lg text-muted text-center mb-8">
          {t('content')}
        </p>
        <div className="bg-white p-8 rounded-2xl">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const t = useTranslations('ntcPage.approach');

  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg text-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('ntcPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[
        { label: t('button'), href: '/contact' },
        { label: t('scheduleButton'), href: '/education/ntc/schedule', variant: 'secondary' },
      ]}
    />
  );
}
