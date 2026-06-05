import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { marked } from 'marked';

export const GET: APIRoute = async () => {
  const posts = await getCollection('writing');
  const sortedPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const items = sortedPosts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    content: marked.parse(post.body) as string,
    pubDate: post.data.date,
    link: `/writing/${post.slug}/`,
  }));

  return rss({
    title: 'Simon Islam',
    description: 'Solutions architect and cloud engineer writing about systems, infrastructure, and engineering.',
    site: 'https://simonislam.com',
    items,
  });
};
