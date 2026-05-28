import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function DisclaimerPage() {
  const sections = [
    {
      title: '1. No Legal Advice',
      content: 'The information provided on this website is for informational purposes only and does not constitute legal advice. Nothing on this website should be construed as creating an attorney-client relationship. JMC LEX does not provide legal advice through this website.\n\nIf you require legal advice, you must consult directly with a qualified attorney. The use of this website does not establish an attorney-client relationship with JMC LEX.'
    },
    {
      title: '2. Professional Consultation Required',
      content: 'All legal matters require professional consultation. Before taking any action based on information from this website, you should consult with a qualified legal professional who can review your specific circumstances and provide tailored legal advice.\n\nThe general information provided on this website may not apply to your particular situation and should not be relied upon as a substitute for professional legal counsel.'
    },
    {
      title: '3. Accuracy and Completeness',
      content: 'While JMC LEX strives to provide accurate and current information, we make no representations or warranties regarding the accuracy, completeness, or timeliness of the information on this website. Laws and regulations change frequently, and the information provided may become outdated.\n\nJMC LEX is not responsible for any errors or omissions in the content of this website.'
    },
    {
      title: '4. No Warranty',
      content: 'The information on this website is provided "as is" without warranty of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.\n\nJMC LEX does not warrant that the website will be uninterrupted or error-free, or that defects will be corrected.'
    },
    {
      title: '5. Limitation of Liability',
      content: 'In no event shall JMC LEX, its partners, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, even if advised of the possibility of such damages.\n\nYour use of this website and reliance on any information provided is at your own risk.'
    },
    {
      title: '6. Third-Party Links',
      content: 'This website may contain links to third-party websites. JMC LEX is not responsible for the content, accuracy, or practices of these external sites. Your use of third-party websites is governed by their own terms and conditions.\n\nThe inclusion of links to third-party websites does not constitute an endorsement or recommendation of those sites.'
    },
    {
      title: '7. Confidentiality and Privilege',
      content: 'Attorney-client privilege and work product protection apply to communications with JMC LEX attorneys. However, these protections do not apply to information submitted through this website unless a formal attorney-client relationship has been established.\n\nIf you submit sensitive information through this website, you should be aware that it may not be protected by attorney-client privilege.'
    },
    {
      title: '8. Jurisdictional Limitations',
      content: 'JMC LEX is licensed to practice law in Lebanon and France. The information on this website is provided in accordance with the laws of these jurisdictions. If you are located in another jurisdiction, you should not rely on this information without consulting with a local attorney.\n\nJMC LEX does not provide legal services in jurisdictions where it is not licensed to practice.'
    },
    {
      title: '9. Changes to Disclaimer',
      content: 'JMC LEX reserves the right to modify this disclaimer at any time. Your continued use of this website following any changes constitutes your acceptance of the modified disclaimer.'
    },
    {
      title: '10. Contact for Legal Matters',
      content: 'If you have a legal matter that requires professional attention, please contact JMC LEX directly:\n\nJMC LEX\nEmail: contact@jmclex.com\nPhone: +961 78 873 196 (Lebanon)\nPhone: +33 7 69 59 69 22 (France)\n\nWe are ready to discuss your legal needs and establish a formal attorney-client relationship if appropriate.'
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
              Legal <span className="text-accent-gold">Disclaimer</span>
            </h1>
            <p className="font-paragraph text-lg text-background/80 max-w-2xl mx-auto">
              Important information regarding the use of JMC LEX services and website. Please read carefully before proceeding.
            </p>
            <p className="font-paragraph text-sm text-background/70 mt-6">
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

            {/* Critical Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-accent-gold/5 border-2 border-accent-gold rounded-lg"
            >
              <p className="font-paragraph text-sm text-text-secondary leading-relaxed">
                <strong className="text-accent-gold">CRITICAL NOTICE:</strong> This website does not establish an attorney-client relationship. The information provided is general in nature and should not be relied upon as legal advice. For any legal matter, you must consult directly with a qualified attorney. JMC LEX assumes no liability for any action taken or not taken based on information from this website.
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
