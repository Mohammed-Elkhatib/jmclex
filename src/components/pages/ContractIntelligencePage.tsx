import { useState, useMemo } from 'react';
import { ChevronDown, Search, Filter, TrendingUp, Award, Clock, Users, Shield, Globe, Zap, BookOpen, Lock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

const RESOURCE_CATEGORIES = [
  'Corporate & Governance',
  'Commercial Contracts',
  'International Business',
  'Compliance & Regulatory',
  'Technology & AI',
  'Employment & HR',
  'Finance & Banking',
  'Industrial / Aerospace / Defense',
];

const PREMIUM_RESOURCES = [
  {
    id: 1,
    title: 'International Shareholder Agreement Framework',
    category: 'Corporate & Governance',
    summary: 'Comprehensive multi-jurisdictional shareholder agreement template with cross-border governance provisions.',
    businessUse: 'Establishing shareholder rights, obligations, and dispute resolution mechanisms in international ventures.',
    industries: 'Private Equity, Venture Capital, International Joint Ventures',
    compliance: 'Compliant with UNCITRAL Model Law, EU Directives, and common law jurisdictions.',
    complexity: 'Advanced',
    relevance: 'High - Essential for cross-border equity structures',
    pricing: 'Custom Quote',
    version: 'v2.1',
    lastUpdated: '2026-05-15',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 2,
    title: 'Cross-Border M&A Due Diligence Checklist',
    category: 'Commercial Contracts',
    summary: 'Executive-level due diligence framework covering regulatory, financial, and operational compliance across jurisdictions.',
    businessUse: 'Streamlining acquisition processes and identifying material risks in international transactions.',
    industries: 'Investment Banking, Corporate Development, Strategic Acquisitions',
    compliance: 'Aligned with FATCA, GDPR, AML/KYC requirements.',
    complexity: 'Advanced',
    relevance: 'Critical - Reduces transaction risk and regulatory exposure',
    pricing: 'Custom Quote',
    version: 'v3.0',
    lastUpdated: '2026-05-18',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 3,
    title: 'International Supply Chain Compliance Framework',
    category: 'International Business',
    summary: 'Strategic documentation for managing supply chain compliance across multiple jurisdictions and regulatory regimes.',
    businessUse: 'Establishing supplier governance, sanctions compliance, and supply chain resilience protocols.',
    industries: 'Manufacturing, Logistics, Retail, Automotive',
    compliance: 'OFAC, EU Sanctions, UK Export Controls, ISO 27001.',
    complexity: 'Advanced',
    relevance: 'Critical - Mandatory for international operations',
    pricing: 'Custom Quote',
    version: 'v2.3',
    lastUpdated: '2026-05-10',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 4,
    title: 'GDPR & International Data Protection Compliance Manual',
    category: 'Compliance & Regulatory',
    summary: 'Comprehensive governance framework for international data protection, privacy, and cross-border data transfers.',
    businessUse: 'Implementing compliant data governance, privacy policies, and international data transfer mechanisms.',
    industries: 'Technology, Financial Services, Healthcare, E-commerce',
    compliance: 'GDPR, CCPA, LGPD, PIPEDA, and emerging privacy regimes.',
    complexity: 'Advanced',
    relevance: 'Critical - Essential for international digital operations',
    pricing: 'Custom Quote',
    version: 'v2.5',
    lastUpdated: '2026-05-12',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 5,
    title: 'AI & Algorithmic Governance Framework',
    category: 'Technology & AI',
    summary: 'Executive governance framework for AI deployment, algorithmic accountability, and emerging AI regulation compliance.',
    businessUse: 'Establishing responsible AI governance, bias mitigation, and regulatory compliance for AI-driven operations.',
    industries: 'Financial Services, Healthcare, Technology, Automotive',
    compliance: 'EU AI Act, NIST AI RMF, emerging global AI standards.',
    complexity: 'Advanced',
    relevance: 'High - Critical for emerging AI-driven business models',
    pricing: 'Custom Quote',
    version: 'v1.8',
    lastUpdated: '2026-05-20',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 6,
    title: 'International Executive Employment Agreement',
    category: 'Employment & HR',
    summary: 'Premium executive employment contract with international mobility, tax optimization, and multi-jurisdictional compliance.',
    businessUse: 'Recruiting and retaining international executive talent with compliant compensation and benefits structures.',
    industries: 'Corporate, Private Equity, Executive Search, Multinational Enterprises',
    compliance: 'Compliant with employment law across major jurisdictions.',
    complexity: 'Intermediate',
    relevance: 'High - Essential for international talent management',
    pricing: 'Custom Quote',
    version: 'v2.0',
    lastUpdated: '2026-05-08',
    institutionalUse: false,
    accessLevel: 'Standard',
  },
  {
    id: 7,
    title: 'International Banking & Finance Compliance Framework',
    category: 'Finance & Banking',
    summary: 'Strategic documentation for international banking operations, sanctions compliance, and financial regulatory governance.',
    businessUse: 'Establishing compliant banking relationships, international fund transfers, and financial regulatory protocols.',
    industries: 'Banking, Investment Management, Private Wealth, Corporate Finance',
    compliance: 'Basel III, FATCA, AML/KYC, OFAC, EU Banking Directives.',
    complexity: 'Advanced',
    relevance: 'Critical - Mandatory for international financial operations',
    pricing: 'Custom Quote',
    version: 'v3.2',
    lastUpdated: '2026-05-14',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 8,
    title: 'Defense & Aerospace Procurement Compliance Framework',
    category: 'Industrial / Aerospace / Defense',
    summary: 'Specialized governance framework for defense contracting, export controls, and aerospace regulatory compliance.',
    businessUse: 'Managing defense contracts, export licenses, and compliance with ITAR, EAR, and international defense regulations.',
    industries: 'Aerospace, Defense Contracting, Advanced Manufacturing',
    compliance: 'ITAR, EAR, DCSA, NATO Security Requirements.',
    complexity: 'Advanced',
    relevance: 'Critical - Essential for defense sector operations',
    pricing: 'Custom Quote',
    version: 'v2.7',
    lastUpdated: '2026-05-11',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 9,
    title: 'International Joint Venture Agreement',
    category: 'Corporate & Governance',
    summary: 'Sophisticated JV framework with governance, profit allocation, and dispute resolution across multiple jurisdictions.',
    businessUse: 'Structuring international partnerships with clear governance, capital contributions, and exit mechanisms.',
    industries: 'Infrastructure, Energy, Technology, Manufacturing',
    compliance: 'Aligned with local partnership laws and international commercial standards.',
    complexity: 'Advanced',
    relevance: 'High - Essential for strategic international partnerships',
    pricing: 'Custom Quote',
    version: 'v2.2',
    lastUpdated: '2026-05-09',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 10,
    title: 'Regulatory Compliance Audit Framework',
    category: 'Compliance & Regulatory',
    summary: 'Executive-level compliance audit methodology for assessing regulatory exposure across international operations.',
    businessUse: 'Conducting comprehensive compliance assessments and identifying regulatory gaps across jurisdictions.',
    industries: 'All Industries - Universal compliance framework',
    compliance: 'Aligned with SOX, GDPR, ISO 27001, and industry-specific standards.',
    complexity: 'Advanced',
    relevance: 'High - Recommended for all international enterprises',
    pricing: 'Custom Quote',
    version: 'v2.4',
    lastUpdated: '2026-05-13',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 11,
    title: 'International Licensing & IP Protection Agreement',
    category: 'Commercial Contracts',
    summary: 'Premium intellectual property licensing framework with cross-border enforcement and royalty optimization.',
    businessUse: 'Licensing technology, trademarks, and patents across multiple jurisdictions with optimized tax structures.',
    industries: 'Technology, Pharmaceuticals, Consumer Goods, Entertainment',
    compliance: 'TRIPS, EU IP Directives, national IP laws.',
    complexity: 'Advanced',
    relevance: 'High - Essential for IP-intensive businesses',
    pricing: 'Custom Quote',
    version: 'v2.6',
    lastUpdated: '2026-05-16',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
  {
    id: 12,
    title: 'Sanctions & Export Control Compliance Manual',
    category: 'International Business',
    summary: 'Comprehensive framework for managing OFAC, EU, and international sanctions compliance in global operations.',
    businessUse: 'Implementing sanctions screening, export license management, and international trade compliance protocols.',
    industries: 'All Industries - Universal compliance requirement',
    compliance: 'OFAC, EU Sanctions, UK Export Controls, UN Resolutions.',
    complexity: 'Advanced',
    relevance: 'Critical - Mandatory for all international trade',
    pricing: 'Custom Quote',
    version: 'v3.1',
    lastUpdated: '2026-05-17',
    institutionalUse: true,
    accessLevel: 'Premium',
  },
];

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
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function ContractIntelligencePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<'title' | 'updated' | 'complexity'>('title');
  const [filterByAccess, setFilterByAccess] = useState<'all' | 'premium' | 'standard'>('all');

  const filteredResources = useMemo(() => {
    let results = PREMIUM_RESOURCES.filter((resource) => {
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAccess = filterByAccess === 'all' || resource.accessLevel.toLowerCase() === filterByAccess;
      return matchesCategory && matchesSearch && matchesAccess;
    });

    // Sort results
    if (sortBy === 'updated') {
      results.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    } else if (sortBy === 'complexity') {
      const complexityOrder = { 'Intermediate': 1, 'Advanced': 2 };
      results.sort((a, b) => (complexityOrder[b.complexity as keyof typeof complexityOrder] || 0) - (complexityOrder[a.complexity as keyof typeof complexityOrder] || 0));
    } else {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [selectedCategory, searchQuery, sortBy, filterByAccess]);

  const toggleCardExpand = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-primary via-primary to-primary/95 py-24 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl lg:text-7xl text-white mb-6 leading-tight">
              Premium International Contract Intelligence & Executive Documentation Resources
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-secondary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Cross-Border Contracts, Compliance Frameworks, Governance Resources & Strategic Business Documentation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="mailto:contact@jmclex.com?subject=Browse%20Resources%20-%20Contract%20Intelligence"
                className="px-8 py-4 bg-accent-gold hover:bg-accent-gold-dark text-primary font-heading font-semibold rounded-lg transition-colors duration-300"
              >
                Browse Resources
              </a>
              <a
                href="mailto:contact@jmclex.com?subject=Explore%20Executive%20Documentation"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-heading font-semibold rounded-lg border border-white/30 transition-colors duration-300"
              >
                Explore Executive Documentation
              </a>
              <a
                href="mailto:contact@jmclex.com?subject=Request%20Customized%20Support"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-heading font-semibold rounded-lg border border-white/30 transition-colors duration-300"
              >
                Request Customized Support
              </a>
            </div>

            {/* Contact Display */}
            <p className="font-paragraph text-white/80 text-sm">
              Direct inquiries: <span className="font-semibold text-accent-gold">contact@jmclex.com</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
              Executive Intelligence Platform
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-2xl">
              Advanced filtering, version tracking, and institutional-grade documentation for international legal operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, title: 'Real-Time Updates', desc: 'Latest regulatory changes & compliance updates' },
              { icon: Award, title: 'Premium Access', desc: 'Institutional-grade documentation & frameworks' },
              { icon: Clock, title: 'Version Control', desc: 'Track document versions & compliance timelines' },
              { icon: Users, title: 'Expert Support', desc: 'Direct access to legal expertise team' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-secondary rounded-lg border border-border-subtle hover:border-accent-gold transition-colors duration-300"
              >
                <feature.icon className="w-8 h-8 text-accent-gold mb-4" />
                <h3 className="font-heading text-lg text-primary mb-2">{feature.title}</h3>
                <p className="font-paragraph text-sm text-text-secondary">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Support Section */}
      <section className="w-full py-20 lg:py-28 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-12 lg:p-16 border border-border-subtle"
          >
            <h2 className="font-heading text-3xl lg:text-4xl text-primary mb-6">
              Need Customized International Documentation Support?
            </h2>
            <p className="font-paragraph text-lg text-text-secondary mb-8 leading-relaxed max-w-3xl">
              JMC LEX provides international documentation support, governance structuring assistance, compliance intelligence and cross-border strategic advisory support for companies operating internationally. Our executive team specializes in crafting bespoke compliance frameworks, contract architectures, and governance solutions tailored to your specific jurisdictional requirements and business objectives.
            </p>
            <p className="font-paragraph text-base text-text-muted mb-8 italic">
              Clients may independently validate final documentation with their internal legal department or qualified local counsel in their jurisdiction.
            </p>
            <a
              href="mailto:contact@jmclex.com?subject=Executive%20Support%20Request%20-%20Contract%20Intelligence"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300"
            >
              Contact Executive Support
            </a>
          </motion.div>
        </div>
      </section>

      {/* Premium Resource Library Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
              Premium Contract Intelligence Library
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-2xl">
              Curated international legal, compliance, and governance resources designed for executive-level strategic decision-making.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search resources by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border-light rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Advanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 space-y-6"
          >
            {/* Sort Controls */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-accent-gold" />
                <span className="font-heading text-sm text-primary font-semibold">Sort By:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'title' as const, label: 'Title (A-Z)' },
                  { value: 'updated' as const, label: 'Recently Updated' },
                  { value: 'complexity' as const, label: 'Complexity Level' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-4 py-2 rounded-lg font-paragraph text-sm font-medium transition-colors duration-300 ${
                      sortBy === option.value
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-primary hover:bg-secondary-dark'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Access Level Filter */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <span className="font-heading text-sm text-primary font-semibold">Access Level:</span>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'all' as const, label: 'All Resources' },
                  { value: 'premium' as const, label: 'Premium Only' },
                  { value: 'standard' as const, label: 'Standard' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilterByAccess(option.value)}
                    className={`px-4 py-2 rounded-lg font-paragraph text-sm font-medium transition-colors duration-300 ${
                      filterByAccess === option.value
                        ? 'bg-accent-gold text-primary'
                        : 'bg-secondary text-primary hover:bg-secondary-dark'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-paragraph text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === null
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-primary hover:bg-secondary-dark'
                }`}
              >
                All Categories
              </button>
              {RESOURCE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-paragraph text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-primary hover:bg-secondary-dark'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <p className="font-paragraph text-sm text-text-muted">
              Showing {filteredResources.length} of {PREMIUM_RESOURCES.length} resources
            </p>
          </motion.div>

          {/* Resource Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                variants={itemVariants}
                className="border border-border-light rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                {/* Card Header */}
                <div className="p-8 border-b border-border-subtle bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-accent-gold/20 text-primary rounded-full font-paragraph text-xs font-semibold">
                          {resource.category}
                        </span>
                        {resource.institutionalUse && (
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded font-paragraph text-xs font-semibold">
                            Institutional
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-xl text-primary leading-tight">{resource.title}</h3>
                    </div>
                  </div>
                  <p className="font-paragraph text-base text-text-secondary">{resource.summary}</p>
                </div>

                {/* Card Body - Always Visible */}
                <div className="p-8 space-y-6">
                  <div>
                    <h4 className="font-heading text-sm text-primary mb-2">Business Use</h4>
                    <p className="font-paragraph text-sm text-text-secondary">{resource.businessUse}</p>
                  </div>

                  <div>
                    <h4 className="font-heading text-sm text-primary mb-2">Industries</h4>
                    <p className="font-paragraph text-sm text-text-secondary">{resource.industries}</p>
                  </div>

                  {/* Version & Update Info */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
                    <div>
                      <h5 className="font-heading text-xs text-primary mb-1 uppercase tracking-wide">Version</h5>
                      <p className="font-paragraph text-sm text-text-secondary font-semibold">{resource.version}</p>
                    </div>
                    <div>
                      <h5 className="font-heading text-xs text-primary mb-1 uppercase tracking-wide">Last Updated</h5>
                      <p className="font-paragraph text-sm text-text-secondary font-semibold">{resource.lastUpdated}</p>
                    </div>
                  </div>

                  {/* Expandable Section */}
                  <div>
                    <button
                      onClick={() => toggleCardExpand(resource.id)}
                      className="w-full flex items-center justify-between py-3 px-4 bg-secondary hover:bg-secondary-dark rounded-lg transition-colors duration-300 group"
                    >
                      <span className="font-heading text-sm text-primary font-semibold">
                        {expandedCards.has(resource.id) ? 'Hide Details' : 'View Full Details'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-primary transition-transform duration-300 ${
                          expandedCards.has(resource.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedCards.has(resource.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-4 pt-4 border-t border-border-subtle"
                      >
                        <div>
                          <h5 className="font-heading text-xs text-primary mb-1 uppercase tracking-wide">
                            Compliance Considerations
                          </h5>
                          <p className="font-paragraph text-sm text-text-secondary">{resource.compliance}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-heading text-xs text-primary mb-1 uppercase tracking-wide">
                              Complexity Level
                            </h5>
                            <p className="font-paragraph text-sm text-text-secondary font-semibold">{resource.complexity}</p>
                          </div>
                          <div>
                            <h5 className="font-heading text-xs text-primary mb-1 uppercase tracking-wide">
                              International Relevance
                            </h5>
                            <p className="font-paragraph text-sm text-text-secondary font-semibold">{resource.relevance}</p>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-heading text-xs text-primary mb-1 uppercase tracking-wide">Pricing</h5>
                          <p className="font-paragraph text-sm text-accent-gold font-semibold">{resource.pricing}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Card Footer - CTAs */}
                <div className="p-8 bg-secondary border-t border-border-subtle flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:contact@jmclex.com?subject=Request%20Resource%20Access%20-%20${encodeURIComponent(resource.title)}`}
                    className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white font-heading text-sm font-semibold rounded-lg transition-colors duration-300 text-center"
                  >
                    Request Access
                  </a>
                  <a
                    href={`mailto:contact@jmclex.com?subject=Request%20Customized%20Version%20-%20${encodeURIComponent(resource.title)}`}
                    className="flex-1 px-4 py-3 bg-white border border-primary text-primary hover:bg-primary/5 font-heading text-sm font-semibold rounded-lg transition-colors duration-300 text-center"
                  >
                    Customize
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="font-paragraph text-lg text-text-muted">
                No resources found matching your criteria. Please adjust your search or filters.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Executive Intelligence Resources Section */}
      <section className="w-full py-20 lg:py-28 bg-gradient-to-b from-white to-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
              Featured Executive Intelligence Resources
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-2xl">
              Curated premium frameworks for institutional-grade governance, compliance, and strategic operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Executive Governance Center',
                desc: 'Board-level governance frameworks, fiduciary duty protocols, and institutional compliance architectures for multinational enterprises.',
                features: ['Board Governance', 'Fiduciary Protocols', 'Risk Management']
              },
              {
                icon: Globe,
                title: 'Global Compliance Center',
                desc: 'Comprehensive multi-jurisdictional compliance frameworks covering regulatory requirements across major global markets.',
                features: ['Multi-Jurisdictional', 'Regulatory Mapping', 'Compliance Audits']
              },
              {
                icon: Zap,
                title: 'Aerospace & Defense Strategic Compliance',
                desc: 'Specialized frameworks for ITAR, EAR, DCSA compliance and defense sector regulatory requirements.',
                features: ['ITAR Compliance', 'Export Controls', 'Defense Standards']
              },
              {
                icon: BookOpen,
                title: 'International Business & Cross-Border Operations',
                desc: 'Strategic documentation for international expansion, cross-border transactions, and multi-jurisdictional operations.',
                features: ['M&A Support', 'JV Frameworks', 'Trade Compliance']
              },
              {
                icon: Lock,
                title: 'Executive Intelligence Insights',
                desc: 'Real-time intelligence on regulatory changes, compliance trends, and strategic governance updates.',
                features: ['Regulatory Updates', 'Trend Analysis', 'Strategic Alerts']
              },
              {
                icon: CheckCircle,
                title: 'Premium Resource Validation',
                desc: 'Expert validation services ensuring resources align with your specific jurisdictional requirements and business objectives.',
                features: ['Expert Review', 'Customization', 'Localization']
              },
            ].map((resource, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-lg border border-border-light hover:border-accent-gold hover:shadow-lg transition-all duration-300"
              >
                <resource.icon className="w-10 h-10 text-accent-gold mb-4" />
                <h3 className="font-heading text-xl text-primary mb-3">{resource.title}</h3>
                <p className="font-paragraph text-sm text-text-secondary mb-6">{resource.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {resource.features.map((feature, fidx) => (
                    <span key={fidx} className="inline-block px-3 py-1 bg-accent-gold/10 text-primary rounded-full font-paragraph text-xs font-semibold">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Governance Center Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-6">
                Executive Governance Center
              </h2>
              <p className="font-paragraph text-lg text-text-secondary mb-6 leading-relaxed">
                Institutional-grade governance frameworks designed for board-level strategic decision-making. Our Executive Governance Center provides comprehensive documentation for fiduciary compliance, board protocols, and institutional risk management.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Board-Level Governance Protocols',
                  'Fiduciary Duty & Liability Frameworks',
                  'Institutional Risk Management',
                  'Executive Compensation Structures',
                  'Stakeholder Governance Models'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:contact@jmclex.com?subject=Executive%20Governance%20Center%20Inquiry"
                className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300"
              >
                Explore Governance Resources
              </a>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-accent-gold/10 rounded-lg p-12 border border-border-light"
            >
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Board Governance</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Comprehensive board protocols and governance structures for multinational enterprises.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Fiduciary Compliance</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Institutional frameworks ensuring fiduciary duty compliance across jurisdictions.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Risk Management</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Strategic risk assessment and mitigation protocols for executive operations.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Global Compliance Center Section */}
      <section className="w-full py-20 lg:py-28 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-accent-gold/10 rounded-lg p-12 border border-border-light order-2 lg:order-1"
            >
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">GDPR & Data Protection</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Comprehensive international data protection compliance frameworks.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Sanctions & Export Controls</h4>
                  <p className="font-paragraph text-sm text-text-secondary">OFAC, EU sanctions, and international trade compliance protocols.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">AML/KYC Frameworks</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Anti-money laundering and know-your-customer compliance architectures.</p>
                </div>
              </div>
            </motion.div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-6">
                Global Compliance Center
              </h2>
              <p className="font-paragraph text-lg text-text-secondary mb-6 leading-relaxed">
                Multi-jurisdictional compliance frameworks covering regulatory requirements across major global markets. Our Global Compliance Center ensures your operations meet international standards and local requirements.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Multi-Jurisdictional Compliance Mapping',
                  'Regulatory Change Monitoring',
                  'Compliance Audit Frameworks',
                  'International Standards Alignment',
                  'Regulatory Reporting Protocols'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:contact@jmclex.com?subject=Global%20Compliance%20Center%20Inquiry"
                className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300"
              >
                Access Compliance Resources
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Aerospace & Defense Strategic Compliance Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-6">
                Aerospace & Defense Strategic Compliance
              </h2>
              <p className="font-paragraph text-lg text-text-secondary mb-6 leading-relaxed">
                Specialized frameworks for defense sector operations, export controls, and aerospace regulatory compliance. Our defense-focused resources ensure compliance with ITAR, EAR, DCSA, and NATO security requirements.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'ITAR & EAR Export Control Compliance',
                  'Defense Contracting Frameworks',
                  'DCSA Security Requirements',
                  'NATO Security Protocols',
                  'Aerospace Regulatory Compliance'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:contact@jmclex.com?subject=Aerospace%20Defense%20Compliance%20Inquiry"
                className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300"
              >
                Explore Defense Resources
              </a>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-accent-gold/10 rounded-lg p-12 border border-border-light"
            >
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Export Controls</h4>
                  <p className="font-paragraph text-sm text-text-secondary">ITAR and EAR compliance frameworks for controlled technology and defense items.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Defense Contracting</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Specialized procurement and contracting protocols for defense sector operations.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Security Requirements</h4>
                  <p className="font-paragraph text-sm text-text-secondary">DCSA and NATO security protocols for institutional defense operations.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* International Business & Cross-Border Operations Section */}
      <section className="w-full py-20 lg:py-28 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-accent-gold/10 rounded-lg p-12 border border-border-light order-2 lg:order-1"
            >
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">M&A Frameworks</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Cross-border mergers and acquisitions due diligence and transaction frameworks.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Joint Venture Structures</h4>
                  <p className="font-paragraph text-sm text-text-secondary">International partnership and joint venture governance architectures.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Trade Compliance</h4>
                  <p className="font-paragraph text-sm text-text-secondary">International trade, supply chain, and customs compliance protocols.</p>
                </div>
              </div>
            </motion.div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-6">
                International Business & Cross-Border Operations
              </h2>
              <p className="font-paragraph text-lg text-text-secondary mb-6 leading-relaxed">
                Strategic documentation for international expansion, cross-border transactions, and multi-jurisdictional operations. Our frameworks support complex international business structures and strategic partnerships.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Cross-Border M&A Frameworks',
                  'International Joint Venture Structures',
                  'Supply Chain Compliance',
                  'International Tax Optimization',
                  'Multi-Jurisdictional Governance'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:contact@jmclex.com?subject=International%20Business%20Operations%20Inquiry"
                className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300"
              >
                Explore International Resources
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Executive Intelligence Insights Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
              Executive Intelligence Insights
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-2xl">
              Real-time intelligence on regulatory changes, compliance trends, and strategic governance updates for international operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Regulatory Updates',
                desc: 'Real-time alerts on regulatory changes across major jurisdictions affecting your operations.',
                icon: TrendingUp
              },
              {
                title: 'Compliance Trends',
                desc: 'Strategic analysis of emerging compliance requirements and regulatory trends.',
                icon: Globe
              },
              {
                title: 'Governance Intelligence',
                desc: 'Executive insights on governance best practices and institutional standards.',
                icon: Award
              },
              {
                title: 'Strategic Alerts',
                desc: 'Proactive notifications on regulatory developments impacting your business.',
                icon: Zap
              },
              {
                title: 'Industry Analysis',
                desc: 'Sector-specific compliance and governance analysis for your industry.',
                icon: BookOpen
              },
              {
                title: 'Expert Commentary',
                desc: 'Strategic insights from international legal and compliance experts.',
                icon: Users
              },
            ].map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-to-br from-white to-secondary rounded-lg border border-border-light hover:border-accent-gold hover:shadow-lg transition-all duration-300"
              >
                <insight.icon className="w-8 h-8 text-accent-gold mb-4" />
                <h3 className="font-heading text-lg text-primary mb-3">{insight.title}</h3>
                <p className="font-paragraph text-sm text-text-secondary">{insight.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 p-12 bg-gradient-to-r from-primary/5 to-accent-gold/5 rounded-lg border border-border-light text-center"
          >
            <h3 className="font-heading text-2xl text-primary mb-4">Subscribe to Executive Intelligence Updates</h3>
            <p className="font-paragraph text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Stay informed on regulatory changes, compliance trends, and strategic governance updates relevant to your international operations.
            </p>
            <a
              href="mailto:contact@jmclex.com?subject=Executive%20Intelligence%20Subscription%20Request"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300"
            >
              Subscribe to Updates
            </a>
          </motion.div>
        </div>
      </section>

      {/* Legal Disclaimers Section */}
      <section className="w-full py-20 lg:py-28 bg-primary/5">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl lg:text-4xl text-primary mb-8">
              Legal & Regulatory Disclosures
            </h2>

            <div className="space-y-6 font-paragraph text-base text-text-secondary leading-relaxed">
              <p>
                <span className="font-semibold text-primary">Educational & Informational Purpose:</span> JMC LEX provides international legal, compliance, governance and executive educational resources intended for informational and strategic purposes only. These resources are designed to support executive decision-making and should not be construed as legal advice.
              </p>

              <p>
                <span className="font-semibold text-primary">Professional Legal Review Required:</span> Final legal review and validation should always be performed by qualified legal counsel licensed in the relevant jurisdiction. Users remain solely responsible for implementation and use of all resources provided.
              </p>

              <p>
                <span className="font-semibold text-primary">No Attorney-Client Relationship:</span> No attorney-client relationship is established unless expressly agreed in writing between JMC LEX and the user. The provision of resources does not create any legal obligation or fiduciary duty.
              </p>

              <p>
                <span className="font-semibold text-primary">Jurisdiction-Specific Adaptation:</span> Cross-border frameworks may require jurisdiction-specific adaptation and localization. Users must ensure compliance with applicable local laws, regulations, and professional standards in their respective jurisdictions.
              </p>

              <p>
                <span className="font-semibold text-primary">Limitation of Liability:</span> JMC LEX assumes no responsibility for legal, regulatory, financial or operational consequences arising from the use of strategic documentation resources. Users acknowledge that they are using these resources at their own risk and discretion.
              </p>

              <p>
                <span className="font-semibold text-primary">Regulatory Compliance:</span> Users are responsible for ensuring that their use of these resources complies with all applicable laws, regulations, and professional standards in their jurisdiction. JMC LEX does not warrant that resources comply with all jurisdictional requirements.
              </p>

              <p>
                <span className="font-semibold text-primary">Updates & Modifications:</span> JMC LEX reserves the right to update, modify, or discontinue resources at any time. Users should verify that resources reflect current legal and regulatory requirements before implementation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20 lg:py-28 bg-gradient-to-r from-primary to-primary/95">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-white mb-6">
              Ready to Explore Premium Resources?
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/90 mb-12 max-w-2xl mx-auto">
              Connect with our executive team to discuss your specific compliance, governance, and strategic documentation requirements.
            </p>
            <a
              href="mailto:contact@jmclex.com?subject=Premium%20Resources%20Inquiry"
              className="inline-block px-10 py-4 bg-accent-gold hover:bg-accent-gold-dark text-primary font-heading font-semibold rounded-lg transition-colors duration-300"
            >
              Get in Touch
            </a>
            <p className="font-paragraph text-white/80 text-sm mt-8">
              contact@jmclex.com
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
