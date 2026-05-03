import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Target, TrendingUp, Shield, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StrategicAdvisoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_2496c314ec964c86a57c5db7e35b9143~mv2.png?originWidth=1152&originHeight=576"
            alt="Strategic legal advisory"
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
            Strategic Legal Advisory
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Navigating complex legal environments with precision and strategic foresight
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
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
                Your Strategic Legal Partner
              </h2>
              <p className="font-paragraph text-lg text-foreground/90 mb-6 leading-relaxed">
                JMC LEGAL provides comprehensive strategic legal advisory services for CEOs, investors, and international companies operating in complex, multi-jurisdictional environments. Our approach combines deep legal expertise with business acumen and geopolitical awareness.
              </p>
              <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
                We don't just provide legal opinions—we deliver strategic roadmaps that align legal compliance with business objectives, risk mitigation, and growth opportunities across borders.
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
                src="https://static.wixstatic.com/media/5e1235_ab69222d71cf4b439c6da7df3724f0fa~mv2.png?originWidth=768&originHeight=448"
                alt="Strategic advisory services"
                className="w-full h-full object-cover rounded"
              />
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
            {[
              {
                icon: Target,
                title: 'Cross-Border Transactions',
                description: 'Strategic guidance for international mergers, acquisitions, joint ventures, and corporate restructuring across multiple jurisdictions.'
              },
              {
                icon: Shield,
                title: 'Compliance & Risk Management',
                description: 'Comprehensive compliance frameworks for sanctions, anti-money laundering, data protection, and regulatory requirements.'
              },
              {
                icon: TrendingUp,
                title: 'Business Expansion Strategy',
                description: 'Legal structuring and strategic planning for market entry, expansion, and operations in new jurisdictions.'
              },
              {
                icon: Globe,
                title: 'Geopolitical Legal Analysis',
                description: 'Expert analysis of how geopolitical developments impact legal frameworks, business operations, and strategic decisions.'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-optional-navy p-10 rounded"
              >
                <service.icon className="w-14 h-14 text-accent-gold mb-6" />
                <h3 className="font-heading text-3xl text-foreground mb-4">{service.title}</h3>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Approach Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-optional-navy p-16 rounded mb-32"
          >
            <h2 className="font-heading text-5xl text-foreground mb-12 text-center">
              Our Strategic Approach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  number: '01',
                  title: 'Deep Analysis',
                  description: 'Comprehensive assessment of legal landscape, risks, and opportunities across all relevant jurisdictions.'
                },
                {
                  number: '02',
                  title: 'Strategic Planning',
                  description: 'Development of tailored legal strategies aligned with business objectives and risk tolerance.'
                },
                {
                  number: '03',
                  title: 'Execution Support',
                  description: 'Hands-on guidance through implementation, with ongoing monitoring and adjustment as needed.'
                }
              ].map((step) => (
                <div key={step.number}>
                  <div className="text-accent-gold font-heading text-6xl mb-4">{step.number}</div>
                  <h3 className="font-heading text-2xl text-foreground mb-4">{step.title}</h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px]"
            >
              <Image
                src="https://static.wixstatic.com/media/5e1235_2b340b71e3564a0b8fcc507635e55415~mv2.png?originWidth=768&originHeight=576"
                alt="Why choose JMC Legal"
                className="w-full h-full object-cover rounded"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-5xl text-foreground mb-8">
                Why Choose JMC LEGAL
              </h2>
              <ul className="space-y-6">
                {[
                  'Multi-jurisdictional expertise across Lebanon, France, UAE, and Saudi Arabia',
                  'Deep understanding of Middle Eastern and European legal frameworks',
                  'Experience with complex cross-border transactions and disputes',
                  'Strategic focus beyond pure legal compliance',
                  'Multilingual capabilities (English, French, Arabic, and more)',
                  'Established network of international legal partners',
                  'Proven track record since 1990'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                    <p className="font-paragraph text-lg text-foreground/90">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
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
              Ready to Discuss Your Strategic Needs?
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 mb-12 max-w-3xl mx-auto">
              Schedule a confidential consultation to explore how our strategic legal advisory can support your business objectives.
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-10 py-5 rounded text-lg transition-all hover:scale-105"
            >
              Book Strategic Consultation <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
