import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-primary border-t border-foreground/10">
      <div className="max-w-[100rem] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Firm Info */}
          <div>
            <div className="font-heading text-3xl text-foreground mb-6">
              JMC <span className="text-accent-gold">LEGAL</span>
            </div>
            <p className="font-paragraph text-sm text-foreground/70 leading-relaxed mb-6">
              Strategic & International Law since 1990. Serving clients across Lebanon, France, UAE, and Saudi Arabia.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:contact@jmclegal.com" className="flex items-center gap-2 text-foreground/70 hover:text-accent-gold transition-colors">
                <Mail className="w-4 h-4" />
                <span className="font-paragraph text-sm">contact@jmclegal.com</span>
              </a>
              <a href="tel:+9611234567" className="flex items-center gap-2 text-foreground/70 hover:text-accent-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-paragraph text-sm">+961 1 234 567</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl text-foreground mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/strategic-advisory" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  Strategic Advisory
                </Link>
              </li>
              <li>
                <Link to="/high-stakes-cases" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  High-Stakes Cases
                </Link>
              </li>
              <li>
                <Link to="/expertise" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  Legal Expertise
                </Link>
              </li>
              <li>
                <Link to="/publications" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/training" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  Training
                </Link>
              </li>
              <li>
                <Link to="/jurisprudence" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  Jurisprudence Database
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Locations */}
          <div>
            <h3 className="font-heading text-xl text-foreground mb-6">Office Locations</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-foreground font-medium">Lebanon</p>
                    <p className="font-paragraph text-xs text-foreground/70">Beirut, Bekaa, Mount Lebanon</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-foreground font-medium">France</p>
                    <p className="font-paragraph text-xs text-foreground/70">Paris, Strasbourg, Toulouse</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-foreground font-medium">UAE</p>
                    <p className="font-paragraph text-xs text-foreground/70">Dubai</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-foreground font-medium">Saudi Arabia</p>
                    <p className="font-paragraph text-xs text-foreground/70">Riyadh</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-xl text-foreground mb-6">Services</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/consultation" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  Legal Consultation
                </Link>
              </li>
              <li>
                <Link to="/team" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/global-presence" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  Global Presence
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-foreground/70 hover:text-accent-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-xs text-foreground/60">
              © {new Date().getFullYear()} JMC LEGAL. All rights reserved. Established 1990.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="font-paragraph text-xs text-foreground/60 hover:text-accent-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-paragraph text-xs text-foreground/60 hover:text-accent-gold transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="font-paragraph text-xs text-foreground/60 hover:text-accent-gold transition-colors">
                Legal Disclaimer
              </Link>
            </div>
          </div>
          <p className="font-paragraph text-xs text-foreground/50 mt-6 text-center md:text-left">
            Attorney-client privilege applies to all communications. This website does not constitute legal advice. 
            Consultation required for specific legal matters.
          </p>
        </div>
      </div>
    </footer>
  );
}
