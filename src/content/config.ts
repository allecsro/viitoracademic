import { defineCollection, z } from "astro:content";

// Navigation item schema
const navItemSchema = z.object({
  name: z.string(),
  path: z.string(),
});

// Use a regular union instead of discriminated union to avoid render() issues
// All fields are optional except pageType, title, and pageType-specific required fields
const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pageType: z.enum(["home", "standard", "header", "footer", "seo"]),
  // Language code used to pick localized content (e.g., "ro" or "en")
  lang: z.enum(["ro", "en"]).optional(),
  
  // SEO Metadata fields (optional, used when pageType is "seo")
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogType: z.string().optional(),
  ogUrl: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  twitterCard: z.string().optional(),
  twitterUrl: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  faviconIco: z.string().optional(),
  favicon16: z.string().optional(),
  favicon32: z.string().optional(),
  favicon192: z.string().optional(),
  favicon512: z.string().optional(),
  appleTouchIcon: z.string().optional(),
  
  // Home page fields (optional, but required when pageType is "home")
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  heroImages: z.array(z.string()).optional(),
  heroButton1Text: z.string().optional(),
  heroButton1Link: z.string().optional(),
  heroButton2Text: z.string().optional(),
  heroButton2Link: z.string().optional(),
  featuresTitle: z.string().optional(),
  featuresSubtitle: z.string().optional(),
  feature1Title: z.string().optional(),
  feature1Description: z.string().optional(),
  feature2Title: z.string().optional(),
  feature2Description: z.string().optional(),
  feature3Title: z.string().optional(),
  feature3Description: z.string().optional(),
  ctaTitle: z.string().optional(),
  ctaSubtitle: z.string().optional(),
  ctaButton1Text: z.string().optional(),
  ctaButton1Link: z.string().optional(),
  ctaButton2Text: z.string().optional(),
  ctaButton2Link: z.string().optional(),
  
  // About Section
  aboutTitle: z.string().optional(),
  aboutContent: z.string().optional(),
  aboutImage: z.string().optional(),
  
  // Mission Section
  missionTitle: z.string().optional(),
  missionContent: z.string().optional(),
  missionImage: z.string().optional(),
  
  // Vision Section
  visionTitle: z.string().optional(),
  visionContent: z.string().optional(),
  visionImage: z.string().optional(),
  
  // Statistics Section
  stats: z.array(z.object({
    number: z.number(),
    label: z.string(),
  })).optional(),
  statsBackgroundImage: z.string().optional(),
  
  // Projects Section
  projectsTitle: z.string().optional(),
  projectsSubtitle: z.string().optional(),
  projects: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).optional(),

  // Initiatives Section
  initiativesTitle: z.string().optional(),
  initiativesSubtitle: z.string().optional(),
  initiatives: z.array(z.object({
    title: z.string(),
    location: z.string(),
    date: z.string().optional(),
    imageUrl: z.string().optional(),
  })).optional(),

  // Get Involved Section
  getInvolvedTitle: z.string().optional(),
  getInvolvedSubtitle: z.string().optional(),
  getInvolvedWaysTitle: z.string().optional(),
  getInvolvedWays: z.array(z.string()).optional(),
  getInvolvedMessage: z.string().optional(),
  contactUsTitle: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.preprocess(
    (val) => {
      // Convert number to string if YAML auto-converted it
      // If it's a number and has 9 digits, assume it should have a leading zero (10-digit phone)
      if (typeof val === 'number') {
        const numStr = val.toString();
        // If it's exactly 9 digits, pad with leading zero (assuming 10-digit phone numbers)
        if (numStr.length === 9) {
          return '0' + numStr;
        }
        return numStr;
      }
      return val;
    },
    z.string().optional()
  ),
  donationButtonText: z.string().optional(),
  donationButtonLink: z.string().optional(),
  
  // Template field for TinaCMS
  _template: z.string().optional(),
  
  // Header fields (optional, but used when pageType is "header")
  logoText: z.string().optional(),
  headerLogoImage: z.string().optional(),
  heroSectionLogo: z.string().optional(),
  mobileHamburgerLogo: z.string().optional(),
  navItems: z.array(navItemSchema).optional(),
  adminButtonText: z.string().optional(),
  adminButtonLink: z.string().optional(),
  
  // Footer fields (optional, but used when pageType is "footer")
  footerLogoImage: z.string().optional(),
  brandName: z.string().optional(),
  tagline: z.string().optional(),
  quickLinks: z.array(navItemSchema).optional(),
  resources: z.array(navItemSchema).optional(),
});

const pagesCollection = defineCollection({
  type: "content",
  schema: pageSchema,
});

export const collections = {
  pages: pagesCollection,
};
