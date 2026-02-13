import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { BookOpen, Calculator, FileText, Check } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Curriculum | Dutch School Nairobi' : 'Curriculum | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Ons curriculum combineert het Nederlandse onderwijssysteem met IEYC en IPC voor tweetalig onderwijs.'
      : 'Our curriculum combines the Dutch educational system with IEYC and IPC for bilingual education.',
  };
}

export default async function CurriculumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <DutchCurriculumSection />
      <IEYCSection />
      <IPCSection />
      <AssessmentSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('curriculumPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('curriculumPage.intro');

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

function DutchCurriculumSection() {
  const t = useTranslations('curriculumPage.dutch');

  const subjects = [
    {
      icon: BookOpen,
      title: t('subjects.language.title'),
      description: t('subjects.language.description'),
    },
    {
      icon: Calculator,
      title: t('subjects.math.title'),
      description: t('subjects.math.description'),
    },
    {
      icon: FileText,
      title: t('subjects.reading.title'),
      description: t('subjects.reading.description'),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
          {t('title')}
        </h2>
        <p className="text-lg text-muted text-center mb-12 max-w-2xl mx-auto">
          {t('content')}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <subject.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {subject.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {subject.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IEYCSection() {
  const t = useTranslations('curriculumPage.ieyc');

  const features = [
    t('features.0'),
    t('features.1'),
    t('features.2'),
    t('features.3'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary/5 p-8 lg:p-12 rounded-3xl border-2 border-secondary">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-muted mb-8">
            {t('content')}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IPCSection() {
  const t = useTranslations('curriculumPage.ipc');

  const features = [
    t('features.0'),
    t('features.1'),
    t('features.2'),
    t('features.3'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 lg:p-12 rounded-3xl border-2 border-accent">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-muted mb-8">
            {t('content')}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-surface p-4 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AssessmentSection() {
  const t = useTranslations('curriculumPage.assessment');

  const tools = [
    t('tools.0'),
    t('tools.1'),
    t('tools.2'),
    t('tools.3'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
          {t('title')}
        </h2>
        <p className="text-lg text-muted text-center mb-8">
          {t('content')}
        </p>

        <div className="bg-surface p-8 rounded-2xl">
          <ul className="space-y-4">
            {tools.map((tool, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-foreground">{tool}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('curriculumPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
