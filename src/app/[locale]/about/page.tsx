import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Award, Heart, Lightbulb, Globe, Users, GraduationCap, Calendar, ArrowRight } from 'lucide-react';

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <HeroSection />
      <HistorySection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('aboutPage.hero');

  return (
    <section className="relative gradient-hero py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}

function HistorySection() {
  const t = useTranslations('aboutPage');

  const timeline = [
    { year: '1971', event: 'School founded by Dutch expatriate families' },
    { year: '1985', event: 'Official recognition by Dutch government' },
    { year: '2000', event: 'Introduction of IPC curriculum' },
    { year: '2010', event: 'NTC program expansion across Nairobi' },
    { year: '2020', event: 'Digital learning integration' },
    { year: 'Today', event: '50+ years of educational excellence' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('history.title')}
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              {t('history.content')}
            </p>

            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('approach.title')}
            </h3>
            <p className="text-muted leading-relaxed">
              {t('approach.content')}
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
    { name: 'Dr. Sarah van Dijk', role: 'School Director', initials: 'SD' },
    { name: 'Mark de Vries', role: 'Head of Primary', initials: 'MV' },
    { name: 'Anna Bakker', role: 'Head of Early Years', initials: 'AB' },
    { name: 'James Ochieng', role: 'Operations Manager', initials: 'JO' },
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
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-3xl font-bold text-white">{member.initials}</span>
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
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Join Our Community?
        </h2>
        <p className="text-white/80 mb-8">
          Schedule a visit to experience our campus and meet our team.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-surface transition-colors"
        >
          Schedule a Visit
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
