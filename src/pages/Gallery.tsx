import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Gallery() {
  const { t } = useTranslation();

  const images = [
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527886/EEEJC/eeejs/cdkxhpla5z7km243ykz0.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527886/EEEJC/eeejs/i9ed6vot2tmbede5nmzt.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527887/EEEJC/eeejs/okujtir2na4djuzk49d9.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527888/EEEJC/eeejs/zcbupoisxi8syamjpt4b.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527888/EEEJC/eeejs/hkixelgjmh5oadcp3wn3.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527888/EEEJC/eeejs/oue4abfqghf1eyisnonh.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527889/EEEJC/eeejs/mrqgls7mlzuqrpeunbes.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527889/EEEJC/eeejs/yzkzlbpxbnz5u5nfwc1e.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527890/EEEJC/eeejs/mph2qau1w9iixhdq9ad5.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527890/EEEJC/eeejs/fd7v0envbpv1q10nln6g.jpg',
    'https://res.cloudinary.com/dokqf9kg6/image/upload/v1772527891/EEEJC/eeejs/eboj3of8wp38ar90g9rg.jpg',
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
            {t('gallery.title')}
          </motion.h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t('gallery.desc')}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
              >
                <img
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
