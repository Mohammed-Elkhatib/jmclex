import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { MapPin, MessageCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { OfficeLocations } from '@/entities';
import { useTranslation } from '@/lib/use-translation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GlobalPresencePage() {
  const [offices, setOffices] = useState<OfficeLocations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
    try {
      const result = await BaseCrudService.getAll<OfficeLocations>('officelocations');
      // Filter to keep only France (Strasbourg) and Lebanon (Beirut, Bekaa)
      const filtered = result.items.filter(office => {
        const country = office.country?.toLowerCase() || '';
        const city = office.city?.toLowerCase() || '';
        
        if (country === 'france' && city === 'strasbourg') return true;
        if (country === 'lebanon' && (city === 'beirut' || city === 'bekaa')) return true;
        return false;
      });
      setOffices(filtered);
    } catch (error) {
      console.error('Error loading offices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedOffices = offices.reduce((acc, office) => {
    const country = office.country || 'Other';
    if (!acc[country]) acc[country] = [];
    acc[country].push(office);
    return acc;
  }, {} as Record<string, OfficeLocations[]>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_6dabbc369c5b443ba9bd4d5116c64ce3~mv2.png?originWidth=1152&originHeight=576"
            alt="Global presence"
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
            {t('global.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            {t('global.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-5xl text-foreground mb-8">
              {t('global.section-title')}
            </h2>
            <p className="font-paragraph text-xl text-foreground/90 max-w-4xl mx-auto leading-relaxed">
              {t('global.section-desc')}
            </p>
          </motion.div>

          {/* Office Locations by Country */}
          <div className="space-y-20">
            {Object.entries(groupedOffices).map(([country, countryOffices], countryIndex) => (
              <motion.div
                key={country}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: countryIndex * 0.1 }}
              >
                <h3 className="font-heading text-4xl text-foreground mb-12">{country}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {countryOffices.map((office) => (
                    <div
                      key={office._id}
                      className="bg-optional-navy p-8 rounded"
                    >
                      <div className="flex items-start gap-3 mb-6">
                        <MapPin className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-heading text-2xl text-foreground mb-2">{office.city}</h4>
                          <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                            {t('global.support-text')}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <a
                          href="https://wa.me/96178873196"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-accent-gold text-background font-paragraph font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 w-full"
                        >
                          <MessageCircle className="w-5 h-5" />
                          {t('global.contact-button')}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {isLoading && (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/60">Loading office locations...</p>
            </div>
          )}

          {!isLoading && offices.length === 0 && (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/60">
                Office information available upon request
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
