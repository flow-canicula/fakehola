# CLAUDE.md

Operational guide for any AI assistant or developer working in this repository.
Read this file **before** writing code. It defines what the project is, the
constraints that cannot be broken, and the conventions that keep the codebase
coherent.

---

## 1. What this is

A marketing and order-intake website for **Cafe Hola** — a Kapampangan bakery
originally from Pampanga, selling in Philippines. The site lives at
**holabakery.skaldris.com** *(confirm final domain before deploy)*.

The brand is publicly known as **Hola**. Social presence:
- Facebook: `TheCafeHola`
- Instagram: `cafe_hola2020`

The site speaks to two audiences:

1. **Walk-in and online customers** — Philippines residents looking to order
   Hola's ensaymada, ube/sapin-sapin boxed breads, pillow-soft bread, and
   coffee pairings for delivery or pickup.
2. **Gift / pasalubong buyers** — customers gifting Kapampangan breads for
   occasions, team pasalubongs, or special days.

It is a **static site** — no server runtime, no database, no auth, no sessions.
All ordering is handled via Facebook/Instagram message (message-to-order model).
If a task seems to require a server, a cart backend, or authentication —
stop and re-read this section.

### The non-negotiable content rule

- **`FACTS-ONLY`** — Every product, price, and claim on this site must match
  verified brand information (menus, social posts, or operator-supplied content
  data in `content/`). No invented products, invented prices, or invented
  promotions. If it is not in `content/` or confirmed by the brand, omit it.

---

## 2. What Hola is (source of truth for copy and structured data)

All copy, JSON-LD, metadata, and `llms.txt` must be consistent with this summary.

**Brand name:** Cafe Hola (commonly: **Hola**)
**Tagline:** *Basta Hola, Manyaman!* ("With Hola, it's delicious!" — Kapampangan)
**Origin:** Pampanga, Philippines
**Selling area:** Philippines (physical location: EDSA Shangri-La @ 2)
**Facebook:** https://www.facebook.com/TheCafeHola
**Instagram:** https://www.instagram.com/cafe_hola2020/
**Order channel:** Facebook / Instagram DM (no server-side checkout)

**Brand personality:**
Warm, neighborly, proudly Kapampangan. Appetite-first. Food photography does
the persuading. *Basta Hola, Manyaman!* is the signature sign-off — used once
per view (hero or footer), never as a button label or functional control.

**Products (verified from Foodpanda Olongapo listing — source of truth is `content/products.ts`):**

| Category | Products |
|---|---|
| Starters | Spam Fries ₱200, Kangkoy ₱180, Beef Quesadillas ₱240, Parmesan Fries ₱167 |
| Cheese Bread Bites (Box of 20) | Milky Cheese ₱333, Yema Cheese ₱380, Assorted ₱387, Spanish Bread ₱347, Ube Spanish Bread ₱347 |
| Cheese Rolls (Box of 6) | Cheese Floss ₱400, Duo Rolls ₱373, Assorted Rolls ₱393 |
| All Day Breakfast | Tapa & Kimchilog ₱333, Embonisa at Silog ₱260 |
| Mains | Kalderetang Baka ₱353, Spicy Pork Sisig ₱247, Pork Belly Kilayin ₱293, Fried Chicken Roll ₱320, Papa's Chicken Curry ₱327, Chicken Shawarma Rice Bowl ₱260, Baked Chicken Adobo ₱293 |
| Pasta | Chicken Pesto ₱247 |
| Ensaymadness (Box of 6) | Hola Cream Cheese ₱440, Assorted Ensaymadness ₱420 — **hero SKU** |
| Hola Bars (Box of 15) | Hola Ensaymaditas ₱300 |
| Hot Beverages (12oz) | Americano, Cafe Latte, Spanish Latte, Mocha, Caramel Macchiato, Cappuccino, White Choco Mocha, Milo Latte — all ₱172 |
| Over Ice (16oz) | Iced Latte ₱173, Iced Cappuccino ₱173, Iced Mocha ₱187, Iced Americano ₱173, Iced Caramel Macchiato ₱187, Iced Spanish Latte ₱173, Iced White Choco Mocha ₱173, Iced Milo Latte ₱173, Coffee Float ₱173, Vanilla Latte ₱173, Double Vanilla ₱187 |
| Holamazing Beverages (16oz) | Chocolate Frappe, Mocha Frappe, White Mocha Chips, Salted Caramel, White Choco Mocha — all ₱187 |
| Non Coffee (16oz) | Cookies & Cream ₱187, Matcha ₱187, Choco Loco ₱187, Berry Fresh ₱200, Lemon Iced Tea ₱147 |

Product data and promotional copy live in `content/products.ts` — that is the
single source of truth for names, descriptions, tags, and images. All on-page
copy must match it.

**Approved brand voice samples (use as the copy tone reference):**

> *Take a sweet break and indulge in the soft, buttery goodness of our
> Ensaymadness! Perfect with your favorite drink and guaranteed to make your
> Wednesday extra special. Because every day is better when there's something
> delicious waiting for you. Basta Hola, Manyaman!*

> *The Original HOLA Creamcheese Ensaymadness — freshly baked, cheesy, pillow
> soft bread, generously filled, genuine and authentic Kapampangan! Grab now at
> Hola Bakery & Cafe!*

---

## 3. Tech stack (pinned intentions)

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15**, App Router | `app/` directory only. No `pages/`. |
| Output | **Static export** — `output: 'export'` | Build emits `out/`. No Node server in prod. |
| Language | **TypeScript, `strict: true`** | Also `noUncheckedIndexedAccess`. No `any` without a written reason. |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | Design tokens live in CSS, not a JS config. See §7. |
| Contact / order intake | **Formspree** (client `fetch`) | One endpoint. See §8. |
| Fonts | **Self-hosted** via `next/font/local` | No runtime calls to Google Fonts (CSP + privacy). |
| i18n | **None.** Filipino/English only. | No `next-intl`, no `[locale]` segment. Routes are flat. |
| Analytics | Optional, privacy-first (Plausible) | Off by default; if added, update CSP. |
| Package manager | **pnpm** | Lockfile is `pnpm-lock.yaml`. |
| Node | **20 LTS or 22** | Match `.nvmrc`. |

---

## 4. Commands

```bash
pnpm install            # install deps (commit pnpm-lock.yaml)
pnpm dev                # local dev server (http://localhost:3000)
pnpm build              # next build -> produces static export in out/
pnpm lint               # eslint (next/core-web-vitals + strict TS rules)
pnpm typecheck          # tsc --noEmit
pnpm format             # prettier --write
pnpm exec serve out     # preview the real static output locally
```

A change is not "done" until `pnpm lint && pnpm typecheck && pnpm build` all
pass clean. See §14.

---

## 5. Static-export rules (the sharp edges)

`output: 'export'` removes the server. The following **do not exist** at runtime
and must not be used:

- Route Handlers (`app/**/route.ts`) that need to run on a request
- Server Actions / `'use server'`
- `next/headers`, `cookies()`, `headers()`, `draftMode()`
- Middleware that depends on a running server (`middleware.ts` is ignored on export)
- `dynamic = 'force-dynamic'`, ISR, on-demand revalidation
- `next/image` default optimization (disabled — see below)
- **No cart, no checkout, no payment integration** — ordering is DM-based

Required configuration in `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
```

Patterns that are fine:

- Fully static pages with the Metadata API
- Client components (`'use client'`) for the order inquiry form and mobile menu
- Client-side `fetch()` to Formspree
- `generateStaticParams()` if/when a local data file drives `[slug]` routes
- Build-time data: import local JSON/TS in a Server Component during build

Images: since optimization is off, **pre-process food photography at author time**
(export web-optimized `.avif`/`.webp` at the sizes actually used; provide
`width`/`height` to avoid CLS). Do not rely on Next.js to resize.

---

## 6. Repository structure

```
.
├── CLAUDE.md                 <- you are here
├── SECURITY.md               <- threat model, CSP, pre-launch checklist
├── next.config.ts
├── tailwind.config.ts        <- minimal; tokens live in globals.css @theme
├── public/
│   ├── .htaccess             <- HTTPS redirect, security headers, -Indexes
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt              <- AI/answer-engine summary (see §10)
│   ├── og/                   <- Open Graph images (1200x630)
│   └── assets/
│       ├── logo/             <- Hola circle mark, lockup variants (SVG + PNG)
│       └── food/             <- product photography (avif/webp, pre-optimized)
├── src/
│   ├── app/
│   │   ├── layout.tsx        <- html, fonts, default metadata, JSON-LD
│   │   ├── page.tsx          <- Home (/) — hero, about, products, promo, CTA
│   │   ├── menu/page.tsx     <- Full product menu
│   │   ├── order/page.tsx    <- Order inquiry form + "How to order" explainer
│   │   ├── order/thanks/page.tsx
│   │   ├── about/page.tsx    <- Brand story, Pampanga roots
│   │   ├── not-found.tsx     <- designed 404
│   │   ├── sitemap.ts        <- pick ONE: this OR public/sitemap.xml
│   │   └── robots.ts         <- pick ONE: this OR public/robots.txt
│   ├── components/
│   │   ├── layout/           <- Header, Footer, Nav, MobileMenu (client)
│   │   ├── sections/         <- Hero, ProductGrid, PromoStrip, HowToOrder, CtaBanner
│   │   ├── product/          <- ProductCard, FlavourTag, ProductModal (client)
│   │   ├── forms/            <- OrderInquiryForm, Honeypot
│   │   └── seo/              <- JsonLd (typed), Breadcrumbs
│   ├── content/
│   │   ├── products.ts       <- product data (name, desc, tags, image path, in-stock)
│   │   ├── promos.ts         <- active promotions (title, copy, expires)
│   │   └── site.ts           <- SITE_URL, brand handles, nav, OG defaults
│   ├── lib/
│   │   ├── formspree.ts      <- submit helper, status types
│   │   ├── jsonld.ts         <- schema builders (typed)
│   │   └── seo.ts            <- buildMetadata() helper
│   └── styles/
│       └── globals.css       <- Tailwind + @theme tokens + base layer
└── ...
```

If you add a route, add it to: the nav (where appropriate), `sitemap`, and
breadcrumb structured data.

`content/products.ts` is the **single source of truth** for all product data.
If on-page copy diverges from this file, fix the copy — not the other way around.

---

## 7. Design system (tokens & rules)

The brand reference is the Cafe Hola visual identity: sunrise yellow circle mark
(`#F2B705`), hand-lettered "HoLa" script, ink-black typography, warm cream
backgrounds, Kapampangan-brown wordmark. Food photography is the hero of every
surface — type and structure support it, they do not compete.

Derive every color, size, and font from design tokens. No ad-hoc hex values in
components.

### Color tokens (define in `globals.css` `@theme`)

```css
@theme {
  /* Brand */
  --color-brand:          #F2B705; /* Hola sunrise yellow — primary CTA bg, tags */
  --color-brand-strong:   #E0A500; /* hover / active on yellow */
  --color-ink:            #1A1A1A; /* near-black — text on yellow, headings */
  --color-brown:          #6B3F12; /* Kapampangan brown — wordmark, accents */
  --color-ube:            #5E3A87; /* ube/purple — product tags only, use sparingly */

  /* Surfaces */
  --color-surface-base:   #FFFFFF;
  --color-surface-muted:  #FFF8E6; /* warm cream wash — section backgrounds */
  --color-surface-dark:   #1A1A1A; /* footer, dark CTA strip */

  /* Text */
  --color-text-primary:   #1A1A1A;
  --color-text-secondary: #5B5B5B;
  --color-text-on-brand:  #1A1A1A; /* ink on yellow — AA contrast ~9.6:1 */
  --color-text-inverse:   #FFFFFF; /* white on dark surfaces only */

  /* Borders */
  --color-border-subtle:  #E7E2D4;
  --color-border-strong:  #1A1A1A;

  /* States */
  --color-error:          #C0392B;
  --color-success:        #2E7D32;

  /* Motion */
  --duration-instant:     160ms;
  --duration-base:        240ms;
  --easing-standard:      cubic-bezier(0.2, 0, 0, 1);
}
```

**Critical contrast rule:** Yellow `#F2B705` is a valid *background* only when
paired with ink `#1A1A1A` text (contrast ≈ 9.6:1, AA/AAA pass). White text on
yellow **must never** be used for functional text — it fails WCAG AA. The
white-on-yellow logo lockup is a graphic element, not a text pattern to replicate.

### Typography

Three roles, self-hosted (`next/font/local`):

- **Display / script accent** — `Pacifico` or equivalent hand-lettered script.
  Used only for hero headlines and promo eyebrows (e.g. "Perfect Pair for Rainy
  Days!"). Mirrors the hand-lettered "HoLa" brand mark. **Never** used for body,
  labels, prices, or controls.
- **Body / UI** — `Poppins`. All running text, labels, nav, prices, buttons.
  Clean, friendly, legible at small sizes.
- **Mono / utility** — `JetBrains Mono` or `IBM Plex Mono`. Dates, SKU tags,
  metadata labels. Use sparingly.

Type scale (rem): `0.75 / 0.875 / 1 / 1.125 / 1.25 / 1.5 / 2 / 2.5 / 3.5`.
All readable copy: sentence case. Script face: used with restraint, large and
sparingly, one moment per view.

### Spacing scale

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px`

### Radius & shadow tokens

```css
@theme {
  --radius-xs:   4px;
  --radius-sm:   8px;
  --radius-md:   16px;
  --radius-pill: 9999px; /* matches the Hola circle mark — lean round */

  --shadow-sm:   0 1px 3px rgba(26,26,26,0.12), 0 1px 2px rgba(26,26,26,0.08);
  --shadow-md:   0 8px 24px rgba(26,26,26,0.14);
}
```

### Motion

- Scroll-reveal: short fade + 8–12px rise per section. One stronger entrance
  for the hero food photography.
- Always honor `prefers-reduced-motion: reduce` — remove shimmer, zoom, and
  reveal animations.
- No autoplaying audio or video with sound.

### Layout

Appetite-first, generous margins. Food photography fills the hero. Product cards
show the product prominently — never small thumbnails. The layout guides a hungry
visitor to tap "Order on Facebook/Instagram" in as few steps as possible.

### Quality floor (every screen)

Responsive to 360px, visible keyboard focus rings (ink ring on all surfaces),
AA contrast on all text, reduced motion respected, semantic landmarks
(`header/main/footer/nav`), one `<h1>` per page.

---

## 8. Order inquiry form (Formspree endpoint)

One lightweight pre-order / inquiry form for customers who want to submit a
request before messaging on social. This is **not** a cart or checkout — it
collects basic intent and routes to the operator.

| Form | File | Endpoint env var | For |
|---|---|---|---|
| **Order Inquiry** | `forms/OrderInquiryForm.tsx` | `NEXT_PUBLIC_FORMSPREE_ORDER_ID` | Customers, bulk/event orders, pre-order requests |

Rules:

- The Formspree form ID is **public by design** — a routing identifier, not a
  secret. `NEXT_PUBLIC_` is expected.
- Submit via client `fetch()` to `https://formspree.io/f/<id>`,
  `Accept: application/json`. On success route to `/order/thanks`; on failure
  show an inline error naming what happened and what to do next.
- Every field: correct `type`, `name`, `maxLength`, associated label
  (`htmlFor`/`id`), `autoComplete` where sensible.
- Include a **honeypot** field (`_gotcha`, visually hidden, `tabIndex={-1}`,
  `aria-hidden`). Enable Formspree spam filtering server-side.
- Never put PII in URL query strings.
- The form is **supplementary** — always show the Facebook and Instagram direct
  message links alongside or above it. The social channels are the primary
  ordering path.

Suggested fields: name, mobile number, product interest (select), quantity,
preferred date/day, message.

---

## 9. SEO conventions

- Use the **Metadata API** (`export const metadata` / `generateMetadata`) on
  every route. Centralize defaults in `lib/seo.ts -> buildMetadata()`.
- Each page sets a unique `title`, `description`, canonical, and Open Graph +
  Twitter card. Default OG image in `public/og/` at **1200x630** — use a
  high-appetite food photo with the Hola mark.
- `metadataBase` = `SITE_URL` from `content/site.ts`.
- One `<h1>` per page; logical heading order; descriptive `alt` text on every
  food image (describe what it looks like and the product name).
- **Structured data** (JSON-LD via `components/seo/JsonLd`, builders in
  `lib/jsonld.ts`):
  - `LocalBusiness` (type `Bakery`) — name, address (EDSA Shangri-La @ 2,
    Philippines), telephone (if operator supplies one), `servesCuisine:
    "Filipino, Kapampangan"`, social profiles
  - `WebSite` — `url` + `name: "Cafe Hola"`
  - `BreadcrumbList` on inner pages
  - `ItemList` / `Product` for featured menu items
- `sitemap` + `robots`: pick **one** mechanism. Don't ship both. Keep `/thanks`
  pages `noindex`.

---

## 10. AI / answer-engine optimization (AEO)

- **`public/llms.txt`** — a factual plain-language brief for AI crawlers: what
  Cafe Hola is, what it sells, its Kapampangan origin, service area (Metro
  Manila), social handles, and how to order. Draw exclusively from `content/`.
- **Entity clarity** — consistent naming ("Cafe Hola" / "Hola") across `<title>`,
  JSON-LD `LocalBusiness.name`, OG, and `llms.txt`.
- **Extractable answers** — write About and product descriptions as short,
  self-contained declarative paragraphs. Lead with the claim, then the detail.

`llms.txt` is informational only. Do not put private operator contact details
(personal phone, home address) in it.

---

## 11. Accessibility

Treat as a release gate:

- Semantic landmarks; skip-to-content link; one `<h1>`/page.
- All interactive elements keyboard-operable with a visible focus style
  (ink `#1A1A1A` ring on all surfaces, including yellow — never a yellow ring
  on a yellow background).
- Product modal / lightbox: focus trap, `Esc` to close, restore focus on close,
  descriptive `alt` on every food image.
- Order form: programmatic labels, `aria-describedby` for errors, `aria-live`
  region for submit status. Errors name the problem and the fix.
- Color is never the only signal. Re-verify contrast on all text combinations.
- `prefers-reduced-motion` respected globally.
- White text on yellow **must not** appear for functional content (fails WCAG AA).

---

## 12. Content & copy rules

- Sentence case. Plain verbs. Active voice. Warm and neighborly tone.
- Buttons say what they do ("Send inquiry," "Order on Facebook" — not "Submit"
  or "Go!").
- Errors don't apologize and are not vague; they say what happened and what to do.
- **`FACTS-ONLY`**: every product, price, and claim must be in `content/`.
  No invented menu items, invented promotions, or invented awards.
- The script face and *Basta Hola, Manyaman!* are **brand seasoning** — one
  appearance per view, in hero or sign-off position only. Never inside controls.
- `content/products.ts` and `content/promos.ts` are the single source of truth.
  On-page copy must match them.

**Microcopy examples:**

| Context | Do | Don't |
|---|---|---|
| Primary CTA | "Order on Facebook" / "Send an inquiry" | "Buy now" / "Go!" |
| Out of stock | "Fresh batch coming — message us to pre-order." | "Error: unavailable" |
| Form success | "Got it! We'll get back to you shortly. Basta Hola, Manyaman!" | "Form submitted." |
| Form error | "Enter a mobile number we can reach you on." | "Invalid input." |
| Product desc | "Soft, buttery ensaymada topped with grated cheese." | "Best ensaymada!!!" |

---

## 13. Environment variables

```bash
# .env.local (never committed) and the host's build env
NEXT_PUBLIC_SITE_URL=https://holabakery.skaldris.com
NEXT_PUBLIC_FORMSPREE_ORDER_ID=xxxxxxxx
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN=holabakery.skaldris.com  # only if analytics enabled
```

Only `NEXT_PUBLIC_*` vars exist — everything ships to the browser on a static
export. Never add a real secret here; there is no server to keep it on.
Commit a `.env.example` with empty values.

---

## 14. Definition of done (PR checklist)

- [ ] `pnpm lint && pnpm typecheck && pnpm build` pass clean; `out/` inspected via `serve out`.
- [ ] No `any` introduced without a written justification comment.
- [ ] New/changed pages set unique metadata + canonical + OG.
- [ ] New routes added to nav (if user-facing), sitemap, and breadcrumbs.
- [ ] All copy traceable to `content/` (`FACTS-ONLY`). No invented claims.
- [ ] `content/products.ts` is the source of truth; on-page copy matches.
- [ ] Order form: honeypot present, labels associated, success/error states working, no PII in URLs.
- [ ] Facebook / Instagram order links are visible and working on every order surface.
- [ ] Food images pre-optimized (avif/webp) with explicit `width`/`height`; descriptive `alt`.
- [ ] No white-on-yellow functional text anywhere.
- [ ] Focus-visible ink ring present on all interactive elements (including on yellow surfaces).
- [ ] A11y pass: keyboard, focus, contrast, reduced motion, one `<h1>`.
- [ ] No server-only API used (see §5). No cart, checkout, or payment code.
- [ ] `SECURITY.md` checklist consulted for anything touching forms, headers, or third-party embeds.

---

## 15. When unsure

- A request that needs a server or a cart → re-read §5; find the static path or flag it. Orders go through Facebook/Instagram DM.
- A design choice not covered by tokens → propose a token, don't hardcode a hex value.
- A security-relevant change (headers, CSP, embeds, forms) → `SECURITY.md` wins; update it in the same PR.
- A product or copy claim not in `content/` → omit it. Do not invent or embellish.
- A request to add white text on yellow → refuse it; it fails WCAG AA.
