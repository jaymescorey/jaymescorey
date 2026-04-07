# Jaymes Corey — Project Brief for Claude

## What This Is
Personal brand site for **Jaymes Corey** — Navy Vet, Dad of 3, creative strategist, builder, ADDY Award winner.

**Brand positioning:** The cycle ends with me. Company man or family man should never be a choice. Jaymes builds one-person businesses in public to fund a life of total presence with his kids — and documents every ugly, honest step so others can start moving too.

## Tech Stack
- **Astro 6** — component-based, file-based routing
- Fonts loaded from Google Fonts
- `src/styles/global.css` — shared styles
- Deployed on Cloudflare Pages

## Project Structure
```
src/
  content/
    field-report/     — MDX blog posts (one file per post, named by slug)
  content.config.ts   — Astro Content Collections schema (field-report collection)
  pages/
    index.astro       — Home page
    about.astro       — About Jaymes / personal story
    portfolio.astro   — The Work / case studies
    landing.astro     — LinkedIn traffic landing page (noindex, email capture → upsell)
    thank-you.astro   — Post-signup confirmation (noindex, pitches Builder Session)
    sprint.astro      — 30-Day Sprint offer page ($2,500, max 10 clients at a time)
    own-your-income.astro — SEO-targeted long-form sales page for "Own Your Income" course ($97, Stripe checkout)
    field-report.astro    — Field Report index (featured post + feed list, pulls from getCollection)
    field-report/
      [slug].astro    — Dynamic route rendering MDX posts via PostLayout
      rss.xml.js      — RSS feed, auto-generated from getCollection
  layouts/
    BaseLayout.astro  — Shared layout wrapper
    PostLayout.astro  — Shared layout for all field-report posts (calls getCollection internally)
  components/
    Nav.astro         — Navigation component
    PostImage.astro   — Responsive post image with optional caption + full-bleed
    YouTube.astro     — Privacy-safe YouTube embed (youtube-nocookie.com)
    Callout.astro     — Branded callout box (note / tip / warning / raw)
    PostCTA.astro     — Promo/CTA box (yellow or dark theme)
    PostButton.astro  — Styled inline link button
  styles/
    global.css        — Shared styles
public/
  images/             — All static assets
  robots.txt
  sitemap.xml         — includes index, about, portfolio, sprint, and all field-report posts
```

### Landing page deployment
`landing.astro` + `thank-you.astro` are for a **separate Cloudflare Pages deployment** targeting LinkedIn traffic. They are intentionally hidden from search engines (`noindex, nofollow`).

### Sprint page
`sprint.astro` — currently shows a waitlist modal (all spots marked as full) because hi@jaymescorey.com is not yet active. When email is ready, replace modal with a real application form. The waitlist form feeds into MailerLite (same account `2182045`).

### Field Report (blog)
`field-report.astro` — index page. Layout: one featured post (full-width split panel) + a compact feed list of all other posts. Posts are pulled from `getCollection('field-report')`, sorted by `pubDate` descending. The featured post is always index 0 (newest).

Posts live as `.mdx` files in `src/content/field-report/`. The dynamic route `src/pages/field-report/[slug].astro` renders each one. **To add a new post: drop one `.mdx` file in `src/content/field-report/` and add a sitemap entry — nothing else needs updating.**

`PostLayout.astro` — receives props from the dynamic route, calls `getCollection()` internally to build the "More from the field" rail. No hardcoded arrays anywhere.

**RSS feed** — `src/pages/field-report/rss.xml.js`, served at `/field-report/rss.xml`. Auto-generated from `getCollection()`.

**Collection schema** (`src/content.config.ts`):
```
title       — display headline (PostLayout appends "| Jaymes Corey" for SEO title)
description — meta description + RSS description
excerpt     — (optional) short card blurb; falls back to description if omitted
pubDate     — date (YYYY-MM-DD in frontmatter, coerced to Date)
readTime    — e.g. "6 min"
category    — e.g. "WRITTEN", "VIDEO" (default: "WRITTEN")
ogImage     — (optional) OG image override; defaults to og-jaymes.jpg
tags        — (optional) array of strings
```

**MDX authoring** — write in Markdown, use components when needed. Components are pre-registered in `[slug].astro` and available in every post without importing:

| Component | Usage |
|-----------|-------|
| `<PostImage>` | `<PostImage src="..." alt="..." caption="..." full />` — `full` makes it bleed past body margins |
| `<YouTube>` | `<YouTube id="VIDEO_ID" title="..." caption="..." />` — privacy-safe, no cookies until play |
| `<Callout>` | `<Callout type="note|tip|warning|raw" label="...">text</Callout>` |
| `<PostCTA>` | `<PostCTA heading="..." body="..." btnText="..." btnHref="..." theme="yellow|dark" />` |
| `<PostButton>` | `<PostButton href="..." theme="yellow|dark|outline" external>text</PostButton>` |

**Publishing workflow plan (not yet built — Make.com automation):**
```
Write in Notion (Mac + iOS app)
  → flip post Status to "Published"
  → Make.com creates .mdx file in GitHub repo
  → Cloudflare Pages auto-deploys
```

**Bonus pipeline (not yet built — voice memo → post):**
```
Record voice memo on iPhone
  → iOS Shortcut sends audio to Make.com
  → Whisper transcription → Claude API formats draft
  → Draft lands in Notion for review
  → Publish when ready
```

## Design System

### Palette (CSS variables)
```
--yellow:       #F2C230   ← Primary accent, buttons, highlights
--ink:          #0F0F0F   ← Near-black, main text + dark sections
--poster-black: #1C1C1C   ← Dark section backgrounds
--paper:        #F6F1E7   ← Warm off-white page background
--rust:         #C94A2B   ← Secondary accent, box shadows, tags
--cream:        #FAF7F0   ← Slightly lighter than paper
--light-rule:   #e0d9cc   ← Subtle dividers
--border-width: 4px       ← Standard brutalist border
```

### Fonts
- **Anton** — Headlines, big display text, buttons (uppercase, tight tracking)
- **Space Mono** — Labels, section numbers, eyebrows, metadata (monospace, uppercase)
- **Lora** — Body copy, italic callout quotes (serif)
- **Oswald** — Secondary display, uppercase subheadings

### Brand Aesthetic — IMPORTANT
This site has a very specific brutalist/poster voice. **Never build anything clean, minimal, or editorial for this project.** Key signatures:
- 4px solid borders + offset box-shadows (e.g. `6px 6px 0px var(--rust)`)
- Grain texture overlay on every page (`body::before` SVG noise filter)
- Tape decorations on cards (`.tape`, `.gallery-tape`)
- Slight card rotations via `transform: rotate(var(--r))`
- Section labels in Space Mono: `00.1 // The Moment` format
- Outline/stroke text treatment: `-webkit-text-stroke` on second headline lines
- Anton headlines at massive scale: `clamp(4rem, 12vw, 9rem)`
- Bouncing arrow dividers (`↓`) between sections on landing page
- Ticker bars (black bg, yellow Anton text, rust diamond separators)
- Yellow `btn` with rust offset shadow; hover lifts with `translate(-2px, -2px)`

### Copy Conventions — IMPORTANT
- Always capitalize **Navy Vet** and **Dad** (and **Dad of 3**) — never lowercase
- Do NOT reference "Do It Ugly" as the primary brand — it is a planned sub-brand, not the main identity
- Do NOT use "80+ domains" in copy — this number has been intentionally removed from the site
- Brand voice: personal, raw, honest, punchy. Short sentences. No guru language.

## Index Page — Section Order
1. Nav
2. Hero — "Company man or family man should never be a choice." + FOLLOW THE BUILD → #enlist
3. Ticker — credibility bar
4. Intro — "Hi I'm Jaymes" + stats (3 kids, 10+ businesses, 80+ domains, $0 investment)
5. Email capture — "Most People Wait. Builders Move." → MailerLite
6. How Can I Help — full-bleed row layout (Join The Lab / The Live Lab / The 30-Day Sprint)
7. The Live Lab Dashboard — domain experiment tracker
8. The Moment — origin story
9. Wish List / Lived List
10. Kids Approved
11. Freedom section
12. Footer CTA

## Interactive Features (index page)
- **Permission button** — `#permissionBtn` at the bottom of the `.story` section. Returns a random message from a 12-item `messages` array on click.
- **Hover-reveal text** — `.reveal-word` spans with `data-reveal="..."` attribute. Shows a Space Mono tooltip on hover. Used sparingly — currently 2 instances on the page.
- **Note:** The hero text scramble effect was intentionally removed. Do not add it back.

## The 30-Day Sprint Offer
- **Price:** $2,500
- **Max clients:** 10 at a time
- **What's included:**
  1. Intake form reviewed before first call
  2. Kickoff call — 60–90 min, Week 1
  3. 3 weekly sprint calls — 45–60 min each (Weeks 2, 3, 4)
  4. Email access between calls
- **Current status:** Waitlist only — hi@jaymescorey.com not yet active
- **Application flow:** Modal on `/sprint` collects waitlist emails via MailerLite

## Portfolio — Case Studies

### How overlays work
Each case study is a `.case-overlay` div with `id="case-{slug}"`. They slide in from the right using `transform: translateX(100%)` → `translateX(0)` on `.open` class. **Never use `display:none` on overlays** — it breaks image loading.

All gallery images must have:
- `loading="eager"` on the `<img>` tag
- Preload link in `<head>`
- Straight quotes only — smart/curly quotes (`" " ' '`) will break `src=` and `class=` attribute parsing

### Current case studies
1. **Alice's Strange Brew** (`case-alice-strange-brew`) — ADDY Award concept campaign. Coffee brand built around a classic literary character (no IP names — do NOT write "Disney" or "Alice in Wonderland" or "Wonderland"). Images: `addy-award-jaymes-corey_1-15.png`
2. **All Birds** (`case-all-birds`) — Student project, Academy of Art University. Allbirds shoe company sheep mascot campaign concept. Images: `Jaymes-Corey-All-Birds-Concepts1.jpeg` (cover) + `Jaymes-Corey-All-Birds-Concepts-1-15.png`

### Gallery layout
Corkboard columns layout: `class="corkboard"` with `.gallery-pin` children. Each pin has `.gallery-tape` and a `--r` CSS variable for slight rotation.

## SEO / Technical
- `public/robots.txt` — exists, blocks `/landing` and `/thank-you`
- `public/sitemap.xml` — includes index, portfolio, about, sprint. Update `<lastmod>` when making significant changes.
- All public pages have: meta description, OG tags, Twitter card, canonical URL, Schema.org structured data
- Google Fonts load with `&display=swap` on all pages — do not remove this
- MailerLite account ID: `2182045`
- **Every new public page needs:** entry in `sitemap.xml`, meta description, OG tags, Twitter card, canonical URL, Schema.org block, and active nav state (`aria-current="page"`)

### BaseLayout Head Template
All public pages should pass these props to `BaseLayout.astro`. Replace ALL_CAPS placeholders.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="PAGE_TITLE | Jaymes Corey"
  description="PAGE_DESCRIPTION"
  canonicalUrl="https://jaymescorey.com/PAGE_SLUG"
>
  <!-- page content -->
</BaseLayout>
```

`BaseLayout.astro` includes:
- charset, viewport, canonical, sitemap link, favicon
- `theme-color: #F2C230`
- Open Graph tags
- Twitter card tags
- Google Fonts (`Anton`, `Lora`, `Space Mono`, `Oswald` with `&display=swap`)
- Global CSS import
- MailerLite Universal script (account `2182045`)

### Sitemap Entry
Add to `public/sitemap.xml` for every new public page:
```xml
<url>
  <loc>https://jaymescorey.com/PAGE_SLUG</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

## Image Conventions
- Portrait image is `jaymes.webp` (117KB). Use this everywhere — do not reference `jaymes.png`.
- Use **WebP format** for any new photos going forward. Compress via Squoosh before adding.
- Hero portrait gets `fetchpriority="high"` — do not add `loading="lazy"` to it.
- Non-hero images below the fold should have `loading="lazy"`.
- Do not add hardcoded `width`/`height` attributes to portrait images — CSS handles sizing.
- Gallery images in portfolio overlays keep `loading="eager"` per existing convention.

## Pending / Not Yet Done
- **Own Your Income course** — Sales page is built and content is roughed in. Targeting the keyword "Own Your Income." Two checkout buttons still use `href="#"` placeholder (marked with TODO comments at lines ~672 and ~782 in `own-your-income.astro`) — replace with live Stripe payment link when ready. Testimonials on the page are placeholder — replace with real quotes once collected. **Course delivery system not yet built** — see plan below.
- **hi@jaymescorey.com** — Set up domain email. Once live, replace sprint waitlist modal with a real application form.
- **MailerLite** — Set up a separate group/segment for Sprint waitlist vs newsletter subscribers. Verify signups land correctly end-to-end.
- **Calendly URL** — `thank-you.astro` Builder Session button still points to `https://calendly.com/your-link`. Replace before sending traffic.
- **404 page** — Build a custom `404.astro` in the site's brutalist style.
- **Cloudflare Analytics** — Free, no cookies. Enable in the Cloudflare dashboard.
- **Deploy** `landing` + `thank-you` to separate Cloudflare Pages deployment.
- **Field Report** — Submit `sitemap.xml` to Google Search Console to index new posts.
- **Field Report — Notion → Make.com publishing pipeline** — Not yet built. Make.com automation that watches Notion for posts marked "Published" and creates the `.mdx` file in the GitHub repo, triggering a Cloudflare Pages deploy. Also planned: voice memo → Whisper → Claude → Notion draft pipeline. See full plan in the Field Report section above.

## Own Your Income — Course Delivery Build Plan

### Stack Decision
- **Supabase** — auth (magic link login) + PostgreSQL database (stores who purchased)
- **Astro SSR** — switch from static to server-rendered using the Cloudflare adapter so pages can check auth before serving
- **`@supabase/ssr`** — official Supabase package for SSR frameworks, handles cookies correctly
- **Cloudflare Pages Functions** — receives Stripe webhook on payment, creates user in Supabase

### Purchase → Access Flow
```
Customer clicks Buy on /own-your-income
  → Stripe checkout (live payment link replaces href="#")
  → Payment succeeds → Stripe fires webhook
  → Cloudflare Pages Function receives webhook
      → Creates user in Supabase with paid = true
      → Supabase sends magic login link to customer's email
  → Customer clicks link → session cookie set
  → /course/* (protected Astro SSR pages) check Supabase session
      → paid = true  → show course content
      → no session   → redirect to /own-your-income
```

### Files to Create
- `src/middleware.ts` — checks Supabase session on all `/course/*` routes, redirects if not authenticated/paid
- `src/lib/supabase.ts` — Supabase client helper (uses env vars)
- `src/pages/login.astro` — magic link login page (email input → Supabase sends link)
- `src/pages/course/index.astro` — course dashboard / module list (protected)
- `src/pages/course/[module].astro` — individual lesson pages (protected)
- `functions/stripe-webhook.ts` — Cloudflare Pages Function at `/api/stripe-webhook`

### Config Changes Required
- `astro.config.mjs` — add `@astrojs/cloudflare` adapter + `output: 'server'`
- `.env` / Cloudflare env vars:
  - `PUBLIC_SUPABASE_URL`
  - `PUBLIC_SUPABASE_ANON_KEY`
  - `STRIPE_WEBHOOK_SECRET`

### Before Starting — User Must Do First
1. Create Supabase project at supabase.com → grab **Project URL** and **anon public key** from Settings → API
2. Create a `purchases` table in Supabase: `id, email, stripe_customer_id, paid (bool), created_at`
3. Set up Stripe webhook in Stripe dashboard pointing to `https://jaymescorey.com/api/stripe-webhook`, event: `checkout.session.completed`
4. Add env vars to Cloudflare Pages dashboard

### Packages to Install
```bash
npm install @astrojs/cloudflare @supabase/supabase-js @supabase/ssr
```

## Key Assets
```
public/images/
  og-jaymes.jpg                           — OG/social preview image (1200×630)
  jaymes.webp                             — Portrait photo (117KB)
  jaymes-corey-do-it-ugly-mascot.png      — Dog mascot (filename kept as-is)
  addy-award-jaymes-corey_1-15.png        — Alice's Strange Brew gallery
  Jaymes-Corey-All-Birds-Concepts*.png    — All Birds gallery
```

## Conventions Established
- Image filenames: lowercase, hyphens only, no spaces, no brackets
- Image format: WebP for photos, PNG for graphics/logos
- Section numbering: `00.1 //`, `00.2 //`, `01 //`, `02 //` etc.
- New pages should be built using the established aesthetic — pull from this design system, never start a new design language
- The "landing page" always means `landing.astro`, not `index.astro`
- `global.css` is the shared stylesheet — landing/thank-you may use scoped `<style>` blocks for page-specific overrides
- Full-bleed sections use `margin-left: -10vw; margin-right: -10vw; padding-left: 10vw; padding-right: 10vw` (mobile: 6vw)
- **Page-level styles must use `<style is:global>` as a top-level tag** — do NOT put `<style>` inside a `<Fragment slot="head">`. Astro's scoping breaks in that context: HTML elements get hashed class names but the CSS rules don't, so nothing matches. The `<Fragment slot="head">` is only for `<script>`, `<link>`, and `<meta>` tags.
- Navy service = **4 years** — never write "8 years" or any other duration
- **All email CTA buttons say "Follow The Build"** — this is the single call-to-action across every form and link on the site. Do not use "Join The List", "Get The Field Report", "Follow Along", or any other variant. Exceptions: sprint waitlist uses "Notify Me", landing page offer uses "Get The Guide" — those are different actions.