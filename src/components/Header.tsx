import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/integrations';
import { useLanguageStore } from '@/lib/language-store';
import { useTranslation } from '@/lib/use-translation';
import Cart from '@/components/Cart';
import type { Language } from '@/lib/language-store';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount, actions } = useCart();
  const { language } = useLanguageStore();
  const { t } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const languages = ['EN', 'FR', 'AR', 'ZH'] as const;
  
  const languageFlags: Record<string, string> = {
    EN: '🇺🇸',
    FR: '🇫🇷',
    AR: '🇸🇦',
    ZH: '🇨🇳'
  };

  const menuItems = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.strategic-advisory', path: '/strategic-advisory' },
    { key: 'nav.high-stakes-cases', path: '/high-stakes-cases' },
    { key: 'nav.expertise', path: '/expertise' },
    { key: 'nav.publications', path: '/publications' },
    { key: 'nav.training', path: '/training' },
    { key: 'nav.jurisprudence', path: '/jurisprudence' },
    { key: 'nav.global-presence', path: '/global-presence' },
    { key: 'nav.team', path: '/team' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-sm border-b border-optional-navy/10">
      <div className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="font-heading text-2xl md:text-3xl text-optional-navy">
              JMC <span className="text-accent-gold">LEGAL</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-paragraph text-sm transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-accent-gold font-medium'
                    : 'text-optional-navy hover:text-accent-gold'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="flex items-center gap-3">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as Language)}
                  className={`text-lg transition-all duration-300 ${
                    language === lang
                      ? 'opacity-100 scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  title={lang}
                >
                  {languageFlags[lang]}
                </button>
              ))}
            </div>

            {/* Cart Icon */}
            <button
              onClick={actions.toggleCart}
              className="relative text-optional-navy hover:text-accent-gold transition-colors duration-300"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-gold text-background text-xs font-paragraph font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Link
              to="/consultation"
              className="bg-accent-gold text-background font-paragraph font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              {t('header.book-consultation')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden text-optional-navy"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-background border-t border-optional-navy/10 overflow-hidden"
          >
            <nav className="max-w-[120rem] mx-auto px-8 py-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-paragraph text-base transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'text-accent-gold font-medium'
                      : 'text-optional-navy hover:text-accent-gold'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-3 mt-4">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang as Language);
                      setIsMenuOpen(false);
                    }}
                    className={`text-lg transition-all duration-300 ${
                      language === lang
                        ? 'opacity-100 scale-110'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    title={lang}
                  >
                    {languageFlags[lang]}
                  </button>
                ))}
              </div>

              {/* Mobile CTA */}
              <Link
                to="/consultation"
                onClick={() => setIsMenuOpen(false)}
                className="bg-accent-gold text-background font-paragraph font-semibold px-6 py-3 rounded-lg text-center mt-4 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {t('header.book-consultation')}
              </Link>

              {/* Mobile Cart Button */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  actions.toggleCart();
                }}
                className="flex items-center justify-center gap-2 bg-transparent text-optional-navy border border-optional-navy/20 font-paragraph font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:bg-secondary mt-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {t('header.cart')} {itemCount > 0 && `(${itemCount})`}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Component */}
      <Cart />
    </header>
  );
}
