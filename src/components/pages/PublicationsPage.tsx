import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Search } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Publications } from '@/entities';
import { Input } from '@/components/ui/input';
import { Head } from '@/components/Head';
import { PAGE_METADATA_PRESETS, buildPageMetadata, getBreadcrumbSchema } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedCategoryBadge from '@/components/FeaturedCategoryBadge';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const FEATURED_CATEGORIES = [
    'Compliance & AML',
    'AI Governance',
    'Corporate Governance',
    'Sanctions & Export Controls',
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Publications', url: '/publications' },
  ];

  const pageMetadata = buildPageMetadata({
    ...PAGE_METADATA_PRESETS.publications,
    canonicalUrl: 'https://www.jmclex.com/publications',
    structuredData: getBreadcrumbSchema(breadcrumbs),
  });

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      const result = await BaseCrudService.getAll<Publications>('publications');
      setPublications(result.items);
    } catch (error) {
      console.error('Error loading publications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredArticle = publications.length > 0 
    ? publications[0]
    : {
        _id: 'featured-1',
        title: 'Strategic Legal Authority on International Compliance',
        summary: 'JMC LEX provides expert thought leadership on geopolitical law, international sanctions compliance, cross-border business strategy, and emerging regulatory developments.',
        content: 'Strategic legal analysis for international business.',
        category: 'Compliance & AML',
        author: 'JMC LEX',
        publicationDate: new Date().toISOString(),
        thumbnailImage: 'https://static.wixstatic.com/media/5e1235_079a8f3ba0044f73ac8409d57433f23d~mv2.png?originWidth=384&originHeight=192'
      };

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || pub.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(publications.map(p => p.category).filter(Boolean)))];
  
  const featuredCategories = categories.filter(cat => 
    cat !== 'all' && FEATURED_CATEGORIES.includes(cat)
  );
  
  const otherCategories = categories.filter(cat => 
    cat !== 'all' && !FEATURED_CATEGORIES.includes(cat)
  );

  return (
    <div className="min-h-screen bg-background">
      <Head metadata={pageMetadata} />
      <Header />
      
      {/* Breadcrumb Navigation */}
      <section className="w-full bg-background py-8 border-b border-foreground/10 mt-20">
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
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/5e1235_71982afc946a48a4ba145d5a053130cb~mv2.png?originWidth=1152&originHeight=576"
            alt="Legal publications"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-[100rem] mx-auto px-8 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-7xl text-foreground mb-8"
          >
            Legal Authority, Strategic Insights & International Compliance Analysis
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto"
          >
            Expert thought leadership on geopolitical law, international sanctions compliance, cross-border business strategy, and emerging regulatory developments
          </motion.p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="relative h-[400px] rounded overflow-hidden">
              <Image
                src={featuredArticle.thumbnailImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-block bg-accent-gold text-secondary-foreground px-4 py-2 rounded text-sm font-paragraph font-medium mb-6">
                {featuredArticle.category}
              </div>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                {featuredArticle.title}
              </h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-8 leading-relaxed">
                {featuredArticle.summary}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {featuredArticle._id !== 'featured-1' ? (
                  <Link to={`/publications/${featuredArticle._id}`} className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded text-lg transition-all hover:scale-105">
                    Read Analysis <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <a href="#publications" className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded text-lg transition-all hover:scale-105">
                    Explore Publications <ArrowRight className="w-5 h-5" />
                  </a>
                )}
                <a href="mailto:contact@jmclex.com" className="inline-flex items-center gap-2 bg-foreground/10 text-foreground font-paragraph font-semibold px-8 py-4 rounded text-lg transition-all hover:bg-foreground/20">
                  Discuss This Topic
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="w-full bg-optional-navy py-12" id="publications">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex flex-col gap-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 bg-background text-foreground border-foreground/20"
              />
            </div>
            
            {/* Featured Categories */}
            {featuredCategories.length > 0 && (
              <div>
                <h3 className="font-heading text-sm text-accent-gold uppercase tracking-wider mb-4">Featured Categories</h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  {featuredCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setCategoryFilter(category)}
                      className={`font-paragraph px-6 py-3 rounded transition-all ${
                        categoryFilter === category
                          ? 'bg-accent-gold text-secondary-foreground shadow-lg'
                          : 'bg-background text-foreground hover:bg-accent-gold hover:text-secondary-foreground'
                      }`}
                    >
                      ★ {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Categories */}
            <div>
              <h3 className="font-heading text-sm text-foreground/60 uppercase tracking-wider mb-4">All Categories</h3>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`font-paragraph px-6 py-3 rounded transition-all ${
                    categoryFilter === 'all'
                      ? 'bg-accent-gold text-secondary-foreground'
                      : 'bg-background text-foreground hover:bg-accent-gold hover:text-secondary-foreground'
                  }`}
                >
                  All
                </button>
                {otherCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`font-paragraph px-6 py-3 rounded transition-all ${
                      categoryFilter === category
                        ? 'bg-accent-gold text-secondary-foreground'
                        : 'bg-background text-foreground hover:bg-accent-gold hover:text-secondary-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredPublications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPublications.map((publication, index) => (
                  <motion.div
                    key={publication._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/publications/${publication._id}`} className="block">
                      <div className="relative h-[250px] mb-6 overflow-hidden rounded">
                        <Image
                          src={publication.thumbnailImage || 'https://static.wixstatic.com/media/5e1235_079a8f3ba0044f73ac8409d57433f23d~mv2.png?originWidth=384&originHeight=192'}
                          alt={publication.title || 'Publication'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                        {publication.category && (
                          <div className="absolute top-4 left-4">
                            <FeaturedCategoryBadge category={publication.category} />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mb-4 text-sm font-paragraph text-foreground/60">
                        {publication.author && <span>{publication.author}</span>}
                        {publication.publicationDate && (
                          <span>{new Date(publication.publicationDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      <h3 className="font-heading text-2xl text-foreground mb-4 group-hover:text-accent-gold transition-colors">
                        {publication.title}
                      </h3>
                      <p className="font-paragraph text-base text-foreground/80 mb-6 leading-relaxed line-clamp-3">
                        {publication.summary}
                      </p>
                      <div className="inline-flex items-center gap-2 font-paragraph text-accent-gold group-hover:gap-4 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground/60">
                  No publications found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-optional-navy py-32">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">
              Stay Informed on Legal Developments
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 mb-12 max-w-3xl mx-auto">
              For inquiries about our publications and legal insights, contact our team
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-10 py-5 rounded text-lg transition-all hover:scale-105"
            >
              Contact Us <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
