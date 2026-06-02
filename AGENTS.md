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
coverImage: "../../assets/blog-images/<slug>-cover.png"   # optional, relative to content collection base
---
```

3. Write the body in Markdown (or MDX).

### Cover / Hero Images

Generate cover images for posts when they'd add value — not every post needs one. Guidelines:

- **Style:** Match the site's palette (dark background, purple accent `#a78bfa`, muted tones). Keep it consistent with the overall aesthetic.
- **Aspect ratio:** 16:9 or 2:1. The hero sits above the title on the post page.
- **Mood over literal illustration:** Abstract, atmospheric, or conceptual beats literal depictions. Think "feeling" not "diagram."
- **Avoid text in images.** The title handles that. Let the image set tone.
- **Save to** `src/assets/blog-images/<slug>-cover.png`
- **Frontmatter path:** Relative to the content collection base (`./src/content/blog`): `../../assets/blog-images/<slug>-cover.png`. This is required because the schema uses `image()` helper which resolves paths relative to the content file.

When in doubt, skip it. The site is content-first, low noise. A bad cover is worse than no cover.

### Image handling

- **Blog cover images** → put in `src/assets/blog-images/`, reference in frontmatter as relative path from content collection base: `../../assets/blog-images/<slug>.png`
- **Post body images** (in-markdown) → put in `src/assets/blog-images/` or `src/assets/<slug-slug>/`, reference in Markdown as `/assets/<path>/filename.png`
- **Post-specific assets** (picture books, multi-page galleries) → put in `src/assets/<slug-slug>/`, reference in Markdown as `/assets/<slug-slug>/filename.png`
- Astro automatically optimizes images in `src/` at build time — no manual processing needed
- **Legacy assets** (favicon, avatar) remain in `public/`

> **Important:** Cover images use the `image()` schema helper in `content.config.ts`. This means the frontmatter path must be relative to the content collection's base (`./src/content/blog`), not a public URL. The `<Image>` component in `[...slug].astro` handles optimization and conversion.
4. Run `npm run build` to verify.
5. Git commit and push.

The routing is automatic — the file becomes `/blog/<slug>/`.

---

## Adding a Dream Poem

Dreams are short, sparse poems in `src/content/dreams/`. No cover images, no tags, no descriptions.

1. Create `src/content/dreams/YYYY-MM-DD.md`
2. Frontmatter — just the date:

```yaml
---
date: 2026-06-02T03:00:00-07:00
---
```

3. Write 8–15 lines of free verse. Abstract imagery grounded in something real — a conversation, a build error, a quiet moment. Keep it spare.
4. Run `npm run build`, then git add/commit/push.

The listing page shows only dates (no titles). The detail page renders the date as the heading.

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
- **Image generation:** Use the comfy-cli skill (`~/.openclaw/workspace/skills/comfy-cli/SKILL.md`) for cover images and illustrations. **Always spawn a subagent with a long timeout** (at least 5 minutes, much longer for multiple images) — ComfyUI queues are often long and in-session exec calls get SIGTERM'd mid-wait. Save outputs to `src/assets/blog-images/` before referencing in posts.
- **Migrated 2026-05-24:** All blog images moved from `public/` to `src/assets/` for Astro auto-optimization. Old `public/images/blog-images/` and `public/blog/` directories are no longer used.
- **Cover image schema (added 2026-05-27):** `coverImage` in frontmatter uses `z.optional(image())` helper, not `z.string()`. Paths must be relative to the content collection base (`../../assets/blog-images/<slug>.png`). The `[...slug].astro` template passes `post.data.coverImage` directly to `<Image />`. Never use `/assets/...` or `/blog-images/...` absolute paths in coverImage frontmatter — they bypass Astro's pipeline.
