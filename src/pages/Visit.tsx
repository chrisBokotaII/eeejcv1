import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, Coffee, Users, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Visit() {
  const { t } = useTranslation();

  const faqs = [
    { q: t('visit.faq.q1'), a: t('visit.faq.a1') },
    { q: t('visit.faq.q2'), a: t('visit.faq.a2') },
    { q: t('visit.faq.q3'), a: t('visit.faq.a3') },
  ];

  return (
    <div className="bg-church-cream min-h-screen">
      {/* Header */}
      <section className="py-24 bg-church-olive text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            {t('visit.title')}
          </motion.h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t('visit.desc')}
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold mx-auto">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">{t('visit.expect.times')}</h3>
              <p className="text-white/60 leading-relaxed">
                {t('visit.expect.timesDesc')}
              </p>
            </div>
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold mx-auto">
                <Coffee size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">{t('visit.expect.atmosphere')}</h3>
              <p className="text-white/60 leading-relaxed">
                {t('visit.expect.atmosphereDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section className="py-24 bg-church-olive">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-4xl font-serif font-bold text-white">{t('visit.findUs')}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-church-gold shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-white">{t('visit.address')}</p>
                    <p className="text-white/60">{t('visit.addressFull')}</p>
                  </div>
                </div>
                <div className="p-8 bg-church-cream rounded-2xl border border-white/5">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-white">
                    <Calendar size={20} className="text-church-gold" />
                    {t('visit.schedule')}
                  </h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex justify-between"><span>{t('visit.scheduleItems.tuesday')}</span></li>
                    <li className="flex justify-between"><span>{t('visit.scheduleItems.thursday')}</span></li>
                    <li className="flex justify-between"><span>{t('visit.scheduleItems.sunday')}</span></li>
                  </ul>
                </div>
              </div>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                {t('visit.askQuestion')} <ArrowRight size={20} />
              </Link>
            </div>
            <div className="w-full lg:w-1/2 h-[400px] bg-church-cream rounded-3xl overflow-hidden shadow-inner border border-white/5">
               <img
                src="https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527886/EEEJC/eeejs/cdkxhpla5z7km243ykz0.jpg"
                alt="Map"
                className="w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-church-cream">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-church-gold/10 rounded-full flex items-center justify-center text-church-gold mx-auto mb-6">
              <HelpCircle size={32} />
            </div>
            <h2 className="text-4xl font-serif font-bold text-white">{t('visit.faq.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-church-olive p-8 rounded-3xl border border-white/5 space-y-4"
              >
                <h3 className="text-xl font-serif font-bold text-church-gold">{faq.q}</h3>
                <p className="text-white/60 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Let us know you're coming */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-serif font-bold text-white">{t('visit.letUsKnow')}</h2>
          <p className="text-lg text-white/60">
            {t('visit.letUsKnowDesc')}
          </p>
          <form className="bg-church-olive p-10 rounded-3xl shadow-xl border border-white/5 text-left space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{t('visit.form.name')}</label>
                <input type="text" className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl text-white" placeholder={t('visit.form.name')} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{t('visit.form.email')}</label>
                <input type="email" className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl text-white" placeholder={t('visit.form.email')} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{t('visit.form.when')}</label>
              <select className="w-full px-4 py-3 bg-church-cream border border-white/5 rounded-xl text-white appearance-none">
                <option>{t('visit.form.options.tuesday')}</option>
                <option>{t('visit.form.options.thursday')}</option>
                <option>{t('visit.form.options.sunday')}</option>
                <option>{t('visit.form.options.future')}</option>
              </select>
            </div>
            <div className="flex justify-center sm:justify-start">
              <button className="w-full sm:w-auto btn-primary py-4 px-12 text-lg">
                {t('visit.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
