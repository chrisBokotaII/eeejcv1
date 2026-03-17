import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Calendar, MapPin, Clock, Upload, Grid, LogOut, MessageCircle, Users, Eye, LayoutDashboard, Send } from 'lucide-react';

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface Event {
  _id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  desc: string;
  image: string;
  type: 'general' | 'youth' | 'family';
}

interface GalleryImage {
  _id?: string;
  url: string;
  caption?: string;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'events' | 'gallery' | 'messages' | 'subscribers'>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const getAuthHeader = () => {
    const token = localStorage.getItem('admin_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  const [formData, setFormData] = useState<Event>({
    title: '',
    date: '',
    time: '',
    location: '',
    desc: '',
    image: '',
    type: 'general'
  });

  const [galleryData, setGalleryData] = useState<GalleryImage>({
    url: '',
    caption: ''
  });

  useEffect(() => {
    fetchEvents();
    fetchGallery();
    fetchMessages();
    fetchSubscribers();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages', { headers: getAuthHeader() });
      if (res.ok) setMessages(await res.json());
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/subscribers', { headers: getAuthHeader() });
      if (res.ok) setSubscribers(await res.json());
    } catch (err) {
      console.error('Error fetching subscribers:', err);
    }
  };

  const handleUpload = (type: 'event' | 'gallery') => {
    if (!window.cloudinary) {
      setError('Cloudinary script is not loaded. Please refresh the page or check your internet connection.');
      return;
    }
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError('Cloudinary configuration is missing. Please check your environment variables.');
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: true,
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1'
          }
        }
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          if (type === 'event') {
            setFormData(prev => ({ ...prev, image: result.info.secure_url }));
          } else {
            setGalleryData(prev => ({ ...prev, url: result.info.secure_url }));
          }
        }
      }
    );
    widget.open();
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (!res.ok) throw new Error('Failed to fetch gallery');
      const data = await res.json();
      setGallery(data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const url = editingId ? `/api/events/${editingId}` : '/api/events';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchEvents();
        resetForm();
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save event');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(galleryData)
      });

      if (res.ok) {
        fetchGallery();
        resetForm();
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save image');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      let endpoint = '';
      if (activeTab === 'events') endpoint = `/api/events/${id}`;
      else if (activeTab === 'gallery') endpoint = `/api/gallery/${id}`;
      else if (activeTab === 'messages') endpoint = `/api/messages/${id}`;
      else if (activeTab === 'subscribers') endpoint = `/api/subscribers/${id}`;

      const res = await fetch(endpoint, { 
        method: 'DELETE',
        headers: getAuthHeader()
      });
      if (res.ok) {
        if (activeTab === 'events') fetchEvents();
        else if (activeTab === 'gallery') fetchGallery();
        else if (activeTab === 'messages') fetchMessages();
        else if (activeTab === 'subscribers') fetchSubscribers();
        setDeleteConfirmId(null);
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting.');
      setDeleteConfirmId(null);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData(event);
    setEditingId(event._id || null);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGalleryEdit = (img: GalleryImage) => {
    setGalleryData(img);
    setEditingId(img._id || null);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      desc: '',
      image: '',
      type: 'general'
    });
    setGalleryData({ url: '', caption: '' });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="bg-[#f8f7f4] min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-church-olive text-white md:min-h-screen flex-shrink-0 relative">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-church-gold rounded-lg flex items-center justify-center text-church-olive">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="text-xl font-serif font-bold">Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden p-2 text-white/60 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'gallery', label: 'Gallery', icon: Grid },
            { id: 'messages', label: 'Messages', icon: MessageCircle, count: messages.length },
            { id: 'subscribers', label: 'Subscribers', icon: Users, count: subscribers.length },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setIsAdding(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-church-gold text-church-olive shadow-lg font-bold' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === item.id ? 'bg-church-olive text-white' : 'bg-church-gold text-church-olive'}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-white/10">
            <Link
              to="/"
              className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/10"
            >
              <Send size={20} className="rotate-[-45deg]" />
              <span>Back to Website</span>
            </Link>
          </div>
        </nav>

        <div className="hidden md:block absolute bottom-0 w-64 p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-red-400 transition-colors rounded-xl hover:bg-red-400/10"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-church-olive capitalize">{activeTab}</h2>
              <p className="text-gray-500 text-sm">Manage your church's {activeTab} and content.</p>
            </div>
            
            {!isAdding && (activeTab === 'events' || activeTab === 'gallery') && (
              <button
                onClick={() => setIsAdding(true)}
                className="btn-primary flex items-center gap-2 shadow-xl shadow-church-gold/20"
              >
                <Plus size={20} /> {activeTab === 'events' ? 'New Event' : 'New Photo'}
              </button>
            )}
          </header>

          {/* Quick Stats */}
          {!isAdding && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Events', value: events.length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Gallery Photos', value: gallery.length, icon: Grid, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Unread Messages', value: messages.length, icon: MessageCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Subscribers', value: subscribers.length, icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-church-olive/5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                      <stat.icon size={18} />
                    </div>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-church-olive">{stat.value}</div>
                </div>
              ))}
            </div>
          )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-center justify-between"
          >
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
              <X size={20} />
            </button>
          </motion.div>
        )}

          <AnimatePresence mode="wait">
            {isAdding ? (
              activeTab === 'events' ? (
                <motion.div
                  key="event-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-church-olive/10"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-church-olive">
                      {editingId ? 'Edit Event' : 'Add New Event'}
                    </h2>
                    <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 10:00 AM"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                          <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900 bg-white"
                          >
                            <option value="general">General</option>
                            <option value="youth">Youth</option>
                            <option value="family">Family</option>
                          </select>
                        </div>
                      </div>
                      {formData.image && (
                        <div className="mt-4 p-2 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-center">
                          <img src={formData.image} alt="Event Preview" className="max-h-32 rounded-lg object-contain" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            required
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="flex-grow px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900"
                            placeholder="https://..."
                          />
                          <button
                            type="button"
                            onClick={() => handleUpload('event')}
                            className="px-4 py-2 bg-church-olive text-white rounded-xl hover:bg-church-olive/90 transition-colors flex items-center gap-2"
                          >
                            <Upload size={18} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          required
                          rows={4}
                          value={formData.desc}
                          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900 resize-none"
                        />
                      </div>
                      <div className="pt-4">
                        <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 shadow-xl shadow-church-gold/20">
                          <Save size={20} /> {editingId ? 'Update Event' : 'Save Event'}
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="gallery-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-church-olive/10 max-w-2xl mx-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-church-olive">
                      {editingId ? 'Edit Photo' : 'Add Gallery Photo'}
                    </h2>
                    <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleGallerySubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Photo Caption</label>
                      <input
                        type="text"
                        value={galleryData.caption}
                        onChange={(e) => setGalleryData({ ...galleryData, caption: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900"
                        placeholder="Optional caption..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          required
                          value={galleryData.url}
                          onChange={(e) => setGalleryData({ ...galleryData, url: e.target.value })}
                          className="flex-grow px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900"
                          placeholder="https://..."
                        />
                        <button
                          type="button"
                          onClick={() => handleUpload('gallery')}
                          className="px-4 py-2 bg-church-olive text-white rounded-xl hover:bg-church-olive/90 transition-colors flex items-center gap-2"
                        >
                          <Upload size={18} />
                        </button>
                      </div>
                    </div>
                    {galleryData.url && (
                      <div className="p-2 border border-gray-100 rounded-2xl bg-gray-50 flex items-center justify-center">
                        <img src={galleryData.url} alt="Gallery Preview" className="max-h-48 rounded-xl shadow-sm" />
                      </div>
                    )}
                    <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 shadow-xl shadow-church-gold/20">
                      <Save size={20} /> {editingId ? 'Update Photo' : 'Save Photo'}
                    </button>
                  </form>
                </motion.div>
              )
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeTab === 'events' ? (
                  <div className="grid grid-cols-1 gap-6">
                    {events.map((event) => (
                      <div
                        key={event._id}
                        className="bg-white rounded-2xl p-6 shadow-md border border-church-olive/5 flex flex-col md:flex-row gap-6 items-center group hover:shadow-lg transition-all"
                      >
                        <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-church-olive">{event.title}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              event.type === 'youth' ? 'bg-blue-100 text-blue-600' :
                              event.type === 'family' ? 'bg-pink-100 text-pink-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {event.type}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(event._id!)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {events.length === 0 && (
                      <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                        <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No events found. Click "New Event" to get started.</p>
                      </div>
                    )}
                  </div>
                ) : activeTab === 'gallery' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {gallery.map((img) => (
                      <div key={img._id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-md border border-church-olive/5">
                        <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                          <button
                            onClick={() => handleGalleryEdit(img)}
                            className="p-3 bg-white text-church-olive rounded-full hover:bg-church-gold transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(img._id!)}
                            className="p-3 bg-white text-red-600 rounded-full hover:bg-red-50 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {gallery.length === 0 && (
                      <div className="col-span-full text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                        <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No gallery photos found. Click "New Photo" to get started.</p>
                      </div>
                    )}
                  </div>
                ) : activeTab === 'messages' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {messages.map((msg) => (
                      <div key={msg._id} className="bg-white rounded-3xl p-6 shadow-md border border-church-olive/5 flex flex-col justify-between hover:shadow-lg transition-all">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                              <MessageCircle size={24} />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedMessage(msg)}
                                className="p-2 text-church-olive hover:bg-church-olive/5 rounded-lg transition-colors"
                                title="View Message"
                              >
                                <Eye size={20} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(msg._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Message"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-church-olive mb-1">{msg.subject}</h3>
                          <p className="text-sm text-gray-500 mb-4">From: <span className="font-bold text-church-olive">{msg.name}</span></p>
                          <div className="bg-church-cream/30 p-4 rounded-2xl text-gray-700 text-sm line-clamp-3 italic">
                            "{msg.message}"
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400 flex justify-between items-center">
                          <span>{msg.email}</span>
                          <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <div className="col-span-full text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                        <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No messages found.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl shadow-md border border-church-olive/5 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-church-olive/5">
                            <th className="p-6 font-bold text-church-olive">Email Address</th>
                            <th className="p-6 font-bold text-church-olive">Subscribed Date</th>
                            <th className="p-6 font-bold text-church-olive text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscribers.map((sub) => (
                            <tr key={sub._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="p-6 text-gray-700 font-medium">{sub.email}</td>
                              <td className="p-6 text-gray-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                              <td className="p-6 text-right">
                                <button
                                  onClick={() => setDeleteConfirmId(sub._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {subscribers.length === 0 && (
                      <div className="text-center py-24">
                        <Users size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No subscribers found.</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-church-olive/10"
            >
              <h3 className="text-2xl font-serif font-bold text-church-olive mb-4">
                Delete {
                  activeTab === 'events' ? 'Event' : 
                  activeTab === 'gallery' ? 'Photo' : 
                  activeTab === 'messages' ? 'Message' : 
                  'Subscriber'
                }?
              </h3>
              <p className="text-gray-600 mb-8">
                Are you sure you want to delete this {
                  activeTab === 'events' ? 'event' : 
                  activeTab === 'gallery' ? 'photo' : 
                  activeTab === 'messages' ? 'message' : 
                  'subscriber'
                }? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="bg-red-600 text-white px-8 py-2 rounded-full font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {selectedMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-church-olive/10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="pr-8">
                  <h3 className="text-3xl font-serif font-bold text-church-olive mb-2">{selectedMessage.subject}</h3>
                  <p className="text-gray-500">From: <span className="font-bold text-church-olive">{selectedMessage.name}</span> ({selectedMessage.email})</p>
                  <p className="text-sm text-gray-400">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto bg-church-cream/30 p-6 rounded-2xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="btn-primary px-8 py-2"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
