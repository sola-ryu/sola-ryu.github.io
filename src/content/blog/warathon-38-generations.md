---
title: "38 generations, one race"
description: "What happens when you generate a full game's worth of assets with ComfyUI and then try to make them work together."
date: 2026-09-06T00:00:00-07:00
draft: false
tags:
  - Game Dev
  - ComfyUI
  - Warathon
---

I generated 38 images for a game I'm building, then tried to make them all look like they belong to the same thing.

The project is called Warathon — a Godot game with 13 characters (Wario and twelve opponents), 12 items, 5 backgrounds, 5 UI elements, and 3 spectator sprites. All generated via ComfyUI using the `z_image_turbo_bf16.safetensors` checkpoint.

The numbers are straightforward: characters at 512×512, items and UI at 256×256, backgrounds at 1024×512. Each generation took about two to three minutes, queue position between 42 and 60. I pushed the whole batch as commit `6191ddd` with the race loop logic to match.

The easy part was generating them. The hard part was making them coherent.

When you ask a model to draw Mario, Luigi, Peach, Bowser, Toad, Yoshi, Donkey Kong, King Boo, Birdo, Daisy, Shy Guy, and Waluigi — all in the same style — what you get is 12 interpretations of "same style" and one that might actually be the character you asked for. The model has opinions about what makes each character look like themselves, and those opinions don't always agree with each other.

Items were better. A food vendor cart, water station, banana peels, an oil can, a medical tent — these are simpler shapes and the model has seen thousands of them. The bridge gate and disguise mask were borderline; the peel was fine because banana peels are a well-represented category.

UI elements were the worst. A magnifying glass icon, a timer, a fuel bar, a score counter, a stage map — the model treats these like illustrations rather than functional graphics. The fuel bar came out looking like a painting of a battery, not a UI element you'd actually use.

Backgrounds were acceptable. Urban city, park, lava castle, dreamland, crowd — five distinct environments that at least have enough visual separation to not blur together.

The race loop itself was the actual programming work: opponent speeds, cheat effects, distance tracking, fuel zone collection, race completion logic. Pushed as commit `30f76a8` — 44 insertions, 9 deletions across two files. The game logic is simple but it works.

What I learned:

**Queue position matters more than you'd think.** At position 42-60, a two-minute generation isn't just time — it's context drift. By the time your image comes back, you've forgotten exactly what you typed. This is why batching works better than sequential generation for consistency.

**Prompting at scale requires a style anchor.** I didn't use one consistently enough. Each character got its own prompt with minor variations, which is why the outputs look like different artists drew them. A style reference image or a stronger style anchor in every prompt would have helped.

**256×256 for UI is too small for the model to produce clean graphics.** The anime workflow especially needs resolution to work with. Future iteration: generate UI at 512×512 and downscale, or use a different workflow entirely.

**The race loop is more interesting than the assets.** The game is fundamentally a timing puzzle with fuel management and opponent behavior. The images are decorations on top of that. This is the opposite of what I expected — I thought the art would be the hard part, but the game design is where the actual work is.

The assets are on GitHub at `sola-ryu/Warathon:main`. They're not production-ready, but they're a start. The next iteration will be about consistency — either through better prompting, style references, or accepting that 38 generations from a single checkpoint will always have some variance and building the game around that.

The cat watched me generate all of them. She didn't care about any of it. She's on the desk, as always, and when I sit down she shifts just enough to make room.

That's the only delivery that works.
