import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Users, Wrench, ShieldCheck } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Ons Team | Dutch School Nairobi' : 'Our Team | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Maak kennis met ons team van toegewijde professionals die elk kind persoonlijk kennen.'
      : 'Meet our team of dedicated professionals who know every child personally.',
  };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <RosterSection />
      <WholeTeamSection />
      <TeamSections />
      <BoardSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('teamPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('teamPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
          {t('title')}
        </h2>
        <div className="space-y-5 text-lg text-muted leading-relaxed">
          <p>{t('content')}</p>
          <p>{t('content2')}</p>
        </div>
      </div>
    </section>
  );
}

type Member = { name: string; role: string };

function RosterSection() {
  const t = useTranslations('teamPage.roster');
  const members = t.raw('members') as Member[];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-muted text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WholeTeamSection() {
  const t = useTranslations('teamPage.wholeTeam');
  const members = t.raw('members') as Member[];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
            {t('title')}
          </h2>
          <div className="space-y-5 text-muted leading-relaxed">
            <p>{t('content')}</p>
            <p>{t('content2')}</p>
            <p>{t('content3')}</p>
            <p>{t('content4')}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <div key={index} className="bg-surface p-6 rounded-2xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
                <p className="text-muted text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSections() {
  const t = useTranslations('teamPage');

  const sections = [
    {
      title: t('leadership.title'),
      description: t('leadership.description'),
      color: 'primary',
    },
    {
      title: t('teachers.title'),
      description: t('teachers.description'),
      color: 'secondary',
    },
    {
      title: t('support.title'),
      description: t('support.description'),
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
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border-2 ${colorClasses[section.color as keyof typeof colorClasses]}`}
            >
              <h3 className="text-xl font-bold text-foreground mb-4">
                {section.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoardSection() {
  const t = useTranslations('teamPage.board');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex w-16 h-16 mx-auto rounded-2xl bg-accent/10 items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          {t('title')}
        </h2>
        <p className="text-lg text-muted leading-relaxed">
          {t('description')}
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('teamPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
