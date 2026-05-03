import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeamPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for consistency
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const founderData = {
    _id: 'founder-claude',
    name: 'Claude Mcheik',
    role: 'Founder – International Legal Strategist',
    expertise: 'International legal strategy and academic with experience across Europe and the Middle East, combining legal advisory, business structuring, and cross-border expertise.',
    background: 'Claude Mcheik is an international legal strategist, attorney at law, and PhD researcher specializing in cross-border business law, corporate structuring, and high-stakes legal environments. With over a decade of experience across Europe and the Middle East, he advises companies, institutions, and decision-makers on complex legal frameworks, international transactions, and strategic governance. His profile combines academic excellence, legal precision, and business vision, offering clients a unique approach to navigating global legal challenges.',
    photo: 'https://static.wixstatic.com/media/5e1235_381006431e154787849646de845a3470~mv2.png',
    contactEmail: 'contact@jmclegal.com'
  };

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



      {/* Founder Section */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="min-h-[600px]">
            {isLoading ? null : (
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-2xl group"
                >
                  <div className="block">
                    <div className="relative h-[500px] mb-8 overflow-hidden rounded">
                      <Image
                        src={founderData.photo}
                        alt={founderData.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="text-center">
                      <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-2 group-hover:text-accent-gold transition-colors">
                        {founderData.name}
                      </h2>
                      <p className="font-paragraph text-2xl text-accent-gold mb-8">{founderData.role}</p>
                      <p className="font-paragraph text-lg text-foreground/80 mb-8 leading-relaxed">
                        {founderData.expertise}
                      </p>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        whileInView={{ opacity: 1, height: 'auto' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 pt-8 border-t border-accent-gold/30"
                      >
                        <p className="font-paragraph text-base text-foreground/90 leading-relaxed mb-8">
                          {founderData.background}
                        </p>
                        {founderData.contactEmail && (
                          <a
                            href={`mailto:${founderData.contactEmail}`}
                            className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-gold/80 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {founderData.contactEmail}
                          </a>
                        )}
                      </motion.div>
                      <div className="mt-12">
                        <Link
                          to="/consultation"
                          className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-10 py-5 rounded text-lg transition-all hover:scale-105"
                        >
                          Schedule Consultation <ArrowRight className="w-6 h-6" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
