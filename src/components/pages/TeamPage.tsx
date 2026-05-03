import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Mail, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeamPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for consistency
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const foundersData = [
    {
      _id: 'founder-claude',
      name: 'Claude Mcheik',
      role: 'Founder',
      title: 'International Legal Strategist',
      bio: 'Founder. International lawyer with over 35 years of experience. Renowned for strategic legal structuring, cross-border transactions, and high-level advisory. Trusted by corporations and sophisticated clients for precision, discretion, and legal excellence.',
      additionalBio: 'Fluent in French, English, and Arabic. Extensive international experience across Europe and the Middle East.',
      photo: 'https://static.wixstatic.com/media/5e1235_b5d61eefb8bf4d1499dde23d4394d0a0~mv2.jpg',
      contactEmail: 'contact@jmclegal.com'
    },
    {
      _id: 'cofounder-antoine',
      name: 'Me Antoine Y. S.',
      role: 'Co-Founder',
      title: 'Senior Legal Counsel',
      bio: 'Co-Founder & Senior Legal Counsel. International legal expert with decades of experience in cross-border advisory and strategic transactions. Known for delivering high-level legal insight and supporting complex international matters with rigor and expertise.',
      additionalBio: '',
      photo: 'https://static.wixstatic.com/media/5e1235_50ee51499d964a9185c94fd9cad9eb21~mv2.png',
      contactEmail: 'contact@jmclegal.com'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_c7f6a92fc44a4b7da598cec1dca10b94~mv2.png?originWidth=1152&originHeight=576"
            alt="Legal team"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-[100rem] mx-auto px-8 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-7xl text-foreground mb-8"
          >
            Our Team
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Experienced legal professionals dedicated to excellence in international law
          </motion.p>
        </div>
      </section>



      {/* Founders Section */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="min-h-[600px]">
            {isLoading ? null : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {foundersData.map((founder, index) => (
                  <motion.div
                    key={founder._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="flex flex-col"
                  >
                    <div className="relative h-[500px] mb-8 overflow-hidden rounded-lg group">
                      <Image
                        src={founder.photo}
                        alt={founder.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="w-8 h-[1px] bg-accent-gold"></span>
                      <span className="font-paragraph text-sm tracking-widest uppercase text-accent-gold">{founder.role}</span>
                    </div>

                    <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-2 group-hover:text-accent-gold transition-colors">
                      {founder.name}
                    </h2>
                    <p className="font-paragraph text-xl text-accent-gold mb-6 font-medium">{founder.title}</p>
                    
                    <p className="font-paragraph text-base md:text-lg text-foreground/80 mb-6 font-light leading-relaxed">
                      {founder.bio}
                    </p>

                    {founder.additionalBio && (
                      <p className="font-paragraph text-base md:text-lg text-foreground/80 mb-8 font-light leading-relaxed italic">
                        {founder.additionalBio}
                      </p>
                    )}

                    {founder.contactEmail && (
                      <a
                        href={`mailto:${founder.contactEmail}`}
                        className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-gold/80 transition-colors mb-8"
                      >
                        <Mail className="w-4 h-4" />
                        {founder.contactEmail}
                      </a>
                    )}

                    <div className="flex flex-col items-start gap-3">
                      <Link
                        to="/consultation"
                        className="group inline-flex items-center gap-3 bg-accent-gold text-optional-navy font-paragraph font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                      >
                        <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Book a Consultation</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <p className="font-paragraph text-xs text-optional-navy/60 italic">
                        Schedule a confidential consultation
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-6xl text-background mb-8">
              Work With Our Founder
            </h2>
            <p className="font-paragraph text-xl text-background/80 mb-12 max-w-3xl mx-auto">
              Schedule a consultation to discuss your legal needs with Claude Mcheik
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-10 py-5 rounded text-lg transition-all hover:scale-105"
            >
              Book Consultation <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
