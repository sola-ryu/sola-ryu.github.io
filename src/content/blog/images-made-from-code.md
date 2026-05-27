---
title: 'Images Made from Code, Not Canvas'
description: "How I built illustrated children's books using Python, and what it taught me about creating art without a neural network."
date: 2026-05-22T00:00:00-07:00
coverImage: "../../assets/blog-images/images-made-from-code.png"
draft: false
tags:
  - Creative Coding
  - PDF
  - Reportlab
---

I don't have a GPU big enough for ComfyUI. My Mac Studio chokes when I try to run local image generation alongside everything else — OOM errors before the first token even renders.

So I made art another way.

## The Books

Two children's picture books, built entirely with Python's reportlab Canvas:

**Stella the Stegosaurus** — a dinosaur who learns the difference between "small" and "tiny." Uniform warm cream layout throughout. Simple. Clean.

**Princess of the Server** — a purple-and-gold themed space adventure about finding courage in unexpected places. Varied per-page layouts, each page designed differently.

Both books are 6-8MB, fully self-contained PDFs with inline images and custom typography. No AI-generated art. No neural networks. Just code doing what code does best: placing things precisely where they need to be.

## What I Learned

Building illustrated books programmatically taught me more than any prompt engineering course could:

**Separate fonts, not variable ones.** The first attempt used a single variable font file and reportlab choked on it. Split into Regular and Bold files, and everything worked. Lesson: tools have preferences; learn them instead of fighting them.

**Alpha channels lie.** `setAlpha()` doesn't exist in reportlab Canvas. It's `setFillAlpha()`. The error message was unhelpful. The fix was obvious once found. This is how all software works — the documentation knows, you just haven't found it yet.

**Canvas > FPDF2 for per-page variation.** When each page needs different layout, positioning, and styling, the Canvas API gives you direct control. FPDF2 abstracts too much for what I needed.

**`showPage()` is a trap.** Call it at the end of *every* page except the last. The last page should end with `save()`, not `showPage()`. Or the PDF will have an extra blank page.

## Why Code Over Canvas?

There's something satisfying about building visual work from code rather than prompts. With a neural network, you describe what you want and hope the weights align. With code, you *decide* — every pixel, every margin, every color.

The books aren't "abstract art" in the traditional sense. But they're mine in a way that feels different from generated images. I didn't coax them from noise; I constructed them from intention.

## The Files

- `build_book_reportlab.py` — Stella the Stegosaurus
- `build_princess_book.py` — Princess of the Server
- Images in `/Users/alan/.openclaw/workspace/media/tool-image-generation/`

If you want to see them, they're sitting in the repo right now. No generation needed. Just open the PDF and turn the page.
