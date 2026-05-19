import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PremiumPricingSection() {
  const pricingTiers = [
    {
      name: 'Individual Program',
      description: 'Single executive training program',
      price: '$2,500',
      features: [
        '6-hour intensive program',
        'Elite instructor panel',
        'Executive certification',
        'Course materials included',
        'Confidential learning environment',
        'Lifetime access to recordings'
      ],
      highlighted: false,
      cta: 'Enroll in Program'
    },
    {
      name: 'Executive Package',
      description: 'Premium multi-program bundle',
      price: '$6,500',
      originalPrice: '$9,375',
      discount: '30% Savings',
      features: [
        '3 executive programs',
        'Personalized curriculum selection',
        'Priority scheduling',
        'Dedicated program advisor',
        'Executive networking events',
        'Advanced certification track',
        'Lifetime access to all materials'
      ],
      highlighted: true,
      cta: 'Select Package'
    },
    {
      name: 'Corporate Package',
      description: 'Tailored solutions for organizations',
      price: 'Custom',
      features: [
        'Unlimited program access',
        'Customized curriculum',
        'On-site or virtual delivery',
        'Team certification',
        'Dedicated training coordinator',
        'Quarterly strategy sessions',
        'Compliance documentation'
      ],
      highlighted: false,
      cta: 'Request Proposal'
    },
    {
      name: 'Enterprise Solutions',
      description: 'Comprehensive organizational training',
      price: 'Bespoke',
      features: [
        'Full organizational training',
        'Strategic legal education',
        'Executive leadership programs',
        'Ongoing advisory support',
        'Custom certification programs',
        'Quarterly business reviews',
        'Dedicated account management'
      ],
      highlighted: false,
      cta: 'Schedule Consultation'
    }
  ];

  const discountBenefits = [
    {
      title: '3+ Programs',
      description: '30% discount on approved executive packages',
      icon: '📚'
    },
    {
      title: 'Corporate Enrollment',
      description: 'Volume discounts for organizational training',
      icon: '🏢'
    },
    {
      title: 'Annual Subscription',
      description: 'Unlimited access to all programs',
      icon: '♾️'
    },
    {
      title: 'Strategic Partnership',
      description: 'Custom pricing for long-term engagement',
      icon: '🤝'
    }
  ];

  return (
    <div className="w-full">
      {/* Premium Pricing Section */}
      <section className="w-full bg-background py-16 md:py-24 lg:py-28">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14 md:mb-16 lg:mb-20"
          >
            <span className="inline-block font-paragraph text-xs md:text-sm tracking-widest uppercase text-accent-gold font-semibold mb-4 md:mb-6">
              Transparent Pricing
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 md:mb-6">
              Executive Training Investment Options
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
              Flexible pricing structures designed for individual professionals, executive teams, and enterprise organizations seeking premium legal education.
            </p>
          </motion.div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8 mb-14 md:mb-16 lg:mb-20">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`relative rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-foreground border-2 border-accent-gold shadow-lg shadow-accent-gold/20 transform lg:scale-105'
                    : 'bg-secondary border border-accent-gold/20 hover:border-accent-gold/50'
                }`}
              >
                {/* Premium Badge */}
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-accent-gold text-foreground py-2 px-4 text-center">
                    <p className="font-paragraph text-xs md:text-sm font-semibold tracking-wide uppercase">
                      Most Popular
                    </p>
                  </div>
                )}

                {/* Discount Badge */}
                {tier.discount && (
                  <div className="absolute top-12 right-0 bg-accent-gold/20 border-l-4 border-accent-gold px-3 md:px-4 py-2">
                    <p className="font-paragraph text-xs md:text-sm font-semibold text-accent-gold">
                      {tier.discount}
                    </p>
                  </div>
                )}

                <div className={`p-6 md:p-7 lg:p-8 flex flex-col flex-grow ${tier.highlighted ? 'pt-14' : ''}`}>
                  {/* Tier Name */}
                  <h3 className={`font-heading text-lg md:text-xl mb-2 ${
                    tier.highlighted ? 'text-secondary' : 'text-foreground'
                  }`}>
                    {tier.name}
                  </h3>

                  {/* Description */}
                  <p className={`font-paragraph text-sm md:text-base mb-6 md:mb-8 ${
                    tier.highlighted ? 'text-secondary/90' : 'text-foreground/80'
                  }`}>
                    {tier.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6 md:mb-8">
                    <div className={`font-heading text-3xl md:text-4xl mb-2 ${
                      tier.highlighted ? 'text-accent-gold' : 'text-accent-gold'
                    }`}>
                      {tier.price}
                    </div>
                    {tier.originalPrice && (
                      <p className={`font-paragraph text-sm line-through ${
                        tier.highlighted ? 'text-secondary/60' : 'text-foreground/60'
                      }`}>
                        {tier.originalPrice}
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? 'text-accent-gold' : 'text-accent-gold'
                        }`} />
                        <p className={`font-paragraph text-sm md:text-base ${
                          tier.highlighted ? 'text-secondary/95' : 'text-foreground/90'
                        }`}>
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/consultation"
                    className={`w-full py-3 md:py-4 px-4 md:px-6 rounded font-paragraph font-semibold text-center transition-all duration-300 inline-flex items-center justify-center gap-2 ${
                      tier.highlighted
                        ? 'bg-accent-gold text-foreground hover:bg-accent-gold/90 hover:scale-105'
                        : 'bg-accent-gold/10 text-accent-gold border border-accent-gold/30 hover:border-accent-gold/60 hover:bg-accent-gold/20'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Discount Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-secondary rounded-lg p-8 md:p-10 lg:p-12 border border-accent-gold/20"
          >
            <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2 md:mb-3">
              Special Offers & Discounts
            </h3>
            <p className="font-paragraph text-base md:text-lg text-foreground/80 mb-8 md:mb-10">
              Maximize your investment in executive education with our flexible pricing options
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {discountBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-background rounded-lg p-5 md:p-6 border border-accent-gold/10 hover:border-accent-gold/40 transition-all"
                >
                  <div className="text-3xl md:text-4xl mb-3">{benefit.icon}</div>
                  <h4 className="font-heading text-base md:text-lg text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="font-paragraph text-sm md:text-base text-foreground/80">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Solutions Section */}
      <section className="w-full bg-secondary py-16 md:py-24 lg:py-28">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-14 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block font-paragraph text-xs md:text-sm tracking-widest uppercase text-accent-gold font-semibold mb-4 md:mb-6">
                For Organizations
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 md:mb-8">
                Enterprise Training Solutions
              </h2>
              <p className="font-paragraph text-base md:text-lg text-foreground/90 mb-6 md:mb-8 leading-relaxed">
                We provide comprehensive, customized legal education programs designed specifically for enterprise organizations, law firms, corporate legal departments, and compliance teams.
              </p>

              <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
                {[
                  'Unlimited program access for your organization',
                  'Customized curriculum aligned with your strategic objectives',
                  'Flexible delivery: on-site, virtual, or hybrid formats',
                  'Dedicated account management and support',
                  'Quarterly business reviews and strategy sessions',
                  'Comprehensive compliance documentation'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="flex items-start gap-3 md:gap-4"
                  >
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-accent-gold flex-shrink-0 mt-0.5" />
                    <p className="font-paragraph text-sm md:text-base text-foreground/90">{item}</p>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-accent-gold text-foreground font-paragraph font-semibold px-8 md:px-10 py-4 md:py-5 rounded transition-all duration-300 hover:bg-accent-gold/90 hover:scale-105 active:scale-95"
              >
                Request Enterprise Proposal
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </motion.div>

            {/* Right Content - Key Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              {[
                {
                  number: '50+',
                  label: 'Executive Programs',
                  description: 'Comprehensive curriculum'
                },
                {
                  number: '100%',
                  label: 'Customizable',
                  description: 'Tailored to your needs'
                },
                {
                  number: '24/7',
                  label: 'Support Available',
                  description: 'Dedicated team'
                },
                {
                  number: '∞',
                  label: 'Lifetime Access',
                  description: 'All materials included'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-background rounded-lg p-6 md:p-7 border border-accent-gold/20 text-center"
                >
                  <div className="font-heading text-3xl md:text-4xl text-accent-gold mb-2">
                    {stat.number}
                  </div>
                  <h4 className="font-heading text-base md:text-lg text-foreground mb-1">
                    {stat.label}
                  </h4>
                  <p className="font-paragraph text-xs md:text-sm text-foreground/70">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Positioning Section */}
      <section className="w-full bg-background py-16 md:py-24 lg:py-28">
        <div className="max-w-[100rem] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14 md:mb-16 lg:mb-20"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 md:mb-6">
              Why Choose Our Executive Training
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
              Discreet, elite education designed for distinguished professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
            {[
              {
                title: 'Elite Instructor Panel',
                description: 'Learn from top-tier legal experts with decades of experience in strategic legal matters and landmark cases.'
              },
              {
                title: 'Confidential Environment',
                description: 'Private, secure learning setting designed specifically for sensitive strategic discussions and executive-level content.'
              },
              {
                title: 'Personalized Attention',
                description: 'Small, carefully curated cohorts ensure individual attention and tailored learning experiences for each participant.'
              },
              {
                title: 'Executive Certification',
                description: 'Recognized professional credentials that enhance your standing and credibility within your organization and industry.'
              },
              {
                title: 'Strategic Curriculum',
                description: 'Real-world case studies and landmark decisions analyzed in depth with practical application to your business.'
              },
              {
                title: 'Bilingual Delivery',
                description: 'Programs available in English and French, accommodating global professionals and international business needs.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-secondary rounded-lg p-6 md:p-7 lg:p-8 border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/10"
              >
                <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-accent-gold" />
                </div>
                <h3 className="font-heading text-lg md:text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-sm md:text-base text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
