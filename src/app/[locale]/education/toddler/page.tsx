import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Calendar, Languages, Gamepad2, Eye, Clock, Users, UserCheck } from 'lucide-react';
import { PageHero, PageCTA, OptimizedImage } from '@/components/ui';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/education/toddler'),
    title: locale === 'nl' ? 'Peuterspeelzaal | Dutch School Nairobi' : 'Toddler Group | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Peuterspeelzaal voor kinderen vanaf 1,5 jaar. Spelend leren in een kleine groep van maximaal 15 kinderen.'
      : 'Toddler group for children from age 1.5. Learning through play in a small group of maximum 15 children.',
  };
}

export default async function ToddlerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Structured data for toddler program
  const programSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: locale === 'nl' ? 'Peuterspeelzaal' : 'Toddler Group',
    description: locale === 'nl'
      ? 'Spelend leren in een kleine groep van maximaal 15 kinderen, voor kinderen vanaf 1,5 jaar.'
      : 'Learning through play in a small group of maximum 15 children, for children from age 1.5.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Dutch School Nairobi',
      url: 'https://www.dutchschool.co.ke',
    },
    educationalProgramMode: 'full-time',
    timeToComplete: 'P2Y6M',
    programPrerequisites: locale === 'nl' ? 'Minimaal 1,5 jaar oud' : 'Minimum age 1.5 years',
    occupationalCategory: 'Early Childhood Education',
    teaches: [
      locale === 'nl' ? 'Sociale ontwikkeling' : 'Social development',
      locale === 'nl' ? 'Taalverwerving (Nederlands)' : 'Language acquisition (Dutch)',
      locale === 'nl' ? 'Motorische vaardigheden' : 'Motor skills',
      locale === 'nl' ? 'Creatieve expressie' : 'Creative expression',
    ],
  };

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/education/toddler" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema) }}
      />
      <HeroSection />
      <IntroSection />
      <ProgramSection />
      <ActivitiesSection />
      <PracticalSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('toddlerPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('toddlerPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('title')}
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p className="text-lg">{t('content')}</p>
              <p>{t('paragraph2')}</p>
              <p>{t('paragraph3')}</p>
              <p>{t('paragraph4')}</p>
              <p className="font-medium text-foreground">{t('paragraph5')}</p>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden lg:sticky lg:top-24">
            <OptimizedImage
              src="/images/toddler-page.png"
              alt="Toddler group at Dutch School Nairobi"
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

function ProgramSection() {
  const t = useTranslations('toddlerPage.program');

  const features = [
    {
      icon: Calendar,
      title: t('schedule.title'),
      description: t('schedule.description'),
      color: 'primary',
    },
    {
      icon: Languages,
      title: t('language.title'),
      description: t('language.description'),
      color: 'secondary',
    },
    {
      icon: Gamepad2,
      title: t('play.title'),
      description: t('play.description'),
      color: 'accent',
    },
    {
      icon: Eye,
      title: t('observation.title'),
      description: t('observation.description'),
      color: 'primary',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl">
              <div className={`w-14 h-14 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
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

function ActivitiesSection() {
  const t = useTranslations('toddlerPage.activities');

  const activities = [
    t('list.0'),
    t('list.1'),
    t('list.2'),
    t('list.3'),
    t('list.4'),
    t('list.5'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('title')}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="bg-surface p-5 rounded-xl flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
              <span className="text-foreground">{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PracticalSection() {
  const t = useTranslations('toddlerPage.practical');

  const info = [
    { icon: Clock, text: t('hours') },
    { icon: Users, text: t('group') },
    { icon: UserCheck, text: t('staff') },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('title')}
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {info.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-foreground font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('toddlerPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
