// HPI 1.7-G
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Scale, Globe, Shield, BookOpen, Briefcase, Building2, FileText, GraduationCap, Database, MapPin, Lock, Calendar } from 'lucide-react';
import { useTranslation } from '@/lib/use-translation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InternationalIconsRow from '@/components/InternationalIconsRow';
import AudioSystem from '@/components/AudioSystem';

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

// ... keep existing code (GLOBAL_LOCATIONS removed as it's now hardcoded in the section) ...

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

  return (
    <div className="min-h-screen bg-background text-optional-navy selection:bg-accent-gold selection:text-background overflow-clip">
      <AudioSystem />
      <Header />
      
      {/* 1. HERO SECTION - Full Bleed, Cinematic */}
      <section ref={heroRef} className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: yBg, opacity: opacityBg }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://static.wixstatic.com/media/5e1235_f4bf3179ebc94b02bd944a19cf135d4b~mv2.png?originWidth=1920&originHeight=1024"
            alt="International legal strategy cityscape"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient Overlays for Depth - Reduced Blur */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/20 via-background/40 to-background"></div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#0A1F2F_100%)] opacity-40"></div>
        
        <div className="relative z-20 w-full max-w-[120rem] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 border border-accent-gold/40 rounded-full mb-8 backdrop-blur-md bg-background/20"
          >
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse"></span>
            <span className="font-paragraph text-xs tracking-[0.2em] uppercase text-accent-gold">Expertise Since 1990 • Global Presence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[1.05] text-background mb-8 max-w-6xl text-balance"
          >
            International Legal Strategy, <br className="hidden md:block" />
            Architecture & Business Advisory
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-paragraph text-lg md:text-2xl text-background/80 mb-6 max-w-3xl mx-auto font-light tracking-wide"
          >
            Navigating complex legal environments. Delivering strategic solutions across jurisdictions for the world's most demanding clients.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-paragraph text-base md:text-lg text-background/70 mb-12 max-w-3xl mx-auto font-light tracking-wide italic"
          >
            We provide legal, business, economic, and tax advisory services for multinational clients across EMEA.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto"
          >
            <Link
              to="/consultation"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-accent-gold text-background font-paragraph font-medium px-10 py-5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <span className="relative z-10">{t('hero.standard-consultation')}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </Link>
            <Link
              to="/consultation?type=emergency"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-accent-gold text-background font-paragraph font-medium px-10 py-5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 border-accent-gold/50"
            >
              <span className="relative z-10">{t('hero.emergency-consultation')}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        >
          <span className="font-paragraph text-xs tracking-widest text-background/60 uppercase">Scroll to explore</span>
          <div className="w-[1px] h-16 bg-background/30 overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-accent-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. INTRO & KEY FIGURES - Architectural Layout */}
      <section className="relative w-full bg-background pt-32 pb-20 border-t border-optional-navy/10">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Typography */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-optional-navy mb-10 leading-[1.1] text-balance">
                  JMC LEX <br/>
                  <span className="text-optional-navy/50">Strategic & International Law</span>
                </h2>
                
                <div className="space-y-8 font-paragraph text-lg md:text-xl text-optional-navy/80 font-light leading-relaxed max-w-3xl">
                  <p>
                    With lawyers' expertise spanning since the 1990s, JMC LEX is a premier international law firm specializing in strategic legal advisory and cross-border operations. We serve as the trusted counsel for CEOs, investors, international corporations, and high-net-worth individuals.
                  </p>
                  <p>
                    Our practice is built on the ability to navigate complex, multi-jurisdictional environments, providing clarity and decisive action in high-stakes scenarios.
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
                className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-lg"
              >
                <Image
                  src="https://static.wixstatic.com/media/5e1235_17d294d373744472ad855876521a8a6b~mv2.png?originWidth=1152&originHeight=896"
                  alt="JMC Legal office environment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-optional-navy/10 mix-blend-multiply"></div>
              </motion.div>

              {/* Floating Stats Box */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-12 -left-12 md:-left-24 bg-optional-navy p-8 md:p-12 border border-accent-gold/20 rounded-lg"
              >
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <div className="text-accent-gold font-heading text-5xl md:text-6xl mb-2">200+</div>
                    <div className="font-paragraph text-sm text-background/70 uppercase tracking-wider">Contracts<br/>Negotiated</div>
                  </div>
                  <div>
                    <div className="text-accent-gold font-heading text-5xl md:text-6xl mb-2">100+</div>
                    <div className="font-paragraph text-sm text-background/70 uppercase tracking-wider">Disputes<br/>Resolved</div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DIASPORA - Sticky Narrative Section */}
      <section className="relative w-full bg-secondary py-32">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Sticky Image Side */}
            <div className="lg:w-5/12 relative">
              <div className="sticky top-32 h-[70vh] w-full overflow-hidden rounded-lg">
                <Image
                  src="https://static.wixstatic.com/media/5e1235_60a06ebccff14aa6ab851af0156f7a11~mv2.png?originWidth=640&originHeight=896"
                  alt="Global diaspora services"
                  className="w-full h-full object-cover"
                />
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
                <div className="inline-flex items-center gap-3 mb-8">
                  <span className="w-8 h-[1px] bg-accent-gold"></span>
                  <span className="font-paragraph text-sm tracking-widest uppercase text-accent-gold">Lebanese Diaspora</span>
                </div>
                
                <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-optional-navy mb-10 leading-[1.15] tracking-tight">
                  Global Clients & <br/>Lebanese Diaspora
                </h2>
                
                <p className="font-paragraph text-base md:text-lg text-optional-navy/80 mb-12 font-light leading-relaxed">
                  We provide high-level legal services to Lebanese clients worldwide, as well as to international individuals and businesses of all nationalities with legal matters, disputes, or strategic interests in Lebanon.
                  <br/><br/>
                  Our services extend beyond Lebanon to France, across Europe, and throughout the GCC region, supported by a trusted network of partners in key jurisdictions worldwide.
                  <br/><br/>
                  We operate a selective client approach, allowing us to deliver tailored, high-quality legal advice and ensure the highest level of attention, precision, and strategic value in every engagement.
                  <br/><br/>
                  Whether you require legal representation, litigation support, corporate structuring, or strategic advisory, our cross-border expertise ensures that your rights and interests are effectively protected and managed across jurisdictions.
                  <br/><br/>
                  With a deep understanding of complex legal environments, we guide our clients through legal procedures with discretion, efficiency, and the highest standards of professionalism.
                </p>
                
                {/* Arabic Text Block - Exact Match Required */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative bg-gradient-to-br from-accent-gold/5 to-accent-gold/10 border border-accent-gold/30 p-8 md:p-10 rounded-xl mb-12 backdrop-blur-sm overflow-hidden group hover:border-accent-gold/50 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent-gold/10 blur-3xl rounded-full group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-gold/5 blur-3xl rounded-full"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <p dir="rtl" className="font-paragraph text-sm md:text-base text-optional-navy leading-relaxed text-right font-medium tracking-wide">
                      الزبائن الكرام،
                      نحيطكم علماً أنه في كافة القضايا أمام المحاكم والإدارات الرسمية اللبنانية، سواء داخل لبنان أو خارجه، يمكنكم تنظيم وكالة عامة أو خاصة للمدافعة والمرافعة لدى القنصليات أو السفارات اللبنانية في مكان إقامتكم، وتصديقها وفق الأصول القانونية المعتمدة، ومن ثم إرسالها إلينا.
                      على أن يتم تحديد نوع الوكالة وتفاصيلها في وقت لاحق، بعد أول تواصل معنا، وذلك بما يتناسب مع طبيعة القضية ومتطلباتها القانونية.
                      نتولى، بموجب هذه الوكالة، متابعة جميع الإجراءات القانونية في لبنان بكفاءة عالية واحترافية تامة، مع ضمان أقصى درجات الدقة، والسرية، والالتزام المهني في جميع مراحل العمل.
                      وتفضلوا بقبول فائق الاحترام.
                    </p>
                    
                    <div className="h-px bg-gradient-to-r from-accent-gold/0 via-accent-gold/30 to-accent-gold/0"></div>
                    
                    <p className="font-paragraph text-sm md:text-base text-optional-navy leading-relaxed font-medium tracking-wide">
                      Dear clients,
                      We would like to inform you that for all legal matters before Lebanese courts and official authorities, whether within Lebanon or abroad, you may issue a general or specific power of attorney for legal representation through the Lebanese consulate or embassy in your country of residence. This document should be duly legalized in accordance with applicable legal procedures and then transmitted to our office.
                      The type and scope of the power of attorney will be determined at a later stage, following an initial consultation with us, in accordance with the specific nature and legal requirements of your case.
                      Upon receipt, we will handle and manage all legal procedures in Lebanon with the highest standards of professionalism, efficiency, precision, and strict confidentiality throughout every stage of the process.
                      Yours sincerely.
                    </p>
                  </div>
                </motion.div>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 text-accent-gold font-paragraph font-medium text-lg group"
                >
                  <span>Initiate Contact</span>
                  <span className="w-8 h-[1px] bg-accent-gold group-hover:w-12 transition-all duration-300"></span>
                  <ArrowRight className="w-5 h-5 -ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5. ELITE BRAND BLOCK - Premium Three Column Section */}
      <section className="relative w-full bg-background py-32 border-t border-optional-navy/10">
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

      {/* 3.7. FOUNDERS SECTION - Side by Side Premium Profiles */}
      <section className="relative w-full bg-secondary py-32">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-optional-navy mb-4">
              Leadership
            </h2>
            <p className="font-paragraph text-lg text-optional-navy/70">
              Meet the founders of JMC LEX
            </p>
          </motion.div>

          {/* Side by Side Profiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* LEFT: Claude Mcheik - Founder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="relative h-[500px] overflow-hidden rounded-lg mb-8 group">
                <Image
                  src="https://static.wixstatic.com/media/5e1235_8ccced5019da4821b2c124bf7919b832~mv2.jpg"
                  alt="Claude Mcheik, Founder"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-optional-navy/30 via-transparent to-transparent"></div>
              </div>

              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-accent-gold"></span>
                <span className="font-paragraph text-sm tracking-widest uppercase text-accent-gold">Founder</span>
              </div>

              <h3 className="font-heading text-3xl md:text-4xl text-optional-navy mb-2">
                Claude Mcheik
              </h3>
              <p className="font-paragraph text-lg text-accent-gold mb-6 font-medium">
                Founder — International Legal Strategist
              </p>

              <p className="font-paragraph text-base md:text-lg text-optional-navy/80 mb-8 font-light leading-relaxed">
                Claude Mcheik is an attorney at law, senior legal counsel, academic and international legal strategist with over 25 years of professional experience and more than 13 years as an attorney at law and senior legal advisor. He has built a cross-border legal career between France and Lebanon, advising companies, entrepreneurs, investors and decision-makers on complex legal, tax, corporate and multi-jurisdictional matters. His work covers international business structuring, M&A, commercial transactions, tax-driven legal analysis, governance, compliance, dispute strategy and high-level advisory across EMEA. Alongside his legal practice, he has taught law in leading universities and business schools and developed a strong research profile, combining academic rigor, strategic thinking and practical legal execution. Fluent in French, English and Arabic, he advises Lebanese diaspora clients, international investors and business leaders seeking to structure, secure and expand their projects across Europe, France, Switzerland, Lebanon and the wider Middle East.
              </p>

              <Link
                to="/consultation"
                className="group inline-flex items-center gap-3 bg-accent-gold text-optional-navy font-paragraph font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] w-fit"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* RIGHT: Me Antoine Y. S. - Co-Founder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="relative h-[500px] overflow-hidden rounded-lg mb-8 group">
                <Image
                  src="https://static.wixstatic.com/media/5e1235_50ee51499d964a9185c94fd9cad9eb21~mv2.png"
                  alt="Me Antoine Y. S., Co-Founder"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-optional-navy/30 via-transparent to-transparent"></div>
              </div>

              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-accent-gold"></span>
                <span className="font-paragraph text-sm tracking-widest uppercase text-accent-gold">Co-Founder</span>
              </div>

              <h3 className="font-heading text-3xl md:text-4xl text-optional-navy mb-2">
                Me Antoine Y. S.
              </h3>
              <p className="font-paragraph text-lg text-accent-gold mb-6 font-medium">
                Co-Founder — Senior Legal Counsel
              </p>

              <p className="font-paragraph text-base md:text-lg text-optional-navy/80 mb-8 font-light leading-relaxed">
                Me Antoine Y. S. is an attorney at law and senior legal counsel with over 36 years of legal experience. He is recognized as one of the established pillars of legal practice in Lebanon and the MEA region. His work reflects decades of litigation, legal advisory, negotiation and strategic counsel in complex civil, commercial, corporate and cross-border matters. He brings deep regional knowledge, institutional experience and a highly trusted legal judgment to clients facing sensitive legal and business issues. As Co-Founder of JMC LEX, he contributes senior legal wisdom, regional authority and strategic oversight to the platform's international advisory work, particularly for Lebanese diaspora clients, investors and companies requiring reliable legal support in Lebanon, Europe, France, Switzerland and the wider MEA region.
              </p>

              <Link
                to="/consultation"
                className="group inline-flex items-center gap-3 bg-accent-gold text-optional-navy font-paragraph font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] w-fit"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ... keep existing code (4. EXPERTISE section and beyond) ... */}
      <section className="relative w-full bg-optional-navy py-32 border-y border-optional-navy/20">
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
                <p className="font-paragraph text-sm text-background/60 mb-8 line-clamp-2 font-light">
                  {item.desc}
                </p>
                
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

      {/* 5. DIGITAL PLATFORMS - Business Model Focus */}
      <section className="relative w-full bg-background py-32">
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
      <section className="relative w-full bg-background py-32 border-t border-optional-navy/10">
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
                  <span className="font-paragraph text-sm text-optional-navy/50">{pub.date}</span>
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
      <section className="relative w-full bg-optional-navy py-32">
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

      {/* 8. FINAL CTA - High Impact Conversion */}
      <section className="relative w-full bg-background py-40 overflow-hidden">
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
              
              <div className="flex items-center gap-4 text-optional-navy/50 font-paragraph text-sm uppercase tracking-widest">
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
