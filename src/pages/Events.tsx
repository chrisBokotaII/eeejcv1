import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  desc: string;
  image: string;
}

export default function Events() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            {t('events.title')}
          </motion.h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t('events.desc')}
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12 text-church-olive text-xl">Loading events...</div>
          ) : events.length > 0 ? (
            <div className="space-y-12">
              {events.map((event, idx) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-church-olive rounded-3xl overflow-hidden shadow-xl border border-white/5 flex flex-col lg:flex-row"
                >
                  <div className="w-full lg:w-2/5 h-64 lg:h-auto">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-church-gold bg-church-gold/10 px-4 py-2 rounded-full text-sm font-medium">
                        <Calendar size={16} />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-church-gold bg-church-gold/10 px-4 py-2 rounded-full text-sm font-medium">
                        <Clock size={16} />
                        {event.time}
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{event.title}</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-8">
                      {event.desc}
                    </p>
                    <div className="flex items-center gap-2 text-white/50 mb-8">
                      <MapPin size={20} className="text-church-gold" />
                      {event.location}
                    </div>
                    <button className="btn-primary inline-flex items-center gap-2 self-start">
                      {t('events.learnMore')} <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 text-xl">No upcoming events at the moment.</div>
          )}
        </div>
      </section>

      {/* Newsletter/Stay Updated */}
      <section className="py-24 bg-church-olive">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-serif font-bold text-white">{t('events.stayUpdated')}</h2>
          <p className="text-lg text-white/60">
            {t('events.newsletterDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder={t('contact.email')}
              className="flex-grow px-6 py-4 bg-church-cream border border-white/5 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-church-gold/50"
            />
            <button className="btn-primary px-8 py-4 rounded-full whitespace-nowrap">
              {t('events.subscribe')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
