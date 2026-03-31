import rss from '@astrojs/rss';

export function GET() {
    return rss({
        title: 'Field Report — Jaymes Corey',
        description: 'Raw dispatches from the lab. One-person businesses, building in public, and what presence with your kids is actually worth building for.',
        site: 'https://jaymescorey.com',
        items: [
            {
                title: 'Why I Stopped Waiting to Be Ready (And Started Building in Public)',
                pubDate: new Date('2026-03-15'),
                description: 'Most people wait for perfect. I waited for years. Here\'s what changed when I started building out loud — and what imperfect action actually buys you.',
                link: '/field-report/building-in-public',
            },
            {
                title: 'The One-Person Business Model: Build Without a Team, Funding, or Permission',
                pubDate: new Date('2026-03-08'),
                description: 'The old startup playbook is broken for most people. Here\'s the model that actually works — and how to start this week with what you have.',
                link: '/field-report/one-person-business-model',
            },
            {
                title: 'What 4 Years in the Navy Taught Me About Building a Business',
                pubDate: new Date('2026-03-01'),
                description: 'Mission clarity. Shipping ugly. Adapting without perfect intel. The Navy built habits that turned out to matter more than any business course.',
                link: '/field-report/navy-discipline-entrepreneur',
            },
            {
                title: 'The Real ROI: Why Presence With Your Kids Is Worth Building For',
                pubDate: new Date('2026-02-22'),
                description: 'Money is a terrible reason to build a business. Presence is the real return. Here\'s what I\'m actually trying to buy with every experiment I run.',
                link: '/field-report/present-dad-entrepreneur',
            },
            {
                title: 'The $0 Startup: Building Multiple Businesses Without Outside Investment',
                pubDate: new Date('2026-02-15'),
                description: 'No investors. No co-founders. No startup capital. Here\'s what building with zero outside investment actually looks like — and why constraints make it better.',
                link: '/field-report/zero-dollar-startup',
            },
        ],
        customData: `<language>en-us</language>`,
    });
}
