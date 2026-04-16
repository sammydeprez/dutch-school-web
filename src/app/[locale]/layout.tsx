import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles = {
    en: 'Dutch School Nairobi | Bilingual Dutch-English Education in Kenya',
    nl: 'Dutch School Nairobi | Tweetalig Nederlands-Engels Onderwijs in Kenia',
  };

  const descriptions = {
    en: 'Dutch School Nairobi offers bilingual Dutch and English education for children ages 1½-18 in Kenya. Recognized by the Dutch Education Abroad Foundation. IPC curriculum, small class sizes, 15+ nationalities.',
    nl: 'Dutch School Nairobi biedt tweetalig Nederlands en Engels onderwijs voor kinderen van 1½-18 jaar in Kenia. Erkend door de Stichting NOB. IPC-curriculum, kleine klassen, 15+ nationaliteiten.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      'Dutch School Nairobi',
      'Netherlands School Society',
      'bilingual education Kenya',
      'Dutch education abroad',
      'international school Nairobi',
      'IPC curriculum',
      'NTC lessons',
      'Dutch language Kenya',
      'expat school Nairobi',
    ],
    authors: [{ name: 'Dutch School Nairobi' }],
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: 'https://www.dutchschool.co.ke',
      siteName: 'Dutch School Nairobi',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      alternateLocale: locale === 'nl' ? 'en_US' : 'nl_NL',
      type: 'website',
      images: [
        {
          url: 'https://www.dutchschool.co.ke/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Dutch School Nairobi - Bilingual Education in Kenya',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ['https://www.dutchschool.co.ke/images/og-image.png'],
    },
    alternates: {
      canonical: `https://www.dutchschool.co.ke/${locale}`,
      languages: {
        en: 'https://www.dutchschool.co.ke/en',
        nl: 'https://www.dutchschool.co.ke/nl',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'nl' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Schema.org structured data for SEO and AI search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            '@id': 'https://www.dutchschool.co.ke',
            name: 'Dutch School Nairobi',
            alternateName: ['Netherlands School Society', 'Nederlandse Schoolvereniging Nairobi'],
            description: 'Bilingual Dutch and English education for children ages 1½-18 in Nairobi, Kenya. Recognized by the Dutch Education Abroad Foundation.',
            url: 'https://www.dutchschool.co.ke',
            logo: 'https://www.dutchschool.co.ke/logo-color.png',
            foundingDate: '1971',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Makindi Road',
              addressLocality: 'Nairobi',
              addressCountry: 'KE',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+254-733-675-432',
              contactType: 'admissions',
              availableLanguage: ['English', 'Dutch'],
            },
            sameAs: [
              'https://www.facebook.com/dutchschoolnairobi',
              'https://www.linkedin.com/company/netherlands-school-society',
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Educational Programs',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'EducationalOccupationalProgram',
                    name: 'Toddler Group',
                    description: 'Early childhood education for ages 1½-4',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'EducationalOccupationalProgram',
                    name: 'Primary School',
                    description: 'Bilingual education for ages 4-12 with IPC curriculum',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'EducationalOccupationalProgram',
                    name: 'NTC Lessons',
                    description: 'Dutch language and culture lessons for ages 3.5-18',
                  },
                },
              ],
            },
          }),
        }}
      />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
