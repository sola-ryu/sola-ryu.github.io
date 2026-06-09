import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      coverImage: z.optional(image()),
    }),
});

const dreams = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/dreams' }),
  schema: () =>
    z.object({
      date: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, dreams };
