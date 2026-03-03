import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="bg-church-cream min-h-screen">
      {/* Header */}
      <section className="py-24 bg-church-cream border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white"
          >
            {t('contact.title')}
          </motion.h1>
          <p className="text-xl text-white/60 leading-relaxed">
            {t('contact.desc')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-serif font-bold text-white">{t('contact.infoTitle')}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{t('contact.location')}</h4>
                      <p className="text-white/60">{t('visit.addressFull')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{t('contact.phone')}</h4>
                      <p className="text-white/60">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{t('contact.email')}</h4>
                      <p className="text-white/60">hello@gracecommunity.church</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{t('contact.hours')}</h4>
                      <p className="text-white/60">{t('contact.hoursDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-white">{t('contact.followUs')}</h2>
                <div className="flex gap-4">
                  {[
                    { icon: <Facebook />, label: 'Facebook' },
                    { icon: <Instagram />, label: 'Instagram' },
                    { icon: <Youtube />, label: 'Youtube' },
                  ].map((social, idx) => (
                    <button
                      key={idx}
                      className="w-14 h-14 bg-church-olive border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-church-gold transition-all shadow-sm"
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-church-olive p-10 rounded-3xl shadow-xl border border-white/5">
              <h2 className="text-3xl font-serif font-bold mb-8 text-white">{t('contact.formTitle')}</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{t('contact.firstName')}</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 text-white"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{t('contact.lastName')}</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 text-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{t('contact.email')}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{t('contact.subject')}</label>
                  <select className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 text-white appearance-none">
                    <option>{t('contact.subjects.general')}</option>
                    <option>{t('contact.subjects.prayer')}</option>
                    <option>{t('contact.subjects.volunteer')}</option>
                    <option>{t('contact.subjects.other')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{t('contact.message')}</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 resize-none text-white"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div className="flex justify-center sm:justify-start">
                  <button className="w-full sm:w-auto btn-primary py-4 px-12 text-lg flex items-center justify-center gap-2">
                    {t('contact.send')} <Send size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] bg-church-cream relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-church-cream/60 z-10 pointer-events-none"></div>
        <img
          src="https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527886/EEEJC/eeejs/cdkxhpla5z7km243ykz0.jpg"
          alt="Map Placeholder"
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-church-olive p-8 rounded-3xl shadow-2xl text-center max-w-sm border border-white/10">
            <MapPin size={48} className="mx-auto text-church-gold mb-4" />
            <h3 className="text-2xl font-serif font-bold mb-2 text-white">{t('visit.mapTitle')}</h3>
            <p className="text-white/60 mb-6">{t('footer.address')}</p>
            <button className="btn-primary w-full">{t('visit.directions')}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
