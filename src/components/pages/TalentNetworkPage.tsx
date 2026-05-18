import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-br from-optional-navy via-optional-navy to-optional-navy py-24 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-7xl text-white mb-6 leading-tight">
              JMC LEX Talent & Experts Network
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-secondary-foreground max-w-3xl mx-auto leading-relaxed">
              Connecting multilingual professionals, researchers, advisors, and independent experts for future cross-border collaboration opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INSTITUTIONAL INTRODUCTION */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8">
              Building an International Network of Excellence
            </h2>
            <div className="space-y-6 font-paragraph text-lg text-foreground leading-relaxed">
              <p>
                JMC LEX is progressively building an international network of multilingual professionals, researchers, advisors, and independent experts. Our network is designed to facilitate strategic collaboration, cross-border cooperation, and innovative solutions in the legal, business, and advisory sectors.
              </p>
              <p>
                We connect exceptional talent across multiple disciplines and jurisdictions to support:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>Strategic advisory and consulting initiatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>Cross-border collaboration and international partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>Research initiatives and thought leadership</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>Publishing activities and content creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>Project-based opportunities and specialized engagements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>International professional cooperation and knowledge exchange</span>
                </li>
              </ul>
              <p>
                Our network represents a premium, advisory-focused community dedicated to excellence, innovation, and international collaboration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXPERTISE AREAS SECTION */}
      <section className="w-full py-20 md:py-28 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Expertise Areas
            </h2>
            <p className="font-paragraph text-lg text-foreground">
              Explore our specialized network communities
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {expertiseAreas.map((area) => (
              <motion.div
                key={area.id}
                variants={itemVariants}
                className="bg-white rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  {area.title}
                </h3>
                <p className="font-paragraph text-foreground mb-6 leading-relaxed">
                  {area.description}
                </p>
                <Link
                  to={area.path}
                  className="inline-flex items-center gap-2 text-accent-gold font-paragraph font-semibold hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-20 md:py-28 bg-optional-navy">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
              Join Our Network
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground max-w-2xl mx-auto mb-8">
              Are you a professional, researcher, or expert interested in collaborating with JMC LEX? Explore our expertise areas and submit your profile.
            </p>
            <Link
              to="/talent-network/research-publications"
              className="inline-block bg-accent-gold text-optional-navy px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-opacity-90 transition-all duration-300"
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
