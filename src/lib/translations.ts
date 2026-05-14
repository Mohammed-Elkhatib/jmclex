// Language translations - UI content only
// Publications, articles, and jurisprudence content are NOT translated

export type Language = 'EN' | 'FR' | 'AR' | 'ZH';

export const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.strategic-advisory': 'Strategic Advisory',
    'nav.high-stakes-cases': 'High-Stakes Cases',
    'nav.expertise': 'Expertise',
    'nav.publications': 'Publications',
    'nav.training': 'Training Center',
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
    'hero.standard-consultation': 'Standard: Book a Consultation',
    'hero.emergency-consultation': 'Emergency: Request Emergency Legal Assistance',

    // Global Presence
    'global.title': 'Global Presence',
    'global.subtitle': 'International offices across Lebanon and France',
    'global.section-title': 'Strategically Positioned Worldwide',
    'global.section-desc': 'With lawyers\' expertise spanning since the 1990s, JMC LEX has established a strategic presence across key jurisdictions in the Middle East and Europe. Our international network enables us to provide seamless legal services across borders, combining local expertise with global reach.',
    'global.network-title': 'Our International Network',
    'global.network-desc': 'Offices strategically located across key legal and business hubs',
    'global.contact-button': 'Contact',
    'global.support-text': 'International legal and business support',

    // Co-founder Section
    'cofounder.title': 'Meet Our Co-Founder',
    'cofounder.name': 'Me Antoine Y. S.',
    'cofounder.role': 'Co-Founder & Senior Legal Counsel',
    'cofounder.bio': 'With decades of experience in international law and cross-border advisory, Me Antoine Y. S. leads our firm\'s strategic vision and ensures the highest standards of legal excellence across all engagements.',

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

    // Consultation Form
    'consultation.title': 'Book Your Consultation',
    'consultation.standard': 'Standard Consultation',
    'consultation.emergency': 'Emergency Consultation',
    'consultation.priority-request': 'Priority Request',
    'consultation.form-name': 'Full Name',
    'consultation.form-email': 'Email Address',
    'consultation.form-phone': 'Phone Number',
    'consultation.form-details': 'Case Details',
    'consultation.form-date': 'Preferred Date',
    'consultation.form-time': 'Preferred Time',
    'consultation.form-submit': 'Submit Consultation Request',
    'consultation.form-add-to-cart': 'Add to Cart',
    'consultation.price': 'Consultation Fee',

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
    'nav.training': 'Centre de Formation',
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
    'hero.standard-consultation': 'Standard : Réserver une Consultation',
    'hero.emergency-consultation': 'Urgence : Demander une Assistance Juridique d\'Urgence',

    // Global Presence
    'global.title': 'Présence Mondiale',
    'global.subtitle': 'Bureaux internationaux au Liban et en France',
    'global.section-title': 'Positionnés Stratégiquement dans le Monde',
    'global.section-desc': 'Avec une expertise juridique depuis les années 1990, JMC LEX a établi une présence stratégique dans les juridictions clés du Moyen-Orient et d\'Europe. Notre réseau international nous permet de fournir des services juridiques transparents au-delà des frontières, combinant l\'expertise locale avec la portée mondiale.',
    'global.network-title': 'Notre Réseau International',
    'global.network-desc': 'Bureaux stratégiquement situés dans les principaux centres juridiques et commerciaux',
    'global.contact-button': 'Contacter',
    'global.support-text': 'Support juridique et commercial international',

    // Co-founder Section
    'cofounder.title': 'Rencontrez Notre Co-Fondateur',
    'cofounder.name': 'Me Antoine Y. S.',
    'cofounder.role': 'Co-Fondateur & Conseil Juridique Principal',
    'cofounder.bio': 'Avec des décennies d\'expérience en droit international et en conseil transfrontalier, Me Antoine Y. S. dirige la vision stratégique de notre cabinet et assure les plus hauts standards d\'excellence juridique dans tous les engagements.',

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

    // Consultation Form
    'consultation.title': 'Réserver Votre Consultation',
    'consultation.standard': 'Consultation Standard',
    'consultation.emergency': 'Consultation d\'Urgence',
    'consultation.priority-request': 'Demande Prioritaire',
    'consultation.form-name': 'Nom Complet',
    'consultation.form-email': 'Adresse Email',
    'consultation.form-phone': 'Numéro de Téléphone',
    'consultation.form-details': 'Détails du Dossier',
    'consultation.form-date': 'Date Préférée',
    'consultation.form-time': 'Heure Préférée',
    'consultation.form-submit': 'Soumettre la Demande de Consultation',
    'consultation.form-add-to-cart': 'Ajouter au Panier',
    'consultation.price': 'Frais de Consultation',

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
    'hero.standard-consultation': 'قياسي: احجز استشارة',
    'hero.emergency-consultation': 'طوارئ: اطلب مساعدة قانونية طارئة',

    // Global Presence
    'global.title': 'الحضور العالمي والشبكة الدولية',
    'global.subtitle': 'مكاتب استراتيجية في منطقة EMEA — لبنان وفرنسا والولايات القضائية الدولية الرئيسية',
    'global.section-title': 'حضور قانوني دولي متميز',
    'global.section-desc': 'مع خبرة قانونية منذ التسعينيات، أنشأت JMC LEX حضوراً دولياً متطوراً في الولايات القضائية الرئيسية في الشرق الأوسط وأوروبا. تمكننا شبكتنا الاستراتيجية من تقديم خدمات قانونية سلسة عبر الحدود، مما يجمع بين الخبرة المحلية العميقة والنطاق العالمي والموضع الاستراتيجي الدولي.',
    'global.network-title': 'شبكتنا الاستراتيجية الدولية',
    'global.network-desc': 'مكاتب متميزة موضوعة بشكل استراتيجي في مراكز قانونية وتجارية ومالية رئيسية',
    'global.contact-button': 'اتصل',
    'global.support-text': 'الدعم القانوني والتجاري الدولي',

    // Co-founder Section
    'cofounder.title': 'تعرف على مؤسسنا المشارك',
    'cofounder.name': 'Me Antoine Y. S.',
    'cofounder.role': 'المؤسس المشارك والمستشار القانوني الأول',
    'cofounder.bio': 'مع عقود من الخبرة في القانون الدولي والاستشارات عبر الحدود، يقود Me Antoine Y. S. الرؤية الاستراتيجية لمكتبنا ويضمن أعلى معايير التميز القانوني في جميع الالتزامات.',

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

    // Consultation Form
    'consultation.title': 'احجز استشارتك',
    'consultation.standard': 'استشارة قياسية',
    'consultation.emergency': 'استشارة طارئة',
    'consultation.priority-request': 'طلب أولوية',
    'consultation.form-name': 'الاسم الكامل',
    'consultation.form-email': 'عنوان البريد الإلكتروني',
    'consultation.form-phone': 'رقم الهاتف',
    'consultation.form-details': 'تفاصيل القضية',
    'consultation.form-date': 'التاريخ المفضل',
    'consultation.form-time': 'الوقت المفضل',
    'consultation.form-submit': 'إرسال طلب الاستشارة',
    'consultation.form-add-to-cart': 'أضف إلى السلة',
    'consultation.price': 'رسوم الاستشارة',

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

  ZH: {
    // Navigation
    'nav.home': '首页',
    'nav.strategic-advisory': '战略咨询',
    'nav.high-stakes-cases': '重大案件',
    'nav.expertise': '专业领域',
    'nav.publications': '出版物',
    'nav.training': '培训中心',
    'nav.jurisprudence': '判例法',
    'nav.global-presence': '全球业务',
    'nav.team': '我们的团队',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',

    // Header
    'header.book-consultation': '预约咨询',
    'header.cart': '购物车',

    // Hero Section
    'hero.badge': '自1990年以来的专业经验 • 全球业务',
    'hero.title': '国际法律战略与跨境咨询',
    'hero.subtitle': '在复杂的法律环境中导航。为全球最具挑战性的客户提供跨司法管辖区的战略解决方案。',
    'hero.standard-consultation': '标准：预约咨询',
    'hero.emergency-consultation': '紧急：请求紧急法律援助',

    // Global Presence
    'global.title': '全球业务与国际网络',
    'global.subtitle': '战略性办事处遍布EMEA地区 — 黎巴嫩、法国和主要国际司法管辖区',
    'global.section-title': '高端国际法律服务',
    'global.section-desc': '自1990年代以来，JMC LEX在中东和欧洲的主要司法管辖区建立了精良的国际地位。我们的战略网络提供无缝的跨境法律服务，融合深厚的本地专业知识、全球影响力和国际战略定位。',
    'global.network-title': '我们的国际战略网络',
    'global.network-desc': '在主要法律、商业和金融中心战略性地设置的高端办事处',
    'global.contact-button': '联系我们',
    'global.support-text': '国际法律和商业支持',

    // Co-founder Section
    'cofounder.title': '认识我们的联合创始人',
    'cofounder.name': 'Me Antoine Y. S.',
    'cofounder.role': '联合创始人兼首席法律顾问',
    'cofounder.bio': '拥有数十年国际法律和跨境咨询经验，Me Antoine Y. S.领导我们事务所的战略愿景，并确保在所有业务中保持最高的法律卓越标准。',

    // Contact Page
    'contact.title': '联系我们',
    'contact.subtitle': '我们在这里帮助您解决法律需求',
    'contact.form-name': '全名',
    'contact.form-email': '电子邮件地址',
    'contact.form-phone': '电话号码',
    'contact.form-subject': '主题',
    'contact.form-message': '消息',
    'contact.form-submit': '发送消息',
    'contact.form-sending': '发送中...',
    'contact.success': '消息发送成功！',
    'contact.error': '消息发送失败。请重试。',

    // Consultation Form
    'consultation.title': '预约您的咨询',
    'consultation.standard': '标准咨询',
    'consultation.emergency': '紧急咨询',
    'consultation.priority-request': '优先请求',
    'consultation.form-name': '全名',
    'consultation.form-email': '电子邮件地址',
    'consultation.form-phone': '电话号码',
    'consultation.form-details': '案件详情',
    'consultation.form-date': '首选日期',
    'consultation.form-time': '首选时间',
    'consultation.form-submit': '提交咨询请求',
    'consultation.form-add-to-cart': '添加到购物车',
    'consultation.price': '咨询费用',

    // Services/Expertise
    'expertise.corporate-law': '公司法',
    'expertise.corporate-desc': '跨境并购、重组和公司治理。',
    'expertise.contracts': '合同',
    'expertise.contracts-desc': '复杂的国际商业协议和谈判。',
    'expertise.compliance': '合规与制裁',
    'expertise.compliance-desc': '在全球监管框架和贸易制裁中导航。',
    'expertise.litigation': '诉讼',
    'expertise.litigation-desc': '高风险多司法管辖区纠纷解决。',
    'expertise.criminal': '刑法',
    'expertise.criminal-desc': '白领犯罪、欺诈和国际调查。',
    'expertise.family': '家庭法',
    'expertise.family-desc': '国际家庭纠纷和财富保护。',
    'expertise.ip': '知识产权',
    'expertise.ip-desc': '全球知识产权战略、注册和执法。',
    'expertise.realestate': '房地产',
    'expertise.realestate-desc': '国际房地产交易和开发。',

    // Footer
    'footer.about': '战略与国际法律 — 自1990年代以来的法律专业经验。为黎巴嫩和法国的客户服务。',
    'footer.quick-links': '快速链接',
    'footer.services': '服务',
    'footer.company': '公司',
    'footer.contact': '联系',
    'footer.email': 'contact@jmclex.com',
    'footer.phone-lebanon': '+961 78 873 196 (黎巴嫩)',
    'footer.phone-france': '+33 7 69 59 69 22 (法国)',
  },
};

export function getTranslation(language: Language, key: string): string {
  return translations[language][key] || translations['EN'][key] || key;
}
