import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const location = useLocation();
  const { itemCount, actions } = useCart();

  const languages = ['EN', 'FR', 'AR', 'ES', 'CN', 'HI'];

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Strategic Advisory', path: '/strategic-advisory' },
    { label: 'High-Stakes Cases', path: '/high-stakes-cases' },
    { label: 'Expertise', path: '/expertise' },
    { label: 'Publications', path: '/publications' },
    { label: 'Training', path: '/training' },
    { label: 'Jurisprudence', path: '/jurisprudence' },
    { label: 'Global Presence', path: '/global-presence' },
    { label: 'Our Team', path: '/team' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10">
      <div className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="font-heading text-2xl md:text-3xl text-foreground">
              JMC <span className="text-accent-gold">LEGAL</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-paragraph text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'text-accent-gold'
                    : 'text-foreground hover:text-accent-gold'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-foreground/60" />
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="bg-transparent text-foreground font-paragraph text-sm border border-foreground/20 rounded px-3 py-1 cursor-pointer hover:border-accent-gold transition-colors"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-background text-foreground">
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Icon */}
            <button
              onClick={actions.toggleCart}
              className="relative text-foreground hover:text-accent-gold transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-gold text-secondary-foreground text-xs font-paragraph font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Link
              to="/consultation"
              className="bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-3 rounded transition-all hover:scale-105"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden text-foreground"
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
            className="xl:hidden bg-background border-t border-foreground/10 overflow-hidden"
          >
            <nav className="max-w-[120rem] mx-auto px-8 py-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-paragraph text-base transition-colors ${
                    location.pathname === item.path
                      ? 'text-accent-gold'
                      : 'text-foreground hover:text-accent-gold'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 mt-4">
                <Globe className="w-4 h-4 text-foreground/60" />
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="bg-transparent text-foreground font-paragraph text-sm border border-foreground/20 rounded px-3 py-1 cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang} className="bg-background text-foreground">
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile CTA */}
              <Link
                to="/consultation"
                onClick={() => setIsMenuOpen(false)}
                className="bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-3 rounded text-center mt-4 transition-all hover:scale-105"
              >
                Book Consultation
              </Link>

              {/* Mobile Cart Button */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  actions.toggleCart();
                }}
                className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground/20 font-paragraph font-medium px-6 py-3 rounded transition-all hover:bg-background mt-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Cart {itemCount > 0 && `(${itemCount})`}
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
