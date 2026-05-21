import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, CheckCircle2, Mail, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

const ExecutiveInternationalContractsPage = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('corporate-governance');
  const [activeService, setActiveService] = useState<string | null>(null);
  const contractsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 'corporate-governance',
      title: 'Corporate Governance',
      items: [
        'Shareholder Agreements',
        'Board Governance Frameworks',
        'Fiduciary Compliance',
        'Executive Compensation Structures',
        'Corporate Governance Policies'
      ]
    },
    {
      id: 'international-business',
      title: 'International Business',
      items: [
        'International Commercial Agreements',
        'Joint Venture Structures',
        'M&A Frameworks',
        'Cross-Border Operations',
        'Distribution Agreements'
      ]
    },
    {
      id: 'compliance-regulatory',
      title: 'Compliance & Regulatory',
      items: [
        'Compliance Audit Frameworks',
        'AML / KYC Governance',
        'Regulatory Mapping',
        'Internal Investigation Protocols',
        'Risk Management Structures'
      ]
    },
    {
      id: 'sanctions-export',
      title: 'Sanctions & Export Controls',
      items: [
        'OFAC Compliance',
        'EU Sanctions',
        'UK Export Controls',
        'Trade Compliance',
        'Supply Chain Compliance'
      ]
    },
    {
      id: 'aerospace-defense',
      title: 'Aerospace & Defense',
      items: [
        'ITAR Compliance',
        'EAR Compliance',
        'Aerospace Supply Agreements',
        'Defense Procurement Frameworks',
        'Export Control Documentation'
      ]
    },
    {
      id: 'executive-support',
      title: 'Executive Legal Support',
      items: [
        'Contract Review',
        'Customized Drafting',
        'Strategic Legal Structuring',
        'Cross-Border Advisory',
        'Executive Compliance Assistance'
      ]
    }
  ];

  const featuredContracts = [
    {
      id: 1,
      name: 'International Commercial Agreement Framework',
      overview: 'Comprehensive framework for cross-border commercial transactions with regulatory compliance',
      industries: 'Technology, Manufacturing, Trade',
      businessUse: 'International B2B Transactions',
      version: 'v2.3',
      lastUpdated: 'May 2026'
    },
    {
      id: 2,
      name: 'Joint Venture Governance Structure',
      overview: 'Strategic JV framework with clear governance, profit allocation, and exit mechanisms',
      industries: 'Energy, Infrastructure, Real Estate',
      businessUse: 'Strategic Partnerships',
      version: 'v1.8',
      lastUpdated: 'April 2026'
    },
    {
      id: 3,
      name: 'AML/KYC Compliance Framework',
      overview: 'Institutional-grade AML/KYC governance aligned with FATF and international standards',
      industries: 'Finance, Banking, Investment',
      businessUse: 'Regulatory Compliance',
      version: 'v3.1',
      lastUpdated: 'May 2026'
    },
    {
      id: 4,
      name: 'OFAC Sanctions Compliance Protocol',
      overview: 'Comprehensive OFAC compliance framework with screening, monitoring, and documentation',
      industries: 'All Regulated Industries',
      businessUse: 'Export Control & Sanctions',
      version: 'v2.5',
      lastUpdated: 'May 2026'
    }
  ];

  const steps = [
    { number: '01', title: 'Browse Contracts', description: 'Explore our comprehensive contract library and frameworks' },
    { number: '02', title: 'Review Framework Details', description: 'Understand scope, compliance requirements, and applicability' },
    { number: '03', title: 'Request Executive Support', description: 'Connect with our legal team for strategic guidance' },
    { number: '04', title: 'Discuss Your Needs', description: 'Detailed consultation on customization and implementation' },
    { number: '05', title: 'Receive Documentation', description: 'Customized contracts and compliance frameworks' },
    { number: '06', title: 'Local Legal Validation', description: 'Final review with your local counsel' }
  ];

  const services = [
    {
      id: 'contract-drafting',
      title: 'Contract Drafting',
      description: 'Bespoke contract creation tailored to your international business requirements and regulatory environment'
    },
    {
      id: 'contract-review',
      title: 'Contract Review',
      description: 'Strategic analysis of existing agreements with risk assessment and optimization recommendations'
    },
    {
      id: 'compliance-reviews',
      title: 'Compliance Reviews',
      description: 'Comprehensive compliance audits across regulatory frameworks and jurisdictions'
    },
    {
      id: 'governance-structuring',
      title: 'Governance Structuring',
      description: 'Design of optimal corporate governance frameworks for international operations'
    },
    {
      id: 'sanctions-export',
      title: 'Sanctions & Export Control Support',
      description: 'Expert guidance on OFAC, EU sanctions, and export control compliance'
    },
    {
      id: 'aerospace-compliance',
      title: 'Aerospace Compliance',
      description: 'Specialized ITAR and EAR compliance for aerospace and defense sectors'
    },
    {
      id: 'aml-kyc',
      title: 'AML/KYC Governance',
      description: 'Institutional-grade anti-money laundering and know-your-customer frameworks'
    },
    {
      id: 'international-structuring',
      title: 'International Business Structuring',
      description: 'Strategic structuring of cross-border operations and international entities'
    },
    {
      id: 'cross-border-advisory',
      title: 'Cross-Border Advisory',
      description: 'Expert guidance on multi-jurisdictional legal and regulatory requirements'
    },
    {
      id: 'executive-support',
      title: 'Executive Legal Support',
      description: 'Dedicated legal advisory for C-suite executives and board-level decision-making'
    }
  ];

  const engagementModels = [
    {
      title: 'Standard Framework Access',
      description: 'Downloadable executive templates and informational resources',
      features: ['Template Library Access', 'Documentation Guides', 'Compliance Checklists', 'Fixed-Fee Access'],
      price: 'Starting at €2,500'
    },
    {
      title: 'Executive Review & Customization',
      description: 'Strategic adaptation with compliance alignment and executive review',
      features: ['Framework Customization', 'Compliance Alignment', 'Executive Review', 'Implementation Support'],
      price: 'Starting at €7,500',
      featured: true
    },
    {
      title: 'Bespoke International Structuring',
      description: 'Fully customized drafting with cross-border structuring and advisory',
      features: ['Full Custom Drafting', 'Cross-Border Structuring', 'Executive Advisory', 'Ongoing Support'],
      price: 'Custom Pricing'
    }
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* SECTION 1: HERO */}
      <section className="w-full bg-gradient-to-br from-optional-navy via-optional-navy to-navy-light py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="font-heading text-5xl md:text-7xl text-white leading-tight">
              Executive International Contracts & Compliance
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-secondary-foreground max-w-3xl mx-auto leading-relaxed">
              Strategic international legal frameworks, governance documentation, compliance structures, and cross-border executive support for modern global operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={() => scrollToSection(contractsRef)}
                className="bg-accent-gold hover:bg-accent-gold-dark text-optional-navy font-semibold px-8 py-3 h-auto text-base"
              >
                Browse Contracts
              </Button>
              <Button
                onClick={() => scrollToSection(servicesRef)}
                variant="outline"
                className="border-2 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-optional-navy font-semibold px-8 py-3 h-auto text-base"
              >
                Request Executive Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CONTRACT NAVIGATION CENTER */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-optional-navy mb-12">
              Contract Navigation Center
            </h2>
            <p className="font-paragraph text-lg text-text-muted mb-12 max-w-2xl">
              Explore our comprehensive library of international legal frameworks and compliance documentation.
            </p>

            <div className="space-y-3">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  className="border border-border-light rounded-lg overflow-hidden"
                  initial={false}
                >
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition-colors"
                  >
                    <span className="font-heading text-lg text-optional-navy">{category.title}</span>
                    <motion.div
                      animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-accent-gold" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedCategory === category.id ? 'auto' : 0,
                      opacity: expandedCategory === category.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-secondary space-y-2 border-t border-border-light">
                      {category.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-3 py-2 cursor-pointer hover:translate-x-1 transition-transform"
                        >
                          <div className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                          <span className="font-paragraph text-text-secondary">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: FEATURED CONTRACTS */}
      <section ref={contractsRef} className="w-full py-20 md:py-28 px-4 md:px-8 bg-secondary">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-optional-navy mb-4">
                Featured Contracts & Frameworks
              </h2>
              <p className="font-paragraph text-lg text-text-muted max-w-2xl">
                Premium international legal frameworks designed for executive-level compliance and governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredContracts.map((contract, idx) => (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-border-light rounded-lg p-8 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-heading text-xl text-optional-navy mb-3">{contract.name}</h3>
                  <p className="font-paragraph text-text-secondary mb-6 leading-relaxed">{contract.overview}</p>

                  <div className="space-y-3 mb-6 pb-6 border-b border-border-light">
                    <div>
                      <span className="font-paragraph text-sm text-text-muted">Industries:</span>
                      <p className="font-paragraph text-text-secondary">{contract.industries}</p>
                    </div>
                    <div>
                      <span className="font-paragraph text-sm text-text-muted">Business Use:</span>
                      <p className="font-paragraph text-text-secondary">{contract.businessUse}</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="font-paragraph text-sm text-text-muted">Version:</span>
                        <p className="font-paragraph text-text-secondary">{contract.version}</p>
                      </div>
                      <div>
                        <span className="font-paragraph text-sm text-text-muted">Updated:</span>
                        <p className="font-paragraph text-text-secondary">{contract.lastUpdated}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1 border-optional-navy text-optional-navy hover:bg-optional-navy hover:text-white">
                      View Details
                    </Button>
                    <Button className="flex-1 bg-accent-gold hover:bg-accent-gold-dark text-optional-navy">
                      Request Review
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-optional-navy mb-4">
                How It Works
              </h2>
              <p className="font-paragraph text-lg text-text-muted max-w-2xl">
                A streamlined process designed for executive efficiency and compliance excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-4">
                      <span className="font-heading text-5xl text-accent-gold">{step.number}</span>
                      <h3 className="font-heading text-xl text-optional-navy">{step.title}</h3>
                    </div>
                    <p className="font-paragraph text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-accent-gold opacity-30" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: EXECUTIVE SERVICES */}
      <section ref={servicesRef} className="w-full py-20 md:py-28 px-4 md:px-8 bg-secondary">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-optional-navy mb-4">
                Available Executive Legal & Compliance Services
              </h2>
              <p className="font-paragraph text-lg text-text-muted max-w-2xl">
                Comprehensive legal support tailored for international business operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  className="bg-white border border-border-light rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-heading text-lg text-optional-navy flex-1">{service.title}</h3>
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 transition-colors ${activeService === service.id ? 'text-accent-gold' : 'text-border-light'}`} />
                    </div>
                    <p className="font-paragraph text-text-secondary text-sm leading-relaxed">{service.description}</p>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-accent-gold hover:text-accent-gold-dark hover:bg-transparent p-0 h-auto"
                    >
                      Request Support
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: ENGAGEMENT MODELS */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-optional-navy mb-4">
                Engagement Models
              </h2>
              <p className="font-paragraph text-lg text-text-muted max-w-2xl">
                Flexible engagement structures designed for your specific needs and scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {engagementModels.map((model, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-lg p-8 transition-all ${
                    model.featured
                      ? 'bg-optional-navy text-white border-2 border-accent-gold shadow-lg scale-105'
                      : 'bg-secondary border border-border-light'
                  }`}
                >
                  <h3 className={`font-heading text-2xl mb-2 ${model.featured ? 'text-accent-gold' : 'text-optional-navy'}`}>
                    {model.title}
                  </h3>
                  <p className={`font-paragraph text-sm mb-6 ${model.featured ? 'text-secondary-foreground' : 'text-text-muted'}`}>
                    {model.description}
                  </p>

                  <div className="space-y-3 mb-8 pb-8 border-b border-opacity-20" style={{ borderColor: model.featured ? 'white' : 'currentColor' }}>
                    {model.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${model.featured ? 'bg-accent-gold' : 'bg-accent-gold'}`} />
                        <span className={`font-paragraph text-sm ${model.featured ? 'text-secondary-foreground' : 'text-text-secondary'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <p className={`font-heading text-lg ${model.featured ? 'text-accent-gold' : 'text-optional-navy'}`}>
                      {model.price}
                    </p>
                    <Button
                      className={`w-full ${
                        model.featured
                          ? 'bg-accent-gold hover:bg-accent-gold-dark text-optional-navy'
                          : 'bg-optional-navy hover:bg-navy-light text-white'
                      }`}
                    >
                      Get Started
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: EXECUTIVE INQUIRY FORM */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-secondary">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="font-heading text-4xl md:text-5xl text-optional-navy">
                Executive Inquiry Form
              </h2>
              <p className="font-paragraph text-lg text-text-muted">
                Connect with our legal team for strategic guidance and customized solutions.
              </p>
            </div>

            <form className="bg-white rounded-lg p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-paragraph text-sm font-medium text-optional-navy">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-paragraph text-sm font-medium text-optional-navy">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-paragraph text-sm font-medium text-optional-navy">Country</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    placeholder="Country"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-paragraph text-sm font-medium text-optional-navy">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-paragraph text-sm font-medium text-optional-navy">Industry</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    placeholder="Your industry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-paragraph text-sm font-medium text-optional-navy">Requested Framework</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    placeholder="Contract or framework"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-paragraph text-sm font-medium text-optional-navy">Type of Assistance Needed</label>
                <select className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold">
                  <option>Select assistance type</option>
                  <option>Contract Review</option>
                  <option>Customized Drafting</option>
                  <option>Compliance Review</option>
                  <option>Strategic Structuring</option>
                  <option>Executive Consultation</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-paragraph text-sm font-medium text-optional-navy">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold resize-none"
                  placeholder="Describe your needs and requirements..."
                />
              </div>

              <div className="bg-secondary-dark bg-opacity-50 rounded-lg p-4 border border-border-light">
                <p className="font-paragraph text-sm text-text-secondary">
                  <span className="font-semibold text-optional-navy">Confidentiality Notice:</span> All strategic exchanges remain strictly confidential and are protected by attorney-client privilege considerations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-accent-gold hover:bg-accent-gold-dark text-optional-navy font-semibold py-3 h-auto">
                  Submit Request
                </Button>
                <Button variant="outline" className="flex-1 border-optional-navy text-optional-navy hover:bg-optional-navy hover:text-white font-semibold py-3 h-auto">
                  Request Consultation
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: LEGAL & REGULATORY DISCLOSURES */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-optional-navy">
              Legal & Regulatory Disclosures
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-accent-gold pl-6 py-2">
                <h3 className="font-heading text-lg text-optional-navy mb-2">Informational Purpose</h3>
                <p className="font-paragraph text-text-secondary">
                  All materials provided are for informational purposes only and do not constitute legal advice.
                </p>
              </div>

              <div className="border-l-4 border-accent-gold pl-6 py-2">
                <h3 className="font-heading text-lg text-optional-navy mb-2">No Attorney-Client Relationship</h3>
                <p className="font-paragraph text-text-secondary">
                  Use of these materials does not establish an attorney-client relationship unless explicitly agreed in writing.
                </p>
              </div>

              <div className="border-l-4 border-accent-gold pl-6 py-2">
                <h3 className="font-heading text-lg text-optional-navy mb-2">Local Legal Validation Required</h3>
                <p className="font-paragraph text-text-secondary">
                  All frameworks must be reviewed and validated by qualified local counsel in your jurisdiction before implementation.
                </p>
              </div>

              <div className="border-l-4 border-accent-gold pl-6 py-2">
                <h3 className="font-heading text-lg text-optional-navy mb-2">Limitation of Liability</h3>
                <p className="font-paragraph text-text-secondary">
                  JMC LEX shall not be liable for any indirect, incidental, or consequential damages arising from use of these materials.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-gradient-to-br from-optional-navy via-optional-navy to-navy-light">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight">
              Discuss Your International Legal & Compliance Needs
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground leading-relaxed">
              Connect with JMC LEX for strategic international legal support, governance structuring, compliance advisory, and executive documentation assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="bg-accent-gold hover:bg-accent-gold-dark text-optional-navy font-semibold px-8 py-3 h-auto text-base">
                Contact Executive Team
              </Button>
              <Button
                variant="outline"
                className="border-2 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-optional-navy font-semibold px-8 py-3 h-auto text-base"
              >
                Request Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExecutiveInternationalContractsPage;
