'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { OptimizedImage } from '@/components/ui';

export default function ContactPage() {
  return (
    <>
      <ContactPageSchema />
      <HeroSection />
      <ContactSection />
      <MapSection />
    </>
  );
}

function ContactPageSchema() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Dutch School Nairobi',
      telephone: '+254-123-456-789',
      email: 'info@dutchschool.co.ke',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Makindi Road',
        addressLocality: 'Nairobi',
        postalCode: '14997',
        addressCountry: 'KE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '-1.2921',
        longitude: '36.8219',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
    />
  );
}

function HeroSection() {
  const t = useTranslations('contact');

  return (
    <section className="relative gradient-hero py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}

function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-surface p-8 lg:p-10 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // Form would typically be handled by a form service (Formspree, Netlify Forms, etc.)
                // For now, open email client as fallback
                const form = e.currentTarget;
                const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
                const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
                const subject = (form.elements.namedItem('subject') as HTMLSelectElement)?.value;
                const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value;

                window.location.href = `mailto:info@dutchschool.co.ke?subject=${encodeURIComponent(subject || 'Contact Form')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
              }}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t('form.name')} <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('form.email')} <span className="text-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  {t('form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="[+]?[0-9\s\-]+"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="+254 700 000 000"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  {t('form.subject')} <span className="text-red">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                >
                  <option value="">Select a subject</option>
                  <option value="enrollment">Enrollment Inquiry</option>
                  <option value="tour">Schedule a Tour</option>
                  <option value="programs">Program Information</option>
                  <option value="fees">Fees & Payment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t('form.message')} <span className="text-red">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
              >
                {t('form.submit')}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">{t('info.title')}</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('info.address')}</h3>
                  <p className="text-muted">
                    Makindi Road<br />
                    P.O. Box 14997<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('info.phone')}</h3>
                  <p className="text-muted">
                    <a href="tel:+254123456789" className="hover:text-primary transition-colors">
                      +254 123 456 789
                    </a>
                    <br />
                    <a href="tel:+254987654321" className="hover:text-primary transition-colors">
                      +254 987 654 321
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('info.email')}</h3>
                  <p className="text-muted">
                    <a href="mailto:info@dutchschool.co.ke" className="hover:text-primary transition-colors">
                      info@dutchschool.co.ke
                    </a>
                    <br />
                    <a href="mailto:admissions@dutchschool.co.ke" className="hover:text-primary transition-colors">
                      admissions@dutchschool.co.ke
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('info.hours')}</h3>
                  <p className="text-muted">
                    {t('info.hoursValue')}<br />
                    <span className="text-sm">School: 8:00 AM - 3:30 PM</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-12 p-6 bg-surface rounded-2xl">
              <h3 className="font-semibold text-foreground mb-4">Quick Contact</h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://wa.me/254123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="mailto:info@dutchschool.co.ke"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  const t = useTranslations('contact');

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{t('map')}</h2>

        {/* Map Image */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden">
          <OptimizedImage
            src="/images/map-static.png"
            alt="Dutch School Nairobi location map"
            width={1075}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <a
            href="https://maps.google.com/?q=Makindi+Road+Nairobi+Kenya"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <MapPin className="w-5 h-5" />
            Open in Google Maps
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
