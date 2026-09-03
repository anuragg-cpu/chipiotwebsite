# ABHAY Landing Site

Product landing/sales page for **ABHAY**, a wireless emergency alert system by
ChipIOT Embedded Solutions (innovation arm of Paras Telecom Pvt. Ltd.).

## Stack

Static HTML + CSS + vanilla JS. No framework, build step, or backend — this is
a single-page marketing site with a client-side-validated lead form, which is
fully served by plain static files.

## Deployment

Hosted on **GitHub Pages** (free, no separate account needed since the repo
already lives on GitHub) at **abhay.chipiotembedded.com**. The `CNAME` file
in the repo root tells GitHub Pages which custom domain to serve.

To finish activating it:
1. In this repo's GitHub Settings → Pages, set Source to "Deploy from a
   branch", branch `main`, folder `/ (root)`.
2. At your DNS provider for chipiotembedded.com (Squarespace), add a CNAME
   record: host `abhay`, value `anuragg-cpu.github.io`.
3. Once DNS propagates, GitHub auto-issues an HTTPS certificate — enable
   "Enforce HTTPS" in the same Pages settings page when it becomes available.

## Structure

```
index.html              All sections (hero, demo-video, problem, how-it-works,
                         offline-first comparison, segments, trust, gallery,
                         CTA/form, footer) + the lightbox dialog markup
assets/css/style.css     Design tokens (incl. dark-mode token overrides) + all styling
assets/js/main.js        Mobile nav, dark-mode toggle, accordions, scroll-reveal,
                         video carousel, lightbox, demo-form handling
assets/img/               Real product photography + video poster frames
assets/video/            4 real demo clips (3 landscape + 1 vertical), sourced
                         from the ABHAY WhatsApp footage
assets/brochure/         ABHAY-Product-Brochure.pdf — merged from the three
                         segment decks (Builders, Housing Societies, Coworking)
```

## Features added in the 2026 design pass

- **Full-bleed hero** with a diagonal gradient overlay on the real product
  photo (the one place a gradient/duotone treatment is applied to a photo —
  every other product shot on the page stays untreated by design).
- **"See ABHAY in Action" video carousel** (`#demo-video`, right after the
  hero): 4 real clips, one loaded/playing at a time. Nothing is fetched
  until the carousel scrolls into view; switching clips unloads the
  outgoing video's `src` so at most one is ever buffered. Vertical clip
  renders in a phone-frame container.
- **Icon infographic** replaces the old photo-only "How ABHAY Works" flow;
  the 3 original photos moved to a de-emphasized thumbnail strip that opens
  a lightbox (`<dialog>`-based, Escape/backdrop-click/button all close it).
- **Accordions** on the Problem and Segments cards — collapsed by default,
  real DOM content at all times (not `display:none`-until-JS, so it stays
  crawlable), toggled via a real click handler with correct
  `aria-expanded`/`aria-controls`.
- **Dark mode toggle** in the header, persisted to `localStorage`, applied
  before first paint via an inline script (no flash of the wrong theme).
  The CTA band, demo form, footer, and video-carousel section are
  deliberately fixed-color cards that don't follow the toggle — same
  pattern as the footer already used, extended consistently everywhere a
  component's colors are hardcoded rather than token-based.
- **Scroll-triggered fade-up** on each section's heading, and an animated
  "draw-in" on the how-it-works connector arrows, both skipped entirely
  under `prefers-reduced-motion: reduce`.
- Gallery photos now have a caption + spec-tag line under each image.
- `#offline-first` moved to appear right after `#how-it-works`, before
  `#segments`; nav links reordered to match.

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
- **Form backend**: the demo request form (`#demoForm`) posts leads as JSON
  to the ABHAY Leads public intake endpoint (see `LEAD_INTAKE_URL` in
  `assets/js/main.js`). The URL embeds a write-only "create lead" token —
  by design safe to expose in public client-side JS, since it can only
  create leads, nothing else. Includes a hidden honeypot field
  (`#fWebsite`) for basic spam filtering, per the endpoint's contract.
  **Not yet verified end-to-end** — see the note below.
- **Segment cards without a source deck**: System Integrator, Hospital, and
  Campus one-liners were written from the site's own established positioning
  (offline-first, no WiFi/app dependency) rather than from a dedicated deck
  like the other four segments — worth a sanity check against real customer
  conversations in those verticals.

## CRM integration status

The form is wired to `https://server.tail9f05c4.ts.net/public/intake/...`
(a Tailscale-hosted endpoint from a separate CRM project) exactly per the
contract it published: JSON POST, `name`/`company`/`email`/`phone`/
`segment`/`message`/`website` fields, honeypot spam filtering, 200/429/400
response handling. **This has not been confirmed reachable from a live
browser yet** — automated testing during development couldn't complete a
TLS handshake to that host (timed out at the SSL layer, while unrelated
HTTPS sites worked fine from the same network path), which usually means
the Tailscale Funnel wasn't actively serving traffic at that moment rather
than a problem with this integration. Before relying on it: submit a real
test lead from the live site and confirm it lands in the CRM.

## Brand system

- Headings: Oswald · Technical/spec/label text: IBM Plex Mono
- Primary: `#3B5DF1` (blue) · Accent/CTA: `#FA9600` (orange)
- CTA buttons on blue use white text; CTA buttons on orange use dark text —
  white-on-orange fails WCAG AA contrast at this shade, so keep that pairing
  as-is when editing button styles.
