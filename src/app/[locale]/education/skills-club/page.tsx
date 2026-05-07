import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Palette, Music, Hammer, Flower2, Dumbbell, Laptop } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Skills Club | Dutch School Nairobi' : 'Skills Club | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Naschoolse activiteiten voor brede ontwikkeling: kunst, muziek, houtbewerking, tuinieren en sport.'
      : 'After-school activities for broad development: art, music, woodworking, gardening, and sports.',
  };
}

export default async function SkillsClubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <ActivitiesSection />
      <ScheduleSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('skillsClubPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('skillsClubPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
          {t('title')}
        </h2>
        <p className="text-lg text-muted leading-relaxed text-center mb-12">
          {t('content')}
        </p>

        <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
          {t('extendedTitle')}
        </h3>
        <div className="space-y-5 text-muted leading-relaxed">
          <p>{t('paragraph2')}</p>
          <p>{t('paragraph3')}</p>
          <p>{t('paragraph4')}</p>
          <p>{t('paragraph5')}</p>
          <p className="font-medium text-foreground">{t('paragraph6')}</p>
        </div>
      </div>
    </section>
  );
}

function ActivitiesSection() {
  const t = useTranslations('skillsClubPage.activities');

  const activities = [
    {
      icon: Palette,
      title: t('art.title'),
      description: t('art.description'),
      color: 'primary',
    },
    {
      icon: Music,
      title: t('music.title'),
      description: t('music.description'),
      color: 'secondary',
    },
    {
      icon: Hammer,
      title: t('woodwork.title'),
      description: t('woodwork.description'),
      color: 'accent',
    },
    {
      icon: Flower2,
      title: t('gardening.title'),
      description: t('gardening.description'),
      color: 'primary',
    },
    {
      icon: Dumbbell,
      title: t('sports.title'),
      description: t('sports.description'),
      color: 'secondary',
    },
    {
      icon: Laptop,
      title: t('digital.title'),
      description: t('digital.description'),
      color: 'accent',
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className={`w-14 h-14 rounded-xl ${colorClasses[activity.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <activity.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {activity.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const t = useTranslations('skillsClubPage.schedule');

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

function CTASection() {
  const t = useTranslations('skillsClubPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
