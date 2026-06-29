# Security

Threat model, CSP policy, and pre-launch checklist for holabakery.skaldris.com.

## Threat model

This is a static marketing site with no user authentication, no server, and no database. The only server-side component is Formspree (third-party form handler). Risks are limited to:

1. **Form spam** — mitigated by Formspree server-side filtering + honeypot field
2. **Clickjacking** — mitigated by `X-Frame-Options: SAMEORIGIN`
3. **XSS via injected content** — no user-generated content is rendered; CSP restricts scripts
4. **Sensitive data in transit** — HTTPS enforced via .htaccess redirect

## CSP policy

Defined in `.htaccess`. Review and tighten before deploy:

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self' https://formspree.io;
frame-ancestors 'none';
```

If Plausible analytics is enabled, add `https://plausible.io` to `script-src` and `connect-src`.

## Pre-launch checklist

- [ ] HTTPS enforced — test redirect from http://
- [ ] `X-Content-Type-Options: nosniff` header present
- [ ] `X-Frame-Options: SAMEORIGIN` header present
- [ ] CSP header present and tested (no console violations on any page)
- [ ] Formspree spam filter enabled in Formspree dashboard
- [ ] Honeypot field present in OrderInquiryForm (`_gotcha`, hidden, `tabIndex=-1`)
- [ ] No PII in URL query strings (form success routes to `/order/thanks/` with no params)
- [ ] `NEXT_PUBLIC_FORMSPREE_ORDER_ID` set in host build environment (not committed)
- [ ] `.env.local` not committed (`.gitignore` covers it)
- [ ] No `console.log` or debug output in production build
- [ ] `out/` inspected for no unintended files (private keys, `.env`, etc.)
- [ ] `robots.ts` disallows `/order/thanks/`
- [ ] Open Graph images use food photography (no PII embedded)
