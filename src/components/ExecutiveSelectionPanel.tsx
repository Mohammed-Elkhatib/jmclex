import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase } from 'lucide-react';

interface ExecutiveProgram {
  id: string;
  name: string;
  level: string;
  description: string;
}

const executivePrograms: ExecutiveProgram[] = [
  {
    id: 'foundations',
    name: 'Executive Foundations',
    level: 'Level 1',
    description: 'Essential legal and strategic frameworks for executive decision-making'
  },
  {
    id: 'advanced',
    name: 'Advanced Executive Program',
    level: 'Level 2',
    description: 'Advanced strategies for complex international legal matters'
  },
  {
    id: 'custom',
    name: 'Custom Executive Program',
    level: 'Bespoke',
    description: 'Tailored programs designed for your specific organizational needs'
  }
];

interface ExecutiveSelectionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram?: (program: ExecutiveProgram) => void;
}

export default function ExecutiveSelectionPanel({ isOpen, onClose, onSelectProgram }: ExecutiveSelectionPanelProps) {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const handleSelectProgram = (program: ExecutiveProgram) => {
    setSelectedProgram(program.id);
    if (onSelectProgram) {
      onSelectProgram(program);
    }
    // Navigate to application form or enrollment page
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />
        )}
      </AnimatePresence>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background border-l border-optional-navy/10 z-50 overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-optional-navy/10 px-6 py-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h2 className="font-heading text-lg text-foreground">Executive Programs</h2>
                  <p className="font-paragraph text-xs text-foreground/60">Select your program</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-foreground/60 hover:text-foreground transition-colors p-1"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-8 space-y-4">
              {/* Introduction */}
              <div className="mb-8">
                <p className="font-paragraph text-sm text-foreground/80 leading-relaxed">
                  Explore our premium executive training programs designed for senior leaders and decision-makers.
                </p>
              </div>

              {/* Programs List */}
              <div className="space-y-3">
                {executivePrograms.map((program, index) => (
                  <motion.button
                    key={program.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleSelectProgram(program)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 group ${ 
                      selectedProgram === program.id
                        ? 'border-accent-gold bg-accent-gold/5'
                        : 'border-optional-navy/10 hover:border-accent-gold/50 bg-background hover:bg-secondary'
                    }`}
                  >
                    {/* Program Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-heading text-base text-foreground group-hover:text-accent-gold transition-colors">
                          {program.name}
                        </h3>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-accent-gold/10 text-accent-gold text-xs font-semibold rounded">
                          {program.level}
                        </span>
                      </div>
                      {selectedProgram === program.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-accent-gold flex items-center justify-center flex-shrink-0"
                        >
                          <span className="text-white text-xs font-bold">✓</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="font-paragraph text-xs text-foreground/70 leading-relaxed">
                      {program.description}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-8 pt-8 border-t border-optional-navy/10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="space-y-3"
                >
                  {selectedProgram ? (
                    <>
                      <p className="font-paragraph text-xs text-foreground/60 text-center">
                        Program selected. Ready to proceed with your application?
                      </p>
                      <button
                        onClick={() => {
                          const program = executivePrograms.find(p => p.id === selectedProgram);
                          if (program) {
                            window.location.href = `/executive-training-center?program=${program.name}`;
                          }
                        }}
                        className="w-full bg-accent-gold text-background font-paragraph font-semibold px-4 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        Proceed to Application
                      </button>
                    </>
                  ) : (
                    <p className="font-paragraph text-xs text-foreground/60 text-center">
                      Select a program above to get started
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-accent-gold/5 border border-accent-gold/20 rounded-lg">
                <p className="font-paragraph text-xs text-foreground/70 leading-relaxed">
                  <span className="font-semibold text-accent-gold">Premium Enrollment:</span> All programs include personalized consultation, flexible scheduling, and confidential one-to-one sessions.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
