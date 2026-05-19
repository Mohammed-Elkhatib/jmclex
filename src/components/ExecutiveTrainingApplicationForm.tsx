import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ArrowRight, CheckCircle, Clock, Phone, Award, CreditCard } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { useLanguageStore } from '@/lib/language-store';

interface ExecutiveTrainingApplicationFormProps {
  programName: string;
  onSuccess?: () => void;
}

export default function ExecutiveTrainingApplicationForm({ programName, onSuccess }: ExecutiveTrainingApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguageStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    currentPosition: '',
    company: '',
    industry: '',
    yearsOfExperience: '',
    selectedProgram: programName,
    preferredLanguage: language === 'FR' ? 'French' : 'English',
    preferredProgramLevel: 'Foundations',
    professionalObjectives: '',
    strategicMotivation: '',
    preferredSessionFormat: 'One-to-One',
    preferredAvailability: '',
    cvUpload: '',
    supportingDocuments: '',
    internalReviewStatus: 'Pending Review'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'cvUpload' | 'supportingDocuments') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or DOC file.');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB.');
      return;
    }

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataForUpload
      });

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      
      setFormData(prev => ({
        ...prev,
        [fieldName]: data.url
      }));
    } catch (err) {
      setError('File upload failed. Please try again.');
      console.error('Upload error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const applicationData = {
        _id: crypto.randomUUID(),
        ...formData,
        yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
        _createdDate: new Date(),
        _updatedDate: new Date()
      };

      await BaseCrudService.create('executivetrainingapplications', applicationData);

      // Send email notification to applicant
      await fetch('/api/send-consultation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          subject: `Executive Training Application Received - ${programName}`,
          applicantName: formData.fullName,
          applicantEmail: formData.email,
          program: programName,
          message: `Dear ${formData.fullName},\n\nThank you for submitting your application to ${programName}. We have received your submission and our team will review it carefully.\n\nExpected response time: 3-5 business days.\n\nBest regards,\nJMC LEX Training Center`
        })
      });

      // Send email notification to admin
      await fetch('/api/send-consultation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'contact@jmclex.com',
          subject: `New Executive Training Application - ${programName}`,
          applicantName: formData.fullName,
          applicantEmail: formData.email,
          program: programName,
          message: `New Executive Training Application received:\n\nApplicant: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProgram: ${programName}\nLevel: ${formData.preferredProgramLevel}\nSession Format: ${formData.preferredSessionFormat}\nPreferred Language: ${formData.preferredLanguage}\n\nPlease review and follow up accordingly.`
        })
      });

      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        currentPosition: '',
        company: '',
        industry: '',
        yearsOfExperience: '',
        selectedProgram: programName,
        preferredLanguage: language === 'FR' ? 'French' : 'English',
        professionalObjectives: '',
        strategicMotivation: '',
        cvUpload: '',
        supportingDocuments: '',
        internalReviewStatus: 'Pending Review'
      });

      if (onSuccess) onSuccess();

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const processSteps = [
      {
        number: 1,
        title: 'Application',
        description: 'Your application has been submitted',
        icon: CheckCircle,
        status: 'completed'
      },
      {
        number: 2,
        title: '72-Hour Review',
        description: 'Executive team review',
        icon: Clock,
        status: 'pending'
      },
      {
        number: 3,
        title: 'Consultation Call',
        description: 'Confidential discussion',
        icon: Phone,
        status: 'pending'
      },
      {
        number: 4,
        title: 'Approval',
        description: 'Program confirmation',
        icon: Award,
        status: 'pending'
      },
      {
        number: 5,
        title: 'Payment',
        description: 'Secure payment processing',
        icon: CreditCard,
        status: 'pending'
      }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8 md:space-y-10"
      >
        {/* Success Message */}
        <div className="bg-accent-gold/10 border border-accent-gold rounded-lg p-6 md:p-8 lg:p-12 text-center">
          <CheckCircle className="w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 text-accent-gold mx-auto mb-4 md:mb-6" />
          <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 md:mb-4">Application Submitted Successfully</h3>
          <p className="font-paragraph text-base md:text-lg text-foreground/80 mb-4 md:mb-6">
            Thank you for your application to {programName}. Your submission has been received and will be reviewed by our executive team.
          </p>
          <div className="bg-background rounded-lg p-4 md:p-6 mb-4 md:mb-6 text-left space-y-2 md:space-y-3">
            <p className="font-paragraph text-xs md:text-sm text-foreground/80">
              <span className="font-semibold text-foreground">Confirmation emails have been sent to:</span>
            </p>
            <ul className="space-y-1 md:space-y-2 ml-4">
              <li className="font-paragraph text-xs md:text-sm text-foreground/80">✓ Your email: {formData.email}</li>
              <li className="font-paragraph text-xs md:text-sm text-foreground/80">✓ Our team: contact@jmclex.com</li>
            </ul>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="bg-secondary rounded-lg p-6 md:p-8 lg:p-10">
          <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-8 md:mb-10 text-center">Executive Application Process</h3>
          
          <div className="space-y-4 md:space-y-6">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = step.status === 'completed';
              const isPending = step.status === 'pending';
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 md:gap-6"
                >
                  {/* Step Indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-heading text-sm md:text-base font-semibold transition-all ${
                      isCompleted 
                        ? 'bg-accent-gold text-secondary-foreground' 
                        : isPending 
                        ? 'bg-foreground/10 text-foreground/60' 
                        : 'bg-foreground/5 text-foreground/40'
                    }`}>
                      <StepIcon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className={`w-0.5 h-12 md:h-16 mt-2 ${
                        isCompleted ? 'bg-accent-gold' : 'bg-foreground/10'
                      }`}></div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1 md:pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-heading text-base md:text-lg text-foreground">{step.title}</h4>
                      {isCompleted && (
                        <span className="inline-block bg-accent-gold/20 text-accent-gold px-2 md:px-3 py-0.5 rounded text-xs font-medium">Completed</span>
                      )}
                      {isPending && (
                        <span className="inline-block bg-foreground/10 text-foreground/70 px-2 md:px-3 py-0.5 rounded text-xs font-medium">Pending</span>
                      )}
                    </div>
                    <p className="font-paragraph text-sm md:text-base text-foreground/70">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline Details */}
          <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-foreground/10 space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-background rounded-lg p-4 md:p-5 border border-accent-gold/20"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-sm md:text-base text-foreground mb-1">72-Hour Review</p>
                    <p className="font-paragraph text-xs md:text-sm text-foreground/70">Our executive team will carefully review your application and qualifications.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-background rounded-lg p-4 md:p-5 border border-accent-gold/20"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-sm md:text-base text-foreground mb-1">Confidential Consultation</p>
                    <p className="font-paragraph text-xs md:text-sm text-foreground/70">Schedule a private call to discuss your program preferences and objectives.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-background rounded-lg p-4 md:p-5 border border-accent-gold/20"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-sm md:text-base text-foreground mb-1">Approval & Enrollment</p>
                    <p className="font-paragraph text-xs md:text-sm text-foreground/70">Upon approval, we'll confirm your enrollment and program details.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-background rounded-lg p-4 md:p-5 border border-accent-gold/20"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-sm md:text-base text-foreground mb-1">Secure Payment</p>
                    <p className="font-paragraph text-xs md:text-sm text-foreground/70">Complete your enrollment with secure payment processing.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-foreground/10">
            <h4 className="font-heading text-lg md:text-xl text-foreground mb-4 md:mb-5">What Happens Next</h4>
            <ul className="space-y-2 md:space-y-3">
              {[
                'You will receive a confirmation email with your application reference number',
                'Our team will contact you within 72 hours to discuss your application',
                'We will schedule a confidential consultation call at your convenience',
                'Upon approval, you will receive enrollment confirmation and payment details',
                'After payment, you will receive program access and materials'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  className="flex items-start gap-3 md:gap-4"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm md:text-base text-foreground/80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8 md:space-y-10"
    >
      {/* Form Header */}
      <div className="bg-optional-navy rounded-lg p-6 md:p-8 lg:p-10">
        <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3 md:mb-4">Executive Application</h2>
        <p className="font-paragraph text-base md:text-lg text-foreground/80 mb-6 md:mb-8">
          Apply for {programName}
        </p>
        
        {/* Process Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {[
            { icon: '📋', label: 'Application' },
            { icon: '⏱️', label: '72-Hour Review' },
            { icon: '☎️', label: 'Consultation' },
            { icon: '✓', label: 'Approval' },
            { icon: '💳', label: 'Payment' }
          ].map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl mb-2">{step.icon}</div>
              <p className="font-paragraph text-xs md:text-sm text-foreground/80">{step.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="bg-optional-navy rounded-lg p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8">
        {/* Personal Information Section */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="Your country"
              />
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Professional Background</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Current Position *</label>
              <input
                type="text"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="e.g., General Counsel, CFO"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Industry *</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="e.g., Finance, Technology, Healthcare"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Years of Experience *</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Program & Language Section */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Program Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Selected Program</label>
              <input
                type="text"
                value={formData.selectedProgram}
                disabled
                className="w-full bg-background/50 text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 opacity-70 text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Preferred Language *</label>
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
              >
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Program Level *</label>
              <select
                name="preferredProgramLevel"
                value={formData.preferredProgramLevel}
                onChange={handleInputChange}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
              >
                <option value="Foundations">Foundations (Level 1)</option>
                <option value="Advanced Executive">Advanced Executive (Level 2)</option>
              </select>
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Session Format *</label>
              <select
                name="preferredSessionFormat"
                value={formData.preferredSessionFormat}
                onChange={handleInputChange}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
              >
                <option value="One-to-One">One-to-One (Confidential)</option>
                <option value="Small Group">Small Group (2-3 participants)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Objectives & Motivation Section */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Professional Objectives & Availability</h3>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Professional Objectives *</label>
              <textarea
                name="professionalObjectives"
                value={formData.professionalObjectives}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors resize-none text-sm md:text-base"
                placeholder="Describe your professional goals and what you hope to achieve from this program..."
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Strategic Motivation & Confidential Objectives *</label>
              <textarea
                name="strategicMotivation"
                value={formData.strategicMotivation}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors resize-none text-sm md:text-base"
                placeholder="Explain your strategic motivation and any confidential objectives for enrolling in this executive program..."
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Preferred Availability *</label>
              <textarea
                name="preferredAvailability"
                value={formData.preferredAvailability}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors resize-none text-sm md:text-base"
                placeholder="Indicate your preferred dates, times, and timezone for sessions..."
              />
            </div>
          </div>
        </div>

        {/* Document Upload Section */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Documents</h3>
          <p className="font-paragraph text-xs md:text-sm text-foreground/70 mb-6">
            Upload your professional documents. Supported formats: PDF, DOC, DOCX. Maximum file size: 10MB.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">CV Upload *</label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'cvUpload')}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="cv-upload"
                  required={!formData.cvUpload}
                />
                <label
                  htmlFor="cv-upload"
                  className="flex items-center justify-center gap-2 w-full bg-background border-2 border-dashed border-foreground/20 rounded px-3 md:px-4 py-4 md:py-6 cursor-pointer hover:border-accent-gold transition-colors"
                >
                  <Upload className="w-4 md:w-5 h-4 md:h-5 text-accent-gold flex-shrink-0" />
                  <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                    {formData.cvUpload ? 'CV Uploaded ✓' : 'Upload CV (PDF, DOC)'}
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground/80 mb-2">Supporting Documents <span className="text-foreground/50">(Optional)</span></label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'supportingDocuments')}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="docs-upload"
                />
                <label
                  htmlFor="docs-upload"
                  className="flex items-center justify-center gap-2 w-full bg-background border-2 border-dashed border-foreground/20 rounded px-3 md:px-4 py-4 md:py-6 cursor-pointer hover:border-accent-gold transition-colors"
                >
                  <Upload className="w-4 md:w-5 h-4 md:h-5 text-accent-gold flex-shrink-0" />
                  <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                    {formData.supportingDocuments ? 'Documents Uploaded ✓' : 'Upload Documents (Optional)'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-destructive/10 border border-destructive rounded-lg p-3 md:p-4"
          >
            <p className="font-paragraph text-xs md:text-sm text-destructive">{error}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 md:px-8 py-3 md:py-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
          {!isSubmitting && <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />}
        </motion.button>

        <p className="font-paragraph text-xs text-foreground/60 text-center">
          By submitting this application, you agree to our terms and conditions. Your information will be securely stored and treated with complete confidentiality.
        </p>
      </form>
    </motion.div>
  );
}
