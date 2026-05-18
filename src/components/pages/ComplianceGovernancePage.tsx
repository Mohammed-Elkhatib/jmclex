import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TalentNetworkApplicationForm from '@/components/TalentNetworkApplicationForm';

export default function ComplianceGovernancePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION - Premium & Refined */}
      <section className="w-full bg-gradient-to-br from-optional-navy via-optional-navy to-optional-navy py-16 md:py-32 lg:py-40">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/talent-network"
              className="inline-flex items-center gap-2 text-accent-gold font-paragraph font-semibold mb-6 md:mb-8 hover:gap-3 transition-all text-sm md:text-base"
            >
              <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" />
              Back to Network
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 md:mb-6 leading-tight tracking-tight">
              Compliance & Governance
            </h1>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-secondary-foreground max-w-3xl leading-relaxed px-2">
              Work with compliance experts and governance specialists ensuring regulatory excellence and best practices across multiple jurisdictions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROFESSIONAL EXPLANATION - Refined Typography */}
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
              Ensuring Regulatory Excellence and Best Practices
            </h2>
            <div className="space-y-5 md:space-y-6 font-paragraph text-base sm:text-lg text-foreground leading-relaxed">
              <p>
                Our Compliance & Governance network brings together specialized professionals dedicated to regulatory compliance, corporate governance, and risk management. We collaborate on:
              </p>
              <ul className="space-y-2 md:space-y-3 ml-4 md:ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Regulatory compliance across multiple jurisdictions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Corporate governance and board advisory</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Risk management and compliance frameworks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Anti-money laundering and sanctions compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold flex-shrink-0 mt-1">•</span>
                  <span>Data protection and privacy regulations</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COLLABORATION AREAS - Premium Cards */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-10 md:mb-12 leading-tight">
              Collaboration Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                { title: 'Compliance Audits', desc: 'Conduct comprehensive compliance assessments and regulatory audits' },
                { title: 'Governance Advisory', desc: 'Provide expert guidance on corporate governance and board practices' },
                { title: 'Risk Management', desc: 'Develop and implement risk management and compliance frameworks' },
                { title: 'Regulatory Training', desc: 'Deliver compliance training and regulatory awareness programs' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="bg-white p-6 md:p-8 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-accent-gold/10"
                >
                  <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 md:mb-4 leading-tight">{item.title}</h3>
                  <p className="font-paragraph text-sm md:text-base text-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROFILE SUBMISSION - Refined */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 md:mb-6 leading-tight text-center">
              Submit Your Profile
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground mb-10 md:mb-12 leading-relaxed px-2 text-center">
              Are you a compliance or governance professional interested in collaborating with JMC LEX? We welcome qualified specialists to submit their profiles.
            </p>
            <TalentNetworkApplicationForm sourcePage="Compliance & Governance" />
          </motion.div>
        </div>
      </section>

      {/* INTERNAL LINKS - Premium Navigation */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-optional-navy">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-6 md:mb-8 leading-tight">
              Explore More
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Link
                to="/expertise"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-4 md:p-6 rounded-lg text-white font-paragraph font-semibold text-sm md:text-base text-center"
              >
                View Expertise
              </Link>
              <Link
                to="/talent-network"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-4 md:p-6 rounded-lg text-white font-paragraph font-semibold text-sm md:text-base text-center"
              >
                Back to Network
              </Link>
              <Link
                to="/contact"
                className="bg-accent-gold text-optional-navy p-4 md:p-6 rounded-lg font-paragraph font-semibold text-sm md:text-base hover:bg-opacity-90 transition-all text-center"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
