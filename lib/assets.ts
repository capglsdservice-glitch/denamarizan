
/**
 * Centralized image configuration.
 * Store all photos inside /public/images/
 * Reference them using paths starting with /images/
 */

export type ImageAsset = {
  src: string | null;
  alt: string;
  tone: "blush" | "rose" | "champagne" | "burgundy" | "cherry";
  caption: string;
};

export const assets: Record<string, ImageAsset> = {
  // HERO SECTION
  heroPortrait: {
    src: "/images/dena-hero.jpg",
    alt: "Dena Marizan smiling in a professional portrait",
    tone: "blush",
    caption: "Dena's hero portrait",
  },

  // ABOUT SECTION
  aboutPortrait: {
    src: "/images/dena-about.jpg",
    alt: "Dena Marizan in a natural editorial portrait",
    tone: "champagne",
    caption: "Dena's about portrait",
  },

  // PHILOSOPHY / APPROACH SECTION
  philosophy1: {
    src: "/images/philosophy-worth.jpg",
    alt: "Editorial photograph representing knowing your worth",
    tone: "rose",
    caption: "Know your worth",
  },

  philosophy2: {
    src: "/images/philosophy-intention.jpg",
    alt: "Editorial photograph representing intentional dating",
    tone: "champagne",
    caption: "Date with intention",
  },

  philosophy3: {
    src: "/images/philosophy-choose.jpg",
    alt: "Editorial photograph representing choosing differently",
    tone: "burgundy",
    caption: "Choose differently",
  },
};

// --------------------------------------------------
// INSTAGRAM GALLERY
// --------------------------------------------------

export type GalleryItem = {
  id: string;
  kind: "Portrait" | "Dating advice" | "Lifestyle" | "Inspiration" | "Reel";
  title: string;
  note: string;
  aspect:
    | "aspect-[4/5]"
    | "aspect-square"
    | "aspect-[3/4]"
    | "aspect-[9/14]"
    | "aspect-[4/3]";
  tone: ImageAsset["tone"];
  src: string | null;
  postUrl: string | null;
};

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    kind: "Portrait",
    title: "Meet Dena",
    note: "A little introduction to Dena Marizan.",
    aspect: "aspect-[3/4]",
    tone: "blush",
    src: "/images/gallery-1.jpg",
    postUrl: null,
  },

  {
    id: "g2",
    kind: "Dating advice",
    title: "Know Your Worth",
    note: "Remember your value and never settle for less.",
    aspect: "aspect-square",
    tone: "burgundy",
    src: "/images/gallery-2.jpg",
    postUrl: null,
  },

  {
    id: "g3",
    kind: "Reel",
    title: "Dating Conversations",
    note: "A preview from Dena's short-form video content.",
    aspect: "aspect-[9/14]",
    tone: "cherry",
    src: "/images/gallery-3.jpg",
    postUrl: null,
  },

  {
    id: "g4",
    kind: "Lifestyle",
    title: "Life Beyond Dating",
    note: "A glimpse into Dena's everyday lifestyle.",
    aspect: "aspect-[4/5]",
    tone: "champagne",
    src: "/images/gallery-4.jpg",
    postUrl: null,
  },

  {
    id: "g5",
    kind: "Inspiration",
    title: "Choose Yourself",
    note: "A reminder to put your happiness and confidence first.",
    aspect: "aspect-square",
    tone: "rose",
    src: "/images/gallery-5.jpg",
    postUrl: null,
  },

  {
    id: "g6",
    kind: "Portrait",
    title: "Confidence Looks Good",
    note: "Another portrait of Dena Marizan.",
    aspect: "aspect-[4/5]",
    tone: "rose",
    src: "/images/gallery-6.jpg",
    postUrl: null,
  },

  {
    id: "g7",
    kind: "Reel",
    title: "Real Dating Advice",
    note: "A preview from another Dena Marizan reel.",
    aspect: "aspect-[9/14]",
    tone: "blush",
    src: "/images/gallery-7.jpg",
    postUrl: null,
  },

  {
    id: "g8",
    kind: "Dating advice",
    title: "Date With Intention",
    note: "Choose relationships that align with your values.",
    aspect: "aspect-[4/3]",
    tone: "champagne",
    src: "/images/gallery-8.jpg",
    postUrl: null,
  },
];
