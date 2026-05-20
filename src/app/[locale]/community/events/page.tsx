import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Gift, Crown, Snowflake, DoorOpen, Trophy, GraduationCap, Calendar } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/community/events'),
    title: locale === 'nl' ? 'Evenementen | Dutch School Nairobi' : 'Events | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Nederlandse tradities en internationale vieringen. Sinterklaas, Koningsdag en meer.'
      : 'Dutch traditions and international celebrations. Sinterklaas, King\'s Day, and more.',
  };
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/community/events" />
      <HeroSection />
      <IntroSection />
      <DutchTraditionsSection />
      <SchoolEventsSection />
      <CalendarSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('eventsPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('eventsPage.intro');

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

function DutchTraditionsSection() {
  const t = useTranslations('eventsPage.dutch');

  const events = [
    {
      icon: Gift,
      title: t('events.sinterklaas.title'),
      description: t('events.sinterklaas.description'),
      color: 'red',
    },
    {
      icon: Crown,
      title: t('events.koningsdag.title'),
      description: t('events.koningsdag.description'),
      color: 'secondary',
    },
    {
      icon: Snowflake,
      title: t('events.kerst.title'),
      description: t('events.kerst.description'),
      color: 'primary',
    },
  ];

  const colorClasses = {
    red: 'bg-red/10 text-red',
    secondary: 'bg-secondary/10 text-secondary',
    primary: 'bg-primary/10 text-primary',
  };

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl text-center">
              <div className={`w-16 h-16 mx-auto rounded-2xl ${colorClasses[event.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <event.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {event.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SchoolEventsSection() {
  const t = useTranslations('eventsPage.school');

  const events = [
    {
      icon: DoorOpen,
      title: t('events.openDay.title'),
      description: t('events.openDay.description'),
      color: 'primary',
    },
    {
      icon: Trophy,
      title: t('events.sportsDay.title'),
      description: t('events.sportsDay.description'),
      color: 'secondary',
    },
    {
      icon: GraduationCap,
      title: t('events.endOfYear.title'),
      description: t('events.endOfYear.description'),
      color: 'accent',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-surface p-8 rounded-2xl text-center">
              <div className={`w-16 h-16 mx-auto rounded-2xl ${colorClasses[event.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <event.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {event.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CalendarSection() {
  const t = useTranslations('eventsPage.calendar');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 lg:p-12 rounded-3xl text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Calendar className="w-8 h-8 text-primary" />
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
  const t = useTranslations('eventsPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
