import { getAlternates } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    alternates: getAlternates(locale, '/contact'),
    title: locale === 'nl' ? 'Contact | Dutch School Nairobi' : 'Contact Us | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Neem contact op met Dutch School Nairobi. Bezoek ons op Windy Ridge, Nairobi of bel ons voor informatie over inschrijving en programma\'s.'
      : 'Get in touch with Dutch School Nairobi. Visit us at Windy Ridge, Nairobi or call us for information about enrollment and programs.',
    openGraph: {
      title: locale === 'nl' ? 'Contact | Dutch School Nairobi' : 'Contact Us | Dutch School Nairobi',
      description: locale === 'nl'
        ? 'Neem contact op met Dutch School Nairobi voor informatie over tweetalig onderwijs.'
        : 'Contact Dutch School Nairobi for information about bilingual education.',
    },
  };
}

export default async function ContactLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbSchema locale={locale} path="/contact" />
      {children}
    </>
  );
}
