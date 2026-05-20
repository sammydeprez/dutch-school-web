import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { BookOpen, Globe, Users, Calendar, Check } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/ntc'),
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
      ? 'NTC-programma voor Nederlandstalige kinderen van 3,5 tot 18 jaar die andere internationale scholen bezoeken. Behoud en ontwikkel het Nederlands.'
      : 'NTC program for Dutch-speaking children ages 3.5-18 attending other international schools. Maintain and develop Dutch language skills.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Dutch School Nairobi',
      url: 'https://www.dutchschool.co.ke',
    },
    educationalProgramMode: 'part-time',
    programPrerequisites: locale === 'nl'
      ? 'Nederlandstalige achtergrond, 3,5 tot 18 jaar'
      : 'Dutch-speaking background, ages 3.5 to 18',
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
      <BreadcrumbSchema locale={locale} path="/ntc" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema) }}
      />
      <HeroSection />
      <IntroSection />
      <ForWhomSection />
      <ProgramSection />
      <BenefitsSection />
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

function ForWhomSection() {
  const t = useTranslations('ntcPage.forWhom');

  const items = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
    t('items.3'),
  ];

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

function ProgramSection() {
  const t = useTranslations('ntcPage.program');

  const features = [
    {
      icon: BookOpen,
      title: t('language.title'),
      description: t('language.description'),
    },
    {
      icon: Globe,
      title: t('culture.title'),
      description: t('culture.description'),
    },
    {
      icon: Users,
      title: t('levels.title'),
      description: t('levels.description'),
    },
    {
      icon: Calendar,
      title: t('schedule.title'),
      description: t('schedule.description'),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const t = useTranslations('ntcPage.benefits');

  const benefits = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
    t('items.3'),
    t('items.4'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('title')}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-foreground font-medium">{benefit}</span>
            </div>
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
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
