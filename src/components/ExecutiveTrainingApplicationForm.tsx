import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ArrowRight, CheckCircle } from 'lucide-react';
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
    professionalObjectives: '',
    strategicMotivation: '',
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

      // Send email notification
      await fetch('/api/send-consultation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'contact@jmclex.com',
          subject: `New Executive Training Application - ${programName}`,
          applicantName: formData.fullName,
          applicantEmail: formData.email,
          program: programName,
          message: `New application received from ${formData.fullName} (${formData.email}) for ${programName}`
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
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-accent-gold/10 border border-accent-gold rounded-lg p-12 text-center"
      >
        <CheckCircle className="w-16 h-16 text-accent-gold mx-auto mb-6" />
        <h3 className="font-heading text-3xl text-foreground mb-4">Application Submitted Successfully</h3>
        <p className="font-paragraph text-lg text-foreground/80 mb-6">
          Thank you for your application to {programName}. Our team will review your submission and contact you shortly at {formData.email}.
        </p>
        <p className="font-paragraph text-base text-foreground/70">
          Expected response time: 3-5 business days
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-optional-navy rounded-lg p-12"
    >
      <h2 className="font-heading text-4xl text-foreground mb-2">Executive Application</h2>
      <p className="font-paragraph text-lg text-foreground/80 mb-8">
        Apply for {programName}
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div>
          <h3 className="font-heading text-2xl text-foreground mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors"
                placeholder="Your country"
              />
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div>
          <h3 className="font-heading text-2xl text-foreground mb-6">Professional Background</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Current Position *</label>
              <input
                type="text"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors"
                placeholder="e.g., General Counsel, CFO"
              />
            </div>
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Industry *</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors"
                placeholder="e.g., Finance, Technology, Healthcare"
              />
            </div>
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Years of Experience *</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Program & Language Section */}
        <div>
          <h3 className="font-heading text-2xl text-foreground mb-6">Program Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Selected Program</label>
              <input
                type="text"
                value={formData.selectedProgram}
                disabled
                className="w-full bg-background/50 text-foreground px-4 py-3 rounded border border-foreground/20 opacity-70"
              />
            </div>
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Preferred Language *</label>
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors"
              >
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
        </div>

        {/* Objectives & Motivation Section */}
        <div>
          <h3 className="font-heading text-2xl text-foreground mb-6">Professional Objectives</h3>
          <div className="space-y-6">
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Professional Objectives *</label>
              <textarea
                name="professionalObjectives"
                value={formData.professionalObjectives}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors resize-none"
                placeholder="Describe your professional goals and what you hope to achieve from this program..."
              />
            </div>
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Strategic Motivation *</label>
              <textarea
                name="strategicMotivation"
                value={formData.strategicMotivation}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-background text-foreground px-4 py-3 rounded border border-foreground/20 focus:border-accent-gold focus:outline-none transition-colors resize-none"
                placeholder="Explain your strategic motivation for enrolling in this executive program..."
              />
            </div>
          </div>
        </div>

        {/* Document Upload Section */}
        <div>
          <h3 className="font-heading text-2xl text-foreground mb-6">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">CV Upload *</label>
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
                  className="flex items-center justify-center gap-2 w-full bg-background border-2 border-dashed border-foreground/20 rounded px-4 py-6 cursor-pointer hover:border-accent-gold transition-colors"
                >
                  <Upload className="w-5 h-5 text-accent-gold" />
                  <span className="font-paragraph text-sm text-foreground/80">
                    {formData.cvUpload ? 'CV Uploaded ✓' : 'Upload CV (PDF, DOC)'}
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label className="block font-paragraph text-sm text-foreground/80 mb-2">Supporting Documents</label>
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
                  className="flex items-center justify-center gap-2 w-full bg-background border-2 border-dashed border-foreground/20 rounded px-4 py-6 cursor-pointer hover:border-accent-gold transition-colors"
                >
                  <Upload className="w-5 h-5 text-accent-gold" />
                  <span className="font-paragraph text-sm text-foreground/80">
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
            className="bg-destructive/10 border border-destructive rounded-lg p-4"
          >
            <p className="font-paragraph text-sm text-destructive">{error}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
          {!isSubmitting && <ArrowRight className="w-5 h-5" />}
        </motion.button>

        <p className="font-paragraph text-xs text-foreground/60 text-center">
          By submitting this application, you agree to our terms and conditions. Your information will be securely stored and used only for program enrollment purposes.
        </p>
      </form>
    </motion.div>
  );
}
