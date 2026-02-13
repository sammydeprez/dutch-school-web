import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('navigation');

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo-icon.png"
                alt="Dutch School Nairobi"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="text-xl font-bold">Dutch School</span>
                <span className="block text-sm text-white/70 -mt-1">NAIROBI</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  {nav('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  {nav('about')}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-white/70 hover:text-white transition-colors">
                  {nav('programs')}
                </Link>
              </li>
              <li>
                <Link href="/enrollment" className="text-white/70 hover:text-white transition-colors">
                  {nav('enrollment')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  {nav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('programs')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/programs#toddler" className="text-white/70 hover:text-white transition-colors">
                  Toddler Group
                </Link>
              </li>
              <li>
                <Link href="/programs#primary" className="text-white/70 hover:text-white transition-colors">
                  Primary School
                </Link>
              </li>
              <li>
                <Link href="/programs#ntc" className="text-white/70 hover:text-white transition-colors">
                  NTC Lessons
                </Link>
              </li>
              <li>
                <Link href="/programs#adult" className="text-white/70 hover:text-white transition-colors">
                  Adult Dutch Lessons
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/70">{t('address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+254123456789" className="text-white/70 hover:text-white transition-colors">
                  +254 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@dutchschool.co.ke" className="text-white/70 hover:text-white transition-colors">
                  info@dutchschool.co.ke
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
