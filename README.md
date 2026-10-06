# DeskTalks

Podcast + blog website for DeskTalks, with its own dashboard (CMS).

- **Website:** Next.js 16 (App Router) + Tailwind CSS v4, built from the Figma design
- **Dashboard:** Payload CMS 3 at `/admin` (same app)
- **Hosting:** Cloudflare Workers (via OpenNext)
- **Database:** Cloudflare D1 (SQLite)
- **Images / uploads:** Cloudflare R2

## Pages

| URL | What it shows |
| --- | --- |
| `/` | Hero (featured podcast), Next Episode banner, podcasts carousel, community, latest blogs, contact form, subscribe |
| `/podcasts` | All released episodes, category filter, search, "View More" |
| `/podcasts/[slug]` | Episode hero, "AI Research · 7 episodes" category badge, summary, host/guest cards, YouTube/Spotify/SoundCloud player, Explore More (same category) |
| `/blogs` | All articles, category filter, search, "Load More" |
| `/blogs/[slug]` | Article, Table of Contents, Summarize with AI, CTA, FAQs (+ FAQ schema), author, share buttons, published + last updated dates |
| `/about` | About page with testimonials (from Hosts & Guests that have a testimonial) |
| `/join-as-guest`, `/join-as-host` | Join forms, each its own indexable page (old `/join?type=` URLs redirect) |
| `/privacy-policy`, `/terms-and-conditions` | Legal pages (editable in dashboard) |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Dashboard (`/admin`)

- **Podcasts:** title, summary, host, guests, thumbnail, hero image, YouTube / Spotify / SoundCloud links, category, release date & time, duration, featured. A published episode with a **future release date** is shown as **"Next Episode"** on the homepage and appears in lists from that date.
- **Blogs:** rich-text editor (H2/H3/H4, lists, links, images, YouTube embed), excerpt, featured image, FAQs, author, category, SEO tab (meta title, description, image). Drafts + autosave.
  - *Published Date* is set on first publish.
  - *Last Updated* only changes when a publish actually changes the content. Re-saving without edits keeps the old date.
- **Categories:** shared by podcasts and blogs.
- **Hosts & Guests:** reused across episodes and blog authors.
- **Form Entries / Subscribers:** contact, guest and host forms + newsletter emails.
- **Users:** multiple logins with roles. **Admin** manages everything including users; **Editor** manages content.
- **Site Settings:** community logos, social links, blog sidebar CTA.

## Local development

Requires Node 20.9+ (Wrangler CLI commands need Node 22+) and pnpm.

```bash
pnpm install
cp .env.example .env   # then fill PAYLOAD_SECRET and the SEED_ADMIN_* values
pnpm seed              # demo content from the Figma design + first admin user
pnpm dev
```

Local D1 and R2 are emulated by Wrangler in `.wrangler/` – no Cloudflare account needed for development.

## Deploying to Cloudflare

Needs the **Workers Paid** plan (the Payload bundle is above the free plan's size limit).

1. `pnpm wrangler login`
2. Create resources and put the D1 `database_id` into `wrangler.jsonc`:
   ```bash
   pnpm wrangler d1 create desktalks
   pnpm wrangler r2 bucket create desktalks
   ```
3. Set secrets: `pnpm wrangler secret put PAYLOAD_SECRET` and set `SITE_URL` to the live domain.
4. After any schema change: `pnpm payload migrate:create`
5. `pnpm run deploy` (runs migrations on D1, builds and deploys the Worker)
