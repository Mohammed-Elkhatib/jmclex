import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, CheckCircle, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PremiumPricingSection from '@/components/PremiumPricingSection';

export default function ExecutiveTrainingCenterPage() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as 'overview' | 'pricing' | null;
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing'>(tabParam || 'overview');

  const benefits = [
    {
      title: 'Elite Instructor Panel',
      description: 'Learn directly from top-tier legal experts and thought leaders with decades of experience'
    },
    {
      title: 'Confidential Environment',
      description: 'Private, secure learning setting designed for sensitive strategic discussions'
    },
    {
      title: 'Personalized Attention',
      description: 'Small cohorts ensure individual attention and tailored learning experiences'
    },
    {
      title: 'Executive Certification',
      description: 'Recognized credentials that enhance professional standing and credibility'
    },
    {
      title: 'Strategic Curriculum',
      description: 'Real-world case studies and landmark decisions analyzed in depth'
    },
    {
      title: 'Bilingual Delivery',
      description: 'Programs available in English and French for global professionals'
    }
  ];

  // Sync activeTab with URL parameter on mount
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-foreground overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-gold rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 sm:mb-6 md:mb-8"
            >
              <span className="inline-block font-paragraph text-xs sm:text-sm tracking-widest uppercase text-accent-gold font-semibold">
                Premium Executive Training
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-background leading-tight mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-5xl mx-auto"
            >
              Executive Training Center & Certification
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl text-background/95 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-14 lg:mb-16 leading-relaxed px-2"
            >
              Exclusive legal education for distinguished executives, legal professionals, and business leaders seeking elite strategic training and professional certification.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-2"
            >
              <a
                href="mailto:contact@jmclex.com"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-accent-gold text-foreground font-paragraph font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded text-sm sm:text-base transition-all duration-300 hover:bg-accent-gold/90 hover:scale-105 active:scale-95"
              >
                Request Confidential Inquiry
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
              <button
                onClick={() => setActiveTab('pricing')}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-secondary text-foreground font-paragraph font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded border border-accent-gold/30 text-sm sm:text-base transition-all duration-300 hover:border-accent-gold/60 hover:scale-105 active:scale-95"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="w-full bg-secondary border-b border-accent-gold/20 sticky top-0 z-40 overflow-x-auto">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex gap-1 sm:gap-2 md:gap-4 min-w-max sm:min-w-0">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'pricing', label: 'Pricing & Offers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 font-paragraph font-medium text-xs sm:text-sm md:text-base transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-accent-gold text-foreground'
                    : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="w-full">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Premium Benefits Section */}
            <section className="w-full bg-background py-12 sm:py-16 md:py-24 lg:py-28">
              <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
                >
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4 md:mb-6">
                    Premium Executive Benefits
                  </h2>
                  <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto px-2">
                    Designed exclusively for distinguished professionals
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="bg-secondary rounded-lg p-5 sm:p-6 md:p-7 lg:p-8 border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/10 flex flex-col h-full"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent-gold" />
                      </div>
                      <h3 className="font-heading text-base sm:text-lg md:text-xl text-foreground mb-2 sm:mb-3">
                        {benefit.title}
                      </h3>
                      <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Program Highlights */}
            <section className="w-full bg-secondary py-12 sm:py-16 md:py-24 lg:py-28">
              <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 sm:mb-6 md:mb-8">
                      Comprehensive Executive Education
                    </h2>
                    <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/90 mb-5 sm:mb-6 md:mb-8 leading-relaxed">
                      Our Executive Training Center offers selective, premium legal education designed for professionals at the highest levels of their organizations. Each program combines rigorous academic content with practical strategic application.
                    </p>
                    <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                      {[
                        '6-hour intensive programs led by elite legal experts',
                        'Confidential, executive-level learning environment',
                        'Personalized attention in small, curated cohorts',
                        'Real-world case studies and landmark decisions',
                        'Professional certification upon completion',
                        'Bilingual delivery in English and French'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 sm:gap-3 md:gap-4">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5 sm:mt-1" />
                          <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/90">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]"
                  >
                    <Image
                      src="https://static.wixstatic.com/media/5e1235_c7fad726680c4e6293a1dfe62a96b484~mv2.png?originWidth=768&originHeight=448"
                      alt="Executive training session"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Premium Contact CTA Section */}
            <section className="w-full bg-foreground py-12 sm:py-16 md:py-24 lg:py-28">
              <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-background mb-4 sm:mb-6 md:mb-8">
                    Executive Training Inquiries
                  </h2>
                  <p className="font-paragraph text-sm sm:text-base md:text-lg text-background/90 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2">
                    Contact contact@jmclex.com for confidential executive training inquiries and strategic enrollment discussions.
                  </p>
                  <a
                    href="mailto:contact@jmclex.com"
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-accent-gold text-foreground font-paragraph font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded text-sm sm:text-base transition-all duration-300 hover:bg-accent-gold/90 hover:scale-105 active:scale-95"
                  >
                    Contact Our Advisory Team
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </a>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PremiumPricingSection />
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
