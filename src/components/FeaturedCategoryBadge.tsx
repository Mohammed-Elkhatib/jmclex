import { motion } from 'framer-motion';

interface FeaturedCategoryBadgeProps {
  category: string;
  isFeatured?: boolean;
}

const FEATURED_CATEGORIES = [
  'Strategic Insight',
  'Compliance Alert',
  'Market Analysis',
  'Regulatory Update',
];

export default function FeaturedCategoryBadge({ category, isFeatured }: FeaturedCategoryBadgeProps) {
  const isHighlighted = isFeatured || FEATURED_CATEGORIES.includes(category);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`inline-block rounded text-sm font-paragraph font-medium px-4 py-2 transition-all ${
        isHighlighted
          ? 'bg-accent-gold text-secondary-foreground shadow-lg'
          : 'bg-foreground/10 text-foreground'
      }`}
    >
      {isHighlighted && <span className="mr-2">★</span>}
      {category}
    </motion.div>
  );
}
