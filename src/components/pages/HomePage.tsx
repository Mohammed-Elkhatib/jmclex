// HPI 1.8-SEO
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Scale, Globe, Shield, BookOpen, Briefcase, Building2, FileText, GraduationCap, Database, MapPin, Lock, Calendar } from 'lucide-react';
import { useTranslation } from '@/lib/use-translation';
import { Head } from '@/components/Head';
import { PAGE_METADATA_PRESETS, buildPageMetadata, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InternationalIconsRow from '@/components/InternationalIconsRow';
import PremiumPricingStructure from '@/components/PremiumPricingStructure';
import { scrollAnimationConfig, scrollAnimationConfigStaggered } from '@/lib/animation-utils';

// Rotating Globe Component
function RotatingGlobe() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="w-full h-full"
    >
      <Image
        src="https://static.wixstatic.com/media/5e1235_b6a4ec1d69ff48c1943d539f939f84a2~mv2.jpg"
        alt="Legal Protection, Human Values - Rotating globe"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

// --- Canonical Data Sources ---
const EXPERTISE_AREAS = [
  { title: 'Corporate Law', icon: Building2, desc: 'Cross-border M&A, restructuring, and corporate governance.' },
  { title: 'Contracts', icon: FileText, desc: 'Complex international commercial agreements and negotiations.' },
  { title: 'Compliance & Sanctions', icon: Shield, desc: 'Navigating global regulatory frameworks and trade sanctions.' },
  { title: 'Litigation', icon: Scale, desc: 'High-stakes multi-jurisdictional dispute resolution.' },
  { title: 'Criminal Law', icon: Briefcase, desc: 'White-collar crime, fraud, and international investigations.' },
  { title: 'Family Law', icon: Globe, desc: 'International family disputes and wealth protection.' },
  { title: 'Intellectual Property', icon: BookOpen, desc: 'Global IP strategy, registration, and enforcement.' },
  { title: 'Real Estate', icon: MapPin, desc: 'International property transactions and development.' }
];

const PUBLICATIONS = [
  { title: 'Geopolitical Law Analysis', category: 'Strategic Insight', date: 'October 2023' },
  { title: 'Navigating Global Sanctions', category: 'Compliance', date: 'September 2023' },
  { title: 'Cross-Border M&A Trends', category: 'Corporate Law', date: 'August 2023' }
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const opacityBg = useTransform(heroScroll, [0, 1], [0.4, 0]);
  const { t } = useTranslation();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
  ];

  const pageMetadata = buildPageMetadata({
    ...PAGE_METADATA_PRESETS.home,
    structuredData: getOrganizationSchema(),
  });

  return (
    <div className="min-h-screen bg-background text-optional-navy selection:bg-accent-gold selection:text-background overflow-clip">
      <Head metadata={pageMetadata} />
      <Header />
      
      {/* 1. HERO SECTION - Full Bleed, Cinematic Premium */}
      <section ref={heroRef} className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: yBg, opacity: opacityBg }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://static.wixstatic.com/media/5e1235_f4bf3179ebc94b02bd944a19cf135d4b~mv2.png?originWidth=1920&originHeight=1024"
            alt="Cinematic Paris aerial view - international legal strategy"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Sophisticated Gradient Overlays - Premium Cinema Effect - REDUCED OPACITY FOR TEXT VISIBILITY */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/5 via-background/15 to-background/50"></div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_30%,#0A1F2F_90%)] opacity-10"></div>
        
        <div className="relative z-20 w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center text-center mt-16 sm:mt-20 md:mt-24 lg:mt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 border border-accent-gold/30 rounded-full mb-6 sm:mb-8 md:mb-10 backdrop-blur-sm bg-background/10"
          >
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse"></span>
            <span className="font-paragraph text-xs tracking-[0.15em] uppercase text-accent-gold/90">International Advisory • Since 1990</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight sm:leading-[1.08] md:leading-[1.08] text-background mb-6 sm:mb-8 md:mb-10 max-w-6xl text-balance font-light px-2"
          >
            International Legal & Business Advisory
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-background/80 mb-8 sm:mb-10 md:mb-14 max-w-3xl mx-auto font-light leading-relaxed px-2"
          >
            Strategic counsel for cross-border contracts, governance, and international business operations. Institutional-grade advisory across EMEA and global markets.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center w-full sm:w-auto mb-12 md:mb-16 px-2"
          >
            <Link
              to="/consultation"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-accent-gold text-background font-paragraph font-medium px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] text-sm md:text-base"
            >
              <span className="relative z-10">Strategic Consultation</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </Link>
            <Link
              to="/contact"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-background/20 border border-background/40 text-background font-paragraph font-medium px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-lg overflow-hidden transition-all duration-300 hover:bg-background/30 hover:border-background/60 text-sm md:text-base"
            >
              <span className="relative z-10">Get in Touch</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Refined Trust Signal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-background/70 font-paragraph text-xs uppercase tracking-[0.15em] px-2"
          >
            <span className="hidden sm:inline w-6 h-[1px] bg-background/30"></span>
            <span className="text-center">Global Institutional Network • EMEA & International Markets</span>
            <span className="hidden sm:inline w-6 h-[1px] bg-background/30"></span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4 z-20"
        >
          <span className="font-paragraph text-xs tracking-widest text-background/70 uppercase">Scroll to explore</span>
          <div className="w-[1px] h-12 sm:h-16 bg-background/30 overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-accent-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. INTRO & KEY FIGURES - Refined Architectural Layout */}
      <section className="relative w-full bg-background pt-16 md:pt-24 lg:pt-40 pb-12 md:pb-16 lg:pb-24 border-t border-optional-navy/5">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Typography */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-optional-navy mb-6 md:mb-8 lg:mb-12 leading-tight md:leading-[1.08] text-balance font-light">
                  JMC LEX
                  <br/>
                  <span className="text-optional-navy/40 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">International Legal & Business Advisory</span>
                </h2>
                
                <div className="space-y-4 md:space-y-6 lg:space-y-8 font-paragraph text-base sm:text-lg md:text-lg lg:text-xl text-optional-navy/75 font-light leading-relaxed max-w-3xl">
                  <p>
                    Since the 1990s, JMC LEX has provided premier international legal and business advisory services. We specialize in cross-border contracts, governance, strategic operations, and complex international matters for CEOs, investors, corporations, and high-net-worth clients.
                  </p>
                  <p>
                    Our expertise spans multi-jurisdictional environments, providing clarity and decisive action in sophisticated, high-stakes scenarios across EMEA and global markets.
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column: Image & Stats */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[60vh] min-h-[300px] w-full overflow-hidden rounded-lg"
              >
                <Image
                  src="https://static.wixstatic.com/media/5e1235_17d294d373744472ad855876521a8a6b~mv2.png?originWidth=1152&originHeight=896"
                  alt="JMC LEX international legal advisory office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-optional-navy/5 mix-blend-multiply"></div>
              </motion.div>

              {/* Floating Stats Box */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-8 sm:-bottom-12 md:-bottom-16 -left-4 sm:-left-8 md:-left-12 lg:-left-24 bg-optional-navy p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-accent-gold/15 rounded-lg"
              >
                <div className="grid grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                  <div>
                    <div className="text-accent-gold font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-1 md:mb-2 font-light">200+</div>
                    <div className="font-paragraph text-xs text-background/70 uppercase tracking-wider font-light leading-tight">Contracts<br/>Negotiated</div>
                  </div>
                  <div>
                    <div className="text-accent-gold font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-1 md:mb-2 font-light">100+</div>
                    <div className="font-paragraph text-xs text-background/70 uppercase tracking-wider font-light leading-tight">Disputes<br/>Resolved</div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. GLOBAL REACH - Single Globe Section with Rotating Animation */}
      <section className="relative w-full bg-secondary py-40">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Sticky Image Side with Rotating Globe */}
            <div className="lg:w-5/12 relative">
              <div className="sticky top-32 h-[70vh] w-full overflow-hidden rounded-lg">
                <RotatingGlobe />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <Globe className="w-12 h-12 text-accent-gold mb-4 opacity-80" />
                  <h3 className="font-heading text-3xl text-optional-navy">Global Reach,<br/>Local Expertise.</h3>
                </div>
              </div>
            </div>
            
            {/* Scrolling Content Side */}
            <div className="lg:w-7/12 flex flex-col justify-center py-12 lg:py-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 mb-10">
                  <span className="w-8 h-[1px] bg-accent-gold"></span>
                  <span className="font-paragraph text-xs tracking-[0.15em] uppercase text-accent-gold/80">International Legal Network</span>
                </div>
                
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-optional-navy mb-12 leading-[1.15] tracking-tight font-light">
                  Global Reach, Local Expertise
                </h2>
                
                <p className="font-paragraph text-base md:text-lg text-optional-navy/75 mb-12 font-light leading-relaxed">
                  JMC LEX operates as an international legal and business advisory platform with a trusted network of legal correspondents, strategic partners, and institutional advisors across EMEA and global markets.
                  <br/><br/>
                  Through our international network of lawyers, advisors, and partner firms, we support individuals, entrepreneurs, investors, families, and business operators involved in cross-border projects, investments, international mobility, commercial operations, and sensitive legal matters.
                  <br/><br/>
                  Our teams assist clients in navigating complex regional environments while reducing operational uncertainty, protecting strategic interests, and simplifying multi-jurisdictional procedures through a discreet and coordinated approach.
                  <br/><br/>
                  Whether involving investment structuring, business expansion, contractual matters, asset protection, residency-related procedures, family interests, institutional disputes, or cross-border legal coordination, JMC LEX provides multilingual and internationally oriented support adapted to complex international situations.
                  <br/><br/>
                  We combine strategic legal experience, international business understanding, and trusted regional partnerships to help clients operate more securely and efficiently across Europe, Lebanon, and the GCC region.
                </p>
                
                <Link
                  to="/consultation"
                  className="inline-flex items-center gap-3 text-accent-gold font-paragraph font-medium text-lg group"
                >
                  <span>Discuss Your International Needs</span>
                  <span className="w-8 h-[1px] bg-accent-gold group-hover:w-12 transition-all duration-300"></span>
                  <ArrowRight className="w-5 h-5 -ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5. ELITE BRAND BLOCK - Premium Three Column Section */}
      <section className="relative w-full bg-background py-40 border-t border-optional-navy/5">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Column 1: Our Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start"
            >
              <div className="w-12 h-[2px] bg-accent-gold mb-8"></div>
              <h3 className="font-heading text-2xl md:text-3xl text-optional-navy mb-6 leading-tight">
                Our Message
              </h3>
              <p className="font-paragraph text-lg md:text-xl text-optional-navy/80 font-light leading-relaxed">
                Precision — Discretion — Excellence
              </p>
            </motion.div>

            {/* Column 2: Our Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col items-start"
            >
              <div className="w-12 h-[2px] bg-accent-gold mb-8"></div>
              <h3 className="font-heading text-2xl md:text-3xl text-optional-navy mb-6 leading-tight">
                Our Objectives
              </h3>
              <p className="font-paragraph text-lg md:text-xl text-optional-navy/80 font-light leading-relaxed">
                Delivering high-quality execution with efficiency, responsiveness, and uncompromising professional standards
              </p>
            </motion.div>

            {/* Column 3: Our Motivation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start"
            >
              <div className="w-12 h-[2px] bg-accent-gold mb-8"></div>
              <h3 className="font-heading text-2xl md:text-3xl text-optional-navy mb-6 leading-tight">
                Our Motivation
              </h3>
              <p className="font-paragraph text-lg md:text-xl text-optional-navy/80 font-light leading-relaxed">
                Integrity — Commitment — Performance
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3.7. GLOBAL STRATEGIC PRESENCE - Premium Institutional Section */}
      <section className="relative w-full bg-secondary py-40">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-10">
              <span className="w-8 h-[1px] bg-accent-gold"></span>
              <span className="font-paragraph text-xs tracking-[0.15em] uppercase text-accent-gold/80">Institutional Excellence</span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-optional-navy mb-10 leading-[1.1] text-balance font-light">
              Global Strategic Presence & International Legal Intelligence
            </h2>
            
            <p className="font-paragraph text-lg md:text-xl text-optional-navy/75 font-light leading-relaxed max-w-4xl">
              JMC LEX operates as a premier international legal platform, combining institutional-grade advisory with cross-border strategic intelligence. Our multilingual teams coordinate seamlessly across EMEA, leveraging decades of collective expertise to deliver sophisticated legal solutions for complex international matters.
            </p>
          </motion.div>

          {/* Three Column Institutional Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Column 1: Strategic Coordination */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="w-12 h-[2px] bg-accent-gold mb-8"></div>
              <h3 className="font-heading text-2xl md:text-3xl text-optional-navy mb-6 leading-tight">
                Strategic Coordination
              </h3>
              <p className="font-paragraph text-base md:text-lg text-optional-navy/80 font-light leading-relaxed mb-8 flex-grow">
                Seamless coordination across multiple jurisdictions with institutional-grade precision. Our teams manage complex cross-border operations with unified strategy and synchronized execution.
              </p>
              <Link
                to="/consultation"
                className="inline-flex items-center gap-3 text-accent-gold font-paragraph font-medium text-sm group w-fit"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Column 2: International Intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="w-12 h-[2px] bg-accent-gold mb-8"></div>
              <h3 className="font-heading text-2xl md:text-3xl text-optional-navy mb-6 leading-tight">
                Legal Intelligence
              </h3>
              <p className="font-paragraph text-base md:text-lg text-optional-navy/80 font-light leading-relaxed mb-8 flex-grow">
                Real-time insights into international legal developments, regulatory shifts, and geopolitical implications. We anticipate risks and identify opportunities across EMEA markets.
              </p>
              <Link
                to="/publications"
                className="inline-flex items-center gap-3 text-accent-gold font-paragraph font-medium text-sm group w-fit"
              >
                <span>View Insights</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Column 3: Executive Advisory */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="w-12 h-[2px] bg-accent-gold mb-8"></div>
              <h3 className="font-heading text-2xl md:text-3xl text-optional-navy mb-6 leading-tight">
                Executive Advisory
              </h3>
              <p className="font-paragraph text-base md:text-lg text-optional-navy/80 font-light leading-relaxed mb-8 flex-grow">
                Direct access to senior counsel for strategic decision-making. We provide C-level advisory on international expansion, risk mitigation, and institutional positioning.
              </p>
              <Link
                to="/consultation"
                className="inline-flex items-center gap-3 text-accent-gold font-paragraph font-medium text-sm group w-fit"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="mt-20 pt-20 border-t border-optional-navy/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="font-paragraph text-lg md:text-xl text-optional-navy/70 font-light italic">
                Institutional excellence meets international sophistication. JMC LEX delivers premium legal strategy for the most complex cross-border challenges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ... keep existing code (4. EXPERTISE section and beyond) ... */}
      <section className="relative w-full bg-optional-navy py-40 border-y border-optional-navy/20">
        <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/5e1235_329fa4ac6722408180b48c3f3e106a0a~mv2.png?originWidth=1152&originHeight=768')] opacity-5 mix-blend-overlay object-cover"></div>
        
        <div className="relative z-10 max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h2 className="font-heading text-5xl md:text-7xl text-background mb-6">
                Areas of Expertise
              </h2>
              <p className="font-paragraph text-xl text-background/70 font-light">
                Comprehensive legal services tailored for complex international matters and high-stakes scenarios.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, opacity: 0 }}
              whileInView={{ opacity: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                to="/expertise"
                className="inline-flex items-center gap-3 px-8 py-4 border border-accent-gold/50 text-accent-gold font-paragraph hover:bg-accent-gold hover:text-optional-navy transition-colors duration-300 rounded-lg"
              >
                View All Practices
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10 border border-background/10">
            {EXPERTISE_AREAS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-optional-navy p-10 group hover:bg-background transition-colors duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-accent-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <item.icon className="w-10 h-10 text-accent-gold mb-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <h3 className="font-heading text-2xl text-background mb-4">{item.title}</h3>
                <p className="font-paragraph text-sm text-background/80 mb-8 line-clamp-2 font-light">{item.desc}</p>
                
                <Link
                  to="/expertise"
                  className="inline-flex items-center gap-2 font-paragraph text-sm text-accent-gold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5. TALENT NETWORK - Premium Introduction Section */}
      <section className="relative w-full bg-secondary py-20 md:py-28 lg:py-40">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
              <span className="w-6 md:w-8 h-[1px] bg-accent-gold"></span>
              <span className="font-paragraph text-xs md:text-sm tracking-widest uppercase text-accent-gold">International Network</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-optional-navy mb-6 md:mb-8 leading-tight tracking-tight">
              JMC LEX Talent & Experts Network
            </h2>
            
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-optional-navy/80 mb-8 md:mb-12 font-light leading-relaxed max-w-3xl px-2 md:px-0">
              We are progressively building an international ecosystem of multilingual professionals, researchers, advisors, and independent experts. Our network connects exceptional talent across legal, business, and advisory sectors to facilitate strategic collaboration, cross-border cooperation, and innovative solutions.
            </p>
            
            <Link
              to="/talent-network"
              className="inline-flex items-center gap-3 text-accent-gold font-paragraph font-medium text-sm md:text-base lg:text-lg group"
            >
              <span>Explore the Network</span>
              <span className="w-6 md:w-8 h-[1px] bg-accent-gold group-hover:w-10 md:group-hover:w-12 transition-all duration-300"></span>
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5 -ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. DIGITAL PLATFORMS - Business Model Focus */}
      <section className="relative w-full bg-background py-40">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-6xl text-optional-navy mb-6">
              Digital Legal Platforms
            </h2>
            <p className="font-paragraph text-xl text-optional-navy/70 font-light max-w-2xl mx-auto">
              Access our proprietary knowledge base and specialized legal training programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Training Platform */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative h-[600px] overflow-hidden rounded-lg"
            >
              <Image
                src="https://static.wixstatic.com/media/5e1235_49e31005feeb4dd58a03eec3583427b0~mv2.png?originWidth=896&originHeight=576"
                alt="Legal Training Platform"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <GraduationCap className="w-12 h-12 text-accent-gold mb-6" />
                <h3 className="font-heading text-4xl text-optional-navy mb-4">Legal Training</h3>
                <p className="font-paragraph text-lg text-optional-navy/80 mb-8 font-light max-w-md">
                  Professional courses, subscription access, and certification programs for legal practitioners and corporate teams.
                </p>
                <Link
                  to="/training"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent-gold text-optional-navy font-paragraph font-medium rounded-lg w-fit hover:shadow-lg transition-all duration-300"
                >
                  Explore Subscriptions
                </Link>
              </div>
            </motion.div>

            {/* Jurisprudence Database */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative h-[600px] overflow-hidden rounded-lg"
            >
              <Image
                src="https://static.wixstatic.com/media/5e1235_0f182e20b99b4b65a56a369a63ff7d16~mv2.png?originWidth=896&originHeight=576"
                alt="Jurisprudence Database"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <Database className="w-12 h-12 text-accent-gold mb-6" />
                <h3 className="font-heading text-4xl text-optional-navy mb-4">Jurisprudence Database</h3>
                <p className="font-paragraph text-lg text-optional-navy/80 mb-8 font-light max-w-md">
                  Exclusive access to our paid legal database, featuring comprehensive case law, analysis, and strategic precedents.
                </p>
                <Link
                  to="/jurisprudence"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent-gold text-optional-navy font-paragraph font-medium rounded-lg w-fit hover:shadow-lg transition-all duration-300"
                >
                  Access Database
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. AUTHORITY & PUBLICATIONS - Editorial Layout */}
      <section className="relative w-full bg-background py-40 border-t border-optional-navy/5">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-5xl md:text-6xl text-optional-navy mb-4">
                Legal Authority
              </h2>
              <p className="font-paragraph text-xl text-optional-navy/70 font-light">
                Insights on geopolitical law, sanctions, and international developments.
              </p>
            </motion.div>
            <Link
              to="/publications"
              className="group inline-flex items-center gap-2 font-paragraph text-accent-gold hover:text-accent-gold/80 transition-colors duration-300"
            >
              View All Publications <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PUBLICATIONS.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="https://static.wixstatic.com/media/5e1235_453b52eacd234d178ee10b0b5be9c32b~mv2.png?originWidth=576&originHeight=384"
                    alt={pub.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-1 rounded-full">
                    <span className="font-paragraph text-xs text-accent-gold uppercase tracking-wider">{pub.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-paragraph text-sm text-optional-navy/70">{pub.date}</span>
                  <span className="w-8 h-[1px] bg-optional-navy/20"></span>
                </div>
                <h3 className="font-heading text-2xl text-optional-navy group-hover:text-accent-gold transition-colors duration-300">
                  {pub.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5. OUR GLOBAL PRESENCE - Premium Visual Section with World Map */}
      <section className="relative w-full bg-optional-navy py-40 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://static.wixstatic.com/media/5e1235_6a230f41c5a04d08a61d54283dfcb146~mv2.png?originWidth=1920&originHeight=1024"
            alt="Global world map with EMEA regions highlighted"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-optional-navy/40 via-optional-navy/60 to-optional-navy/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,optional-navy_100%)] opacity-50"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-[120rem] mx-auto px-6 md:px-12 h-[500px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-background mb-6 leading-[1.1]">
              Our Global Offices
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-background/80 font-light">
              Strategic presence across EMEA and beyond
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. GLOBAL PRESENCE - Minimalist Typographic Map */}
      <section className="relative w-full bg-optional-navy py-40">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <Globe className="w-12 h-12 text-accent-gold mx-auto mb-6 opacity-50" />
            <h2 className="font-heading text-4xl md:text-5xl text-background">Office Locations</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {/* Lebanon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0 }}
            >
              <h3 className="font-paragraph text-sm uppercase tracking-[0.3em] text-accent-gold mb-6">Lebanon</h3>
              <p className="font-heading text-2xl md:text-3xl text-background/80 hover:text-background transition-colors cursor-default">
                Beirut
              </p>
            </motion.div>

            {/* France */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="font-paragraph text-sm uppercase tracking-[0.3em] text-accent-gold mb-6">France</h3>
              <p className="font-heading text-2xl md:text-3xl text-background/80 hover:text-background transition-colors cursor-default">
                Strasbourg
              </p>
            </motion.div>

            {/* Switzerland */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-paragraph text-sm uppercase tracking-[0.3em] text-accent-gold mb-6">Switzerland</h3>
              <p className="font-heading text-2xl md:text-3xl text-background/80 hover:text-background transition-colors cursor-default">
                —
              </p>
            </motion.div>

            {/* UAE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="font-paragraph text-sm uppercase tracking-[0.3em] text-accent-gold mb-6">United Arab Emirates</h3>
              <p className="font-heading text-2xl md:text-3xl text-background/80 hover:text-background transition-colors cursor-default">
                Dubai
              </p>
            </motion.div>

            {/* Saudi Arabia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="font-paragraph text-sm uppercase tracking-[0.3em] text-accent-gold mb-6">Saudi Arabia</h3>
              <p className="font-heading text-2xl md:text-3xl text-background/80 hover:text-background transition-colors cursor-default">
                Riyadh
              </p>
            </motion.div>

            {/* Kuwait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="font-paragraph text-sm uppercase tracking-[0.3em] text-accent-gold mb-6">Kuwait</h3>
              <p className="font-heading text-2xl md:text-3xl text-background/80 hover:text-background transition-colors cursor-default">
                —
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7.4. PREMIUM PRICING STRUCTURE - Executive Legal Solutions */}
      <PremiumPricingStructure />

      {/* 7.5. REQUEST PROCESS - Premium Step-by-Step Section */}
      <section className="relative w-full bg-secondary py-40 border-t border-optional-navy/5">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <div className="inline-flex items-center gap-3 mb-8 justify-center">
              <span className="w-8 h-[1px] bg-accent-gold"></span>
              <span className="font-paragraph text-sm tracking-widest uppercase text-accent-gold">Streamlined Process</span>
              <span className="w-8 h-[1px] bg-accent-gold"></span>
            </div>
            
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-optional-navy mb-8 leading-[1.1]">
              Request Process
            </h2>
            
            <p className="font-paragraph text-lg md:text-xl text-optional-navy/70 font-light max-w-3xl mx-auto">
              A transparent, efficient pathway to accessing our premium legal services and strategic advisory.
            </p>
          </motion.div>

          {/* Six-Step Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0 }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center font-heading text-lg text-optional-navy font-bold">
                1
              </div>
              
              <div className="bg-background rounded-lg p-8 md:p-10 border border-optional-navy/10 group-hover:border-accent-gold/30 transition-colors duration-300 h-full flex flex-col pt-12">
                <div className="w-10 h-[2px] bg-accent-gold mb-6"></div>
                <h3 className="font-heading text-2xl text-optional-navy mb-4">
                  Select a Contract or Framework
                </h3>
                <p className="font-paragraph text-base text-optional-navy/70 font-light leading-relaxed flex-grow">
                  Browse our curated selection of legal templates, frameworks, and service offerings tailored to your specific needs.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center font-heading text-lg text-optional-navy font-bold">
                2
              </div>
              
              <div className="bg-background rounded-lg p-8 md:p-10 border border-optional-navy/10 group-hover:border-accent-gold/30 transition-colors duration-300 h-full flex flex-col pt-12">
                <div className="w-10 h-[2px] bg-accent-gold mb-6"></div>
                <h3 className="font-heading text-2xl text-optional-navy mb-4">
                  Submit Your Request
                </h3>
                <p className="font-paragraph text-base text-optional-navy/70 font-light leading-relaxed flex-grow">
                  Complete our secure intake form with project details, timeline, and specific requirements for your engagement.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center font-heading text-lg text-optional-navy font-bold">
                3
              </div>
              
              <div className="bg-background rounded-lg p-8 md:p-10 border border-optional-navy/10 group-hover:border-accent-gold/30 transition-colors duration-300 h-full flex flex-col pt-12">
                <div className="w-10 h-[2px] bg-accent-gold mb-6"></div>
                <h3 className="font-heading text-2xl text-optional-navy mb-4">
                  Executive Review & Discussion
                </h3>
                <p className="font-paragraph text-base text-optional-navy/70 font-light leading-relaxed flex-grow">
                  Our senior legal team conducts a comprehensive review and schedules a strategic consultation to discuss your objectives.
                </p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center font-heading text-lg text-optional-navy font-bold">
                4
              </div>
              
              <div className="bg-background rounded-lg p-8 md:p-10 border border-optional-navy/10 group-hover:border-accent-gold/30 transition-colors duration-300 h-full flex flex-col pt-12">
                <div className="w-10 h-[2px] bg-accent-gold mb-6"></div>
                <h3 className="font-heading text-2xl text-optional-navy mb-4">
                  Customization if Required
                </h3>
                <p className="font-paragraph text-base text-optional-navy/70 font-light leading-relaxed flex-grow">
                  We tailor frameworks and agreements to your specific jurisdiction, industry requirements, and strategic priorities.
                </p>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center font-heading text-lg text-optional-navy font-bold">
                5
              </div>
              
              <div className="bg-background rounded-lg p-8 md:p-10 border border-optional-navy/10 group-hover:border-accent-gold/30 transition-colors duration-300 h-full flex flex-col pt-12">
                <div className="w-10 h-[2px] bg-accent-gold mb-6"></div>
                <h3 className="font-heading text-2xl text-optional-navy mb-4">
                  Delivery of Documentation
                </h3>
                <p className="font-paragraph text-base text-optional-navy/70 font-light leading-relaxed flex-grow">
                  Receive finalized, professionally executed legal documents with comprehensive explanatory notes and implementation guidance.
                </p>
              </div>
            </motion.div>

            {/* Step 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center font-heading text-lg text-optional-navy font-bold">
                6
              </div>
              
              <div className="bg-background rounded-lg p-8 md:p-10 border border-optional-navy/10 group-hover:border-accent-gold/30 transition-colors duration-300 h-full flex flex-col pt-12">
                <div className="w-10 h-[2px] bg-accent-gold mb-6"></div>
                <h3 className="font-heading text-2xl text-optional-navy mb-4">
                  Final Local Legal Validation
                </h3>
                <p className="font-paragraph text-base text-optional-navy/70 font-light leading-relaxed flex-grow">
                  Coordinate with local counsel in your jurisdiction to ensure full compliance and readiness for execution.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center justify-center text-center pt-12 border-t border-optional-navy/10"
          >
            <p className="font-paragraph text-lg text-optional-navy/70 mb-10 font-light max-w-2xl">
              Ready to move forward with your legal strategy? Our team is prepared to guide you through every stage of the process with precision and professionalism.
            </p>
            
            <Link
              to="/consultation"
              className="group relative inline-flex items-center justify-center gap-3 bg-accent-gold text-optional-navy font-paragraph font-medium px-12 py-6 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <span className="relative z-10 text-lg">Discuss Your Project</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 8. FINAL CTA - High Impact Conversion */}
      <section className="relative w-full bg-background py-48 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_5ce85cf63b7c4bbcb35cc147acc4cbb8~mv2.png?originWidth=1152&originHeight=768"
            alt="Legal Consultation"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40"></div>
        </div>

        <div className="relative z-10 max-w-[80rem] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Lock className="w-12 h-12 text-accent-gold mx-auto mb-8" />
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-optional-navy mb-8 leading-[1.1]">
              Discuss Your Situation <br/>
              <span className="italic text-accent-gold font-light">Confidentially</span>
            </h2>
            
            <p className="font-paragraph text-xl text-optional-navy/70 mb-12 max-w-2xl mx-auto font-light">
              Schedule a strategic consultation with our international legal team. All discussions are strictly protected by attorney-client privilege.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <Link
                to="/consultation"
                className="group relative flex items-center justify-center gap-3 bg-accent-gold text-optional-navy font-paragraph font-medium px-12 py-6 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <span className="relative z-10 text-lg">Book Consultation – 250 USD</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </Link>
              
              <div className="flex items-center gap-4 text-optional-navy/70 font-paragraph text-sm uppercase tracking-widest">
                <span>EN</span>
                <span className="w-1 h-1 rounded-full bg-accent-gold"></span>
                <span>FR</span>
                <span className="w-1 h-1 rounded-full bg-accent-gold"></span>
                <span>AR</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
