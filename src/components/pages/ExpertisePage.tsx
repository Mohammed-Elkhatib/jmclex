import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { LegalExpertise } from '@/entities';
import { Head } from '@/components/Head';
import { PAGE_METADATA_PRESETS, buildPageMetadata, getProfessionalServiceSchema } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { scrollAnimationConfigStaggered } from '@/lib/animation-utils';

export default function ExpertisePage() {
  const [expertise, setExpertise] = useState<LegalExpertise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const pageMetadata = buildPageMetadata({
    ...PAGE_METADATA_PRESETS.expertise,
    canonicalUrl: 'https://www.jmclex.com/expertise',
    structuredData: getProfessionalServiceSchema({
      name: 'Legal Expertise & Practice Areas',
      description: 'Specialized legal services in corporate law, compliance, cross-border transactions, litigation, and strategic advisory for international business.',
      serviceType: 'Legal Services',
      url: '/expertise',
    }),
  });

  useEffect(() => {
    loadExpertise();
  }, []);

  const loadExpertise = async () => {
    try {
      const result = await BaseCrudService.getAll<LegalExpertise>('legalexpertise');
      setExpertise(result.items);
    } catch (error) {
      console.error('Error loading expertise:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredExpertise = filter === 'all' 
    ? expertise 
    : expertise.filter(item => {
        const name = item.practiceAreaName?.toLowerCase() || '';
        const filterLower = filter.toLowerCase();
        return name.includes(filterLower);
      });

  return (
    <div className="min-h-screen bg-background">
      <Head metadata={pageMetadata} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden mt-16 md:mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_02dd7b3f84a84d9c8fc7648dc1c24c49~mv2.png?originWidth=1152&originHeight=576"
            alt="Legal expertise"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 lg:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-optional-navy mb-6 md:mb-8 leading-tight"
          >
            International Legal Practice Areas & Cross-Border Expertise
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-optional-navy/90 max-w-4xl mx-auto px-2"
          >
            Comprehensive legal expertise across corporate law, compliance, litigation, and strategic advisory for complex multi-jurisdictional matters and international business operations
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full bg-optional-navy py-8 md:py-12">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {['all', 'corporate', 'litigation', 'compliance', 'criminal', 'family', 'property'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`font-paragraph px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 text-sm md:text-base ${
                  filter === filterOption
                    ? 'bg-accent-gold text-optional-navy'
                    : 'bg-background text-optional-navy hover:bg-accent-gold hover:text-optional-navy'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="w-full bg-background py-16 md:py-24 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredExpertise.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredExpertise.map((item, index) => (
                  <motion.div
                    key={item._id}
                    {...scrollAnimationConfigStaggered(index)}
                    className="group"
                  >
                    <Link to={`/expertise/${item._id}`} className="block">
                      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] mb-4 md:mb-6 overflow-hidden rounded-lg">
                        <Image
                          src={item.practiceAreaImage || 'https://static.wixstatic.com/media/5e1235_b63838be0a05434bb6b170f28824a3cb~mv2.png?originWidth=384&originHeight=256'}
                          alt={item.practiceAreaName || 'Legal expertise'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                      </div>
                      <h3 className="font-heading text-xl md:text-2xl lg:text-3xl text-optional-navy mb-3 md:mb-4 group-hover:text-accent-gold transition-colors duration-300 leading-tight">
                        {item.practiceAreaName}
                      </h3>
                      <p className="font-paragraph text-sm md:text-base text-optional-navy/80 mb-4 md:mb-6 leading-relaxed">
                        {item.shortDescription}
                      </p>
                      <div className="inline-flex items-center gap-2 font-paragraph text-accent-gold group-hover:gap-4 transition-all duration-300 text-sm md:text-base">
                        Learn More <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 md:py-20">
                <p className="font-paragraph text-base md:text-lg text-optional-navy/60">
                  No expertise areas found for this filter
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-optional-navy py-16 md:py-24 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-background mb-6 md:mb-8 leading-tight">
              Need Expert Legal Guidance?
            </h2>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-background/80 mb-8 md:mb-12 max-w-3xl mx-auto px-2">
              Discuss your legal needs with our experienced team across multiple practice areas
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 bg-accent-gold text-optional-navy font-paragraph font-semibold px-6 md:px-10 py-3 md:py-5 rounded-lg text-sm md:text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Schedule Consultation <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
