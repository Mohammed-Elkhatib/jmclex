import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface TalentNetworkApplicationFormProps {
  sourcePage: string;
}

interface FileUploadState {
  file: File | null;
  uploading: boolean;
  error: string;
}

interface FormDataType {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  languages: string;
  areaOfExpertise: string;
  linkedIn: string;
  website: string;
  professionalSummary: string;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  languages?: string;
  areaOfExpertise?: string;
  cvUpload?: string;
  professionalSummary?: string;
}

const INITIAL_FORM_DATA: FormDataType = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  languages: '',
  areaOfExpertise: '',
  linkedIn: '',
  website: '',
  professionalSummary: '',
};

const INITIAL_FILE_STATE: FileUploadState = {
  file: null,
  uploading: false,
  error: '',
};

export default function TalentNetworkApplicationForm({ sourcePage }: TalentNetworkApplicationFormProps) {
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
  const [files, setFiles] = useState({
    cvUpload: INITIAL_FILE_STATE,
    supportingDocuments: INITIAL_FILE_STATE,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const cvInputRef = useRef<HTMLInputElement>(null);
  const docsInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }, [validationErrors]);

  const validateFile = useCallback((file: File): string | null => {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only PDF and Word documents are allowed';
    }
    return null;
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {};

    // Validate required text fields
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!formData.country.trim()) {
      errors.country = 'Country is required';
    }

    if (!formData.languages.trim()) {
      errors.languages = 'Languages are required';
    }

    if (!formData.areaOfExpertise.trim()) {
      errors.areaOfExpertise = 'Area of expertise is required';
    }

    // CV upload is now OPTIONAL
    if (!formData.professionalSummary.trim()) {
      errors.professionalSummary = 'Professional summary is required';
    } else if (formData.professionalSummary.trim().length < 50) {
      errors.professionalSummary = 'Professional summary must be at least 50 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, fileType: 'cvUpload' | 'supportingDocuments') => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      setFiles(prev => ({
        ...prev,
        [fileType]: {
          file: error ? null : file,
          uploading: false,
          error: error || '',
        },
      }));
    }
  }, [validateFile]);

  const uploadFileToWix = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const data = await response.json();
    return data.fileUrl || data.url;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Validate form before submission
    if (!validateForm()) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('Please fix the errors above and try again.');
      return;
    }

    try {
      let cvUrl = '';
      let docsUrl = '';

      // Upload CV if provided
      if (files.cvUpload.file) {
        setFiles(prev => ({
          ...prev,
          cvUpload: { ...prev.cvUpload, uploading: true },
        }));
        try {
          cvUrl = await uploadFileToWix(files.cvUpload.file);
        } catch (error) {
          throw new Error(`CV upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Upload supporting documents if provided
      if (files.supportingDocuments.file) {
        setFiles(prev => ({
          ...prev,
          supportingDocuments: { ...prev.supportingDocuments, uploading: true },
        }));
        try {
          docsUrl = await uploadFileToWix(files.supportingDocuments.file);
        } catch (error) {
          throw new Error(`Supporting documents upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Create submission in CMS with correct field mappings
      const submission = {
        _id: crypto.randomUUID(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: formData.country.trim(),
        languages: formData.languages.trim(),
        areaOfExpertise: formData.areaOfExpertise.trim(),
        linkedIn: formData.linkedIn.trim() || undefined,
        website: formData.website.trim() || undefined,
        cvUpload: cvUrl || undefined,
        supportingDocuments: docsUrl || undefined,
        professionalSummary: formData.professionalSummary.trim(),
        submissionDate: new Date().toISOString(),
        sourcePage: sourcePage || 'talent-network',
        status: 'Pending Review',
        submissionType: 'Talent Network',
      };

      await BaseCrudService.create('talentnetworkapplications', submission);

      setSubmitStatus('success');
      setFormData(INITIAL_FORM_DATA);
      setFiles({
        cvUpload: INITIAL_FILE_STATE,
        supportingDocuments: INITIAL_FILE_STATE,
      });
      setValidationErrors({});

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
      // Reset uploading states on error
      setFiles(prev => ({
        cvUpload: { ...prev.cvUpload, uploading: false },
        supportingDocuments: { ...prev.supportingDocuments, uploading: false },
      }));
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
            className={`w-full px-4 py-3 border rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
              validationErrors.fullName ? 'border-destructive' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {validationErrors.fullName && (
            <p className="mt-1 text-destructive text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.fullName}
            </p>
          )}
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
            className={`w-full px-4 py-3 border rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
              validationErrors.email ? 'border-destructive' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {validationErrors.email && (
            <p className="mt-1 text-destructive text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.email}
            </p>
          )}
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
            className={`w-full px-4 py-3 border rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
              validationErrors.phone ? 'border-destructive' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 000-0000"
          />
          {validationErrors.phone && (
            <p className="mt-1 text-destructive text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.phone}
            </p>
          )}
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
            className={`w-full px-4 py-3 border rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
              validationErrors.country ? 'border-destructive' : 'border-gray-300'
            }`}
            placeholder="Country of residence or operation"
          />
          {validationErrors.country && (
            <p className="mt-1 text-destructive text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.country}
            </p>
          )}
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
            className={`w-full px-4 py-3 border rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
              validationErrors.languages ? 'border-destructive' : 'border-gray-300'
            }`}
            placeholder="e.g., English, French, Mandarin"
          />
          {validationErrors.languages && (
            <p className="mt-1 text-destructive text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.languages}
            </p>
          )}
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
            className={`w-full px-4 py-3 border rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
              validationErrors.areaOfExpertise ? 'border-destructive' : 'border-gray-300'
            }`}
            placeholder="Your primary area of professional expertise"
          />
          {validationErrors.areaOfExpertise && (
            <p className="mt-1 text-destructive text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.areaOfExpertise}
            </p>
          )}
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
          <label htmlFor="cvUpload" className="block font-heading text-sm text-foreground mb-3">
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
              disabled={files.cvUpload.uploading || isSubmitting}
              className="hidden"
            />
            <motion.button
              type="button"
              onClick={() => cvInputRef.current?.click()}
              disabled={files.cvUpload.uploading || isSubmitting}
              whileHover={{ scale: files.cvUpload.uploading ? 1 : 1.01 }}
              className={`w-full px-4 py-4 border-2 border-dashed rounded-lg font-paragraph text-base transition-all ${
                files.cvUpload.file
                  ? 'border-accent-gold bg-accent-gold/5 text-foreground'
                  : validationErrors.cvUpload
                  ? 'border-destructive bg-destructive/5 text-foreground'
                  : 'border-accent-gold/30 text-foreground/60 hover:border-accent-gold hover:bg-accent-gold/5'
              } ${files.cvUpload.uploading || isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-center gap-3">
                {files.cvUpload.uploading ? (
                  <>
                    <LoadingSpinner />
                    <span>Uploading CV...</span>
                  </>
                ) : files.cvUpload.file ? (
                  <>
                    <FileText className="w-5 h-5 text-accent-gold" />
                    <span className="truncate">{files.cvUpload.file.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Click to upload CV (PDF, DOC, DOCX)</span>
                  </>
                )}
              </div>
            </motion.button>
            {files.cvUpload.error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 text-destructive text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{files.cvUpload.error}</span>
              </motion.div>
            )}
            {validationErrors.cvUpload && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 text-destructive text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{validationErrors.cvUpload}</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Supporting Documents */}
        <div>
          <label htmlFor="supportingDocuments" className="block font-heading text-sm text-foreground mb-3">
            Supporting Documents
          </label>
          <div className="relative">
            <input
              type="file"
              id="supportingDocuments"
              ref={docsInputRef}
              onChange={(e) => handleFileChange(e, 'supportingDocuments')}
              accept=".pdf,.doc,.docx"
              disabled={files.supportingDocuments.uploading || isSubmitting}
              className="hidden"
            />
            <motion.button
              type="button"
              onClick={() => docsInputRef.current?.click()}
              disabled={files.supportingDocuments.uploading || isSubmitting}
              whileHover={{ scale: files.supportingDocuments.uploading ? 1 : 1.01 }}
              className={`w-full px-4 py-4 border-2 border-dashed rounded-lg font-paragraph text-base transition-all ${
                files.supportingDocuments.file
                  ? 'border-accent-gold bg-accent-gold/5 text-foreground'
                  : 'border-gray-300 text-foreground/60 hover:border-accent-gold/30 hover:bg-gray-50'
              } ${files.supportingDocuments.uploading || isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-center gap-3">
                {files.supportingDocuments.uploading ? (
                  <>
                    <LoadingSpinner />
                    <span>Uploading documents...</span>
                  </>
                ) : files.supportingDocuments.file ? (
                  <>
                    <FileText className="w-5 h-5 text-accent-gold" />
                    <span className="truncate">{files.supportingDocuments.file.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Click to upload additional documents (optional)</span>
                  </>
                )}
              </div>
            </motion.button>
            {files.supportingDocuments.error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 text-destructive text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{files.supportingDocuments.error}</span>
              </motion.div>
            )}
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
            className={`w-full px-4 py-3 border rounded-lg font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent resize-none ${
              validationErrors.professionalSummary ? 'border-destructive' : 'border-gray-300'
            }`}
            placeholder="Tell us about your professional background, experience, and why you're interested in joining our talent network..."
          />
          {validationErrors.professionalSummary && (
            <p className="mt-1 text-destructive text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.professionalSummary}
            </p>
          )}
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
