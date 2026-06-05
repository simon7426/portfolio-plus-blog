---
title: "Markdown Reference"
description: "A showcase of all markdown features supported on this site."
date: 2026-06-04
tags: ["meta", "reference"]
draft: true
---

This page demonstrates every markdown feature available on this site. Use it as a reference when writing new posts.

## Headings

Headings are rendered with descending visual weight. The post title is `h1`, so content headings start at `h2`.

## Text Formatting

You can write **bold text**, *italic text*, and ~~strikethrough~~. You can also combine them: **bold with *italic* inside**.

Inline code looks like `this` and uses a monospace font with a subtle background.

## Links

Links are underlined with a colored border that changes on hover:

- [External link](https://example.com)
- [Internal link](/about)
- [Email link](mailto:test@example.com)

## Lists

### Unordered Lists

Simple bullet list:

- First item
- Second item
- Third item

List with bold prefixes:

- **Architecture**: System design decisions, tradeoffs, and patterns
- **Cloud Infrastructure**: GPU computing, multi-region deployments, Kubernetes
- **Distributed Systems**: Messaging, consistency, scaling challenges
- **Career Notes**: Lessons from building products from MVP to thousands of users

### Ordered Lists

Numbered lists render with decimal markers:

1. Define the problem
2. Research existing solutions
3. Design the architecture
4. Implement incrementally
5. Test and iterate

### Nested Lists

Lists can be nested to any depth:

- Backend
  - API layer
    - REST endpoints
    - GraphQL schema
  - Database
    - PostgreSQL
    - Redis cache
- Frontend
  - Components
  - State management
  - Routing

### Mixed Lists

You can mix ordered and unordered lists:

1. First step
   - Sub-task A
   - Sub-task B
2. Second step
   - Sub-task C
   - Sub-task D

## Blockquotes

Single paragraph quote:

> Writing forces clarity. You don't know what you think until you try to explain it.

Multi-paragraph quote:

> The first paragraph of a blockquote sets the tone. It should be concise and impactful.
>
> The second paragraph can elaborate on the idea, providing context or additional perspective that builds on the opening statement.

Nested quotes:

> Outer quote level.
>
> > Inner quote level. This creates a visual hierarchy of quoted material.
>
> Back to outer level.

## Code Blocks

Code blocks with syntax highlighting:

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'version': '1.0.0',
        'timestamp': datetime.utcnow().isoformat()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

```javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

```bash
# Deploy to Cloudflare Pages
npm run build
wrangler pages deploy dist
```

Inline code within text: Run `npm run build` to compile the site, then `wrangler pages deploy dist` to publish.

## Tables

Tables render with borders and a highlighted header row:

| Service | Region | Instances | CPU | Memory |
|---------|--------|-----------|-----|--------|
| API Gateway | us-east-1 | 3 | 2 vCPU | 4 GB |
| Worker Pool | us-east-1 | 12 | 4 vCPU | 8 GB |
| Redis Cache | us-east-1 | 2 | 1 vCPU | 2 GB |
| PostgreSQL | us-east-1 | 1 | 8 vCPU | 32 GB |

Empty cells and varying content widths are handled gracefully:

| Feature | Status | Notes |
|---------|--------|-------|
| Dark mode | Done | |
| RSS feed | Done | Auto-generated |
| Newsletter | Planned | Buttondown, Beehiiv, Substack |
| Search | Planned | Client-side with Fuse.js |

## Horizontal Rules

Visual separators between sections:

---

The rule above creates a clean break. Useful for separating distinct thoughts within a post.

---

## Images

Images are responsive and centered:

![Placeholder image description](https://placehold.co/800x400/1a1a1a/ffffff?text=Image+Placeholder)

*Image captions can be added as italic text below the image.*

## Combining Elements

Here's how different elements flow together:

A paragraph introducing a list:

- **First point** with explanation
- **Second point** with more detail
  - Sub-point A
  - Sub-point B

A paragraph transitioning to a code example:

```python
def calculate_metrics(data):
    """Process raw data and return aggregated metrics."""
    return {
        'count': len(data),
        'average': sum(data) / len(data) if data else 0,
        'max': max(data) if data else None,
    }
```

Followed by a quote that summarizes the idea:

> Good code is its own best documentation. When you need to explain what the code does, start by asking if the code could be clearer.

And a table for reference:

| Metric | Formula | Example |
|--------|---------|---------|
| Count | `len(data)` | 1,247 |
| Average | `sum / count` | 42.3 |
| Max | `max(data)` | 99.8 |

## Frontmatter

Every post starts with YAML frontmatter:

```yaml
---
title: "Your Post Title"
description: "A brief description for SEO and previews"
date: 2026-01-15
updatedDate: 2026-01-20
tags: ["tag1", "tag2"]
draft: false
---
```

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title, shown in listings |
| `description` | No | SEO meta description, shown in post cards |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `updatedDate` | No | Last update date |
| `tags` | No | Array of tags for filtering |
| `draft` | No | Set to `true` to hide from listings |

---

That covers everything. Write your posts in `src/content/writing/*.md` and they'll appear automatically.
