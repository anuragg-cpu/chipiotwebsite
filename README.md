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
assets/img/              Drop real product photography here
assets/brochure/         Drop the product brochure PDF here
```

## What still needs to be filled in

- **Copy**: every `[COPY: ...]` placeholder in `index.html` is where final
  marketing copy goes. Section structure won't need to change to drop it in.
- **Specs**: `[SPEC: ...]` placeholders in the technical specifications table
  (How ABHAY Works section) need real numbers (range, battery life, panel
  capacity, etc).
- **Photography**: every `.img-placeholder` box (`[PLACEHOLDER: ...]`) marks
  where a real product photo goes. Replace the placeholder `<div>` with an
  `<img>` tag pointing to a file in `assets/img/`.
- **Brochure PDF**: the "Download Brochure" button links to
  `assets/brochure/ABHAY-Product-Brochure.pdf`, which does not exist yet —
  add the real file at that path (or update the `href`).
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
