import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Clock, Globe, Award, CheckCircle, BookOpen } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { TrainingCourses } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PremiumPricingSection from '@/components/PremiumPricingSection';

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full bg-foreground overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32">
        {/* Subtle background accent */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-gold rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center"
          >
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 sm:mb-6 md:mb-8"
            >
              <span className="inline-block font-paragraph text-xs sm:text-sm tracking-widest uppercase text-accent-gold font-semibold">
                Executive Legal Education
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary leading-tight mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-5xl mx-auto"
            >
              Elite Legal Experts Transferring Years of Strategic Knowledge in Six Hours
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-paragraph text-sm sm:text-base md:text-lg lg:text-xl text-secondary/90 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-14 lg:mb-16 leading-relaxed px-2"
            >
              Private executive legal training and certification programs for professionals, executives, legal departments, investors, and business leaders.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="#programs"
                className="inline-flex items-center gap-2 sm:gap-3 bg-accent-gold text-foreground font-paragraph font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded text-sm sm:text-base transition-all duration-300 hover:bg-accent-gold/90 hover:scale-105 active:scale-95"
              >
                Explore Executive Programs
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Executive Positioning Section */}
      <section className="w-full bg-secondary py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4 md:mb-6">
              Premium Executive Training
            </h2>
            <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto px-2">
              Designed for distinguished professionals seeking elite legal education
            </p>
          </motion.div>

          {/* Premium Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {[
              {
                title: 'One-to-One Executive Sessions',
                description: 'Personalized instruction tailored to your strategic objectives',
                icon: '👤'
              },
              {
                title: 'Confidential Strategic Training',
                description: 'Private, secure learning environment for sensitive topics',
                icon: '🔒'
              },
              {
                title: 'Elite Legal Experts',
                description: 'Instruction from top-tier practitioners and thought leaders',
                icon: '⭐'
              },
              {
                title: '6-Hour Intensive Programs',
                description: 'Comprehensive curriculum condensed into focused sessions',
                icon: '⏱️'
              },
              {
                title: 'English & French Delivery',
                description: 'Bilingual instruction for global executive professionals',
                icon: '🌍'
              },
              {
                title: 'Strategic Case-Based Learning',
                description: 'Real-world scenarios and landmark cases analyzed in depth',
                icon: '📋'
              },
              {
                title: 'Executive Certification',
                description: 'Recognized credentials that enhance professional standing',
                icon: '🏆'
              },
              {
                title: 'Selective Enrollment',
                description: 'Curated cohorts ensuring premium peer-level interaction',
                icon: '✨'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-background rounded-lg p-4 sm:p-5 md:p-6 lg:p-7 border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:shadow-accent-gold/10"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="font-heading text-sm sm:text-base md:text-lg text-foreground mb-2 sm:mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="w-full bg-background py-12 sm:py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Expert-Designed Curriculum',
                description: 'Rigorous programs developed by JMC LEX legal experts'
              },
              {
                icon: Globe,
                title: 'Bilingual Programs',
                description: 'Available in English and French for global professionals'
              },
              {
                icon: Award,
                title: 'Professional Certification',
                description: 'Recognized certificate upon successful completion'
              },
              {
                icon: Clock,
                title: '6-Hour Intensive Format',
                description: 'Comprehensive theory, practice, and assessment'
              },
              {
                icon: CheckCircle,
                title: 'Selective Enrollment',
                description: 'Confidential, executive-level learning environment'
              },
              {
                icon: ArrowRight,
                title: 'Career Development',
                description: 'Strategic advancement for legal professionals'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="bg-secondary rounded-lg p-4 sm:p-5 md:p-6 lg:p-7 border border-accent-gold/20 hover:border-accent-gold/40 transition-all"
              >
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent-gold mb-3 sm:mb-4" />
                <h3 className="font-heading text-sm sm:text-base md:text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="programs" className="w-full bg-secondary py-12 sm:py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 sm:mb-4 md:mb-5">
              Available Programs
            </h2>
            <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl mx-auto px-2">
              Selective training programs for legal professionals and executives
            </p>
          </motion.div>

          <div className="min-h-[300px]">
            {isLoading ? (
              <div className="text-center py-12 sm:py-16">
                <p className="font-paragraph text-sm sm:text-base text-foreground/60">Loading programs...</p>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
                {courses.map((course, index) => (
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
            ) : (
              <div className="text-center py-16 sm:py-20">
                <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/60 mb-4 sm:mb-6 px-2">
                  Training programs coming soon. Contact us for more information.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded text-sm sm:text-base transition-all hover:scale-105"
                >
                  Get in Touch <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Premium Pricing Section */}
      <PremiumPricingSection />

      {/* Executive Development Package - DEPRECATED - Replaced by PremiumPricingSection */}
      <section className="w-full bg-background py-16 md:py-24 hidden">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-secondary rounded-lg p-8 md:p-10 lg:p-12 text-center border border-accent-gold/20"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4 md:mb-6">
              Executive Development Package
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/90 max-w-3xl mx-auto mb-10 md:mb-12">
              Enroll in 3 or more programs and receive a 30% discount on your entire package after application review and approval.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10 md:mb-12">
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
                  className="bg-background p-5 md:p-6 rounded-lg"
                >
                  <h3 className="font-heading text-base md:text-lg text-foreground mb-2">{benefit.title}</h3>
                  <p className="font-paragraph text-sm text-foreground/80">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="border-t border-foreground/20 pt-10 md:pt-12">
              <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-4 md:mb-5">Tailored Corporate Solutions</h3>
              <p className="font-paragraph text-base md:text-lg text-foreground/90 mb-6 md:mb-8">
                Customized training packages available for:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8 md:mb-10">
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
                    className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-4 md:p-5"
                  >
                    <p className="font-paragraph font-semibold text-foreground text-sm md:text-base">{group}</p>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded transition-all hover:scale-105"
              >
                Inquire About Corporate Packages <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="w-full bg-secondary py-12 sm:py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 sm:mb-5 md:mb-7">
                Unlimited Access Subscription
              </h2>
              <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/90 mb-5 sm:mb-6 md:mb-8 leading-relaxed">
                Get unlimited access to our entire library of executive training programs with a subscription. Perfect for law firms, corporate legal departments, compliance teams, and individual practitioners.
              </p>
              <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8 md:mb-10">
                {[
                  'Access to all current and future programs',
                  'Professional certification upon completion',
                  'Comprehensive course materials',
                  'Priority support from expert instructors',
                  'Flexible learning schedule with lifetime access',
                  'Multilingual content in English and French'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5 sm:mt-1" />
                    <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/90">{benefit}</p>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded text-sm sm:text-base transition-all hover:scale-105"
              >
                Inquire About Subscription <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[250px] sm:h-[300px] md:h-[380px] lg:h-[420px]"
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
      className="bg-background rounded-lg overflow-hidden flex flex-col h-full border border-foreground/10 hover:border-accent-gold/40 transition-all"
    >
      <div className="relative h-[150px] sm:h-[180px] md:h-[220px]">
        <Image
          src={course.itemImage || 'https://static.wixstatic.com/media/5e1235_1921557ef1e84f528c4d105925f45779~mv2.png?originWidth=384&originHeight=192'}
          alt={course.itemName || 'Training course'}
          className="w-full h-full object-cover"
        />
        {course.level && (
          <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-accent-gold text-secondary-foreground px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm font-paragraph font-medium">
            {course.level}
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-sm sm:text-base md:text-lg text-foreground mb-2 md:mb-3">{course.itemName}</h3>
        <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/80 mb-3 sm:mb-4 md:mb-5 leading-relaxed flex-grow">
          {course.itemDescription}
        </p>
        
        {course.certificationDetails && (
          <div className="mb-3 sm:mb-4 md:mb-5 p-2 sm:p-3 md:p-4 bg-secondary rounded">
            <p className="font-paragraph text-xs md:text-sm text-accent-gold font-medium mb-1 md:mb-1.5">Details:</p>
            <p className="font-paragraph text-xs md:text-sm text-foreground/70">{course.certificationDetails}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
          <div className="font-heading text-xl sm:text-2xl md:text-3xl text-accent-gold">
            {formatPrice(course.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
          </div>
        </div>
        
        <div className="space-y-2 md:space-y-3">
          <Link
            to={`/training/${course._id}`}
            className="block w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded text-center transition-all hover:scale-105 text-xs sm:text-sm md:text-base"
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
            className="w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded transition-all hover:scale-105 disabled:opacity-50 text-xs sm:text-sm md:text-base"
          >
            {addingItemId === course._id ? 'Adding...' : 'Apply / Enroll'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
