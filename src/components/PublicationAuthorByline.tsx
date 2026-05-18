import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PublicationAuthorBylineProps {
  author?: string;
  publicationDate?: Date | string;
}

export default function PublicationAuthorByline({ author, publicationDate }: PublicationAuthorBylineProps) {
  const formattedDate = publicationDate 
    ? new Date(publicationDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 py-6 border-b border-foreground/10 mb-8"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-paragraph font-semibold text-accent-gold uppercase tracking-wider">
            Published by JMC LEX
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-paragraph text-foreground/70">
          {author && (
            <div>
              <span className="text-foreground/50">By </span>
              <Link 
                to="/team" 
                className="text-foreground hover:text-accent-gold transition-colors font-medium"
              >
                {author}
              </Link>
            </div>
          )}
          {formattedDate && (
            <span className="text-foreground/50">
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
