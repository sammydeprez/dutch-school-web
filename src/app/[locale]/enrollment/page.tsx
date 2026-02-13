import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FileText, Calendar, ClipboardCheck, UserCheck, GraduationCap, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Inschrijving | Dutch School Nairobi' : 'Enrollment | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Schrijf uw kind in bij Dutch School Nairobi. Leer over het toelatingsproces, vereisten en schoolgeld.'
      : 'Enroll your child at Dutch School Nairobi. Learn about the admissions process, requirements, and tuition fees.',
  };
}

export default async function EnrollmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProcessSection />
      <RequirementsSection />
      <FeesSection />
      <FAQSection />
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
    {
      icon: GraduationCap,
      title: t('step5.title'),
      description: t('step5.description'),
      color: 'secondary',
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
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

  const requirements = [
    t('item1'),
    t('item2'),
    t('item3'),
    t('item4'),
    t('item5'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('title')}
            </h2>
            <p className="text-muted mb-8">
              Please prepare the following documents for your child's enrollment application.
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
            <h3 className="text-xl font-bold text-foreground mb-6">Download Forms</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Application Form</p>
                  <p className="text-sm text-muted">PDF, 245 KB</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted ml-auto group-hover:text-primary transition-colors" />
              </a>
              <a href="#" className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Medical Form</p>
                  <p className="text-sm text-muted">PDF, 180 KB</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted ml-auto group-hover:text-secondary transition-colors" />
              </a>
              <a href="#" className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">School Information Pack</p>
                  <p className="text-sm text-muted">PDF, 1.2 MB</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted ml-auto group-hover:text-accent transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeesSection() {
  const t = useTranslations('enrollment.fees');

  const fees = [
    { program: 'Toddler Group (1½-4)', fee: 'Contact for fees', note: 'Per term' },
    { program: 'Primary School (4-12)', fee: 'Contact for fees', note: 'Per term' },
    { program: 'NTC Lessons', fee: 'Contact for fees', note: 'Per semester' },
    { program: 'Adult Dutch Lessons', fee: 'Contact for fees', note: 'Per course' },
  ];

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
                  <th className="px-6 py-4 text-left font-semibold">Program</th>
                  <th className="px-6 py-4 text-left font-semibold">Tuition</th>
                  <th className="px-6 py-4 text-left font-semibold hidden sm:table-cell">Billing</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 font-medium text-foreground">{item.program}</td>
                    <td className="px-6 py-4 text-muted">{item.fee}</td>
                    <td className="px-6 py-4 text-muted hidden sm:table-cell">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-primary/5 rounded-2xl">
            <p className="text-sm text-muted">
              <strong className="text-foreground">Note:</strong> Fees include all learning materials, lunch program, and most extracurricular activities. A registration fee applies for new students. Sibling discounts and payment plans are available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: 'When can my child start?',
      answer: 'We accept new students throughout the school year, subject to availability. The main intake is in August/September at the start of the academic year.',
    },
    {
      question: 'Do children need to speak Dutch?',
      answer: 'No prior Dutch language knowledge is required. Our bilingual program is designed to support children at all language levels, and they quickly pick up Dutch through immersion.',
    },
    {
      question: 'What is the school schedule?',
      answer: 'School hours are Monday to Friday, 8:00 AM to 3:30 PM. Extended care is available until 5:00 PM for an additional fee.',
    },
    {
      question: 'Is transportation available?',
      answer: 'We partner with approved transport providers who offer school bus services covering major areas of Nairobi. Details are provided upon enrollment.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
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
            Have more questions?{' '}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Contact our admissions team
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
          Ready to Apply?
        </h2>
        <p className="text-white/80 mb-8">
          Start your application today or contact us for more information.
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
            Schedule a Tour
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
          <a href="mailto:admissions@dutchschool.co.ke" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
            admissions@dutchschool.co.ke
          </a>
          <a href="tel:+254123456789" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
            +254 123 456 789
          </a>
        </div>
      </div>
    </section>
  );
}
