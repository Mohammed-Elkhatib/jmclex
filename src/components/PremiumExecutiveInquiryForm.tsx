import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';

interface FormData {
  fullName: string;
  company: string;
  country: string;
  email: string;
  industry: string;
  requestedContract: string;
  typeOfAssistance: string;
  message: string;
}

const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Energy',
  'Real Estate',
  'Telecommunications',
  'Retail',
  'Automotive',
  'Pharmaceuticals',
  'Other'
];

const ASSISTANCE_TYPES = [
  'Contract Review & Analysis',
  'Legal Advisory',
  'Compliance & Governance',
  'Tax Structuring',
  'Cross-Border Expertise',
  'Strategic Consultation',
  'Other'
];

export default function PremiumExecutiveInquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    company: '',
    country: '',
    email: '',
    industry: '',
    requestedContract: '',
    typeOfAssistance: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await BaseCrudService.create('contactinquiries', {
        _id: crypto.randomUUID(),
        name: formData.fullName,
        email: formData.email,
        phone: '',
        subject: `Executive Inquiry - ${formData.company}`,
        message: `
Company: ${formData.company}
Country: ${formData.country}
Industry: ${formData.industry}
Requested Contract/Framework: ${formData.requestedContract}
Type of Assistance: ${formData.typeOfAssistance}

Message:
${formData.message}
        `.trim()
      });

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        company: '',
        country: '',
        email: '',
        industry: '',
        requestedContract: '',
        typeOfAssistance: '',
        message: ''
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h2 className="font-heading text-4xl font-bold text-primary mb-3">Executive Inquiry</h2>
        <p className="font-paragraph text-lg text-text-muted">
          Connect with our strategic advisory team for premium legal solutions.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8 mb-8">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="font-paragraph text-sm font-medium text-primary">
            Full Name <span className="text-accent-gold">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Your full name"
            required
            className="border-border-subtle focus:border-accent-gold focus:ring-1 focus:ring-accent-gold"
          />
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company" className="font-paragraph text-sm font-medium text-primary">
            Company <span className="text-accent-gold">*</span>
          </Label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Your organization"
            required
            className="border-border-subtle focus:border-accent-gold focus:ring-1 focus:ring-accent-gold"
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country" className="font-paragraph text-sm font-medium text-primary">
            Country <span className="text-accent-gold">*</span>
          </Label>
          <Input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Your country"
            required
            className="border-border-subtle focus:border-accent-gold focus:ring-1 focus:ring-accent-gold"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-paragraph text-sm font-medium text-primary">
            Email <span className="text-accent-gold">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@company.com"
            required
            className="border-border-subtle focus:border-accent-gold focus:ring-1 focus:ring-accent-gold"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label htmlFor="industry" className="font-paragraph text-sm font-medium text-primary">
            Industry <span className="text-accent-gold">*</span>
          </Label>
          <Select value={formData.industry} onValueChange={(value) => handleSelectChange('industry', value)}>
            <SelectTrigger className="border-border-subtle focus:border-accent-gold focus:ring-1 focus:ring-accent-gold">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Requested Contract / Framework */}
        <div className="space-y-2">
          <Label htmlFor="requestedContract" className="font-paragraph text-sm font-medium text-primary">
            Requested Contract / Framework <span className="text-accent-gold">*</span>
          </Label>
          <Input
            id="requestedContract"
            name="requestedContract"
            type="text"
            value={formData.requestedContract}
            onChange={handleInputChange}
            placeholder="e.g., Service Agreement, NDA, Supply Contract"
            required
            className="border-border-subtle focus:border-accent-gold focus:ring-1 focus:ring-accent-gold"
          />
        </div>

        {/* Type of Assistance Needed */}
        <div className="space-y-2">
          <Label htmlFor="typeOfAssistance" className="font-paragraph text-sm font-medium text-primary">
            Type of Assistance Needed <span className="text-accent-gold">*</span>
          </Label>
          <Select value={formData.typeOfAssistance} onValueChange={(value) => handleSelectChange('typeOfAssistance', value)}>
            <SelectTrigger className="border-border-subtle focus:border-accent-gold focus:ring-1 focus:ring-accent-gold">
              <SelectValue placeholder="Select type of assistance" />
            </SelectTrigger>
            <SelectContent>
              {ASSISTANCE_TYPES.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="font-paragraph text-sm font-medium text-primary">
            Message <span className="text-accent-gold">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Describe your inquiry in detail..."
            required
            rows={6}
            className="border-border-subtle focus:border-accent-gold focus:ring-1 focus:ring-accent-gold resize-none"
          />
        </div>

        {/* Confidentiality Notice */}
        <div className="bg-secondary border border-border-subtle rounded-lg p-6 my-8">
          <p className="font-paragraph text-sm text-primary text-center italic">
            "All strategic exchanges remain strictly confidential."
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary hover:bg-primary-foreground text-white font-paragraph font-medium py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </Button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-paragraph text-sm text-green-800">
              Thank you for your inquiry. Our team will review your request and contact you shortly.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-paragraph text-sm text-red-800">
              There was an error submitting your form. Please try again.
            </p>
          </div>
        )}
      </form>

      {/* Footer Note */}
      <div className="border-t border-border-subtle pt-6">
        <p className="font-paragraph text-xs text-text-muted text-center">
          Your information is secure and will only be used to respond to your inquiry.
        </p>
      </div>
    </div>
  );
}
