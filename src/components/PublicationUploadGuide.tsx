import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle2, AlertCircle, FileText, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

export default function PublicationUploadGuide() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const steps = [
    {
      number: 1,
      title: 'Prepare Your Content',
      icon: FileText,
      details: [
        'Publication Title (e.g., "International Sanctions Compliance Framework")',
        'Author Name (e.g., "JMC LEX Legal Team")',
        'Publication Date',
        'Category (Compliance & AML, AI Governance, Corporate Governance, etc.)',
        'Summary/Abstract (2-3 sentences)',
        'Full Content/Article Text',
        'PDF File (ready to upload)',
        'Thumbnail Image (384x192px recommended)',
        'Language',
        'Price (0 for free, or custom price)'
      ]
    },
    {
      number: 2,
      title: 'Upload PDF File',
      icon: LinkIcon,
      details: [
        'Go to Wix Dashboard → Media → Files',
        'Click "Upload Files" and select your PDF',
        'Once uploaded, copy the file URL',
        'Save the URL for the next step',
        'Alternative: Use external storage (Google Drive, Dropbox) with public link'
      ]
    },
    {
      number: 3,
      title: 'Add to CMS Database',
      icon: ImageIcon,
      details: [
        'Access: https://manage.wix.com/dashboard/d117d244-27df-418b-96f1-ab1ee29a2dc5/database',
        'Click "Publications" collection',
        'Click "Add Item" button',
        'Fill in all required fields:',
        '  • title, author, publicationDate, category',
        '  • summary, content, pdfFile, thumbnailImage',
        'Click "Save" to publish'
      ]
    },
    {
      number: 4,
      title: 'Verify on Website',
      icon: CheckCircle2,
      details: [
        'Go to /publications page',
        'Search for your publication by title',
        'Filter by category',
        'Click to view detail page',
        'Verify: title, author, date, thumbnail, PDF download link',
        'Check that full content displays correctly'
      ]
    }
  ];

  const categories = [
    'Compliance & AML',
    'AI Governance',
    'Corporate Governance',
    'Sanctions & Export Controls',
    'International Law',
    'Cross-Border Transactions'
  ];

  const requiredFields = [
    { field: 'title', type: 'Text', example: 'International Sanctions Compliance Framework' },
    { field: 'author', type: 'Text', example: 'JMC LEX Legal Team' },
    { field: 'publicationDate', type: 'Date', example: '2026-05-21' },
    { field: 'category', type: 'Text', example: 'Compliance & AML' },
    { field: 'summary', type: 'Text', example: 'A comprehensive guide to...' },
    { field: 'content', type: 'Text (Long)', example: 'Full article text with paragraphs' },
    { field: 'pdfFile', type: 'URL', example: 'https://example.com/publication.pdf' },
    { field: 'thumbnailImage', type: 'Image URL', example: 'https://example.com/image.jpg' }
  ];

  return (
    <div className="w-full bg-background py-16">
      <div className="max-w-[100rem] mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
            Self-Service Publication Management
          </h2>
          <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
            Add new publications independently without developer assistance. Follow these simple steps to publish articles and documents.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isExpanded = expandedStep === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-foreground/10 rounded overflow-hidden"
              >
                <button
                  onClick={() => setExpandedStep(isExpanded ? null : index)}
                  className="w-full flex items-center justify-between p-6 bg-optional-navy hover:bg-optional-navy/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-gold text-secondary-foreground font-heading font-bold">
                      {step.number}
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-accent-gold" />
                      <h3 className="font-heading text-lg text-foreground">{step.title}</h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-accent-gold transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-background border-t border-foreground/10 p-6"
                  >
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-3 font-paragraph text-foreground/80">
                          <CheckCircle2 className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-optional-navy p-8 rounded mb-16"
        >
          <h3 className="font-heading text-2xl text-foreground mb-6">Featured Categories</h3>
          <p className="font-paragraph text-foreground/70 mb-6">
            Use these categories for better visibility on the Publications page:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center gap-3 bg-background p-4 rounded">
                <CheckCircle2 className="w-5 h-5 text-accent-gold flex-shrink-0" />
                <span className="font-paragraph text-foreground">{category}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Required Fields Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-heading text-2xl text-foreground mb-6">Required Fields Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-optional-navy">
                  <th className="border border-foreground/10 px-6 py-4 text-left font-heading text-foreground">Field Name</th>
                  <th className="border border-foreground/10 px-6 py-4 text-left font-heading text-foreground">Type</th>
                  <th className="border border-foreground/10 px-6 py-4 text-left font-heading text-foreground">Example</th>
                </tr>
              </thead>
              <tbody>
                {requiredFields.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-optional-navy/30'}>
                    <td className="border border-foreground/10 px-6 py-4 font-paragraph text-foreground font-semibold">{row.field}</td>
                    <td className="border border-foreground/10 px-6 py-4 font-paragraph text-foreground/70">{row.type}</td>
                    <td className="border border-foreground/10 px-6 py-4 font-paragraph text-foreground/70 text-sm">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-optional-navy p-8 rounded">
            <div className="flex items-start gap-4 mb-4">
              <CheckCircle2 className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
              <h4 className="font-heading text-xl text-foreground">Best Practices</h4>
            </div>
            <ul className="space-y-3 font-paragraph text-foreground/80">
              <li>• Use descriptive titles with relevant keywords</li>
              <li>• Write summaries that hook readers (2-3 sentences)</li>
              <li>• Format content with proper paragraph breaks</li>
              <li>• Use high-quality thumbnail images (384x192px)</li>
              <li>• Include author information for credibility</li>
              <li>• Test PDF download links before publishing</li>
            </ul>
          </div>

          <div className="bg-optional-navy p-8 rounded">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
              <h4 className="font-heading text-xl text-foreground">Common Issues</h4>
            </div>
            <ul className="space-y-3 font-paragraph text-foreground/80">
              <li>• Publication not appearing? Refresh the page (Ctrl+F5)</li>
              <li>• PDF link broken? Verify URL is publicly accessible</li>
              <li>• Image not showing? Check image URL is correct</li>
              <li>• Content looks wrong? Use double line breaks between paragraphs</li>
              <li>• Missing fields? All required fields must be filled</li>
              <li>• Need help? Check the Publication Management Guide</li>
            </ul>
          </div>
        </motion.div>

        {/* CMS Access Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="font-paragraph text-foreground/70 mb-6">
            Ready to add a publication? Access the CMS database directly:
          </p>
          <a
            href="https://manage.wix.com/dashboard/d117d244-27df-418b-96f1-ab1ee29a2dc5/database"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-8 py-4 rounded text-lg transition-all hover:scale-105"
          >
            Open Publications Database
            <LinkIcon className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
