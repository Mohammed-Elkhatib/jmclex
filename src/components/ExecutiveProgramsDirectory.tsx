import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { TrainingCourses } from '@/entities';

interface ExecutiveProgramsDirectoryProps {
  currentProgramId?: string;
}

export default function ExecutiveProgramsDirectory({ currentProgramId }: ExecutiveProgramsDirectoryProps) {
  const [programs, setPrograms] = useState<TrainingCourses[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const result = await BaseCrudService.getAll<TrainingCourses>('trainingcourses');
      setPrograms(result.items);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || programs.length === 0) {
    return null;
  }

  // Filter out current program if provided
  const otherPrograms = currentProgramId 
    ? programs.filter(p => p._id !== currentProgramId)
    : programs;

  if (otherPrograms.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-secondary py-12 sm:py-16 md:py-20 lg:py-24 border-b border-accent-gold/20">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12 md:mb-14 lg:mb-16"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-accent-gold" />
            <span className="font-paragraph text-xs sm:text-sm tracking-widest uppercase text-accent-gold font-semibold">
              Training Center Ecosystem
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4 md:mb-6">
            Executive Programs Directory
          </h2>
          <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl">
            Explore our complete portfolio of premium executive training programs. Navigate seamlessly between programs to find the perfect fit for your professional development.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
          {otherPrograms.map((program, index) => (
            <motion.div
              key={program._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <Link
                to={`/training/${program._id}`}
                className="group block h-full bg-background rounded-lg p-5 sm:p-6 md:p-7 border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/10"
              >
                {/* Program Number */}
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-accent-gold/10 rounded-lg mb-3 sm:mb-4 md:mb-5 group-hover:bg-accent-gold/20 transition-colors">
                  <span className="font-heading text-sm sm:text-base text-accent-gold font-semibold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Program Name */}
                <h3 className="font-heading text-base sm:text-lg md:text-xl text-foreground mb-2 sm:mb-3 group-hover:text-accent-gold transition-colors line-clamp-2">
                  {program.itemName}
                </h3>

                {/* Program Description */}
                <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/80 mb-4 sm:mb-5 md:mb-6 line-clamp-2">
                  {program.itemDescription || 'Premium executive training program'}
                </p>

                {/* Program Meta */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6">
                  {program.duration && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
                      <span className="w-1 h-1 bg-accent-gold rounded-full"></span>
                      <span>{program.duration}</span>
                    </div>
                  )}
                  {program.level && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
                      <span className="w-1 h-1 bg-accent-gold rounded-full"></span>
                      <span>{program.level}</span>
                    </div>
                  )}
                  {program.language && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
                      <span className="w-1 h-1 bg-accent-gold rounded-full"></span>
                      <span>{program.language}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-accent-gold font-paragraph font-medium text-xs sm:text-sm group-hover:gap-3 transition-all">
                  View Program
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Back to Training Center CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 text-center"
        >
          <Link
            to="/training"
            className="inline-flex items-center gap-2 sm:gap-3 bg-foreground text-background font-paragraph font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded transition-all duration-300 hover:bg-foreground/90 hover:scale-105 active:scale-95"
          >
            Back to Training Center
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
