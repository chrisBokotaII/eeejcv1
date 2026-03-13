import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Calendar, MapPin, Clock, Upload, Grid, LogOut } from 'lucide-react';

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
}

interface GalleryImage {
  _id?: string;
  url: string;
  caption?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'events' | 'gallery'>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
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
    image: ''
  });

  const [galleryData, setGalleryData] = useState<GalleryImage>({
    url: '',
    caption: ''
  });

  useEffect(() => {
    fetchEvents();
    fetchGallery();
  }, []);

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
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(galleryData)
      });

      if (res.ok) {
        fetchGallery();
        setGalleryData({ url: '', caption: '' });
        setIsAdding(false);
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
      const endpoint = activeTab === 'events' ? `/api/events/${id}` : `/api/gallery/${id}`;
      const res = await fetch(endpoint, { 
        method: 'DELETE',
        headers: getAuthHeader()
      });
      if (res.ok) {
        activeTab === 'events' ? fetchEvents() : fetchGallery();
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

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      desc: '',
      image: ''
    });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="bg-church-cream min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-serif font-bold text-church-olive">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
          
          <div className="flex bg-white rounded-full p-1 shadow-md border border-church-olive/10">
            <button
              onClick={() => { setActiveTab('events'); setIsAdding(false); }}
              className={`px-6 py-2 rounded-full transition-all ${activeTab === 'events' ? 'bg-church-olive text-white shadow-lg' : 'text-gray-500 hover:text-church-olive'}`}
            >
              Events
            </button>
            <button
              onClick={() => { setActiveTab('gallery'); setIsAdding(false); }}
              className={`px-6 py-2 rounded-full transition-all ${activeTab === 'gallery' ? 'bg-church-olive text-white shadow-lg' : 'text-gray-500 hover:text-church-olive'}`}
            >
              Gallery
            </button>
          </div>

          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} /> {activeTab === 'events' ? 'Add New Event' : 'Add Gallery Photo'}
            </button>
          )}
        </div>

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

        {isAdding && activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl mb-12 border border-church-olive/10"
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
                      type="text"
                      placeholder="e.g. 25 Dec 2024"
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
                      placeholder="e.g. 10:00 AM"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900"
                    />
                  </div>
                </div>
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
                      className="bg-church-olive text-white px-4 py-2 rounded-xl hover:bg-church-olive/90 transition-colors flex items-center gap-2 shrink-0"
                    >
                      <Upload size={18} />
                      <span className="hidden sm:inline">Upload</span>
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
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none resize-none text-gray-900"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                >
                  <Save size={20} /> {editingId ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {isAdding && activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl mb-12 border border-church-olive/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-church-olive">Add Gallery Photo</h2>
              <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleGallerySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
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
                      className="bg-church-olive text-white px-4 py-2 rounded-xl hover:bg-church-olive/90 transition-colors flex items-center gap-2 shrink-0"
                    >
                      <Upload size={18} />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Caption (Optional)</label>
                  <input
                    type="text"
                    value={galleryData.caption}
                    onChange={(e) => setGalleryData({ ...galleryData, caption: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-4">
                {galleryData.url ? (
                  <img src={galleryData.url} alt="Preview" className="max-h-48 rounded-xl object-contain" />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon size={48} className="mb-2" />
                    <span>Photo Preview</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                >
                  <Save size={20} /> Save to Gallery
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {activeTab === 'events' ? (
          <div className="grid grid-cols-1 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl p-6 shadow-md border border-church-olive/5 flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-church-olive mb-2">{event.title}</h3>
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
            {events.length === 0 && !isAdding && (
              <div className="text-center py-12 text-gray-500">
                No events found. Click "Add New Event" to get started.
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {gallery.map((img) => (
              <div key={img._id} className="group relative aspect-square rounded-xl overflow-hidden shadow-md border border-church-olive/5">
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setDeleteConfirmId(img._id!)}
                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            {gallery.length === 0 && !isAdding && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No gallery photos found. Click "Add Gallery Photo" to get started.
              </div>
            )}
          </div>
        )}
      </div>

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
              <h3 className="text-2xl font-serif font-bold text-church-olive mb-4">Delete {activeTab === 'events' ? 'Event' : 'Photo'}?</h3>
              <p className="text-gray-600 mb-8">
                Are you sure you want to delete this {activeTab === 'events' ? 'event' : 'photo'}? This action cannot be undone.
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
      </AnimatePresence>
    </div>
  );
}
