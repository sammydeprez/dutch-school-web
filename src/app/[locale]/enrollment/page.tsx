import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FileText, Calendar, ClipboardCheck, UserCheck, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/enrollment'),
    title: locale === 'nl' ? 'Inschrijving | Dutch School Nairobi' : 'Enrollment | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Schrijf uw kind in bij Dutch School Nairobi. Leer over het toelatingsproces, vereisten en schoolgeld.'
      : 'Enroll your child at Dutch School Nairobi. Learn about the admissions process, requirements, and tuition fees.',
  };
}

export default async function EnrollmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // FAQ data for both display and schema
  const faqs = [
    {
      question: locale === 'nl' ? 'Wanneer kan mijn kind beginnen?' : 'When can my child start?',
      answer: locale === 'nl'
        ? 'We accepteren het hele schooljaar door nieuwe leerlingen, afhankelijk van beschikbaarheid. De belangrijkste instroom is in augustus/september aan het begin van het schooljaar.'
        : 'We accept new students throughout the school year, subject to availability. The main intake is in August/September at the start of the academic year.',
    },
    {
      question: locale === 'nl' ? 'Moeten kinderen Nederlands spreken?' : 'Do children need to speak Dutch?',
      answer: locale === 'nl'
        ? 'Nee, voorkennis van de Nederlandse taal is voor kinderen op de dagschool niet vereist. Wel moeten leerlingen ouder dan 4 jaar een Nederlandstalige ouder hebben om in te stromen. Ons tweetalig programma is ontworpen om kinderen op alle taalniveaus te ondersteunen, en ze pikken snel Nederlands op door onderdompeling.'
        : 'No prior Dutch language knowledge is required for children in the day school. Students older than 4 do need a Dutch-speaking parent in order to join. Our bilingual program is designed to support children at all language levels, and they quickly pick up Dutch through immersion.',
    },
    {
      question: locale === 'nl' ? 'Wat zijn de schooltijden?' : 'What are the school hours?',
      answer: locale === 'nl'
        ? 'Op de dagschool zijn de schooltijden van maandag tot en met donderdag van 8:00 tot 15:00 en op vrijdag van 8.00 - 14.00. De peutergroep is van 8.00 - 12.00 maar opvang is aanwezig op school in de middagen tot 15.00 (ma - do) en tot 14.00 uur op vrijdag. De NTC lessen vinden plaats na schooltijd, de meeste lessen zijn van 15.30 - 18.00.'
        : 'Day school hours are Monday to Thursday from 8:00 to 15:00 and Friday from 8:00 to 14:00. The toddler group runs from 8:00 to 12:00 with afternoon care available until 15:00 (Mon-Thu) and 14:00 (Fri). NTC lessons take place after school hours, most lessons run from 15:30 to 18:00.',
    },
    {
      question: locale === 'nl' ? 'Is er schooltransport beschikbaar?' : 'Is school transport available?',
      answer: locale === 'nl'
        ? 'De school beschikt over twee schoolbussen, waardoor we twee busroutes aan kunnen bieden. Neem gerust contact op voor meer informatie en de kosten die hieraan verbonden zijn.'
        : 'The school operates two school buses, allowing us to offer two bus routes. Please get in touch for more information and the associated costs.',
    },
  ];

  // FAQ Schema for rich results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/enrollment" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <ProcessSection />
      <RequirementsSection />
      <FeesSection />
      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('enrollment');

  return (
    <section className="relative gradient-hero py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
          {t('subtitle')}
        </p>
        <p className="text-muted max-w-3xl mx-auto">
          {t('intro')}
        </p>
      </div>
    </section>
  );
}

function ProcessSection() {
  const t = useTranslations('enrollment.steps');

  const steps = [
    {
      icon: FileText,
      title: t('step1.title'),
      description: t('step1.description'),
      color: 'primary',
    },
    {
      icon: Calendar,
      title: t('step2.title'),
      description: t('step2.description'),
      color: 'secondary',
    },
    {
      icon: ClipboardCheck,
      title: t('step3.title'),
      description: t('step3.description'),
      color: 'accent',
    },
    {
      icon: UserCheck,
      title: t('step4.title'),
      description: t('step4.description'),
      color: 'primary',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-surface rounded-full flex items-center justify-center text-sm font-bold text-muted z-10">
                  {index + 1}
                </div>

                <div className={`w-16 h-16 mx-auto rounded-2xl ${colorClasses[step.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 relative z-10`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RequirementsSection() {
  const t = useTranslations('enrollment.requirements');
  const te = useTranslations('enrollment');

  const requirements = [
    t('item1'),
    t('item2'),
    t('item3'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {te('requirements.title')}
            </h2>
            <p className="text-muted mb-8">
              {te('requirements.subtitle')}
            </p>

            <ul className="space-y-4">
              {requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground pt-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-6">{te('downloads.title')}</h3>
            <div className="space-y-4">
              {[
                { label: te('downloads.toddler'), iconClass: 'bg-primary/10 text-primary' },
                { label: te('downloads.primary'), iconClass: 'bg-secondary/10 text-secondary' },
                { label: te('downloads.ntc'), iconClass: 'bg-accent/10 text-accent' },
                { label: te('downloads.adult'), iconClass: 'bg-primary/10 text-primary' },
              ].map((form, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-border rounded-xl">
                  <div className={`w-12 h-12 ${form.iconClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{form.label}</p>
                    <p className="text-sm text-muted">{te('downloads.comingSoon')}</p>
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

function FeesSection() {
  const t = useTranslations('enrollment.fees');
  const locale = useLocale();

  const fees = [
    {
      program: locale === 'nl' ? 'Peutergroep (1½-4)' : 'Toddler Group (1½-4)',
      href: '/practical/fees',
    },
    {
      program: locale === 'nl' ? 'Basisonderwijs dagschool (4-12)' : 'Primary School (4-12)',
      href: '/practical/fees',
    },
    {
      program: locale === 'nl' ? 'NTC lessen' : 'NTC Lessons',
      href: '/education/ntc/fees',
    },
    {
      program: locale === 'nl' ? 'Adult Dutch Lessons' : 'Adult Dutch Lessons',
      href: '/adult-classes/fees',
    },
  ];

  const linkLabel = locale === 'nl' ? 'Klik hier' : 'Click here';

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-surface rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">{locale === 'nl' ? 'Aanbod' : 'Program'}</th>
                  <th className="px-6 py-4 text-left font-semibold">{locale === 'nl' ? 'Schoolgeld' : 'Tuition'}</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 font-medium text-foreground">{item.program}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                      >
                        {linkLabel}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const t = useTranslations('enrollment');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('faq.title')}
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-foreground mb-2">{faq.question}</h3>
              <p className="text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted">
            {t('faq.moreQuestions')}{' '}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              {t('faq.contactLink')}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('enrollment');

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {t('readyToApply.title')}
        </h2>
        <p className="text-white/80 mb-8">
          {t('readyToApply.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-surface transition-colors"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-dark text-white font-semibold rounded-full hover:bg-foreground transition-colors"
          >
            {t('readyToApply.scheduleTour')}
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
          <a href="mailto:admissions@dutchschool.co.ke" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
            admissions@dutchschool.co.ke
          </a>
          <a href="tel:+254733675432" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
            +254 733 675 432
          </a>
        </div>
      </div>
    </section>
  );
}
