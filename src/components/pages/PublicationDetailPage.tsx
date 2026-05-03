import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, Calendar, User, ShoppingCart, Lock } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Publications } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [publication, setPublication] = useState<Publications | null>(null);
  const [relatedPublications, setRelatedPublications] = useState<Publications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions: cartActions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadPublication();
  }, [id]);

  const loadPublication = async () => {
    if (!id) return;
    try {
      // Add timeout protection - max 5 seconds
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Data fetch timeout')), 5000)
      );
      
      const data = await Promise.race([
        BaseCrudService.getById<Publications>('publications', id),
        timeoutPromise
      ]) as any;
      
      setPublication(data || null);
      
      if (data?.category) {
        const allPubsResult = await Promise.race([
          BaseCrudService.getAll<Publications>('publications'),
          timeoutPromise
        ]) as any;
        
        const related = (allPubsResult?.items || [])
          .filter((p: Publications) => p.category === data.category && p._id !== id)
          .slice(0, 3);
        setRelatedPublications(related);
      }
    } catch (error) {
      console.error('Error loading publication:', error);
      setPublication(null);
      setRelatedPublications([]);
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
                      {/* Content Preview - Limited to first 500 characters */}
                      <div className="font-paragraph text-lg text-foreground/90 leading-relaxed whitespace-pre-line select-none">
                        {publication.content && publication.content.length > 500 ? (
                          <>
                            <div className="relative">
                              <p>{publication.content.substring(0, 500)}...</p>
                              <div className="absolute inset-0 top-1/2 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
                            </div>
                            <div className="mt-8 p-6 bg-optional-navy/30 rounded border border-accent-gold/30 text-center">
                              <Lock className="w-8 h-8 text-accent-gold mx-auto mb-3" />
                              <p className="font-paragraph text-foreground/80 mb-2">
                                Full content is available after purchase
                              </p>
                              <p className="font-paragraph text-sm text-foreground/60">
                                Add this publication to your cart to access the complete document
                              </p>
                            </div>
                          </>
                        ) : (
                          <p>{publication.content}</p>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="space-y-6 sticky top-32">
                      {/* Purchase Section */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-accent-gold p-8 rounded"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-heading text-2xl text-secondary-foreground">Download PDF</h3>
                          <Lock className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        {publication.price && (
                          <div className="mb-6">
                            <p className="font-paragraph text-sm text-secondary-foreground/80 mb-2">Price</p>
                            <p className="font-heading text-3xl text-secondary-foreground">
                              {formatPrice(publication.price, currency ?? DEFAULT_CURRENCY)}
                            </p>
                          </div>
                        )}
                        {publication.language && (
                          <p className="font-paragraph text-sm text-secondary-foreground/80 mb-6">
                            Language: <span className="font-semibold">{publication.language}</span>
                          </p>
                        )}
                        <button
                          onClick={() => cartActions.addToCart({ 
                            collectionId: 'publications', 
                            itemId: publication._id,
                            quantity: 1
                          })}
                          disabled={addingItemId === publication._id}
                          className="w-full inline-flex items-center justify-center gap-2 bg-secondary-foreground text-accent-gold font-paragraph font-semibold px-6 py-4 rounded transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          {addingItemId === publication._id ? 'Adding to Cart...' : 'Add to Cart'}
                        </button>
                        <p className="font-paragraph text-xs text-secondary-foreground/70 mt-4 text-center">
                          Payment required before download
                        </p>
                      </motion.div>

                      {/* Consultation Section */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="bg-optional-navy p-8 rounded"
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
