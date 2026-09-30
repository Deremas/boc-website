import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    category: z.union([
      z.enum(["digital-marketing", "business-systems"]),
      z.array(z.enum(["digital-marketing", "business-systems"])).min(1),
    ]),
    sector: z.string(),
    location: z.string().default(""),
    headlineResult: z.string(),
    heroImage: z.string().optional(),
    website: z.string().optional(),
    services: z.array(z.string()),
    since: z.string().optional(),
    reference: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })),
    source: z.string().optional(),
    quote: z.string().optional(),
    quoteName: z.string().optional(),
    quoteRole: z.string().optional(),
    quoteCompany: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string(),
    company: z.string(),
    pages: z.array(z.enum(["home", "marketing", "systems"])),
  }),
});

const clients = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/clients" }),
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    color: z.boolean().optional(),
    website: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { caseStudies, testimonials, clients };
