export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: locale === 'nl' ? 'Contact | Dutch School Nairobi' : 'Contact Us | Dutch School Nairobi',
    description: locale === 'nl'
      ? 'Neem contact op met Dutch School Nairobi. Bezoek ons op Makindi Road, Nairobi of bel ons voor informatie over inschrijving en programma\'s.'
      : 'Get in touch with Dutch School Nairobi. Visit us at Makindi Road, Nairobi or call us for information about enrollment and programs.',
    openGraph: {
      title: locale === 'nl' ? 'Contact | Dutch School Nairobi' : 'Contact Us | Dutch School Nairobi',
      description: locale === 'nl'
        ? 'Neem contact op met Dutch School Nairobi voor informatie over tweetalig onderwijs.'
        : 'Contact Dutch School Nairobi for information about bilingual education.',
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
