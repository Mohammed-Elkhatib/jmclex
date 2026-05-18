import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TalentNetworkPage() {
  const expertiseAreas = [
    {
      id: 'research-publications',
      title: 'Research & Publications',
      description: 'Connect with leading researchers, academics, and thought leaders contributing to cutting-edge legal and business research initiatives.',
      icon: '📚',
      path: '/talent-network/research-publications'
    },
    {
      id: 'legal-advisory',
      title: 'Legal & Advisory',
      description: 'Join our network of distinguished legal professionals and strategic advisors specializing in cross-border legal solutions.',
      icon: '⚖️',
      path: '/talent-network/legal-advisory'
    },
    {
      id: 'business-development',
      title: 'Business Development',
      description: 'Collaborate with business development professionals focused on international expansion and strategic partnerships.',
      icon: '🌐',
      path: '/talent-network/business-development'
    },
    {
      id: 'compliance-governance',
      title: 'Compliance & Governance',
      description: 'Work with compliance experts and governance specialists ensuring regulatory excellence across jurisdictions.',
      icon: '✓',
      path: '/talent-network/compliance-governance'
    },
    {
      id: 'tax-structuring',
      title: 'Tax & Structuring',
      description: 'Connect with tax specialists and structuring experts providing innovative cross-border tax solutions.',
      icon: '💼',
      path: '/talent-network/tax-structuring'
    },
    {
      id: 'cross-border-experts',
      title: 'Cross-Border Experts',
      description: 'Join multilingual professionals and international consultants specializing in cross-border transactions and operations.',
      icon: '🌍',
      path: '/talent-network/cross-border-experts'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION - Premium & Refined */}
      <section className="w-full bg-gradient-to-br from-optional-navy via-optional-navy to-optional-navy py-20 md:py-40 lg:py-48">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 md:mb-8 leading-tight tracking-tight">
              JMC LEX Talent & Experts Network
            </h1>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-secondary-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Connecting multilingual professionals, researchers, advisors, and independent experts for strategic cross-border collaboration opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INSTITUTIONAL INTRODUCTION - Refined Typography */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-6 md:mb-8 leading-tight">
              Building an International Ecosystem of Excellence
            </h2>
            <div className="space-y-5 md:space-y-6 font-paragraph text-base sm:text-lg text-foreground leading-relaxed">
              <p>
                JMC LEX is progressively building an international ecosystem of multilingual professionals, researchers, advisors, and independent experts. Our network is designed to facilitate strategic collaboration, cross-border cooperation, and innovative solutions in the legal, business, and advisory sectors.
              </p>
              <p>
                We connect exceptional talent across multiple disciplines and jurisdictions to support:
              </p>
              <ul className="space-y-2 md:space-y-3 ml-4 md:ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Strategic advisory and consulting initiatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Cross-border collaboration and international partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Research initiatives and thought leadership</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Publishing activities and content creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Project-based opportunities and specialized engagements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>International professional cooperation and knowledge exchange</span>
                </li>
              </ul>
              <p className="pt-2">
                Our network represents a premium, advisory-focused community dedicated to excellence, innovation, and international collaboration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXPERTISE AREAS SECTION - Premium Cards */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 md:mb-4 leading-tight">
              Expertise Areas
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground">
              Explore our specialized network communities
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {expertiseAreas.map((area) => (
              <motion.div
                key={area.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="bg-white rounded-lg p-6 md:p-8 hover:shadow-md transition-all duration-300 border border-transparent hover:border-accent-gold/10"
              >
                <div className="text-3xl md:text-4xl mb-4 md:mb-5">{area.icon}</div>
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 md:mb-4 leading-tight">
                  {area.title}
                </h3>
                <p className="font-paragraph text-sm md:text-base text-foreground mb-5 md:mb-6 leading-relaxed">
                  {area.description}
                </p>
                <Link
                  to={area.path}
                  className="inline-flex items-center gap-2 text-accent-gold font-paragraph font-semibold text-sm md:text-base hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION - Premium Positioning */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-optional-navy">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4 md:mb-6 leading-tight">
              Join Our Network
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-secondary-foreground max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
              Are you a professional, researcher, or expert interested in collaborating with JMC LEX? Explore our expertise areas and connect with our community.
            </p>
            <Link
              to="/talent-network/research-publications"
              className="inline-block bg-accent-gold text-optional-navy px-6 md:px-8 py-3 md:py-4 rounded-lg font-paragraph font-semibold text-sm md:text-base hover:bg-opacity-90 transition-all duration-300"
            >
              Explore Opportunities
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
