# Publication Management Guide - Self-Service Instructions

## Overview
This guide explains how to add new publications to your website independently without requiring developer assistance. All publications are managed through the Wix CMS database.

---

## Quick Start: Adding a New Publication

### Step 1: Prepare Your Content
Before adding a publication to the CMS, gather the following information:

```
✓ Publication Title (e.g., "International Sanctions Compliance Framework")
✓ Author Name (e.g., "JMC LEX Legal Team")
✓ Publication Date (e.g., 2026-05-21)
✓ Category (e.g., "Compliance & AML", "AI Governance", "Corporate Governance")
✓ Summary/Abstract (2-3 sentences describing the publication)
✓ Full Content/Article Text (the complete article or key points)
✓ PDF File (uploaded and ready)
✓ Thumbnail Image (cover image, recommended: 384x192px or similar)
✓ Language (e.g., "English")
✓ Price (if applicable, e.g., 0 for free, or 29.99 for paid)
```

---

## Step 2: Upload PDF File

### Option A: Using Wix Media Manager (Recommended)
1. Go to your Wix Dashboard: https://manage.wix.com/dashboard
2. Navigate to **Media** → **Files**
3. Click **Upload Files**
4. Select your PDF file
5. Once uploaded, **copy the file URL** (right-click → Copy Link)
6. Save this URL - you'll need it in Step 3

### Option B: Using External Storage
- If you prefer to host the PDF elsewhere (Google Drive, Dropbox, etc.), get the direct download link
- Ensure the link is publicly accessible
- Use this URL in the CMS

---

## Step 3: Add Publication to CMS Database

### Access the CMS Database
1. Go to: https://manage.wix.com/dashboard/d117d244-27df-418b-96f1-ab1ee29a2dc5/database
2. Click on **"Publications"** collection
3. Click **"Add Item"** button

### Fill in the Publication Fields

| Field | Type | Example | Required |
|-------|------|---------|----------|
| **title** | Text | "International Sanctions Compliance Framework" | ✓ Yes |
| **author** | Text | "JMC LEX Legal Team" | ✓ Yes |
| **publicationDate** | Date | 2026-05-21 | ✓ Yes |
| **category** | Text | "Compliance & AML" | ✓ Yes |
| **summary** | Text | "A comprehensive guide to international sanctions compliance..." | ✓ Yes |
| **content** | Text | Full article text (can be long) | ✓ Yes |
| **pdfFile** | URL | https://example.com/publication.pdf | ✓ Yes |
| **thumbnailImage** | Image | Upload or paste image URL | ✓ Yes |
| **language** | Text | "English" | Optional |
| **price** | Number | 0 (free) or 29.99 | Optional |

### Featured Categories (For Display Priority)
The following categories are highlighted on the Publications page:
- **Compliance & AML**
- **AI Governance**
- **Corporate Governance**
- **Sanctions & Export Controls**

Use these categories when possible for better visibility.

---

## Step 4: Verify Publication Appears on Website

1. Go to your website's **Publications page**: `/publications`
2. Search for your publication by title
3. Filter by category to find it
4. Click on the publication to view the detail page
5. Verify:
   - ✓ Title displays correctly
   - ✓ Author and date are shown
   - ✓ Summary appears in the grid
   - ✓ Thumbnail image loads
   - ✓ PDF download button works
   - ✓ Full content displays on detail page

---

## Content Structure Best Practices

### Writing the Summary
- **Length**: 2-3 sentences (50-150 words)
- **Purpose**: Hook readers and summarize the main topic
- **Example**: "This publication explores the evolving landscape of international sanctions compliance, providing practical guidance for multinational corporations navigating complex regulatory frameworks across multiple jurisdictions."

### Writing the Full Content
- **Format**: Plain text with paragraph breaks (use double line breaks between sections)
- **Structure**: 
  - Introduction (what is this about?)
  - Key Points (3-5 main takeaways)
  - Implementation Guidance (how to apply this)
  - Conclusion (summary and next steps)
- **Length**: 500-3000 words recommended
- **Example Format**:
```
Introduction paragraph here.

Key Point 1: Explanation of first major point.

Key Point 2: Explanation of second major point.

Implementation Guidance: How organizations should respond.

Conclusion: Summary and call to action.
```

### Thumbnail Image Guidelines
- **Recommended Size**: 384x192px (2:1 aspect ratio)
- **Format**: JPG or PNG
- **Content**: Professional design, relevant to topic
- **Where to Get**:
  - Design yourself using Canva, Figma, or similar
  - Use stock images from Unsplash, Pexels, or Pixabay
  - Commission a designer

---

## Category Reference

### Existing Categories in Your System
- Compliance & AML
- AI Governance
- Corporate Governance
- Sanctions & Export Controls
- International Law
- Cross-Border Transactions
- Regulatory Updates
- Case Studies

### Adding New Categories
1. Simply type a new category name in the CMS
2. It will automatically appear as a filter option on the Publications page
3. No code changes needed

---

## Troubleshooting

### Publication doesn't appear on the website
- **Check**: Is the publication marked as published in the CMS?
- **Check**: Did you fill in all required fields (title, author, date, category, summary, content, pdfFile)?
- **Solution**: Refresh the website page (Ctrl+F5 or Cmd+Shift+R)

### PDF download link doesn't work
- **Check**: Is the PDF URL correct and publicly accessible?
- **Test**: Try opening the URL directly in your browser
- **Solution**: Re-upload the PDF and get a fresh URL

### Thumbnail image not showing
- **Check**: Is the image URL correct?
- **Check**: Is the image publicly accessible?
- **Solution**: Re-upload the image through Wix Media Manager

### Publication appears but content looks wrong
- **Check**: Did you use proper paragraph breaks (double line breaks)?
- **Solution**: Edit the publication and reformat the content with proper spacing

---

## Advanced: Bulk Upload Multiple Publications

If you have multiple publications to add:

1. **Prepare a spreadsheet** with all publication data
2. **Contact support** or use Wix's bulk import feature (if available)
3. **Or**: Add them one by one using the steps above

---

## SEO Optimization Tips

To improve search visibility for your publications:

1. **Use descriptive titles** that include relevant keywords
2. **Write detailed summaries** (150+ words) with keywords naturally included
3. **Use appropriate categories** that match search intent
4. **Include author information** for credibility
5. **Use high-quality thumbnail images** for better click-through rates

---

## Direct CMS Access

**Publications Database URL:**
https://manage.wix.com/dashboard/d117d244-27df-418b-96f1-ab1ee29a2dc5/database

**Collection Name:** Publications

**Fields Available:**
- title (Text)
- author (Text)
- publicationDate (Date)
- category (Text)
- summary (Text)
- content (Text)
- pdfFile (URL)
- thumbnailImage (Image)
- language (Text)
- price (Number)

---

## Example: Complete Publication Entry

Here's a complete example of how to fill in a publication:

```
Title: "AI Governance in Financial Services: Regulatory Framework & Implementation"

Author: "JMC LEX Regulatory Team"

Publication Date: 2026-05-21

Category: "AI Governance"

Summary: "As artificial intelligence becomes increasingly integrated into financial services, regulators worldwide are establishing new governance frameworks. This publication provides a comprehensive overview of current AI governance requirements, implementation best practices, and strategic recommendations for financial institutions navigating this evolving landscape."

Content: "
Introduction
Artificial intelligence is transforming financial services, from algorithmic trading to customer service automation. However, rapid AI adoption has outpaced regulatory development, creating compliance challenges for institutions.

Key Regulatory Developments
The EU AI Act establishes a risk-based framework for AI systems. Financial institutions must conduct impact assessments for high-risk AI applications. The SEC has issued guidance on algorithmic trading oversight. The Federal Reserve emphasizes third-party AI vendor management.

Implementation Strategy
1. Conduct AI inventory: Document all AI systems in use
2. Risk assessment: Classify systems by risk level
3. Governance structure: Establish AI oversight committee
4. Vendor management: Implement third-party AI vendor controls
5. Monitoring: Establish ongoing compliance monitoring

Conclusion
Organizations that proactively implement AI governance frameworks will be better positioned to manage regulatory risk and maintain competitive advantage in the evolving financial services landscape.
"

PDF File: https://example.com/ai-governance-financial-services.pdf

Thumbnail Image: https://example.com/ai-governance-thumbnail.jpg

Language: English

Price: 0 (free) or 29.99 (if paid)
```

---

## Questions or Issues?

If you encounter any problems:
1. Check the troubleshooting section above
2. Review the field requirements table
3. Verify all URLs are correct and publicly accessible
4. Contact your development team for technical issues

---

## Summary Checklist

Before publishing a new publication, verify:

- [ ] Title is clear and descriptive
- [ ] Author name is included
- [ ] Publication date is set
- [ ] Category is selected (preferably from featured categories)
- [ ] Summary is 2-3 sentences
- [ ] Full content is well-formatted with paragraph breaks
- [ ] PDF file URL is correct and accessible
- [ ] Thumbnail image is uploaded and displays correctly
- [ ] Language is specified
- [ ] Price is set (0 for free)
- [ ] Publication appears on the website
- [ ] All links work correctly
- [ ] Content displays properly on detail page

---

**Last Updated:** 2026-05-21
**Version:** 1.0
