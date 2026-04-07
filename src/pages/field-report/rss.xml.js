import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET() {
    const posts = (await getCollection('field-report'))
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    return rss({
        title: 'Field Report — Jaymes Corey',
        description: 'Raw dispatches from the lab. One-person businesses, building in public, and what presence with your kids is actually worth building for.',
        site: 'https://jaymescorey.com',
        items: posts.map(post => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/field-report/${post.id}`,
        })),
        customData: `<language>en-us</language>`,
    });
}
