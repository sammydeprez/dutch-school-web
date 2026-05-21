import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Bus, Shield, MapPin, Check } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/practical/transport'),
    title: locale === 'nl' ? 'Schooltransport | Dutch School Nairobi' : 'School Transport | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Veilig schoolbusvervoer vanuit verschillende delen van Nairobi.'
      : 'Safe school bus transport from various parts of Nairobi.',
  };
}

export default async function TransportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/practical/transport" />
      <HeroSection />
      <IntroSection />
      <RoutesSection />
      <SafetySection />
      <PracticalSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('transportPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('transportPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Bus className="w-8 h-8 text-primary" />
        </div>
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

function RoutesSection() {
  const t = useTranslations('transportPage.routes');

  const routes = [
    {
      title: t('route1.title'),
      description: t('route1.description'),
      areas: t.raw('route1.areas') as string[],
      color: 'primary',
    },
    {
      title: t('route2.title'),
      description: t('route2.description'),
      areas: t.raw('route2.areas') as string[],
      color: 'secondary',
    },
  ];

  const colorClasses = {
    primary: 'border-primary bg-primary/5',
    secondary: 'border-secondary bg-secondary/5',
  };

  const dotColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
  };

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {routes.map((route, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border-2 ${colorClasses[route.color as keyof typeof colorClasses]}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className={`w-6 h-6 ${route.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                <h3 className="text-xl font-bold text-foreground">
                  {route.title}
                </h3>
              </div>
              <p className="text-muted mb-4">
                {route.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {route.areas.map((area, areaIndex) => (
                  <span
                    key={areaIndex}
                    className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm"
                  >
                    <span className={`w-2 h-2 rounded-full ${dotColors[route.color as keyof typeof dotColors]}`} />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetySection() {
  const t = useTranslations('transportPage.safety');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface p-8 lg:p-12 rounded-3xl text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-accent" />
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

function PracticalSection() {
  const t = useTranslations('transportPage.practical');

  const items = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('title')}
        </h2>

        <div className="bg-white p-8 rounded-2xl">
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
  const t = useTranslations('transportPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
