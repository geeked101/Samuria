# Samurai×× Travels (Static Website)

This is a **static HTML/CSS/JS** website (no build step). Pages share a common nav, currency toggle, and reveal animations via `assets/shared.css` + `assets/shared.js`.

## Setup (run locally)

You can open the HTML files directly, but using a local server is recommended (for consistent asset loading).

- **Option A (VS Code / Cursor)**: install “Live Server”, then right‑click `index.html` → “Open with Live Server”.
- **Option B (Python)**:

```bash
cd samurai-travels
python -m http.server 5500
```

Then open `http://localhost:5500/index.html`.

## Project structure

- `index.html`: Home page + hero + services, etc.
- `tours.html`: Tours & pricing + tabs + expandable tour cards + FAQ.
- `gallery.html`: Image gallery page (static).
- `booking.html`: Booking/enquiry form page (static).
- `assets/shared.css`: Shared site styling (nav/footer/buttons/variables).
- `assets/shared.js`: Shared behavior (mobile menu, currency toggle, reveal animations).
- `assets/favicon.svg`: Site icon.

> **Images**
>
> - Place images under `assets/` (recommended: create `assets/images/` if you start adding many).
> - The home hero background is configured to use `assets/bg.jpg` (make sure the file exists there).

## Important sections (what to look for)

### Home (`index.html`)

- **Hero section**: `#hero`
  - Background layer: `.hero-bg` (uses gradients + `assets/bg.jpg`)
  - Decorative layers: `.stars`, `.sun-glow`, `.hero-horizon` SVG, `.guide-figure` SVG
  - CTA buttons: “Explore Tours” → `tours.html`, “Book a Trip” → `booking.html`
- **Services cards**: `#services`
  - Each card links to a `tours.html#<tab>` anchor (e.g. `tours.html#safari`)
- **Testimonials / CTA / Footer**: bottom of the page

### Tours & Pricing (`tours.html`)

- **Tabs**: `.tab-btn` and sections `#tab-safari`, `#tab-sea`, `#tab-city`, `#tab-photo`, `#tab-transfer`, `#tab-custom`
  - URL hash is supported (e.g. `tours.html#sea`).
- **Tour cards**: `.tour-card`
  - Clicking a card expands it (details panel).
  - Each expanded card includes a **3-tile media strip** (`.tour-media-tile`) and “more highlights”.
  - Clicking a tile opens a **lightbox** preview with **Prev/Next** for tiles in the same card.
- **FAQ**: `#faq` accordion.
- **Transfers pricing table**: inside the `#tab-transfer` section.

### Gallery (`gallery.html`)

- Static gallery layout (cards/tiles).
- Update image sources + captions in the HTML.

### Booking (`booking.html`)

- Static booking form.
- Tour links may pass a query string like `booking.html?tour=mara-classic` (used for preselecting / context, if implemented in the page).

## Emojis & icons (where they are)

This site uses emojis as lightweight icons in multiple places:

- **Nav / buttons**: e.g. WhatsApp floating button (💬)
- **Home services cards**: 🦁 🌊 🏙️ 🚐 🗺️ 📸
- **Tours tabs**: 🦁 🌊 🏙️ 📸 🚐 🗺️
- **Tour thumbnails**: large emojis (🦁 🐘 🦒 etc.)
- **Tour highlight bullets**: `✦` is added via CSS (`.tour-highlights li::before`)

You can replace emojis with images/SVGs later, but emojis keep the site fast and simple.

## Changeable elements (quick customization list)

### Branding / contact

- **Logo text**: `SAMURAI××` in the `<nav>` of each page.
- **Phone / email / location**: in each page footer (`<footer class="site-footer">`).
- **WhatsApp link**: floating button near bottom right:
  - `href="https://wa.me/254700000000"` (update the number + optional prefilled message)

### Hero background image

- **File expected**: `assets/bg.jpg`
- **Where it’s set**: `index.html` CSS rule for `.hero-bg`

### Tours (names, prices, highlights)

In `tours.html`, each tour card contains:

- **Tour name**: `.tour-name`
- **Price**: `.price-val` with `data-kes="..."` (base value used for conversions)
- **Highlights list**: `<ul class="tour-highlights">`
  - First 3 items stay visible
  - Remaining items move into the expanded “more” section automatically

### Currency toggle + conversion

- Defined in `assets/shared.js`:
  - `RATES` and `SYMBOLS`
  - Any element with `data-kes="12345"` will be converted when currency changes

### Expandable tour cards + lightbox behavior

- Implemented in `tours.html` in the inline script:
  - `initTourCardExpand()` handles expand/collapse
  - Lightbox opens when clicking `.tour-media-tile`
  - Arrow navigation: **Left/Right keys** or **‹/› buttons**

### Colors / typography

- Global theme variables are in `assets/shared.css` under `:root`:
  - `--green-deep`, `--green-mid`, `--green-bright`, `--gold`, `--dark`, etc.

## Common edits (examples)

- **Change a tour price**: edit `data-kes` on the `.price-val` element.
- **Add more tour highlights**: add more `<li>` items; the extra ones will appear in the expanded panel.
- **Swap tile placeholders for real photos**:
  - Replace a tile’s contents with an image:

```html
<div class="tour-media-tile">
  <img src="assets/images/mara-1.jpg" alt="Maasai Mara sunrise" />
</div>
```

The lightbox will automatically show the full image.

---

Built by Pluto

