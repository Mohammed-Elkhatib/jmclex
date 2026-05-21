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
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_8d1be3d839444967895063ee59840f32~mv2.png?originWidth=1344&originHeight=640"
            alt="Legal jurisprudence database"
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
            Jurisprudence Database
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Comprehensive legal research database with multi-jurisdictional case law and analysis
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <feature.icon className="w-14 h-14 text-accent-gold mx-auto mb-6" />
                <h3 className="font-heading text-xl text-foreground mb-4">{feature.title}</h3>
                <p className="font-paragraph text-sm text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Overview */}
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
                Professional Legal Research Tool
              </h2>
              <p className="font-paragraph text-lg text-foreground/90 mb-6 leading-relaxed">
                Our jurisprudence database provides legal professionals with comprehensive access to case law, legal precedents, and expert analysis across Lebanon, France, UAE, Saudi Arabia, and other key jurisdictions.
              </p>
              <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
                Designed for lawyers, judges, legal researchers, and corporate legal departments, the database offers advanced search capabilities, categorized content, and regular updates to ensure you have access to the latest legal developments.
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
            className="mb-16"
          >
            <h2 className="font-heading text-5xl text-foreground mb-12 text-center">
              Database Access
            </h2>
            
            <div className="min-h-[400px]">
              {isLoading ? null : items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-optional-navy rounded overflow-hidden flex flex-col"
                    >
                      <div className="relative h-[200px]">
                        <Image
                          src={item.itemImage || 'https://static.wixstatic.com/media/5e1235_17c6ca441c7d4c94bc82b357e5348ed4~mv2.png?originWidth=256&originHeight=192'}
                          alt={item.itemName || 'Database access'}
                          className="w-full h-full object-cover"
                        />
                        {item.accessLevel && (
                          <div className="absolute top-4 right-4 bg-accent-gold text-secondary-foreground px-3 py-1 rounded text-xs font-paragraph font-medium">
                            {item.accessLevel}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="font-heading text-2xl text-foreground mb-4">{item.itemName}</h3>
                        {item.category && (
                          <p className="font-paragraph text-sm text-accent-gold mb-4">{item.category}</p>
                        )}
                        <p className="font-paragraph text-base text-foreground/80 mb-6 leading-relaxed flex-grow">
                          {item.itemDescription}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="font-heading text-3xl text-accent-gold">
                            {formatPrice(item.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                          </div>
                          <button
                            onClick={() => actions.addToCart({ 
                              collectionId: 'jurisprudencedatabase', 
                              itemId: item._id 
                            })}
                            disabled={addingItemId === item._id}
                            className="bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-3 rounded transition-all hover:scale-105 disabled:opacity-50"
                          >
                            {addingItemId === item._id ? 'Adding...' : 'Subscribe'}
                          </button>
                        </div>
                        
                        {item.itemUrl && (
                          <a
                            href={item.itemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all mt-4 font-paragraph text-sm"
                          >
                            Learn More <ArrowRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-paragraph text-lg text-foreground/60">
                    Database access information available upon inquiry
                  </p>
                </div>
              )}
            </div>
          </motion.div>
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
              Need More Information?
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 mb-12 max-w-3xl mx-auto">
              Contact us to learn more about database access options and institutional subscriptions
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-10 py-5 rounded text-lg transition-all hover:scale-105"
            >
              Contact Us <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
