import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, Star, Heart, Clock, MapPin } from 'lucide-react';
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

export default function Youth() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        // Filter for youth events
        const youthEvents = data.filter((e: Event) => e.type === 'youth');
        setEvents(youthEvents);
      } catch (err) {
        console.error('Error fetching youth events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString(undefined, { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    try {
      if (timeStr.includes(':')) {
        const [hours, minutes] = timeStr.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString(undefined, { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        });
      }
      return timeStr;
    } catch {
      return timeStr;
    }
  };

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
            {t('youth.subtitle')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            {t('youth.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 leading-relaxed italic max-w-2xl mx-auto"
          >
            {t('youth.verse')}
          </motion.p>
        </div>
      </section>

      {/* About Youth Department */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <img
                src="https://res.cloudinary.com/dokqf9kg6/image/upload/v1773744547/EEJC/dfedkawjvjrebkv2yvht.jpg"
                alt={t('youth.title')}
                className="rounded-3xl shadow-2xl object-cover aspect-video"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-serif font-bold text-white">{t('youth.title')}</h2>
              <p className="text-lg text-white/70 leading-relaxed">
                {t('youth.desc')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-church-gold/10 rounded-xl flex items-center justify-center text-church-gold shrink-0">
                    <Star size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t('youth.purpose')}</h4>
                    <p className="text-sm text-white/60">{t('youth.purposeDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-church-gold/10 rounded-xl flex items-center justify-center text-church-gold shrink-0">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t('youth.community')}</h4>
                    <p className="text-sm text-white/60">{t('youth.communityDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Youth Events */}
      <section className="py-24 bg-church-olive">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">{t('youth.eventsTitle')}</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {t('youth.eventsDesc')}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-white/60">Loading youth events...</div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-church-cream rounded-3xl overflow-hidden shadow-xl border border-white/5"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <div className="space-y-2 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-church-gold" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-church-gold" />
                        <span>{formatTime(event.time)}</span>
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-church-cream p-8 rounded-3xl border border-white/5 shadow-xl">
                <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">{t('youth.nightTitle')}</h3>
                <p className="text-white/60 mb-6">{t('youth.nightDesc')}</p>
                <div className="flex items-center gap-2 text-church-gold font-medium">
                  <Calendar size={18} />
                  <span>{t('youth.nightTime')}</span>
                </div>
              </div>
              
              <div className="bg-church-cream p-8 rounded-3xl border border-white/5 shadow-xl">
                <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold mb-6">
                  <Star size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">{t('youth.studyTitle')}</h3>
                <p className="text-white/60 mb-6">{t('youth.studyDesc')}</p>
                <div className="flex items-center gap-2 text-church-gold font-medium">
                  <Calendar size={18} />
                  <span>{t('youth.studyTime')}</span>
                </div>
              </div>

              <div className="bg-church-cream p-8 rounded-3xl border border-white/5 shadow-xl">
                <div className="w-12 h-12 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold mb-6">
                  <Heart size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">{t('youth.socialTitle')}</h3>
                <p className="text-white/60 mb-6">{t('youth.socialDesc')}</p>
                <div className="flex items-center gap-2 text-church-gold font-medium">
                  <Calendar size={18} />
                  <span>{t('youth.socialTime')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
