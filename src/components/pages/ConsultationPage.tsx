import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Calendar, Clock, Globe, Shield, Video, AlertCircle, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Head } from '@/components/Head';
import { PAGE_METADATA_PRESETS, buildPageMetadata, getProfessionalServiceSchema } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ConsultationFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  caseDetails: string;
  preferredDate: string;
  preferredTime: string;
  language: string;
}

const INITIAL_FORM_DATA: ConsultationFormData = {
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  caseDetails: '',
  preferredDate: '',
  preferredTime: '',
  language: 'EN'
};

export default function ConsultationPage() {
  const [consultationType, setConsultationType] = useState<'standard' | 'emergency'>('standard');
  const [formStep, setFormStep] = useState<'contact' | 'details'>('contact');
  
  const pageMetadata = buildPageMetadata({
    ...PAGE_METADATA_PRESETS.consultation,
    canonicalUrl: 'https://www.jmclex.com/consultation',
    structuredData: getProfessionalServiceSchema({
      name: 'Legal Consultation Services',
      description: 'Book a confidential consultation with our international legal experts for strategic advice on cross-border business, compliance, and corporate matters.',
      serviceType: 'Legal Consultation',
      url: '/consultation',
    }),
  });
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('type') === 'emergency') {
      setConsultationType('emergency');
    }
  }, []);
  
  const [formData, setFormData] = useState<ConsultationFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { addingItemId, actions: cartActions } = useCart();
  const { currency } = useCurrency();

  const consultationPrice = consultationType === 'emergency' ? 500 : 250;

  const validateContactStep = useCallback((): boolean => {
    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone) {
      setSubmitError('Please fill in all contact details');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.clientEmail)) {
      setSubmitError('Please enter a valid email address');
      return false;
    }

    return true;
  }, [formData]);

  const validateDetailsStep = useCallback((): boolean => {
    if (!formData.caseDetails || !formData.preferredDate || !formData.preferredTime) {
      setSubmitError('Please fill in all required details');
      return false;
    }
    return true;
  }, [formData]);

  const handleContactStepSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (validateContactStep()) {
      setFormStep('details');
    }
  }, [validateContactStep]);

  const handleDetailsStepSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    if (!validateDetailsStep()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const consultationId = crypto.randomUUID();
      const itemName = `${consultationType === 'emergency' ? 'Emergency ' : ''}Legal Consultation`;
      
      // Save consultation request to CMS
      await BaseCrudService.create('consultationrequests', {
        _id: consultationId,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        caseDetails: formData.caseDetails,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        isPaid: false,
        itemName: itemName,
        itemPrice: consultationPrice
      });

      // Send email notification to admin
      try {
        await fetch('/api/send-consultation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            consultationId,
            clientName: formData.clientName,
            clientEmail: formData.clientEmail,
            clientPhone: formData.clientPhone,
            caseDetails: formData.caseDetails,
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime,
            consultationType,
            consultationPrice,
            adminEmail: 'contact@jmclex.com'
          })
        });
      } catch (emailError) {
        console.warn('Email notification failed, but consultation was saved:', emailError);
      }

      setSubmitSuccess(true);
      setFormData(INITIAL_FORM_DATA);
      setFormStep('contact');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'There was an error submitting your request. Please try again.';
      console.error('Error submitting consultation request:', error);
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, consultationType, consultationPrice, validateDetailsStep]);

  const handleAddToCart = useCallback(async () => {
    try {
      const consultationId = crypto.randomUUID();
      
      await BaseCrudService.create('consultationrequests', {
        _id: consultationId,
        itemName: `${consultationType === 'emergency' ? 'Emergency ' : ''}Legal Consultation`,
        itemPrice: consultationPrice,
        isPaid: false
      });

      cartActions.addToCart({
        collectionId: 'consultationrequests',
        itemId: consultationId
      });
    } catch (error) {
      console.error('Error adding consultation to cart:', error);
      setSubmitError('Failed to add consultation to cart. Please try again.');
    }
  }, [consultationType, consultationPrice, cartActions]);

  return (
    <div className="min-h-screen bg-background">
      <Head metadata={pageMetadata} />
      <Header />
      <Cart />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_806f5e326a97417ab05eeb263fb08145~mv2.png?originWidth=1152&originHeight=576"
            alt="Legal consultation"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-[100rem] mx-auto px-8 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-7xl text-optional-navy mb-8"
          >
            Book Your Consultation
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-optional-navy/90 max-w-4xl mx-auto mb-8"
          >
            Strategic legal consultation with our international team
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block bg-accent-gold text-background px-8 py-4 rounded-lg"
          >
            <span className="font-heading text-4xl">{formatPrice(consultationPrice, currency ?? DEFAULT_CURRENCY)}</span>
          </motion.div>
        </div>
      </section>

      {/* Consultation Type Selection */}
      <section className="w-full bg-optional-navy py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <h2 className="font-heading text-3xl text-background text-center mb-12">Choose Your Consultation Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Consultation */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => setConsultationType('standard')}
              className={`p-8 rounded-lg transition-all ${
                consultationType === 'standard'
                  ? 'bg-accent-gold text-background ring-2 ring-accent-gold'
                  : 'bg-background text-optional-navy border border-optional-navy/20 hover:border-accent-gold'
              }`}
            >
              <h3 className="font-heading text-2xl mb-4">Book a Consultation</h3>
              <p className="font-paragraph text-base mb-6">
                Standard legal consultation for general matters and strategic advice
              </p>
              <div className="font-heading text-3xl">{formatPrice(250, currency ?? DEFAULT_CURRENCY)}</div>
            </motion.button>

            {/* Emergency Consultation */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              onClick={() => setConsultationType('emergency')}
              className={`p-8 rounded-lg transition-all relative ${
                consultationType === 'emergency'
                  ? 'bg-accent-gold text-background ring-2 ring-accent-gold'
                  : 'bg-background text-optional-navy border border-optional-navy/20 hover:border-accent-gold'
              }`}
            >
              <div className="absolute -top-3 right-6 bg-accent-gold text-background px-4 py-1 rounded-full text-xs font-paragraph font-semibold">
                Priority
              </div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="font-heading text-2xl">Request Emergency Legal Assistance</h3>
              </div>
              <p className="font-paragraph text-base mb-6">
                Urgent consultation for time-sensitive legal matters requiring immediate attention
              </p>
              <div className="font-heading text-3xl">{formatPrice(500, currency ?? DEFAULT_CURRENCY)}</div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-optional-navy py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Video, title: 'Video Consultation', description: 'Secure video conferencing available' },
              { icon: Globe, title: 'Multilingual', description: 'Available in EN, FR, AR, ZH' },
              { icon: Shield, title: 'Confidential', description: 'Attorney-client privilege applies' },
              { icon: Clock, title: 'Flexible Scheduling', description: 'Choose your preferred time' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <feature.icon className="w-12 h-12 text-accent-gold mx-auto mb-4" />
                <h3 className="font-heading text-lg text-background mb-2">{feature.title}</h3>
                <p className="font-paragraph text-sm text-background/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl text-optional-navy mb-8">
                Schedule Your {consultationType === 'emergency' ? 'Emergency ' : ''}Consultation
              </h2>

              {submitSuccess ? (
                <div className="bg-secondary p-8 rounded-lg border border-accent-gold/30">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-accent-gold" />
                    <h3 className="font-heading text-2xl text-accent-gold">Request Submitted!</h3>
                  </div>
                  <p className="font-paragraph text-base text-optional-navy/90 mb-4 font-semibold">
                    Your confidential consultation request has been successfully received.
                  </p>
                  <p className="font-paragraph text-base text-optional-navy/90 mb-6">
                    A senior advisor will review your inquiry and respond discreetly within 24-48 hours. We appreciate your trust in JMC LEX.
                  </p>
                  <p className="font-paragraph text-sm text-optional-navy/70 mb-6">
                    A confirmation email has been sent to <span className="font-semibold">{formData.clientEmail}</span>
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSubmitError(null);
                    }}
                    className="bg-accent-gold text-background hover:bg-accent-gold/90"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={formStep === 'contact' ? handleContactStepSubmit : handleDetailsStepSubmit} className="space-y-6 bg-white p-8 rounded-lg border border-optional-navy/10 shadow-sm">
                  {/* Confidentiality Statement */}
                  <div className="flex items-start gap-3 bg-optional-navy/5 p-4 rounded-lg border border-optional-navy/10">
                    <Lock className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <p className="font-paragraph text-xs text-optional-navy/80">
                      All submissions are treated with the utmost confidentiality and discretion. Your privacy is our priority.
                    </p>
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                      <p className="font-paragraph text-sm text-red-800">
                        <span className="font-semibold">Error:</span> {submitError}
                      </p>
                    </div>
                  )}
                  {consultationType === 'emergency' && (
                    <div className="bg-accent-gold/10 border border-accent-gold/30 p-4 rounded-lg">
                      <p className="font-paragraph text-sm text-optional-navy font-medium">
                        <span className="text-accent-gold font-semibold">Priority Request:</span> Your consultation has been marked as urgent and will receive expedited handling.
                      </p>
                    </div>
                  )}

                  {/* Step Indicator */}
                  <div className="flex items-center gap-2 mb-8">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-paragraph text-sm font-semibold transition-colors ${
                      formStep === 'contact' 
                        ? 'bg-accent-gold text-background' 
                        : 'bg-accent-gold/30 text-optional-navy'
                    }`}>
                      1
                    </div>
                    <div className={`h-1 flex-1 transition-colors ${
                      formStep === 'details' ? 'bg-accent-gold' : 'bg-optional-navy/10'
                    }`}></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-paragraph text-sm font-semibold transition-colors ${
                      formStep === 'details' 
                        ? 'bg-accent-gold text-background' 
                        : 'bg-optional-navy/10 text-optional-navy'
                    }`}>
                      2
                    </div>
                  </div>

                  {/* Step 1: Contact Details */}
                  {formStep === 'contact' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <p className="font-heading text-lg text-optional-navy mb-6">Your Contact Details for a Confidential Discussion</p>
                      </div>

                      <div>
                        <label className="font-paragraph text-sm text-optional-navy font-medium mb-2 block">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          className="w-full bg-white text-optional-navy border border-optional-navy/20 rounded-lg px-4 py-3 md:py-4 placeholder:text-optional-navy/40 focus:border-accent-gold focus:outline-none transition-colors"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="font-paragraph text-sm text-optional-navy font-medium mb-2 block">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                          className="w-full bg-white text-optional-navy border border-optional-navy/20 rounded-lg px-4 py-3 md:py-4 placeholder:text-optional-navy/40 focus:border-accent-gold focus:outline-none transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="font-paragraph text-sm text-optional-navy font-medium mb-2 block">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          required
                          value={formData.clientPhone}
                          onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                          className="w-full bg-white text-optional-navy border border-optional-navy/20 rounded-lg px-4 py-3 md:py-4 placeholder:text-optional-navy/40 focus:border-accent-gold focus:outline-none transition-colors"
                          placeholder="+1 234 567 8900"
                        />
                      </div>

                      <div>
                        <label className="font-paragraph text-sm text-optional-navy font-medium mb-2 block">
                          Preferred Language
                        </label>
                        <select
                          value={formData.language}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                          className="w-full bg-white text-optional-navy border border-optional-navy/20 rounded-lg px-4 py-3 md:py-4 font-paragraph focus:border-accent-gold focus:outline-none transition-colors"
                        >
                          <option value="EN">English</option>
                          <option value="FR">French</option>
                          <option value="AR">Arabic</option>
                          <option value="ZH">Mandarin Chinese</option>
                        </select>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-accent-gold text-background hover:bg-accent-gold/90 py-4 md:py-6 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
                      >
                        Continue to Details
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  )}

                  {/* Step 2: Inquiry Details */}
                  {formStep === 'details' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <p className="font-heading text-lg text-optional-navy mb-6">Briefly Outline Your Strategic Inquiry</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="font-paragraph text-sm text-optional-navy font-medium mb-2 block">
                            Preferred Date *
                          </label>
                          <Input
                            type="date"
                            required
                            value={formData.preferredDate}
                            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            className="w-full bg-white text-optional-navy border border-optional-navy/20 rounded-lg px-4 py-3 md:py-4 focus:border-accent-gold focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="font-paragraph text-sm text-optional-navy font-medium mb-2 block">
                            Preferred Time *
                          </label>
                          <Input
                            type="time"
                            required
                            value={formData.preferredTime}
                            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                            className="w-full bg-white text-optional-navy border border-optional-navy/20 rounded-lg px-4 py-3 md:py-4 focus:border-accent-gold focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-paragraph text-sm text-optional-navy font-medium mb-2 block">
                          Strategic Inquiry Details *
                        </label>
                        <Textarea
                          required
                          value={formData.caseDetails}
                          onChange={(e) => setFormData({ ...formData, caseDetails: e.target.value })}
                          className="w-full bg-white text-optional-navy border border-optional-navy/20 rounded-lg px-4 py-3 md:py-4 min-h-[150px] placeholder:text-optional-navy/40 focus:border-accent-gold focus:outline-none transition-colors"
                          placeholder="Please provide a brief description of your legal matter and strategic objectives..."
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          onClick={() => {
                            setFormStep('contact');
                            setSubmitError(null);
                          }}
                          className="flex-1 bg-optional-navy/10 text-optional-navy hover:bg-optional-navy/20 py-4 md:py-6 text-lg font-semibold rounded-lg"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-accent-gold text-background hover:bg-accent-gold/90 py-4 md:py-6 text-lg font-semibold rounded-lg"
                        >
                          {isSubmitting ? 'Submitting...' : 'Request Confidential Consultation'}
                        </Button>
                      </div>

                      <p className="font-paragraph text-xs text-optional-navy/60 text-center">
                        Payment instructions will be provided after confirmation. All consultations are subject to attorney-client privilege.
                      </p>
                    </motion.div>
                  )}
                </form>
              )}
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-secondary p-8 rounded-lg border border-accent-gold/30">
                <h3 className="font-heading text-2xl text-optional-navy mb-6">What to Expect</h3>
                <ul className="space-y-4">
                  {[
                    'Confirmation within 24 hours',
                    'Secure payment link provided',
                    'Video consultation link sent',
                    'Pre-consultation questionnaire',
                    '60-minute strategic session',
                    'Follow-up recommendations'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-paragraph text-base text-optional-navy/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-secondary p-8 rounded-lg border border-accent-gold/30">
                <h3 className="font-heading text-2xl text-optional-navy mb-4">Quick Purchase</h3>
                <p className="font-paragraph text-base text-optional-navy/80 mb-6">
                  Add consultation to cart and complete booking details during checkout.
                </p>
                <button
                  onClick={handleAddToCart}
                  disabled={addingItemId !== null}
                  className="w-full bg-accent-gold text-background font-paragraph font-semibold px-6 py-4 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                >
                  {addingItemId ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>

              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/5e1235_7ba2916ffc2048a0ac5ced6085a7c1cf~mv2.png?originWidth=448&originHeight=256"
                  alt="Legal consultation"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
