import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface KeyInsightBlockProps {
  text: string;
  attribution?: string;
}

export default function KeyInsightBlock({ text, attribution }: KeyInsightBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-8 p-8 bg-gradient-to-r from-accent-gold/5 to-accent-gold/10 border-l-4 border-accent-gold rounded-r"
    >
      <div className="flex items-start gap-4">
        <Quote className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
        <div>
          <p className="font-paragraph text-lg text-foreground italic leading-relaxed mb-3">
            "{text}"
          </p>
          {attribution && (
            <p className="font-paragraph text-sm text-foreground/60">
              — {attribution}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
