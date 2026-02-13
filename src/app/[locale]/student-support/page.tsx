import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { UserCheck, Eye, HeartHandshake, Users, Sparkles } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Leerlingenzorg | Dutch School Nairobi' : 'Student Support | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Persoonlijke begeleiding voor elk kind. CITO, KIJK!, doorstroomtoets en meer.'
      : 'Personal guidance for every child. CITO, KIJK!, transition test, and more.',
  };
}

export default async function StudentSupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <ApproachSection />
      <AssessmentSection />
      <GiftedSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('studentSupportPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('studentSupportPage.intro');

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

function ApproachSection() {
  const t = useTranslations('studentSupportPage.approach');

  const approaches = [
    {
      icon: UserCheck,
      title: t('ib.title'),
      description: t('ib.description'),
      color: 'primary',
    },
    {
      icon: Eye,
      title: t('observation.title'),
      description: t('observation.description'),
      color: 'secondary',
    },
    {
      icon: HeartHandshake,
      title: t('support.title'),
      description: t('support.description'),
      color: 'accent',
    },
    {
      icon: Users,
      title: t('parents.title'),
      description: t('parents.description'),
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
          {approaches.map((approach, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl">
              <div className={`w-14 h-14 rounded-xl ${colorClasses[approach.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <approach.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {approach.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {approach.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AssessmentSection() {
  const t = useTranslations('studentSupportPage.assessment');

  const systems = [
    {
      title: t('systems.kijk.title'),
      description: t('systems.kijk.description'),
      color: 'primary',
    },
    {
      title: t('systems.cito.title'),
      description: t('systems.cito.description'),
      color: 'secondary',
    },
    {
      title: t('systems.doorstroom.title'),
      description: t('systems.doorstroom.description'),
      color: 'accent',
    },
    {
      title: t('systems.pearson.title'),
      description: t('systems.pearson.description'),
      color: 'primary',
    },
  ];

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent',
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
          {t('title')}
        </h2>
        <p className="text-lg text-muted text-center mb-12 max-w-2xl mx-auto">
          {t('content')}
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {systems.map((system, index) => (
            <div
              key={index}
              className={`bg-surface p-6 rounded-xl border-l-4 ${colorClasses[system.color as keyof typeof colorClasses]}`}
            >
              <h3 className="text-lg font-bold text-foreground mb-2">
                {system.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {system.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GiftedSection() {
  const t = useTranslations('studentSupportPage.gifted');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 lg:p-12 rounded-3xl text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-muted leading-relaxed">
            {t('content')}
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('studentSupportPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
