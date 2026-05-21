/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: consultationrequests
 * @catalog This collection is an eCommerce catalog
 * Interface for ConsultationRequests
 */
export interface ConsultationRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  clientEmail?: string;
  /** @wixFieldType text */
  clientPhone?: string;
  /** @wixFieldType text */
  caseDetails?: string;
  /** @wixFieldType date */
  preferredDate?: Date | string;
  /** @wixFieldType time */
  preferredTime?: any;
  /** @wixFieldType boolean */
  isPaid?: boolean;
}


/**
 * Collection ID: contactinquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phone?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  message?: string;
}


/**
 * Collection ID: executivetrainingapplications
 * Interface for ExecutiveTrainingApplications
 */
export interface ExecutiveTrainingApplications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phone?: string;
  /** @wixFieldType text */
  country?: string;
  /** @wixFieldType text */
  currentPosition?: string;
  /** @wixFieldType text */
  company?: string;
  /** @wixFieldType text */
  industry?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
  /** @wixFieldType text */
  selectedProgram?: string;
  /** @wixFieldType text */
  preferredLanguage?: string;
  /** @wixFieldType text */
  professionalObjectives?: string;
  /** @wixFieldType text */
  strategicMotivation?: string;
  /** @wixFieldType url */
  cvUpload?: string;
  /** @wixFieldType url */
  supportingDocuments?: string;
  /** @wixFieldType text */
  internalReviewStatus?: string;
}


/**
 * Collection ID: highstakescases
 * Interface for HighStakesCases
 */
export interface HighStakesCases {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  caseTitle?: string;
  /** @wixFieldType text */
  caseDescription?: string;
  /** @wixFieldType text */
  jurisdiction?: string;
  /** @wixFieldType text */
  caseOutcome?: string;
  /** @wixFieldType date */
  caseDate?: Date | string;
}


/**
 * Collection ID: jurisprudencedatabase
 * @catalog This collection is an eCommerce catalog
 * Interface for JurisprudenceDatabase
 */
export interface JurisprudenceDatabase {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType url */
  itemUrl?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  accessLevel?: string;
}


/**
 * Collection ID: legalexpertise
 * Interface for LegalExpertise
 */
export interface LegalExpertise {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  practiceAreaName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedContent?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  practiceAreaImage?: string;
  /** @wixFieldType text */
  relatedServices?: string;
  /** @wixFieldType text */
  slug?: string;
}


/**
 * Collection ID: officelocations
 * Interface for OfficeLocations
 */
export interface OfficeLocations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  city?: string;
  /** @wixFieldType text */
  country?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType number */
  latitude?: number;
  /** @wixFieldType number */
  longitude?: number;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType url */
  mapUrl?: string;
}


/**
 * Collection ID: publications
 * @catalog This collection is an eCommerce catalog
 * Interface for Publications
 */
export interface Publications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  language?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType url */
  pdfFile?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnailImage?: string;
}


/**
 * Collection ID: talentnetworkapplications
 * Interface for TalentNetworkApplications
 */
export interface TalentNetworkApplications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phone?: string;
  /** @wixFieldType text */
  country?: string;
  /** @wixFieldType text */
  languages?: string;
  /** @wixFieldType text */
  areaOfExpertise?: string;
  /** @wixFieldType url */
  linkedIn?: string;
  /** @wixFieldType url */
  website?: string;
  /** @wixFieldType url */
  cvUpload?: string;
  /** @wixFieldType url */
  supportingDocuments?: string;
  /** @wixFieldType text */
  professionalSummary?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
  /** @wixFieldType text */
  sourcePage?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  submissionType?: string;
}


/**
 * Collection ID: teammembers
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  region?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photo?: string;
  /** @wixFieldType text */
  expertise?: string;
  /** @wixFieldType text */
  background?: string;
  /** @wixFieldType text */
  contactEmail?: string;
}


/**
 * Collection ID: trainingcourses
 * @catalog This collection is an eCommerce catalog
 * Interface for TrainingCourses
 */
export interface TrainingCourses {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  duration?: string;
  /** @wixFieldType text */
  programType?: string;
  /** @wixFieldType text */
  strategicOutcomes?: string;
  /** @wixFieldType text */
  executiveCategory?: string;
  /** @wixFieldType text */
  certification?: string;
  /** @wixFieldType text */
  pricing?: string;
  /** @wixFieldType text */
  language?: string;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType text */
  level?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  certificationDetails?: string;
  /** @wixFieldType boolean */
  isSubscriptionAvailable?: boolean;
  /** @wixFieldType url */
  courseUrl?: string;
}
