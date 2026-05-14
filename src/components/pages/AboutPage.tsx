import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Award, Globe, Users, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
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
            About JMC LEX — International Legal Authority
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Excellence in international legal strategy, cross-border compliance, and strategic advisory — Established expertise since the 1990s
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
                With lawyers' expertise since the 1990s, JMC LEGAL has grown from a boutique law practice in Lebanon to a leading international law firm with offices across the Middle East and Europe. Our journey reflects our commitment to excellence, strategic thinking, and unwavering dedication to our clients' success.
              </p>
              <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
                Over three decades, we have navigated complex geopolitical shifts, regulatory changes, and evolving business landscapes, always maintaining our focus on delivering exceptional legal services and strategic advisory to our clients worldwide.
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
                Mission & Values
              </h2>
              <p className="font-paragraph text-lg text-foreground/90 mb-8 leading-relaxed">
                Our mission is to provide world-class legal services that combine deep expertise, strategic insight, and unwavering commitment to our clients' objectives. We believe in building long-term relationships based on trust, excellence, and results.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Excellence', description: 'Uncompromising standards in everything we do' },
                  { title: 'Integrity', description: 'Ethical practice and transparent communication' },
                  { title: 'Strategic Thinking', description: 'Beyond legal advice to business solutions' },
                  { title: 'Client Focus', description: 'Your success is our priority' }
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
              Distinctive capabilities that make JMC LEGAL the preferred choice for complex legal matters
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'International presence across Lebanon, France, UAE, and Saudi Arabia with deep local expertise'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Seasoned legal professionals with decades of experience in complex international matters'
              },
              {
                icon: Target,
                title: 'Strategic Focus',
                description: 'Business-oriented approach that aligns legal strategy with commercial objectives'
              },
              {
                icon: Award,
                title: 'Proven Track Record',
                description: 'Over 30 years of successful outcomes in high-stakes cases and transactions'
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
              International Positioning
            </h2>
            <p className="font-paragraph text-xl text-foreground/90 max-w-4xl mx-auto leading-relaxed mb-12">
              JMC LEGAL occupies a unique position in the international legal landscape, bridging Middle Eastern and European legal systems while maintaining deep expertise in both regions. Our multilingual capabilities and cultural fluency enable us to navigate complex cross-border matters with exceptional effectiveness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                region: 'Middle East',
                description: 'Deep roots and extensive network across Lebanon, UAE, and Saudi Arabia'
              },
              {
                region: 'Europe',
                description: 'Established presence in France with expertise in EU legal frameworks'
              },
              {
                region: 'Cross-Border',
                description: 'Seamless coordination across jurisdictions for complex international matters'
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
