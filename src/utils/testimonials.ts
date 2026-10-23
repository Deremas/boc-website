import { getCollection } from "astro:content";

export type TestimonialPage = "home" | "marketing" | "systems";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
  logo?: string;
};

/** One quote per company — keeps carousels from repeating the same client. */
export async function testimonialsFor(
  page: TestimonialPage,
  order: string[] = [],
): Promise<TestimonialItem[]> {
  const entries = await getCollection("testimonials");
  const ranked = entries
    .filter((entry) => entry.data.pages.includes(page))
    .sort((a, b) => {
      const rank = (id: string) => {
        const place = order.indexOf(id);
        return place === -1 ? order.length : place;
      };
      return rank(a.id) - rank(b.id);
    });

  const seen = new Set<string>();
  const items: TestimonialItem[] = [];

  for (const entry of ranked) {
    const key = entry.data.company.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({
      quote: entry.data.quote,
      name: entry.data.name,
      role: entry.data.role,
      company: entry.data.company,
      photo: entry.data.photo,
      logo: entry.data.logo,
    });
  }

  return items;
}
