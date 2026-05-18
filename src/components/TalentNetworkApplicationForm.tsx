import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface TalentNetworkApplicationFormProps {
  sourcePage: string;
}

export default function TalentNetworkApplicationForm({ sourcePage }: TalentNetworkApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    languages: '',
    areaOfExpertise: '',
    linkedIn: '',
    website: '',
    professionalSummary: '',
  });

  const [files, setFiles] = useState({
    cvUpload: null as File | null,
    supportingDocuments: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const cvInputRef = useRef<HTMLInputElement>(null);
  const docsInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'cvUpload' | 'supportingDocuments') => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [fileType]: file,
      }));
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    // Create a data URL for the file (for demonstration)
    // In production, this would integrate with Wix's file upload service
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Return file name with timestamp as reference
        resolve(`${file.name}-${Date.now()}`);
      };
      reader.onerror = () => {
        reject(new Error('File read failed'));
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let cvUrl = '';
      let docsUrl = '';

      // Upload CV if provided
      if (files.cvUpload) {
        cvUrl = await uploadFile(files.cvUpload);
      }

      // Upload supporting documents if provided
      if (files.supportingDocuments) {
        docsUrl = await uploadFile(files.supportingDocuments);
      }

      // Create submission in CMS
      const submission = {
        _id: crypto.randomUUID(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        languages: formData.languages,
        areaOfExpertise: formData.areaOfExpertise,
        linkedIn: formData.linkedIn || undefined,
        website: formData.website || undefined,
        cvUpload: cvUrl || undefined,
        supportingDocuments: docsUrl || undefined,
        professionalSummary: formData.professionalSummary,
        submissionDate: new Date(),
        sourcePage: sourcePage,
        status: 'New',
        submissionType: 'Talent Network',
      };

      await BaseCrudService.create('talentnetworkapplications', submission);

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        languages: '',
        areaOfExpertise: '',
        linkedIn: '',
        website: '',
        professionalSummary: '',
      });
      setFiles({
        cvUpload: null,
        supportingDocuments: null,
      });

      // Reset file inputs
      if (cvInputRef.current) cvInputRef.current.value = '';
      if (docsInputRef.current) docsInputRef.current.value = '';

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred while submitting your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent-gold/10 border border-accent-gold rounded-lg p-6"
          >
            <h3 className="font-heading text-lg text-accent-gold mb-2">Application Received</h3>
            <p className="font-paragraph text-sm text-foreground">
              Thank you for your interest in joining our talent network. We have received your application and will review it carefully. Our team will contact you within 5-7 business days.
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/10 border border-destructive rounded-lg p-6"
          >
            <h3 className="font-heading text-lg text-destructive mb-2">Submission Error</h3>
            <p className="font-paragraph text-sm text-foreground">{errorMessage}</p>
          </motion.div>
        )}

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block font-heading text-sm text-foreground mb-2">
            Full Name <span className="text-accent-gold">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-heading text-sm text-foreground mb-2">
            Email Address <span className="text-accent-gold">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-heading text-sm text-foreground mb-2">
            Phone Number <span className="text-accent-gold">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block font-heading text-sm text-foreground mb-2">
            Country <span className="text-accent-gold">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
            placeholder="Country of residence or operation"
          />
        </div>

        {/* Languages */}
        <div>
          <label htmlFor="languages" className="block font-heading text-sm text-foreground mb-2">
            Languages <span className="text-accent-gold">*</span>
          </label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
            placeholder="e.g., English, French, Mandarin"
          />
        </div>

        {/* Area of Expertise */}
        <div>
          <label htmlFor="areaOfExpertise" className="block font-heading text-sm text-foreground mb-2">
            Area of Expertise <span className="text-accent-gold">*</span>
          </label>
          <input
            type="text"
            id="areaOfExpertise"
            name="areaOfExpertise"
            value={formData.areaOfExpertise}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
            placeholder="Your primary area of professional expertise"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="linkedIn" className="block font-heading text-sm text-foreground mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedIn"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block font-heading text-sm text-foreground mb-2">
            Personal or Company Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
            placeholder="https://yourwebsite.com"
          />
        </div>

        {/* CV Upload */}
        <div>
          <label htmlFor="cvUpload" className="block font-heading text-sm text-foreground mb-2">
            Curriculum Vitae (CV) <span className="text-accent-gold">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              id="cvUpload"
              ref={cvInputRef}
              onChange={(e) => handleFileChange(e, 'cvUpload')}
              accept=".pdf,.doc,.docx"
              required
              className="hidden"
            />
            <button
              type="button"
              onClick={() => cvInputRef.current?.click()}
              className="w-full px-4 py-3 border-2 border-dashed border-accent-gold rounded-lg font-paragraph text-base text-foreground hover:bg-accent-gold/5 transition-colors"
            >
              {files.cvUpload ? `✓ ${files.cvUpload.name}` : 'Click to upload CV (PDF, DOC, DOCX)'}
            </button>
          </div>
        </div>

        {/* Supporting Documents */}
        <div>
          <label htmlFor="supportingDocuments" className="block font-heading text-sm text-foreground mb-2">
            Supporting Documents
          </label>
          <div className="relative">
            <input
              type="file"
              id="supportingDocuments"
              ref={docsInputRef}
              onChange={(e) => handleFileChange(e, 'supportingDocuments')}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => docsInputRef.current?.click()}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg font-paragraph text-base text-foreground hover:bg-gray-50 transition-colors"
            >
              {files.supportingDocuments ? `✓ ${files.supportingDocuments.name}` : 'Click to upload additional documents (optional)'}
            </button>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <label htmlFor="professionalSummary" className="block font-heading text-sm text-foreground mb-2">
            Professional Summary <span className="text-accent-gold">*</span>
          </label>
          <textarea
            id="professionalSummary"
            name="professionalSummary"
            value={formData.professionalSummary}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent resize-none"
            placeholder="Tell us about your professional background, experience, and why you're interested in joining our talent network..."
          />
        </div>

        {/* Disclaimer */}
        <div className="bg-secondary/50 rounded-lg p-4">
          <p className="font-paragraph text-xs text-foreground/70">
            By submitting this application, you acknowledge that the information provided is accurate and complete. Your submission will be reviewed by our team and you may be contacted for further discussion regarding collaboration opportunities.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-accent-gold text-foreground font-heading text-base rounded-lg hover:bg-accent-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </motion.div>
  );
}
