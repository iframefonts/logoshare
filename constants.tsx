
import React from 'react';
import { Logo } from './types'; 

export const APP_TITLE = "LOGOSHARE"; // Updated from "myLogo"

// Constants for sidebar navigation items
export const NAV_ITEMS = ["Projects", "Recent", "Starred", "Trash", "Admin"];


export const SAMPLE_LOGOS: Logo[] = [
  {
    id: "1",
    name: "NovaTech Solutions", 
    client: "Innovate Corp",    
    categoryName: "Technology",
    status: "Published",
    imageUrl: "https://picsum.photos/seed/novatech/400/300", // Larger image for preview
    fontsUsed: ["Montserrat", "Roboto"],
    colors: [{ name: "Primary Blue", hex: "#4A55A2" }, { name: "Accent Gray", hex: "#808080" }],
    style: "Tech",
    tags: ["technology", "software", "innovation"],
    designer: "Jane Doe",
    studio: "Innovate Design Labs",
    licences: "Exclusive Commercial Use",
    externalLinks: [
      { name: "Project Brief", url: "https://example.com/novatech-brief" },
      { name: "Moodboard", url: "https://example.com/novatech-moodboard" }
    ]
  },
  {
    id: "2",
    name: "GreenLeaf Organics",
    client: "Earthly Goods",
    categoryName: "Retail",
    status: "Draft",
    imageUrl: "https://picsum.photos/seed/greenleaf/400/300",
    fontsUsed: ["Playfair Display", "Lato"],
    colors: [{ name: "Forest Green", hex: "#228B22" }, { name: "Warm Brown", hex: "#A52A2A" }],
    style: "Vintage",
    tags: ["organic", "nature", "health"],
    designer: "John Smith",
    studio: "Root & Branch",
    licences: "Internal Use Only",
    externalLinks: [],
  },
  {
    id: "3",
    name: "Apex Fitness",
    client: "GymNation",
    categoryName: "Health & Fitness",
    status: "Published",
    imageUrl: "https://picsum.photos/seed/apexfit/400/300",
    fontsUsed: ["Bebas Neue", "Open Sans"],
    colors: [{ name: "Dynamic Red", hex: "#FF0000" }, { name: "Power Black", hex: "#000000" }],
    style: "Modern",
    tags: ["fitness", "sport", "energy"],
    designer: "Alice Brown",
    studio: "Peak Performance Design",
    licences: "Standard Commercial License",
    externalLinks: [
      { name: "Brand Guidelines", url: "https://example.com/apex-guidelines"}
    ],
  },
  {
    id: "4",
    name: "The Cozy Corner Cafe",
    client: "Local Brews",
    categoryName: "Food & Beverage",
    status: "Published",
    imageUrl: "https://picsum.photos/seed/cozycafe/400/300",
    fontsUsed: ["Lobster", "Merriweather"],
    colors: [{ name: "Coffee Brown", hex: "#6F4E37" }, { name: "Cream Orange", hex: "#FFA500" }],
    style: "Playful",
    tags: ["cafe", "coffee", "bakery"],
    designer: "Emily White",
    studio: "Sweet Beans Creative",
    licences: "Web & Print License",
  },
  {
    id: "5",
    name: "Quantum Dynamics",
    client: "Future Systems",
    categoryName: "Science",
    status: "Draft",
    imageUrl: "https://picsum.photos/seed/quantumdyn/400/300",
    fontsUsed: ["Orbitron", "Exo 2"],
    colors: [{ name: "Nebula Purple", hex: "#8A2BE2" }, { name: "Cyber Teal", hex: "#008080" }],
    style: "Abstract",
    tags: ["science", "research", "futuristic"],
    designer: "Dr. Quantum",
    studio: "Particle Studios",
    licences: "Research & Development",
  },
  {
    id: "6",
    name: "Minimaluxe Interiors",
    client: "Design Spaces",
    categoryName: "Design",
    status: "Published",
    imageUrl: "https://picsum.photos/seed/minimaluxe/400/300",
    fontsUsed: ["Helvetica Neue", "Arial"],
    colors: [{ name: "Pure White", hex: "#FFFFFF" }, { name: "Charcoal Gray", hex: "#36454F" }],
    style: "Minimalist",
    tags: ["interior", "design", "simple"],
    designer: "Clara Minimalist",
    studio: "Less Is More Inc.",
    licences: "Full Copyright Transfer",
  },
    {
    id: "7",
    name: "Global Connect",
    client: "Worldwide Inc.",
    categoryName: "Services",
    status: "Published",
    imageUrl: "https://picsum.photos/seed/globalconn/400/300",
    fontsUsed: ["Ubuntu", "Noto Sans"],
    colors: [{ name: "Ocean Blue", hex: "#0077BE" }, { name: "Leaf Green", hex: "#2E8B57" }],
    style: "Corporate",
    tags: ["global", "network", "communication"],
    designer: "David Network",
    studio: "Connect Solutions",
    licences: "Global Usage Rights",
  },
  {
    id: "8",
    name: "Artisan Bakery Co.",
    client: "Artisan Goods",
    categoryName: "Food & Beverage",
    status: "Draft",
    imageUrl: "https://picsum.photos/seed/artisanbake/400/300",
    fontsUsed: ["Sacramento", "Raleway"],
    colors: [{ name: "Pastel Pink", hex: "#FFD1DC" }, { name: "Chocolate Brown", hex: "#7B3F00" }],
    style: "Vintage",
    tags: ["bakery", "handmade", "artisan"],
    designer: "Bella Baker",
    studio: "The Flour Pot",
    licences: "Local Business License",
  },
  {
    id: "9",
    name: "Cyber Secure",
    client: "SecureNet",
    categoryName: "Technology",
    status: "Published",
    imageUrl: "https://picsum.photos/seed/cybersec/400/300",
    fontsUsed: ["Agency FB", "Consolas"],
    colors: [{ name: "Matrix Black", hex: "#000000" }, { name: "Electric Blue", hex: "#00FFFF" }],
    style: "Tech",
    tags: ["security", "cyber", "data"],
    designer: "Alex Hacker",
    studio: "Digital Fortress",
    licences: "Software and Digital Use",
  },
];

// --- SVG Icons ---

// Updated AppLogoIcon to display "LOGOSHARE" text
export const AppLogoIcon: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => (
  <svg 
    viewBox="0 0 160 30" // Adjusted viewBox for text "LOGOSHARE"
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label={APP_TITLE} // Uses the updated APP_TITLE
  >
    <title>{APP_TITLE}</title> {/* Uses the updated APP_TITLE */}
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontFamily="Roboto, Arial, sans-serif" // Font to match app style
      fontSize="22" // Font size to fit well within viewBox height of 30
      fontWeight="700" // Bold
      fill="currentColor" // Inherits color (e.g., text-primary from Header.tsx)
      letterSpacing="0.5" // Optional: for better readability
    >
      LOGOSHARE
    </text>
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
  </svg>
);

export const FontIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m3 0V9.75M12 12v2.25m0-4.5V9m1.5 3.75V12m-3 0V12m1.5-1.5H12m-1.5 0H9" />
  </svg>
);

export const ColorSwatchIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.457c0-.79-.64-1.43-1.43-1.43h-5.457a1.43 1.43 0 0 1-1.43-1.43V6.75" />
  </svg>
);

export const TagIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M3 2.75A.75.75 0 0 1 3.75 2h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 3 2.75Z" />
    <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 1 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
);

export const ClientIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-3.741-5.74M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 0 1 3-3h1.5M12 15.75V18m0 0H9m12 0h-3m-6.375 0H12m0 0h3.625m0 0V15.75m0 0v-2.438M15.75 15.75v-2.438" />
  </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

export const MinusIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
  </svg>
);

export const Bars3Icon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5A.75.75 0 012.75 14h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 14.75z" clipRule="evenodd" />
  </svg>
);

export const Squares2X2Icon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.25 3A1.25 1.25 0 003 4.25v2.5A1.25 1.25 0 004.25 8h2.5A1.25 1.25 0 008 6.75v-2.5A1.25 1.25 0 006.75 3h-2.5zm0 9A1.25 1.25 0 003 13.25v2.5A1.25 1.25 0 004.25 17h2.5A1.25 1.25 0 008 15.75v-2.5A1.25 1.25 0 006.75 12h-2.5zm9-9A1.25 1.25 0 0012 4.25v2.5A1.25 1.25 0 0013.25 8h2.5A1.25 1.25 0 0017 6.75v-2.5A1.25 1.25 0 0015.75 3h-2.5zm0 9A1.25 1.25 0 0012 13.25v2.5A1.25 1.25 0 0013.25 17h2.5A1.25 1.25 0 0017 15.75v-2.5A1.25 1.25 0 0015.75 12h-2.5z" clipRule="evenodd" />
  </svg>
);

export const EllipsisHorizontalIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
);


export const UploadIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.75 5.75 0 011.044 11.09A4.501 4.501 0 0112 19.5h-5.25z" />
    </svg>
);

export const LinkIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

export const ClipboardDocumentIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a8.25 8.25 0 01-7.5 7.5H2.25A2.25 2.25 0 010 13.5v-3A2.25 2.25 0 012.25 8.25h1.5M16.5 7.5H18a2.25 2.25 0 012.25 2.25v7.5A2.25 2.25 0 0118 19.5h-3.75A2.25 2.25 0 0112 17.25V15m3.75-7.5H12v-1.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v1.5A2.25 2.25 0 0115.75 7.5z" />
  </svg>
);

export const EnvelopeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);