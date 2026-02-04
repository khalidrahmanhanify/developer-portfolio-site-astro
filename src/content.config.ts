import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";
const authors = defineCollection({
  loader: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    return data.map((person: any) => ({
      id: person.name,
      name: person.name,
    }));
  },
});
const blog = defineCollection({
  loader: glob({
    pattern: "src/content/blog/**/*.md",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(160),
      slug: z.string(),
      image: image(),
      pubDate: z.date(),
      isDraft: z.boolean(),
      author: reference("authors"),
    }),
});
const features = defineCollection({
  loader: file("src/content/features.json"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
});

const projects = defineCollection({
  loader: file("src/content/projects.yaml"),
  schema: ({ image }) =>
    z.object({
      image: image(),
      title: z.string(),
      href: z.string().url(),
    }),
});

export const collections = { features, projects, blog, authors };
