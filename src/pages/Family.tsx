import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Users, ShieldCheck, MessageCircle, Calendar, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  desc: string;
  image: string;
  type: string;
}

export default function Family() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        // Filter for family events
        const familyEvents = data.filter((e: Event) => e.type === 'family');
        setEvents(familyEvents);
      } catch (err) {
        console.error('Error fetching family events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-church-cream min-h-screen">
      {/* Header */}
      <section className="py-24 bg-church-olive text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-church-gold font-medium uppercase tracking-widest text-sm mb-4 inline-block"
          >
            {t('family.subtitle')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            {t('family.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 leading-relaxed italic max-w-2xl mx-auto"
          >
            {t('family.verse')}
          </motion.p>
        </div>
      </section>

      {/* Counseling & Advice */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-bold text-white">{t('family.title')}</h2>
              <p className="text-lg text-white/70 leading-relaxed">
                {t('family.desc')}
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold shrink-0">
                    <Heart size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{t('family.counselingTitle')}</h3>
                    <p className="text-white/60">{t('family.counselingDesc')}</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold shrink-0">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{t('family.adviceTitle')}</h3>
                    <p className="text-white/60">{t('family.adviceDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-church-gold rounded-3xl z-0"></div>
              <img
                src="https://res.cloudinary.com/dokqf9kg6/image/upload/v1773744392/EEJC/xa3klld5cfgyorn9d3lp.jpg"
                alt="Family Ministry"
                className="relative z-10 rounded-3xl shadow-2xl object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Family Events Section */}
      {events.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-church-olive mb-4">Upcoming Family Events</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Join our community events designed for families and couples.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-church-cream rounded-3xl overflow-hidden shadow-xl border border-church-olive/5"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <div className="space-y-2 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-church-gold" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-church-gold" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-church-gold" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm line-clamp-3">{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Support Groups */}
      <section className="py-24 bg-church-olive">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-16">{t('family.supportTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-church-cream p-10 rounded-3xl border border-white/5 shadow-xl">
              <MessageCircle size={40} className="text-church-gold mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{t('family.retreatsTitle')}</h3>
              <p className="text-white/60">{t('family.retreatsDesc')}</p>
            </div>
            
            <div className="bg-church-cream p-10 rounded-3xl border border-white/5 shadow-xl">
              <Users size={40} className="text-church-gold mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{t('family.workshopsTitle')}</h3>
              <p className="text-white/60">{t('family.workshopsDesc')}</p>
            </div>

            <div className="bg-church-cream p-10 rounded-3xl border border-white/5 shadow-xl">
              <Heart size={40} className="text-church-gold mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{t('family.oneOnOneTitle')}</h3>
              <p className="text-white/60">{t('family.oneOnOneDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
