import { useState, useMemo } from 'react';
import { ChevronDown, Search, Filter, TrendingUp, Award, Clock, Users, Shield, Globe, Zap, BookOpen, Lock, CheckCircle, AlertCircle, Briefcase, Target, Cpu, FileText, Eye, Settings, BadgeCheck, FileCheck, Handshake, Scale, Building2, GitBranch, Layers, AlertTriangle, Truck, Plane, BarChart3, Gavel } from 'lucide-react';
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

const PREMIUM_RESOURCES = [
  {
    id: 1,
    title: 'International Shareholder Agreement Framework',
    category: 'Corporate & Governance',
    summary: 'Comprehensive multi-jurisdictional shareholder agreement template with cross-border governance provisions.',
    shortOverview: 'Multi-jurisdictional shareholder agreement with cross-border governance and fiduciary compliance provisions.',
    businessUse: 'Establishing shareholder rights, obligations, and dispute resolution mechanisms in international ventures.',
    typicalBusinessSituations: 'International equity investments, cross-border partnerships, multi-jurisdictional joint ventures, institutional investor relationships.',
    keyClauses: 'Shareholder rights and obligations, governance voting mechanisms, dividend policies, transfer restrictions, dispute resolution, exit provisions, anti-dilution protections.',
    deliverables: 'Customized shareholder agreement template, governance charter, voting protocols, dispute resolution framework, compliance checklist.',
    industries: 'Private Equity, Venture Capital, International Joint Ventures',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'Compliant with UNCITRAL Model Law, EU Directives, and common law jurisdictions.',
    relevance: 'High - Essential for cross-border equity structures',
    pricing: 'Custom Quote',
    version: 'v2.1',
    lastUpdated: '2026-05-15',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Executive Grade',
    executiveSummary: 'Board-level governance framework for international equity structures with fiduciary compliance protocols.',
    implementationConsiderations: 'Requires jurisdiction-specific adaptation for local partnership laws and tax optimization.',
    jurisdictionNotes: 'Applicable across EU, common law, and civil law jurisdictions with localization support.',
    governanceObservations: 'Aligns with OECD governance standards and institutional best practices.',
  },
  {
    id: 2,
    title: 'Cross-Border M&A Due Diligence Checklist',
    category: 'Commercial Contracts',
    summary: 'Executive-level due diligence framework covering regulatory, financial, and operational compliance across jurisdictions.',
    shortOverview: 'Comprehensive M&A due diligence framework with regulatory, financial, and compliance assessment protocols.',
    businessUse: 'Streamlining acquisition processes and identifying material risks in international transactions.',
    typicalBusinessSituations: 'Cross-border acquisitions, strategic mergers, regulatory compliance verification, transaction risk assessment, multi-jurisdictional deal structuring.',
    keyClauses: 'Regulatory compliance checklist, financial due diligence protocols, sanctions screening procedures, AML/KYC verification, tax compliance assessment, employment law review.',
    deliverables: 'Comprehensive due diligence checklist, regulatory compliance matrix, risk assessment framework, transaction timeline, compliance verification templates.',
    industries: 'Investment Banking, Corporate Development, Strategic Acquisitions',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'Aligned with FATCA, GDPR, AML/KYC requirements.',
    relevance: 'Critical - Reduces transaction risk and regulatory exposure',
    pricing: 'Custom Quote',
    version: 'v3.0',
    lastUpdated: '2026-05-18',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Cross-Border Critical',
    executiveSummary: 'Institutional-grade M&A framework covering regulatory, sanctions, and compliance due diligence across multiple jurisdictions.',
    implementationConsiderations: 'Requires coordination with local counsel in target jurisdictions for regulatory compliance verification.',
    jurisdictionNotes: 'Covers EU, US, UK, Asia-Pacific, and emerging markets with jurisdiction-specific compliance mapping.',
    governanceObservations: 'Aligns with international M&A best practices and institutional governance standards.',
  },
  {
    id: 3,
    title: 'International Supply Chain Compliance Framework',
    category: 'International Business',
    summary: 'Strategic documentation for managing supply chain compliance across multiple jurisdictions and regulatory regimes.',
    shortOverview: 'Comprehensive supply chain governance framework with sanctions, export control, and vendor compliance protocols.',
    businessUse: 'Establishing supplier governance, sanctions compliance, and supply chain resilience protocols.',
    typicalBusinessSituations: 'International procurement operations, vendor management, sanctions screening, supply chain risk assessment, regulatory compliance monitoring.',
    keyClauses: 'Vendor compliance requirements, sanctions screening procedures, export control protocols, supply chain risk assessment, audit and monitoring procedures.',
    deliverables: 'Vendor compliance framework, sanctions screening procedures, supply chain audit protocols, compliance monitoring templates, risk assessment matrix.',
    industries: 'Manufacturing, Logistics, Retail, Automotive',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'OFAC, EU Sanctions, UK Export Controls, ISO 27001.',
    relevance: 'Critical - Mandatory for international operations',
    pricing: 'Custom Quote',
    version: 'v2.3',
    lastUpdated: '2026-05-10',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Strategic Compliance',
    executiveSummary: 'Enterprise-grade supply chain governance framework with OFAC, sanctions, and export control compliance protocols.',
    implementationConsiderations: 'Requires integration with procurement systems and vendor management platforms for real-time compliance monitoring.',
    jurisdictionNotes: 'Covers OFAC, EU sanctions, UK export controls, and emerging market compliance requirements.',
    governanceObservations: 'Aligns with international supply chain resilience standards and institutional governance frameworks.',
  },
  {
    id: 4,
    title: 'GDPR & International Data Protection Compliance Manual',
    category: 'Compliance & Regulatory',
    summary: 'Comprehensive governance framework for international data protection, privacy, and cross-border data transfers.',
    shortOverview: 'Multi-jurisdictional data protection framework covering GDPR, CCPA, LGPD, and emerging privacy standards.',
    businessUse: 'Implementing compliant data governance, privacy policies, and international data transfer mechanisms.',
    typicalBusinessSituations: 'International data transfers, privacy policy development, data subject rights management, cross-border data processing, regulatory compliance audits.',
    keyClauses: 'Data transfer mechanisms, privacy policy templates, data subject rights procedures, breach notification protocols, vendor data processing agreements.',
    deliverables: 'Privacy policy templates, data transfer documentation, data subject rights procedures, breach notification framework, compliance audit checklist.',
    industries: 'Technology, Financial Services, Healthcare, E-commerce',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'GDPR, CCPA, LGPD, PIPEDA, and emerging privacy regimes.',
    relevance: 'Critical - Essential for international digital operations',
    pricing: 'Custom Quote',
    version: 'v2.5',
    lastUpdated: '2026-05-12',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Institutional Framework',
    executiveSummary: 'Comprehensive data protection governance framework covering GDPR, CCPA, LGPD, and emerging international privacy standards.',
    implementationConsiderations: 'Requires integration with data governance systems and privacy management platforms for compliance monitoring.',
    jurisdictionNotes: 'Covers EU (GDPR), US (CCPA), Brazil (LGPD), Canada (PIPEDA), and emerging market privacy requirements.',
    governanceObservations: 'Aligns with international data protection standards and institutional privacy governance best practices.',
  },
  {
    id: 5,
    title: 'AI & Algorithmic Governance Framework',
    category: 'Technology & AI',
    summary: 'Executive governance framework for AI deployment, algorithmic accountability, and emerging AI regulation compliance.',
    shortOverview: 'Comprehensive AI governance framework covering EU AI Act, NIST standards, and algorithmic accountability protocols.',
    businessUse: 'Establishing responsible AI governance, bias mitigation, and regulatory compliance for AI-driven operations.',
    typicalBusinessSituations: 'AI system deployment, algorithmic bias assessment, regulatory compliance verification, AI governance committee establishment, risk management.',
    keyClauses: 'AI governance policies, bias assessment procedures, transparency requirements, accountability frameworks, regulatory compliance protocols.',
    deliverables: 'AI governance framework, bias assessment templates, transparency documentation, compliance audit procedures, governance committee charter.',
    industries: 'Financial Services, Healthcare, Technology, Automotive',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'EU AI Act, NIST AI RMF, emerging global AI standards.',
    relevance: 'High - Critical for emerging AI-driven business models',
    pricing: 'Custom Quote',
    version: 'v1.8',
    lastUpdated: '2026-05-20',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Most Requested',
    executiveSummary: 'Enterprise AI governance framework covering EU AI Act, NIST standards, and emerging international AI regulatory requirements.',
    implementationConsiderations: 'Requires AI governance committee establishment and integration with AI development and deployment processes.',
    jurisdictionNotes: 'Covers EU AI Act, US regulatory framework, and emerging global AI governance standards.',
    governanceObservations: 'Aligns with international AI governance best practices and institutional risk management frameworks.',
  },
  {
    id: 6,
    title: 'International Executive Employment Agreement',
    category: 'Employment & HR',
    summary: 'Premium executive employment contract with international mobility, tax optimization, and multi-jurisdictional compliance.',
    shortOverview: 'Executive employment framework with international mobility provisions and multi-jurisdictional tax optimization.',
    businessUse: 'Recruiting and retaining international executive talent with compliant compensation and benefits structures.',
    typicalBusinessSituations: 'International executive recruitment, expatriate assignments, tax-optimized compensation, multi-jurisdictional employment compliance.',
    keyClauses: 'Compensation structure, benefits provisions, tax optimization clauses, mobility provisions, termination conditions, confidentiality requirements.',
    deliverables: 'Employment agreement template, compensation structure documentation, tax optimization analysis, compliance checklist, benefits framework.',
    industries: 'Corporate, Private Equity, Executive Search, Multinational Enterprises',
    complexity: 'Intermediate',
    pricingIndication: 'Custom Quote',
    compliance: 'Compliant with employment law across major jurisdictions.',
    relevance: 'High - Essential for international talent management',
    pricing: 'Custom Quote',
    version: 'v2.0',
    lastUpdated: '2026-05-08',
    institutionalUse: false,
    accessLevel: 'Standard',
    badge: 'Enterprise Governance',
    executiveSummary: 'Executive employment framework with international mobility provisions and multi-jurisdictional tax optimization.',
    implementationConsiderations: 'Requires coordination with HR and tax advisors for jurisdiction-specific compliance.',
    jurisdictionNotes: 'Covers major employment law jurisdictions with tax optimization provisions.',
    governanceObservations: 'Aligns with international executive compensation best practices.',
  },
  {
    id: 7,
    title: 'International Banking & Finance Compliance Framework',
    category: 'Finance & Banking',
    summary: 'Strategic documentation for international banking operations, sanctions compliance, and financial regulatory governance.',
    shortOverview: 'Enterprise banking compliance framework with OFAC, AML/KYC, FATCA, and international financial regulatory protocols.',
    businessUse: 'Establishing compliant banking relationships, international fund transfers, and financial regulatory protocols.',
    typicalBusinessSituations: 'International banking operations, fund transfers, AML/KYC compliance, sanctions screening, regulatory reporting.',
    keyClauses: 'AML/KYC procedures, sanctions screening protocols, FATCA compliance requirements, banking relationship documentation, regulatory reporting procedures.',
    deliverables: 'AML/KYC framework, sanctions screening procedures, FATCA compliance documentation, banking compliance checklist, regulatory reporting templates.',
    industries: 'Banking, Investment Management, Private Wealth, Corporate Finance',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'Basel III, FATCA, AML/KYC, OFAC, EU Banking Directives.',
    relevance: 'Critical - Mandatory for international financial operations',
    pricing: 'Custom Quote',
    version: 'v3.2',
    lastUpdated: '2026-05-14',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Cross-Border Critical',
    executiveSummary: 'Enterprise banking compliance framework covering OFAC, AML/KYC, FATCA, and international financial regulatory requirements.',
    implementationConsiderations: 'Requires integration with banking systems and compliance monitoring platforms.',
    jurisdictionNotes: 'Covers US (FATCA, OFAC), EU (Banking Directives), and international financial regulatory requirements.',
    governanceObservations: 'Aligns with Basel III standards and international banking governance best practices.',
  },
  {
    id: 8,
    title: 'Defense & Aerospace Procurement Compliance Framework',
    category: 'Industrial / Aerospace / Defense',
    summary: 'Specialized governance framework for defense contracting, export controls, and aerospace regulatory compliance.',
    shortOverview: 'Specialized aerospace and defense compliance framework covering ITAR, EAR, DCSA, and NATO security requirements.',
    businessUse: 'Managing defense contracts, export licenses, and compliance with ITAR, EAR, and international defense regulations.',
    typicalBusinessSituations: 'Defense contracting, export license management, ITAR compliance, DCSA security requirements, NATO security protocols.',
    keyClauses: 'Export control procedures, ITAR compliance requirements, DCSA security protocols, NATO security requirements, contract compliance clauses.',
    deliverables: 'Export control framework, ITAR compliance procedures, DCSA security documentation, NATO compliance checklist, contract templates.',
    industries: 'Aerospace, Defense Contracting, Advanced Manufacturing',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'ITAR, EAR, DCSA, NATO Security Requirements.',
    relevance: 'Critical - Essential for defense sector operations',
    pricing: 'Custom Quote',
    version: 'v2.7',
    lastUpdated: '2026-05-11',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Strategic Compliance',
    executiveSummary: 'Specialized aerospace and defense compliance framework covering ITAR, EAR, DCSA, and NATO security requirements.',
    implementationConsiderations: 'Requires coordination with DCSA and export control authorities for compliance verification.',
    jurisdictionNotes: 'Covers US (ITAR, EAR), NATO, and international defense regulatory requirements.',
    governanceObservations: 'Aligns with defense sector governance standards and NATO security protocols.',
  },
  {
    id: 9,
    title: 'International Joint Venture Agreement',
    category: 'Corporate & Governance',
    summary: 'Sophisticated JV framework with governance, profit allocation, and dispute resolution across multiple jurisdictions.',
    shortOverview: 'Institutional JV governance framework with multi-jurisdictional compliance and strategic partnership protocols.',
    businessUse: 'Structuring international partnerships with clear governance, capital contributions, and exit mechanisms.',
    typicalBusinessSituations: 'International partnerships, joint venture formation, capital contribution structures, profit allocation, exit mechanisms.',
    keyClauses: 'Governance structure, capital contribution requirements, profit allocation formulas, decision-making procedures, dispute resolution, exit provisions.',
    deliverables: 'JV agreement template, governance charter, capital contribution documentation, profit allocation framework, dispute resolution procedures.',
    industries: 'Infrastructure, Energy, Technology, Manufacturing',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'Aligned with local partnership laws and international commercial standards.',
    relevance: 'High - Essential for strategic international partnerships',
    pricing: 'Custom Quote',
    version: 'v2.2',
    lastUpdated: '2026-05-09',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Institutional Framework',
    executiveSummary: 'Institutional JV governance framework with multi-jurisdictional compliance and strategic partnership protocols.',
    implementationConsiderations: 'Requires coordination with local counsel in partner jurisdictions for compliance verification.',
    jurisdictionNotes: 'Covers major commercial law jurisdictions with partnership law compliance.',
    governanceObservations: 'Aligns with international partnership governance best practices.',
  },
  {
    id: 10,
    title: 'Regulatory Compliance Audit Framework',
    category: 'Compliance & Regulatory',
    summary: 'Executive-level compliance audit methodology for assessing regulatory exposure across international operations.',
    shortOverview: 'Comprehensive compliance audit framework for multi-jurisdictional regulatory exposure assessment.',
    businessUse: 'Conducting comprehensive compliance assessments and identifying regulatory gaps across jurisdictions.',
    typicalBusinessSituations: 'Compliance audits, regulatory gap assessment, multi-jurisdictional compliance review, governance assessment, risk identification.',
    keyClauses: 'Audit procedures, compliance assessment templates, regulatory mapping, gap identification protocols, remediation procedures.',
    deliverables: 'Audit framework, compliance assessment templates, regulatory mapping documentation, gap analysis reports, remediation procedures.',
    industries: 'All Industries - Universal compliance framework',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'Aligned with SOX, GDPR, ISO 27001, and industry-specific standards.',
    relevance: 'High - Recommended for all international enterprises',
    pricing: 'Custom Quote',
    version: 'v2.4',
    lastUpdated: '2026-05-13',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Enterprise Governance',
    executiveSummary: 'Comprehensive compliance audit framework for multi-jurisdictional regulatory exposure assessment.',
    implementationConsiderations: 'Requires engagement with compliance teams and external audit partners.',
    jurisdictionNotes: 'Applicable across all major jurisdictions with regulatory framework mapping.',
    governanceObservations: 'Aligns with SOX, GDPR, and international compliance governance standards.',
  },
  {
    id: 11,
    title: 'International Licensing & IP Protection Agreement',
    category: 'Commercial Contracts',
    summary: 'Premium intellectual property licensing framework with cross-border enforcement and royalty optimization.',
    shortOverview: 'International IP licensing framework with cross-border enforcement and tax optimization protocols.',
    businessUse: 'Licensing technology, trademarks, and patents across multiple jurisdictions with optimized tax structures.',
    typicalBusinessSituations: 'IP licensing arrangements, technology transfer, trademark licensing, patent licensing, royalty optimization.',
    keyClauses: 'License grant provisions, royalty structures, IP protection requirements, enforcement procedures, termination conditions, tax optimization clauses.',
    deliverables: 'IP licensing agreement template, royalty structure documentation, enforcement procedures, tax optimization analysis, compliance checklist.',
    industries: 'Technology, Pharmaceuticals, Consumer Goods, Entertainment',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'TRIPS, EU IP Directives, national IP laws.',
    relevance: 'High - Essential for IP-intensive businesses',
    pricing: 'Custom Quote',
    version: 'v2.6',
    lastUpdated: '2026-05-16',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Executive Grade',
    executiveSummary: 'International IP licensing framework with cross-border enforcement and tax optimization protocols.',
    implementationConsiderations: 'Requires coordination with IP counsel and tax advisors for optimization.',
    jurisdictionNotes: 'Covers TRIPS, EU IP Directives, and national IP law compliance.',
    governanceObservations: 'Aligns with international IP governance best practices.',
  },
  {
    id: 12,
    title: 'Sanctions & Export Control Compliance Manual',
    category: 'International Business',
    summary: 'Comprehensive framework for managing OFAC, EU, and international sanctions compliance in global operations.',
    shortOverview: 'Enterprise sanctions compliance framework covering OFAC, EU sanctions, UK export controls, and international trade compliance.',
    businessUse: 'Implementing sanctions screening, export license management, and international trade compliance protocols.',
    typicalBusinessSituations: 'Sanctions screening, export license management, international trade compliance, transaction monitoring, regulatory reporting.',
    keyClauses: 'Sanctions screening procedures, export license requirements, transaction monitoring protocols, compliance reporting procedures, audit requirements.',
    deliverables: 'Sanctions screening framework, export license procedures, transaction monitoring templates, compliance reporting documentation, audit procedures.',
    industries: 'All Industries - Universal compliance requirement',
    complexity: 'Advanced',
    pricingIndication: 'Custom Quote',
    compliance: 'OFAC, EU Sanctions, UK Export Controls, UN Resolutions.',
    relevance: 'Critical - Mandatory for all international trade',
    pricing: 'Custom Quote',
    version: 'v3.1',
    lastUpdated: '2026-05-17',
    institutionalUse: true,
    accessLevel: 'Premium',
    badge: 'Most Requested',
    executiveSummary: 'Enterprise sanctions compliance framework covering OFAC, EU sanctions, UK export controls, and international trade compliance.',
    implementationConsiderations: 'Requires integration with transaction monitoring and sanctions screening systems.',
    jurisdictionNotes: 'Covers OFAC, EU sanctions, UK export controls, and UN resolutions.',
    governanceObservations: 'Aligns with international sanctions governance standards and compliance best practices.',
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
  const [activeSmartFilters, setActiveSmartFilters] = useState<Set<string>>(new Set());

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

      {/* Contract & Framework Library Section */}
      <section className="w-full py-20 lg:py-28 bg-white border-b border-border-light">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
              Contract & Framework Library
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-3xl">
              Explore our comprehensive collection of documents, contracts, frameworks, and services organized by category. Click any item to jump to detailed information.
            </p>
          </motion.div>

          {/* Library Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Corporate & Governance',
                anchor: '#corporate-governance',
                items: [
                  'Shareholder Agreement',
                  'Joint Venture Agreement',
                  'Governance Charter',
                  'Delegation of Authority Policy',
                  'Investment Agreement'
                ]
              },
              {
                title: 'Commercial Contracts',
                anchor: '#commercial-contracts',
                items: [
                  'Master Service Agreement (MSA)',
                  'Service Agreement',
                  'Distribution Agreement',
                  'Outsourcing Agreement',
                  'Licensing Agreement',
                  'Strategic Partnership Agreement'
                ]
              },
              {
                title: 'International Business',
                anchor: '#international-business',
                items: [
                  'International Sales Agreement',
                  'Cross-Border Supply Agreement',
                  'Export Agreement',
                  'International Consulting Agreement',
                  'GCC Commercial Documentation'
                ]
              },
              {
                title: 'Compliance & Regulatory',
                anchor: '#compliance-regulatory',
                items: [
                  'AML / KYC Governance Framework',
                  'Sanctions Compliance Manual',
                  'OFAC Compliance Framework',
                  'Anti-Bribery Policy',
                  'Internal Investigation Protocol',
                  'Third-Party Due Diligence Framework',
                  'GDPR / Data Protection Framework',
                  'AI Governance Framework'
                ]
              },
              {
                title: 'Technology & AI',
                anchor: '#technology-ai',
                items: [
                  'SaaS Agreement',
                  'Software Licensing Agreement',
                  'Cloud Services Agreement',
                  'Data Processing Agreement (DPA)',
                  'AI Development Agreement',
                  'API Integration Agreement'
                ]
              },
              {
                title: 'Employment & HR',
                anchor: '#employment-hr',
                items: [
                  'Executive Employment Agreement',
                  'Confidentiality Agreement / NDA',
                  'Independent Contractor Agreement',
                  'Employee Handbook',
                  'Settlement Agreement'
                ]
              },
              {
                title: 'Finance & Banking',
                anchor: '#finance-banking',
                items: [
                  'Loan Agreement',
                  'Escrow Agreement',
                  'Investment Advisory Agreement',
                  'Banking Compliance Framework',
                  'Trade Finance Documentation'
                ]
              },
              {
                title: 'Industrial / Aerospace / Defense',
                anchor: '#industrial-defense',
                items: [
                  'Aerospace Supply Agreement',
                  'Defense Procurement Compliance Framework',
                  'Technical Assistance Agreement',
                  'Engineering Services Agreement',
                  'ITAR / EAR Export Compliance Clauses'
                ]
              }
            ].map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="border border-border-light rounded-lg overflow-hidden hover:border-accent-gold hover:shadow-lg transition-all duration-300 bg-white"
              >
                <a
                  href={category.anchor}
                  className="block p-6 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors duration-300"
                >
                  <h3 className="font-heading text-xl text-primary mb-4 flex items-center justify-between group">
                    {category.title}
                    <ChevronDown className="w-5 h-5 text-accent-gold group-hover:translate-y-1 transition-transform duration-300" />
                  </h3>
                </a>

                {/* Collapsible Items List */}
                <div className="px-6 pb-6 space-y-2 border-t border-border-subtle">
                  {category.items.map((item, itemIdx) => (
                    <motion.a
                      key={itemIdx}
                      href={category.anchor}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: itemIdx * 0.02 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors duration-300 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold group-hover:scale-150 transition-transform duration-300" />
                      <span className="font-paragraph text-sm text-text-secondary group-hover:text-primary transition-colors duration-300">
                        {item}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Navigation Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10"
          >
            <p className="font-paragraph text-sm text-text-secondary text-center">
              <span className="font-semibold text-primary">💡 Tip:</span> Click on any category or item above to jump directly to the detailed section with full documentation, compliance information, and implementation guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Executive Contract Intelligence Overview Section */}
      <section id="contract-overview" className="w-full py-20 lg:py-28 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
              Executive Contract Intelligence Overview
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-2xl">
              Strategic international documentation, governance frameworks, compliance resources and cross-border operational support.
            </p>
          </motion.div>

          {/* Navigation Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Corporate & Governance',
                description: 'International shareholder agreements, joint venture structures, and board governance frameworks.',
                anchor: '#corporate-governance',
                icon: Shield
              },
              {
                title: 'Commercial Contracts',
                description: 'Master service agreements, licensing frameworks, and distribution agreements for international commerce.',
                anchor: '#commercial-contracts',
                icon: Briefcase
              },
              {
                title: 'International Business',
                description: 'Cross-border sales agreements, supply chain compliance, and international trade documentation.',
                anchor: '#international-business',
                icon: Globe
              },
              {
                title: 'Compliance & Regulatory',
                description: 'OFAC sanctions, AML/KYC governance, GDPR frameworks, and regulatory compliance protocols.',
                anchor: '#compliance-regulatory',
                icon: CheckCircle
              },
              {
                title: 'Technology & AI',
                description: 'SaaS agreements, data processing agreements, AI governance, and cybersecurity frameworks.',
                anchor: '#technology-ai',
                icon: Cpu
              },
              {
                title: 'Employment & HR',
                description: 'Executive employment agreements, contractor agreements, and international employee handbooks.',
                anchor: '#employment-hr',
                icon: Users
              },
              {
                title: 'Finance & Banking',
                description: 'Banking compliance, loan agreements, investment advisory, and trade finance documentation.',
                anchor: '#finance-banking',
                icon: TrendingUp
              },
              {
                title: 'Industrial / Aerospace / Defense',
                description: 'ITAR/EAR compliance, aerospace supply agreements, and defense procurement frameworks.',
                anchor: '#industrial-defense',
                icon: Target
              },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.anchor}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-white border border-border-light hover:border-accent-gold hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <item.icon className="w-8 h-8 text-accent-gold mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-heading text-lg text-primary mb-2 group-hover:text-accent-gold transition-colors duration-300">{item.title}</h3>
                <p className="font-paragraph text-sm text-text-secondary">{item.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* How Clients Use This Platform Section */}
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
              How Clients Use This Platform
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-2xl">
              Practical solutions for international legal operations and strategic business documentation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-12 lg:p-16 border border-border-light"
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl text-primary mb-6">Clients may use this platform to:</h3>
                <ul className="space-y-4">
                  {[
                    'Identify the appropriate contract or framework for a specific business operation',
                    'Request a customized draft tailored to their specific requirements',
                    'Submit an existing draft for review and correction',
                    'Obtain contract structuring support for complex transactions',
                    'Receive compliance, AML/KYC, sanctions, financial crime or internal investigation documentation support',
                    'Prepare documentation for review by their local legal counsel',
                    'Save time, reduce legal uncertainty and organize cross-border documentation more efficiently'
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle className="w-6 h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-base text-text-secondary">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-border-light">
                <h3 className="font-heading text-lg text-primary mb-4">Confidentiality & Security</h3>
                <p className="font-paragraph text-base text-text-secondary leading-relaxed">
                  All strategic exchanges are handled confidentially. Where appropriate, an NDA or confidentiality undertaking may be signed before reviewing sensitive documentation.
                </p>
              </div>
            </div>
          </motion.div>
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
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="inline-block px-3 py-1 bg-accent-gold/20 text-primary rounded-full font-paragraph text-xs font-semibold">
                          {resource.category}
                        </span>
                        {resource.institutionalUse && (
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded font-paragraph text-xs font-semibold">
                            Institutional
                          </span>
                        )}
                        {resource.badge && (
                          <span className={`inline-block px-3 py-1 rounded-full font-paragraph text-xs font-semibold ${INSTITUTIONAL_BADGES[resource.badge as keyof typeof INSTITUTIONAL_BADGES]}`}>
                            {resource.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-xl text-primary leading-tight">{resource.title}</h3>
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

      {/* ... keep existing code (Featured Executive Intelligence Resources Section removed for simplification) ... */}

      {/* Consolidated Strategic Resource Centers Section */}
      <section id="commercial-contracts" className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
              Strategic Resource Centers
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-2xl">
              Institutional-grade frameworks organized by strategic focus area for executive decision-making.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                id: 'governance',
                icon: Shield,
                title: 'Executive Governance',
                desc: 'Board-level governance protocols, fiduciary compliance, and institutional risk management frameworks.',
                items: ['Board Governance', 'Fiduciary Protocols', 'Risk Management']
              },
              {
                id: 'compliance',
                icon: CheckCircle,
                title: 'Global Compliance',
                desc: 'Multi-jurisdictional compliance frameworks covering GDPR, sanctions, AML/KYC, and regulatory requirements.',
                items: ['GDPR & Data Protection', 'Sanctions Compliance', 'AML/KYC Frameworks']
              },
              {
                id: 'defense',
                icon: Target,
                title: 'Aerospace & Defense',
                desc: 'Specialized ITAR, EAR, DCSA compliance and defense sector regulatory frameworks.',
                items: ['Export Controls', 'Defense Contracting', 'Security Requirements']
              },
              {
                id: 'international',
                icon: Globe,
                title: 'International Operations',
                desc: 'Cross-border M&A, joint ventures, supply chain compliance, and multi-jurisdictional governance.',
                items: ['M&A Frameworks', 'JV Structures', 'Trade Compliance']
              },
            ].map((center, idx) => (
              <motion.a
                key={idx}
                href={`#${center.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-lg border border-border-light hover:border-accent-gold hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <center.icon className="w-10 h-10 text-accent-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-heading text-xl text-primary mb-3 group-hover:text-accent-gold transition-colors duration-300">{center.title}</h3>
                <p className="font-paragraph text-sm text-text-secondary mb-6">{center.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {center.items.map((item, fidx) => (
                    <span key={fidx} className="inline-block px-3 py-1 bg-accent-gold/10 text-primary rounded-full font-paragraph text-xs font-semibold">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ... keep existing code (placeholder sections for international-business, compliance-regulatory, technology-ai, employment-hr) ... */}

      {/* Executive Strategic Documentation & Contract Support Section */}
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
              Executive Strategic Documentation & Contract Support
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-3xl">
              Comprehensive assistance in identifying appropriate contractual structures, drafting agreements, reviewing existing documentation, and strengthening legal protections.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-xl text-primary mb-3">Our Expertise</h3>
                <ul className="space-y-3">
                  {[
                    'Identifying appropriate contractual structures for your business objectives',
                    'Drafting comprehensive agreements tailored to your specific requirements',
                    'Reviewing existing contracts and strengthening legal protections',
                    'Supporting compliance structures and governance frameworks',
                    'AML/KYC governance and sanctions compliance reviews',
                    'Financial crime investigation support and cross-border operational structuring'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-border-light">
                <p className="font-paragraph text-sm text-text-muted italic mb-4">
                  <span className="font-semibold text-primary">Confidentiality:</span> All strategic exchanges remain strictly confidential following appropriate confidentiality undertakings and NDAs where required.
                </p>
                <p className="font-paragraph text-sm text-text-muted italic">
                  <span className="font-semibold text-primary">Legal Validation:</span> Final legal validation should always be completed by qualified local counsel in your jurisdiction.
                </p>
              </div>
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
                  <h4 className="font-heading text-lg text-primary mb-2">Contract Drafting & Review</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Expert assistance in drafting new agreements and reviewing existing contracts to strengthen legal protections.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Compliance & Governance</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Supporting compliance structures, AML/KYC governance, and sanctions compliance reviews across jurisdictions.</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-border-subtle">
                  <h4 className="font-heading text-lg text-primary mb-2">Cross-Border Operations</h4>
                  <p className="font-paragraph text-sm text-text-secondary">Strategic structuring for international operations, financial crime investigation support, and multi-jurisdictional coordination.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <a
              href="mailto:contact@jmclex.com?subject=Request%20Executive%20Support"
              className="px-6 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300 text-center"
            >
              Request Executive Support
            </a>
            <a
              href="mailto:contact@jmclex.com?subject=Request%20Contract%20Review"
              className="px-6 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300 text-center"
            >
              Request Contract Review
            </a>
            <a
              href="mailto:contact@jmclex.com?subject=Request%20Customized%20Draft"
              className="px-6 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300 text-center"
            >
              Request Customized Draft
            </a>
            <a
              href="mailto:contact@jmclex.com?subject=Discuss%20Cross-Border%20Operations"
              className="px-6 py-4 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300 text-center"
            >
              Discuss Cross-Border Operations
            </a>
          </motion.div>
        </div>
      </section>

      {/* ... keep existing code (Finance & Banking and Industrial / Aerospace / Defense placeholder sections removed for simplification) ... */}

      {/* Legal & Regulatory Disclosures Section */}
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

      {/* Available Executive Legal & Compliance Services Section */}
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
              Available Executive Legal & Compliance Services
            </h2>
            <p className="font-paragraph text-lg text-text-secondary max-w-3xl">
              Comprehensive legal and compliance support services tailored for executive-level requirements and international operations.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                id: 1,
                title: 'Contract Drafting',
                description: 'Expert drafting of comprehensive international contracts tailored to your specific business requirements and jurisdictional compliance.',
                icon: FileCheck
              },
              {
                id: 2,
                title: 'Contract Review',
                description: 'Thorough review and analysis of existing contracts to identify risks, strengthen protections, and optimize commercial terms.',
                icon: Eye
              },
              {
                id: 3,
                title: 'NDA & Confidentiality Agreements',
                description: 'Customized non-disclosure and confidentiality agreements protecting sensitive business information across jurisdictions.',
                icon: Lock
              },
              {
                id: 4,
                title: 'Shareholder Agreements',
                description: 'Sophisticated shareholder governance frameworks with voting rights, profit allocation, and dispute resolution mechanisms.',
                icon: Handshake
              },
              {
                id: 5,
                title: 'Joint Venture Structures',
                description: 'Strategic JV documentation with clear governance, capital structures, and exit provisions for international partnerships.',
                icon: GitBranch
              },
              {
                id: 6,
                title: 'Cross-Border Commercial Agreements',
                description: 'International commercial contracts addressing multi-jurisdictional compliance, currency, and regulatory requirements.',
                icon: Globe
              },
              {
                id: 7,
                title: 'Compliance Frameworks',
                description: 'Comprehensive compliance governance structures covering regulatory requirements across multiple jurisdictions.',
                icon: CheckCircle
              },
              {
                id: 8,
                title: 'Sanctions & Export Control Reviews',
                description: 'OFAC, EU sanctions, and export control compliance assessments for international transactions and operations.',
                icon: AlertTriangle
              },
              {
                id: 9,
                title: 'Supply Chain Compliance',
                description: 'Vendor governance, sanctions screening, and supply chain resilience protocols for global procurement operations.',
                icon: Truck
              },
              {
                id: 10,
                title: 'Aerospace & Defense Compliance',
                description: 'Specialized ITAR, EAR, and DCSA compliance frameworks for defense sector operations and procurement.',
                icon: Plane
              },
              {
                id: 11,
                title: 'Corporate Governance Documentation',
                description: 'Board-level governance protocols, delegation frameworks, and institutional risk management documentation.',
                icon: Building2
              },
              {
                id: 12,
                title: 'Risk Management Frameworks',
                description: 'Executive-level risk assessment, mitigation strategies, and governance frameworks for operational resilience.',
                icon: BarChart3
              },
              {
                id: 13,
                title: 'Executive Legal Support',
                description: 'Comprehensive legal advisory support for executive decision-making and strategic business operations.',
                icon: Gavel
              }
            ].map((service, idx) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="p-8 rounded-lg bg-white border border-border-light hover:border-accent-gold hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                {/* Icon */}
                <service.icon className="w-8 h-8 text-accent-gold mb-4 group-hover:scale-110 transition-transform duration-300" />

                {/* Title */}
                <h3 className="font-heading text-lg text-primary mb-3 group-hover:text-accent-gold transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-paragraph text-sm text-text-secondary mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Request Support Button */}
                <a
                  href={`mailto:contact@jmclex.com?subject=Request%20Support%20-%20${encodeURIComponent(service.title)}`}
                  className="inline-block px-4 py-2 bg-primary hover:bg-primary/90 text-white font-heading text-sm font-semibold rounded-lg transition-colors duration-300 text-center"
                >
                  Request Support
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-primary/5 rounded-lg border border-primary/10 text-center"
          >
            <p className="font-paragraph text-base text-text-secondary mb-6">
              Need a service not listed above? Our executive team provides customized legal and compliance support tailored to your specific requirements.
            </p>
            <a
              href="mailto:contact@jmclex.com?subject=Customized%20Legal%20Support%20Inquiry"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors duration-300"
            >
              Discuss Your Requirements
            </a>
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
