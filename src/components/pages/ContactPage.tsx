import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Head } from '@/components/Head';
import { PAGE_METADATA_PRESETS, buildPageMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const pageMetadata = buildPageMetadata({
    ...PAGE_METADATA_PRESETS.contact,
    canonicalUrl: 'https://www.jmclex.com/contact',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inquiryId = crypto.randomUUID();
      
      // Save to CMS collection
      await BaseCrudService.create('contactinquiries', {
        _id: inquiryId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.country,
        message: formData.message
      });

      // Send email notification to admin
      try {
        await fetch('/api/send-consultation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'contact@jmclex.com',
            subject: `New Contact Inquiry from ${formData.name}`,
            inquiryName: formData.name,
            inquiryEmail: formData.email,
            inquiryPhone: formData.phone,
            inquiryCountry: formData.country,
            inquirySubject: 'Contact Form Inquiry',
            inquiryMessage: formData.message
          })
        });
      } catch (emailError) {
        console.warn('Email notification failed, but inquiry was saved:', emailError);
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Head metadata={pageMetadata} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_52eec47975f74bab9d8e1e5267314d09~mv2.png?originWidth=1152&originHeight=576"
            alt="Contact us"
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
            Contact Us
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-optional-navy/90 max-w-4xl mx-auto"
          >
            Get in touch with our international legal team
          </motion.p>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="w-full bg-optional-navy py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Urgent Consultation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-background/10 p-8 rounded-lg border border-accent-gold/20"
            >
              <h3 className="font-heading text-2xl text-accent-gold mb-4">Urgent Consultation</h3>
              <div className="space-y-3">
                <p className="font-paragraph text-base text-background/90">
                  <span className="font-semibold">Response within 24 hours</span>
                </p>
                <p className="font-paragraph text-base text-background/80">
                  Priority legal and strategic review
                </p>
              </div>
            </motion.div>

            {/* Standard Consultation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-background/10 p-8 rounded-lg border border-accent-gold/20"
            >
              <h3 className="font-heading text-2xl text-accent-gold mb-4">Standard Consultation</h3>
              <div className="space-y-3">
                <p className="font-paragraph text-base text-background/90">
                  <span className="font-semibold">Response within 72 hours</span>
                </p>
                <p className="font-paragraph text-base text-background/80">
                  Standard legal or advisory request
                </p>
              </div>
            </motion.div>
          </div>

          {/* Quick Contact */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-optional-navy" />
              </div>
              <h4 className="font-heading text-lg text-background mb-2">Email</h4>
              <a href="mailto:contact@jmclex.com" className="font-paragraph text-base text-background/80 hover:text-accent-gold transition-colors duration-300">
                contact@jmclex.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-optional-navy" />
              </div>
              <h4 className="font-heading text-lg text-background mb-2">Lebanon</h4>
              <a href="https://wa.me/96178873196" target="_blank" rel="noopener noreferrer" className="font-paragraph text-base text-background/80 hover:text-accent-gold transition-colors duration-300">
                +961 78 873 196
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-optional-navy" />
              </div>
              <h4 className="font-heading text-lg text-background mb-2">France</h4>
              <a href="https://wa.me/33769596922" target="_blank" rel="noopener noreferrer" className="font-paragraph text-base text-background/80 hover:text-accent-gold transition-colors duration-300">
                +33 7 69 59 69 22
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
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
                Send Us a Message
              </h2>

              {submitSuccess ? (
                <div className="bg-optional-navy p-8 rounded-lg">
                  <h3 className="font-heading text-2xl text-accent-gold mb-4">Message Sent!</h3>
                  <p className="font-paragraph text-base text-background/90 mb-6">
                    Thank you for contacting JMC LEGAL. We will respond to your inquiry within the specified timeframe.
                  </p>
                  <Button
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-accent-gold text-optional-navy hover:bg-accent-gold/90 rounded-lg transition-all duration-300"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-paragraph text-sm text-optional-navy mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-secondary text-optional-navy border-optional-navy/20 rounded-lg transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-optional-navy mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-secondary text-optional-navy border-optional-navy/20 rounded-lg transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-optional-navy mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-secondary text-optional-navy border-optional-navy/20 rounded-lg transition-all duration-300"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-optional-navy mb-2 block">
                      Country *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="bg-secondary text-optional-navy border-optional-navy/20 rounded-lg transition-all duration-300"
                      placeholder="Your country"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-optional-navy mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-secondary text-optional-navy border-optional-navy/20 min-h-[200px] rounded-lg transition-all duration-300"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-gold text-optional-navy hover:bg-accent-gold/90 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/5e1235_7c16727d91f3457b8a46ff70d1e76a06~mv2.png?originWidth=768&originHeight=384"
                  alt="Office locations map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-accent-gold mx-auto mb-4" />
                    <p className="font-heading text-2xl text-optional-navy">Our Global Offices</p>
                  </div>
                </div>
              </div>

              <div className="bg-optional-navy p-8 rounded-lg">
                <h3 className="font-heading text-2xl text-background mb-6">Office Locations</h3>
                <div className="space-y-6">
                  {[
                    { country: 'Lebanon', cities: 'Beirut, Bekaa, Mount Lebanon' },
                    { country: 'France', cities: 'Paris, Strasbourg, Toulouse' },
                    { country: 'UAE', cities: 'Dubai' },
                    { country: 'Saudi Arabia', cities: 'Riyadh' }
                  ].map((location) => (
                    <div key={location.country} className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-accent-gold flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-paragraph text-base text-background font-medium">{location.country}</p>
                        <p className="font-paragraph text-sm text-background/70">{location.cities}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-optional-navy p-8 rounded-lg">
                <h3 className="font-heading text-2xl text-background mb-4">Business Hours</h3>
                <p className="font-paragraph text-base text-background/80 mb-4">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="font-paragraph text-sm text-background/60">
                  Emergency consultations available by appointment
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
