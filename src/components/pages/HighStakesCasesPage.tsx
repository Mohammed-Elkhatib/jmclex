import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Scale, Shield, Globe } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HighStakesCases } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HighStakesCasesPage() {
  const [cases, setCases] = useState<HighStakesCases[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // SEO: Structured data for schema.org - High-Stakes Cases
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "JMC LEX - High-Stakes Legal Cases",
      "description": "Institutional expertise in complex multi-jurisdictional disputes, international litigation, and high-stakes legal matters",
      "url": "https://jmclex.com/high-stakes-cases",
      "serviceType": ["International Litigation", "Complex Disputes", "Multi-Jurisdictional Matters", "Strategic Legal Advisory"],
      "areaServed": ["FR", "LB", "AE", "SA", "KW", "CH", "EU"]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const result = await BaseCrudService.getAll<HighStakesCases>('highstakescases');
      setCases(result.items);
    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_425dc8e0d0b84ec8beec0830297e79c8~mv2.png?originWidth=1152&originHeight=576"
            alt="High stakes legal cases"
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
            Sophisticated Legal Strategy & Complex International Matters
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Institutional-grade representation for sensitive international matters, complex multi-jurisdictional disputes, and executive-level strategic challenges requiring sophisticated legal strategy and institutional credibility
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-5xl text-foreground mb-8">
                Strategic Complexity Demands Institutional Excellence
              </h2>
              <p className="font-paragraph text-lg text-foreground/90 mb-6 leading-relaxed">
                High-stakes legal matters transcend conventional legal practice. They demand sophisticated strategic thinking, meticulous preparation, institutional-grade execution, and the ability to navigate complex multi-jurisdictional environments with precision, discretion, and executive-level judgment under pressure.
              </p>
              <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
                JMC LEX has established its institutional authority through successful representation in the most challenging and sensitive legal matters—from international disputes and complex cross-border litigation to sophisticated corporate defense, white-collar criminal matters, and regulatory investigations requiring strategic positioning and institutional credibility.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px]"
            >
              <Image
                src="https://static.wixstatic.com/media/5e1235_68c8c1d193324a3dbcce9d5482fb3348~mv2.png?originWidth=768&originHeight=448"
                alt="High stakes legal representation"
                className="w-full h-full object-cover rounded"
              />
            </motion.div>
          </div>

          {/* Expertise Areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
            {[
              {
                icon: Scale,
                title: 'International Dispute Resolution & Arbitration',
                description: 'Sophisticated cross-border litigation, international arbitration, and multi-jurisdictional dispute resolution involving complex legal frameworks, sensitive commercial relationships, and strategic positioning.'
              },
              {
                icon: Shield,
                title: 'Corporate Defense & Strategic Positioning',
                description: 'Executive-level defense in high-value corporate disputes, shareholder conflicts, sensitive regulatory investigations, and business-critical legal challenges requiring institutional strategy.'
              },
              {
                icon: Globe,
                title: 'White-Collar & International Criminal Defense',
                description: 'Sophisticated representation in complex criminal matters, including white-collar crime, international fraud investigations, sanctions matters, and cross-border criminal proceedings.'
              }
            ].map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-optional-navy p-10 rounded"
              >
                <area.icon className="w-14 h-14 text-accent-gold mb-6" />
                <h3 className="font-heading text-3xl text-foreground mb-4">{area.title}</h3>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Case Examples */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <h2 className="font-heading text-5xl text-foreground mb-12 text-center">
              Notable Cases & Strategic Matters
            </h2>
            
            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <LoadingSpinner />
                </div>
              ) : cases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {cases.map((caseItem, index) => (
                    <motion.div
                      key={caseItem._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-optional-navy p-8 rounded"
                    >
                      <h3 className="font-heading text-2xl text-foreground mb-4">
                        {caseItem.caseTitle}
                      </h3>
                      <p className="font-paragraph text-sm text-accent-gold mb-4">
                        {caseItem.jurisdiction} • {caseItem.caseDate ? new Date(caseItem.caseDate).getFullYear() : 'N/A'}
                      </p>
                      <p className="font-paragraph text-base text-foreground/80 mb-4 leading-relaxed">
                        {caseItem.caseDescription}
                      </p>
                      <div className="pt-4 border-t border-foreground/10">
                        <p className="font-paragraph text-sm text-foreground/70">
                          <span className="text-accent-gold font-medium">Strategic Outcome:</span> {caseItem.caseOutcome}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-paragraph text-lg text-foreground/60">
                    Detailed case information available upon confidential consultation
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-optional-navy p-16 rounded"
          >
            <h2 className="font-heading text-5xl text-foreground mb-12 text-center">
              Institutional Approach to High-Stakes Legal Matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Strategic Assessment & Positioning',
                  description: 'Comprehensive institutional analysis of legal position, strategic risks, competitive positioning, and multi-dimensional strategic options from executive-level perspective.'
                },
                {
                  title: 'Specialized Team Mobilization',
                  description: 'Strategic assembly of institutional expertise across multiple jurisdictions, practice areas, and specialized domains as required for optimal case positioning.'
                },
                {
                  title: 'Meticulous Preparation & Strategy',
                  description: 'Institutional-grade preparation of all legal arguments, evidence analysis, strategic positioning, and executive-level case strategy.'
                },
                {
                  title: 'Strategic Execution & Advocacy',
                  description: 'Decisive institutional action, sophisticated strategic maneuvering, and executive-level advocacy to achieve optimal outcomes and strategic positioning.'
                }
              ].map((step, index) => (
                <div key={index}>
                  <h3 className="font-heading text-2xl text-foreground mb-4">{step.title}</h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">
              Navigating Sensitive Legal Complexity?
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 mb-12 max-w-3xl mx-auto">
              Strategic timing and institutional expertise are critical. Schedule a confidential consultation with our senior legal team to discuss your matter with complete discretion and executive-level strategic positioning.
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-10 py-5 rounded text-lg transition-all hover:scale-105"
            >
              Request Confidential Consultation <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
