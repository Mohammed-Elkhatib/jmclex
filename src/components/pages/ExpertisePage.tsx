import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { LegalExpertise } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ExpertisePage() {
  const [expertise, setExpertise] = useState<LegalExpertise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

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
    : expertise.filter(item => item.practiceAreaName?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_02dd7b3f84a84d9c8fc7648dc1c24c49~mv2.png?originWidth=1152&originHeight=576"
            alt="Legal expertise"
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
            Legal Expertise
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Comprehensive legal services across multiple practice areas and jurisdictions
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full bg-optional-navy py-12">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {['all', 'corporate', 'litigation', 'compliance', 'criminal', 'family', 'property'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`font-paragraph px-6 py-3 rounded transition-all ${
                  filter === filterOption
                    ? 'bg-accent-gold text-secondary-foreground'
                    : 'bg-background text-foreground hover:bg-accent-gold hover:text-secondary-foreground'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredExpertise.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredExpertise.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/expertise/${item._id}`} className="block">
                      <div className="relative h-[300px] mb-6 overflow-hidden rounded">
                        <Image
                          src={item.practiceAreaImage || 'https://static.wixstatic.com/media/5e1235_b63838be0a05434bb6b170f28824a3cb~mv2.png?originWidth=384&originHeight=256'}
                          alt={item.practiceAreaName || 'Legal expertise'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                      </div>
                      <h3 className="font-heading text-3xl text-foreground mb-4 group-hover:text-accent-gold transition-colors">
                        {item.practiceAreaName}
                      </h3>
                      <p className="font-paragraph text-base text-foreground/80 mb-6 leading-relaxed">
                        {item.shortDescription}
                      </p>
                      <div className="inline-flex items-center gap-2 font-paragraph text-accent-gold group-hover:gap-4 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground/60">
                  No expertise areas found for this filter
                </p>
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
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">
              Need Expert Legal Guidance?
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 mb-12 max-w-3xl mx-auto">
              Discuss your legal needs with our experienced team across multiple practice areas
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-10 py-5 rounded text-lg transition-all hover:scale-105"
            >
              Schedule Consultation <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
