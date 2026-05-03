import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-optional-navy border-t border-optional-navy/20">
      <div className="max-w-[100rem] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Firm Info */}
          <div>
            <div className="font-heading text-3xl text-background mb-6">
              JMC <span className="text-accent-gold">LEGAL</span>
            </div>
            <p className="font-paragraph text-sm text-background/70 leading-relaxed mb-6">
              Strategic & International Law since 1990. Serving clients across Lebanon, France, UAE, and Saudi Arabia.
            </p>
            <div className="flex flex-col gap-4">
              {/* Email */}
              <a href="mailto:contactjmc@gmail.com" className="flex items-center gap-2 text-background/70 hover:text-accent-gold transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <span className="font-paragraph text-sm">contactjmc@gmail.com</span>
              </a>
              
              {/* Lebanon WhatsApp */}
              <a 
                href="https://api.whatsapp.com/send?phone=96178873196&text=Hello%20I%20would%20like%20a%20consultation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-background/70 hover:text-accent-gold transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-paragraph text-sm">+961 78 873 196 (Lebanon)</span>
              </a>
              
              {/* France WhatsApp */}
              <a 
                href="https://api.whatsapp.com/send?phone=33769596922&text=Hello%20I%20would%20like%20a%20consultation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-background/70 hover:text-accent-gold transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-paragraph text-sm">+33 7 69 59 69 22 (France)</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl text-background mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/strategic-advisory" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  Strategic Advisory
                </Link>
              </li>
              <li>
                <Link to="/high-stakes-cases" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  High-Stakes Cases
                </Link>
              </li>
              <li>
                <Link to="/expertise" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  Legal Expertise
                </Link>
              </li>
              <li>
                <Link to="/publications" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/training" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  Training
                </Link>
              </li>
              <li>
                <Link to="/jurisprudence" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  Jurisprudence Database
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Locations */}
          <div>
            <h3 className="font-heading text-xl text-background mb-6">Office Locations</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-background font-medium">Lebanon</p>
                    <p className="font-paragraph text-xs text-background/70">Beirut, Bekaa, Mount Lebanon</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-background font-medium">France</p>
                    <p className="font-paragraph text-xs text-background/70">Paris, Strasbourg, Toulouse</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-background font-medium">UAE</p>
                    <p className="font-paragraph text-xs text-background/70">Dubai</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-background font-medium">Saudi Arabia</p>
                    <p className="font-paragraph text-xs text-background/70">Riyadh</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-xl text-background mb-6">Services</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/consultation" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  Legal Consultation
                </Link>
              </li>
              <li>
                <Link to="/team" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/global-presence" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  Global Presence
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-optional-navy/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-xs text-background/60">
              © {new Date().getFullYear()} JMC LEGAL. All rights reserved. Established 1990.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="font-paragraph text-xs text-background/60 hover:text-accent-gold transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-paragraph text-xs text-background/60 hover:text-accent-gold transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="font-paragraph text-xs text-background/60 hover:text-accent-gold transition-colors duration-300">
                Legal Disclaimer
              </Link>
            </div>
          </div>
          <p className="font-paragraph text-xs text-background/50 mt-6 text-center md:text-left">
            Attorney-client privilege applies to all communications. This website does not constitute legal advice. 
            Consultation required for specific legal matters.
          </p>
        </div>
      </div>
    </footer>
  );
}
