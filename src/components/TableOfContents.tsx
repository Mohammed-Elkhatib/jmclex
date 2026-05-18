import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Extract headings from content (looking for ## and ### patterns)
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  if (headings.length < 3) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-optional-navy border border-foreground/10 rounded p-6 mb-8 sticky top-32"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4 hover:text-accent-gold transition-colors"
      >
        <h3 className="font-heading text-lg text-foreground">On This Page</h3>
        <ChevronDown 
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <nav className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block font-paragraph text-sm transition-colors hover:text-accent-gold ${
                heading.level === 3 ? 'pl-4 text-foreground/60' : 'text-foreground/80'
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      )}
    </motion.div>
  );
}
