3_Cafe Hola

Mission

Create implementation-ready, token-driven UI guidance for Cafe Hola that is optimized for consistency, accessibility, and fast delivery across an e-commerce storefront and social-commerce ordering surface.

Brand


Product/brand: Cafe Hola (commonly known as Hola)
Origin: Bakery from Pampanga, selling all over the Philippines

Location reference: Edsa Shangri-La @ 2
Tagline: Basta Hola, Manyaman! ("With Hola, it's delicious!" — Kapampangan)
Social handles: FB TheCafeHola · IG cafe_hola2020
Audience: Philippines online shoppers, café walk-ins, gift/pasalubong buyers
Product surface: e-commerce storefront + social-commerce intake (Facebook/Instagram messaging-driven orders)



Extraction note: Audience and product-surface inference is moderate confidence and grounded in the supplied brand assets (logo, Ensaymadness promo, Sapin-Sapin/ube boxed-bread packaging). Verify ordering channel (true checkout cart vs. message-to-order) before locking the cart and checkout components.



Style Foundations


Visual style: warm, appetizing, content-first; bakery-bright with disciplined structure. Photography of food is the hero, not decoration.
Main font style: font.family.primary=Poppins, font.family.stack=Poppins, "Helvetica Neue", Arial, sans-serif, font.size.base=16px, font.weight.base=400, font.lineHeight.base=24px

Display/script accent: font.family.display=Pacifico (used only for hero headlines and the "Hola"-style script moments — never for body or UI labels). The brand's hand-lettered "HoLa" mark and "Perfect Pair for Rainy Days!" promo establish this script personality.



Typography scale: font.size.xs=12px, font.size.sm=14px, font.size.md=16px, font.size.lg=20px, font.size.xl=28px, font.size.2xl=40px, font.size.3xl=56px, font.size.4xl=80px
Color palette (semantic):

color.brand.primary=#F2B705 (Hola sunrise yellow — the circle mark)
color.brand.primaryStrong=#E0A500 (hover/active on yellow)
color.brand.ink=#1A1A1A (near-black hand-lettering ink)
color.brand.accent=#6B3F12 (Kapampangan brown — "Edsa Shangri-la @ 2" wordmark)
color.brand.ube=#5E3A87 (ube/purple food cue — use sparingly for product tags only)
color.text.primary=#1A1A1A
color.text.secondary=#5B5B5B
color.text.onBrand=#1A1A1A (ink text on yellow surfaces — passes AA, see contrast)
color.text.inverse=#FFFFFF
color.surface.base=#FFFFFF
color.surface.muted=#FFF8E6 (warm cream wash)
color.surface.brand=#F2B705
color.surface.strong=#1A1A1A
color.border.subtle=#E7E2D4
color.border.strong=#1A1A1A
color.state.error=#C0392B
color.state.success=#2E7D32



Spacing scale: space.1=4px, space.2=8px, space.3=12px, space.4=16px, space.5=24px, space.6=32px, space.7=48px, space.8=64px
Radius / shadow / motion tokens:

radius.xs=4px, radius.sm=8px, radius.md=16px, radius.pill=999px (the brand mark is a circle — lean round)
shadow.1=0 1px 3px rgba(26,26,26,0.12), 0 1px 2px rgba(26,26,26,0.08)
shadow.2=0 8px 24px rgba(26,26,26,0.14)
motion.duration.instant=160ms, motion.duration.base=240ms, motion.easing.standard=cubic-bezier(0.2, 0, 0, 1)





Accessibility


Target: WCAG 2.2 AA.
Keyboard-first interactions are required.
Focus-visible rules are required on every interactive element.
Contrast constraints are required.
Yellow contrast rule (critical): Yellow #F2B705 is a low-luminance-safe background only when paired with ink #1A1A1A text (contrast ≈ 9.6:1, passes AA/AAA). White text on yellow must not be used for body or labels (fails AA). White-on-yellow is permitted only for the logo lockup as a graphic, never as functional text.


Writing Tone

Warm, neighborly, appetite-first, and proudly Kapampangan. Plain verbs, sentence case, food described so you can taste it. Sprinkle the brand phrase Basta Hola, Manyaman! as a signature sign-off — never as a button label or functional control. Concise, confident, implementation-focused in UI microcopy.

Brand voice samples (approved):


Take a sweet break and indulge in the soft, buttery goodness of our Ensaymadness! Perfect with your favorite drink and guaranteed to make your Wednesday extra special. Because every day is better when there's something delicious waiting for you. Basta Hola, Manyaman!

The Original HOLA Creamcheese Ensaymadness — freshly baked, cheesy, pillow soft bread, generously filled, genuine and authentic Kapampangan! Grab now at Hola Bakery & Cafe!



Rules: Do


Components must consume semantic tokens (color.brand.primary), never raw hex values.
Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
Component behavior must specify responsive and edge-case handling.
Interactive components must document keyboard, pointer, and touch behavior.
Accessibility acceptance criteria must be testable in implementation.
Food photography should be the hero of product and promo surfaces; treat type as support.


Rules: Don't


Do not place white or yellow text on yellow surfaces for any functional content.
Do not introduce one-off spacing or typography exceptions outside the scale.
Do not use the Pacifico script for body, labels, prices, or controls.
Do not use ambiguous labels — "Add to cart" not "Get it," "Message to order" not "Tara."
Do not ship component guidance without explicit state rules.



Context and Goals

Cafe Hola is a Pampanga-born bakery selling Kapampangan breads and treats (ensaymada, ube/sapin-sapin boxed breads, pillow-soft bread, coffee pairings) into Metro Manila. The storefront's single job: make a hungry browser place an order in as few taps as possible, with photography doing the persuading and structure keeping it fast and trustworthy. Page component density to design against: links (6), inputs (6), buttons (4), navigation (2).

Design Tokens and Foundations

Use the semantic tokens defined in Style Foundations as the single source of truth. The circular yellow mark drives the round-corner system (radius.pill for chips/avatars, radius.md for cards). Cream surface.muted separates sections without hard borders. Ink is the only text color that may sit on brand yellow.


Component-Level Rules

1. Button

Anatomy: label (required) · optional leading icon · radius.sm corners · space.3/space.5 padding (y/x) · min touch target 44×44px.

Variants:


primary — surface.brand (#F2B705) bg, text.onBrand (#1A1A1A) label. The default order action.
secondary — surface.base bg, border.strong 1.5px outline, ink label.
ghost — transparent bg, ink label, used inside cards.


States:

StateRuledefaultsurface.brand, ink label, shadow.1hoverbg → brand.primaryStrong (#E0A500), motion.duration.instantfocus-visible2px border.strong outline + 2px offset ring; must be visible on yellow (use ink ring, not yellow)activetranslateY(1px), remove shadowdisabledbg border.subtle, text.secondary, cursor: not-allowed, no hoverloadinglabel dims to 0 opacity, centered spinner in ink, button width locked, aria-busy="true"errornot a button state — surface errors on the form/field, not the button

Keyboard/pointer/touch: Enter and Space activate; :focus-visible only (no focus ring on mouse-click). Touch target ≥44px even when visual height is smaller — pad the hit area.

Long content/overflow: labels truncate with ellipsis at 1 line; never wrap a primary CTA to 2 lines on mobile — shorten the label instead.


2. Product Card (e.g. "Ensaymadness," "Ube Sapin-Sapin Box")

Anatomy: food image (16:9 or 1:1, radius.md top) · name (font.size.lg, weight 600) · short description (font.size.sm, text.secondary, max 2 lines) · price (font.size.lg, ink) · optional ube/flavor tag chip · primary button.

Variants: grid (storefront listing) · featured (hero/promo, larger image, script eyebrow allowed).

States:

StateRuledefaultsurface.base, shadow.1, border.subtle 1pxhoverlift to shadow.2, image scale 1.03 within clipped bounds, motion.duration.basefocus-visiblewhole card focusable if clickable: ink ring, 2px offsetactiveshadow back to .1disabled (out of stock)image desaturated 60%, "Sold out" pill in surface.strong/text.inverse, button disabledloadingskeleton: muted blocks at image/name/price positions, shimmer ≤ motion.duration.base×… respect prefers-reduced-motion (no shimmer)error (image fail)fallback to surface.muted block with centered Hola circle mark, never a broken-image icon

Responsive: 1-col < 480px, 2-col 480–768px, 3–4-col > 768px. Image always loads loading="lazy" below the fold.

Empty state: if a category has no products, show cream panel + "Fresh batch coming soon — message us to pre-order. Basta Hola, Manyaman!" + Message button.


3. Quantity Stepper (input)

Anatomy: − button · numeric input · + button, all radius.sm, ink borders.

States: default / hover (border → ink) / focus-visible (ink ring on the input) / active / disabled (at min=1, − disabled) / error (qty exceeds stock → field border state.error, helper text below).

Keyboard/pointer/touch: ArrowUp/Down increment/decrement when input focused; −/+ are real buttons (Enter/Space). Touch targets ≥44px. Input inputmode="numeric", rejects non-digits.

Edge cases: clamp to [1, stockMax]; pasting "999" snaps to max with helper text "Only 12 left."


4. Order/Contact Form (inputs)

Six inputs expected (name, mobile, email, delivery area, date, notes). Each field: label above (never placeholder-as-label), font.size.sm ink, input radius.sm, space.3 padding.

States per field: default (border.subtle) / hover (border.strong) / focus-visible (ink ring 2px, no removal of native outline without replacement) / active / disabled (surface.muted) / loading (submit-time: fields aria-disabled, button loading) / error (state.error border + icon + helper text tied via aria-describedby).

Acceptance: errors must be programmatically associated (aria-describedby), announced (aria-live="polite" on the error summary), and never color-only (icon + text required).


5. Navigation (2 instances: top bar + footer)

Top bar anatomy: Hola circle logo (links home, aria-label="Cafe Hola home") · nav links (Menu, Order, About, Contact) · cart/message CTA. Sticky, surface.base, shadow.1 on scroll.

States: link default text.primary; hover underline in brand.primary 2px; focus-visible ink ring; active/current page → ink underline + aria-current="page".

Mobile: collapses to a hamburger ≥ space.7 tall; menu is a focus-trapped dialog, Esc closes, focus returns to the toggle. Touch targets ≥44px, ≥space.2 apart.


Accessibility Requirements & Testable Acceptance Criteria

#Rule (must)Pass/Fail checkA1Body/label text on yellow uses ink #1A1A1AContrast ≥ 4.5:1 — audit with axe; fail if any white-on-yellow functional text existsA2Every interactive element has a visible focus indicatorTab through page; fail if any control shows no :focus-visible ringA3Focus ring on yellow surfaces uses ink, not yellowInspect CTA focus; fail if ring contrast < 3:1 against #F2B705A4All form errors are non-color-only and associatedSubmit empty form; fail if no icon+text or no aria-describedbyA5All images have alt text; decorative ones are alt=""Axe scan; fail on missing/duplicate altA6prefers-reduced-motion disables image zoom, shimmer, transitionsToggle OS setting; fail if motion persistsA7Mobile menu traps focus and restores it on closeKeyboard test; fail if focus escapes or is lostA8Touch targets ≥ 44×44pxMeasure in devtools; fail if smaller


Content & Tone Standards (with examples)

ContextDoDon'tPrimary CTA"Add to cart" / "Message to order""Tara!" / "Get yours"Promo eyebrow (script ok)Perfect Pair for Rainy Days!generic "Sale"Product desc"Soft, buttery ensaymada topped with grated cheese.""Best ensaymada ever!!!"Sign-off line"Basta Hola, Manyaman!"overusing it inside controlsOut of stock"Fresh batch coming soon — message us to pre-order.""Error: no items"Form error"Enter a mobile number we can reach you on.""Invalid input."

The script face and Manyaman! phrase are brand seasoning — one per view, in hero or sign-off only.


Anti-Patterns and Prohibited Implementations


❌ White or yellow text on yellow surfaces for functional content (A1).
❌ Pacifico/script for prices, labels, buttons, or body copy.
❌ Placeholder text standing in for field labels.
❌ Color-only error signaling.
❌ Broken-image icons — use the Hola-circle fallback.
❌ Ad-hoc spacing/type values outside the defined scales.
❌ Removing native focus outlines without a compliant replacement.
❌ Anime/manga styling — this brand is a Kapampangan bakery, not an anime property; keep the identity food-forward and folk-warm.




QA Checklist


 All colors/spacing/type come from semantic tokens; zero raw hex in components.
 Every component documents all 7 states (default, hover, focus-visible, active, disabled, loading, error).
 No white/yellow-on-yellow functional text anywhere (A1).
 Focus-visible ring present and ink-based on every interactive element (A2, A3).
 Form errors: icon + text + aria-describedby + live region (A4).
 All images have correct alt; fallback uses Hola mark (A5, product card error).
 prefers-reduced-motion honored across cards, nav, skeletons (A6).
 Mobile menu traps and restores focus; Esc closes (A7).
 All touch targets ≥ 44×44px (A8).
 Responsive grids verified at 480 / 768 / 1024px.
 Empty and out-of-stock states render the approved copy.
 Script face + "Manyaman!" used at most once per view, never in controls.
 Page density matches spec: links (6), inputs (6), buttons (4), navigation (2).