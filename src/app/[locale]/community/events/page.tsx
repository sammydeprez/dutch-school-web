import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Gift, Crown, Flag, Snowflake, GraduationCap, BookOpen, Flower2, Brain, Globe, TrafficCone, Calendar } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
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
      <HeroSection />
      <IntroSection />
      <TraditionsSection />
      <ThemeWeeksSection />
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

function TraditionsSection() {
  const t = useTranslations('eventsPage.traditions');

  const events = [
    { icon: Gift, title: t('events.sinterklaas.title'), description: t('events.sinterklaas.description'), color: 'primary' },
    { icon: Crown, title: t('events.koningsspelen.title'), description: t('events.koningsspelen.description'), color: 'secondary' },
    { icon: Flag, title: t('events.belgischeDag.title'), description: t('events.belgischeDag.description'), color: 'accent' },
    { icon: Snowflake, title: t('events.kerst.title'), description: t('events.kerst.description'), color: 'primary' },
    { icon: GraduationCap, title: t('events.eindmusical.title'), description: t('events.eindmusical.description'), color: 'secondary' },
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

function ThemeWeeksSection() {
  const t = useTranslations('eventsPage.themaweken');

  const events = [
    { icon: BookOpen, title: t('events.kinderboekenweek.title'), description: t('events.kinderboekenweek.description'), color: 'primary' },
    { icon: Flower2, title: t('events.lentekriebels.title'), description: t('events.lentekriebels.description'), color: 'secondary' },
    { icon: Brain, title: t('events.neuroDiversity.title'), description: t('events.neuroDiversity.description'), color: 'accent' },
    { icon: Globe, title: t('events.wereldReligie.title'), description: t('events.wereldReligie.description'), color: 'primary' },
    { icon: TrafficCone, title: t('events.verkeersweek.title'), description: t('events.verkeersweek.description'), color: 'secondary' },
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
