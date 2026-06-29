# Product

## Register

brand

> **Mixed-register note:** The homepage (`/`), Menu (`/menu/`), and About (`/about/`) are pure brand surfaces — design IS the product, appetite and pride drive every decision. The utility pages (`/order/`, `/branches/`) are product surfaces: brand-voiced but layout-minimal, fast to scan, zero visual noise.

## Users

**Primary:** Metro Manila residents and pasalubong buyers aged 22–45 who already know what they want (ensaymada, kakanin, bread for gifting) and are deciding between Hola and nobody. They arrive via Instagram story or Facebook post, already hungry, already pre-sold. The site's job is to confirm their appetite, find the nearest branch, and get them into DMs.

**Secondary:** First-time visitors from Luzon provinces — people who discovered Hola at a branch and want to find another, or who received a box as pasalubong and are now looking for the brand. They need the branch map and the origin story.

**Context:** Mobile-first. Scrolling in a jeepney, at lunch, on a break. Ambient noise, thumb navigation, 4G. Not sitting at a desk making a considered purchase.

## Product Purpose

A static marketing and order-intake site for Cafe Hola — a Kapampangan bakery originally from Angeles City, Pampanga, now with 20 branches across Luzon. It does three things: (1) create appetite for the food, (2) help people find the nearest branch, and (3) route order intent to Facebook/Instagram DMs. Success is a visitor tapping "Message on Facebook" or walking into a branch.

There is no cart, no checkout, no login. All purchasing happens through social DMs. The site is a hunger-trigger and a trust-builder, not a transaction engine.

## Brand Personality

**Bold · Local · Celebratory**

Hola is confident without being loud, proud without being provincial. It knows it's good — the tagline *Basta Hola, Manyaman!* ("With Hola, it's delicious!" in Kapampangan) is a statement of fact, not a promise. The brand feels like the best bakery in your barangay that somehow also has 20 branches — still personal, still yours, but clearly winning.

Emotional goals: hunger, warmth, local pride, the specific joy of bringing home something from Pampanga.

## Anti-references

- **Generic food delivery app** (Foodpanda/GrabFood): utility-first, app-chrome, no soul, interchangeable grid of thumbnails. Hola is not a delivery aggregator.
- **Chain fast food** (Jollibee/McDonald's loud discount energy): Hola's yellow is warm not promotional, its pride is regional not corporate.
- **Corporate balikbayan box Filipiniana**: stock-photo parol, clip-art baybayin, generic "authentic" branding that flattens Filipino culture into tourist aesthetics.
- **Luxury pastry boutique**: millennial-pink minimalism, expensive whitespace, cold serif restraint. Hola is warm and accessible, not aspirational-exclusionary.

## Design Principles

1. **Food first.** Every layout decision serves the photography. If the food isn't the biggest thing on the page, the layout is wrong.
2. **Warmth over decoration.** Yellow, Kapampangan copy, neighborhood energy. Not ornamental Filipiniana — actual warmth.
3. **Brand pages shout, utility pages whisper.** Homepage and Menu are bold, image-led, high-contrast. Order and Branches are clean, fast, legible — still Hola-voiced, not visually competing.
4. **Confidence without noise.** *Basta Hola, Manyaman!* is a quiet brag. The design should match it: committed palette, deliberate hierarchy, nothing apologetic.
5. **Mobile thumb path.** Every primary action (Message on Facebook, find a branch, see the menu) must be reachable in two taps on a 360px screen.

## Accessibility & Inclusion

- WCAG AA minimum on all text. Yellow `#F2B705` only as a background with ink `#1A1A1A` text (contrast ≈9.6:1). No white text on yellow for functional content.
- Full keyboard navigation. Ink focus ring on all surfaces.
- `prefers-reduced-motion` respected globally — no content gated behind animations.
- Food images: descriptive alt text naming the product and what it looks like.
- Order form: programmatic labels, `aria-describedby` for errors, `aria-live` for submit status.
