import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Award, BookOpen, Users, Globe, Zap, Shield, Clock, CheckCircle } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { TrainingCourses } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function TrainingPage() {
  const [courses, setCourses] = useState<TrainingCourses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const result = await BaseCrudService.getAll<TrainingCourses>('trainingcourses');
      setCourses(result.items);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Organize courses by level
  const coursesByLevel = useMemo(() => {
    const level1 = courses.filter(c => c.level?.includes('1') || c.level?.includes('Foundations') || c.level?.includes('Level 1'));
    const level2 = courses.filter(c => c.level?.includes('2') || c.level?.includes('Advanced') || c.level?.includes('Level 2'));
    const other = courses.filter(c => !c.level || (!c.level.includes('1') && !c.level.includes('2') && !c.level.includes('Foundations') && !c.level.includes('Advanced')));
    return { level1, level2, other };
  }, [courses]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Cart />
      
      {/* Premium Hero Section with Slogan */}
      <section className="relative w-full bg-optional-navy overflow-hidden pt-20 pb-16 md:pb-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6 md:mb-8">
              Elite Legal Experts Transferring Years of Strategic Knowledge in Six Executive Hours
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-paragraph text-base md:text-lg text-foreground/90 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Private one-to-one executive legal education and strategic advisory sessions for business leaders, professionals, investors, and international decision-makers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-6 md:pt-8 border-t border-foreground/20 flex-wrap"
            >
              {[
                { label: 'Confidential', icon: Shield },
                { label: 'One-to-One', icon: Users },
                { label: 'Elite Expertise', icon: Award },
                { label: 'Strategic Advisory', icon: Globe }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-5 h-5 text-accent-gold flex-shrink-0" />
                  <span className="font-paragraph text-sm md:text-base text-foreground/80">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Executive Education Excellence */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 md:mb-6">
              Executive Education Excellence
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              Premium programs designed for selective enrollment and confidential executive learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Rigorous Curriculum',
                description: 'Internally designed by JMC LEX experts and grounded in deep legal research'
              },
              {
                icon: Users,
                title: 'Expert Practitioners',
                description: 'Minimum 10+ years of professional experience in international legal practice'
              },
              {
                icon: Globe,
                title: 'English & French',
                description: 'Programs available in both languages for our global professional community'
              },
              {
                icon: Award,
                title: 'Professional Certificate',
                description: 'Certificate of completion issued by JMC LEX upon successful completion'
              },
              {
                icon: Zap,
                title: 'One-to-One Format',
                description: 'Private, confidential sessions ensuring executive-level discretion'
              },
              {
                icon: Clock,
                title: '6-Hour Programs',
                description: 'Theory, practical application, case analysis, and final assessment'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="bg-optional-navy rounded-lg p-6 md:p-8 border border-accent-gold/20"
              >
                <feature.icon className="w-10 h-10 text-accent-gold mb-4" />
                <h3 className="font-heading text-lg md:text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="font-paragraph text-sm md:text-base text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="w-full bg-optional-navy py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 md:mb-6">
              Selective Enrollment Process
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              Our selective process ensures premium learning and maintains executive-level confidentiality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { step: '1', title: 'Application', desc: 'Submit your profile' },
              { step: '2', title: 'Review', desc: '72-hour evaluation' },
              { step: '3', title: 'Consultation', desc: 'Confidential call' },
              { step: '4', title: 'Approval', desc: 'Enrollment confirmed' },
              { step: '5', title: 'Payment', desc: 'Secure arrangement' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-gold text-secondary-foreground rounded-full flex items-center justify-center font-heading text-lg md:text-xl mx-auto mb-3 md:mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-base md:text-lg text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-xs md:text-sm text-foreground/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 md:mb-6">
              Program Structure & Benefits
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              Each 6-hour program is meticulously designed to deliver strategic value
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: 'Comprehensive Curriculum',
                items: ['Theoretical foundations', 'Practical workshops', 'Strategic application', 'Real-world case studies']
              },
              {
                title: 'Professional Development',
                items: ['Expert instructor guidance', 'Interactive learning modules', 'Peer networking opportunities', 'Ongoing resource access']
              },
              {
                title: 'Certification & Recognition',
                items: ['Professional certificate of completion', 'Recognized by international organizations', 'Career advancement value', 'Continuing education credits']
              },
              {
                title: 'Corporate Solutions',
                items: ['Tailored packages for legal departments', 'Compliance team training', 'Finance department programs', 'Executive leadership development']
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="bg-optional-navy p-6 md:p-8 rounded-lg border border-accent-gold/20"
              >
                <h3 className="font-heading text-lg md:text-xl text-accent-gold mb-4 md:mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                      <p className="font-paragraph text-sm md:text-base text-foreground/90">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="w-full bg-optional-navy py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 md:mb-6">
              Executive Training Programs
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              Selective, confidential programs for executives, legal professionals, and strategic decision-makers
            </p>
          </motion.div>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="font-paragraph text-base text-foreground/60">Loading programs...</p>
              </div>
            ) : courses.length > 0 ? (
              <>
                {/* Level 1 Programs */}
                {coursesByLevel.level1.length > 0 && (
                  <div className="mb-16">
                    <h3 className="font-heading text-2xl md:text-3xl text-accent-gold mb-8">Foundations & Level 1</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {coursesByLevel.level1.map((course, index) => (
                        <CourseCard
                          key={course._id}
                          course={course}
                          index={index}
                          addingItemId={addingItemId}
                          actions={actions}
                          currency={currency}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Level 2 Programs */}
                {coursesByLevel.level2.length > 0 && (
                  <div className="mb-16">
                    <h3 className="font-heading text-2xl md:text-3xl text-accent-gold mb-8">Advanced & Level 2</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {coursesByLevel.level2.map((course, index) => (
                        <CourseCard
                          key={course._id}
                          course={course}
                          index={index}
                          addingItemId={addingItemId}
                          actions={actions}
                          currency={currency}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Programs */}
                {coursesByLevel.other.length > 0 && (
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl text-accent-gold mb-8">Specialized Programs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {coursesByLevel.other.map((course, index) => (
                        <CourseCard
                          key={course._id}
                          course={course}
                          index={index}
                          addingItemId={addingItemId}
                          actions={actions}
                          currency={currency}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="font-paragraph text-base md:text-lg text-foreground/60">
                  Training programs coming soon. Contact us for more information.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Executive Development Package */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-optional-navy rounded-lg p-8 md:p-12 text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 md:mb-6">
              Executive Development Package
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/90 max-w-3xl mx-auto mb-8 md:mb-12">
              Enroll in 3 or more programs and receive a 30% discount on your entire package after application review and approval.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              {[
                {
                  title: 'Advanced Professional Progression',
                  description: 'Build comprehensive expertise across multiple practice areas'
                },
                {
                  title: 'Executive Specialization',
                  description: 'Develop deep knowledge in strategic legal domains'
                },
                {
                  title: 'Long-Term Strategic Education',
                  description: 'Invest in continuous professional development'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="bg-background p-6 rounded-lg"
                >
                  <h3 className="font-heading text-lg md:text-xl text-foreground mb-3">{benefit.title}</h3>
                  <p className="font-paragraph text-sm md:text-base text-foreground/80">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="border-t border-foreground/20 pt-8 md:pt-12">
              <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-4 md:mb-6">Tailored Corporate Solutions</h3>
              <p className="font-paragraph text-base md:text-lg text-foreground/90 mb-6 md:mb-8">
                Customized training packages available for:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {[
                  'Legal Departments',
                  'Compliance Teams',
                  'Finance Departments',
                  'Executive Leadership Groups'
                ].map((group, index) => (
                  <motion.div
                    key={group}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-4"
                  >
                    <p className="font-paragraph font-semibold text-foreground text-sm md:text-base">{group}</p>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 md:px-8 py-3 md:py-4 rounded transition-all hover:scale-105"
              >
                Inquire About Corporate Packages <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="w-full bg-optional-navy py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6 md:mb-8">
                Unlimited Access Subscription
              </h2>
              <p className="font-paragraph text-base md:text-lg text-foreground/90 mb-6 leading-relaxed">
                Get unlimited access to our entire library of executive training programs with a subscription. Perfect for law firms, corporate legal departments, compliance teams, and individual practitioners.
              </p>
              <ul className="space-y-3 md:space-y-4 mb-8">
                {[
                  'Access to all current and future programs',
                  'Professional certification upon completion',
                  'Comprehensive course materials',
                  'Priority support from expert instructors',
                  'Flexible learning schedule with lifetime access',
                  'Multilingual content in English and French'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <p className="font-paragraph text-sm md:text-base text-foreground/90">{benefit}</p>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 md:px-8 py-3 md:py-4 rounded transition-all hover:scale-105"
              >
                Inquire About Subscription <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[300px] md:h-[400px] lg:h-[500px]"
            >
              <Image
                src="https://static.wixstatic.com/media/5e1235_c7fad726680c4e6293a1dfe62a96b484~mv2.png?originWidth=768&originHeight=448"
                alt="Legal training subscription"
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Course Card Component
function CourseCard({ course, index, addingItemId, actions, currency }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      className="bg-background rounded-lg overflow-hidden flex flex-col h-full border border-foreground/10 hover:border-accent-gold/30 transition-all"
    >
      <div className="relative h-[200px] md:h-[250px]">
        <Image
          src={course.itemImage || 'https://static.wixstatic.com/media/5e1235_1921557ef1e84f528c4d105925f45779~mv2.png?originWidth=384&originHeight=192'}
          alt={course.itemName || 'Training course'}
          className="w-full h-full object-cover"
        />
        {course.level && (
          <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-accent-gold text-secondary-foreground px-2 md:px-3 py-1 rounded text-xs font-paragraph font-medium">
            {course.level}
          </div>
        )}
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="font-heading text-lg md:text-xl text-foreground mb-3">{course.itemName}</h3>
        <p className="font-paragraph text-sm md:text-base text-foreground/80 mb-4 md:mb-6 leading-relaxed flex-grow">
          {course.itemDescription}
        </p>
        
        {course.certificationDetails && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-optional-navy rounded">
            <p className="font-paragraph text-xs md:text-sm text-accent-gold font-medium mb-1">Details:</p>
            <p className="font-paragraph text-xs md:text-sm text-foreground/70">{course.certificationDetails}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="font-heading text-2xl md:text-3xl text-accent-gold">
            {formatPrice(course.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
          </div>
        </div>
        
        <div className="space-y-2 md:space-y-3">
          <Link
            to={`/training/${course._id}`}
            className="block w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-4 md:px-6 py-2 md:py-3 rounded text-center transition-all hover:scale-105 text-sm md:text-base"
          >
            View Details
          </Link>
          
          <button
            onClick={() => {
              actions.addToCart({ 
                collectionId: 'trainingcourses', 
                itemId: course._id 
              });
            }}
            disabled={addingItemId === course._id}
            className="w-full bg-foreground text-background font-paragraph font-semibold px-4 md:px-6 py-2 md:py-3 rounded transition-all hover:scale-105 disabled:opacity-50 text-sm md:text-base"
          >
            {addingItemId === course._id ? 'Adding...' : 'Apply / Enroll'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
