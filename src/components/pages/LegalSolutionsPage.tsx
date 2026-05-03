import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface ServiceSection {
  id: string;
  title: string;
  description: string;
  items: string[];
}

const serviceSections: ServiceSection[] = [
  {
    id: 'contract-drafting',
    title: 'Contract Drafting Services',
    description: 'Professional contract creation tailored to your specific business needs',
    items: [
      'Tailored agreements',
      'International contracts',
      'Risk clauses'
    ]
  },
  {
    id: 'market-entry',
    title: 'Market Entry Study (Europe)',
    description: 'Comprehensive analysis for successful market entry into European markets',
    items: [
      'Legal feasibility',
      'Regulatory mapping',
      'Economic Study'
    ]
  },
  {
    id: 'economic-analysis',
    title: 'Economic Study',
    description: 'Detailed financial and economic analysis for your business expansion',
    items: [
      'Cost structure',
      'Financial projection',
      'Market analysis'
    ]
  },
  {
    id: 'legal-feasibility',
    title: 'Legal Feasibility Study',
    description: 'In-depth legal assessment of your business operations and compliance',
    items: [
      'Compliance risk',
      'Licensing requirements',
      'Regulatory assessment'
    ]
  },
  {
    id: 'full-package',
    title: 'Full Business Package',
    description: 'Complete end-to-end solution combining all legal and business services',
    items: [
      'Contract drafting',
      'Market analysis',
      'Legal compliance',
      'Financial planning'
    ]
  }
];

export default function LegalSolutionsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary mb-6">
            Legal Solutions & Studies
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-secondary-foreground max-w-3xl mx-auto mb-8">
            Comprehensive legal and business solutions designed to support your growth, compliance, and market expansion strategies
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/consultation">
              <Button className="bg-accent-gold hover:bg-accent-gold/90 text-primary px-8 py-3 rounded-lg font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceSections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="group"
            >
              <div
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="bg-white border border-gray-200 rounded-lg p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-accent-gold"
              >
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">
                  {section.title}
                </h3>
                <p className="font-paragraph text-secondary-foreground mb-6">
                  {section.description}
                </p>

                {/* Items List */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="font-paragraph text-sm text-secondary-foreground flex items-start">
                        <span className="text-accent-gold mr-3 font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link to="/consultation">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold py-2">
                    Request this Service
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20 bg-secondary rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Why Choose Our Services
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground max-w-2xl mx-auto">
            We combine deep legal expertise with practical business knowledge to deliver solutions that work
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { title: 'Expert Team', desc: 'Experienced legal professionals' },
            { title: 'Tailored Solutions', desc: 'Customized to your needs' },
            { title: 'Global Reach', desc: 'International market expertise' },
            { title: 'Proven Results', desc: 'Track record of success' }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-lg p-6 text-center"
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="font-paragraph text-sm text-secondary-foreground">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary rounded-lg p-12 md:p-16 text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our experts to discuss your specific needs and find the perfect solution
          </p>
          <Link to="/consultation">
            <Button className="bg-accent-gold hover:bg-accent-gold/90 text-primary px-10 py-3 rounded-lg font-semibold text-lg">
              Schedule Consultation
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
