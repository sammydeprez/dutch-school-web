import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Check } from 'lucide-react';
import { PageHero, PageCTA, OptimizedImage } from '@/components/ui';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/education/primary'),
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
      url: 'https://www.dutchschool.ke',
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
      <BilingualVisionSection />
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
              src="/images/primary-page.png"
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

function BilingualVisionSection() {
  const t = useTranslations('primaryPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('visionTitle')}
        </h2>
        <div className="space-y-5 text-muted leading-relaxed">
          <p>{t('visionContent')}</p>
          <p>{t('visionParagraph2')}</p>
          <p>{t('visionParagraph3')}</p>
          <p>{t('visionParagraph4')}</p>
          <p>{t('visionParagraph5')}</p>
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
      extended: t('kindergarten.extended'),
      color: 'primary',
    },
    {
      title: t('lower.title'),
      description: t('lower.description'),
      extended: t('lower.extended'),
      color: 'secondary',
    },
    {
      title: t('upper.title'),
      description: t('upper.description'),
      extended: t('upper.extended'),
      color: 'accent',
    },
  ];

  const colorClasses = {
    primary: 'border-primary bg-primary/5',
    secondary: 'border-secondary bg-secondary/5',
    accent: 'border-accent bg-accent/5',
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="space-y-8">
          {levels.map((level, index) => (
            <div
              key={index}
              className={`p-8 lg:p-10 rounded-2xl border-2 ${colorClasses[level.color as keyof typeof colorClasses]}`}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {level.title}
              </h3>
              <p className="text-muted leading-relaxed mb-4 font-medium">
                {level.description}
              </p>
              <details className="group">
                <summary className="cursor-pointer text-primary font-semibold hover:underline list-none flex items-center gap-2">
                  <span>Lees meer / Read more</span>
                  <span className="transition-transform group-open:rotate-90">›</span>
                </summary>
                <p className="text-muted leading-relaxed mt-4 pt-4 border-t border-border">
                  {level.extended}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const t = useTranslations('primaryPage.curriculum');

  const dutchSubjects = t.raw('dutch.subjects') as string[];
  const ipcSubjects = t.raw('ipc.subjects') as string[];
  const englishSubjects = t.raw('english.subjects') as string[];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

          <div className="bg-accent/5 p-8 rounded-2xl border-2 border-accent">
            <h3 className="text-xl font-bold text-foreground mb-6">
              {t('english.title')}
            </h3>
            <ul className="space-y-3">
              {englishSubjects.map((subject, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
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

  const items = t.raw('items') as string[];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
          {t('title')}
        </h2>
        <p className="text-lg text-muted text-center mb-8">
          {t('content')}
        </p>

        <div className="bg-surface p-8 rounded-2xl">
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
