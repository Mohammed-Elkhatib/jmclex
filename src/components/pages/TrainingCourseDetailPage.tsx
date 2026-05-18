import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowRight, ArrowLeft, Clock, Globe, Award, Users, BookOpen, CheckCircle } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { TrainingCourses } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExecutiveTrainingApplicationForm from '@/components/ExecutiveTrainingApplicationForm';

export default function TrainingCourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<TrainingCourses | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const { addingItemId, actions } = useCart();
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
            className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 md:px-8 py-3 md:py-4 rounded transition-all hover:scale-105"
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
      <div className="max-w-[100rem] mx-auto px-6 md:px-8 py-5 md:py-7 mt-20 md:mt-24">
        <Link
          to="/training"
          className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all font-paragraph text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          Back to Training Center
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[45vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={course.itemImage || 'https://static.wixstatic.com/media/5e1235_1921557ef1e84f528c4d105925f45779~mv2.png?originWidth=384&originHeight=192'}
            alt={course.itemName || 'Training course'}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"></div>
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-6 md:px-8 py-16 md:py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6"
          >
            {course.itemName}
          </motion.h1>

          {course.executiveCategory && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-paragraph text-sm md:text-lg text-accent-gold mb-4 md:mb-5"
            >
              {course.executiveCategory}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-paragraph text-sm md:text-base text-foreground/80 max-w-2xl md:max-w-3xl mx-auto"
          >
            {course.itemDescription}
          </motion.p>
        </div>
      </section>

      {/* Course Details */}
      <section className="w-full bg-optional-navy py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-14">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10 md:space-y-12">
              {/* Program Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Program Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                  {course.duration && (
                    <div className="flex gap-4 md:gap-5">
                      <Clock className="w-6 h-6 md:w-7 md:h-7 text-accent-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-base md:text-lg text-foreground mb-1.5">Duration</h3>
                        <p className="font-paragraph text-sm md:text-base text-foreground/80">{course.duration}</p>
                      </div>
                    </div>
                  )}
                  {course.language && (
                    <div className="flex gap-4 md:gap-5">
                      <Globe className="w-6 h-6 md:w-7 md:h-7 text-accent-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-base md:text-lg text-foreground mb-1.5">Language</h3>
                        <p className="font-paragraph text-sm md:text-base text-foreground/80">{course.language}</p>
                      </div>
                    </div>
                  )}
                  {course.level && (
                    <div className="flex gap-4 md:gap-5">
                      <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-accent-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-base md:text-lg text-foreground mb-1.5">Level</h3>
                        <p className="font-paragraph text-sm md:text-base text-foreground/80">{course.level}</p>
                      </div>
                    </div>
                  )}
                  {course.certification && (
                    <div className="flex gap-4 md:gap-5">
                      <Award className="w-6 h-6 md:w-7 md:h-7 text-accent-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-base md:text-lg text-foreground mb-1.5">Certification</h3>
                        <p className="font-paragraph text-sm md:text-base text-foreground/80">{course.certification}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Strategic Outcomes */}
              {course.strategicOutcomes && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Strategic Outcomes</h2>
                  <div className="bg-background rounded-lg p-6 md:p-8">
                    <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed">
                      {course.strategicOutcomes}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Certification Details */}
              {course.certificationDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Program Details</h2>
                  <div className="bg-background rounded-lg p-6 md:p-8">
                    <p className="font-paragraph text-sm md:text-base text-foreground/90 leading-relaxed">
                      {course.certificationDetails}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Program Type */}
              {course.programType && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 md:mb-8">Program Format</h2>
                  <div className="bg-background rounded-lg p-6 md:p-8 flex gap-4 md:gap-5">
                    <Users className="w-6 h-6 md:w-7 md:h-7 text-accent-gold flex-shrink-0" />
                    <div>
                      <p className="font-paragraph text-sm md:text-base text-foreground/90">{course.programType}</p>
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
              className="space-y-6 md:space-y-7"
            >
              {/* Pricing Card */}
              <div className="bg-background rounded-lg p-6 md:p-8 sticky top-28 md:top-36">
                <div className="mb-6 md:mb-8">
                  <p className="font-paragraph text-xs md:text-sm text-foreground/60 mb-2">Program Fee</p>
                  <div className="font-heading text-3xl md:text-4xl lg:text-5xl text-accent-gold">
                    {formatPrice(course.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                  </div>
                </div>

                {course.pricing && (
                  <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-foreground/10">
                    <p className="font-paragraph text-sm md:text-base text-foreground/80">{course.pricing}</p>
                  </div>
                )}

                <div className="space-y-3 md:space-y-4">
                  <button
                    onClick={() => {
                      actions.addToCart({
                        collectionId: 'trainingcourses',
                        itemId: course._id
                      });
                    }}
                    disabled={addingItemId === course._id}
                    className="w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-4 md:px-5 py-3 md:py-4 rounded transition-all hover:scale-105 disabled:opacity-50 text-sm md:text-base"
                  >
                    {addingItemId === course._id ? 'Adding to Cart...' : 'Add to Cart'}
                  </button>

                  <button
                    onClick={() => setShowApplicationForm(!showApplicationForm)}
                    className="w-full bg-foreground text-background font-paragraph font-semibold px-4 md:px-5 py-3 md:py-4 rounded transition-all hover:scale-105 text-sm md:text-base"
                  >
                    Apply Now
                  </button>
                </div>

                {course.isSubscriptionAvailable && (
                  <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-foreground/10">
                    <p className="font-paragraph text-sm md:text-base text-accent-gold font-medium mb-2">
                      ✓ Subscription Available
                    </p>
                    <p className="font-paragraph text-xs md:text-sm text-foreground/70">
                      Get unlimited access to this and all other programs with our subscription plan.
                    </p>
                  </div>
                )}

                {/* Executive Development Package Info */}
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-foreground/10">
                  <p className="font-heading text-sm md:text-base text-foreground mb-2">Executive Development Package</p>
                  <p className="font-paragraph text-xs md:text-sm text-foreground/70">
                    Enroll in 3 or more programs and receive a 30% discount on your entire package after application review.
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-6 md:p-8">
                <h3 className="font-heading text-base md:text-lg text-foreground mb-3 md:mb-4">Questions?</h3>
                <p className="font-paragraph text-sm md:text-base text-foreground/80 mb-3 md:mb-4">
                  Contact our team for more information about this program.
                </p>
                <a
                  href="mailto:contact@jmclex.com"
                  className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all font-paragraph text-sm md:text-base font-medium"
                >
                  contact@jmclex.com <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
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

      {/* Enrollment Process */}
      <section className="w-full bg-optional-navy py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14 md:mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4 md:mb-5">Selective Enrollment Process</h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              Our selective enrollment process ensures a premium learning experience and maintains executive-level confidentiality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
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
                <div className="w-14 h-14 md:w-16 md:h-16 bg-accent-gold text-secondary-foreground rounded-full flex items-center justify-center font-heading text-xl md:text-2xl mx-auto mb-3 md:mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-heading text-base md:text-lg text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-sm text-foreground/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
