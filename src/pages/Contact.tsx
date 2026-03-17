import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: t('contact.subjects.general'),
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: t('contact.subjects.general'),
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

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
                      <p className="text-white/60">{t('contact.phoneValue')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{t('contact.email')}</h4>
                      <p className="text-white/60">{t('contact.emailValue')}</p>
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
              
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-church-gold/10 border border-church-gold/20 p-8 rounded-2xl text-center space-y-4"
                >
                  <CheckCircle2 size={48} className="text-church-gold mx-auto" />
                  <h3 className="text-2xl font-serif font-bold text-white">Message Sent!</h3>
                  <p className="text-white/60">Thank you for reaching out. We will get back to you soon.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-church-gold font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400">
                      <AlertCircle size={20} />
                      <span>Failed to send message. Please try again.</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{t('contact.firstName')}</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 text-white"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{t('contact.lastName')}</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 text-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{t('contact.email')}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{t('contact.subject')}</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 text-white appearance-none"
                    >
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
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-church-gold/20 resize-none text-white"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <div className="flex justify-center sm:justify-start">
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full sm:w-auto btn-primary py-4 px-12 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Sending...' : t('contact.send')} <Send size={20} />
                    </button>
                  </div>
                </form>
              )}
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
