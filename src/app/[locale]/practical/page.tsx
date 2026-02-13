import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Clock, Bus, CreditCard, ArrowRight } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Praktische Informatie | Dutch School Nairobi' : 'Practical Information | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Alles wat u moet weten over schooltijden, transport en schoolgeld.'
      : 'Everything you need to know about school hours, transport, and tuition.',
  };
}

export default async function PracticalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <SectionsOverview />
      <ContactSection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('practicalPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('practicalPage.intro');

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

function SectionsOverview() {
  const t = useTranslations('practicalPage.sections');

  const sections = [
    {
      icon: Clock,
      title: t('schedule.title'),
      description: t('schedule.description'),
      link: '/practical/schedule',
      linkText: t('schedule.link'),
      color: 'primary',
    },
    {
      icon: Bus,
      title: t('transport.title'),
      description: t('transport.description'),
      link: '/practical/transport',
      linkText: t('transport.link'),
      color: 'secondary',
    },
    {
      icon: CreditCard,
      title: t('fees.title'),
      description: t('fees.description'),
      link: '/practical/fees',
      linkText: t('fees.link'),
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
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl ${colorClasses[section.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <section.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {section.title}
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                {section.description}
              </p>
              <Link
                href={section.link}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                {section.linkText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const t = useTranslations('practicalPage.contact');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('content')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
