import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { LegalExpertise } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ExpertiseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [expertise, setExpertise] = useState<LegalExpertise | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExpertise();
  }, [id]);

  const loadExpertise = async () => {
    if (!id) return;
    try {
      // Add timeout protection - max 5 seconds
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Data fetch timeout')), 5000)
      );
      
      const data = await Promise.race([
        BaseCrudService.getById<LegalExpertise>('legalexpertise', id),
        timeoutPromise
      ]) as any;
      
      setExpertise(data || null);
    } catch (error) {
      console.error('Error loading expertise:', error);
      setExpertise(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="min-h-screen pt-32">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !expertise ? (
          <div className="max-w-[100rem] mx-auto px-8 py-32 text-center">
            <h2 className="font-heading text-4xl text-optional-navy mb-6">Expertise Area Not Found</h2>
            <Link to="/expertise" className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all duration-300">
              <ArrowLeft className="w-5 h-5" /> Back to Expertise
            </Link>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src={expertise.practiceAreaImage || 'https://static.wixstatic.com/media/5e1235_3390d6b38d90499d91705ea2db4759f2~mv2.png?originWidth=960&originHeight=512'}
                  alt={expertise.practiceAreaName || 'Legal expertise'}
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
              </div>
              
              <div className="relative z-10 max-w-[100rem] mx-auto px-8 py-32">
                <Link to="/expertise" className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all duration-300 mb-8">
                  <ArrowLeft className="w-5 h-5" /> Back to Expertise
                </Link>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-heading text-5xl md:text-7xl text-optional-navy mb-6"
                >
                  {expertise.practiceAreaName}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-paragraph text-xl text-optional-navy/90 max-w-3xl"
                >
                  {expertise.shortDescription}
                </motion.p>
              </div>
            </section>

            {/* Content Section */}
            <section className="w-full bg-background py-32">
              <div className="max-w-[100rem] mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  <div className="lg:col-span-2">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="prose prose-invert max-w-none"
                    >
                      <div className="font-paragraph text-lg text-optional-navy/90 leading-relaxed whitespace-pre-line">
                        {expertise.detailedContent}
                      </div>
                    </motion.div>

                    {expertise.relatedServices && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-16 bg-secondary p-10 rounded-lg"
                      >
                        <h2 className="font-heading text-3xl text-optional-navy mb-6">Related Services</h2>
                        <p className="font-paragraph text-base text-optional-navy/80 leading-relaxed">
                          {expertise.relatedServices}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="bg-optional-navy p-8 rounded-lg sticky top-32"
                    >
                      <h3 className="font-heading text-2xl text-background mb-6">Need Expert Advice?</h3>
                      <p className="font-paragraph text-base text-background/80 mb-8 leading-relaxed">
                        Schedule a confidential consultation to discuss your specific legal needs in this practice area.
                      </p>
                      <Link
                        to="/consultation"
                        className="w-full inline-flex items-center justify-center gap-2 bg-accent-gold text-optional-navy font-paragraph font-semibold px-6 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        Book Consultation <ArrowRight className="w-5 h-5" />
                      </Link>
                      
                      <div className="mt-8 pt-8 border-t border-background/10">
                        <h4 className="font-heading text-lg text-background mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                          <li>
                            <Link to="/expertise" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                              All Practice Areas
                            </Link>
                          </li>
                          <li>
                            <Link to="/team" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                              Our Team
                            </Link>
                          </li>
                          <li>
                            <Link to="/publications" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                              Legal Publications
                            </Link>
                          </li>
                          <li>
                            <Link to="/contact" className="font-paragraph text-sm text-background/70 hover:text-accent-gold transition-colors duration-300">
                              Contact Us
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
