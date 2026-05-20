type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbSchemaProps = {
  locale: string;
  path: string; // e.g., '/education/toddler'
};

// Mapping of path segments to display names
const pathNames: Record<string, Record<string, string>> = {
  nl: {
    about: 'Over Ons',
    vision: 'Visie & Missie',
    team: 'Ons Team',
    campus: 'Campus',
    education: 'Onderwijs',
    toddler: 'Peuterspeelzaal',
    primary: 'Basisschool',
    ntc: 'NTC',
    curriculum: 'Curriculum',
    'language-club': 'Talenclub',
    'skills-club': 'Vaardigheden Club',
    enrollment: 'Inschrijving',
    practical: 'Praktisch',
    fees: 'Schoolgeld',
    schedule: 'Jaarkalender',
    transport: 'Vervoer',
    food: 'Eten en drinken',
    'student-support': 'Leerlingbegeleiding',
    community: 'Community',
    parents: 'Ouders',
    events: 'Evenementen',
    contact: 'Contact',
    programs: 'Programma\'s',
  },
  en: {
    about: 'About Us',
    vision: 'Vision & Mission',
    team: 'Our Team',
    campus: 'Campus',
    education: 'Education',
    toddler: 'Toddler Group',
    primary: 'Primary School',
    ntc: 'NTC',
    curriculum: 'Curriculum',
    'language-club': 'Language Club',
    'skills-club': 'Skills Club',
    enrollment: 'Enrollment',
    practical: 'Practical',
    fees: 'School Fees',
    schedule: 'Year Calendar',
    transport: 'Transport',
    food: 'Food & Drink',
    'student-support': 'Student Support',
    community: 'Community',
    parents: 'Parents',
    events: 'Events',
    contact: 'Contact',
    programs: 'Programs',
  },
};

export default function BreadcrumbSchema({ locale, path }: BreadcrumbSchemaProps) {
  const baseUrl = 'https://www.dutchschool.co.ke';
  const homeName = locale === 'nl' ? 'Home' : 'Home';

  // Build breadcrumb items
  const items: BreadcrumbItem[] = [
    { name: homeName, url: `${baseUrl}/${locale}/` },
  ];

  // Split path and build breadcrumb trail
  const segments = path.split('/').filter(Boolean);
  let currentPath = `/${locale}`;

  for (const segment of segments) {
    currentPath += `/${segment}`;
    const name = pathNames[locale]?.[segment] || pathNames.en[segment] || segment;
    items.push({
      name,
      url: `${baseUrl}${currentPath}/`,
    });
  }

  // Don't render breadcrumbs for homepage
  if (items.length <= 1) {
    return null;
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
