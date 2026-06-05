import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const posts = await getCollection('writing');

  return rss({
    title: 'Simon Islam',
    description: 'Solutions architect and cloud engineer writing about systems, infrastructure, and engineering.',
    site: 'https://simonislam.com',
    items: posts
      .filter((post) => !post.data.draft)
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/writing/${post.slug}/`,
      })),
  });
};
