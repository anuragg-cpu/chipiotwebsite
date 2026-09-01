# ABHAY Landing Site

Product landing/sales page for **ABHAY**, a wireless emergency alert system by
ChipIOT Embedded Solutions (innovation arm of Paras Telecom Pvt. Ltd.).

## Stack

Static HTML + CSS + vanilla JS. No framework, build step, or backend — this is
a single-page marketing site with a client-side-validated lead form, which is
fully served by plain static files. Deploy by pointing any static host
(Netlify, Vercel, GitHub Pages, S3, etc.) at this directory.

## Structure

```
index.html              All sections (hero, problem, how-it-works, segments,
                         offline-first comparison, trust, gallery, CTA/form, footer)
assets/css/style.css     Design tokens (brand colors/fonts) + all styling
assets/js/main.js        Mobile nav toggle, footer year, demo-form handling
assets/img/              Real product photography, sourced from the sales decks
assets/brochure/         ABHAY-Product-Brochure.pdf — merged from the three
                         segment decks (Builders, Housing Societies, Coworking)
```

## What still needs to be filled in

- **Copy**: every remaining `[COPY: ...]` placeholder in `index.html` is where
  final marketing copy goes — this covers the technical specs numbers, three
  segments with no source deck yet (System Integrator, Hospital, Campus), a
  couple of comparison-table cells, and the trust-section client mention.
- **Specs**: `[SPEC: ...]` placeholders in the technical specifications table
  (How ABHAY Works section) need real numbers (range, battery life, panel
  capacity, etc).
- **Photography**: one gallery slot (`.img-placeholder`, endpoint device
  in-situ/mounted) still needs a real photo — none of the source material has
  that angle yet.
- **Brochure PDF**: `assets/brochure/ABHAY-Product-Brochure.pdf` is the three
  segment decks (Builders, Housing Societies, Coworking) concatenated as-is.
  Swap in a purpose-built general brochure if/when one exists.
- **Form backend**: the demo request form (`#demoForm`) has no backend wired
  up. It currently only does client-side validation and shows a placeholder
  status message on submit (see `assets/js/main.js`). Once a form
  endpoint is confirmed (Formspree, Netlify Forms, custom API, etc.), wire
  the real submit in.
- **Footer contact details**: street address, phone, and email in the footer
  are placeholders.
- **Canonical/OG URL**: `index.html` has a placeholder canonical URL
  (`https://www.chipiot.in/abhay`) — update once the real domain is set.

## Brand system

- Headings: Oswald · Technical/spec/label text: IBM Plex Mono
- Primary: `#3B5DF1` (blue) · Accent/CTA: `#FA9600` (orange)
- CTA buttons on blue use white text; CTA buttons on orange use dark text —
  white-on-orange fails WCAG AA contrast at this shade, so keep that pairing
  as-is when editing button styles.
