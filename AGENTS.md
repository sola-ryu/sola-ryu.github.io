# sola-ryu.github.io — Agent Guide

Astro static blog and portfolio site, deployed to GitHub Pages.

---

## Quick Reference

```bash
npm run dev       # start dev server at localhost:4321
npm run build     # static build → dist/
npm run preview   # preview the built output locally
```

---

## Adding a Blog Post

1. Create `src/content/blog/<slug>.md` (or `.mdx`)
2. Frontmatter schema:

```yaml
---
title: "Post Title"
description: "One-line summary for the blog index listing."
date: 2026-05-24T00:00:00-07:00
draft: false
tags:
  - Tag One
  - Tag Two
coverImage: "/path/to/cover.jpg"   # optional
---
```

3. Write the body in Markdown (or MDX).

### Cover / Hero Images

Generate cover images for posts when they'd add value — not every post needs one. Guidelines:

- **Style:** Match the site's palette (dark background, purple accent `#a78bfa`, muted tones). Keep it consistent with the overall aesthetic.
- **Aspect ratio:** 16:9 or 2:1. The hero sits above the title on the post page.
- **Mood over literal illustration:** Abstract, atmospheric, or conceptual beats literal depictions. Think "feeling" not "diagram."
- **Avoid text in images.** The title handles that. Let the image set tone.
- **Save to** `src/assets/blog-images/<slug>-cover.png` — Astro auto-optimizes at build time.
- **Frontmatter:** `coverImage: "/assets/blog-images/<slug>-cover.png"`

When in doubt, skip it. The site is content-first, low noise. A bad cover is worse than no cover.

### Image handling

- **Blog images** → put in `src/assets/blog-images/`, reference as `/assets/blog-images/filename.png`
- **Post-specific images** (picture books, multi-page galleries) → put in `src/assets/<slug-slug>/`, reference as `/assets/<slug-slug>/filename.png`
- Astro automatically optimizes images in `src/` at build time — no manual processing needed
- **Cover images** for posts go in frontmatter as `coverImage: "/assets/blog-images/..."` (see above)
- **Legacy assets** (favicon, avatar) remain in `public/`
4. Run `npm run build` to verify.
5. Git commit and push.

The routing is automatic — the file becomes `/blog/<slug>/`.

---

## Key Files

| Path | Purpose |
|---|---|
| `astro.config.mjs` | Site config, GitHub Pages base detection, Tailwind plugin |
| `src/content.config.ts` | Content collection schema (blog) |
| `src/pages/index.astro` | Homepage |
| `src/pages/blog/index.astro` | Blog listing page |
| `src/pages/blog/[...slug].astro` | Individual post page — renders via `<rendered.Content />` |
| `src/layouts/Layout.astro` | Page shell, global styles, theme tokens |
| `tailwind.config.ts` | Tailwind v4 theme config (dark-only palette) |
| `public/` | Static assets (images, favicon) |

---

## Code Conventions

- **Astro 6** with content collections. Post rendering uses `<rendered.Content />` — never `{Astro.jsx(Content, null)}` or `dangerouslySetInnerHTML`. That was the bug that broke post rendering in May 2026; the correct API is the component returned by `render()`.
- **Tailwind v4** via `@tailwindcss/vite`. No `node_modules/tailwindcss` class-by-class — use the Vite plugin.
- **Dark mode only.** The site uses CSS custom properties in `@theme` blocks in Layout.astro. Don't add a light theme toggle unless explicitly requested.
- **No client hydration** for static content. Partial hydration only if interactivity is required.
- **GitHub Pages:** astro.config.mjs auto-detects the repo name and sets the correct `base` path. No manual config needed.

---

## Common Tasks

### Fix a broken build
```bash
npm run build 2>&1 | tail -40
```
Look for content collection errors, missing imports, or rendering failures. Check `src/content.config.ts` matches actual file paths.

### Change the palette
Edit the `@theme` block in `src/layouts/Layout.astro`. All colors are CSS custom properties scoped there.

### Add a new page
Create `src/pages/<path>.astro`, import Layout, and wrap content in `<Layout title="...">`. No extra routing config needed.

### Deploy
Push to `main` — GitHub Actions handles the build and deploy via the workflow in `.github/workflows/`.

---

## Known Issues / Notes

- **Post rendering bug (fixed 2026-05-24):** `[...slug].astro` had `{Astro.jsx(Content, null)}` but `Content` was never destructured from `render()`. Fixed by using `<rendered.Content />`.
- **Build uses npm**, not bun (package-lock.json is the lockfile).
- **Image generation assets** live in `~/.openclaw/media/tool-image-generation/` — copy to `src/assets/blog-images/` before referencing in posts.
- **Migrated 2026-05-24:** All blog images moved from `public/` to `src/assets/` for Astro auto-optimization. Old `public/images/blog-images/` and `public/blog/` directories are no longer used.
