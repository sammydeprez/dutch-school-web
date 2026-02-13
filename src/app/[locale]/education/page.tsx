import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Users, GraduationCap, Globe, Palette, Languages } from 'lucide-react';
import { PageHero, PageCTA, OptimizedImage } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Onderwijs | Dutch School Nairobi' : 'Education | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Tweetalig onderwijs van peuterspeelzaal tot en met groep 8. Peuterspeelzaal, Basisschool en NTC programma.'
      : 'Bilingual education from toddler group through grade 8. Toddler Group, Primary School, and NTC program.',
  };
}

export default async function EducationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <ProgramsSection />
      <ExtrasSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('educationPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('educationPage.intro');

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

function ProgramsSection() {
  const t = useTranslations('educationPage.programs');

  const programs = [
    {
      key: 'toddler',
      icon: Users,
      title: t('toddler.title'),
      ages: t('toddler.ages'),
      description: t('toddler.description'),
      link: '/education/toddler',
      linkText: t('toddler.link'),
      image: '/images/toddler.png',
      color: 'primary',
    },
    {
      key: 'primary',
      icon: GraduationCap,
      title: t('primary.title'),
      ages: t('primary.ages'),
      description: t('primary.description'),
      link: '/education/primary',
      linkText: t('primary.link'),
      image: '/images/primary.png',
      color: 'secondary',
    },
    {
      key: 'ntc',
      icon: Globe,
      title: t('ntc.title'),
      ages: t('ntc.ages'),
      description: t('ntc.description'),
      link: '/education/ntc',
      linkText: t('ntc.link'),
      image: '/images/ntc.png',
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
        <div className="grid lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.key}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <OptimizedImage
                  src={program.image}
                  alt={program.title}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className={`w-14 h-14 rounded-xl ${colorClasses[program.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                  <program.icon className="w-7 h-7" />
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-surface rounded-full text-sm text-muted mb-3">
                  {program.ages}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {program.title}
                </h3>
                <p className="text-muted leading-relaxed mb-6">
                  {program.description}
                </p>
                <Link
                  href={program.link}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  {program.linkText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtrasSection() {
  const t = useTranslations('educationPage.extras');

  const extras = [
    {
      key: 'languageClub',
      icon: Languages,
      title: t('languageClub.title'),
      description: t('languageClub.description'),
      link: '/education/language-club',
      linkText: t('languageClub.link'),
    },
    {
      key: 'skillsClub',
      icon: Palette,
      title: t('skillsClub.title'),
      description: t('skillsClub.description'),
      link: '/education/skills-club',
      linkText: t('skillsClub.link'),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {extras.map((extra) => (
            <div
              key={extra.key}
              className="bg-surface p-8 rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <extra.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {extra.title}
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                {extra.description}
              </p>
              <Link
                href={extra.link}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                {extra.linkText}
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
  const t = useTranslations('educationPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
