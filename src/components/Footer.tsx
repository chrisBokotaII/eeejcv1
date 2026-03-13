import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-church-olive text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 overflow-hidden rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                <img 
                  src="https://res.cloudinary.com/dokqf9kg6/image/upload/v1772528695/EEEJC/eeejs/eissaxus3vsevatts8ys.png" 
                  alt={t('common.churchNameAbbr')} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-lg font-serif font-bold tracking-tight">{t('common.churchNameAbbr')}</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.brandDesc')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-church-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-church-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-church-gold transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-church-gold">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('footer.ourStory')}</Link></li>
              <li><Link to="/pastors" className="hover:text-white transition-colors">{t('footer.ourPastors')}</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">{t('nav.gallery')}</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">{t('nav.events')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('footer.contactUs')}</Link></li>
              <li><Link to="/visit" className="hover:text-white transition-colors">{t('footer.planVisit')}</Link></li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-church-gold">{t('footer.serviceTimes')}</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <span className="block font-bold text-white">{t('footer.tuesday')}</span>
                {t('footer.tuesdayTime')}
              </li>
              <li>
                <span className="block font-bold text-white">{t('footer.thursday')}</span>
                {t('footer.thursdayTime')}
              </li>
              <li>
                <span className="block font-bold text-white">{t('footer.sunday')}</span>
                {t('footer.sundayTime')}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-church-gold">{t('footer.contactUs')}</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-church-gold shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-church-gold shrink-0" />
                <span>{t('contact.phoneValue')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-church-gold shrink-0" />
                <span>{t('contact.emailValue')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} {t('common.churchName')}. {t('footer.rights')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
