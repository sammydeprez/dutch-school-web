import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Clock, Coffee } from 'lucide-react';
import { PageHero, PageCTA } from '@/components/ui';
import YearCalendar from '@/components/YearCalendar';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Schooltijden | Dutch School Nairobi' : 'School Hours | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Informatie over lestijden, pauzes en vakanties bij Dutch School Nairobi.'
      : 'Information about lesson times, breaks, and holidays at Dutch School Nairobi.',
  };
}

export default async function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <DailyScheduleSection />
      <BreaksSection />
      <CalendarSection />
      <AfterSchoolSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('schedulePage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function DailyScheduleSection() {
  const t = useTranslations('schedulePage.daily');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary/5 p-8 rounded-2xl border-2 border-primary">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t('toddler.title')}
              </h3>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">
              {t('toddler.hours')}
            </p>
            <p className="text-muted text-sm">
              {t('toddler.note')}
            </p>
          </div>

          <div className="bg-secondary/5 p-8 rounded-2xl border-2 border-secondary">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t('primary.title')}
              </h3>
            </div>
            <p className="text-2xl font-bold text-secondary mb-2">
              {t('primary.hours')}
            </p>
            <p className="text-muted text-sm">
              {t('primary.note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BreaksSection() {
  const t = useTranslations('schedulePage.breaks');

  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('title')}
        </h2>

        <div className="bg-white p-8 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <Coffee className="w-6 h-6 text-primary" />
            <span className="text-foreground">{t('morning')}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <Coffee className="w-6 h-6 text-secondary" />
            <span className="text-foreground">{t('lunch')}</span>
          </div>
          <p className="text-muted text-sm">{t('note')}</p>
        </div>
      </div>
    </section>
  );
}

function CalendarSection() {
  const t = useTranslations('schedulePage.calendar');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
          {t('title')}
        </h2>
        <p className="text-muted leading-relaxed text-center mb-10 max-w-2xl mx-auto">
          {t('content')}
        </p>
        <YearCalendar />
      </div>
    </section>
  );
}

function AfterSchoolSection() {
  const t = useTranslations('schedulePage.afterSchool');

  return (
    <section className="py-20 lg:py-28 bg-surface">
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

function CTASection() {
  const t = useTranslations('schedulePage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
