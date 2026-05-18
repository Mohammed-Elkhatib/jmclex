/**
 * Trust Signals Component
 * Discreet institutional credibility indicators
 * Reinforces premium positioning without aggressive marketing
 */

import { motion } from 'framer-motion';
import { Award, Globe, Shield, Users, BookOpen, Zap } from 'lucide-react';

interface TrustSignal {
  icon: React.ReactNode;
  label: string;
  value: string;
  description?: string;
}

const TRUST_SIGNALS: TrustSignal[] = [
  {
    icon: <Award className="w-6 h-6" />,
    label: 'Years of Expertise',
    value: '30+',
    description: 'Institutional legal practice since 1990',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    label: 'Global Jurisdictions',
    value: '20+',
    description: 'EMEA and international markets',
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: 'Expert Team',
    value: '50+',
    description: 'International legal professionals',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    label: 'Confidentiality',
    value: '100%',
    description: 'Sovereign-grade data protection',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    label: 'Publications',
    value: '100+',
    description: 'Thought leadership & analysis',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    label: 'Response Time',
    value: '24h',
    description: 'Executive-level advisory',
  },
];

interface TrustSignalsProps {
  variant?: 'compact' | 'expanded';
  className?: string;
}

export default function TrustSignals({ variant = 'compact', className = '' }: TrustSignalsProps) {
  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ${className}`}>
        {TRUST_SIGNALS.map((signal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="text-center"
          >
            <div className="flex justify-center mb-3 text-accent-gold">
              {signal.icon}
            </div>
            <div className="font-heading text-2xl md:text-3xl text-foreground mb-1">
              {signal.value}
            </div>
            <div className="font-paragraph text-xs md:text-sm text-foreground/60 uppercase tracking-wider">
              {signal.label}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Expanded variant
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {TRUST_SIGNALS.map((signal, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.08 }}
          className="bg-optional-navy/40 border border-foreground/10 rounded p-6 hover:border-accent-gold/30 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="text-accent-gold flex-shrink-0 mt-1">
              {signal.icon}
            </div>
            <div>
              <div className="font-heading text-3xl text-foreground mb-1">
                {signal.value}
              </div>
              <div className="font-paragraph text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                {signal.label}
              </div>
              {signal.description && (
                <p className="font-paragraph text-sm text-foreground/60">
                  {signal.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
