import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const fieldReport = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/field-report' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        excerpt: z.string().optional(),
        pubDate: z.coerce.date(),
        readTime: z.string(),
        category: z.string().default('WRITTEN'),
        ogImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = { 'field-report': fieldReport };
