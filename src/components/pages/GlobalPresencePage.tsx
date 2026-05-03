import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { OfficeLocations } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GlobalPresencePage() {
  const [offices, setOffices] = useState<OfficeLocations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
    try {
      const result = await BaseCrudService.getAll<OfficeLocations>('officelocations');
      setOffices(result.items);
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
            Global Presence
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            International offices across Lebanon, France, UAE, and Saudi Arabia
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
              Strategically Positioned Worldwide
            </h2>
            <p className="font-paragraph text-xl text-foreground/90 max-w-4xl mx-auto leading-relaxed">
              With lawyers' expertise spanning since the 1990s, JMC LEGAL has established a strategic presence across key jurisdictions in the Middle East and Europe. Our international network enables us to provide seamless legal services across borders, combining local expertise with global reach.
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
                  {countryOffices.map((office, index) => (
                    <div
                      key={office._id}
                      className="bg-optional-navy p-8 rounded"
                    >
                      <div className="flex items-start gap-3 mb-6">
                        <MapPin className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-heading text-2xl text-foreground mb-2">{office.city}</h4>
                          {office.address && (
                            <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                              {office.address}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {office.phoneNumber && (
                          <a
                            href={`tel:${office.phoneNumber}`}
                            className="flex items-center gap-3 text-foreground/70 hover:text-accent-gold transition-colors"
                          >
                            <Phone className="w-5 h-5" />
                            <span className="font-paragraph text-sm">{office.phoneNumber}</span>
                          </a>
                        )}

                        {office.emailAddress && (
                          <a
                            href={`mailto:${office.emailAddress}`}
                            className="flex items-center gap-3 text-foreground/70 hover:text-accent-gold transition-colors"
                          >
                            <Mail className="w-5 h-5" />
                            <span className="font-paragraph text-sm">{office.emailAddress}</span>
                          </a>
                        )}

                        {office.mapUrl && (
                          <a
                            href={office.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-accent-gold hover:gap-4 transition-all font-paragraph text-sm"
                          >
                            <ExternalLink className="w-5 h-5" />
                            View on Map
                          </a>
                        )}
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

      {/* Map Section */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-5xl text-foreground mb-6">
              Our International Network
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
              Offices strategically located across key legal and business hubs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded overflow-hidden"
          >
            <Image
              src="https://static.wixstatic.com/media/5e1235_3dc9afdd37684696abde58a60890beee~mv2.png?originWidth=1152&originHeight=576"
              alt="Global office locations map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/40">
              <div className="text-center">
                <p className="font-heading text-3xl text-foreground mb-4">Interactive Map</p>
                <p className="font-paragraph text-lg text-foreground/80">
                  Lebanon • France • UAE • Saudi Arabia
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Locations Summary */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { country: 'Lebanon', cities: 'Beirut, Bekaa, Mount Lebanon' },
              { country: 'France', cities: 'Paris, Strasbourg, Toulouse' },
              { country: 'UAE', cities: 'Dubai' },
              { country: 'Saudi Arabia', cities: 'Riyadh' }
            ].map((location, index) => (
              <motion.div
                key={location.country}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-3">{location.country}</h3>
                <p className="font-paragraph text-base text-foreground/70">{location.cities}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
