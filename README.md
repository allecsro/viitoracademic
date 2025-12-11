# Viitor Academic Website

A modern, high-performance academic website built with [Astro](https://astro.build) and [TinaCMS](https://tina.io). This project leverages the power of static site generation for speed and SEO, while providing a user-friendly content management system for easy updates.

## 🚀 Tech Stack

- **Framework:** [Astro v5](https://astro.build) - Content-focused web framework.
- **CMS:** [TinaCMS](https://tina.io) - Git-backed headless CMS.
- **UI Library:** [React v19](https://react.dev) - For interactive components.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) - Utility-first CSS framework (via `@tailwindcss/vite`).
- **Animations:** [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library.
- **Icons:** [Lucide React](https://lucide.dev) - Beautiful & consistent icons.
- **Carousel:** [Embla Carousel](https://www.embla-carousel.com) - Lightweight carousel library.
- **Deployment:** [GitHub Pages](https://pages.github.com) - Hosting via GitHub Actions.

## � Project Structure

```bash
vittor-academic-main/
├── .github/workflows/   # GitHub Actions (CI/CD)
│   └── static.yml       # Deployment workflow for GitHub Pages
├── .tina/               # TinaCMS Configuration
│   └── config.ts        # Content schema definition (Collections, Fields)
├── public/              # Static assets (images, favicons)
├── src/
│   ├── assets/          # Source assets (processed by Vite)
│   ├── components/      # Reusable React & Astro components
│   ├── content/         # Content collections (managed by TinaCMS)
│   ├── layouts/         # Page layouts
│   └── pages/           # Astro pages (routing)
├── astro.config.mjs     # Astro configuration
├── package.json         # Project dependencies & scripts
└── tailwind.config.mjs  # Tailwind CSS configuration
```

## 🛠️ Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v20 or higher (v22+ recommended).
- **npm**: Comes with Node.js.

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vittor-academic-main
```

### 2. Install Dependencies

```bash
npm install
```

_Tip: If you encounter errors related to `better-sqlite3`, try running `npm install --ignore-scripts`._

### 3. Run Development Server

To start both the Astro dev server and the TinaCMS server concurrently:

```bash
npm run dev
```

- **Website:** [http://localhost:3000](http://localhost:3000)
- **CMS Admin:** [http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html) (or port 3001 depending on output)

### Other Scripts

| Command              | Description                                         |
| :------------------- | :-------------------------------------------------- |
| `npm run dev:astro`  | Run only the Astro development server.              |
| `npm run dev:tina`   | Run only the TinaCMS development server.            |
| `npm run build`      | Build the project for production (TinaCMS + Astro). |
| `npm run build:site` | Build only the Astro site (used in CI/CD).          |
| `npm run preview`    | Preview the production build locally.               |
| `npm run lint`       | Run ESLint to check for code issues.                |

## 📝 Content Management (TinaCMS)

The website content is managed via TinaCMS. To edit content:

1.  Run the development server (`npm run dev`).
2.  Navigate to `http://localhost:3001/admin/index.html` in your browser.
3.  Enter the editing mode to modify:
    - **Home Page:** Hero section, About, Mission/Vision, Projects, Initiatives, Stats.
    - **Constant Pages:** Header (Logo, Nav items) and Footer (Links, Contact info).
    - **SEO Metadata:** Global SEO settings, Open Graph tags, and Favicons.

Configuration for content models can be found in `.tina/config.ts`.

## 🚢 Deployment

The project is configured to perform a static export and deploy to **GitHub Pages** automatically.

**Workflow:** `.github/workflows/static.yml`
**Trigger:** Pushes to the `revamp` branch.

To deploy manually or update the live site:

1.  Ensure your code is committed.
2.  Push changes to the `revamp` branch:
    ```bash
    git push origin revamp
    ```
3.  Monitor the "Actions" tab in your GitHub repository for the build status.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
