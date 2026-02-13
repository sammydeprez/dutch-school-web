import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { BookOpen, Users, Globe, Music, Palette, Calculator, Languages, ArrowRight, CheckCircle } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Programma\'s | Dutch School Nairobi' : 'Programs | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Ontdek onze onderwijsprogramma\'s: peutergroep, basisschool, NTC-lessen en Nederlandse lessen voor volwassenen.'
      : 'Discover our educational programs: toddler group, primary school, NTC lessons, and Dutch lessons for adults.',
  };
}

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Educational programs schema for rich results
  const programsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'nl' ? 'Onderwijsprogramma\'s Dutch School Nairobi' : 'Educational Programs at Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Tweetalige onderwijsprogramma\'s van peutergroep tot volwassenenonderwijs'
      : 'Bilingual educational programs from toddler group to adult education',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'EducationalOccupationalProgram',
          name: locale === 'nl' ? 'Peutergroep' : 'Toddler Group',
          description: locale === 'nl'
            ? 'Vroegschoolse educatie voor kinderen van 1½ tot 4 jaar met speels leren en Nederlandse taalblootstelling'
            : 'Early childhood education for children ages 1½-4 with play-based learning and Dutch language exposure',
          timeToComplete: 'P3Y',
          educationalProgramMode: 'full-time',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Dutch School Nairobi',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'EducationalOccupationalProgram',
          name: locale === 'nl' ? 'Basisschool' : 'Primary School',
          description: locale === 'nl'
            ? 'Tweetalig basisonderwijs voor kinderen van 4-12 jaar met Nederlands curriculum en IPC'
            : 'Bilingual primary education for ages 4-12 combining Dutch curriculum with International Primary Curriculum (IPC)',
          timeToComplete: 'P8Y',
          educationalProgramMode: 'full-time',
          educationalCredentialAwarded: 'Primary School Certificate',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Dutch School Nairobi',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'EducationalOccupationalProgram',
          name: 'NTC Lessons',
          description: locale === 'nl'
            ? 'Nederlandse Taal en Cultuur lessen voor kinderen van 3,5-18 jaar op andere internationale scholen'
            : 'Dutch Language and Culture (NTC) lessons for children ages 3.5-18 attending other international schools',
          timeToComplete: 'P1Y',
          educationalProgramMode: 'part-time',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Dutch School Nairobi',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'EducationalOccupationalProgram',
          name: locale === 'nl' ? 'Nederlandse Les voor Volwassenen' : 'Adult Dutch Lessons',
          description: locale === 'nl'
            ? 'Nederlandse taalcursussen voor volwassenen op alle niveaus'
            : 'Dutch language courses for adults at all proficiency levels',
          educationalProgramMode: 'part-time',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Dutch School Nairobi',
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programsSchema) }}
      />
      <HeroSection />
      <ProgramsGrid />
      <CurriculumSection />
      <ActivitiesSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('programsPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function ProgramsGrid() {
  const t = useTranslations('programs');
  const tp = useTranslations('programsPage');

  const programs = [
    {
      id: 'toddler',
      icon: '👶',
      title: t('toddler.title'),
      ages: t('toddler.ages'),
      description: t('toddler.description'),
      features: tp.raw('features.toddler') as string[],
      color: 'from-yellow/30 to-secondary/30',
    },
    {
      id: 'primary',
      icon: '📚',
      title: t('primary.title'),
      ages: t('primary.ages'),
      description: t('primary.description'),
      features: tp.raw('features.primary') as string[],
      color: 'from-primary/30 to-primary-light/30',
    },
    {
      id: 'ntc',
      icon: '🇳🇱',
      title: t('ntc.title'),
      ages: t('ntc.ages'),
      description: t('ntc.description'),
      features: tp.raw('features.ntc') as string[],
      color: 'from-accent/30 to-accent-light/30',
    },
    {
      id: 'adult',
      icon: '🎓',
      title: t('adult.title'),
      ages: t('adult.ages'),
      description: t('adult.description'),
      features: tp.raw('features.adult') as string[],
      color: 'from-purple/30 to-red/30',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {programs.map((program, index) => (
            <div
              key={program.id}
              id={program.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Placeholder */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className={`aspect-[4/3] bg-gradient-to-br ${program.color} rounded-3xl flex items-center justify-center`}>
                  <div className="text-center">
                    <span className="text-8xl">{program.icon}</span>
                    <p className="text-muted mt-4 text-sm">{tp('imagePlaceholder')}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-flex items-center px-4 py-2 bg-surface rounded-full text-sm font-medium text-primary mb-4">
                  {program.ages}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {program.title}
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  {program.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {program.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/enrollment"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
                >
                  {tp('applyNow')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const t = useTranslations('programsPage.curriculum');

  const subjects = [
    { icon: Languages, name: t('subjects.dutchLanguage'), color: 'primary' },
    { icon: Languages, name: t('subjects.englishLanguage'), color: 'accent' },
    { icon: Calculator, name: t('subjects.mathematics'), color: 'secondary' },
    { icon: Globe, name: t('subjects.worldStudies'), color: 'primary' },
    { icon: BookOpen, name: t('subjects.science'), color: 'accent' },
    { icon: Palette, name: t('subjects.arts'), color: 'secondary' },
    { icon: Music, name: t('subjects.music'), color: 'primary' },
    { icon: Users, name: t('subjects.pe'), color: 'accent' },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className={`w-14 h-14 mx-auto rounded-xl ${colorClasses[subject.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <subject.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground">{subject.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivitiesSection() {
  const t = useTranslations('programsPage.activities');
  const activities = t.raw('list') as string[];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('title')}
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              {t('subtitle')}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <span className="text-8xl">🎨</span>
              <p className="text-muted mt-4 text-sm">{t('imagePlaceholder')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('programsPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[
        { label: t('applyButton'), href: '/enrollment' },
        { label: t('contactButton'), href: '/contact', variant: 'secondary' },
      ]}
    />
  );
}
