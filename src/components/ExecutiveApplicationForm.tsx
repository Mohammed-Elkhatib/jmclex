import { useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ExecutiveTrainingApplications } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  currentPosition: string;
  country: string;
  selectedProgram: string;
  preferredLanguage: string;
  strategicMotivation: string;
  professionalObjectives: string;
  background: string;
  cvUpload: string;
  supportingDocuments: string;
}

export default function ExecutiveApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    currentPosition: '',
    country: '',
    selectedProgram: '',
    preferredLanguage: 'English',
    strategicMotivation: '',
    professionalObjectives: '',
    background: '',
    cvUpload: '',
    supportingDocuments: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Switzerland',
    'Belgium', 'Netherlands', 'Luxembourg', 'Austria', 'Spain', 'Italy', 'Portugal',
    'Greece', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria', 'Croatia',
    'Australia', 'New Zealand', 'Singapore', 'Hong Kong', 'Japan', 'South Korea',
    'China', 'India', 'United Arab Emirates', 'Saudi Arabia', 'South Africa', 'Brazil',
    'Mexico', 'Argentina', 'Chile', 'Colombia', 'Other'
  ];

  const programs = [
    'Advanced Corporate Law',
    'International Trade & Customs',
    'Tax Structuring & Planning',
    'Compliance & Governance',
    'Cross-Border Transactions',
    'Dispute Resolution',
    'Intellectual Property',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        [fieldName]: data.url
      }));
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage('Failed to upload file. Please try again.');
    } finally {
      setUploadingField(null);
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Full name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!formData.company.trim()) return 'Company is required';
    if (!formData.currentPosition.trim()) return 'Executive position is required';
    if (!formData.country) return 'Country is required';
    if (!formData.selectedProgram) return 'Selected program is required';
    if (!formData.strategicMotivation.trim()) return 'Strategic motivation is required';
    if (!formData.professionalObjectives.trim()) return 'Professional objectives are required';
    if (!formData.background.trim()) return 'Professional background is required';
    if (!formData.cvUpload) return 'CV upload is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const applicationData: ExecutiveTrainingApplications = {
        _id: crypto.randomUUID(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        currentPosition: formData.currentPosition,
        company: formData.company,
        industry: '', // Not in form but in entity
        yearsOfExperience: 0, // Not in form but in entity
        selectedProgram: formData.selectedProgram,
        preferredLanguage: formData.preferredLanguage,
        professionalObjectives: formData.professionalObjectives,
        strategicMotivation: formData.strategicMotivation,
        cvUpload: formData.cvUpload,
        supportingDocuments: formData.supportingDocuments,
        internalReviewStatus: 'Pending Review',
      };

      await BaseCrudService.create('executivetrainingapplications', applicationData);
      
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        currentPosition: '',
        country: '',
        selectedProgram: '',
        preferredLanguage: 'English',
        strategicMotivation: '',
        professionalObjectives: '',
        background: '',
        cvUpload: '',
        supportingDocuments: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Failed to submit application. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Success Message */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8 p-6 md:p-8 bg-accent-gold/10 border border-accent-gold rounded-lg flex items-start gap-4"
        >
          <CheckCircle className="w-6 h-6 text-accent-gold flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading text-lg text-foreground mb-2">Application Submitted Successfully</h3>
            <p className="font-paragraph text-sm text-foreground/80">
              Thank you for your application. Our team will review it within 72 hours and contact you to schedule a confidential consultation call.
            </p>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8 p-6 md:p-8 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-4"
        >
          <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading text-lg text-destructive mb-2">Application Error</h3>
            <p className="font-paragraph text-sm text-destructive/80">{errorMessage}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
        {/* Personal Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-secondary rounded-lg p-6 md:p-8 border border-accent-gold/20"
        >
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-6 md:mb-8">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Full Name *</label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Email Address *</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@company.com"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Phone Number *</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Country *</label>
              <Select value={formData.country} onValueChange={(value) => handleSelectChange('country', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Professional Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-secondary rounded-lg p-6 md:p-8 border border-accent-gold/20"
        >
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-6 md:mb-8">Professional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Company *</label>
              <Input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company name"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Executive Position/Title *</label>
              <Input
                type="text"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleInputChange}
                placeholder="e.g., General Counsel, CFO, Managing Director"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Selected Program *</label>
              <Select value={formData.selectedProgram} onValueChange={(value) => handleSelectChange('selectedProgram', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map(program => (
                    <SelectItem key={program} value={program}>{program}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Preferred Language *</label>
              <Select value={formData.preferredLanguage} onValueChange={(value) => handleSelectChange('preferredLanguage', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Strategic Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-secondary rounded-lg p-6 md:p-8 border border-accent-gold/20"
        >
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-6 md:mb-8">Strategic Information</h3>
          
          <div className="space-y-5 md:space-y-6">
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Professional Background *</label>
              <Textarea
                name="background"
                value={formData.background}
                onChange={handleInputChange}
                placeholder="Describe your professional background, experience, and key achievements..."
                className="w-full min-h-[120px]"
                required
              />
              <p className="font-paragraph text-xs text-foreground/60 mt-1">Minimum 50 characters recommended</p>
            </div>

            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Professional Objectives *</label>
              <Textarea
                name="professionalObjectives"
                value={formData.professionalObjectives}
                onChange={handleInputChange}
                placeholder="What are your professional objectives and what do you hope to achieve through this program?"
                className="w-full min-h-[120px]"
                required
              />
              <p className="font-paragraph text-xs text-foreground/60 mt-1">Minimum 50 characters recommended</p>
            </div>

            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-2">Strategic Motivation *</label>
              <Textarea
                name="strategicMotivation"
                value={formData.strategicMotivation}
                onChange={handleInputChange}
                placeholder="Explain your strategic motivation for applying to this executive training program..."
                className="w-full min-h-[120px]"
                required
              />
              <p className="font-paragraph text-xs text-foreground/60 mt-1">Minimum 50 characters recommended</p>
            </div>
          </div>
        </motion.div>

        {/* Document Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-secondary rounded-lg p-6 md:p-8 border border-accent-gold/20"
        >
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-6 md:mb-8">Document Upload</h3>
          
          <div className="space-y-5 md:space-y-6">
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-3">CV Upload *</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'cvUpload')}
                  disabled={uploadingField === 'cvUpload'}
                  className="hidden"
                  id="cv-upload"
                  required
                />
                <label
                  htmlFor="cv-upload"
                  className="flex items-center justify-center gap-3 w-full p-6 md:p-8 border-2 border-dashed border-accent-gold/40 rounded-lg cursor-pointer hover:border-accent-gold/60 transition-colors bg-background/50"
                >
                  <Upload className="w-5 h-5 text-accent-gold" />
                  <div className="text-center">
                    <p className="font-paragraph text-sm font-medium text-foreground">
                      {uploadingField === 'cvUpload' ? 'Uploading...' : formData.cvUpload ? 'CV Uploaded ✓' : 'Click to upload CV'}
                    </p>
                    <p className="font-paragraph text-xs text-foreground/60">PDF, DOC, or DOCX (Max 10MB)</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground mb-3">Supporting Documents (Optional)</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'supportingDocuments')}
                  disabled={uploadingField === 'supportingDocuments'}
                  className="hidden"
                  id="supporting-upload"
                />
                <label
                  htmlFor="supporting-upload"
                  className="flex items-center justify-center gap-3 w-full p-6 md:p-8 border-2 border-dashed border-accent-gold/40 rounded-lg cursor-pointer hover:border-accent-gold/60 transition-colors bg-background/50"
                >
                  <Upload className="w-5 h-5 text-accent-gold" />
                  <div className="text-center">
                    <p className="font-paragraph text-sm font-medium text-foreground">
                      {uploadingField === 'supportingDocuments' ? 'Uploading...' : formData.supportingDocuments ? 'Documents Uploaded ✓' : 'Click to upload documents'}
                    </p>
                    <p className="font-paragraph text-xs text-foreground/60">PDF, DOC, or DOCX (Max 10MB)</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6"
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-accent-gold text-secondary-foreground font-paragraph font-semibold py-3 md:py-4 rounded text-base md:text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
          </Button>
        </motion.div>

        {/* Form Note */}
        <div className="p-4 md:p-6 bg-accent-gold/5 border border-accent-gold/20 rounded-lg">
          <p className="font-paragraph text-xs md:text-sm text-foreground/80">
            <span className="font-semibold text-foreground">Note:</span> All fields marked with * are required. Your application will be reviewed within 72 hours, and you will be contacted to schedule a confidential consultation call.
          </p>
        </div>
      </form>
    </div>
  );
}
