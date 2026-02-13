import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { BookOpen, Users, Globe, Music, Palette, Calculator, Languages, ArrowRight, CheckCircle } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Programma\'s | Dutch School Nairobi' : 'Programs | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Ontdek onze onderwijsprogramma\'s: peutergroep, basisschool, NTC-lessen en Nederlandse lessen voor volwassenen.'
      : 'Discover our educational programs: toddler group, primary school, NTC lessons, and Dutch lessons for adults.',
  };
}

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProgramsGrid />
      <CurriculumSection />
      <ActivitiesSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('programsPage.hero');

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

function ProgramsGrid() {
  const t = useTranslations('programs');

  const programs = [
    {
      id: 'toddler',
      icon: '👶',
      title: t('toddler.title'),
      ages: t('toddler.ages'),
      description: t('toddler.description'),
      features: [
        'Play-based learning',
        'Early Dutch language exposure',
        'Social skill development',
        'Creative activities',
        'Outdoor play time',
      ],
      color: 'from-yellow/30 to-secondary/30',
    },
    {
      id: 'primary',
      icon: '📚',
      title: t('primary.title'),
      ages: t('primary.ages'),
      description: t('primary.description'),
      features: [
        'Dutch curriculum',
        'IPC (International Primary Curriculum)',
        'Bilingual instruction',
        'Small class sizes',
        'Individual attention',
      ],
      color: 'from-primary/30 to-primary-light/30',
    },
    {
      id: 'ntc',
      icon: '🇳🇱',
      title: t('ntc.title'),
      ages: t('ntc.ages'),
      description: t('ntc.description'),
      features: [
        'Dutch language lessons',
        'Dutch culture education',
        'Multiple locations in Nairobi',
        'After-school schedule',
        'CNaVT exam preparation',
      ],
      color: 'from-accent/30 to-accent-light/30',
    },
    {
      id: 'adult',
      icon: '🎓',
      title: t('adult.title'),
      ages: t('adult.ages'),
      description: t('adult.description'),
      features: [
        'Beginner to advanced levels',
        'Flexible scheduling',
        'Conversational focus',
        'Business Dutch available',
        'Small groups or private',
      ],
      color: 'from-purple/30 to-red/30',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {programs.map((program, index) => (
            <div
              key={program.id}
              id={program.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Placeholder */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className={`aspect-[4/3] bg-gradient-to-br ${program.color} rounded-3xl flex items-center justify-center`}>
                  <div className="text-center">
                    <span className="text-8xl">{program.icon}</span>
                    <p className="text-muted mt-4 text-sm">Image Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-flex items-center px-4 py-2 bg-surface rounded-full text-sm font-medium text-primary mb-4">
                  {program.ages}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {program.title}
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  {program.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {program.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/enrollment"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
                >
                  Apply Now
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

function CurriculumSection() {
  const subjects = [
    { icon: Languages, name: 'Dutch Language', color: 'primary' },
    { icon: Languages, name: 'English Language', color: 'accent' },
    { icon: Calculator, name: 'Mathematics', color: 'secondary' },
    { icon: Globe, name: 'World Studies', color: 'primary' },
    { icon: BookOpen, name: 'Science', color: 'accent' },
    { icon: Palette, name: 'Arts & Crafts', color: 'secondary' },
    { icon: Music, name: 'Music', color: 'primary' },
    { icon: Users, name: 'Physical Education', color: 'accent' },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Curriculum Overview
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Our curriculum combines the Dutch education system with the International Primary Curriculum (IPC) for a comprehensive learning experience.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className={`w-14 h-14 mx-auto rounded-xl ${colorClasses[subject.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <subject.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground">{subject.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivitiesSection() {
  const activities = [
    'Swimming lessons',
    'Football club',
    'Art workshops',
    'Music classes',
    'Dutch cultural events',
    'Field trips',
    'Library time',
    'Science experiments',
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Extracurricular Activities
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Beyond academics, we offer a variety of activities that help children develop new skills, explore interests, and build lasting friendships.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <span className="text-8xl">🎨</span>
              <p className="text-muted mt-4 text-sm">Activities Image Placeholder</p>
            </div>
          </div>
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
          Find the Right Program for Your Child
        </h2>
        <p className="text-white/80 mb-8">
          Contact us to learn more about our programs and schedule a visit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/enrollment"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-surface transition-colors"
          >
            Start Application
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-dark text-white font-semibold rounded-full hover:bg-foreground transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
