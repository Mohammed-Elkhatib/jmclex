import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Introduction',
      content: 'JMC LEX ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.'
    },
    {
      title: '2. Information We Collect',
      content: 'We may collect information about you in a variety of ways. The information we may collect on the Site includes:\n\n• Personal identification information (name, email address, phone number, company, position)\n• Professional information (areas of expertise, credentials, background)\n• Communication data (messages, inquiries, consultation requests)\n• Technical data (IP address, browser type, pages visited, time spent)\n• Payment information (processed securely through third-party providers)'
    },
    {
      title: '3. Use of Your Information',
      content: 'Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:\n\n• Process your transactions and send related information\n• Email you regarding your account or order\n• Fulfill and manage purchases, orders, payments, and other transactions\n• Generate a personal profile about you\n• Increase the efficiency and operation of the Site\n• Monitor and analyze usage and trends to improve your experience\n• Notify you of updates to the Site\n• Offer new products, services, and/or recommendations'
    },
    {
      title: '4. Disclosure of Your Information',
      content: 'We may share or disclose your information in the following circumstances:\n\n• By Law or to Protect Rights: If we believe the release of information is necessary to comply with the law, enforce our Site policies, or protect ours or others\' rights, property, and safety.\n• Third-Party Service Providers: We may share your information with third parties that perform services for us, including payment processors, email providers, and analytics services.\n• Business Transfers: If JMC LEX is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.\n• With Your Consent: We may disclose your information with your explicit consent for any purpose.'
    },
    {
      title: '5. Security of Your Information',
      content: 'We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.'
    },
    {
      title: '6. Contact Us',
      content: 'If you have questions or comments about this Privacy Policy, please contact us at:\n\nJMC LEX\nEmail: contact@jmclex.com\nPhone: +961 78 873 196 (Lebanon)\nPhone: +33 7 69 59 69 22 (France)'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full pt-32 pb-16 md:pb-24 bg-gradient-to-b from-optional-navy to-optional-navy/95">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl text-background mb-6">
              Privacy <span className="text-accent-gold">Policy</span>
            </h1>
            <p className="font-paragraph text-lg text-background/80 max-w-2xl mx-auto">
              Your privacy is paramount to JMC LEX. We are committed to transparency and protecting your personal information with the highest standards of confidentiality.
            </p>
            <p className="font-paragraph text-sm text-background/60 mt-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12 pb-12 border-b border-optional-navy/10 last:border-b-0"
              >
                <h2 className="font-heading text-2xl text-optional-navy mb-4">
                  {section.title}
                </h2>
                <p className="font-paragraph text-base text-text-secondary leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </motion.div>
            ))}

            {/* Additional Legal Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-secondary rounded-lg border border-optional-navy/10"
            >
              <p className="font-paragraph text-sm text-text-secondary leading-relaxed">
                <strong>Legal Notice:</strong> This Privacy Policy is provided for informational purposes and does not constitute legal advice. For specific privacy concerns or to discuss how your data is handled in relation to your legal matters, please contact our team directly. Attorney-client privilege may apply to certain communications.
              </p>
            </motion.div>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link
                to="/"
                className="inline-block font-paragraph text-sm font-medium text-accent-gold hover:text-accent-gold-dark transition-colors duration-300"
              >
                ← Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
