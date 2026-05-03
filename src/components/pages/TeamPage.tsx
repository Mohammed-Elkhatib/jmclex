import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const result = await BaseCrudService.getAll<TeamMembers>('teammembers');
      setTeam(result.items);
    } catch (error) {
      console.error('Error loading team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const founderData = {
    _id: 'founder-claude',
    name: 'Claude Mcheik',
    role: 'Founder – International Legal Strategist',
    expertise: 'International legal strategy and academic with experience across Europe and the Middle East, combining legal advisory, business structuring, and cross-border expertise.',
    background: 'Claude Mcheik is an international legal strategist, attorney at law, and PhD researcher specializing in cross-border business law, corporate structuring, and high-stakes legal environments. With over a decade of experience across Europe and the Middle East, he advises companies, institutions, and decision-makers on complex legal frameworks, international transactions, and strategic governance. His profile combines academic excellence, legal precision, and business vision, offering clients a unique approach to navigating global legal challenges.',
    photo: 'https://static.wixstatic.com/media/5e1235_381006431e154787849646de845a3470~mv2.png'
  };

  const filteredTeam = filter === 'all' 
    ? [founderData as TeamMembers, ...team]
    : [founderData as TeamMembers, ...team].filter(member => member.role?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_c7f6a92fc44a4b7da598cec1dca10b94~mv2.png?originWidth=1152&originHeight=576"
            alt="Legal team"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-[100rem] mx-auto px-8 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-7xl text-foreground mb-8"
          >
            Our Team
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Experienced legal professionals dedicated to excellence in international law
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full bg-optional-navy py-12">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {['all', 'founder', 'partner', 'associate', 'counsel'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`font-paragraph px-6 py-3 rounded transition-all ${
                  filter === filterOption
                    ? 'bg-accent-gold text-secondary-foreground'
                    : 'bg-background text-foreground hover:bg-accent-gold hover:text-secondary-foreground'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredTeam.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredTeam.map((member, index) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="block">
                      <div className="relative h-[400px] mb-6 overflow-hidden rounded">
                        <Image
                          src={member.photo || 'https://static.wixstatic.com/media/5e1235_381006431e154787849646de845a3470~mv2.png'}
                          alt={member.name || 'Team member'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <h3 className="font-heading text-3xl text-foreground mb-2 group-hover:text-accent-gold transition-colors">
                        {member.name}
                      </h3>
                      <p className="font-paragraph text-base text-accent-gold mb-4">{member.role}</p>
                      <p className="font-paragraph text-sm text-foreground/80 mb-6 leading-relaxed line-clamp-3">
                        {member.expertise}
                      </p>
                      <button
                        onClick={() => setExpandedMemberId(expandedMemberId === member._id ? null : member._id)}
                        className="inline-flex items-center gap-2 font-paragraph text-accent-gold group-hover:gap-4 transition-all"
                      >
                        {expandedMemberId === member._id ? 'Hide' : 'View'} Profile
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedMemberId === member._id ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Expandable Biography */}
                      {expandedMemberId === member._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-accent-gold/30"
                        >
                          <p className="font-paragraph text-base text-foreground/90 leading-relaxed">
                            {member.background}
                          </p>
                          {member.contactEmail && (
                            <a
                              href={`mailto:${member.contactEmail}`}
                              className="inline-flex items-center gap-2 mt-4 text-accent-gold hover:text-accent-gold/80 transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                              {member.contactEmail}
                            </a>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground/60">
                  No team members found for this filter
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">
              Work With Our Expert Team
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 mb-12 max-w-3xl mx-auto">
              Schedule a consultation to discuss your legal needs with our experienced professionals
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-10 py-5 rounded text-lg transition-all hover:scale-105"
            >
              Book Consultation <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
