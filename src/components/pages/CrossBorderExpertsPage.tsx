import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CrossBorderExpertsPage() {
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
          >
            <Link
              to="/talent-network"
              className="inline-flex items-center gap-2 text-accent-gold font-paragraph font-semibold mb-8 hover:gap-3 transition-all"
            >
              <ArrowLeft size={18} />
              Back to Network
            </Link>
            <h1 className="font-heading text-5xl md:text-7xl text-white mb-6 leading-tight">
              Cross-Border Experts
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-secondary-foreground max-w-3xl leading-relaxed">
              Join our multilingual professionals and international consultants specializing in cross-border transactions, operations, and international business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROFESSIONAL EXPLANATION */}
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
              Multilingual Expertise in International Operations
            </h2>
            <div className="space-y-6 font-paragraph text-lg text-foreground leading-relaxed">
              <p>
                Our Cross-Border Experts network connects multilingual professionals, international consultants, and specialists with deep experience in cross-border transactions and operations. We collaborate on:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>Cross-border transactions and M&A</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>International operations and management</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>Multilingual business consulting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>Cultural and regulatory adaptation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold font-bold mt-1">•</span>
                  <span>International project management and coordination</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COLLABORATION AREAS */}
      <section className="w-full py-20 md:py-28 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12">
              Collaboration Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Cross-Border Transactions', desc: 'Support complex international transactions and M&A activities' },
                { title: 'International Operations', desc: 'Provide expertise in managing international business operations' },
                { title: 'Multilingual Consulting', desc: 'Deliver consulting services in multiple languages and cultural contexts' },
                { title: 'Project Coordination', desc: 'Coordinate international projects and cross-border initiatives' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-lg"
                >
                  <h3 className="font-heading text-2xl text-foreground mb-4">{item.title}</h3>
                  <p className="font-paragraph text-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROFILE SUBMISSION */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              Submit Your Profile
            </h2>
            <p className="font-paragraph text-lg text-foreground mb-8 leading-relaxed">
              Are you a multilingual professional or international consultant interested in collaborating with JMC LEX? We welcome experienced experts to submit their profiles.
            </p>
            <div className="bg-secondary p-12 rounded-lg">
              <p className="font-paragraph text-foreground mb-6">
                Profile submission form coming soon. Please check back for updates or contact us directly to express your interest.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-accent-gold text-optional-navy px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-opacity-90 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="w-full py-20 md:py-28 bg-optional-navy">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-8">
              Explore More
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/global-presence"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-6 rounded-lg text-white font-paragraph font-semibold"
              >
                Global Presence
              </Link>
              <Link
                to="/talent-network"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-6 rounded-lg text-white font-paragraph font-semibold"
              >
                Back to Network
              </Link>
              <Link
                to="/contact"
                className="bg-accent-gold text-optional-navy p-6 rounded-lg font-paragraph font-semibold hover:bg-opacity-90 transition-all"
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
