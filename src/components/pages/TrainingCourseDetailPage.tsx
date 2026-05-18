import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowRight, ArrowLeft, Clock, Globe, Award, Users, BookOpen } from 'lucide-react';
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
        <div className="max-w-[100rem] mx-auto px-8 py-32 text-center">
          <h1 className="font-heading text-5xl text-foreground mb-6">Course Not Found</h1>
          <p className="font-paragraph text-lg text-foreground/80 mb-8">
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
      <div className="max-w-[100rem] mx-auto px-8 py-8 mt-20">
        <Link
          to="/training"
          className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all font-paragraph text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Training Center
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={course.itemImage || 'https://static.wixstatic.com/media/5e1235_1921557ef1e84f528c4d105925f45779~mv2.png?originWidth=384&originHeight=192'}
            alt={course.itemName || 'Training course'}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"></div>
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-8 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-7xl text-foreground mb-6"
          >
            {course.itemName}
          </motion.h1>

          {course.executiveCategory && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-paragraph text-xl text-accent-gold mb-6"
            >
              {course.executiveCategory}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto"
          >
            {course.itemDescription}
          </motion.p>
        </div>
      </section>

      {/* Course Details */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Program Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-4xl text-foreground mb-8">Program Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {course.duration && (
                    <div className="flex gap-4">
                      <Clock className="w-8 h-8 text-accent-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-lg text-foreground mb-2">Duration</h3>
                        <p className="font-paragraph text-foreground/80">{course.duration}</p>
                      </div>
                    </div>
                  )}
                  {course.language && (
                    <div className="flex gap-4">
                      <Globe className="w-8 h-8 text-accent-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-lg text-foreground mb-2">Language</h3>
                        <p className="font-paragraph text-foreground/80">{course.language}</p>
                      </div>
                    </div>
                  )}
                  {course.level && (
                    <div className="flex gap-4">
                      <BookOpen className="w-8 h-8 text-accent-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-lg text-foreground mb-2">Level</h3>
                        <p className="font-paragraph text-foreground/80">{course.level}</p>
                      </div>
                    </div>
                  )}
                  {course.certification && (
                    <div className="flex gap-4">
                      <Award className="w-8 h-8 text-accent-gold flex-shrink-0" />
                      <div>
                        <h3 className="font-heading text-lg text-foreground mb-2">Certification</h3>
                        <p className="font-paragraph text-foreground/80">{course.certification}</p>
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
                  <h2 className="font-heading text-4xl text-foreground mb-8">Strategic Outcomes</h2>
                  <div className="bg-background rounded-lg p-8">
                    <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
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
                  <h2 className="font-heading text-4xl text-foreground mb-8">Program Details</h2>
                  <div className="bg-background rounded-lg p-8">
                    <p className="font-paragraph text-lg text-foreground/90 leading-relaxed">
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
                  <h2 className="font-heading text-4xl text-foreground mb-8">Program Format</h2>
                  <div className="bg-background rounded-lg p-8 flex gap-4">
                    <Users className="w-8 h-8 text-accent-gold flex-shrink-0" />
                    <div>
                      <p className="font-paragraph text-lg text-foreground/90">{course.programType}</p>
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
              className="space-y-8"
            >
              {/* Pricing Card */}
              <div className="bg-background rounded-lg p-8 sticky top-32">
                <div className="mb-8">
                  <p className="font-paragraph text-sm text-foreground/60 mb-2">Program Fee</p>
                  <div className="font-heading text-5xl text-accent-gold">
                    {formatPrice(course.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                  </div>
                </div>

                {course.pricing && (
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <p className="font-paragraph text-sm text-foreground/80">{course.pricing}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      actions.addToCart({
                        collectionId: 'trainingcourses',
                        itemId: course._id
                      });
                    }}
                    disabled={addingItemId === course._id}
                    className="w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-4 rounded transition-all hover:scale-105 disabled:opacity-50"
                  >
                    {addingItemId === course._id ? 'Adding to Cart...' : 'Add to Cart'}
                  </button>

                  <button
                    onClick={() => setShowApplicationForm(!showApplicationForm)}
                    className="w-full bg-foreground text-background font-paragraph font-semibold px-6 py-4 rounded transition-all hover:scale-105"
                  >
                    Apply Now
                  </button>
                </div>

                {course.isSubscriptionAvailable && (
                  <div className="mt-8 pt-8 border-t border-foreground/10">
                    <p className="font-paragraph text-sm text-accent-gold font-medium mb-3">
                      ✓ Subscription Available
                    </p>
                    <p className="font-paragraph text-xs text-foreground/70">
                      Get unlimited access to this and all other programs with our subscription plan.
                    </p>
                  </div>
                )}

                {/* Executive Development Package Info */}
                <div className="mt-8 pt-8 border-t border-foreground/10">
                  <p className="font-heading text-sm text-foreground mb-3">Executive Development Package</p>
                  <p className="font-paragraph text-xs text-foreground/70">
                    Enroll in 3 or more programs and receive a 30% discount on your entire package.
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-8">
                <h3 className="font-heading text-lg text-foreground mb-4">Questions?</h3>
                <p className="font-paragraph text-sm text-foreground/80 mb-4">
                  Contact our team for more information about this program.
                </p>
                <a
                  href="mailto:contact@jmclex.com"
                  className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all font-paragraph text-sm font-medium"
                >
                  contact@jmclex.com <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      {showApplicationForm && (
        <section className="w-full bg-background py-32">
          <div className="max-w-[100rem] mx-auto px-8">
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
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl text-foreground mb-6">Selective Enrollment Process</h2>
            <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
              Our selective enrollment process ensures a premium learning experience and maintains the confidential, executive-level positioning of our programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: '1', title: 'Application', desc: 'Submit your executive profile' },
              { step: '2', title: 'Review', desc: 'Internal evaluation by team' },
              { step: '3', title: 'Consultation', desc: 'Confidential discussion call' },
              { step: '4', title: 'Approval', desc: 'Enrollment confirmation' },
              { step: '5', title: 'Payment', desc: 'Secure payment arrangement' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent-gold text-secondary-foreground rounded-full flex items-center justify-center font-heading text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">{item.title}</h3>
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
