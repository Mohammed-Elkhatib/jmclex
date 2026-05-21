import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Search, Filter, TrendingUp, Award, Clock, Users, Shield, Globe, Zap, BookOpen, Lock, CheckCircle, AlertCircle, Briefcase, Target, Cpu, FileText, Eye, Settings, BadgeCheck, FileCheck, Handshake, Scale, Building2, GitBranch, Layers, AlertTriangle, Truck, Plane, BarChart3, Gavel } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Contracts } from '@/entities/index';
import PremiumExecutiveInquiryForm from '@/components/PremiumExecutiveInquiryForm';

const RESOURCE_CATEGORIES = [
  'Corporate & Governance',
  'Commercial Contracts',
  'International Business',
  'Compliance & Regulatory',
  'Technology & AI',
  'Employment & HR',
  'Finance & Banking',
  'Industrial / Aerospace / Defense',
  'AI Governance & Regulatory',
  'Sanctions & Export Control',
];

// Premium institutional badges
const INSTITUTIONAL_BADGES = {
  'Executive Grade': 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30',
  'Cross-Border Critical': 'bg-primary/10 text-primary border border-primary/30',
  'Institutional Framework': 'bg-blue-50 text-blue-700 border border-blue-200',
  'Most Requested': 'bg-red-50 text-red-700 border border-red-200',
  'Enterprise Governance': 'bg-purple-50 text-purple-700 border border-purple-200',
  'Strategic Compliance': 'bg-green-50 text-green-700 border border-green-200',
};

// Live insight cards data
const LIVE_INSIGHTS = [
  {
    id: 1,
    title: 'OFAC Sanctions Update',
    category: 'Sanctions & Export Control',
    timestamp: '2026-05-20',
    content: 'New OFAC designations affecting financial services and technology sectors. Updated screening protocols recommended for international transactions.',
    priority: 'High',
    icon: AlertCircle,
  },
  {
    id: 2,
    title: 'EU AI Act Compliance Framework',
    category: 'AI Governance & Regulatory',
    timestamp: '2026-05-19',
    content: 'EU AI Act enters enforcement phase. High-risk AI systems require immediate compliance assessment and governance documentation.',
    priority: 'Critical',
    icon: Cpu,
  },
  {
    id: 3,
    title: 'Export Control Regulatory Changes',
    category: 'Aerospace & Defense',
    timestamp: '2026-05-18',
    content: 'BIS/EAR updates affecting aerospace and semiconductor exports. ITAR compliance requirements expanded for defense contractors.',
    priority: 'High',
    icon: Target,
  },
  {
    id: 4,
    title: 'International Geopolitical Compliance',
    category: 'Cross-Border Operations',
    timestamp: '2026-05-17',
    content: 'Geopolitical developments affecting international operations. Multi-jurisdictional compliance review recommended for global enterprises.',
    priority: 'Medium',
    icon: Globe,
  },
  {
    id: 5,
    title: 'GDPR Enforcement Trends',
    category: 'Data Protection & Privacy',
    timestamp: '2026-05-16',
    content: 'Increased GDPR enforcement actions across EU. Data transfer mechanisms and privacy governance frameworks require review.',
    priority: 'High',
    icon: Lock,
  },
  {
    id: 6,
    title: 'International Regulatory Intelligence',
    category: 'Governance & Compliance',
    timestamp: '2026-05-15',
    content: 'Emerging regulatory trends in financial services, technology, and defense sectors. Strategic compliance planning essential for 2026.',
    priority: 'Medium',
    icon: Briefcase,
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
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'title' | 'updated' | 'complexity'>('title');
  const [filterByAccess, setFilterByAccess] = useState<'all' | 'premium' | 'standard'>('all');
  const [activeSmartFilters, setActiveSmartFilters] = useState<Set<string>>(new Set());
  const [premiumResources, setPremiumResources] = useState<Contracts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch contracts from CMS
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setIsLoading(true);
        const result = await BaseCrudService.getAll<Contracts>('contracts');
        setPremiumResources(result.items || []);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        setPremiumResources([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const filteredResources = useMemo(() => {
    let results = premiumResources.filter((resource) => {
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        (resource.itemName?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (resource.summary?.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesAccess = filterByAccess === 'all' || resource.classificationPricing?.toLowerCase() === filterByAccess;
      return matchesCategory && matchesSearch && matchesAccess;
    });

    // Sort results
    if (sortBy === 'updated') {
      results.sort((a, b) => new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime());
    } else if (sortBy === 'complexity') {
      const complexityOrder = { 'Intermediate': 1, 'Advanced': 2 };
      results.sort((a, b) => (complexityOrder[b.complexity as keyof typeof complexityOrder] || 0) - (complexityOrder[a.complexity as keyof typeof complexityOrder] || 0));
    } else {
      results.sort((a, b) => (a.itemName || '').localeCompare(b.itemName || ''));
    }

    return results;
  }, [selectedCategory, searchQuery, sortBy, filterByAccess, premiumResources]);

  const toggleCardExpand = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const toggleSmartFilter = (filter: string) => {
    const newFilters = new Set(activeSmartFilters);
    if (newFilters.has(filter)) {
      newFilters.delete(filter);
    } else {
      newFilters.add(filter);
    }
    setActiveSmartFilters(newFilters);
  };

  const SMART_FILTERS = [
    { id: 'contract-type', label: 'Contract Type', icon: FileText },
    { id: 'industry', label: 'Industry', icon: Building2 },
    { id: 'compliance', label: 'Compliance Area', icon: CheckCircle },
    { id: 'international', label: 'International Operations', icon: Globe },
    { id: 'governance', label: 'Governance', icon: Shield },
    { id: 'aerospace', label: 'Aerospace & Defense', icon: Plane },
    { id: 'corporate', label: 'Corporate Structure', icon: Layers },
  ];

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

      {/* Premium Resource Library Section */}
      <section id="corporate-governance" className="w-full py-20 lg:py-28 bg-white">
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
              Showing {filteredResources.length} of {premiumResources.length} resources
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
                key={resource._id}
                variants={itemVariants}
                className="border border-border-light rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                {/* Card Header */}
                <div className="p-8 border-b border-border-subtle bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="inline-block px-3 py-1 bg-accent-gold/20 text-primary rounded-full font-paragraph text-xs font-semibold">
                          {resource.category}
                        </span>
                        {resource.institutionalUse && (
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded font-paragraph text-xs font-semibold">
                            Institutional
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-xl text-primary leading-tight">{resource.itemName}</h3>
                    </div>
                  </div>
                  <p className="font-paragraph text-base text-text-secondary mb-3">{resource.summary}</p>
                  {resource.executiveSummary && (
                    <p className="font-paragraph text-sm text-text-muted italic">{resource.executiveSummary}</p>
                  )}
                </div>

                {/* Card Body - Always Visible */}
                <div className="p-8 space-y-6">
                  <div>
                    <h4 className="font-heading text-sm text-primary mb-2">Business Use</h4>
                    <p className="font-paragraph text-sm text-text-secondary">{resource.businessUse}</p>
                  </div>

                  <div>
                    <h4 className="font-heading text-sm text-primary mb-2">Compliance Scope</h4>
                    <p className="font-paragraph text-sm text-text-secondary">{resource.complianceScope}</p>
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
                      onClick={() => toggleCardExpand(resource._id)}
                      className="w-full flex items-center justify-between py-3 px-4 bg-secondary hover:bg-secondary-dark rounded-lg transition-colors duration-300 group"
                    >
                      <span className="font-heading text-sm text-primary font-semibold">
                        {expandedCards.has(resource._id) ? 'Hide Details' : 'View Full Details'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-primary transition-transform duration-300 ${
                          expandedCards.has(resource._id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedCards.has(resource._id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-4 pt-4 border-t border-border-subtle"
                      >
                        <div>
                          <h5 className="font-heading text-xs text-primary mb-1 uppercase tracking-wide">
                            Implementation Considerations
                          </h5>
                          <p className="font-paragraph text-sm text-text-secondary">{resource.implementationConsiderations}</p>
                        </div>

                        <div>
                          <h5 className="font-heading text-xs text-primary mb-1 uppercase tracking-wide">
                            Jurisdiction Notes
                          </h5>
                          <p className="font-paragraph text-sm text-text-secondary">{resource.jurisdictionNotes}</p>
                        </div>

                        <div>
                          <h5 className="font-heading text-xs text-primary mb-1 uppercase tracking-wide">
                            Governance Observations
                          </h5>
                          <p className="font-paragraph text-sm text-text-secondary">{resource.governanceObservations}</p>
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

                        {/* Contract Action Buttons */}
                        <div className="pt-6 border-t border-border-subtle">
                          <h5 className="font-heading text-xs text-primary mb-4 uppercase tracking-wide">
                            Contract Actions
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a
                              href={`mailto:contact@jmclex.com?subject=Download%20Framework%20-%20${encodeURIComponent(resource.itemName || '')}`}
                              className="px-4 py-3 bg-accent-gold hover:bg-accent-gold-dark text-primary font-heading text-sm font-semibold rounded-lg transition-all duration-300 text-center hover:shadow-md"
                            >
                              Download Framework
                            </a>
                            <a
                              href={`mailto:contact@jmclex.com?subject=Request%20Review%20-%20${encodeURIComponent(resource.itemName || '')}`}
                              className="px-4 py-3 bg-primary hover:bg-primary/90 text-white font-heading text-sm font-semibold rounded-lg transition-all duration-300 text-center hover:shadow-md"
                            >
                              Request Review
                            </a>
                            <a
                              href={`mailto:contact@jmclex.com?subject=Request%20Customization%20-%20${encodeURIComponent(resource.itemName || '')}`}
                              className="px-4 py-3 bg-white border-2 border-primary text-primary hover:bg-primary/5 font-heading text-sm font-semibold rounded-lg transition-all duration-300 text-center hover:shadow-md"
                            >
                              Request Customization
                            </a>
                            <a
                              href={`mailto:contact@jmclex.com?subject=Discuss%20International%20Structure%20-%20${encodeURIComponent(resource.itemName || '')}`}
                              className="px-4 py-3 bg-white border-2 border-accent-gold text-primary hover:bg-accent-gold/5 font-heading text-sm font-semibold rounded-lg transition-all duration-300 text-center hover:shadow-md"
                            >
                              Discuss International Structure
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Card Footer - CTAs */}
                <div className="p-8 bg-secondary border-t border-border-subtle flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:contact@jmclex.com?subject=Request%20Resource%20Access%20-%20${encodeURIComponent(resource.itemName || '')}`}
                    className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white font-heading text-sm font-semibold rounded-lg transition-colors duration-300 text-center"
                  >
                    Request Access
                  </a>
                  <a
                    href={`mailto:contact@jmclex.com?subject=Request%20Customized%20Version%20-%20${encodeURIComponent(resource.itemName || '')}`}
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

      {/* Premium Executive Inquiry Form Section */}
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
              Request Premium Support
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-2xl">
              Connect with our strategic advisory team for customized contract solutions and executive guidance.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-secondary to-white border border-border-light rounded-lg p-8 lg:p-12"
          >
            <PremiumExecutiveInquiryForm />
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
