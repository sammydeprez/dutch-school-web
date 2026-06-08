import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Users } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/adult-classes'),
    title: locale === 'nl'
      ? 'Dutch Adult Classes | Dutch School Nairobi'
      : 'Dutch Adult Classes | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Nederlandse taalcursussen voor volwassenen op alle niveaus.'
      : 'Dutch language courses for adults at all proficiency levels.',
  };
}

export default async function AdultClassesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const programSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: locale === 'nl' ? 'Nederlandse Les voor Volwassenen' : 'Dutch Adult Classes',
    description: locale === 'nl'
      ? 'Nederlandse taalcursussen voor volwassenen op alle niveaus, aangeboden door Dutch School Nairobi.'
      : 'Dutch language courses for adult learners at all proficiency levels, offered by Dutch School Nairobi.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Dutch School Nairobi',
      url: 'https://www.dutchschool.ke',
    },
    educationalProgramMode: 'part-time',
    occupationalCategory: 'Adult Language Education',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'adult learner',
    },
    teaches: [
      locale === 'nl' ? 'Nederlandse spreekvaardigheid' : 'Dutch speaking skills',
      locale === 'nl' ? 'Nederlandse grammatica' : 'Dutch grammar',
      locale === 'nl' ? 'Nederlandse leesvaardigheid' : 'Dutch reading',
      locale === 'nl' ? 'Nederlandse schrijfvaardigheid' : 'Dutch writing',
    ],
    inLanguage: 'nl',
    offers: {
      '@type': 'Offer',
      category: locale === 'nl' ? 'Parttime cursus' : 'Part-time course',
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
      <BreadcrumbSchema locale={locale} path="/adult-classes" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema) }}
      />
      <HeroSection />
      <IntroSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('adultClassesPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('adultClassesPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex w-16 h-16 mx-auto rounded-2xl bg-primary/10 items-center justify-center mb-6">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          {t('title')}
        </h2>
        <p className="text-lg text-muted leading-relaxed mb-6">
          {t('content')}
        </p>
        <p className="text-muted leading-relaxed italic">
          {t('comingSoon')}
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('adultClassesPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
