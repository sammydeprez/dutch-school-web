import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Users, CalendarDays, Zap, GraduationCap } from 'lucide-react';
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
      <A1Section />
      <A2B1Section />
      <ExamsSection />
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

  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex w-16 h-16 mx-auto rounded-2xl bg-primary/10 items-center justify-center mb-6">
          <Users className="w-8 h-8 text-primary" />
        </div>
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

function A1Section() {
  const t = useTranslations('adultClassesPage.a1');

  const tracks = [
    { icon: CalendarDays, title: t('yearly.title'), description: t('yearly.description') },
    { icon: Zap, title: t('intensive.title'), description: t('intensive.description') },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
          {t('title')}
        </h2>
        <p className="text-lg text-muted text-center max-w-3xl mx-auto mb-10">
          {t('content')}
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {tracks.map((track, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <track.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {track.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {track.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function A2B1Section() {
  const t = useTranslations('adultClassesPage');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {t('a2b1.title')}
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            {t('a2b1.content')}
          </p>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {t('together.title')}
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            {t('together.content')}
          </p>
        </div>
      </div>
    </section>
  );
}

function ExamsSection() {
  const t = useTranslations('adultClassesPage.exams');

  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <GraduationCap className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center">
            {t('title')}
          </h2>
        </div>
        <div className="bg-white p-8 rounded-2xl space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
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
