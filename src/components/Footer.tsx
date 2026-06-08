import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('navigation');

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Image
                src="/logo-white.png"
                alt="Dutch School Nairobi"
                width={160}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/NetherlandsSchool/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/the.dutch.school/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* School */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('school')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.about')}
                </Link>
              </li>
              <li>
                <Link href="/about/vision" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.vision')}
                </Link>
              </li>
              <li>
                <Link href="/about/team" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.team')}
                </Link>
              </li>
              <li>
                <Link href="/about/campus" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.campus')}
                </Link>
              </li>
              <li>
                <Link href="/enrollment" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.enrollment')}
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.community')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('education')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/education" className="text-white/70 hover:text-white transition-colors">
                  {nav('educationOverview')}
                </Link>
              </li>
              <li>
                <Link href="/education/toddler" className="text-white/70 hover:text-white transition-colors">
                  {t('educationList.toddler')}
                </Link>
              </li>
              <li>
                <Link href="/education/primary" className="text-white/70 hover:text-white transition-colors">
                  {t('educationList.primary')}
                </Link>
              </li>
              <li>
                <Link href="/education/ntc" className="text-white/70 hover:text-white transition-colors">
                  {t('educationList.ntc')}
                </Link>
              </li>
              <li>
                <Link href="/education/curriculum" className="text-white/70 hover:text-white transition-colors">
                  {t('educationList.curriculum')}
                </Link>
              </li>
              <li>
                <Link href="/education/library" className="text-white/70 hover:text-white transition-colors">
                  {t('educationList.library')}
                </Link>
              </li>
              <li>
                <Link href="/education/language-club" className="text-white/70 hover:text-white transition-colors">
                  {t('educationList.languageClub')}
                </Link>
              </li>
              <li>
                <Link href="/education/skills-club" className="text-white/70 hover:text-white transition-colors">
                  {t('educationList.skillsClub')}
                </Link>
              </li>
              <li>
                <Link href="/student-support" className="text-white/70 hover:text-white transition-colors">
                  {t('educationList.studentSupport')}
                </Link>
              </li>
              <li>
                <Link href="/adult-classes" className="text-white/70 hover:text-white transition-colors">
                  {t('educationList.adultDutch')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Practical & Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('quickLinksList.practical')}</h3>
            <ul className="space-y-3 mb-8">
              <li>
                <Link href="/practical/schedule" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.schedule')}
                </Link>
              </li>
              <li>
                <Link href="/practical/fees" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.fees')}
                </Link>
              </li>
              <li>
                <Link href="/practical/transport" className="text-white/70 hover:text-white transition-colors">
                  {t('quickLinksList.transport')}
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-6">{t('contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-white/70">{t('address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="tel:+254733675432" className="text-white/70 hover:text-white transition-colors">
                  +254 733 675 432
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="mailto:info@dutchschool.ke" className="text-white/70 hover:text-white transition-colors">
                  info@dutchschool.ke
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-white/70">{t('hours')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              {t('copyright')}
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                {t('privacy')}
              </a>
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                {t('terms')}
              </a>
              <Link href="/internal/change-request" className="text-white/30 hover:text-white/50 text-sm transition-colors">
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
