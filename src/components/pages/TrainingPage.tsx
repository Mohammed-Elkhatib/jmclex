import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Award, BookOpen, Users, Globe, Zap, Shield } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { TrainingCourses } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function TrainingPage() {
  const [courses, setCourses] = useState<TrainingCourses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
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

  // Calculate discount based on selected courses
  const discountInfo = useMemo(() => {
    const selectedCount = selectedCourses.size;
    if (selectedCount >= 3) {
      return {
        hasDiscount: true,
        discountPercent: 30,
        label: 'Executive Development Package',
        selectedCount
      };
    }
    return {
      hasDiscount: false,
      discountPercent: 0,
      label: '',
      selectedCount
    };
  }, [selectedCourses]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Cart />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_e53d9cb7275945d38c3c5da6f2ade97f~mv2.png?originWidth=1152&originHeight=576"
            alt="Legal training courses"
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
            Training Center & Certification
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto mb-6"
          >
            Premium executive legal education designed for international professionals
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto"
          >
            Strategic professional development programs combining theory, practical workshops, and advanced intellectual analysis
          </motion.p>
        </div>
      </section>

      {/* Institutional Messaging Section */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl text-foreground mb-8">
              International Executive Education Excellence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: BookOpen,
                title: 'Rigorous Curriculum Design',
                description: 'Each program is internally designed by JMC LEX experts and grounded in deep legal research and advanced intellectual analysis'
              },
              {
                icon: Users,
                title: 'Expert Practitioners',
                description: 'All instructors bring minimum 10+ years of professional experience in international legal practice and strategic advisory'
              },
              {
                icon: Globe,
                title: 'Multilingual Delivery',
                description: 'Programs available in English, French, and Arabic to serve our global professional community'
              },
              {
                icon: Award,
                title: 'Professional Certification',
                description: 'Successful participants receive a professional certificate of completion issued by JMC LEX'
              },
              {
                icon: Zap,
                title: 'Comprehensive Resources',
                description: 'Participants receive supporting materials, templates, strategic resources, and practical frameworks'
              },
              {
                icon: Shield,
                title: 'Executive-Level Content',
                description: 'Each 6-hour program combines theoretical foundations with practical workshops and strategic application'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <feature.icon className="w-16 h-16 text-accent-gold mx-auto mb-6" />
                <h3 className="font-heading text-2xl text-foreground mb-4">{feature.title}</h3>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure & Benefits */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl text-foreground mb-6">Program Structure & Benefits</h2>
            <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
              Each 6-hour program is meticulously designed to deliver strategic value through integrated learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-optional-navy p-8 rounded"
              >
                <h3 className="font-heading text-2xl text-foreground mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                      <p className="font-paragraph text-base text-foreground/90">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl text-foreground mb-6">Executive Training Programs</h2>
            <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
              Specialized programs for legal professionals, compliance officers, executives, and organizations
            </p>
            {discountInfo.hasDiscount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 inline-block bg-accent-gold text-secondary-foreground px-8 py-4 rounded font-paragraph font-semibold"
              >
                🎯 {discountInfo.label}: 30% discount on {discountInfo.selectedCount} programs
              </motion.div>
            )}
          </motion.div>

          <div className="min-h-[600px]">
            {isLoading ? null : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => {
                  const isSelected = selectedCourses.has(course._id);
                  return (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`bg-background rounded overflow-hidden flex flex-col transition-all duration-300 ${
                        isSelected ? 'ring-2 ring-accent-gold shadow-lg' : ''
                      }`}
                    >
                      <div className="relative h-[250px]">
                        <Image
                          src={course.itemImage || 'https://static.wixstatic.com/media/5e1235_1921557ef1e84f528c4d105925f45779~mv2.png?originWidth=384&originHeight=192'}
                          alt={course.itemName || 'Training course'}
                          className="w-full h-full object-cover"
                        />
                        {course.isSubscriptionAvailable && (
                          <div className="absolute top-4 right-4 bg-accent-gold text-secondary-foreground px-3 py-1 rounded text-xs font-paragraph font-medium">
                            Subscription Available
                          </div>
                        )}
                      </div>
                      
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="font-heading text-2xl text-foreground mb-4">{course.itemName}</h3>
                        <p className="font-paragraph text-base text-foreground/80 mb-6 leading-relaxed flex-grow">
                          {course.itemDescription}
                        </p>
                        
                        {course.certificationDetails && (
                          <div className="mb-6 p-4 bg-optional-navy rounded">
                            <p className="font-paragraph text-sm text-accent-gold font-medium mb-2">Program Details:</p>
                            <p className="font-paragraph text-sm text-foreground/70">{course.certificationDetails}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto mb-4">
                          <div className="font-heading text-3xl text-accent-gold">
                            {formatPrice(course.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                          </div>
                          <button
                            onClick={() => {
                              const newSelected = new Set(selectedCourses);
                              if (isSelected) {
                                newSelected.delete(course._id);
                              } else {
                                newSelected.add(course._id);
                              }
                              setSelectedCourses(newSelected);
                              actions.addToCart({ 
                                collectionId: 'trainingcourses', 
                                itemId: course._id 
                              });
                            }}
                            disabled={addingItemId === course._id}
                            className={`font-paragraph font-semibold px-6 py-3 rounded transition-all ${
                              isSelected
                                ? 'bg-accent-gold text-secondary-foreground hover:scale-105'
                                : 'bg-accent-gold text-secondary-foreground hover:scale-105 disabled:opacity-50'
                            }`}
                          >
                            {addingItemId === course._id ? 'Adding...' : isSelected ? 'Added' : 'Enroll Now'}
                          </button>
                        </div>
                        
                        {course.courseUrl && (
                          <a
                            href={course.courseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all font-paragraph text-sm"
                          >
                            View Details <ArrowRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground/60">
                  Training programs coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Executive Development Package Section */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-optional-navy rounded-lg p-12 text-center"
          >
            <h2 className="font-heading text-5xl text-foreground mb-6">
              Executive Development Package
            </h2>
            <p className="font-paragraph text-xl text-foreground/90 max-w-3xl mx-auto mb-8">
              Enroll in 3 or more programs and receive a 30% discount on your entire package
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-background p-6 rounded"
                >
                  <h3 className="font-heading text-xl text-foreground mb-3">{benefit.title}</h3>
                  <p className="font-paragraph text-base text-foreground/80">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="border-t border-foreground/20 pt-8">
              <h3 className="font-heading text-2xl text-foreground mb-6">Tailored Corporate Solutions</h3>
              <p className="font-paragraph text-lg text-foreground/90 mb-8">
                Customized training packages available for:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-accent-gold/10 border border-accent-gold/30 rounded p-4"
                  >
                    <p className="font-paragraph font-semibold text-foreground">{group}</p>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded transition-all hover:scale-105 mt-8"
              >
                Inquire About Corporate Packages <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscription Info */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-5xl text-foreground mb-8">
                Unlimited Access Subscription
              </h2>
              <p className="font-paragraph text-lg text-foreground/90 mb-6 leading-relaxed">
                Get unlimited access to our entire library of executive training programs with a subscription. Perfect for law firms, corporate legal departments, compliance teams, and individual practitioners committed to continuous professional development.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Access to all current and future programs',
                  'Professional certification upon completion of each program',
                  'Comprehensive course materials and strategic resources',
                  'Priority support from expert instructors',
                  'Flexible learning schedule with lifetime access',
                  'Multilingual content in English, French, and Arabic'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                    <p className="font-paragraph text-base text-foreground/90">{benefit}</p>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded transition-all hover:scale-105"
              >
                Inquire About Subscription <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px]"
            >
              <Image
                src="https://static.wixstatic.com/media/5e1235_c7fad726680c4e6293a1dfe62a96b484~mv2.png?originWidth=768&originHeight=448"
                alt="Legal training subscription"
                className="w-full h-full object-cover rounded"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
