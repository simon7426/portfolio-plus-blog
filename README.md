# simonislam.com

Personal site built with Astro. Deployed to Cloudflare Pages.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run check
```

## Project Structure

```txt
src/
├── components/          # Reusable UI components
│   ├── BaseHead.astro       # SEO meta component (unused, kept for reference)
│   ├── Footer.astro         # Site footer
│   ├── Header.astro         # Site navigation
│   ├── NewsletterSignup.astro  # Newsletter placeholder
│   ├── PostCard.astro       # Post preview card
│   └── ThemeToggle.astro    # Dark/light mode toggle
├── content/
│   └── writing/           # Blog posts (markdown)
│       └── welcome.md         # Sample post
├── layouts/
│   ├── BaseLayout.astro   # Base HTML shell
│   └── PostLayout.astro   # Post page layout
├── pages/
│   ├── index.astro        # Home page
│   ├── about.astro        # About page
│   ├── resume.astro       # Resume page
│   ├── rss.xml.ts         # RSS feed
│   ├── writing/
│   │   ├── index.astro        # Post listing
│   │   └── [...slug].astro    # Individual post
│   └── tags/
│       └── [tag].astro    # Tag filtering
├── styles/
│   └── global.css         # Global styles + dark mode
└── utils/
    └── reading-time.ts    # Reading time calculator
```

## Adding a New Post

1. Create a markdown file in `src/content/writing/`
2. Use this frontmatter:

    ```yaml
    ---
    title: "Your Post Title"
    description: "A brief description (optional)"
    date: 2025-01-15
    updatedDate: 2025-01-20  # optional
    tags: ["architecture", "cloud"]
    draft: false  # set to true to hide
    ---
    ```

3. Write your content in markdown below the frontmatter
4. Commit and push, the site will rebuild automatically

## Writing Markdown

Standard markdown is supported:

- `# Headings` for sections
- `**bold**` and `*italic*` for emphasis
- `[links](url)` for hyperlinks
- Code blocks with language hints:

\`\`\`python
def hello():
    print("Hello, world!")
\`\`\`

- Blockquotes with `>`
- Lists with `-` or `*`

## Newsletter

The newsletter section is a placeholder. To connect a provider:

1. Open `src/components/NewsletterSignup.astro`
2. Replace the disabled form with your provider's embed code
3. Supported providers: Buttondown, Beehiiv, Substack

## Deployment

### Cloudflare Pages (Recommended)

#### Option 1: Direct Git integration

1. Push this repo to GitHub
2. Go to Cloudflare Dashboard → Pages → Create a project
3. Connect your GitHub repo
4. Build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Add your custom domain.

#### Option 2: Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist
```

### Custom Domain

1. In Cloudflare Pages, go to your project → Custom domains
2. Add Custom Domain
3. Update your DNS records in Cloudflare to point to Pages

## RSS Feed

Automatically generated at `/rss.xml`. Updates whenever a new post is published.

## Sitemap

Automatically generated at `/sitemap-index.xml`. Includes all published posts and pages.

## Theme

- Light and dark mode supported
- Respects system preference by default
- Toggle saves to localStorage
- Monochrome palette, no accent colors

## Typography

- Body: Georgia, Times New Roman (serif)
- UI: System sans-serif
- Code: SF Mono, Fira Code, Menlo (monospace)
- Content width: ~65ch for comfortable reading
