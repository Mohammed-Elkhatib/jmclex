import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, Shield, Globe, FileText, Zap, BarChart3, Lock } from 'lucide-react';

export default function AILegalInfrastructurePage() {
  const [activeTab, setActiveTab] = useState('intelligence');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden pt-20 pb-24">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent-gold/30 bg-accent-gold/5">
                <Zap className="w-4 h-4 text-accent-gold" />
                <span className="text-sm font-medium text-accent-gold">Strategic Intelligence Platform</span>
              </div>

              <h1 className="font-heading text-6xl lg:text-7xl font-bold leading-tight">
                AI Legal & Compliance
                <span className="block text-accent-gold">Infrastructure</span>
              </h1>

              <p className="font-paragraph text-xl lg:text-2xl text-secondary-foreground max-w-3xl leading-relaxed">
                AI-enhanced legal intelligence, compliance strategy, and cross-border risk awareness for international organizations and business operations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Link to="/consultation">
                <Button className="bg-accent-gold hover:bg-accent-gold/90 text-primary px-8 py-6 text-base font-medium rounded-lg">
                  Request Strategic Consultation
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-accent-gold/50 text-accent-gold hover:bg-accent-gold/10 px-8 py-6 text-base font-medium rounded-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI LEGAL INTELLIGENCE SECTION */}
      <section className="w-full py-24 bg-secondary/30">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-16"
          >
            <div className="space-y-4">
              <h2 className="font-heading text-5xl lg:text-6xl font-bold">
                AI-Enhanced Legal Intelligence & Strategic Analysis
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground max-w-2xl">
                Sophisticated document analysis, contract intelligence, and strategic risk assessment for international legal operations and cross-border business environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: 'Contract Intelligence & Analysis',
                  description: 'AI-enhanced contract review identifying strategic implications, risk factors, and compliance requirements across multiple jurisdictions with institutional-grade analysis.',
                },
                {
                  icon: Shield,
                  title: 'Legal Risk Assessment & Mitigation',
                  description: 'Systematic identification and strategic assessment of contractual, operational, and regulatory risks with executive-level mitigation recommendations.',
                },
                {
                  icon: Globe,
                  title: 'Multilingual Legal Document Review',
                  description: 'Cross-border document analysis with multilingual support for international transactions, ensuring compliance awareness across jurisdictions.',
                },
                {
                  icon: BarChart3,
                  title: 'Strategic Legal Intelligence',
                  description: 'Advanced analysis of legal implications for international business operations, M&A transactions, and cross-border strategic initiatives.',
                },
                {
                  icon: Zap,
                  title: 'AI-Assisted Legal Analysis',
                  description: 'Sophisticated artificial intelligence support for comprehensive legal document analysis, pattern recognition, and strategic advisory insights.',
                },
                {
                  icon: Lock,
                  title: 'Sanctions & Compliance Awareness',
                  description: 'Strategic awareness of international regulatory requirements, sanctions frameworks, and compliance obligations across operating jurisdictions.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-8 rounded-xl bg-primary border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300"
                >
                  <item.icon className="w-12 h-12 text-accent-gold mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                  <p className="font-paragraph text-secondary-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMPLIANCE & GOVERNANCE SECTION */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-16"
          >
            <div className="space-y-4">
              <h2 className="font-heading text-5xl lg:text-6xl font-bold">
                Compliance Infrastructure & Governance Intelligence
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground max-w-2xl">
                Enterprise-grade compliance advisory, governance strategy, and regulatory intelligence for sophisticated international organizations and cross-border operations.
              </p>\n            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                variants={itemVariants}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl font-bold text-accent-gold">Enterprise Compliance & Governance Framework</h3>
                  <p className="font-paragraph text-secondary-foreground leading-relaxed">
                    Institutional-grade governance strategy and compliance-oriented advisory infrastructure tailored to multinational organizations. Our platform delivers strategic awareness of regulatory requirements, compliance obligations, and governance frameworks across multiple jurisdictions with executive-level sophistication.
                  </p>\n                </div>

                <div className="space-y-6">
                  {[
                    'Board-Level Governance Strategy & Intelligence',
                    'Enterprise Compliance Infrastructure & Framework',
                    'International Business Risk Assessment & Mitigation',
                    'Regulatory Intelligence & Compliance Awareness',
                    'Cross-Border Operational Risk Management',
                    'Executive-Level Strategic Risk Assessment',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-gold mt-2 flex-shrink-0"></div>
                      <span className="font-paragraph text-secondary-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-secondary/50 rounded-xl p-12 border border-accent-gold/20"
              >
                <div className="space-y-6">
                  <h4 className="font-heading text-2xl font-bold">Advisory Positioning</h4>
                  <div className="space-y-4 font-paragraph text-secondary-foreground leading-relaxed">
                    <p>
                      Our compliance infrastructure operates as a <span className="text-accent-gold font-semibold">strategic advisory platform</span>, providing intelligence and awareness support for international organizations.
                    </p>
                    <p>
                      We deliver <span className="text-accent-gold font-semibold">governance intelligence</span> and <span className="text-accent-gold font-semibold">regulatory awareness</span> to support informed decision-making across jurisdictions.
                    </p>
                    <p className="text-sm italic">
                      Our platform provides strategic advisory and intelligence support. We do not serve as an official regulatory authority, governmental compliance system, or sanctions administrator.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTERNATIONAL BUSINESS INTELLIGENCE SECTION */}
      <section className="w-full py-24 bg-secondary/30">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-16"
          >
            <div className="space-y-4">
              <h2 className="font-heading text-5xl lg:text-6xl font-bold">
                International Business Intelligence & Strategic Advisory
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground max-w-2xl">
                Executive-level strategic support for complex international operations, cross-border transactions, and multinational business architecture.
              </p>\n            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'International Corporate Architecture',
                  items: [
                    'Multinational entity structuring strategy',
                    'Multi-jurisdictional governance frameworks',
                    'Strategic business organization & optimization',
                  ],
                },
                {
                  title: 'Cross-Border Operations & Transactions',
                  items: [
                    'International transaction analysis & strategy',
                    'Cross-border commercial relationship advisory',
                    'Business-sensitive legal intelligence & support',
                  ],
                },
                {
                  title: 'Strategic M&A & Deal Advisory',
                  items: [
                    'International M&A strategic positioning',
                    'Cross-border deal structure & intelligence',
                    'Transaction risk assessment & mitigation',
                  ],
                },
                {
                  title: 'Executive Governance & Risk Management',
                  items: [
                    'Board-level strategic advisory & positioning',
                    'International compliance & governance frameworks',
                    'Executive-level risk assessment & strategy',
                  ],
                },
              ].map((section, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-8 rounded-xl bg-primary border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300"
                >
                  <h3 className="font-heading text-xl font-bold text-accent-gold mb-6">{section.title}</h3>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                        <span className="font-paragraph text-secondary-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXECUTIVE CTA SECTION */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-16"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="font-heading text-5xl lg:text-6xl font-bold">
                Strategic Advisory Services
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground">
                Connect with our international legal intelligence team to discuss your organization's compliance and strategic needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Request Strategic Consultation',
                  description: 'Discuss AI-enhanced legal intelligence and compliance strategy for your organization.',
                  href: '/consultation',
                },
                {
                  title: 'Request Executive Review',
                  description: 'Board-level strategic advisory on international legal and compliance matters.',
                  href: '/consultation',
                },
                {
                  title: 'Discuss Cross-Border Operations',
                  description: 'Strategic support for international business operations and multi-jurisdictional matters.',
                  href: '/contact',
                },
                {
                  title: 'Request Compliance Assessment',
                  description: 'Comprehensive governance and compliance intelligence assessment.',
                  href: '/consultation',
                },
                {
                  title: 'Schedule International Advisory',
                  description: 'Executive-level consultation on international legal and business strategy.',
                  href: '/consultation',
                },
                {
                  title: 'Connect with Our Team',
                  description: 'Reach out to discuss your specific legal intelligence and compliance needs.',
                  href: '/contact',
                },
              ].map((cta, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-8 rounded-xl bg-secondary/50 border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300"
                >
                  <h3 className="font-heading text-lg font-bold mb-3">{cta.title}</h3>
                  <p className="font-paragraph text-secondary-foreground text-sm mb-6">{cta.description}</p>
                  <Link to={cta.href}>
                    <button className="inline-flex items-center gap-2 text-accent-gold hover:gap-3 transition-all font-medium text-sm">
                      Learn More
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* POSITIONING STATEMENT SECTION */}
      <section className="w-full py-24 bg-secondary/30">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold">
              Premium International Legal Intelligence Platform
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="p-8 rounded-xl bg-primary border border-accent-gold/20">
                <h3 className="font-heading text-xl font-bold text-accent-gold mb-4">Our Positioning</h3>
                <p className="font-paragraph text-secondary-foreground leading-relaxed">
                  JMC LEX operates as a premium international legal intelligence platform, delivering strategic advisory and compliance awareness to sophisticated international organizations.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-primary border border-accent-gold/20">
                <h3 className="font-heading text-xl font-bold text-accent-gold mb-4">Strategic Ecosystem</h3>
                <p className="font-paragraph text-secondary-foreground leading-relaxed">
                  Our AI-enhanced infrastructure supports compliance-aware international advisory, governance intelligence, and strategic legal support across jurisdictions.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-accent-gold/20">
              <p className="font-paragraph text-sm text-secondary-foreground italic">
                JMC LEX provides strategic advisory and intelligence support for international legal and compliance matters. Our platform does not serve as an official regulatory authority, governmental compliance system, or sanctions administrator. All services are advisory in nature and should be complemented with appropriate professional legal counsel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
