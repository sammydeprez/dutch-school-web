import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { BookOpen } from 'lucide-react';
import { PageHero, PageCTA, OptimizedImage } from '@/components/ui';
import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/education/library'),
    title: locale === 'nl' ? 'Bibliotheek | Dutch School Nairobi' : 'Library | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Onze schoolbibliotheek met een uitgebreide collectie Nederlandse en Engelse jeugdboeken.'
      : "Our school library with an extensive collection of Dutch and English children's books.",
  };
}

export default async function LibraryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbSchema locale={locale} path="/education/library" />
      <HeroSection />
      <IntroSection />
      <GallerySection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('libraryPage.hero');

  return <PageHero title={t('title')} subtitle={t('subtitle')} />;
}

function IntroSection() {
  const t = useTranslations('libraryPage.intro');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex w-16 h-16 mx-auto rounded-2xl bg-primary/10 items-center justify-center mb-6">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          {t('title')}
        </h2>
        <div className="space-y-5 text-muted leading-relaxed">
          <p className="text-lg">{t('content')}</p>
          <p>{t('paragraph2')}</p>
          <p>{t('paragraph3')}</p>
          <p>{t('paragraph4')}</p>
          <p className="font-medium text-foreground">{t('paragraph5')}</p>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const t = useTranslations('libraryPage.images');

  return (
    <section className="pb-20 lg:pb-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden">
            <OptimizedImage
              src="/images/library-1.png"
              alt={t('image1Alt')}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden">
            <OptimizedImage
              src="/images/library-2.png"
              alt={t('image2Alt')}
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

function CTASection() {
  const t = useTranslations('libraryPage.cta');

  return (
    <PageCTA
      title={t('title')}
      subtitle={t('subtitle')}
      buttons={[{ label: t('button'), href: '/contact' }]}
    />
  );
}
