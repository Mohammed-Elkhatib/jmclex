import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Calendar, Clock, Globe, Shield, Video } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    caseDetails: '',
    preferredDate: '',
    preferredTime: '',
    language: 'EN'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { addingItemId, actions: cartActions } = useCart();
  const { currency } = useCurrency();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create('consultationrequests', {
        _id: crypto.randomUUID(),
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        caseDetails: formData.caseDetails,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        isPaid: false,
        itemName: 'Legal Consultation - 250 USD',
        itemPrice: 250
      });

      setSubmitSuccess(true);
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        caseDetails: '',
        preferredDate: '',
        preferredTime: '',
        language: 'EN'
      });
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = async () => {
    const consultationId = crypto.randomUUID();
    
    await BaseCrudService.create('consultationrequests', {
      _id: consultationId,
      itemName: 'Legal Consultation',
      itemPrice: 250,
      isPaid: false
    });

    cartActions.addToCart({
      collectionId: 'consultationrequests',
      itemId: consultationId
    });
  };

  return (
    <div className="min-h-screen bg-background">
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
            className="font-heading text-6xl md:text-7xl text-foreground mb-8"
          >
            Book Your Consultation
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto mb-8"
          >
            Strategic legal consultation with our international team
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block bg-accent-gold text-secondary-foreground px-8 py-4 rounded"
          >
            <span className="font-heading text-4xl">{formatPrice(250, currency ?? DEFAULT_CURRENCY)}</span>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-optional-navy py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Video, title: 'Video Consultation', description: 'Secure video conferencing available' },
              { icon: Globe, title: 'Multilingual', description: 'Available in EN, FR, AR' },
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
                <h3 className="font-heading text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="font-paragraph text-sm text-foreground/70">{feature.description}</p>
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
              <h2 className="font-heading text-4xl text-foreground mb-8">
                Schedule Your Consultation
              </h2>

              {submitSuccess ? (
                <div className="bg-optional-navy p-8 rounded">
                  <h3 className="font-heading text-2xl text-accent-gold mb-4">Request Submitted!</h3>
                  <p className="font-paragraph text-base text-foreground/90 mb-6">
                    Thank you for your consultation request. Our team will contact you within 24 hours to confirm your appointment and provide payment instructions.
                  </p>
                  <Button
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-accent-gold text-secondary-foreground hover:bg-accent-gold/90"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-paragraph text-sm text-foreground mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="bg-optional-navy text-foreground border-foreground/20"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-foreground mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      className="bg-optional-navy text-foreground border-foreground/20"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-foreground mb-2 block">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      className="bg-optional-navy text-foreground border-foreground/20"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-foreground mb-2 block">
                      Preferred Language
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full bg-optional-navy text-foreground border border-foreground/20 rounded px-4 py-3 font-paragraph"
                    >
                      <option value="EN">English</option>
                      <option value="FR">French</option>
                      <option value="AR">Arabic</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-paragraph text-sm text-foreground mb-2 block">
                        Preferred Date *
                      </label>
                      <Input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="bg-optional-navy text-foreground border-foreground/20"
                      />
                    </div>

                    <div>
                      <label className="font-paragraph text-sm text-foreground mb-2 block">
                        Preferred Time *
                      </label>
                      <Input
                        type="time"
                        required
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="bg-optional-navy text-foreground border-foreground/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-foreground mb-2 block">
                      Case Details *
                    </label>
                    <Textarea
                      required
                      value={formData.caseDetails}
                      onChange={(e) => setFormData({ ...formData, caseDetails: e.target.value })}
                      className="bg-optional-navy text-foreground border-foreground/20 min-h-[150px]"
                      placeholder="Please provide a brief description of your legal matter..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-gold text-secondary-foreground hover:bg-accent-gold/90 py-6 text-lg font-semibold"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
                  </Button>

                  <p className="font-paragraph text-xs text-foreground/60 text-center">
                    Payment instructions will be provided after confirmation. All consultations are subject to attorney-client privilege.
                  </p>
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
              <div className="bg-optional-navy p-8 rounded">
                <h3 className="font-heading text-2xl text-foreground mb-6">What to Expect</h3>
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
                      <span className="font-paragraph text-base text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-optional-navy p-8 rounded">
                <h3 className="font-heading text-2xl text-foreground mb-4">Quick Purchase</h3>
                <p className="font-paragraph text-base text-foreground/80 mb-6">
                  Add consultation to cart and complete booking details during checkout.
                </p>
                <button
                  onClick={handleAddToCart}
                  disabled={addingItemId !== null}
                  className="w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-4 rounded transition-all hover:scale-105 disabled:opacity-50"
                >
                  {addingItemId ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>

              <div className="relative h-[300px] rounded overflow-hidden">
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
