import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ChevronRight, Shield, Globe, FileText, Zap, BarChart3, Lock, AlertCircle, CheckCircle2, Briefcase, Scale } from 'lucide-react';
import { Head } from '@/components/Head';
import { PAGE_METADATA_PRESETS, buildPageMetadata, getProfessionalServiceSchema } from '@/lib/metadata';

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
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function AILegalInfrastructurePage() {
  const pageMetadata = buildPageMetadata({
    ...PAGE_METADATA_PRESETS.aiLegalInfrastructure,
    canonicalUrl: 'https://www.jmclex.com/ai-legal-infrastructure',
    structuredData: getProfessionalServiceSchema({
      name: 'AI Legal Infrastructure & Governance Framework',
      description: 'Enterprise AI governance, legal risk mapping, compliance architecture, and AI Act readiness. Build institutional-grade legal frameworks for artificial intelligence operations.',
      serviceType: 'Legal Technology & AI Governance',
      url: '/ai-legal-infrastructure',
    }),
  });

  return (
    <div>
      <Head metadata={pageMetadata} />
      <Header />
      <div className="min-h-screen bg-primary text-primary-foreground">

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
                <span className="text-sm font-medium text-accent-gold">AI Governance & Legal Infrastructure</span>
              </div>

              <h1 className="font-heading text-6xl lg:text-7xl font-bold leading-tight">
                AI Legal Infrastructure
                <span className="block text-accent-gold">& Governance Framework</span>
              </h1>

              <p className="font-paragraph text-xl lg:text-2xl text-secondary-foreground max-w-3xl leading-relaxed">
                Enterprise AI governance, legal risk mapping, and compliance architecture for organizations deploying artificial intelligence at scale. Build institutional-grade legal frameworks for AI operations, AI Act readiness, and executive AI compliance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <a href="mailto:contact@jmclex.com?subject=AI%20Governance%20Support%20Request">
                <Button className="bg-accent-gold hover:bg-accent-gold/90 text-primary px-8 py-6 text-base font-medium rounded-lg">
                  Request AI Governance Support
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" className="border-accent-gold/50 text-accent-gold hover:bg-accent-gold/10 px-8 py-6 text-base font-medium rounded-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT JMC LEX PROVIDES SECTION */}
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
                What JMC LEX Provides
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl">
                We help organizations build institutional-grade legal and governance structures around artificial intelligence. Our AI governance framework services go beyond general AI awareness to address the specific legal, compliance, and risk management requirements of enterprise AI deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'AI Governance Frameworks',
                  description: 'Institutional-grade governance structures for AI systems, including decision-making protocols, oversight mechanisms, and accountability frameworks aligned with regulatory requirements.',
                },
                {
                  icon: BarChart3,
                  title: 'AI Risk Mapping & Assessment',
                  description: 'Comprehensive legal risk identification for AI implementations, covering regulatory, contractual, operational, and reputational dimensions across jurisdictions.',
                },
                {
                  icon: FileText,
                  title: 'AI Policy Drafting',
                  description: 'Development of institutional AI policies covering internal AI use, vendor management, data governance, and compliance protocols tailored to your organization\'s operations.',
                },
                {
                  icon: CheckCircle2,
                  title: 'AI Act Readiness & Compliance',
                  description: 'Strategic preparation for EU AI Act compliance and similar regulatory frameworks, including risk classification, documentation requirements, and governance alignment.',
                },
                {
                  icon: Briefcase,
                  title: 'Contractual AI Governance',
                  description: 'Legal frameworks for AI vendor relationships, including liability allocation, performance standards, data protection, and compliance obligations in AI service agreements.',
                },
                {
                  icon: Lock,
                  title: 'Executive AI Compliance Support',
                  description: 'Board-level and executive guidance on AI governance, regulatory obligations, risk management, and institutional compliance positioning for artificial intelligence operations.',
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

      {/* BUSINESS USE CASES SECTION */}
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
                Business Use Cases
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl">
                JMC LEX's AI legal infrastructure services address practical scenarios across industries and organizational contexts where artificial intelligence deployment requires institutional legal governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Companies Deploying AI Tools',
                  description: 'Organizations implementing generative AI, machine learning, or AI-powered systems need governance frameworks, risk assessments, and compliance protocols to manage legal exposure and regulatory obligations.',
                },
                {
                  title: 'Legal Departments Using Generative AI',
                  description: 'In-house legal teams adopting AI tools for contract review, legal research, or document analysis require governance policies, vendor management frameworks, and compliance safeguards.',
                },
                {
                  title: 'AI Vendors & SaaS Providers',
                  description: 'Companies offering AI services need contractual governance frameworks, liability structures, compliance documentation, and risk allocation mechanisms for customer relationships.',
                },
                {
                  title: 'Data-Driven Organizations',
                  description: 'Enterprises leveraging data analytics and AI require governance structures for data governance, algorithmic accountability, bias mitigation, and regulatory compliance.',
                },
                {
                  title: 'Regulated Industries',
                  description: 'Financial services, healthcare, and other regulated sectors deploying AI must establish governance frameworks addressing sector-specific compliance, audit requirements, and regulatory expectations.',
                },
                {
                  title: 'Cross-Border AI Operations',
                  description: 'Multinational organizations operating AI systems across jurisdictions need multi-jurisdictional governance frameworks addressing EU AI Act, GDPR, and regional regulatory requirements.',
                },
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-8 rounded-xl bg-secondary/50 border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300"
                >
                  <h3 className="font-heading text-xl font-bold text-accent-gold mb-4">{useCase.title}</h3>
                  <p className="font-paragraph text-secondary-foreground leading-relaxed">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RISK AREAS COVERED SECTION */}
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
                Risk Areas Covered
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl">
                Our AI legal infrastructure framework addresses the comprehensive risk landscape surrounding artificial intelligence deployment, from regulatory compliance to operational governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: AlertCircle,
                  title: 'AI Act & Regulatory Compliance',
                  items: ['EU AI Act risk classification', 'Regulatory documentation requirements', 'Compliance architecture design'],
                },
                {
                  icon: Lock,
                  title: 'GDPR & Data Protection',
                  items: ['AI data governance alignment', 'Privacy impact assessments', 'Data subject rights in AI systems'],
                },
                {
                  icon: Shield,
                  title: 'Cybersecurity & Data Governance',
                  items: ['AI system security frameworks', 'Data governance protocols', 'Access control and audit trails'],
                },
                {
                  icon: Scale,
                  title: 'Bias & Accountability',
                  items: ['Algorithmic bias assessment', 'Accountability mechanisms', 'Fairness and transparency frameworks'],
                },
                {
                  icon: Briefcase,
                  title: 'Contractual Liability',
                  items: ['Vendor liability allocation', 'Performance standards', 'Indemnification frameworks'],
                },
                {
                  icon: FileText,
                  title: 'IP & Confidentiality',
                  items: ['Intellectual property in AI outputs', 'Confidentiality protections', 'Training data ownership'],
                },
                {
                  icon: Globe,
                  title: 'Internal Governance',
                  items: ['AI governance policies', 'Decision-making protocols', 'Oversight mechanisms'],
                },
                {
                  icon: BarChart3,
                  title: 'AI Procurement & Vendor Management',
                  items: ['Vendor selection frameworks', 'Contract negotiation', 'Ongoing compliance monitoring'],
                },
              ].map((riskArea, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-8 rounded-xl bg-primary border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300"
                >
                  <riskArea.icon className="w-10 h-10 text-accent-gold mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-4">{riskArea.title}</h3>
                  <ul className="space-y-2">
                    {riskArea.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-2 flex-shrink-0"></div>
                        <span className="font-paragraph text-sm text-secondary-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXECUTIVE LEGAL INFRASTRUCTURE SECTION */}
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
                Executive Legal Infrastructure for AI
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl">
                JMC LEX helps organizations build comprehensive legal and governance structures around artificial intelligence operations. We go beyond general AI awareness to establish institutional frameworks that address the specific legal, compliance, and risk management requirements of enterprise AI deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                variants={itemVariants}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl font-bold text-accent-gold">Building Institutional AI Governance</h3>
                  <p className="font-paragraph text-secondary-foreground leading-relaxed">
                    Our approach focuses on creating institutional-grade legal infrastructure that supports responsible AI deployment. This includes governance frameworks that establish clear decision-making protocols, accountability mechanisms, and oversight structures tailored to your organization's AI operations and regulatory environment.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    'Institutional AI governance architecture',
                    'Legal framework for AI decision-making',
                    'Compliance and accountability structures',
                    'Risk management and mitigation protocols',
                    'Executive oversight and governance',
                    'Regulatory alignment and documentation',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent-gold mt-1 flex-shrink-0" />
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
                  <h4 className="font-heading text-2xl font-bold">Strategic Positioning</h4>
                  <div className="space-y-4 font-paragraph text-secondary-foreground leading-relaxed">
                    <p>
                      JMC LEX's AI legal infrastructure services provide <span className="text-accent-gold font-semibold">institutional-grade governance support</span> for organizations deploying artificial intelligence at scale.
                    </p>
                    <p>
                      We deliver <span className="text-accent-gold font-semibold">comprehensive legal frameworks</span> and <span className="text-accent-gold font-semibold">compliance architecture</span> that address the specific requirements of enterprise AI operations across jurisdictions.
                    </p>
                    <p>
                      Our focus is on building <span className="text-accent-gold font-semibold">sustainable governance structures</span> that support responsible AI deployment while managing legal exposure and regulatory obligations.
                    </p>
                    <p className="text-sm italic pt-4 border-t border-accent-gold/20">
                      Our services provide strategic advisory and governance support. We do not serve as an official regulatory authority or governmental compliance system. All guidance should be complemented with appropriate professional legal counsel.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-24 bg-secondary/30">
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
                Get Started with AI Legal Infrastructure
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground">
                Connect with our team to discuss your organization's AI governance and compliance requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Request AI Governance Support',
                  description: 'Discuss institutional AI governance frameworks and legal infrastructure for your organization.',
                  href: 'mailto:contact@jmclex.com?subject=AI%20Governance%20Support%20Request',
                },
                {
                  title: 'Discuss AI Legal Infrastructure',
                  description: 'Explore comprehensive legal and governance structures for enterprise AI deployment.',
                  href: 'mailto:contact@jmclex.com?subject=AI%20Legal%20Infrastructure%20Discussion',
                },
                {
                  title: 'Request Policy Review',
                  description: 'Have our team review your AI policies and governance frameworks.',
                  href: 'mailto:contact@jmclex.com?subject=AI%20Policy%20Review%20Request',
                },
              ].map((cta, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-8 rounded-xl bg-primary border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300"
                >
                  <h3 className="font-heading text-lg font-bold mb-3">{cta.title}</h3>
                  <p className="font-paragraph text-secondary-foreground text-sm mb-6">{cta.description}</p>
                  <a href={cta.href}>
                    <button className="inline-flex items-center gap-2 text-accent-gold hover:gap-3 transition-all font-medium text-sm">
                      Get in Touch
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLOSING STATEMENT SECTION */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold">
              Premium AI Legal Infrastructure & Governance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="p-8 rounded-xl bg-secondary/50 border border-accent-gold/20">
                <h3 className="font-heading text-xl font-bold text-accent-gold mb-4">Our Approach</h3>
                <p className="font-paragraph text-secondary-foreground leading-relaxed">
                  JMC LEX provides institutional-grade AI legal infrastructure and governance frameworks for organizations deploying artificial intelligence. We help build comprehensive legal structures that address regulatory compliance, risk management, and governance requirements.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-secondary/50 border border-accent-gold/20">
                <h3 className="font-heading text-xl font-bold text-accent-gold mb-4">Our Commitment</h3>
                <p className="font-paragraph text-secondary-foreground leading-relaxed">
                  We deliver premium, legally cautious advisory support focused on building sustainable governance structures for enterprise AI operations. Our guidance emphasizes institutional responsibility and regulatory alignment.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-accent-gold/20">
              <p className="font-paragraph text-sm text-secondary-foreground italic">
                JMC LEX provides strategic advisory and governance support for AI legal infrastructure. Our services do not serve as an official regulatory authority or governmental compliance system. All guidance is advisory in nature and should be complemented with appropriate professional legal counsel tailored to your specific jurisdiction and circumstances.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
