import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Image } from '@/components/ui/image';
import { ArrowRight, Award, Globe, Users, Target } from 'lucide-react';
import { Head } from '@/components/Head';
import { PAGE_METADATA_PRESETS, buildPageMetadata, getOrganizationSchema } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const pageMetadata = buildPageMetadata({
    ...PAGE_METADATA_PRESETS.about,
    canonicalUrl: 'https://www.jmclex.com/about',
    structuredData: getOrganizationSchema(),
  });

  return (
    <div className="min-h-screen bg-background">
      <Head metadata={pageMetadata} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_f7f317623a5a4a7c883744f1a7b6b701~mv2.png?originWidth=1152&originHeight=640"
            alt="About JMC Legal"
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
            About JMC LEX — International Legal Authority, Institutional Excellence & Strategic Advisory
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Institutional-grade international legal practice combining academic rigor, multilingual expertise, sophisticated cross-border advisory, and 30+ years of institutional authority — serving multinational corporations, institutional investors, and executive leadership across EMEA and international markets
          </motion.p>
        </div>
      </section>

      {/* History */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-accent-gold font-heading text-6xl mb-6">1990</div>
              <h2 className="font-heading text-5xl text-foreground mb-8">
                Our History
              </h2>
              <p className="font-paragraph text-lg text-foreground/90 mb-6 leading-relaxed">
                With lawyers' expertise since the 1990s, JMC LEX has evolved from a boutique law practice in Lebanon into a premier international law firm with strategic presence across the Middle East and Europe. Our institutional development reflects decades of commitment to academic rigor, multilingual expertise, and sophisticated cross-border advisory excellence.
              </p>
              <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
                Over three decades, we have navigated complex geopolitical environments, evolving regulatory frameworks, and sophisticated international business landscapes. Our institutional authority is built on deep expertise in cross-border governance, compliance sophistication, and strategic positioning across multiple jurisdictions and legal systems.
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
                src="https://static.wixstatic.com/media/5e1235_ecd9c6cd22634239825b1f0ac58944a8~mv2.png?originWidth=896&originHeight=448"
                alt="JMC Legal history"
                className="w-full h-full object-cover rounded"
              />
            </motion.div>
          </div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] order-2 lg:order-1"
            >
              <Image
                src="https://static.wixstatic.com/media/5e1235_38ea1d819e0c417d82c2c88998bd8ba7~mv2.png?originWidth=896&originHeight=448"
                alt="Our mission and values"
                className="w-full h-full object-cover rounded"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-heading text-5xl text-foreground mb-8">
                Mission & Institutional Values
              </h2>
              <p className="font-paragraph text-lg text-foreground/90 mb-8 leading-relaxed">
                Our mission is to deliver institutional-grade legal services that integrate deep academic expertise, sophisticated strategic analysis, and unwavering commitment to our clients' strategic objectives. We build long-term advisory relationships based on intellectual rigor, professional excellence, and measurable results.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Institutional Excellence', description: 'Uncompromising standards in legal analysis, strategic positioning, and professional execution' },
                  { title: 'Intellectual Integrity', description: 'Academic rigor combined with practical legal judgment and transparent strategic counsel' },
                  { title: 'Cross-Border Sophistication', description: 'Deep expertise in multilingual advisory and complex international legal environments' },
                  { title: 'Strategic Partnership', description: 'Alignment of legal strategy with your institutional and commercial objectives' }
                ].map((value, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-heading text-xl text-foreground mb-2">{value.title}</h3>
                      <p className="font-paragraph text-base text-foreground/80">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-5xl text-foreground mb-6">
              What Sets Us Apart
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
              Institutional capabilities that position JMC LEX as a premier choice for sophisticated international legal matters and executive-level advisory
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: Globe,
                title: 'International Institutional Presence',
                description: 'Strategic offices across Lebanon, France, UAE, and Saudi Arabia with deep multilingual expertise and cross-border advisory capability'
              },
              {
                icon: Users,
                title: 'Accomplished Legal Leadership',
                description: 'Senior legal professionals with 60+ years of combined international experience in complex cross-border matters and institutional advisory'
              },
              {
                icon: Target,
                title: 'Strategic Legal Architecture',
                description: 'Sophisticated approach that integrates legal strategy with governance frameworks and commercial objectives'
              },
              {
                icon: Award,
                title: 'Institutional Track Record',
                description: 'Decades of successful outcomes in high-stakes international matters, complex transactions, and strategic advisory'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <item.icon className="w-16 h-16 text-accent-gold mx-auto mb-6" />
                <h3 className="font-heading text-2xl text-foreground mb-4">{item.title}</h3>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Positioning */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl text-foreground mb-8">
              International Institutional Positioning
            </h2>
            <p className="font-paragraph text-xl text-foreground/90 max-w-4xl mx-auto leading-relaxed mb-12">
              JMC LEX occupies a distinctive position in the international legal landscape as a bridge between Middle Eastern and European legal systems, combining institutional authority in both regions. Our multilingual capabilities, academic expertise, and cultural sophistication enable us to navigate complex cross-border governance, compliance, and strategic matters with institutional credibility and executive-level judgment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                region: 'Middle East & Levantine Authority',
                description: 'Institutional roots and extensive network across Lebanon, UAE, and Saudi Arabia with deep regional legal expertise and governance understanding'
              },
              {
                region: 'European & EMEA Sophistication',
                description: 'Established institutional presence in France with advanced expertise in EU legal frameworks and cross-border compliance'
              },
              {
                region: 'Multilingual Cross-Border Advisory',
                description: 'Seamless institutional coordination across jurisdictions for complex international matters, governance issues, and strategic positioning'
              }
            ].map((item, index) => (
              <motion.div
                key={item.region}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-optional-navy p-10 rounded text-center"
              >
                <h3 className="font-heading text-3xl text-foreground mb-4">{item.region}</h3>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
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
              Partner With Us
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 mb-12 max-w-3xl mx-auto">
              Experience the JMC LEGAL difference in your next legal matter
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-10 py-5 rounded text-lg transition-all hover:scale-105"
              >
                Book Consultation <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground font-paragraph font-medium px-10 py-5 rounded text-lg transition-all hover:bg-accent-gold hover:text-secondary-foreground hover:border-accent-gold"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
