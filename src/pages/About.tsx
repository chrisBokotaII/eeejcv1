import { motion } from 'motion/react';
import { Target, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const leaders = [
    { name: t('pastors.staff.benjamin.name'), role: t('home.pastorRole'), img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772707365/EEEJC/suite/wqpdfzugxy1vhhgtzhkv.jpg' },
    { name: t('pastors.staff.nadege.name'), role: t('pastors.staff.nadege.focus'), img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527891/EEEJC/eeejs/g6yqabz8nlvgnx7cn6cn.jpg' },
    { name: t('pastors.staff.elie.name'), role: t('pastors.staff.elie.focus'), img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527888/EEEJC/eeejs/gqqexvgrjjtbl4m6wftv.jpg' },
    { name: t('pastors.staff.heritier.name'), role: t('pastors.staff.heritier.focus'), img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527885/EEEJC/eeejs/phxshmyuiq9lmnnfvdal.jpg' },
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
            {t('about.title')}
          </motion.h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t('about.desc')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-church-olive p-12 rounded-3xl shadow-sm border border-white/5">
              <div className="w-16 h-16 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold mb-8">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-6">{t('about.mission')}</h2>
              <p className="text-lg text-white/70 leading-relaxed">
                {t('about.missionDesc')}
              </p>
            </div>
            <div className="bg-church-olive p-12 rounded-3xl shadow-sm border border-white/5">
              <div className="w-16 h-16 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold mb-8">
                <Heart size={32} />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-6">{t('about.vision')}</h2>
              <p className="text-lg text-white/70 leading-relaxed">
                {t('about.visionDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-church-gold font-medium uppercase tracking-widest text-sm">{t('about.teamTitle')}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">{t('about.teamSubtitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[3/4]">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold">{leader.name}</h3>
                <p className="text-church-gold font-medium text-sm">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
