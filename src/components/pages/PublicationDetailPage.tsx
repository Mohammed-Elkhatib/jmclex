import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Publications } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [publication, setPublication] = useState<Publications | null>(null);
  const [relatedPublications, setRelatedPublications] = useState<Publications[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPublication();
  }, [id]);

  const loadPublication = async () => {
    if (!id) return;
    try {
      const data = await BaseCrudService.getById<Publications>('publications', id);
      setPublication(data);
      
      if (data?.category) {
        const allPubs = await BaseCrudService.getAll<Publications>('publications');
        const related = allPubs.items
          .filter(p => p.category === data.category && p._id !== id)
          .slice(0, 3);
        setRelatedPublications(related);
      }
    } catch (error) {
      console.error('Error loading publication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="min-h-screen pt-32">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !publication ? (
          <div className="max-w-[100rem] mx-auto px-8 py-32 text-center">
            <h2 className="font-heading text-4xl text-foreground mb-6">Publication Not Found</h2>
            <Link to="/publications" className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all">
              <ArrowLeft className="w-5 h-5" /> Back to Publications
            </Link>
          </div>
        ) : (
          <>
            {/* Article Header */}
            <section className="w-full bg-background py-16">
              <div className="max-w-[100rem] mx-auto px-8">
                <Link to="/publications" className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all mb-8">
                  <ArrowLeft className="w-5 h-5" /> Back to Publications
                </Link>
                
                {publication.category && (
                  <div className="inline-block bg-accent-gold text-secondary-foreground px-4 py-2 rounded text-sm font-paragraph font-medium mb-6">
                    {publication.category}
                  </div>
                )}
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-heading text-5xl md:text-6xl text-foreground mb-8"
                >
                  {publication.title}
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-6 text-foreground/60 font-paragraph mb-12"
                >
                  {publication.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span>{publication.author}</span>
                    </div>
                  )}
                  {publication.publicationDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(publication.publicationDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  )}
                </motion.div>

                {publication.thumbnailImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative h-[500px] mb-16 rounded overflow-hidden"
                  >
                    <Image
                      src={publication.thumbnailImage}
                      alt={publication.title || 'Publication'}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>
            </section>

            {/* Article Content */}
            <section className="w-full bg-background pb-32">
              <div className="max-w-[100rem] mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  <div className="lg:col-span-2">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="prose prose-invert max-w-none"
                    >
                      <div className="font-paragraph text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                        {publication.content}
                      </div>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="bg-optional-navy p-8 rounded sticky top-32"
                    >
                      <h3 className="font-heading text-2xl text-foreground mb-6">Need Legal Advice?</h3>
                      <p className="font-paragraph text-base text-foreground/80 mb-8 leading-relaxed">
                        Discuss how these legal developments may impact your business or personal matters.
                      </p>
                      <Link
                        to="/consultation"
                        className="w-full inline-flex items-center justify-center bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-4 rounded transition-all hover:scale-105"
                      >
                        Schedule Consultation
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Publications */}
            {relatedPublications.length > 0 && (
              <section className="w-full bg-optional-navy py-32">
                <div className="max-w-[100rem] mx-auto px-8">
                  <h2 className="font-heading text-4xl text-foreground mb-12">Related Publications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedPublications.map((related) => (
                      <Link key={related._id} to={`/publications/${related._id}`} className="group">
                        <div className="relative h-[200px] mb-4 overflow-hidden rounded">
                          <Image
                            src={related.thumbnailImage || 'https://static.wixstatic.com/media/5e1235_80964130fa9e4e12b60522d77f494cf0~mv2.png?originWidth=256&originHeight=192'}
                            alt={related.title || 'Publication'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-accent-gold transition-colors">
                          {related.title}
                        </h3>
                        <p className="font-paragraph text-sm text-foreground/70 line-clamp-2">
                          {related.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
