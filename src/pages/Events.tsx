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
  type?: 'general' | 'youth' | 'family';
}

export default function Events() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'general' | 'youth' | 'family'>('all');

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

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter);

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
      // If it's in HH:MM format from type="time"
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

      {/* Filter Buttons */}
      <section className="pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'general', 'youth', 'family'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                  filter === type
                    ? 'bg-church-gold text-church-olive shadow-lg shadow-church-gold/20'
                    : 'bg-white text-church-olive border border-church-olive/10 hover:border-church-gold'
                }`}
              >
                {type === 'all' ? 'All Events' : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12 text-church-olive text-xl">Loading events...</div>
          ) : filteredEvents.length > 0 ? (
            <div className="space-y-12">
              {filteredEvents.map((event, idx) => (
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
                      {event.type && (
                        <div className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                          event.type === 'youth' ? 'bg-blue-500/20 text-blue-300' :
                          event.type === 'family' ? 'bg-pink-500/20 text-pink-300' :
                          'bg-white/10 text-white/70'
                        }`}>
                          {event.type}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-church-gold bg-church-gold/10 px-4 py-2 rounded-full text-sm font-medium">
                        <Calendar size={16} />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2 text-church-gold bg-church-gold/10 px-4 py-2 rounded-full text-sm font-medium">
                        <Clock size={16} />
                        {formatTime(event.time)}
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
