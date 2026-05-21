export const SITE_URL = 'https://www.dutchschool.co.ke';

type Locale = 'nl' | 'en';

const LOCALES: Locale[] = ['nl', 'en'];

function normalizePath(path: string): string {
  if (!path || path === '/') return '';
  const trimmed = path.startsWith('/') ? path : `/${path}`;
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

export function getAlternates(locale: string, path: string = '') {
  const normalized = normalizePath(path);
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}/${l}${normalized}`;
  }
  languages['x-default'] = `${SITE_URL}/nl${normalized}`;

  return {
    canonical: `${SITE_URL}/${locale}${normalized}`,
    languages,
  };
}
