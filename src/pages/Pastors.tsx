import { motion } from 'motion/react';
import { Mail, Twitter, Instagram, Facebook, Quote } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function Pastors() {
  const { t } = useTranslation();

  const pastors = [
    {
      name: t('pastors.staff.benjamin.name'),
      role: t('home.pastorRole'),
      focus: t('pastors.staff.benjamin.focus'),
      bio: t('pastors.staff.benjamin.bio'),
      img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772288428/EEEJC/fdtrgnhteoovg5gufrjc.jpg',
      socials: { twitter: '#', instagram: '#', facebook: '#' }
    },
    {
      name: t('pastors.staff.nadege.name'),
      role: t('pastors.staff.nadege.focus'),
      focus: t('pastors.staff.nadege.focus'),
      bio: t('pastors.staff.nadege.bio'),
      img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527891/EEEJC/eeejs/g6yqabz8nlvgnx7cn6cn.jpg',
      socials: { instagram: '#', facebook: '#' }
    },
    {
      name: t('pastors.staff.elie.name'),
      role: t('pastors.staff.elie.focus'),
      focus: t('pastors.staff.elie.focus'),
      bio: t('pastors.staff.elie.bio'),
      img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527888/EEEJC/eeejs/gqqexvgrjjtbl4m6wftv.jpg',
      socials: { twitter: '#', facebook: '#' }
    },
    {
      name: t('pastors.staff.heritier.name'),
      role: t('pastors.staff.heritier.focus'),
      focus: t('pastors.staff.heritier.focus'),
      bio: t('pastors.staff.heritier.bio'),
      img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527885/EEEJC/eeejs/phxshmyuiq9lmnnfvdal.jpg',
      socials: { instagram: '#', facebook: '#' }
    },
    {
      name: t('pastors.staff.dorcas.name'),
      role: t('pastors.staff.dorcas.focus'),
      focus: t('pastors.staff.dorcas.focus'),
      bio: t('pastors.staff.dorcas.bio'),
      img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527886/EEEJC/eeejs/ntzno1lc3sndclximz4h.jpg',
      socials: { facebook: '#' }
    },
    {
      name: t('pastors.staff.lyza.name'),
      role: t('pastors.staff.lyza.focus'),
      focus: t('pastors.staff.lyza.focus'),
      bio: t('pastors.staff.lyza.bio'),
      img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527887/EEEJC/eeejs/vlag8s3umdnd0k0ekm2w.jpg',
      socials: { instagram: '#' }
    },
    {
      name: t('pastors.staff.anicet.name'),
      role: t('pastors.staff.anicet.focus'),
      focus: t('pastors.staff.anicet.focus'),
      bio: t('pastors.staff.anicet.bio'),
      img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527892/EEEJC/eeejs/guvrezzfw8mwrvdbrm1x.jpg',
      socials: { twitter: '#', facebook: '#' }
    },
    {
      name: t('pastors.staff.joseph.name'),
      role: t('pastors.staff.joseph.focus'),
      focus: t('pastors.staff.joseph.focus'),
      bio: t('pastors.staff.joseph.bio'),
      img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527903/EEEJC/eeejs/uhwtanv19w1tet6o6mdw.jpg',
      socials: { facebook: '#' }
    },
    {
      name: t('pastors.staff.harrisy.name'),
      role: t('pastors.staff.harrisy.focus'),
      focus: t('pastors.staff.harrisy.focus'),
      bio: t('pastors.staff.harrisy.bio'),
      img: 'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527892/EEEJC/eeejs/vmjyf49fcp8mc2bfwbih.jpg',
      socials: { instagram: '#', facebook: '#' }
    }
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
            {t('pastors.title')}
          </motion.h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t('pastors.desc')}
          </p>
        </div>
      </section>

      {/* Lead Pastors Feature */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-church-gold rounded-3xl z-0"></div>
                <img
                  src="https://res.cloudinary.com/dokqf9kg6/image/upload/v1772289061/EEEJC/y9mvmjj1p9hbxajm887v.jpg"
                  alt={t('home.pastorName')}
                  className="relative z-10 w-full rounded-3xl shadow-2xl object-cover aspect-[4/5]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <Quote size={48} className="text-church-gold/30" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                <Trans i18nKey="pastors.quote">
                  "Our greatest joy is seeing people discover their <span className="italic text-church-gold">God-given purpose</span>."
                </Trans>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                {t('pastors.quoteDesc')}
              </p>
              <div className="pt-4">
                <p className="font-serif text-2xl font-bold text-church-gold italic">{t('home.pastorName')}</p>
                <p className="text-white/50">{t('home.pastorRole')}</p>
              </div>
            </div>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {pastors.map((pastor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-church-olive rounded-3xl overflow-hidden shadow-sm border border-white/5 flex flex-col sm:flex-row"
              >
                <div className="w-full sm:w-2/5 h-80 sm:h-auto">
                  <img
                    src={pastor.img}
                    alt={pastor.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full sm:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-1 text-white">{pastor.name}</h3>
                    <p className="text-church-gold font-medium text-sm mb-2 uppercase tracking-widest">{pastor.role}</p>
                    <p className="text-church-gold/80 font-medium text-xs italic mb-4 leading-relaxed">{pastor.focus}</p>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {pastor.bio}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-church-cream flex items-center justify-center text-white hover:bg-church-gold transition-all">
                      <Mail size={18} />
                    </button>
                    {pastor.socials.twitter && (
                      <a href={pastor.socials.twitter} className="text-white/40 hover:text-church-gold transition-colors">
                        <Twitter size={20} />
                      </a>
                    )}
                    {pastor.socials.instagram && (
                      <a href={pastor.socials.instagram} className="text-white/40 hover:text-church-gold transition-colors">
                        <Instagram size={20} />
                      </a>
                    )}
                    {pastor.socials.facebook && (
                      <a href={pastor.socials.facebook} className="text-white/40 hover:text-church-gold transition-colors">
                        <Facebook size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
