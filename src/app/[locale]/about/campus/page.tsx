import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Trees, Sun, Shield, Leaf, School, Flower2, BookOpen, Palette } from 'lucide-react';
import { PageHero, PageCTA, OptimizedImage } from '@/components/ui';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Locatie & Campus | Dutch School Nairobi' : 'Location & Campus | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Een groene oase in het hart van Karen, Nairobi. Bekijk onze faciliteiten en locatie.'
      : 'A green oasis in the heart of Karen, Nairobi. View our facilities and location.',
  };
}

export default async function CampusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <LocationSection />
      <FacilitiesSection />
      <DirectionsSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('campusPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function LocationSection() {
  const t = useTranslations('campusPage.location');

  const features = [
    { icon: Trees, text: t('features.green') },
    { icon: Sun, text: t('features.outdoor') },
    { icon: Shield, text: t('features.safe') },
    { icon: Leaf, text: t('features.nature') },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('title')}
            </h2>
            <div className="space-y-4 text-muted leading-relaxed mb-8">
              <p className="text-lg">{t('content')}</p>
              <p>{t('paragraph2')}</p>
              <p>{t('paragraph3')}</p>
              <p>{t('paragraph4')}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-surface p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-[4/3] rounded-3xl overflow-hidden">
            <OptimizedImage
              src="/images/campus.png"
              alt="Dutch School Nairobi campus"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilitiesSection() {
  const t = useTranslations('campusPage.facilities');

  const facilities = [
    {
      icon: School,
      title: t('classrooms.title'),
      description: t('classrooms.description'),
      color: 'primary',
    },
    {
      icon: Flower2,
      title: t('outdoor.title'),
      description: t('outdoor.description'),
      color: 'secondary',
    },
    {
      icon: BookOpen,
      title: t('library.title'),
      description: t('library.description'),
      color: 'accent',
    },
    {
      icon: Palette,
      title: t('arts.title'),
      description: t('arts.description'),
      color: 'primary',
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
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl">
              <div className={`w-14 h-14 rounded-xl ${colorClasses[facility.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <facility.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {facility.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DirectionsSection() {
  const t = useTranslations('campusPage.directions');

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

function CTASection() {
  const t = useTranslations('campusPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
