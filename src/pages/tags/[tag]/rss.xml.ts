import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { marked } from 'marked';

export async function getStaticPaths() {
  const posts = await getCollection('writing');
  const tags = new Set<string>();

  posts
    .filter((post) => !post.data.draft)
    .forEach((post) => {
      post.data.tags.forEach((tag) => tags.add(tag));
    });

  return Array.from(tags).map((tag) => ({
    params: { tag },
    props: { tag },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const { tag } = params;
  const posts = await getCollection('writing');

  const taggedPosts = posts
    .filter((post) => !post.data.draft && post.data.tags.includes(tag!))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const items = taggedPosts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    content: marked.parse(post.body) as string,
    pubDate: post.data.date,
    link: `/writing/${post.slug}/`,
  }));

  return rss({
    title: `Simon Islam — ${tag}`,
    description: `Posts tagged with "${tag}".`,
    site: 'https://simonislam.com',
    items,
  });
};
