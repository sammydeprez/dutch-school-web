import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  Languages,
  BookOpen,
  Users,
  Trees,
  ArrowRight,
  Star,
  GraduationCap,
  Heart,
  Globe,
  ChevronRight,
  Quote,
  Mail,
  Phone
} from 'lucide-react';
import { OptimizedImage } from '@/components/ui';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  return <HomePageContent params={params} />;
}

async function HomePageContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // FAQ Schema for homepage quick facts (AEO optimization)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'nl' ? 'Wat is Dutch School Nairobi?' : 'What is Dutch School Nairobi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'nl'
            ? 'Dutch School Nairobi (Nederlandse Schoolvereniging) is een erkende tweetalige basisschool in Kenia, die Nederlands en Engels onderwijs biedt voor kinderen van 1½-18 jaar. Opgericht in 1971 en erkend door de Stichting Nederlands Onderwijs in het Buitenland (NOB).'
            : 'Dutch School Nairobi (Nederlandse Schoolvereniging) is an accredited bilingual primary school in Kenya, offering Dutch and English education for children ages 1½-18. Established in 1971 and recognized by the Dutch Education Abroad Foundation (NOB).',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'nl' ? 'Welk curriculum volgt Dutch School Nairobi?' : 'What curriculum does Dutch School Nairobi follow?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'nl'
            ? 'Wij volgen een tweetalig curriculum dat de officiële Nederlandse onderwijsstandaarden combineert met het International Primary Curriculum (IPC).'
            : 'We follow a bilingual curriculum combining the official Dutch national education standards with the International Primary Curriculum (IPC).',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'nl' ? 'Moeten leerlingen Nederlands spreken om zich in te schrijven?' : 'Do students need to speak Dutch to enroll?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'nl'
            ? 'Nee, voorkennis van de Nederlandse taal is niet vereist. Ons immersieve tweetalige programma ondersteunt kinderen op alle taalniveaus.'
            : 'No prior Dutch language knowledge is required. Our immersive bilingual program supports children at all language levels.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ProgramsSection />
      <QuickFactsSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative gradient-hero overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span>{t('badges.since')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t('title')}
            </h1>

            <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto lg:mx-0 mb-8">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                {t('cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground font-semibold rounded-full border-2 border-border hover:border-primary hover:text-primary transition-all"
              >
                {t('secondaryCta')}
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2 text-sm text-muted">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <span>{t('badges.nobRecognized')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Globe className="w-5 h-5 text-accent" />
                </div>
                <span>{t('badges.nationalities')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Heart className="w-5 h-5 text-red" />
                </div>
                <span>{t('badges.smallClasses')}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="/images/hero-main.png"
                alt="Children learning at Dutch School Nairobi"
                width={1200}
                height={896}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Languages className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Bilingual</p>
                  <p className="text-sm text-muted">Dutch & English</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">IPC Curriculum</p>
                  <p className="text-sm text-muted">International Learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const t = useTranslations('features');

  const features = [
    {
      icon: Languages,
      title: t('bilingual.title'),
      description: t('bilingual.description'),
      color: 'primary',
    },
    {
      icon: BookOpen,
      title: t('curriculum.title'),
      description: t('curriculum.description'),
      color: 'secondary',
    },
    {
      icon: Users,
      title: t('community.title'),
      description: t('community.description'),
      color: 'accent',
    },
    {
      icon: Trees,
      title: t('environment.title'),
      description: t('environment.description'),
      color: 'primary',
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-surface hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-5`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <OptimizedImage
                src="/images/community.png"
                alt="Dutch School Nairobi community"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
              <p className="text-4xl font-bold">50+</p>
              <p className="text-sm opacity-90">{t('stats.years')}</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-primary font-medium mb-6">
              {t('subtitle')}
            </p>
            <p className="text-muted leading-relaxed mb-8">
              {t('description')}
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t('mission')}</h4>
                  <p className="text-muted text-sm">{t('missionText')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{t('vision')}</h4>
                  <p className="text-muted text-sm">{t('visionText')}</p>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              {t('learnMore')}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const t = useTranslations('programs');

  const programs = [
    {
      id: 'toddler',
      title: t('toddler.title'),
      ages: t('toddler.ages'),
      description: t('toddler.description'),
      image: '/images/toddler.png',
    },
    {
      id: 'primary',
      title: t('primary.title'),
      ages: t('primary.ages'),
      description: t('primary.description'),
      image: '/images/primary.png',
    },
    {
      id: 'ntc',
      title: t('ntc.title'),
      ages: t('ntc.ages'),
      description: t('ntc.description'),
      image: '/images/ntc.png',
    },
    {
      id: 'adult',
      title: t('adult.title'),
      ages: t('adult.ages'),
      description: t('adult.description'),
      image: '/images/adult.png',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group relative bg-white border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Program Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <OptimizedImage
                  src={program.image}
                  alt={program.title}
                  width={800}
                  height={597}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-8">
                <div className="inline-flex items-center px-3 py-1 bg-surface rounded-full text-sm text-muted mb-4">
                  {program.ages}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {program.title}
                </h3>
                <p className="text-muted leading-relaxed mb-6">
                  {program.description}
                </p>
                <Link
                  href={`/programs#${program.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  {t('learnMore')}
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

function QuickFactsSection() {
  const t = useTranslations('quickFacts');

  const questions = [
    { question: t('q1.question'), answer: t('q1.answer') },
    { question: t('q2.question'), answer: t('q2.answer') },
    { question: t('q3.question'), answer: t('q3.answer') },
    { question: t('q4.question'), answer: t('q4.answer') },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="space-y-8">
          {questions.map((item, index) => (
            <div key={index} className="bg-surface p-6 lg:p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-3">
                {item.question}
              </h3>
              <p className="text-muted leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      quote: t('testimonial1.quote'),
      author: t('testimonial1.author'),
      role: t('testimonial1.role'),
      image: '/images/testimonials/parent1.png',
    },
    {
      quote: t('testimonial2.quote'),
      author: t('testimonial2.author'),
      role: t('testimonial2.role'),
      image: '/images/testimonials/parent2.png',
    },
    {
      quote: t('testimonial3.quote'),
      author: t('testimonial3.author'),
      role: t('testimonial3.role'),
      image: '/images/testimonials/parent3.png',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <OptimizedImage
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const t = useTranslations('about.stats');

  const stats = [
    { value: '53', label: t('years') },
    { value: '18', label: t('nationalities') },
    { value: '1:8', label: t('ratio') },
    { value: '1,200+', label: t('graduates') },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-white/80 text-sm lg:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

          <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-white/80 mb-4">
              {t('subtitle')}
            </p>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all hover:shadow-lg"
              >
                {t('button')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-white/60 text-sm">
              {t('contact')}
            </p>
            <div className="flex items-center justify-center gap-6 mt-3">
              <a href="mailto:info@dutchschool.co.ke" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@dutchschool.co.ke
              </a>
              <a href="tel:+254123456789" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +254 123 456 789
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
