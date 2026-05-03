// Language translations - UI content only
// Publications, articles, and jurisprudence content are NOT translated

export type Language = 'EN' | 'FR' | 'AR';

export const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.strategic-advisory': 'Strategic Advisory',
    'nav.high-stakes-cases': 'High-Stakes Cases',
    'nav.expertise': 'Expertise',
    'nav.publications': 'Publications',
    'nav.training': 'Training',
    'nav.jurisprudence': 'Jurisprudence',
    'nav.global-presence': 'Global Presence',
    'nav.team': 'Our Team',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Header
    'header.book-consultation': 'Book Consultation',
    'header.cart': 'Cart',

    // Hero Section
    'hero.badge': 'Expertise Since 1990 • Global Presence',
    'hero.title': 'International Legal Strategy & Cross-Border Advisory',
    'hero.subtitle': 'Navigating complex legal environments. Delivering strategic solutions across jurisdictions for the world\'s most demanding clients.',
    'hero.cta-primary': 'Explore Our Services',
    'hero.cta-secondary': 'Schedule Consultation',

    // Global Presence
    'global.title': 'Global Presence',
    'global.subtitle': 'International offices across Lebanon and France',
    'global.section-title': 'Strategically Positioned Worldwide',
    'global.section-desc': 'With lawyers\' expertise spanning since the 1990s, JMC LEGAL has established a strategic presence across key jurisdictions in the Middle East and Europe. Our international network enables us to provide seamless legal services across borders, combining local expertise with global reach.',
    'global.network-title': 'Our International Network',
    'global.network-desc': 'Offices strategically located across key legal and business hubs',
    'global.contact-button': 'Contact',
    'global.support-text': 'International legal and business support',

    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'re here to help with your legal needs',
    'contact.form-name': 'Full Name',
    'contact.form-email': 'Email Address',
    'contact.form-phone': 'Phone Number',
    'contact.form-subject': 'Subject',
    'contact.form-message': 'Message',
    'contact.form-submit': 'Send Message',
    'contact.form-sending': 'Sending...',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Failed to send message. Please try again.',

    // Services/Expertise
    'expertise.corporate-law': 'Corporate Law',
    'expertise.corporate-desc': 'Cross-border M&A, restructuring, and corporate governance.',
    'expertise.contracts': 'Contracts',
    'expertise.contracts-desc': 'Complex international commercial agreements and negotiations.',
    'expertise.compliance': 'Compliance & Sanctions',
    'expertise.compliance-desc': 'Navigating global regulatory frameworks and trade sanctions.',
    'expertise.litigation': 'Litigation',
    'expertise.litigation-desc': 'High-stakes multi-jurisdictional dispute resolution.',
    'expertise.criminal': 'Criminal Law',
    'expertise.criminal-desc': 'White-collar crime, fraud, and international investigations.',
    'expertise.family': 'Family Law',
    'expertise.family-desc': 'International family disputes and wealth protection.',
    'expertise.ip': 'Intellectual Property',
    'expertise.ip-desc': 'Global IP strategy, registration, and enforcement.',
    'expertise.realestate': 'Real Estate',
    'expertise.realestate-desc': 'International property transactions and development.',

    // Footer
    'footer.about': 'Strategic & International Law — Lawyers\' expertise since the 1990s. Serving clients across Lebanon and France.',
    'footer.quick-links': 'Quick Links',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.email': 'contact@jmclex.com',
    'footer.phone-lebanon': '+961 78 873 196 (Lebanon)',
    'footer.phone-france': '+33 7 69 59 69 22 (France)',
  },

  FR: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.strategic-advisory': 'Conseil Stratégique',
    'nav.high-stakes-cases': 'Affaires Majeures',
    'nav.expertise': 'Expertise',
    'nav.publications': 'Publications',
    'nav.training': 'Formation',
    'nav.jurisprudence': 'Jurisprudence',
    'nav.global-presence': 'Présence Mondiale',
    'nav.team': 'Notre Équipe',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',

    // Header
    'header.book-consultation': 'Réserver une Consultation',
    'header.cart': 'Panier',

    // Hero Section
    'hero.badge': 'Expertise depuis 1990 • Présence Mondiale',
    'hero.title': 'Stratégie Juridique Internationale & Conseil Transfrontalier',
    'hero.subtitle': 'Naviguer dans les environnements juridiques complexes. Fournir des solutions stratégiques dans les juridictions pour les clients les plus exigeants du monde.',
    'hero.cta-primary': 'Explorez Nos Services',
    'hero.cta-secondary': 'Planifier une Consultation',

    // Global Presence
    'global.title': 'Présence Mondiale',
    'global.subtitle': 'Bureaux internationaux au Liban et en France',
    'global.section-title': 'Positionnés Stratégiquement dans le Monde',
    'global.section-desc': 'Avec une expertise juridique depuis les années 1990, JMC LEGAL a établi une présence stratégique dans les juridictions clés du Moyen-Orient et d\'Europe. Notre réseau international nous permet de fournir des services juridiques transparents au-delà des frontières, combinant l\'expertise locale avec la portée mondiale.',
    'global.network-title': 'Notre Réseau International',
    'global.network-desc': 'Bureaux stratégiquement situés dans les principaux centres juridiques et commerciaux',
    'global.contact-button': 'Contacter',
    'global.support-text': 'Support juridique et commercial international',

    // Contact Page
    'contact.title': 'Nous Contacter',
    'contact.subtitle': 'Nous sommes là pour vous aider avec vos besoins juridiques',
    'contact.form-name': 'Nom Complet',
    'contact.form-email': 'Adresse Email',
    'contact.form-phone': 'Numéro de Téléphone',
    'contact.form-subject': 'Sujet',
    'contact.form-message': 'Message',
    'contact.form-submit': 'Envoyer le Message',
    'contact.form-sending': 'Envoi...',
    'contact.success': 'Message envoyé avec succès!',
    'contact.error': 'Échec de l\'envoi du message. Veuillez réessayer.',

    // Services/Expertise
    'expertise.corporate-law': 'Droit Corporatif',
    'expertise.corporate-desc': 'Fusions-acquisitions transfrontalières, restructuration et gouvernance d\'entreprise.',
    'expertise.contracts': 'Contrats',
    'expertise.contracts-desc': 'Accords commerciaux internationaux complexes et négociations.',
    'expertise.compliance': 'Conformité & Sanctions',
    'expertise.compliance-desc': 'Navigation dans les cadres réglementaires mondiaux et les sanctions commerciales.',
    'expertise.litigation': 'Contentieux',
    'expertise.litigation-desc': 'Résolution de litiges multi-juridictionnels à enjeux élevés.',
    'expertise.criminal': 'Droit Pénal',
    'expertise.criminal-desc': 'Criminalité en col blanc, fraude et enquêtes internationales.',
    'expertise.family': 'Droit de la Famille',
    'expertise.family-desc': 'Litiges familiaux internationaux et protection du patrimoine.',
    'expertise.ip': 'Propriété Intellectuelle',
    'expertise.ip-desc': 'Stratégie mondiale de PI, enregistrement et application.',
    'expertise.realestate': 'Immobilier',
    'expertise.realestate-desc': 'Transactions immobilières internationales et développement.',

    // Footer
    'footer.about': 'Droit Stratégique & International — Expertise juridique depuis les années 1990. Servant les clients au Liban et en France.',
    'footer.quick-links': 'Liens Rapides',
    'footer.services': 'Services',
    'footer.company': 'Entreprise',
    'footer.contact': 'Contact',
    'footer.email': 'contact@jmclex.com',
    'footer.phone-lebanon': '+961 78 873 196 (Liban)',
    'footer.phone-france': '+33 7 69 59 69 22 (France)',
  },

  AR: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.strategic-advisory': 'الاستشارات الاستراتيجية',
    'nav.high-stakes-cases': 'القضايا الكبرى',
    'nav.expertise': 'الخبرات',
    'nav.publications': 'المنشورات',
    'nav.training': 'التدريب',
    'nav.jurisprudence': 'الاجتهاد القضائي',
    'nav.global-presence': 'الحضور العالمي',
    'nav.team': 'فريقنا',
    'nav.about': 'حول',
    'nav.contact': 'اتصل',

    // Header
    'header.book-consultation': 'احجز استشارة',
    'header.cart': 'السلة',

    // Hero Section
    'hero.badge': 'خبرة منذ 1990 • حضور عالمي',
    'hero.title': 'الاستراتيجية القانونية الدولية والاستشارات عبر الحدود',
    'hero.subtitle': 'التنقل في البيئات القانونية المعقدة. تقديم حلول استراتيجية عبر الولايات القضائية لأكثر العملاء تطلباً في العالم.',
    'hero.cta-primary': 'استكشف خدماتنا',
    'hero.cta-secondary': 'جدول استشارة',

    // Global Presence
    'global.title': 'الحضور العالمي',
    'global.subtitle': 'مكاتب دولية في لبنان وفرنسا',
    'global.section-title': 'موضع استراتيجي في جميع أنحاء العالم',
    'global.section-desc': 'مع خبرة قانونية منذ التسعينيات، أنشأت JMC LEGAL حضوراً استراتيجياً في الولايات القضائية الرئيسية في الشرق الأوسط وأوروبا. تمكننا شبكتنا الدولية من تقديم خدمات قانونية سلسة عبر الحدود، مما يجمع بين الخبرة المحلية والنطاق العالمي.',
    'global.network-title': 'شبكتنا الدولية',
    'global.network-desc': 'مكاتب موضوعة بشكل استراتيجي في مراكز قانونية وتجارية رئيسية',
    'global.contact-button': 'اتصل',
    'global.support-text': 'الدعم القانوني والتجاري الدولي',

    // Contact Page
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'نحن هنا لمساعدتك في احتياجاتك القانونية',
    'contact.form-name': 'الاسم الكامل',
    'contact.form-email': 'عنوان البريد الإلكتروني',
    'contact.form-phone': 'رقم الهاتف',
    'contact.form-subject': 'الموضوع',
    'contact.form-message': 'الرسالة',
    'contact.form-submit': 'إرسال الرسالة',
    'contact.form-sending': 'جاري الإرسال...',
    'contact.success': 'تم إرسال الرسالة بنجاح!',
    'contact.error': 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.',

    // Services/Expertise
    'expertise.corporate-law': 'القانون التجاري',
    'expertise.corporate-desc': 'الاندماجات والاستحواذات عبر الحدود وإعادة الهيكلة وحوكمة الشركات.',
    'expertise.contracts': 'العقود',
    'expertise.contracts-desc': 'الاتفاقيات التجارية الدولية المعقدة والمفاوضات.',
    'expertise.compliance': 'الامتثال والعقوبات',
    'expertise.compliance-desc': 'التنقل في الأطر التنظيمية العالمية والعقوبات التجارية.',
    'expertise.litigation': 'التقاضي',
    'expertise.litigation-desc': 'حل النزاعات متعددة الولايات القضائية عالية المخاطر.',
    'expertise.criminal': 'القانون الجنائي',
    'expertise.criminal-desc': 'جرائم الياقات البيضاء والاحتيال والتحقيقات الدولية.',
    'expertise.family': 'قانون الأسرة',
    'expertise.family-desc': 'النزاعات الأسرية الدولية وحماية الثروة.',
    'expertise.ip': 'الملكية الفكرية',
    'expertise.ip-desc': 'استراتيجية الملكية الفكرية العالمية والتسجيل والإنفاذ.',
    'expertise.realestate': 'العقارات',
    'expertise.realestate-desc': 'المعاملات العقارية الدولية والتطوير.',

    // Footer
    'footer.about': 'القانون الاستراتيجي والدولي — خبرة قانونية منذ التسعينيات. خدمة العملاء في لبنان وفرنسا.',
    'footer.quick-links': 'روابط سريعة',
    'footer.services': 'الخدمات',
    'footer.company': 'الشركة',
    'footer.contact': 'اتصل',
    'footer.email': 'contact@jmclex.com',
    'footer.phone-lebanon': '+961 78 873 196 (لبنان)',
    'footer.phone-france': '+33 7 69 59 69 22 (فرنسا)',
  },
};

export function getTranslation(language: Language, key: string): string {
  return translations[language][key] || translations['EN'][key] || key;
}
