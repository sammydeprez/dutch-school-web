import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Check } from 'lucide-react';
import { PageHero, PageCTA, OptimizedImage } from '@/components/ui';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Basisschool | Dutch School Nairobi' : 'Primary School | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Tweetalig basisonderwijs van groep 1 tot en met groep 8. Nederlands curriculum gecombineerd met IPC.'
      : 'Bilingual primary education from groups 1 through 8. Dutch curriculum combined with IPC.',
  };
}

export default async function PrimaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Structured data for primary school program
  const programSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: locale === 'nl' ? 'Basisschool' : 'Primary School',
    description: locale === 'nl'
      ? 'Tweetalig basisonderwijs van groep 1 tot en met groep 8, met Nederlands curriculum gecombineerd met International Primary Curriculum (IPC).'
      : 'Bilingual primary education from groups 1 through 8, combining Dutch curriculum with International Primary Curriculum (IPC).',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Dutch School Nairobi',
      url: 'https://www.dutchschool.co.ke',
    },
    educationalProgramMode: 'full-time',
    timeToComplete: 'P8Y',
    programPrerequisites: locale === 'nl' ? 'Minimaal 4 jaar oud' : 'Minimum age 4 years',
    educationalCredentialAwarded: locale === 'nl' ? 'Basisschooldiploma' : 'Primary School Diploma',
    occupationalCategory: 'Primary Education',
    teaches: [
      locale === 'nl' ? 'Nederlandse taal' : 'Dutch language',
      locale === 'nl' ? 'Engelse taal' : 'English language',
      locale === 'nl' ? 'Rekenen/Wiskunde' : 'Mathematics',
      locale === 'nl' ? 'Wereldoriëntatie' : 'World orientation',
      locale === 'nl' ? 'Creatieve vakken' : 'Creative subjects',
    ],
  };

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/education/primary" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema) }}
      />
      <HeroSection />
      <IntroSection />
      <BilingualSection />
      <CurriculumSection />
      <AssessmentSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('primaryPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('primaryPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              {t('content')}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden">
            <OptimizedImage
              src="/images/primary.png"
              alt="Primary school at Dutch School Nairobi"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BilingualSection() {
  const t = useTranslations('primaryPage.bilingual');

  const levels = [
    {
      title: t('kindergarten.title'),
      description: t('kindergarten.description'),
      color: 'primary',
    },
    {
      title: t('lower.title'),
      description: t('lower.description'),
      color: 'secondary',
    },
    {
      title: t('upper.title'),
      description: t('upper.description'),
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
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border-2 ${colorClasses[level.color as keyof typeof colorClasses]}`}
            >
              <h3 className="text-xl font-bold text-foreground mb-3">
                {level.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {level.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const t = useTranslations('primaryPage.curriculum');

  const dutchSubjects = [
    t('dutch.subjects.0'),
    t('dutch.subjects.1'),
    t('dutch.subjects.2'),
    t('dutch.subjects.3'),
    t('dutch.subjects.4'),
  ];

  const ipcSubjects = [
    t('ipc.subjects.0'),
    t('ipc.subjects.1'),
    t('ipc.subjects.2'),
    t('ipc.subjects.3'),
    t('ipc.subjects.4'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-primary/5 p-8 rounded-2xl border-2 border-primary">
            <h3 className="text-xl font-bold text-foreground mb-6">
              {t('dutch.title')}
            </h3>
            <ul className="space-y-3">
              {dutchSubjects.map((subject, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">{subject}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/5 p-8 rounded-2xl border-2 border-secondary">
            <h3 className="text-xl font-bold text-foreground mb-6">
              {t('ipc.title')}
            </h3>
            <ul className="space-y-3">
              {ipcSubjects.map((subject, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-foreground">{subject}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function AssessmentSection() {
  const t = useTranslations('primaryPage.assessment');

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
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
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

function CTASection() {
  const t = useTranslations('primaryPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
