import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, Mail } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<TeamMembers | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMember();
  }, [id]);

  const loadMember = async () => {
    if (!id) return;
    try {
      // Add timeout protection - max 5 seconds
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Data fetch timeout')), 5000)
      );
      
      const data = await Promise.race([
        BaseCrudService.getById<TeamMembers>('teammembers', id),
        timeoutPromise
      ]) as any;
      
      setMember(data || null);
    } catch (error) {
      console.error('Error loading team member:', error);
      setMember(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="min-h-screen pt-32">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !member ? (
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
