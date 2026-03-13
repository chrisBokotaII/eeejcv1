import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.pastors'), path: '/pastors' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.events'), path: '/events' },
    { name: t('nav.contact'), path: '/contact' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <img 
                src="https://res.cloudinary.com/dokqf9kg6/image/upload/v1772528695/EEEJC/eeejs/eissaxus3vsevatts8ys.png" 
                alt={t('common.churchNameAbbr')} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-white">{t('common.churchNameAbbr')}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-church-gold ${
                    isActive ? 'text-church-gold border-b-2 border-church-gold' : 'text-white/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-white/70 hover:text-church-gold transition-colors text-sm font-medium"
            >
              <Languages size={18} />
              {i18n.language === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="text-white/70 hover:text-church-gold transition-colors"
            >
              <Languages size={24} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-church-cream border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-4 text-base font-medium rounded-md ${
                      isActive ? 'bg-church-gold/10 text-church-gold' : 'text-white/70 hover:bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
