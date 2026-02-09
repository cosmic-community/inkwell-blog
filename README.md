# Inkwell Blog

![Inkwell Blog](https://imgix.cosmicjs.com/350d6010-0569-11f1-bc2b-43ecd007e1aa-photo-1677442135703-1787eea5ce01-1770608484444.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautifully crafted, dark-mode-first blog platform built with Next.js 16 and Cosmic. Features responsive mobile navigation, dark/light mode toggle, category filtering, author profiles, and rich markdown content rendering — all powered by your Cosmic CMS content.

## Features

- 🌗 **Dark/Light Mode** — System-aware toggle with localStorage persistence
- 📱 **Responsive Mobile Nav** — Animated slide-in drawer with backdrop blur
- 📖 **Rich Markdown** — Beautiful typography for long-form reading
- 🏷️ **Category Pages** — Browse posts by topic
- ✍️ **Author Profiles** — Individual author pages with bios and post lists
- ⚡ **Server Components** — Lightning-fast loads with Next.js 16 App Router
- 🎨 **Warm Amber Palette** — Premium editorial aesthetic
- 🔍 **SEO Optimized** — Dynamic metadata for every page

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=698956f72969b137670cad3d&clone_repository=6989588a2969b137670cadab)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a complete content model for: A blog with posts, categories, authors

Use the install_content_model action to create ALL object types AND demo content in one step. Include:
1. All necessary object types with appropriate metafields
2. 2-3 demo objects for each type with realistic content
3. Unsplash image URLs for thumbnails and file metafields (use real URLs like https://images.unsplash.com/photo-...)

Remember to create types that are referenced by others FIRST (e.g., categories and authors before blog posts)."

### Code Generation Prompt

> "Next.js, responsive, mobile nav, dark mode"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering
- [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub Flavored Markdown support

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the blog content model installed

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd inkwell-blog

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start the development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Posts with Connected Objects

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with author and category data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching a Single Post by Slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

## Cosmic CMS Integration

This blog uses three Cosmic object types:

| Type | Fields | Description |
|------|--------|-------------|
| **Posts** | content (markdown), featured_image (file), excerpt (textarea), author (object), category (object) | Blog articles |
| **Authors** | name (text), bio (textarea), profile_photo (file), social_link (text) | Writer profiles |
| **Categories** | name (text), description (textarea) | Topic organization |

All posts reference authors and categories via object metafields, fetched with `depth(1)` for nested data.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables in the Netlify dashboard
5. Deploy!

<!-- README_END -->