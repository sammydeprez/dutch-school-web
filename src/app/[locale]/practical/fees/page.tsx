import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Check, Plus, CreditCard, Users } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Schoolgeld | Dutch School Nairobi' : 'School Fees | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Transparante tariefstructuur met twee tariefgroepen. Informatie over schoolgeld en betalingsregelingen.'
      : 'Transparent fee structure with two tariff groups. Information about tuition and payment arrangements.',
  };
}

export default async function FeesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <TariffsSection />
      <IncludedSection />
      <AdditionalSection />
      <PaymentSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('feesPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('feesPage.intro');

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

function TariffsSection() {
  const t = useTranslations('feesPage.tariffs');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl border-2 border-primary">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4">
              {t('tariffA.note')}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('tariffA.title')}
            </h3>
            <p className="text-muted leading-relaxed">
              {t('tariffA.description')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border-2 border-secondary">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full text-sm text-secondary font-medium mb-4">
              {t('tariffB.note')}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('tariffB.title')}
            </h3>
            <p className="text-muted leading-relaxed">
              {t('tariffB.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function IncludedSection() {
  const t = useTranslations('feesPage.included');

  const items = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('title')}
        </h2>

        <div className="bg-primary/5 p-8 rounded-2xl border-2 border-primary">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
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

function AdditionalSection() {
  const t = useTranslations('feesPage.additional');

  const items = [
    t('items.0'),
    t('items.1'),
    t('items.2'),
    t('items.3'),
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
              <li key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-muted/20 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 text-muted" />
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

function PaymentSection() {
  const t = useTranslations('feesPage');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-surface p-8 rounded-2xl text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <CreditCard className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              {t('payment.title')}
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              {t('payment.content')}
            </p>
          </div>

          <div className="bg-surface p-8 rounded-2xl text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              {t('siblings.title')}
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              {t('siblings.content')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('feesPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
