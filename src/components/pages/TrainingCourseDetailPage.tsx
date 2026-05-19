import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowRight, ArrowLeft, Clock, Globe, Award, BookOpen, CheckCircle, Lock, Users, Briefcase } from 'lucide-react';
import { BaseCrudService, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { TrainingCourses } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExecutiveTrainingApplicationForm from '@/components/ExecutiveTrainingApplicationForm';

export default function TrainingCourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<TrainingCourses | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'structure' | 'certification' | 'confidentiality'>('overview');
  const { currency } = useCurrency();

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      if (!id) return;
      const data = await BaseCrudService.getById<TrainingCourses>('trainingcourses', id);
      setCourse(data);
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 md:px-8 py-24 md:py-32 text-center">
          <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4 md:mb-6">Course Not Found</h1>
          <p className="font-paragraph text-base md:text-lg text-foreground/80 mb-8">
            The training program you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/training"
            className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Training Center
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-7 mt-16 sm:mt-20 md:mt-24">
        <Link
          to="/training"
          className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all font-paragraph text-xs sm:text-sm md:text-base"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          Back to Training Center
        </Link>
      </div>

      {/* Premium Hero Section */}
      <section className="relative w-full min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src={course.itemImage || 'https://static.wixstatic.com/media/5e1235_1921557ef1e84f528c4d105925f45779~mv2.png?originWidth=384&originHeight=192'}
            alt={course.itemName || 'Training course'}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/60 to-foreground"></div>
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 text-center">
          {course.executiveCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-3 sm:mb-4 md:mb-6"
            >
              <span className="inline-block font-paragraph text-xs sm:text-sm tracking-widest uppercase text-accent-gold font-semibold">
                {course.executiveCategory}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-secondary leading-tight mb-4 sm:mb-6 md:mb-8"
          >
            {course.itemName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xs sm:text-sm md:text-lg text-secondary/90 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2"
          >
            {course.itemDescription}
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6 mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto"
          >
            {course.duration && (
              <div className="bg-accent-gold/10 rounded-lg p-2 sm:p-3 md:p-5">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-gold mx-auto mb-1 md:mb-2" />
                <p className="font-paragraph text-xs md:text-sm text-secondary/80">{course.duration}</p>
              </div>
            )}
            {course.language && (
              <div className="bg-accent-gold/10 rounded-lg p-2 sm:p-3 md:p-5">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-gold mx-auto mb-1 md:mb-2" />
                <p className="font-paragraph text-xs md:text-sm text-secondary/80">{course.language}</p>
              </div>
            )}
            {course.level && (
              <div className="bg-accent-gold/10 rounded-lg p-2 sm:p-3 md:p-5">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-gold mx-auto mb-1 md:mb-2" />
                <p className="font-paragraph text-xs md:text-sm text-secondary/80">{course.level}</p>
              </div>
            )}
            {course.certification && (
              <div className="bg-accent-gold/10 rounded-lg p-2 sm:p-3 md:p-5">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-gold mx-auto mb-1 md:mb-2" />
                <p className="font-paragraph text-xs md:text-sm text-secondary/80">Certified</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full bg-secondary py-12 sm:py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-10 md:space-y-14">
              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 border-b border-foreground/10 pb-4 sm:pb-6 md:pb-8 overflow-x-auto"
              >
                {[
                  { id: 'overview', label: 'Executive Overview' },
                  { id: 'structure', label: 'Course Structure' },
                  { id: 'certification', label: 'Certification' },
                  { id: 'confidentiality', label: 'Confidentiality' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`font-paragraph text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-accent-gold text-secondary-foreground'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </motion.div>

              {/* Executive Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8 md:space-y-10"
                >
                  {/* Strategic Objectives */}
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Strategic Objectives</h2>
                    {course.strategicOutcomes ? (
                      <div className="bg-background rounded-lg p-6 md:p-8 border border-accent-gold/20">
                        <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed">
                          {course.strategicOutcomes}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-background rounded-lg p-6 md:p-8 border border-accent-gold/20">
                        <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed">
                          This executive program is designed to equip senior professionals with strategic legal insights and practical expertise. Participants will develop a comprehensive understanding of complex legal frameworks and their application in high-stakes business environments.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Target Audience */}
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Target Audience</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      {[
                        'Senior Legal Professionals',
                        'Executive Leadership',
                        'In-House Counsel',
                        'Compliance Officers',
                        'Business Executives',
                        'Investment Professionals'
                      ].map((audience, index) => (
                        <motion.div
                          key={audience}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="flex items-center gap-3 md:gap-4 bg-background rounded-lg p-4 md:p-5 border border-accent-gold/20"
                        >
                          <Users className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0" />
                          <span className="font-paragraph text-sm md:text-base text-foreground">{audience}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Practical Outcomes */}
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Practical Outcomes</h2>
                    <div className="space-y-3 md:space-y-4">
                      {[
                        'Master advanced legal concepts and their real-world applications',
                        'Develop strategic decision-making frameworks for complex scenarios',
                        'Enhance professional credentials with certification from our center',
                        'Build networks with elite legal professionals and executives',
                        'Gain competitive advantage in your practice area',
                        'Apply case-based learning to immediate business challenges'
                      ].map((outcome, index) => (
                        <motion.div
                          key={outcome}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="flex items-start gap-3 md:gap-4 bg-background rounded-lg p-4 md:p-5 border border-accent-gold/20"
                        >
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                          <span className="font-paragraph text-sm md:text-base text-foreground/90">{outcome}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Course Structure Tab */}
              {activeTab === 'structure' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8 md:space-y-10"
                >
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Program Structure</h2>
                    {course.programType ? (
                      <div className="bg-background rounded-lg p-6 md:p-8 border border-accent-gold/20 flex gap-4 md:gap-5">
                        <Briefcase className="w-6 h-6 md:w-7 md:h-7 text-accent-gold flex-shrink-0" />
                        <div>
                          <p className="font-paragraph text-sm md:text-base text-foreground/90">{course.programType}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-background rounded-lg p-6 md:p-8 border border-accent-gold/20">
                        <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed">
                          This intensive 6-hour program combines theoretical foundations with practical case studies. Expert instructors deliver content through interactive sessions, real-world scenario analysis, and strategic discussion forums designed for executive-level professionals.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Course Modules */}
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Program Modules</h2>
                    <div className="space-y-4 md:space-y-5">
                      {[
                        { title: 'Module 1: Foundational Concepts', duration: '90 minutes', description: 'Comprehensive overview of core legal principles and strategic frameworks' },
                        { title: 'Module 2: Advanced Applications', duration: '90 minutes', description: 'Deep dive into complex scenarios and landmark case analysis' },
                        { title: 'Module 3: Strategic Implementation', duration: '90 minutes', description: 'Practical application strategies and decision-making frameworks' },
                        { title: 'Module 4: Executive Assessment', duration: '60 minutes', description: 'Comprehensive evaluation and certification assessment' }
                      ].map((module, index) => (
                        <motion.div
                          key={module.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="bg-background rounded-lg p-5 md:p-6 border border-accent-gold/20"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="font-heading text-base md:text-lg text-foreground">{module.title}</h3>
                            <span className="font-paragraph text-xs md:text-sm text-accent-gold font-medium whitespace-nowrap">{module.duration}</span>
                          </div>
                          <p className="font-paragraph text-sm md:text-base text-foreground/80">{module.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Language Availability */}
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Language Availability</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      {(course.language || 'English & French').split('&').map((lang, index) => (
                        <motion.div
                          key={lang}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-5 md:p-6 text-center"
                        >
                          <Globe className="w-6 h-6 md:w-7 md:h-7 text-accent-gold mx-auto mb-3" />
                          <p className="font-heading text-base md:text-lg text-foreground">{lang.trim()}</p>
                          <p className="font-paragraph text-xs md:text-sm text-foreground/70 mt-2">Full program delivery</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Certification Tab */}
              {activeTab === 'certification' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8 md:space-y-10"
                >
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Executive Certification</h2>
                    {course.certificationDetails ? (
                      <div className="bg-background rounded-lg p-6 md:p-8 border border-accent-gold/20">
                        <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed">
                          {course.certificationDetails}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-background rounded-lg p-6 md:p-8 border border-accent-gold/20">
                        <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed">
                          Upon successful completion of this program, participants receive a prestigious Executive Certification from our center. This credential demonstrates mastery of advanced legal concepts and commitment to professional excellence.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Certification Benefits */}
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Certification Benefits</h2>
                    <div className="space-y-3 md:space-y-4">
                      {[
                        'Recognized credential enhancing professional standing',
                        'Digital certificate and official documentation',
                        'Lifetime access to program materials and updates',
                        'Eligibility for advanced specialization programs',
                        'Inclusion in JMC LEX alumni network',
                        'Continuing education credit recognition'
                      ].map((benefit, index) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="flex items-start gap-3 md:gap-4 bg-background rounded-lg p-4 md:p-5 border border-accent-gold/20"
                        >
                          <Award className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                          <span className="font-paragraph text-sm md:text-base text-foreground/90">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Assessment Criteria */}
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Assessment Criteria</h2>
                    <div className="bg-background rounded-lg p-6 md:p-8 border border-accent-gold/20">
                      <ul className="space-y-3 md:space-y-4">
                        {[
                          'Active participation in all program modules',
                          'Completion of case study analysis',
                          'Strategic assessment examination',
                          'Professional conduct and engagement standards'
                        ].map((criterion, index) => (
                          <li key={criterion} className="flex items-start gap-3 md:gap-4">
                            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                            <span className="font-paragraph text-sm md:text-base text-foreground/90">{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Confidentiality Tab */}
              {activeTab === 'confidentiality' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8 md:space-y-10"
                >
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Confidentiality & Privacy</h2>
                    <div className="bg-background rounded-lg p-6 md:p-8 border border-accent-gold/20 flex gap-4 md:gap-5">
                      <Lock className="w-6 h-6 md:w-7 md:h-7 text-accent-gold flex-shrink-0" />
                      <div>
                        <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed">
                          All program content, participant information, and case discussions are subject to strict confidentiality protocols. This program operates under professional attorney-client privilege standards and maintains the highest standards of data protection.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Confidentiality Standards */}
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Confidentiality Standards</h2>
                    <div className="space-y-3 md:space-y-4">
                      {[
                        'Secure, encrypted learning platform with multi-factor authentication',
                        'Restricted access to program materials and participant information',
                        'Non-disclosure agreements binding all participants and instructors',
                        'Secure data storage compliant with international privacy regulations',
                        'Limited participant roster ensuring selective enrollment',
                        'Confidential assessment and evaluation records'
                      ].map((standard, index) => (
                        <motion.div
                          key={standard}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="flex items-start gap-3 md:gap-4 bg-background rounded-lg p-4 md:p-5 border border-accent-gold/20"
                        >
                          <Lock className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                          <span className="font-paragraph text-sm md:text-base text-foreground/90">{standard}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Privacy Policy */}
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Data Protection</h2>
                    <div className="bg-background rounded-lg p-6 md:p-8 border border-accent-gold/20">
                      <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed mb-4">
                        Your personal and professional information is protected under international data protection standards. We maintain strict protocols for data collection, storage, and usage. All participant data is encrypted and accessible only to authorized program administrators.
                      </p>
                      <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed">
                        For detailed information about our privacy practices, please contact our compliance team at <a href="mailto:privacy@jmclex.com" className="text-accent-gold font-medium hover:underline">privacy@jmclex.com</a>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7"
            >
              {/* Pricing Card */}
              <div className="bg-background rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 sticky top-20 sm:top-24 md:top-28 lg:top-36 border border-accent-gold/20">
                <div className="mb-4 sm:mb-6 md:mb-8">
                  <p className="font-paragraph text-xs md:text-sm text-foreground/60 mb-1 md:mb-2">Program Investment</p>
                  <div className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-accent-gold">
                    {formatPrice(course.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                  </div>
                </div>

                {course.pricing && (
                  <div className="mb-4 sm:mb-6 md:mb-8 pb-4 sm:pb-6 md:pb-8 border-b border-foreground/10">
                    <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/80">{course.pricing}</p>
                  </div>
                )}

                <div className="space-y-2 md:space-y-3 mb-4 sm:mb-6 md:mb-8">
                  <button
                    onClick={() => setShowApplicationForm(!showApplicationForm)}
                    className="w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-3 sm:px-4 md:px-5 py-2 md:py-3 lg:py-4 rounded transition-all hover:scale-105 text-xs sm:text-sm md:text-base"
                  >
                    Request Enrollment
                  </button>

                  <button
                    onClick={() => setShowApplicationForm(!showApplicationForm)}
                    className="w-full bg-foreground text-background font-paragraph font-semibold px-3 sm:px-4 md:px-5 py-2 md:py-3 lg:py-4 rounded transition-all hover:scale-105 text-xs sm:text-sm md:text-base"
                  >
                    Executive Application
                  </button>
                </div>

                {course.isSubscriptionAvailable && (
                  <div className="mb-4 sm:mb-6 md:mb-8 pb-4 sm:pb-6 md:pb-8 border-b border-foreground/10">
                    <p className="font-paragraph text-xs sm:text-sm md:text-base text-accent-gold font-medium mb-1 md:mb-2">
                      ✓ Subscription Available
                    </p>
                    <p className="font-paragraph text-xs md:text-sm text-foreground/70">
                      Get unlimited access to this and all other programs with our subscription plan.
                    </p>
                  </div>
                )}

                {/* Executive Development Package Info */}
                <div className="pt-4 sm:pt-6 md:pt-8 border-t border-foreground/10">
                  <p className="font-heading text-xs sm:text-sm md:text-base text-foreground mb-1 md:mb-2">Executive Development Package</p>
                  <p className="font-paragraph text-xs md:text-sm text-foreground/70">
                    Enroll in 3+ programs and receive 30% discount after application review.
                  </p>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-4 sm:p-5 md:p-6 lg:p-8">
                <h3 className="font-heading text-sm sm:text-base md:text-lg text-foreground mb-3 sm:mb-4 md:mb-5">Program Highlights</h3>
                <ul className="space-y-1 sm:space-y-2 md:space-y-3">
                  {[
                    'Elite instructor expertise',
                    'Selective enrollment',
                    'Confidential environment',
                    'Recognized certification',
                    'Lifetime access',
                    'Global network'
                  ].map((highlight, index) => (
                    <li key={highlight} className="flex items-center gap-2 md:gap-3">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-accent-gold flex-shrink-0" />
                      <span className="font-paragraph text-xs md:text-sm text-foreground/90">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-background rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 border border-accent-gold/20">
                <h3 className="font-heading text-sm sm:text-base md:text-lg text-foreground mb-2 md:mb-3 lg:mb-4">Questions?</h3>
                <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/80 mb-3 sm:mb-4 md:mb-5">
                  Contact our executive team for personalized guidance.
                </p>
                <a
                  href="mailto:contact@jmclex.com"
                  className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all font-paragraph text-xs sm:text-sm md:text-base font-medium"
                >
                  contact@jmclex.com <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      {showApplicationForm && (
        <section className="w-full bg-background py-16 md:py-20">
          <div className="max-w-[100rem] mx-auto px-6 md:px-8">
            <ExecutiveTrainingApplicationForm
              programName={course.itemName || 'Executive Training Program'}
              onSuccess={() => {
                setShowApplicationForm(false);
              }}
            />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
