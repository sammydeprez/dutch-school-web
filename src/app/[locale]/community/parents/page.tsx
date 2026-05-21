import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { MessageSquare, HandHeart, Coffee, Check } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/community/parents'),
    title: locale === 'nl' ? 'Voor Ouders | Dutch School Nairobi' : 'For Parents | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Partners in het onderwijs van uw kind. Ouderbetrokkenheid en communicatie.'
      : 'Partners in your child\'s education. Parent involvement and communication.',
  };
}

export default async function ParentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/community/parents" />
      <HeroSection />
      <IntroSection />
      <CommunicationSection />
      <InvolvementSection />
      <ParentCommitteeSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('parentsPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('parentsPage.intro');

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

function CommunicationSection() {
  const t = useTranslations('parentsPage.communication');

  const items = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
    t('items.3'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 justify-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            {t('title')}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-xl flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InvolvementSection() {
  const t = useTranslations('parentsPage.involvement');

  const items = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
    t('items.3'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 justify-center mb-4">
          <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
            <HandHeart className="w-7 h-7 text-secondary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            {t('title')}
          </h2>
        </div>
        <p className="text-muted text-center mb-8">
          {t('content')}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div key={index} className="bg-surface p-5 rounded-xl flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
              <span className="text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParentCommitteeSection() {
  const t = useTranslations('parentsPage.parentCommittee');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 lg:p-12 rounded-3xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
            <Coffee className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
            {t('title')}
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>{t('content')}</p>
            <p>{t('paragraph2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('parentsPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
