import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Database, Search, Lock, BookOpen } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { JurisprudenceDatabase } from '@/entities';
import { Head } from '@/components/Head';
import { PAGE_METADATA_PRESETS, buildPageMetadata, getProfessionalServiceSchema } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { scrollAnimationConfig, scrollAnimationConfigStaggered } from '@/lib/animation-utils';

export default function JurisprudencePage() {
  const [items, setItems] = useState<JurisprudenceDatabase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  const pageMetadata = buildPageMetadata({
    ...PAGE_METADATA_PRESETS.jurisprudence,
    canonicalUrl: 'https://www.jmclex.com/jurisprudence',
    structuredData: getProfessionalServiceSchema({
      name: 'Jurisprudence Database & Legal Research',
      description: 'Comprehensive jurisprudence database with curated case law, legal precedents, and research materials for international law.',
      serviceType: 'Legal Research',
      url: '/jurisprudence',
    }),
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const result = await BaseCrudService.getAll<JurisprudenceDatabase>('jurisprudencedatabase');
      setItems(result.items);
    } catch (error) {
      console.error('Error loading jurisprudence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Head metadata={pageMetadata} />
      <Header />
      <Cart />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden mt-16 md:mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_8d1be3d839444967895063ee59840f32~mv2.png?originWidth=1344&originHeight=640"
            alt="Legal jurisprudence database"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6 md:mb-8 leading-tight"
          >
            Jurisprudence Database
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 max-w-4xl mx-auto px-2"
          >
            Comprehensive legal research database with multi-jurisdictional case law and analysis
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-optional-navy py-16 md:py-24 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {[
              {
                icon: Database,
                title: 'Extensive Database',
                description: 'Access thousands of legal precedents and case law across multiple jurisdictions'
              },
              {
                icon: Search,
                title: 'Advanced Search',
                description: 'Powerful search tools to find relevant cases and legal principles quickly'
              },
              {
                icon: BookOpen,
                title: 'Expert Analysis',
                description: 'Detailed annotations and analysis from experienced legal practitioners'
              },
              {
                icon: Lock,
                title: 'Secure Access',
                description: 'Protected database with subscription-based access for legal professionals'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                {...scrollAnimationConfigStaggered(index)}
                className="text-center group cursor-default"
              >
                <div className="mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="w-12 h-12 md:w-14 md:h-14 text-accent-gold mx-auto" />
                </div>
                <h3 className="font-heading text-lg md:text-xl text-foreground mb-3 md:mb-4">{feature.title}</h3>
                <p className="font-paragraph text-sm md:text-base text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Overview */}
      <section className="w-full bg-background py-16 md:py-24 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-24 lg:mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-6 md:mb-8 leading-tight">
                Professional Legal Research Tool
              </h2>
              <p className="font-paragraph text-base md:text-lg text-foreground/90 mb-4 md:mb-6 leading-relaxed">
                Our jurisprudence database provides legal professionals with comprehensive access to case law, legal precedents, and expert analysis across Lebanon, France, UAE, Saudi Arabia, and other key jurisdictions.
              </p>
              <p className="font-paragraph text-base md:text-lg text-foreground/90 leading-relaxed">
                Designed for lawyers, judges, legal researchers, and corporate legal departments, the database offers advanced search capabilities, categorized content, and regular updates to ensure you have access to the latest legal developments.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px]"
            >
              <Image
                src="https://static.wixstatic.com/media/5e1235_cd4e0e78acd949608a7c5b70521e050e~mv2.png?originWidth=896&originHeight=448"
                alt="Legal research database"
                className="w-full h-full object-cover rounded"
              />
            </motion.div>
          </div>

          {/* Available Access Levels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 md:mb-12 text-center leading-tight">
              Database Access
            </h2>
            
            <div className="min-h-[400px]">
              {isLoading ? null : items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {items.map((item, index) => (
                    <motion.div
                      key={item._id}
                      {...scrollAnimationConfigStaggered(index)}
                      className="bg-optional-navy rounded overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative h-[150px] sm:h-[180px] md:h-[200px] overflow-hidden">
                        <Image
                          src={item.itemImage || 'https://static.wixstatic.com/media/5e1235_17c6ca441c7d4c94bc82b357e5348ed4~mv2.png?originWidth=256&originHeight=192'}
                          alt={item.itemName || 'Database access'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.accessLevel && (
                          <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-accent-gold text-secondary-foreground px-2 md:px-3 py-1 rounded text-xs font-paragraph font-medium">
                            {item.accessLevel}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 md:p-6 lg:p-8 flex flex-col flex-grow">
                        <h3 className="font-heading text-lg md:text-xl lg:text-2xl text-foreground mb-2 md:mb-4">{item.itemName}</h3>
                        {item.category && (
                          <p className="font-paragraph text-xs md:text-sm text-accent-gold mb-3 md:mb-4">{item.category}</p>
                        )}
                        <p className="font-paragraph text-sm md:text-base text-foreground/80 mb-4 md:mb-6 leading-relaxed flex-grow">
                          {item.itemDescription}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mt-auto">
                          <div className="font-heading text-2xl md:text-3xl text-accent-gold">
                            {formatPrice(item.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                          </div>
                          <button
                            onClick={() => actions.addToCart({ 
                              collectionId: 'jurisprudencedatabase', 
                              itemId: item._id 
                            })}
                            disabled={addingItemId === item._id}
                            className="bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-4 md:px-6 py-2 md:py-3 rounded transition-all hover:scale-105 disabled:opacity-50 text-sm md:text-base whitespace-nowrap"
                          >
                            {addingItemId === item._id ? 'Adding...' : 'Subscribe'}
                          </button>
                        </div>
                        
                        {item.itemUrl && (
                          <a
                            href={item.itemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all mt-3 md:mt-4 font-paragraph text-xs md:text-sm"
                          >
                            Learn More <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 md:py-20">
                  <p className="font-paragraph text-base md:text-lg text-foreground/60">
                    Database access information available upon inquiry
                  </p>
                </div>
              )}
            </div>
          </motion.div>
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
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 md:mb-8 leading-tight">
              Need More Information?
            </h2>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 mb-8 md:mb-12 max-w-3xl mx-auto px-2">
              Contact us to learn more about database access options and institutional subscriptions
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 md:px-10 py-3 md:py-5 rounded text-base md:text-lg transition-all hover:scale-105"
            >
              Contact Us <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
