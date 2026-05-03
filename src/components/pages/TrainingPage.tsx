import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Award, BookOpen, Users } from 'lucide-react';
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
      // Add timeout protection - max 5 seconds
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Data fetch timeout')), 5000)
      );
      
      const result = await Promise.race([
        BaseCrudService.getAll<TrainingCourses>('trainingcourses'),
        timeoutPromise
      ]) as any;
      
      setCourses(result?.items || []);
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourses([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

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
            Legal Training & Certification
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Professional legal education programs with certification and subscription options
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: BookOpen,
                title: 'Expert-Led Courses',
                description: 'Learn from experienced international legal practitioners with decades of expertise'
              },
              {
                icon: Award,
                title: 'Professional Certification',
                description: 'Receive recognized certifications upon successful completion of training programs'
              },
              {
                icon: Users,
                title: 'Subscription Access',
                description: 'Subscribe for unlimited access to our complete library of legal training courses'
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

      {/* Courses */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl text-foreground mb-6">Available Courses</h2>
            <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
              Comprehensive training programs designed for legal professionals and businesses
            </p>
          </motion.div>

          <div className="min-h-[600px]">
            {isLoading ? null : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-optional-navy rounded overflow-hidden flex flex-col"
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
                        <div className="mb-6 p-4 bg-background rounded">
                          <p className="font-paragraph text-sm text-accent-gold font-medium mb-2">Certification:</p>
                          <p className="font-paragraph text-sm text-foreground/70">{course.certificationDetails}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="font-heading text-3xl text-accent-gold">
                          {formatPrice(course.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                        </div>
                        <button
                          onClick={() => actions.addToCart({ 
                            collectionId: 'trainingcourses', 
                            itemId: course._id 
                          })}
                          disabled={addingItemId === course._id}
                          className="bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-3 rounded transition-all hover:scale-105 disabled:opacity-50"
                        >
                          {addingItemId === course._id ? 'Adding...' : 'Enroll Now'}
                        </button>
                      </div>
                      
                      {course.courseUrl && (
                        <a
                          href={course.courseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all mt-4 font-paragraph text-sm"
                        >
                          View Details <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground/60">
                  Training courses coming soon
                </p>
              </div>
            )}
          </div>
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
                Subscription Model
              </h2>
              <p className="font-paragraph text-lg text-foreground/90 mb-6 leading-relaxed">
                Get unlimited access to our entire library of legal training courses with a subscription. Perfect for law firms, corporate legal departments, and individual practitioners committed to continuous professional development.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Access to all current and future courses',
                  'Professional certification upon completion',
                  'Downloadable course materials',
                  'Priority support from instructors',
                  'Flexible learning schedule'
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
