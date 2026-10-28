import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Laptop, Check } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const bold = (chunks: ReactNode) => <strong className="text-foreground">{chunks}</strong>;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/education/ntc/online'),
    title: locale === 'nl' ? 'Online NTC-lessen | Dutch School Nairobi' : 'Online NTC Classes | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Online Nederlandse Taal- en Cultuurlessen in kleine groepjes voor Nederlandse en Vlaamse kinderen, waar je ook woont in Afrika.'
      : 'Online Dutch Language and Culture lessons in small groups for Dutch and Flemish children, wherever you live in Africa.',
  };
}

export default async function NTCOnlinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const programSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: locale === 'nl' ? 'Online NTC-lessen' : 'Online NTC Classes',
    description: locale === 'nl'
      ? 'Wekelijkse online Nederlandse Taal- en Cultuurlessen in groepjes van 2 tot 5 leerlingen voor kinderen die in Afrika buiten Nairobi wonen.'
      : 'Weekly online Dutch Language and Culture lessons in groups of 2 to 5 pupils for children living in Africa outside Nairobi.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Dutch School Nairobi',
      url: 'https://www.dutchschool.ke',
    },
    educationalProgramMode: 'online',
    occupationalCategory: 'Language Education',
    inLanguage: 'nl',
  };

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/education/ntc/online" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema) }}
      />
      <HeroSection />
      <IntroSection />
      <PersonalSection />
      <HowItWorksSection />
      <TogetherSection />
      <ForWhomSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('ntcOnlinePage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('ntcOnlinePage.intro');

  const count = (t.raw('paragraphs') as string[]).length;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex w-16 h-16 mx-auto rounded-2xl bg-primary/10 items-center justify-center mb-6">
          <Laptop className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {Array.from({ length: count }, (_, index) => (
            <p key={index} className="text-lg text-muted leading-relaxed">
              {t.rich(`paragraphs.${index}`, { b: bold })}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function TextSection({ namespace, background }: { namespace: string; background: 'bg-white' | 'bg-surface' }) {
  const t = useTranslations(namespace);

  const count = (t.raw('paragraphs') as string[]).length;

  return (
    <section className={`py-20 lg:py-28 ${background}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {Array.from({ length: count }, (_, index) => (
            <p key={index} className="text-lg text-muted leading-relaxed">
              {t.rich(`paragraphs.${index}`, { b: bold })}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonalSection() {
  return <TextSection namespace="ntcOnlinePage.personal" background="bg-surface" />;
}

function HowItWorksSection() {
  const t = useTranslations('ntcOnlinePage.howItWorks');

  const count = (t.raw('items') as string[]).length;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('title')}
        </h2>
        <div className="bg-surface p-8 rounded-2xl">
          <ul className="space-y-4">
            {Array.from({ length: count }, (_, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-muted">{t.rich(`items.${index}`, { b: bold })}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-lg text-muted leading-relaxed mt-8 text-center">
          {t('materials')}
        </p>
      </div>
    </section>
  );
}

function TogetherSection() {
  return <TextSection namespace="ntcOnlinePage.together" background="bg-surface" />;
}

function ForWhomSection() {
  return <TextSection namespace="ntcOnlinePage.forWhom" background="bg-white" />;
}

function CTASection() {
  const t = useTranslations('ntcOnlinePage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[
        { label: t('button'), href: '/contact' },
        { label: t('feesButton'), href: '/education/ntc/fees', variant: 'secondary' },
      ]}
    />
  );
}
