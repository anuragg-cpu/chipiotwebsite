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

## Known gaps (no more `[COPY:]`/`[SPEC:]`/`[PLACEHOLDER:]` markers in the code)

Every bracketed placeholder has been filled with real content or removed —
nothing left says `[COPY: ...]` on the page. What's still genuinely
incomplete:

- **Technical specs table**: only has the 4 specs we have real numbers for
  (frequency band, regulatory compliance, connectivity dependency, range).
  Battery life, receiver panel capacity, alert output, installation, and
  certifications were dropped from the table rather than invented — add
  those rows back once the numbers exist.
- **Gallery**: has 5 real product photos; the "endpoint device, in-situ /
  mounted" angle was dropped rather than left as a placeholder box, since no
  source material has that shot yet.
- **Brochure PDF**: `assets/brochure/ABHAY-Product-Brochure.pdf` is the three
  segment decks (Builders, Housing Societies, Coworking) concatenated as-is.
  Swap in a purpose-built general brochure if/when one exists.
- **Form backend**: the demo request form (`#demoForm`) submits via a
  `mailto:` link to anuragg@chipiotembedded.com as a working interim path —
  no hosted backend (Formspree, Netlify Forms, custom API) has been wired up
  yet. See `assets/js/main.js` to swap in a real endpoint.
- **Canonical/OG URL**: no `<link rel="canonical">` is set (a guessed one
  was removed — a wrong canonical actively hurts SEO). Add the real one
  once the domain is live. Same for `og:image`.
- **Segment cards without a source deck**: System Integrator, Hospital, and
  Campus one-liners were written from the site's own established positioning
  (offline-first, no WiFi/app dependency) rather than from a dedicated deck
  like the other four segments — worth a sanity check against real customer
  conversations in those verticals.

## Brand system

- Headings: Oswald · Technical/spec/label text: IBM Plex Mono
- Primary: `#3B5DF1` (blue) · Accent/CTA: `#FA9600` (orange)
- CTA buttons on blue use white text; CTA buttons on orange use dark text —
  white-on-orange fails WCAG AA contrast at this shade, so keep that pairing
  as-is when editing button styles.
