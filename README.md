# Hosur Saravana Crackers — Premium Fireworks Website

A premium, mobile-first frontend website for **Hosur Saravana Crackers**, a certified fireworks retail store based in Hosur, Tamil Nadu. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

---

## Live Preview

Open `index.html` directly in any modern browser. No server or installation required.

---

## Project Structure

```
claude code website/
├── index.html          # Full page HTML — all 10 sections
├── style.css           # Complete design system & responsive layout
├── script.js           # All JavaScript modules (IIFE, no globals)
├── details.txt         # Original project specification
└── assets/
    ├── Redirecting___.jpg    # Hero panel — assorted crackers box
    ├── Fire Cracker.jpg      # Offer banner background + hero accent card
    ├── download (3).jpg      # About section + benefits panels
    ├── download (4).jpg      # Product cards (ladi category)
    └── 🎆.jpg                # Categories section background overlay
```

---

## Sections

| # | Section | Description |
|---|---|---|
| 1 | **Navbar** | Fixed glassmorphism header with smooth scroll links and mobile hamburger menu |
| 2 | **Hero** | Asymmetric 55/45 split — left-aligned content, full-bleed image right with diagonal clip-path |
| 3 | **Benefits** | Zig-zag 2-column layout with 4 benefit blocks and alternating image panels |
| 4 | **Categories** | Dark section with 7 animated filter pill buttons |
| 5 | **Featured Products** | 12 products with category filter, live search, and add-to-enquiry per card |
| 6 | **Offer Banner** | Full-width kinetic dual-track marquee with festive messaging |
| 7 | **About** | Dark section with brand story, pull-quote, and animated stat counters |
| 8 | **Safety Tips** | 6 safety guidelines in a responsive card grid |
| 9 | **Contact** | Split layout — contact info + WhatsApp CTA on left, enquiry form on right |
| 10 | **Footer** | 4-column dark footer with quick links, categories, social icons |

---

## Features

### UI & Interaction
- Responsive navbar with hamburger toggle and animated X transition
- Scroll-based navbar — transparent glass → opaque dark on scroll
- Active nav link tracking as user scrolls through sections
- Smooth scroll to sections with fixed navbar height offset
- Scroll reveal animations via `IntersectionObserver` with staggered delays
- Ripple click effect on all buttons
- Count-up animation for hero and about section statistics
- Seamless dual-track marquee with CSS keyframe animation

### Products
- 12 sample products across 6 categories (Sparklers, Rockets, Ladi, Ground, Novelty, Combo)
- Masonry-feel grid — selected cards span 2 rows using `grid-row: span 2`
- Category filter buttons (synced between Categories and Products sections)
- Live search with 300ms debounce, clear button, and empty state display
- Product cards: image, label badge, category, name, offer price, MRP, savings %, CTA

### Enquiry System
- **Floating enquiry panel** — fixed bottom-right, slides open on add or toggle
- Add / increment / decrement items per product card
- Running total with `en-IN` locale formatting
- Badge counter with pop animation on item add
- Persisted in `localStorage` (try/catch safe for Safari private mode)
- **WhatsApp integration** — formats all enquiry items into a readable message and opens `wa.me/` link in a new tab

### Contact Form
- Name, phone, category, message fields
- Inline client-side validation with error messages below each field
- Submit → opens WhatsApp with form data pre-filled as a message (no backend required)

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--red` | `#c41e3a` | Primary CTA, accents, active states |
| `--orange` | `#e8621a` | Safety icons, secondary tags |
| `--gold` | `#d4a017` | Labels, section headers, price highlight |
| `--cream` | `#fdf6e3` | Hero background, light section backgrounds |
| `--dark` | `#0d1b2a` | Navbar, about section, product cards |
| `--off-white` | `#f9f5ef` | Page base background |

### Typography
- **Display / Headings**: `Playfair Display` (Google Fonts) — 400, 700, 700 italic
- **Body / UI**: `Outfit` (Google Fonts) — 400, 500, 600, 700
- No `Inter`. No generic system fallbacks for brand text.

### Breakpoints (mobile-first)

| Breakpoint | Width | Notable Changes |
|---|---|---|
| Base | `< 640px` | Single column, stacked hero, category horizontal scroll |
| Tablet | `≥ 640px` | 2-col safety grid, 2-col footer, filter wraps |
| Desktop | `≥ 1024px` | Split hero, zig-zag benefits, 3-col safety, 4-col footer |
| Wide | `≥ 1280px` | Generous hero padding |

---

## JavaScript Modules

All code is encapsulated in a single IIFE (no global pollution). Modules:

| Module | Responsibility |
|---|---|
| `NavbarModule` | Scroll watcher, hamburger toggle, active link tracking |
| `SmoothScrollModule` | Anchor intercept, offset for fixed nav, `history.pushState` |
| `ScrollRevealModule` | `IntersectionObserver` factory, `data-delay` stagger |
| `AnimationModule` | Marquee text clone, click ripple, count-up counters |
| `ProductModule` | `renderProducts(list)`, `cardHTML(p)` — full re-render on filter/search |
| `FilterModule` | Active category state, `apply()` combining filter + search |
| `SearchModule` | Debounced `input` listener, clear button, reset handler |
| `EnquiryModule` | Add/remove/increase, `renderFloat()`, panel toggle, localStorage |
| `WhatsAppModule` | `buildMessage()`, `sendEnquiry()`, form validation + `sendFormEnquiry()` |

### Initialisation Order
```js
NavbarModule.init()
SmoothScrollModule.init()
ScrollRevealModule.init()
AnimationModule.init()
ProductModule.renderProducts(products)   // renders all 12 on load
FilterModule.init()
SearchModule.init()
EnquiryModule.init()                     // restores localStorage
WhatsAppModule.init()
```

---

## Configuration

### WhatsApp Number

Open `script.js` and update the constant at the top:

```js
var WHATSAPP_NUMBER = '919876543210';
// Format: country code + number, no spaces or dashes
// India example: '919876543210' for +91 98765 43210
```

### Adding / Editing Products

Edit the `products` array in `script.js`. Each product object:

```js
{
  id: 13,                           // unique integer
  name: 'Product Name',
  category: 'sparklers',            // sparklers | rockets | ladi | ground | novelty | combo
  mrp: 200,                         // original price (number)
  price: 160,                       // offer price (number)
  label: 'New',                     // badge text
  tagClass: 'tag--red',             // tag--gold | tag--red | tag--orange | tag--dark | tag--cream | tag--gradient
  image: 'assets/your-image.jpg',   // null for gradient placeholder
  tall: false                       // true = spans 2 grid rows (masonry effect)
}
```

---

## 12 Sample Products

| # | Name | Category | MRP | Offer | Label |
|---|---|---|---|---|---|
| 1 | Golden Sparkle Sticks (Pack of 10) | Sparklers | ₹120 | ₹95 | Best Seller |
| 2 | Colour Sparkle Wands (Pack of 5) | Sparklers | ₹80 | ₹65 | New Arrival |
| 3 | Sky Thunder Rockets (Box of 6) | Rockets | ₹350 | ₹280 | 20% Off |
| 4 | Single Shot Shell — Red Star | Rockets | ₹220 | ₹180 | Popular |
| 5 | Whistling Rocket Bouquet | Rockets | ₹480 | ₹380 | Premium |
| 6 | Classic Red Ladi 1000 Wala | Ladi | ₹160 | ₹130 | Traditional |
| 7 | Deluxe Ladi 5000 Wala — Grand | Ladi | ₹380 | ₹299 | Best Value |
| 8 | Flower Pot Ground Chakkar | Ground | ₹200 | ₹160 | 20% Off |
| 9 | Rainbow Ground Fountain | Ground | ₹275 | ₹220 | Trending |
| 10 | Musical Novelty Cracker Box | Novelty | ₹320 | ₹250 | Unique |
| 11 | Kids Safe Diwali Gift Set | Novelty | ₹450 | ₹360 | Gift Pack |
| 12 | Ultimate Family Combo Box | Combo | ₹1200 | ₹899 | Combo Deal |

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | Full |
| Firefox 88+ | Full |
| Safari 14+ | Full (`100svh` requires Safari 15.4+, falls back gracefully) |
| Edge 90+ | Full |
| Mobile Chrome / Safari | Full (touch-optimised) |

> **Note:** The emoji filename `assets/🎆.jpg` is referenced in CSS as a `background-image`. It works in all modern browsers when opened locally or served over HTTP.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure, ARIA roles, Open Graph meta |
| CSS3 | Custom properties, CSS Grid, `clip-path`, `backdrop-filter`, keyframe animations |
| Vanilla JavaScript (ES5) | All interactivity — no jQuery, no frameworks |
| Google Fonts | Playfair Display + Outfit |
| WhatsApp API | `wa.me/` deep link for enquiry and contact form |
| localStorage | Enquiry list persistence across sessions |
| IntersectionObserver | Scroll reveal animations |

---

## Licence

This project is for demonstration and educational purposes. All product names, prices, licence numbers, and contact details are fictional placeholders. Replace with real business information before deployment.
