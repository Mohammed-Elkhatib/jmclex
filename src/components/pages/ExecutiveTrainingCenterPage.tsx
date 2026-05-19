import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, CheckCircle, Clock, Phone, FileCheck, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExecutiveApplicationForm from '@/components/ExecutiveApplicationForm';
import PremiumPricingSection from '@/components/PremiumPricingSection';

export default function ExecutiveTrainingCenterPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'application' | 'process' | 'pricing'>('overview');

  const processSteps = [
    {
      number: '1',
      title: 'Application',
      description: 'Submit your comprehensive executive application with CV and supporting documents',
      icon: FileCheck,
      details: 'Complete the detailed application form with your professional background, objectives, and strategic motivation.'
    },
    {
      number: '2',
      title: '72-Hour Review',
      description: 'Our team conducts a thorough confidential review of your application',
      icon: Clock,
      details: 'We carefully evaluate your qualifications, experience, and fit for the program to ensure premium executive standards.'
    },
    {
      number: '3',
      title: 'Confidential Consultation Call',
      description: 'Schedule a private discussion with our program director',
      icon: Phone,
      details: 'Discuss your objectives, program details, and confirm your participation in a confidential one-on-one call.'
    },
    {
      number: '4',
      title: 'Approval',
      description: 'Receive formal approval and program confirmation',
      icon: CheckCircle,
      details: 'Upon approval, you will receive detailed program materials, schedule, and access information.'
    },
    {
      number: '5',
      title: 'Payment Confirmation',
      description: 'Secure payment processing and enrollment finalization',
      icon: CreditCard,
      details: 'Complete payment through our secure system and receive your enrollment confirmation and program access.'
    }
  ];

  const benefits = [
    {
      title: 'Elite Instructor Panel',
      description: 'Learn directly from top-tier legal experts and thought leaders with decades of experience'
    },
    {
      title: 'Confidential Environment',
      description: 'Private, secure learning setting designed for sensitive strategic discussions'
    },
    {
      title: 'Personalized Attention',
      description: 'Small cohorts ensure individual attention and tailored learning experiences'
    },
    {
      title: 'Executive Certification',
      description: 'Recognized credentials that enhance professional standing and credibility'
    },
    {
      title: 'Strategic Curriculum',
      description: 'Real-world case studies and landmark decisions analyzed in depth'
    },
    {
      title: 'Bilingual Delivery',
      description: 'Programs available in English and French for global professionals'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-foreground overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-gold rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 md:mb-8"
            >
              <span className="inline-block font-paragraph text-xs md:text-sm tracking-widest uppercase text-accent-gold font-semibold">
                Premium Executive Training
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-7xl text-secondary leading-tight md:leading-tight lg:leading-tight mb-8 md:mb-10 lg:mb-12 max-w-5xl mx-auto"
            >
              Executive Training Center & Certification
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-paragraph text-base md:text-lg lg:text-xl text-secondary/90 max-w-3xl mx-auto mb-12 md:mb-14 lg:mb-16 leading-relaxed"
            >
              Exclusive legal education for distinguished executives, legal professionals, and business leaders seeking elite strategic training and professional certification.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
            >
              <button
                onClick={() => setActiveTab('application')}
                className="inline-flex items-center justify-center gap-3 bg-accent-gold text-foreground font-paragraph font-semibold px-8 md:px-10 py-4 md:py-5 rounded transition-all duration-300 hover:bg-accent-gold/90 hover:scale-105 active:scale-95"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => setActiveTab('process')}
                className="inline-flex items-center justify-center gap-3 bg-secondary text-foreground font-paragraph font-semibold px-8 md:px-10 py-4 md:py-5 rounded border border-accent-gold/30 transition-all duration-300 hover:border-accent-gold/60 hover:scale-105 active:scale-95"
              >
                Learn About Process
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="w-full bg-secondary border-b border-accent-gold/20 sticky top-0 z-40">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <div className="flex gap-2 md:gap-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'pricing', label: 'Pricing & Offers' },
              { id: 'process', label: 'Application Process' },
              { id: 'application', label: 'Apply Now' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 md:px-6 py-4 md:py-5 font-paragraph font-medium text-sm md:text-base transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-accent-gold text-foreground'
                    : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="w-full">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Premium Benefits Section */}
            <section className="w-full bg-background py-16 md:py-24 lg:py-28">
              <div className="max-w-[100rem] mx-auto px-6 md:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-14 md:mb-16 lg:mb-20"
                >
                  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 md:mb-6">
                    Premium Executive Benefits
                  </h2>
                  <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
                    Designed exclusively for distinguished professionals
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="bg-secondary rounded-lg p-6 md:p-7 lg:p-8 border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/10"
                    >
                      <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-accent-gold" />
                      </div>
                      <h3 className="font-heading text-lg md:text-xl text-foreground mb-3">
                        {benefit.title}
                      </h3>
                      <p className="font-paragraph text-sm md:text-base text-foreground/80 leading-relaxed">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Program Highlights */}
            <section className="w-full bg-secondary py-16 md:py-24 lg:py-28">
              <div className="max-w-[100rem] mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-14 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 md:mb-8">
                      Comprehensive Executive Education
                    </h2>
                    <p className="font-paragraph text-base md:text-lg text-foreground/90 mb-6 md:mb-8 leading-relaxed">
                      Our Executive Training Center offers selective, premium legal education designed for professionals at the highest levels of their organizations. Each program combines rigorous academic content with practical strategic application.
                    </p>
                    <ul className="space-y-4 md:space-y-5">
                      {[
                        '6-hour intensive programs led by elite legal experts',
                        'Confidential, executive-level learning environment',
                        'Personalized attention in small, curated cohorts',
                        'Real-world case studies and landmark decisions',
                        'Professional certification upon completion',
                        'Bilingual delivery in English and French'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 md:gap-4">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                          <p className="font-paragraph text-sm md:text-base text-foreground/90">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[300px] md:h-[400px] lg:h-[450px]"
                  >
                    <Image
                      src="https://static.wixstatic.com/media/5e1235_c7fad726680c4e6293a1dfe62a96b484~mv2.png?originWidth=768&originHeight=448"
                      alt="Executive training session"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-background py-16 md:py-24 lg:py-28"
          >
            <div className="max-w-[100rem] mx-auto px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-14 md:mb-16 lg:mb-20"
              >
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 md:mb-6">
                  Application Process
                </h2>
                <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
                  Five streamlined steps to your executive training enrollment
                </p>
              </motion.div>

              {/* Process Timeline */}
              <div className="space-y-6 md:space-y-8 lg:space-y-10">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Connector Line */}
                      {index < processSteps.length - 1 && (
                        <div className="absolute left-8 md:left-12 top-24 md:top-28 w-0.5 h-12 md:h-16 bg-gradient-to-b from-accent-gold/60 to-accent-gold/20"></div>
                      )}

                      <div className="flex gap-6 md:gap-8 lg:gap-10">
                        {/* Step Number Circle */}
                        <div className="flex-shrink-0">
                          <div className="w-16 md:w-20 h-16 md:h-20 rounded-full bg-accent-gold/10 border-2 border-accent-gold flex items-center justify-center relative z-10">
                            <Icon className="w-8 h-8 md:w-10 md:h-10 text-accent-gold" />
                          </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 pt-2 md:pt-3">
                          <div className="bg-secondary rounded-lg p-6 md:p-7 lg:p-8 border border-accent-gold/20 hover:border-accent-gold/40 transition-all">
                            <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
                              <div>
                                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">
                                  {step.title}
                                </h3>
                                <p className="font-paragraph text-base md:text-lg text-foreground/80">
                                  {step.description}
                                </p>
                              </div>
                              <span className="text-3xl md:text-4xl font-heading text-accent-gold/30 flex-shrink-0">
                                {step.number}
                              </span>
                            </div>
                            <p className="font-paragraph text-sm md:text-base text-foreground/70 pt-4 md:pt-5 border-t border-foreground/10">
                              {step.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-14 md:mt-16 lg:mt-20 text-center"
              >
                <button
                  onClick={() => setActiveTab('application')}
                  className="inline-flex items-center gap-3 bg-accent-gold text-foreground font-paragraph font-semibold px-8 md:px-10 py-4 md:py-5 rounded transition-all duration-300 hover:bg-accent-gold/90 hover:scale-105 active:scale-95"
                >
                  Start Your Application
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PremiumPricingSection />
          </motion.div>
        )}

        {/* Application Tab */}
        {activeTab === 'application' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-background py-16 md:py-24 lg:py-28"
          >
            <div className="max-w-[100rem] mx-auto px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 md:mb-14 lg:mb-16"
              >
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 md:mb-6">
                  Executive Application Form
                </h2>
                <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
                  Complete this comprehensive form to apply for our premium executive training programs
                </p>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                <ExecutiveApplicationForm />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
