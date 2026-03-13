import { motion } from 'motion/react';
import { Heart, MapPin, Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dokqf9kg6/image/upload/v1772288842/EEEJC/oz2vwqpq5osihtmcqvl6.jpg"
            alt="Church Hero"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-church-cream/60 via-church-cream/30 to-church-cream"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-church-gold font-medium tracking-widest uppercase text-sm mb-4"
          >
            {t('home.welcome')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif font-bold text-white leading-tight mb-8"
          >
            <Trans i18nKey="home.heroTitle">
              A Place to <span className="italic text-church-gold">Belong</span>,<br />
              Grow, and Serve.
            </Trans>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('home.heroDesc')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/visit" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
              {t('home.ctaSunday')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Info Bar */}
      <section className="bg-church-olive border-y border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-church-gold/10 rounded-full flex items-center justify-center text-church-gold">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">{t('home.serviceTimes')}</h3>
              <p className="text-white/60">{t('home.serviceTimesDesc')}</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-church-gold/10 rounded-full flex items-center justify-center text-church-gold">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">{t('home.location')}</h3>
              <p className="text-white/60">{t('home.locationDesc')}</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-church-gold/10 rounded-full flex items-center justify-center text-church-gold">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">{t('home.getInvolved')}</h3>
              <p className="text-white/60">{t('home.getInvolvedDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Weekly Schedule Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-church-gold font-medium uppercase tracking-widest text-sm"
            >
              {t('visit.schedule')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold text-church-olive mt-4"
            >
              {t('footer.serviceTimes')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tuesday */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-church-cream p-8 rounded-3xl border border-church-olive/5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{t('footer.tuesday')}</h4>
                  <p className="text-church-gold font-medium">08:30 - 10:00</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                {t('footer.tuesdayTime')}
              </p>
            </motion.div>

            {/* Thursday */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-church-cream p-8 rounded-3xl border border-church-olive/5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{t('footer.thursday')}</h4>
                  <p className="text-church-gold font-medium">14:45 - 17:00</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                {t('footer.thursdayTime')}
              </p>
            </motion.div>

            {/* Sunday */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-church-olive p-8 rounded-3xl border border-white/5 shadow-xl text-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-church-gold/20 rounded-2xl flex items-center justify-center text-church-gold">
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{t('footer.sunday')}</h4>
                  <p className="text-church-gold font-medium">08:30 - 10:30</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                {t('footer.sundayTime')}
              </p>
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link to="/visit" className="btn-primary w-full py-3 text-center block">
                  {t('nav.planVisit')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pastor's Welcome */}
      <section className="py-24 bg-church-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-church-gold rounded-2xl z-0"></div>
              <img
                src="https://res.cloudinary.com/dokqf9kg6/image/upload/v1772707365/EEEJC/suite/q4kthrguoms330hv3zfe.jpg"
                alt={t('home.pastorName')}
                className="relative z-10 w-full rounded-2xl shadow-2xl object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <span className="text-church-gold font-medium uppercase tracking-widest text-sm">{t('home.pastorWelcome')}</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                <Trans i18nKey="home.pastorQuote">
                  "We are more than a church; we are a <span className="italic">family</span>."
                </Trans>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                {t('home.pastorDesc1')}
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                {t('home.pastorDesc2')}
              </p>
              <div className="pt-4">
                <p className="font-serif text-2xl font-bold text-church-gold italic">{t('home.pastorName')}</p>
                <p className="text-white/50">{t('home.pastorRole')}</p>
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-church-gold font-bold hover:gap-4 transition-all">
                {t('home.learnMore')} <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
