import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'standard',
    name: 'Standard Framework Access',
    description: 'Essential legal templates and resources for informed decision-making',
    price: '$2,500',
    period: 'one-time',
    features: [
      'Downloadable legal templates',
      'Informational documentation',
      'Standard compliance frameworks',
      'Email support',
      'Access for 12 months',
      'Digital resource library'
    ],
    cta: 'Get Started'
  },
  {
    id: 'executive',
    name: 'Executive Review & Customization',
    description: 'Strategic guidance with expert adaptation to your business structure',
    price: '$12,500',
    period: 'per engagement',
    features: [
      'Strategic legal review',
      'Business structure adaptation',
      'Compliance alignment',
      'Executive consultation (5 hours)',
      'Customized documentation',
      'Priority support',
      'Governance recommendations',
      'Quarterly check-ins'
    ],
    cta: 'Schedule Consultation',
    highlighted: true
  },
  {
    id: 'bespoke',
    name: 'Bespoke International Drafting',
    description: 'Comprehensive custom solutions for complex cross-border operations',
    price: 'Custom',
    period: 'per project',
    features: [
      'Fully customized legal drafting',
      'Cross-border structuring',
      'Strategic governance advisory',
      'Executive legal support (unlimited)',
      'Multi-jurisdiction compliance',
      'Dedicated legal team',
      'Ongoing advisory relationship',
      'Annual strategic review'
    ],
    cta: 'Request Proposal'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function PremiumPricingStructure() {
  return (
    <section className="w-full bg-background py-section-xl">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-section-lg text-center"
        >
          <h2 className="font-heading text-5xl sm:text-6xl font-bold text-primary mb-4">
            Premium Legal Solutions
          </h2>
          <p className="font-paragraph text-lg text-text-muted max-w-2xl mx-auto">
            Tailored pricing structures for executive legal and compliance resources, from foundational frameworks to bespoke international solutions
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                tier.highlighted
                  ? 'md:scale-105 ring-2 ring-accent-gold bg-background-alt'
                  : 'bg-background-alt hover:shadow-lg'
              }`}
            >
              {/* Highlighted Badge */}
              {tier.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-accent-gold text-primary px-4 py-2 text-center font-heading text-sm font-semibold">
                  Recommended
                </div>
              )}

              {/* Card Content */}
              <div className={`p-8 flex flex-col h-full ${tier.highlighted ? 'pt-16' : ''}`}>
                {/* Tier Name & Description */}
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                    {tier.name}
                  </h3>
                  <p className="font-paragraph text-sm text-text-muted">
                    {tier.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-8 pb-8 border-b border-border-subtle">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-heading text-4xl font-bold text-primary">
                      {tier.price}
                    </span>
                    <span className="font-paragraph text-sm text-text-muted">
                      {tier.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-8 flex-grow">
                  <ul className="space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                        <span className="font-paragraph text-sm text-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full py-3 font-heading font-semibold transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-accent-gold text-primary hover:bg-accent-gold-dark'
                      : 'bg-primary text-background-alt hover:bg-foreground-light'
                  }`}
                >
                  {tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-section-lg pt-section-lg border-t border-border-subtle text-center"
        >
          <p className="font-paragraph text-text-muted mb-4">
            All packages include comprehensive documentation, compliance review, and executive-level support
          </p>
          <p className="font-paragraph text-sm text-text-muted-light">
            Contact our team for volume discounts, multi-year arrangements, and specialized requirements
          </p>
        </motion.div>
      </div>
    </section>
  );
}
