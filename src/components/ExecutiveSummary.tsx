import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface ExecutiveSummaryProps {
  keyTakeaways: string[];
}

export default function ExecutiveSummary({ keyTakeaways }: ExecutiveSummaryProps) {
  if (!keyTakeaways || keyTakeaways.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-accent-gold/10 border-l-4 border-accent-gold rounded-r p-8 mb-12"
    >
      <div className="flex items-start gap-4">
        <Lightbulb className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-heading text-lg text-foreground mb-4">Key Takeaways</h3>
          <ul className="space-y-3">
            {keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold text-secondary-foreground text-xs font-semibold flex-shrink-0">
                  {index + 1}
                </span>
                <span className="font-paragraph text-foreground/90 leading-relaxed">
                  {takeaway}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
