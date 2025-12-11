import { defineConfig } from "tinacms";

const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || process.env.BRANCH || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // Home Page Collection
      {
        name: "home",
        label: "Home Page",
        path: "src/content/pages/home",
        match: {
          include: "home.*",
        },
        fields: [
          {
            type: "string",
            name: "pageType",
            label: "Page Type",
            required: true,
            ui: {
              defaultValue: "home",
            },
          },
          {
            type: "string",
            name: "lang",
            label: "Language",
            required: true,
            options: [
              { label: "Romanian", value: "ro" },
              { label: "English", value: "en" },
            ],
            ui: {
              component: "select",
              defaultValue: "ro",
            },
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          // Hero Section
          {
            type: "string",
            name: "heroTitle",
            label: "Hero Title",
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
          },
          {
            type: "image",
            name: "heroImages",
            label: "Hero Section Images",
            list: true,
            description: "Add multiple images for the hero carousel",
          },
          {
            type: "string",
            name: "heroButton1Text",
            label: "Hero Button 1 Text",
          },
          {
            type: "string",
            name: "heroButton1Link",
            label: "Hero Button 1 Link",
          },
          {
            type: "string",
            name: "heroButton2Text",
            label: "Hero Button 2 Text",
          },
          {
            type: "string",
            name: "heroButton2Link",
            label: "Hero Button 2 Link",
          },
          // About Section
          {
            type: "string",
            name: "aboutTitle",
            label: "About Section Title",
          },
          {
            type: "string",
            name: "aboutContent",
            label: "About Section Content",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "aboutImage",
            label: "About Section Image",
          },
          // Mission & Vision
          {
            type: "string",
            name: "missionTitle",
            label: "Mission Title",
          },
          {
            type: "string",
            name: "missionContent",
            label: "Mission Content",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "missionImage",
            label: "Mission Section Image",
          },
          {
            type: "string",
            name: "visionTitle",
            label: "Vision Title",
          },
          {
            type: "string",
            name: "visionContent",
            label: "Vision Content",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "visionImage",
            label: "Vision Section Image",
          },
          // Projects Section
          {
            type: "string",
            name: "projectsTitle",
            label: "Projects Section Title",
          },
          {
            type: "string",
            name: "projectsSubtitle",
            label: "Projects Section Subtitle",
          },
          {
            type: "object",
            name: "projects",
            label: "Projects",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Project Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Project Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          // Initiatives Section
          {
            type: "string",
            name: "initiativesTitle",
            label: "Initiatives Section Title",
            description: "Main title for the Initiatives section (e.g., 'Our Initiatives')",
          },
          {
            type: "string",
            name: "initiativesSubtitle",
            label: "Initiatives Section Subtitle",
            description: "Subtitle or description text displayed below the title",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "initiatives",
            label: "Initiatives",
            description: "Add initiative cards to display in the 3D carousel",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Initiative Title",
                required: true,
                description: "Title of the initiative",
              },
              {
                type: "string",
                name: "location",
                label: "Location",
                required: true,
                description: "Location where the initiative takes place (e.g., 'Bucharest, Romania')",
              },
              {
                type: "string",
                name: "date",
                label: "Date",
                required: false,
                description: "Date of the initiative (e.g., 'November 15, 2025')",
              },
              {
                type: "image",
                name: "imageUrl",
                label: "Initiative Image",
                required: false,
                description: "Image displayed at the top of the initiative card",
              },
            ],
          },
          // Statistics Section
          {
            type: "object",
            name: "stats",
            label: "Statistics",
            list: true,
            fields: [
              {
                type: "number",
                name: "number",
                label: "Statistic Number",
                required: true,
              },
              {
                type: "string",
                name: "label",
                label: "Statistic Label",
                required: true,
              },
            ],
          },
          {
            type: "image",
            name: "statsBackgroundImage",
            label: "Statistics Section Background Image",
          },
          // Get Involved Section
          {
            type: "string",
            name: "getInvolvedTitle",
            label: "Get Involved Title",
            required: false,
          },
          {
            type: "string",
            name: "getInvolvedSubtitle",
            label: "Get Involved Subtitle",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          
          {
            type: "string",
            name: "getInvolvedWaysTitle",
            label: "Ways to Get Involved Title",
            description: "Title for the ways to get involved section (e.g., 'Ways to Get Involved')",
            required: false,
          },
          {
            type: "string",
            name: "getInvolvedWays",
            label: "Ways to Get Involved",
            required: false,
            list: true,
          },
          {
            type: "string",
            name: "getInvolvedMessage",
            label: "Get Involved Message",
            description: "Message displayed above contact information",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "contactUsTitle",
            label: "Contact Us Title",
            description: "Title for the contact section (e.g., 'Contact Us')",
            required: false,
          },
          {
            type: "string",
            name: "contactEmail",
            label: "Contact Email",
            required: false,
          },
          {
            type: "string",
            name: "contactPhone",
            label: "Contact Phone",
            description: "Phone number (e.g., 0721014857)",
            required: false,
            ui: {
              validate: (value: string) => {
                if (!value) return;
                // Ensure it's treated as a string by checking if it contains only digits
                if (!/^\d+$/.test(value)) {
                  return "Phone number must contain only digits";
                }
              },
            },
          },
          {
            type: "string",
            name: "donationButtonText",
            label: "Donation Button Text",
            required: false,
          },
          {
            type: "string",
            name: "donationButtonLink",
            label: "Donation Button Link",
            required: false,
          },
        ],
      },
      // Constant Pages Collection (Header and Footer combined)
      {
        name: "constantPages",
        label: "Constant Pages",
        path: "src/content/pages/constant",
        match: {
          include: "{header,footer}.*",
        },
        templates: [
          {
            name: "header",
            label: "Header",
            fields: [
              {
                type: "string",
                name: "_template",
                label: "Template",
                required: true,
                ui: {
                  defaultValue: "header",
                  component: "hidden",
                },
              },
              {
                type: "string",
                name: "pageType",
                label: "Page Type",
                required: true,
                ui: {
                  defaultValue: "header",
                  component: "hidden",
                },
              },
              {
                type: "string",
                name: "lang",
                label: "Language",
                required: true,
                options: [
                  { label: "Romanian", value: "ro" },
                  { label: "English", value: "en" },
                ],
                ui: {
                  component: "select",
                  defaultValue: "ro",
                },
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                isTitle: true,
                required: true,
              },
              {
                type: "image",
                name: "headerLogoImage",
                label: "Header Logo",
                description: "Logo image for the header/navbar (default logo shown after scrolling past hero section)",
              },
              {
                type: "image",
                name: "heroSectionLogo",
                label: "Hero Section Logo",
                description: "Logo image shown when in hero section (switches to header logo when scrolling to About Us)",
              },
              {
                type: "image",
                name: "mobileHamburgerLogo",
                label: "Mobile Hamburger Logo",
                description: "Logo image for the mobile hamburger menu (recommended: same as footer logo)",
              },
              {
                type: "string",
                name: "logoText",
                label: "Logo Text (Optional - not displayed)",
                description: "This field is kept for compatibility but text is not shown in header",
              },
              {
                type: "object",
                name: "navItems",
                label: "Navigation Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "path",
                    label: "Path",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "string",
                name: "_template",
                label: "Template",
                required: true,
                ui: {
                  defaultValue: "footer",
                  component: "hidden",
                },
              },
              {
                type: "string",
                name: "pageType",
                label: "Page Type",
                required: true,
                ui: {
                  defaultValue: "footer",
                  component: "hidden",
                },
              },
              {
                type: "string",
                name: "lang",
                label: "Language",
                required: true,
                options: [
                  { label: "Romanian", value: "ro" },
                  { label: "English", value: "en" },
                ],
                ui: {
                  component: "select",
                  defaultValue: "ro",
                },
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                isTitle: true,
                required: true,
              },
              {
                type: "image",
                name: "footerLogoImage",
                label: "Footer Logo",
                description: "Logo image for the footer (recommended: Logo.webp)",
              },
              {
                type: "string",
                name: "brandName",
                label: "Brand Name",
                description: "Organization name displayed beside the logo",
              },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
              },
              {
                type: "object",
                name: "quickLinks",
                label: "Quick Links",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "path",
                    label: "Path",
                    required: true,
                  },
                ],
              },
              {
                type: "object",
                name: "resources",
                label: "Resources",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "path",
                    label: "Path",
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      // SEO Metadata Collection
      {
        name: "seo",
        label: "SEO Metadata",
        path: "src/content/pages/seo",
        match: {
          include: "seo.*",
        },
        fields: [
          {
            type: "string",
            name: "pageType",
            label: "Page Type",
            required: true,
            ui: {
              defaultValue: "seo",
            },
          },

          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
            description: "Main title shown in browser tab and search results",
          },
          {
            type: "string",
            name: "metaTitle",
            label: "Meta Title",
            required: true,
            description: "SEO meta title (defaults to page title if not set)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            required: true,
            ui: {
              component: "textarea",
            },
            description: "Description shown in search results (optimal: 150-160 characters)",
          },
          // Open Graph / Facebook
          {
            type: "string",
            name: "ogType",
            label: "Open Graph Type",
            required: false,
            ui: {
              defaultValue: "website",
            },
            description: "Type of content (e.g., website, article)",
          },
          {
            type: "string",
            name: "ogUrl",
            label: "Open Graph URL",
            required: false,
            description: "Canonical URL of your website",
          },
          {
            type: "string",
            name: "ogTitle",
            label: "Open Graph Title",
            required: false,
            description: "Title for social media sharing (Facebook, LinkedIn, etc.)",
          },
          {
            type: "string",
            name: "ogDescription",
            label: "Open Graph Description",
            required: false,
            ui: {
              component: "textarea",
            },
            description: "Description for social media sharing",
          },
          {
            type: "image",
            name: "ogImage",
            label: "Open Graph Image",
            required: false,
            description: "Image shown when sharing on Facebook, LinkedIn (recommended: 1200x630px)",
          },
          // Twitter Card
          {
            type: "string",
            name: "twitterCard",
            label: "Twitter Card Type",
            required: false,
            ui: {
              defaultValue: "summary_large_image",
            },
            description: "Type of Twitter card (summary_large_image or summary)",
          },
          {
            type: "string",
            name: "twitterUrl",
            label: "Twitter URL",
            required: false,
            description: "URL for Twitter card",
          },
          {
            type: "string",
            name: "twitterTitle",
            label: "Twitter Title",
            required: false,
            description: "Title for Twitter card",
          },
          {
            type: "string",
            name: "twitterDescription",
            label: "Twitter Description",
            required: false,
            ui: {
              component: "textarea",
            },
            description: "Description for Twitter card",
          },
          {
            type: "image",
            name: "twitterImage",
            label: "Twitter Image",
            required: false,
            description: "Image for Twitter card (recommended: 1200x600px)",
          },
          // Favicon paths
          {
            type: "string",
            name: "faviconIco",
            label: "Favicon ICO Path",
            required: false,
            ui: {
              defaultValue: "/Images/favicon/favicon.ico",
            },
            description: "Path to favicon.ico file",
          },
          {
            type: "string",
            name: "favicon16",
            label: "Favicon 16x16 Path",
            required: false,
            ui: {
              defaultValue: "/Images/favicon/favicon-16x16.png",
            },
            description: "Path to 16x16 favicon",
          },
          {
            type: "string",
            name: "favicon32",
            label: "Favicon 32x32 Path",
            required: false,
            ui: {
              defaultValue: "/Images/favicon/favicon-32x32.png",
            },
            description: "Path to 32x32 favicon",
          },
          {
            type: "string",
            name: "favicon192",
            label: "Android Chrome 192x192 Path",
            required: false,
            ui: {
              defaultValue: "/Images/favicon/android-chrome-192x192.png",
            },
            description: "Path to 192x192 favicon for Android",
          },
          {
            type: "string",
            name: "favicon512",
            label: "Android Chrome 512x512 Path",
            required: false,
            ui: {
              defaultValue: "/Images/favicon/android-chrome-512x512.png",
            },
            description: "Path to 512x512 favicon for Android",
          },
          {
            type: "string",
            name: "appleTouchIcon",
            label: "Apple Touch Icon Path",
            required: false,
            ui: {
              defaultValue: "/Images/favicon/apple-touch-icon.png",
            },
            description: "Path to Apple touch icon (180x180)",
          },
        ],
      },
    ],
  },
});
