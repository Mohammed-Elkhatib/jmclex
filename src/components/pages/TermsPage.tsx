import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Agreement to Terms',
      content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: '2. Use License',
      content: 'Permission is granted to temporarily download one copy of the materials (information or software) on JMC LEX\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n\n• Modify or copy the materials\n• Use the materials for any commercial purpose or for any public display\n• Attempt to decompile or reverse engineer any software contained on the website\n• Remove any copyright or other proprietary notations from the materials\n• Transfer the materials to another person or "mirror" the materials on any other server\n• Violate any applicable laws or regulations\n• Engage in any conduct that restricts or inhibits anyone\'s use or enjoyment of the website'
    },
    {
      title: '3. Disclaimer',
      content: 'The materials on JMC LEX\'s website are provided on an \'as is\' basis. JMC LEX makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.\n\nFurther, JMC LEX does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.'
    },
    {
      title: '4. Limitations',
      content: 'In no event shall JMC LEX or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on JMC LEX\'s website, even if JMC LEX or an authorized representative has been notified orally or in writing of the possibility of such damage.'
    },
    {
      title: '5. Accuracy of Materials',
      content: 'The materials appearing on JMC LEX\'s website could include technical, typographical, or photographic errors. JMC LEX does not warrant that any of the materials on its website are accurate, complete, or current. JMC LEX may make changes to the materials contained on its website at any time without notice.'
    },
    {
      title: '6. Links',
      content: 'JMC LEX has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by JMC LEX of the site. Use of any such linked website is at the user\'s own risk.'
    },
    {
      title: '7. Modifications',
      content: 'JMC LEX may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.'
    },
    {
      title: '8. Governing Law',
      content: 'These terms and conditions are governed by and construed in accordance with the laws of Lebanon and France, and you irrevocably submit to the exclusive jurisdiction of the courts in those locations.'
    },
    {
      title: '9. Contact Information',
      content: 'If you have any questions about these Terms of Service, please contact us at:\n\nJMC LEX\nEmail: contact@jmclex.com\nPhone: +961 78 873 196 (Lebanon)\nPhone: +33 7 69 59 69 22 (France)'
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
              Terms of <span className="text-accent-gold">Service</span>
            </h1>
            <p className="font-paragraph text-lg text-background/80 max-w-2xl mx-auto">
              Please read these terms carefully. By using JMC LEX services, you agree to be bound by these terms and conditions.
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

            {/* Additional Legal Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-secondary rounded-lg border border-optional-navy/10"
            >
              <p className="font-paragraph text-sm text-text-secondary leading-relaxed">
                <strong>Legal Notice:</strong> These Terms of Service are provided for informational purposes and do not constitute legal advice. If you have questions about these terms or how they apply to your specific situation, please contact our legal team. Attorney-client privilege may apply to certain communications.
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
