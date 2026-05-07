import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Users } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl'
      ? 'Dutch Adult Classes | Dutch School Nairobi'
      : 'Dutch Adult Classes | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Nederlandse taalcursussen voor volwassenen op alle niveaus.'
      : 'Dutch language courses for adults at all proficiency levels.',
  };
}

export default async function AdultClassesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('adultClassesPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('adultClassesPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex w-16 h-16 mx-auto rounded-2xl bg-primary/10 items-center justify-center mb-6">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          {t('title')}
        </h2>
        <p className="text-lg text-muted leading-relaxed mb-6">
          {t('content')}
        </p>
        <p className="text-muted leading-relaxed italic">
          {t('comingSoon')}
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('adultClassesPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
