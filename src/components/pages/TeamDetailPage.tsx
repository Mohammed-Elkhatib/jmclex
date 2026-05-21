import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, Mail } from 'lucide-react';
import { Head } from '@/components/Head';
import { buildPageMetadata, getBreadcrumbSchema, getPersonSchema } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();

  const founderData = {
    _id: 'founder-claude',
    name: 'Claude Mcheik',
    role: 'Founder – International Legal Strategist',
    expertise: 'International legal strategy and academic with experience across Europe and the Middle East, combining legal advisory, business structuring, and cross-border expertise.',
    background: 'Claude Mcheik is an international legal strategist, attorney at law, and PhD researcher specializing in cross-border business law, corporate structuring, and high-stakes legal environments. With over a decade of experience across Europe and the Middle East, he advises companies, institutions, and decision-makers on complex legal frameworks, international transactions, and strategic governance. His profile combines academic excellence, legal precision, and business vision, offering clients a unique approach to navigating global legal challenges.',
    photo: 'https://static.wixstatic.com/media/5e1235_381006431e154787849646de845a3470~mv2.png',
    contactEmail: 'Contact@JMCLex.com'
  };

  const member = id === 'founder-claude' ? founderData : null;

  // Build SEO metadata
  const metadata = member ? buildPageMetadata({
    title: `${member.name} | ${member.role} | JMC LEX Team`,
    description: member.expertise,
    keywords: [
      member.name,
      member.role,
      'legal expert',
      'international law',
      'legal advisor',
      'team member',
    ],
    ogImage: member.photo,
    canonicalUrl: `https://www.jmclex.com/team/${id}`,
    structuredData: {
      breadcrumb: getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Team', url: '/team' },
        { name: member.name, url: `/team/${id}` },
      ]),
      person: getPersonSchema({
        name: member.name,
        role: member.role,
        expertise: member.expertise,
        image: member.photo,
        email: member.contactEmail,
        url: `/team/${id}`,
      }),
    },
  }) : null;

  return (
    <div className="min-h-screen bg-background">
      {metadata && <Head metadata={metadata} />}
      <Header />
      
      <div className="min-h-screen pt-32">
        {!member ? (
          <div className="max-w-[100rem] mx-auto px-8 py-32 text-center">
            <h2 className="font-heading text-4xl text-foreground mb-6">Team Member Not Found</h2>
            <Link to="/team" className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all">
              <ArrowLeft className="w-5 h-5" /> Back to Team
            </Link>
          </div>
        ) : (
          <>
            {/* Profile Section */}
            <section className="w-full bg-background py-16">
              <div className="max-w-[100rem] mx-auto px-8">
                <Link to="/team" className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all mb-12">
                  <ArrowLeft className="w-5 h-5" /> Back to Team
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  {/* Profile Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-1"
                  >
                    <div className="relative h-[600px] rounded overflow-hidden mb-8">
                      <Image
                        src={member.photo || 'https://static.wixstatic.com/media/5e1235_e453ea6ccc824c9ca3f467c4ba0c6175~mv2.png?originWidth=448&originHeight=576'}
                        alt={member.name || 'Team member'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {member.contactEmail && (
                      <Link
                        to="/contact"
                        className="w-full inline-flex items-center justify-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-4 rounded transition-all hover:scale-105"
                      >
                        <Mail className="w-5 h-5" />
                        Contact {member.name?.split(' ')[0]}
                      </Link>
                    )}
                  </motion.div>

                  {/* Profile Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-2"
                  >
                    <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
                      {member.name}
                    </h1>
                    <p className="font-paragraph text-2xl text-accent-gold mb-12">{member.role}</p>

                    {member.expertise && (
                      <div className="mb-12">
                        <h2 className="font-heading text-3xl text-foreground mb-6">Expertise</h2>
                        <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
                          {member.expertise}
                        </p>
                      </div>
                    )}

                    {member.background && (
                      <div className="mb-12">
                        <h2 className="font-heading text-3xl text-foreground mb-6">Background</h2>
                        <div className="font-paragraph text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                          {member.background}
                        </div>
                      </div>
                    )}

                    {member.contactEmail && (
                      <div className="bg-optional-navy p-8 rounded">
                        <h3 className="font-heading text-2xl text-foreground mb-4">Get in Touch</h3>
                        <p className="font-paragraph text-base text-foreground/80 mb-6 leading-relaxed">
                          Interested in working with {member.name?.split(' ')[0]}? Contact us to schedule a consultation.
                        </p>
                        <Link
                          to="/consultation"
                          className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded transition-all hover:scale-105"
                        >
                          Book Consultation
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
