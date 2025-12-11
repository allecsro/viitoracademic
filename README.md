# Viitor Academic Website

A modern academic website built with [Astro.js](https://astro.build) and [Tina CMS](https://tina.io) for content management.

## 🚀 Features

- **Astro.js** - Fast, modern static site generator
- **Tina CMS** - Visual content management system
- **TypeScript** - Type-safe development
- **Content Collections** - Organized content structure
- **Markdown Support** - Easy content authoring

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

**Note:** If you encounter issues with `better-sqlite3` requiring Python, you can install with:

```bash
npm install --ignore-scripts
```

For production use, you may need to install Python and build tools. See [Tina CMS documentation](https://tina.io/docs) for more details.

### 2. Start Development Server

```bash
npm run dev
```

This will start both Astro and Tina CMS development servers.

**Note:** If you encounter errors with Node.js v24+, the CLI has been updated to handle compatibility issues. If problems persist, you can run Astro and Tina separately:
- `npm run dev:astro` - Run only Astro
- `npm run dev:tina` - Run only Tina CMS

### 3. Access the Application

- **Website**: http://localhost:4321
- **Tina CMS Admin**: http://localhost:4321/admin/index.html

## 📁 Project Structure

```
/
├── .tina/                 # Tina CMS configuration
│   └── config.ts          # Content schema and CMS settings
├── content/               # Content files (managed by Tina CMS)
│   ├── posts/            # Blog posts
│   └── pages/            # Static pages
├── public/               # Static assets
├── src/
│   ├── content/         # Content collection schemas
│   │   └── config.ts
│   ├── layouts/         # Page layouts
│   ├── pages/           # Astro pages
│   │   ├── index.astro  # Homepage
│   │   ├── posts/       # Blog post pages
│   │   └── pages/       # Static page routes
│   └── components/      # Reusable components
└── package.json
```

## 📝 Content Management

### Using Tina CMS Admin

1. Navigate to http://localhost:4321/admin/index.html
2. You'll see collections for "Posts" and "Pages"
3. Click on any collection to view, edit, or create content
4. Changes are saved directly to your markdown files

### Content Collections

#### Posts
Located in `content/posts/`, posts support:
- Title
- Description
- Date
- Author
- Hero Image
- Rich text body

#### Pages
Located in `content/pages/`, pages support:
- Title
- Description
- Rich text body

### Manual Content Editing

You can also edit content files directly in the `content/` directory. Files are in Markdown format with frontmatter.

## ⚙️ Configuration

### Tina CMS Configuration

Edit `.tina/config.ts` to:
- Customize content collections
- Add new fields
- Configure media storage
- Set up authentication (for production)

### Astro Configuration

Edit `astro.config.mjs` to:
- Add integrations
- Configure build options
- Set up deployment settings

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with your static site.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Production

For production deployment with Tina CMS:

1. Set up Tina Cloud or self-host the Tina Data Layer
2. Configure `clientId` and `token` in `.tina/config.ts`
3. Deploy your site to your hosting provider (Vercel, Netlify, etc.)

See [Tina CMS Deployment Guide](https://tina.io/docs/frameworks/astro) for detailed instructions.

## 📚 Available Scripts

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts dev server with Tina CMS                  |
| `npm run build`        | Builds production site to `./dist/`              |
| `npm run preview`      | Preview production build locally                  |
| `npm run astro ...`    | Run Astro CLI commands                           |

---

Built with ❤️ using Astro.js and Tina CMS
