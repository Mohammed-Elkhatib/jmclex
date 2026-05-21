import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Publications } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Head } from '@/components/Head';
import { getPublicationMetadata, getBreadcrumbSchema } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PublicationAuthorByline from '@/components/PublicationAuthorByline';
import ExecutiveSummary from '@/components/ExecutiveSummary';
import TableOfContents from '@/components/TableOfContents';
import KeyInsightBlock from '@/components/KeyInsightBlock';
import FeaturedCategoryBadge from '@/components/FeaturedCategoryBadge';

export default function PublicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [publication, setPublication] = useState<Publications | null>(null);
  const [relatedPublications, setRelatedPublications] = useState<Publications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    loadPublication();
  }, [id]);

  const loadPublication = async () => {
    if (!id) return;
    try {
      const data = await BaseCrudService.getById<Publications>('publications', id);
      setPublication(data);
      
      // Set metadata for SEO with breadcrumb schema
      if (data) {
        const breadcrumbData = [
          { name: 'Home', url: '/' },
          { name: 'Publications', url: '/publications' },
          { name: data.title || 'Publication', url: `/publications/${id}` },
        ];
        
        const metadataConfig = getPublicationMetadata({
          title: data.title || 'Publication',
          summary: data.summary || '',
          content: data.content || '',
          author: data.author,
          category: data.category,
          publicationDate: data.publicationDate?.toString(),
          thumbnailImage: data.thumbnailImage,
          _id: id,
        });
        
        // Add breadcrumb schema
        metadataConfig.structuredData = {
          ...metadataConfig.structuredData,
          breadcrumb: getBreadcrumbSchema(breadcrumbData),
        };
        
        // Add canonical URL
        metadataConfig.canonicalUrl = `https://www.jmclex.com/publications/${id}`;
        
        setMetadata(metadataConfig);
      }
      
      if (data?.category) {
        const allPubs = await BaseCrudService.getAll<Publications>('publications');
        const related = allPubs.items
          .filter(p => p.category === data.category && p._id !== id)
          .slice(0, 5);
        setRelatedPublications(related);
      }
    } catch (error) {
      console.error('Error loading publication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Publications', url: '/publications' },
    { name: publication?.title || 'Publication', url: `/publications/${id}` },
  ];

  return (
    <div className="min-h-screen bg-background">
      {metadata && <Head metadata={metadata} />}
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
            {/* Breadcrumb Navigation */}
            <section className="w-full bg-background py-8 border-b border-foreground/10">
              <div className="max-w-[100rem] mx-auto px-8">
                <nav className="flex items-center gap-2 text-sm font-paragraph text-foreground/60">
                  {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {index > 0 && <span className="text-foreground/40">/</span>}
                      {index === breadcrumbs.length - 1 ? (
                        <span className="text-foreground">{crumb.name}</span>
                      ) : (
                        <Link to={crumb.url} className="hover:text-accent-gold transition-colors">
                          {crumb.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </section>

            {/* Article Header */}
            <section className="w-full bg-background py-16">
              <div className="max-w-[100rem] mx-auto px-8">
                <Link to="/publications" className="inline-flex items-center gap-2 text-accent-gold hover:gap-4 transition-all mb-8">
                  <ArrowLeft className="w-5 h-5" /> Back to Publications
                </Link>
                
                {publication.category && (
                  <div className="mb-6">
                    <FeaturedCategoryBadge category={publication.category} />
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
                
                <PublicationAuthorByline 
                  author={publication.author}
                  publicationDate={publication.publicationDate}
                />

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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                  {/* Table of Contents - Sticky Sidebar */}
                  {publication.content && publication.content.length > 1000 && (
                    <div className="lg:col-span-1">
                      <TableOfContents content={publication.content} />
                    </div>
                  )}
                  
                  <div className={publication.content && publication.content.length > 1000 ? "lg:col-span-2" : "lg:col-span-2"}>
                    {/* Executive Summary */}
                    {publication.summary && (
                      <ExecutiveSummary 
                        keyTakeaways={[
                          publication.summary.substring(0, 100) + (publication.summary.length > 100 ? '...' : ''),
                          'Strategic implications for international business operations',
                          'Recommended compliance and governance measures'
                        ]}
                      />
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="max-w-[75ch]"
                    >
                      <div className="font-paragraph text-lg text-foreground/90 leading-relaxed whitespace-pre-line space-y-6">
                        {publication.content?.split('\n\n').map((paragraph, index) => {
                          // Check if this paragraph looks like a key insight (starts with quotes or specific patterns)
                          if (paragraph.includes('"') && paragraph.length < 200) {
                            return (
                              <KeyInsightBlock 
                                key={index}
                                text={paragraph.replace(/"/g, '').trim()}
                                attribution="JMC LEX Analysis"
                              />
                            );
                          }
                          return (
                            <p key={index} className="text-foreground/90">
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="bg-optional-navy p-8 rounded sticky top-32 space-y-6"
                    >
                      {/* Trust Signals */}
                      <div>
                        <h3 className="font-heading text-lg text-accent-gold mb-3">Institutional Authority</h3>
                        <p className="font-paragraph text-sm text-foreground/70">
                          Expert analysis from JMC LEX's international legal team, specializing in cross-border compliance and strategic counsel.
                        </p>
                      </div>

                      {/* Share & Download */}
                      <div className="flex gap-3 pt-6 border-t border-foreground/10">
                        <button
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: publication.title,
                                text: publication.summary,
                                url: window.location.href,
                              });
                            }
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-foreground/10 hover:bg-foreground/20 text-foreground px-4 py-3 rounded transition-colors"
                          title="Share this publication"
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm font-paragraph">Share</span>
                        </button>
                        {publication.pdfFile && (
                          <a
                            href={publication.pdfFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-accent-gold hover:bg-accent-gold/90 text-secondary-foreground px-4 py-3 rounded transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                            <span className="text-sm font-paragraph">PDF</span>
                          </a>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="pt-6 border-t border-foreground/10">
                        <h3 className="font-heading text-lg text-foreground mb-3">Need Legal Advice?</h3>
                        <p className="font-paragraph text-sm text-foreground/70 mb-6">
                          Discuss how these legal developments may impact your business or personal matters.
                        </p>
                        <div className="flex flex-col gap-3">
                          <a
                            href="mailto:contact@jmclex.com"
                            className="w-full inline-flex items-center justify-center bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-4 rounded transition-all hover:scale-105"
                          >
                            Discuss This Topic
                          </a>
                          <Link
                            to="/consultation"
                            className="w-full inline-flex items-center justify-center bg-foreground/10 text-foreground font-paragraph font-semibold px-6 py-4 rounded transition-all hover:bg-foreground/20"
                          >
                            Schedule Consultation
                          </Link>
                        </div>
                      </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPublications.map((related) => (
                      <Link key={related._id} to={`/publications/${related._id}`} className="group">
                        <div className="relative h-[200px] mb-4 overflow-hidden rounded">
                          <Image
                            src={related.thumbnailImage || 'https://static.wixstatic.com/media/5e1235_80964130fa9e4e12b60522d77f494cf0~mv2.png?originWidth=256&originHeight=192'}
                            alt={related.title || 'Publication'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="mb-3">
                          <FeaturedCategoryBadge category={related.category || 'Publication'} />
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
