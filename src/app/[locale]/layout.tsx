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
            '@id': 'https://www.dutchschool.co.ke/#organization',
            name: 'Dutch School Nairobi',
            alternateName: ['Netherlands School Society', 'Nederlandse Schoolvereniging Nairobi'],
            description: 'Bilingual Dutch and English education for children ages 1½-18 in Nairobi, Kenya. Recognized by the Dutch Education Abroad Foundation (NOB).',
            slogan: locale === 'nl' ? 'Groots in Kleinschaligheid' : 'Greatness in Intimacy',
            url: 'https://www.dutchschool.co.ke',
            logo: 'https://www.dutchschool.co.ke/logo-color.png',
            image: 'https://www.dutchschool.co.ke/images/og-image.png',
            foundingDate: '1971',
            numberOfEmployees: {
              '@type': 'QuantitativeValue',
              value: 20,
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Windy Ridge, off Ngong Road',
              addressLocality: 'Nairobi',
              postalCode: '14997',
              addressCountry: 'KE',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '-1.2921',
              longitude: '36.8219',
            },
            areaServed: [
              {
                '@type': 'City',
                name: 'Nairobi',
              },
              {
                '@type': 'Country',
                name: 'Kenya',
              },
            ],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '+254-733-675-432',
                contactType: 'admissions',
                email: 'admissions@dutchschool.co.ke',
                availableLanguage: ['English', 'Dutch'],
              },
              {
                '@type': 'ContactPoint',
                telephone: '+254-733-675-432',
                contactType: 'customer service',
                email: 'info@dutchschool.co.ke',
                availableLanguage: ['English', 'Dutch'],
              },
            ],
            sameAs: [
              'https://www.facebook.com/dutchschoolnairobi',
              'https://www.linkedin.com/company/netherlands-school-society',
            ],
            parentOrganization: {
              '@type': 'Organization',
              name: 'Stichting Nederlands Onderwijs in het Buitenland',
              alternateName: 'Dutch Education Abroad Foundation (NOB)',
              url: 'https://www.stichtingnob.nl',
            },
            award: 'Recognized by Stichting NOB (Dutch Education Abroad Foundation)',
            knowsLanguage: ['nl', 'en'],
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
                    url: `https://www.dutchschool.co.ke/${locale}/education/toddler/`,
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'EducationalOccupationalProgram',
                    name: 'Primary School',
                    description: 'Bilingual education for ages 4-12 with IPC curriculum',
                    url: `https://www.dutchschool.co.ke/${locale}/education/primary/`,
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'EducationalOccupationalProgram',
                    name: 'NTC Lessons',
                    description: 'Dutch language and culture lessons for ages 3.5-18',
                    url: `https://www.dutchschool.co.ke/${locale}/education/ntc/`,
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'EducationalOccupationalProgram',
                    name: 'Dutch Adult Classes',
                    description: 'Dutch language courses for adult learners',
                    url: `https://www.dutchschool.co.ke/${locale}/adult-classes/`,
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
