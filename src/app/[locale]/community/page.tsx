import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/community'),
    title: locale === 'nl' ? 'Gemeenschap | Dutch School Nairobi' : 'Community | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Een hechte, internationale schoolfamilie. Ouderbetrokkenheid en evenementen.'
      : 'A close-knit, international school family. Parent involvement and events.',
  };
}

export default async function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/community" />
      <HeroSection />
      <IntroSection />
      <SectionsOverview />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('communityPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('communityPage.intro');

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
  const t = useTranslations('communityPage.sections');

  const sections = [
    {
      icon: Users,
      title: t('parents.title'),
      description: t('parents.description'),
      link: '/community/parents',
      linkText: t('parents.link'),
      color: 'primary',
    },
    {
      icon: Calendar,
      title: t('events.title'),
      description: t('events.description'),
      link: '/community/events',
      linkText: t('events.link'),
      color: 'secondary',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
  };

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
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

function CTASection() {
  const t = useTranslations('communityPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
