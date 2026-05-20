import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Award, Heart, Lightbulb, Globe, Calendar } from 'lucide-react';
import { PageHero, PageCTA, OptimizedImage } from '@/components/ui';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Over Ons | Dutch School Nairobi' : 'About Us | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Leer meer over de geschiedenis, missie en waarden van Dutch School Nairobi. Al 50+ jaar tweetalig onderwijs in Kenia.'
      : 'Learn about Dutch School Nairobi\'s history, mission, and values. 50+ years of bilingual education in Kenya.',
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // AboutPage schema for rich results
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: locale === 'nl' ? 'Over Dutch School Nairobi' : 'About Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Leer meer over de geschiedenis, missie en waarden van Dutch School Nairobi - al meer dan 50 jaar tweetalig onderwijs in Kenia.'
      : 'Learn about Dutch School Nairobi\'s history, mission, and values - over 50 years of bilingual education in Kenya.',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Dutch School Nairobi',
      alternateName: ['Netherlands School Society', 'Nederlandse Schoolvereniging Nairobi'],
      foundingDate: '1971',
      foundingLocation: {
        '@type': 'Place',
        name: 'Nairobi, Kenya',
      },
      description: locale === 'nl'
        ? 'De Nederlandse Schoolvereniging Nairobi is een erkende tweetalige basisschool in Kenia, opgericht in 1971. De school biedt Nederlands en Engels onderwijs voor kinderen van 1½-18 jaar en is erkend door de Stichting Nederlands Onderwijs in het Buitenland (NOB).'
        : 'Dutch School Nairobi (Nederlandse Schoolvereniging) is an accredited bilingual primary school in Kenya, founded in 1971. The school offers Dutch and English education for children ages 1½-18 and is recognized by the Dutch Education Abroad Foundation (NOB).',
      knowsAbout: [
        'Bilingual Education',
        'Dutch Language Education',
        'International Primary Curriculum (IPC)',
        'Early Childhood Education',
        'Dutch Culture Education',
      ],
      award: 'Recognized by Dutch Education Abroad Foundation (NOB)',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: 20,
      },
    },
  };

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/about" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <HeroSection />
      <HistorySection />
      <ApproachSection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('aboutPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function HistorySection() {
  const t = useTranslations('aboutPage');

  const timeline = [
    { year: '1971', event: t('history.timeline.1971') },
    { year: '1985', event: t('history.timeline.1985') },
    { year: '2007', event: t('history.timeline.2007') },
    { year: '2014', event: t('history.timeline.2014') },
    { year: '2016', event: t('history.timeline.2016') },
    { year: '2024', event: t('history.timeline.2024') },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('history.title')}
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              {t('history.content')}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-surface p-4 rounded-xl">
                    <p className="font-bold text-primary">{item.year}</p>
                    <p className="text-muted text-sm">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const t = useTranslations('aboutPage.approach');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('title')}
        </h2>
        <div className="space-y-5 text-muted leading-relaxed">
          <p>{t('content')}</p>
          <p>{t('paragraph2')}</p>
          <p>{t('paragraph3')}</p>
          <p>{t('paragraph4')}</p>
          <p>{t('paragraph5')}</p>
          <p>{t('paragraph6')}</p>
        </div>
        <div className="mt-10 bg-white p-6 lg:p-8 rounded-2xl border-2 border-primary/20 text-center">
          <p className="text-lg lg:text-xl font-semibold text-foreground italic">
            &ldquo;{t('quote')}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const t = useTranslations('aboutPage.values');

  const values = [
    {
      icon: Award,
      title: t('value1.title'),
      description: t('value1.description'),
      color: 'primary',
    },
    {
      icon: Heart,
      title: t('value2.title'),
      description: t('value2.description'),
      color: 'red',
    },
    {
      icon: Lightbulb,
      title: t('value3.title'),
      description: t('value3.description'),
      color: 'secondary',
    },
    {
      icon: Globe,
      title: t('value4.title'),
      description: t('value4.description'),
      color: 'accent',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    red: 'bg-red/10 text-red',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 mx-auto rounded-2xl ${colorClasses[value.color as keyof typeof colorClasses]} flex items-center justify-center mb-6`}>
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const t = useTranslations('aboutPage.team');

  const team = [
    { name: t('members.director.name'), role: t('members.director.role'), image: '/images/team/director.png' },
    { name: t('members.headPrimary.name'), role: t('members.headPrimary.role'), image: '/images/team/primary-head.png' },
    { name: t('members.headEarlyYears.name'), role: t('members.headEarlyYears.role'), image: '/images/team/joke.png' },
    { name: t('members.operations.name'), role: t('members.operations.role'), image: '/images/team/operations.png' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-105 transition-transform">
                <OptimizedImage
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <p className="text-muted text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('aboutPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
