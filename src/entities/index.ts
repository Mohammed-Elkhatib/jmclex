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
 * Interface for Publications
 */
export interface Publications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
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
  itemName?: string;
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
