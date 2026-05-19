'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

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
      telephone: '+254-733-675-432',
      email: 'info@dutchschool.co.ke',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Windy Ridge, off Ngong Road',
        addressLocality: 'Nairobi',
        postalCode: '14997',
        addressCountry: 'KE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '-1.323051',
        longitude: '36.702182',
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-surface p-8 lg:p-10 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t('form.title')}</h2>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t('form.successTitle')}
                </h3>
                <p className="text-muted mb-6">
                  {t('form.successMessage')}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                >
                  {t('form.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 bg-red/10 border border-red/20 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red">{t('form.errorTitle')}</p>
                      <p className="text-sm text-red/80">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t('form.name')} <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
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
                    value={formData.phone}
                    onChange={handleChange}
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
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                  >
                    <option value="">{t('form.selectSubject')}</option>
                    <option value="enrollment">{t('form.subjects.enrollment')}</option>
                    <option value="tour">{t('form.subjects.tour')}</option>
                    <option value="programs">{t('form.subjects.programs')}</option>
                    <option value="fees">{t('form.subjects.fees')}</option>
                    <option value="other">{t('form.subjects.other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t('form.message')} <span className="text-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    minLength={10}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </form>
            )}
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
                    Windy Ridge, off Ngong Road<br />
                    P.O. Box 14997 – 00800<br />
                    Nairobi, Karen, Kenya
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
                    <a href="tel:+254733675432" className="hover:text-primary transition-colors">
                      +254 733 675 432
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

        <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=-1.323051,36.702182&z=16&output=embed"
            title="Dutch School Nairobi location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
          <a
            href="https://www.google.com/maps/place/The+Netherlands+School+Society/@-1.323051,36.702182,17z"
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
