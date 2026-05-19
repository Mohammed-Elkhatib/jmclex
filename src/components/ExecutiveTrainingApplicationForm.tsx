import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, ArrowRight, CheckCircle, Clock, Phone, Award, CreditCard, AlertCircle, Loader, X, FileText } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { useLanguageStore } from '@/lib/language-store';

interface ExecutiveTrainingApplicationFormProps {
  programName: string;
  onSuccess?: () => void;
}

interface UploadState {
  cvUpload: {
    url: string;
    fileName: string;
    isUploading: boolean;
    error: string | null;
    progress: number;
  };
  supportingDocuments: {
    url: string;
    fileName: string;
    isUploading: boolean;
    error: string | null;
    progress: number;
  };
}

export default function ExecutiveTrainingApplicationForm({ programName, onSuccess }: ExecutiveTrainingApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState<any>(null);
  const { language } = useLanguageStore();
  
  const cvInputRef = useRef<HTMLInputElement>(null);
  const docsInputRef = useRef<HTMLInputElement>(null);

  const [uploadState, setUploadState] = useState<UploadState>({
    cvUpload: { url: '', fileName: '', isUploading: false, error: null, progress: 0 },
    supportingDocuments: { url: '', fileName: '', isUploading: false, error: null, progress: 0 }
  });

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

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Validate file type - check both MIME type and extension
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-word.document.macroEnabled.12'
    ];
    
    const fileName = file.name.toLowerCase();
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    // Check MIME type OR extension (for mobile compatibility)
    if (!allowedMimeTypes.includes(file.type) && !hasValidExtension) {
      return { 
        valid: false, 
        error: `Invalid file type. Only PDF and Word documents are allowed.` 
      };
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return { 
        valid: false, 
        error: `File size must be less than 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.` 
      };
    }

    return { valid: true };
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'cvUpload' | 'supportingDocuments') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear previous errors for this field
    setUploadState(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], error: null }
    }));

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setUploadState(prev => ({
        ...prev,
        [fieldName]: { ...prev[fieldName], error: validation.error || 'Invalid file' }
      }));
      setError(validation.error || 'File validation failed');
      return;
    }

    // Set uploading state
    setUploadState(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], isUploading: true, progress: 0 }
    }));

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('file', file);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          [fieldName]: { 
            ...prev[fieldName], 
            progress: Math.min(prev[fieldName].progress + Math.random() * 30, 90) 
          }
        }));
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataForUpload
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Upload failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.fileUrl) {
        throw new Error('No file URL returned from server');
      }

      // Update form data with file URL
      setFormData(prev => ({
        ...prev,
        [fieldName]: data.fileUrl
      }));

      // Update upload state with success
      setUploadState(prev => ({
        ...prev,
        [fieldName]: {
          url: data.fileUrl,
          fileName: file.name,
          isUploading: false,
          error: null,
          progress: 100
        }
      }));

      // Clear error message
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'File upload failed. Please try again.';
      
      setUploadState(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          isUploading: false,
          error: errorMessage,
          progress: 0
        }
      }));

      setError(`Upload error for ${fieldName === 'cvUpload' ? 'CV' : 'supporting documents'}: ${errorMessage}`);
      console.error('Upload error:', err);
    }
  };

  const removeFile = (fieldName: 'cvUpload' | 'supportingDocuments') => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: ''
    }));

    setUploadState(prev => ({
      ...prev,
      [fieldName]: {
        url: '',
        fileName: '',
        isUploading: false,
        error: null,
        progress: 0
      }
    }));

    // Reset file input
    if (fieldName === 'cvUpload' && cvInputRef.current) {
      cvInputRef.current.value = '';
    } else if (fieldName === 'supportingDocuments' && docsInputRef.current) {
      docsInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSubmissionError(null);

    try {
      // Validate required fields (CV is now OPTIONAL)
      if (!formData.fullName || !formData.email || !formData.phone || !formData.country) {
        setSubmissionError('Please fill in all required personal information fields.');
        setIsSubmitting(false);
        return;
      }

      if (!formData.currentPosition || !formData.company || !formData.industry || !formData.yearsOfExperience) {
        setSubmissionError('Please fill in all required professional background fields.');
        setIsSubmitting(false);
        return;
      }

      if (!formData.professionalObjectives || !formData.strategicMotivation || !formData.preferredAvailability) {
        setSubmissionError('Please fill in all required objectives and availability fields.');
        setIsSubmitting(false);
        return;
      }

      const newApplicationData = {
        _id: crypto.randomUUID(),
        ...formData,
        yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
        _createdDate: new Date(),
        _updatedDate: new Date()
      };
      
      setApplicationData(newApplicationData);

      // Step 1: Save to CMS - with retry logic for mobile reliability
      let cmsSuccess = false;
      let retryCount = 0;
      const maxRetries = 3;

      while (!cmsSuccess && retryCount < maxRetries) {
        try {
          await BaseCrudService.create('executivetrainingapplications', newApplicationData);
          cmsSuccess = true;
        } catch (cmsError) {
          retryCount++;
          if (retryCount >= maxRetries) {
            const cmsErrorMsg = cmsError instanceof Error ? cmsError.message : 'CMS storage failed';
            setSubmissionError(`Failed to save application to database after ${maxRetries} attempts: ${cmsErrorMsg}`);
            console.error('CMS error after retries:', cmsError);
            setIsSubmitting(false);
            return;
          }
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }

      // Step 2: Send confirmation email to applicant (non-blocking)
      fetch('/api/send-consultation-email', {
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
      }).catch(err => console.warn('Applicant email error:', err));

      // Step 3: Send notification email to admin (non-blocking)
      fetch('/api/send-consultation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'contact@jmclex.com',
          subject: `New Executive Training Application - ${programName}`,
          applicantName: formData.fullName,
          applicantEmail: formData.email,
          program: programName,
          message: `New Executive Training Application received:\n\nApplicant: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProgram: ${programName}\nLevel: ${formData.preferredProgramLevel}\nSession Format: ${formData.preferredSessionFormat}\nPreferred Language: ${formData.preferredLanguage}\nCV: ${formData.cvUpload}\nSupporting Documents: ${formData.supportingDocuments || 'None'}\n\nPlease review and follow up accordingly.`
        })
      }).catch(err => console.warn('Admin email error:', err));

      // Success - show confirmation
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

      setUploadState({
        cvUpload: { url: '', fileName: '', isUploading: false, error: null, progress: 0 },
        supportingDocuments: { url: '', fileName: '', isUploading: false, error: null, progress: 0 }
      });

      if (onSuccess) onSuccess();

      // Keep success screen visible longer for better UX
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to submit application';
      setSubmissionError(`Submission failed: ${errorMsg}`);
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
        transition={{ duration: 0.5 }}
        className="space-y-8 md:space-y-10"
      >
        {/* Premium Success Modal */}
        <div className="relative bg-gradient-to-br from-accent-gold/5 via-background to-accent-gold/5 border border-accent-gold/30 rounded-2xl p-8 md:p-12 lg:p-16 text-center overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-gold/10 rounded-full blur-2xl -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center mb-6 md:mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-xl"></div>
                <CheckCircle className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 text-accent-gold relative" />
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 md:mb-4">
                Application Submitted Successfully
              </h3>
              <p className="font-paragraph text-base md:text-lg text-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto">
                Thank you for your application to <span className="font-semibold text-foreground">{programName}</span>. Your submission has been received and will be reviewed by our executive team within 72 hours.
              </p>
            </motion.div>

            {/* Confirmation Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-background/60 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-8 md:mb-10 border border-accent-gold/20 max-w-xl mx-auto"
            >
              <p className="font-paragraph text-xs md:text-sm text-foreground/70 mb-4">
                <span className="font-semibold text-foreground">Confirmation emails have been sent to:</span>
              </p>
              <ul className="space-y-2 md:space-y-3 text-left">
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-center gap-3 font-paragraph text-xs md:text-sm text-foreground/80"
                >
                  <CheckCircle className="w-4 h-4 text-accent-gold flex-shrink-0" />
                  <span>{formData.email}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-center gap-3 font-paragraph text-xs md:text-sm text-foreground/80"
                >
                  <CheckCircle className="w-4 h-4 text-accent-gold flex-shrink-0" />
                  <span>contact@jmclex.com</span>
                </motion.li>
              </ul>
            </motion.div>

            {/* Reference Number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mb-8 md:mb-10"
            >
              <p className="font-paragraph text-xs md:text-sm text-foreground/60 mb-2">Application Reference</p>
              <p className="font-heading text-sm md:text-base text-accent-gold font-mono tracking-wider">
                {applicationData?._id?.substring(0, 12).toUpperCase() || 'EXEC-APP-2024'}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-secondary rounded-lg p-6 md:p-8 lg:p-10 border border-accent-gold/20"
        >
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
        </motion.div>
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
      <div className="bg-secondary rounded-lg p-6 md:p-8 lg:p-10 border border-accent-gold/20">
        <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3 md:mb-4">Executive Application</h2>
        <p className="font-paragraph text-base md:text-lg text-foreground/80 mb-6 md:mb-8">
          Apply for {programName}
        </p>
        
        {/* Process Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {[
            { icon: '01', label: 'Application' },
            { icon: '02', label: '72-Hour Review' },
            { icon: '03', label: 'Consultation' },
            { icon: '04', label: 'Approval' },
            { icon: '05', label: 'Payment' }
          ].map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-lg md:text-xl text-accent-gold mb-2 font-semibold">{step.icon}</div>
              <p className="font-paragraph text-xs md:text-sm text-foreground/80">{step.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="bg-background rounded-lg p-6 md:p-8 lg:p-10 border border-accent-gold/20 space-y-6 md:space-y-8">
        {/* Personal Information Section */}
        <div className="bg-secondary rounded-lg p-5 md:p-6 border border-accent-gold/10">
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="Your country"
              />
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="bg-secondary rounded-lg p-5 md:p-6 border border-accent-gold/10">
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Professional Background</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Current Position *</label>
              <input
                type="text"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="e.g., General Counsel, CFO"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Industry *</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="e.g., Finance, Technology, Healthcare"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Years of Experience *</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Program & Language Section */}
        <div className="bg-secondary rounded-lg p-5 md:p-6 border border-accent-gold/10">
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Program Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Selected Program</label>
              <input
                type="text"
                value={formData.selectedProgram}
                disabled
                className="w-full bg-background/50 text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 opacity-70 text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Preferred Language *</label>
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
              >
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Program Level *</label>
              <select
                name="preferredProgramLevel"
                value={formData.preferredProgramLevel}
                onChange={handleInputChange}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
              >
                <option value="Foundations">Foundations (Level 1)</option>
                <option value="Advanced Executive">Advanced Executive (Level 2)</option>
              </select>
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Session Format *</label>
              <select
                name="preferredSessionFormat"
                value={formData.preferredSessionFormat}
                onChange={handleInputChange}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors text-sm md:text-base"
              >
                <option value="One-to-One">One-to-One (Confidential)</option>
                <option value="Small Group">Small Group (2-3 participants)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Objectives & Motivation Section */}
        <div className="bg-secondary rounded-lg p-5 md:p-6 border border-accent-gold/10">
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Professional Objectives & Availability</h3>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Professional Objectives *</label>
              <textarea
                name="professionalObjectives"
                value={formData.professionalObjectives}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors resize-none text-sm md:text-base"
                placeholder="Describe your professional goals and what you hope to achieve from this program..."
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Strategic Motivation & Confidential Objectives *</label>
              <textarea
                name="strategicMotivation"
                value={formData.strategicMotivation}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors resize-none text-sm md:text-base"
                placeholder="Explain your strategic motivation and any confidential objectives for enrolling in this executive program..."
              />
            </div>
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Preferred Availability *</label>
              <textarea
                name="preferredAvailability"
                value={formData.preferredAvailability}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full bg-background text-foreground px-3 md:px-4 py-2 md:py-3 rounded border border-accent-gold/20 focus:border-accent-gold focus:outline-none transition-colors resize-none text-sm md:text-base"
                placeholder="Indicate your preferred dates, times, and timezone for sessions..."
              />
            </div>
          </div>
        </div>

        {/* Document Upload Section */}
        <div className="bg-secondary rounded-lg p-5 md:p-6 border border-accent-gold/10">
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 md:mb-6">Documents</h3>
          <p className="font-paragraph text-xs md:text-sm text-foreground/70 mb-6">
            Upload your professional documents. Supported formats: PDF, DOC, DOCX. Maximum file size: 10MB.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* CV Upload */}
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">CV Upload *</label>
              <div className="space-y-2">
                <div className="relative">
                  <input
                    ref={cvInputRef}
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'cvUpload')}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="cv-upload"
                    disabled={uploadState.cvUpload.isUploading}
                  />
                  <label
                    htmlFor="cv-upload"
                    className={`flex items-center justify-center gap-2 w-full border-2 border-dashed rounded px-3 md:px-4 py-4 md:py-6 cursor-pointer transition-all ${
                      uploadState.cvUpload.isUploading
                        ? 'bg-foreground/5 border-accent-gold/20 cursor-not-allowed'
                        : uploadState.cvUpload.error
                        ? 'bg-destructive/5 border-destructive'
                        : uploadState.cvUpload.url
                        ? 'bg-accent-gold/5 border-accent-gold'
                        : 'bg-background border-accent-gold/30 hover:border-accent-gold'
                    }`}
                  >
                    {uploadState.cvUpload.isUploading ? (
                      <>
                        <Loader className="w-4 md:w-5 h-4 md:h-5 text-accent-gold animate-spin flex-shrink-0" />
                        <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                          Uploading... {Math.round(uploadState.cvUpload.progress)}%
                        </span>
                      </>
                    ) : uploadState.cvUpload.url ? (
                      <>
                        <FileText className="w-4 md:w-5 h-4 md:h-5 text-accent-gold flex-shrink-0" />
                        <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                          {uploadState.cvUpload.fileName}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 md:w-5 h-4 md:h-5 text-accent-gold flex-shrink-0" />
                        <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                          Click to upload CV (PDF, DOC, DOCX)
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Upload Progress Bar */}
                {uploadState.cvUpload.isUploading && uploadState.cvUpload.progress > 0 && (
                  <div className="w-full bg-foreground/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadState.cvUpload.progress}%` }}
                      className="h-full bg-accent-gold"
                    />
                  </div>
                )}

                {/* File Attached Indicator */}
                {uploadState.cvUpload.url && !uploadState.cvUpload.isUploading && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-accent-gold/10 border border-accent-gold/30 rounded px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent-gold flex-shrink-0" />
                      <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                        ✓ {uploadState.cvUpload.fileName} attached
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile('cvUpload')}
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Upload Error */}
                {uploadState.cvUpload.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded px-3 py-2"
                  >
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-xs text-destructive">{uploadState.cvUpload.error}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Supporting Documents Upload */}
            <div>
              <label className="block font-paragraph text-xs md:text-sm text-foreground font-medium mb-2">Supporting Documents <span className="text-foreground/50">(Optional)</span></label>
              <div className="space-y-2">
                <div className="relative">
                  <input
                    ref={docsInputRef}
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'supportingDocuments')}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="docs-upload"
                    disabled={uploadState.supportingDocuments.isUploading}
                  />
                  <label
                    htmlFor="docs-upload"
                    className={`flex items-center justify-center gap-2 w-full border-2 border-dashed rounded px-3 md:px-4 py-4 md:py-6 cursor-pointer transition-all ${
                      uploadState.supportingDocuments.isUploading
                        ? 'bg-foreground/5 border-accent-gold/20 cursor-not-allowed'
                        : uploadState.supportingDocuments.error
                        ? 'bg-destructive/5 border-destructive'
                        : uploadState.supportingDocuments.url
                        ? 'bg-accent-gold/5 border-accent-gold'
                        : 'bg-background border-accent-gold/30 hover:border-accent-gold'
                    }`}
                  >
                    {uploadState.supportingDocuments.isUploading ? (
                      <>
                        <Loader className="w-4 md:w-5 h-4 md:h-5 text-accent-gold animate-spin flex-shrink-0" />
                        <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                          Uploading... {Math.round(uploadState.supportingDocuments.progress)}%
                        </span>
                      </>
                    ) : uploadState.supportingDocuments.url ? (
                      <>
                        <FileText className="w-4 md:w-5 h-4 md:h-5 text-accent-gold flex-shrink-0" />
                        <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                          {uploadState.supportingDocuments.fileName}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 md:w-5 h-4 md:h-5 text-accent-gold flex-shrink-0" />
                        <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                          Click to upload documents (Optional)
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Upload Progress Bar */}
                {uploadState.supportingDocuments.isUploading && uploadState.supportingDocuments.progress > 0 && (
                  <div className="w-full bg-foreground/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadState.supportingDocuments.progress}%` }}
                      className="h-full bg-accent-gold"
                    />
                  </div>
                )}

                {/* File Attached Indicator */}
                {uploadState.supportingDocuments.url && !uploadState.supportingDocuments.isUploading && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-accent-gold/10 border border-accent-gold/30 rounded px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent-gold flex-shrink-0" />
                      <span className="font-paragraph text-xs md:text-sm text-foreground/80">
                        ✓ {uploadState.supportingDocuments.fileName} attached
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile('supportingDocuments')}
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Upload Error */}
                {uploadState.supportingDocuments.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded px-3 py-2"
                  >
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="font-paragraph text-xs text-destructive">{uploadState.supportingDocuments.error}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* General Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-destructive/10 border border-destructive rounded-lg p-3 md:p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-xs md:text-sm text-destructive">{error}</p>
          </motion.div>
        )}

        {/* Submission Error Message */}
        {submissionError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-destructive/10 border border-destructive rounded-lg p-3 md:p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-xs md:text-sm text-destructive">{submissionError}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || uploadState.cvUpload.isUploading || uploadState.supportingDocuments.isUploading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 md:px-8 py-3 md:py-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-4 md:w-5 h-4 md:h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
            </>
          )}
        </motion.button>

        <p className="font-paragraph text-xs text-foreground/60 text-center">
          By submitting this application, you agree to our terms and conditions. Your information will be securely stored and treated with complete confidentiality.
        </p>
      </form>
    </motion.div>
  );
}
