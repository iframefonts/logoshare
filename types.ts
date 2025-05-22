// Represents the data structure of a logo document in Firestore
// No longer used as Firebase is removed. Kept for reference if needed later for other backends.
// export interface FirebaseLogoData {
//   id: string; // Document ID from Firestore
//   userId: string;
//   name: string;
//   description?: string;
//   clientName?: string;
//   categoryName?: string;
//   status: 'Draft' | 'Published';
//   style?: string;
//   imageUrl?: string; // URL from Firebase Storage
//   designer?: string;
//   studio?: string;
//   licencesDetails?: string;
//   isTrashed: boolean;
//   trashedAt?: any; // Was Firestore Timestamp
//   createdAt: any; // Was Firestore Timestamp
//   updatedAt: any; // Was Firestore Timestamp
  
//   colors: Array<{ name: string; hex_code: string }>; 
//   fonts: Array<{ name: string }>; 
//   tags?: string[]; 
// }


// Represents the transformed Logo structure used throughout the UI
export interface Logo {
  id: string;
  name: string;
  imageUrl: string; 
  fontsUsed: string[]; // Direct array of font names
  colors: Array<{ name: string; hex: string }>; // Direct array of color objects
  style?: string;
  client?: string; 
  categoryName: string;
  status: 'Draft' | 'Published';
  tags?: string[]; 
  designer?: string;
  studio?: string;
  licences?: string; 
  description?: string;
  createdAt?: string | Date; // Changed from any to string or Date
  externalLinks?: Array<{ name: string; url: string; }>;
}

// For "Add Logo" modal form data
export interface NewColorData {
  name: string;
  hex_code: string;
}

export interface NewFontData {
  name: string;
}

export interface NewExternalLinkData {
  name: string;
  url: string;
}

export interface NewLogoData {
  name: string;
  description?: string;
  clientName?: string;
  categoryName?: string;
  designer?: string;
  studio?: string;
  licencesDetails?: string;
  colors: NewColorData[];
  fonts: NewFontData[];
  externalLinks?: NewExternalLinkData[];
  // imageUrl will be handled locally or via a placeholder for now
  // status will be passed separately
}

// Removed NewFirebaseLogoData as it's specific to Firebase structure.
// The NewLogoData interface should be sufficient for form handling.