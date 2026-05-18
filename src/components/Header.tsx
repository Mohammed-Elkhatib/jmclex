import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/integrations';
import { useLanguageStore } from '@/lib/language-store';
import { useTranslation } from '@/lib/use-translation';
import Cart from '@/components/Cart';
import type { Language } from '@/lib/language-store';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const { itemCount, actions } = useCart();
  const { language } = useLanguageStore();
  const { t } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  // SEO: Add structured data for navigation
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "JMC LEX",
      "url": "https://jmclex.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://jmclex.com/search?q={search_term_string}"
        }
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const languages = ['EN', 'FR', 'AR', 'ZH'] as const;
  
  const languageNames: Record<string, string> = {
    EN: 'English',
    FR: 'Français',
    AR: 'العربية',
    ZH: '中文'
  };
  
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
    { key: 'Talent Network', path: '/talent-network' },
    { key: 'nav.training', path: '/training' },
    { key: 'nav.jurisprudence', path: '/jurisprudence' },
    { key: 'AI Legal Infrastructure', path: '/ai-legal-infrastructure' },
    { key: 'nav.global-presence', path: '/global-presence' },
    { key: 'nav.team', path: '/team' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.contact', path: '/contact' }
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-sm border-b border-optional-navy/10">
      <div className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="font-heading text-2xl md:text-3xl text-optional-navy">
              JMC <span className="text-accent-gold">LEX</span>
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
            {/* Globe Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="relative text-optional-navy hover:text-accent-gold transition-all duration-300 group"
                aria-label="Language selector"
              >
                <motion.div
                  animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Globe className="w-6 h-6" />
                </motion.div>
                <div className="absolute inset-0 rounded-full bg-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"></div>
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 bg-background border border-optional-navy/20 rounded-lg shadow-lg overflow-hidden z-50 min-w-[200px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageSelect(lang as Language)}
                        className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-300 ${
                          language === lang
                            ? 'bg-accent-gold/10 text-accent-gold font-medium'
                            : 'text-optional-navy hover:bg-secondary'
                        }`}
                      >
                        <span className="text-lg">{languageFlags[lang]}</span>
                        <span className="font-paragraph text-sm">{languageNames[lang]}</span>
                        <span className="font-paragraph text-xs text-optional-navy/50 ml-auto">({lang})</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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

              {/* Mobile Language Selector */}
              <div className="mt-4 pt-4 border-t border-optional-navy/10">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 text-optional-navy hover:text-accent-gold transition-colors duration-300 font-paragraph text-sm font-medium mb-3"
                >
                  <Globe className="w-5 h-5" />
                  <span>Select Language</span>
                </button>
                
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          handleLanguageSelect(lang as Language);
                          setIsMenuOpen(false);
                        }}
                        className={`px-4 py-2 flex items-center gap-3 rounded transition-all duration-300 ${
                          language === lang
                            ? 'bg-accent-gold/10 text-accent-gold font-medium'
                            : 'text-optional-navy hover:bg-secondary'
                        }`}
                      >
                        <span className="text-lg">{languageFlags[lang]}</span>
                        <span className="font-paragraph text-sm">{languageNames[lang]}</span>
                        <span className="font-paragraph text-xs text-optional-navy/50 ml-auto">({lang})</span>
                      </button>
                    ))}
                  </motion.div>
                )}
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
