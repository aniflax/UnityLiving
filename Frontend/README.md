# Unityaliving Showcase

Build a minimalist, premium, ultra-fast real estate marketing website for a brand called Unityaliving, based in Indore, Madhya Pradesh. Match the aesthetic, pacing, section structure, and micro-animations of a high-end luxury real estate site (large full-bleed hero imagery, generous whitespace, thin serif/sans display type, slow fade/parallax reveals, muted stone/beige/charcoal palette, no clutter, no stock-corporate look).

This must be built as a clean, component-based React + Tailwind app (Vite or Next.js style structure is fine — I will export the code and continue development in VS Code, and connect it to Strapi as a headless CMS). So:

Every dynamic content block (hero slides, projects, blog posts, testimonials, team members, amenities, locations) must be structured as components that accept props/data objects — not hardcoded inline — so I can later swap static data for Strapi API fetches with minimal refactor.
Create a /lib/data/ (or /data/) folder with mock JSON/TS files shaped exactly like a Strapi REST response ({ id, attributes: {...} } style) for: projects.ts, blogPosts.ts, testimonials.ts, teamMembers.ts, amenities.ts, heroSlides.ts. This makes the future Strapi swap a drop-in replacement.
Keep components small, reusable, and named clearly (Hero, ProjectCard, ProjectGrid, WhatsAppButton, Footer, EnquiryForm, etc).
Prioritize performance: lazy-load below-the-fold images, use next/image-style responsive image components or native loading="lazy", compress/serve WebP sample images, avoid heavy 3D libraries — use CSS/Framer Motion based parallax and image-based hero (NOT a WebGL 3D model) so first paint stays fast. Target Lighthouse Performance 90+.
Use Framer Motion for scroll-reveal, fade-up, and stagger animations (this replicates the "slow luxury reveal" feel of the reference site without heavy 3D overhead).
1. BRAND / GLOBAL DETAILS
Brand name: Unityaliving
Tagline (hero): "Building Spaces That Feel Like Home" style — write an original tagline: "Where Living Finds Its Meaning" with sub-lines "Crafted With Quality That Lasts" / "Creating Homes For Generations"
Address: Unityaliving, Indore, Madhya Pradesh, India
Email: unityaliving@gmail.com
Phone / WhatsApp: +91 6232 691 255
Logo: simple wordmark "Unityaliving" in a thin serif or high-end sans (e.g., Cormorant/Fraunces for display headings + Inter/Manrope for body) — generate a minimal text-based logo mark, no stock icon
Color palette: warm off-white (
#F7F5F1), charcoal/near-black (
#1B1B1A), stone beige (
#C9BFAE), muted gold accent (
#A98A4C) used sparingly for CTAs/lines
Typography: Large display serif for headings (Fraunces / Cormorant Garamond), clean sans for body/nav (Inter / Manrope), generous letter-spacing on nav links and eyebrow labels (uppercase, small, tracked-out)
Motion language: slow fades (600–900ms ease-out), image scale-in on hero load, scroll-triggered fade-up for text blocks, subtle parallax on hero image layers, smooth underline-draw hover on nav links, image hover zoom (scale 1.05) on project cards
2. GLOBAL COMPONENTS (appear on every page)
2.1 Header / Navbar
Fixed/sticky, transparent over hero (turns solid white/blur on scroll)
Left: Unityaliving logo
Center/right nav: Home | Company ▾ | Projects ▾ | Upcoming Projects ▾ | Careers | Media ▾ | Contact
Company ▾ dropdown: About Us, Director's Desk, Careers, Privacy Policy, Terms & Conditions
Projects ▾ dropdown: dynamic list of live projects
Upcoming Projects ▾ dropdown: dynamic list of upcoming destinations
Media ▾ dropdown: News/Blog, Press
Right side: small "Callback" pill button + "Enquire Now" solid button (charcoal bg, cream text)
Mobile: full-screen slide-in menu, staggered link fade-in animation
2.2 WhatsApp Floating Button (fixed, bottom-right, on every page)
Circular floating action button, WhatsApp green, subtle pulse/breathing animation every few seconds
Fixed position: bottom: 24px; right: 24px; z-index high, stays above all content, responsive on mobile (slightly smaller, above safe-area)
On click: opens https://wa.me/916232691255?text=Hi%20Unityaliving%2C%20I%27d%20like%20to%20know%20more
Optional: small tooltip "Chat with us" on hover (desktop only)
2.3 Footer (every page)
Dark charcoal background, cream text
Column 1: Logo + one-line brand mission ("Redefining the standard of thoughtful living in Indore, Madhya Pradesh.") + full address
Column 2 "Company": About Us, Director's Desk, Careers, Privacy Policy, Terms & Conditions
Column 3 "Explore": Projects, Upcoming Projects, News, Contact
Column 4 "Get in Touch": phone (+91 6232 691 255, tel: link), email (unityaliving@gmail.com, mailto: link), working hours (Mon–Sat · 10am–7pm), social icons (Instagram, Facebook, LinkedIn, YouTube — placeholder links)
Small embedded Google Map preview — an <iframe> Google Maps embed centered on Indore, Madhya Pradesh, rounded corners, ~280–320px wide card, sitting in the footer near the address column, with a "Get Directions" link below it opening Google Maps in a new tab
Bottom bar: "© 2026 Unityaliving. All rights reserved." + "RERA registered · Indore, Madhya Pradesh" (placeholder) + credit line placeholder
3. PAGE-BY-PAGE BREAKDOWN
PAGE 1 — HOME (/)
Hero Section (full viewport height)
Full-bleed rotating/crossfading hero image carousel (3 sample luxury home/exterior images — use elegant architectural placeholder images), slow Ken Burns zoom on each slide, auto-crossfade every 6–7s
Large centered/left-aligned display headline animating in line-by-line: "Building Spaces That Feel Like Home" → your version: "Spaces Designed Around Life" / "Built With Quality That Lasts" / "Creating Value For Years To Come"
"Scroll" indicator at bottom with animated downward line
This is the "3D-feeling" hero but implemented as fast-loading layered images + parallax + subtle motion — NOT actual 3D/WebGL, so it loads instantly
"More Than Four Walls" intro section
Two-column: short emotional paragraph about home/community on one side, large image on the other
Below: 3-stat row with animated counters: "Homes — Built to Last", "Design — Led By Excellence", "Quality — In Every Detail"
Horizontal auto-scrolling image gallery strip (interiors, living rooms, kitchens) — 6–7 sample images, subtle marquee/scroll on hover
"Luxury Redefined" CTA banner — full-width image with overlay text + "Learn More" button linking to /projects
Upcoming Projects / Destinations teaser
Eyebrow "Holiday & Weekend Homes" → Heading "Escape to Nature"
Category tabs: Beach & Lake / Mountain / Farmland
Card grid (image + location + one-line description + "Explore" link) — sample destinations: e.g. "Mahabaleshwar Hills", "Omkareshwar Riverside", "Pachmarhi Retreat" (Central-India-appropriate placeholders)
Location & Connectivity section
Split layout: large map/aerial image on one side, on the other: "Location & Connectivity" eyebrow, big heading "Indore — Central India's Growth Hub", short paragraph, 3 feature tags with icons: "Seamless Connectivity / Well Connected", "Safe & Secure / Trusted Community", "Peaceful Living / Landscaped Community"
"Find Your Dream Home" — Featured Residences carousel
Horizontal draggable/swipeable carousel of 3–4 sample project cards (image, project name, location, built form, 3 spec tags, "View Residence" button)
"All residences →" link top-right
"A Home Built the Way You Always Imagined" — 3-column feature block
Crafted / Connected / Complete — each with short paragraph, accompanied by a 4-image animated collage on the right (interior finish samples)
Insights & Updates (Blog teaser)
2–3 latest blog post cards (image, category tag, date, title) pulled from blogPosts.ts — "→ All articles" link to /media
Get in Touch / Lead Capture Section
Full-width dark section, heading "Ready to find your perfect home?"
Enquiry form: Name, Phone, Email, "Enquiring as…" dropdown (Home Buyer / Broker / Investor / Corporate / NRI Buyer), consent checkbox referencing Privacy Policy, "Request a Callback" submit button
Background: large muted architectural image behind form panel
PAGE 2 — About Us (/about)
Hero image banner with heading "Redefining the Standard of Thoughtful Living" + short mission line
"The Foundation of Everything We Do" section — vision statement + 4-point checklist (Thoughtfully designed spaces / Attention to detail / Prime locations / Commitment to customer satisfaction)
Two-column "Our Mission" / "Our Vision" text blocks
Pull-quote block: italic founder quote
Founder/Director card: initials avatar, name (placeholder "Founder Name"), title "Managing Director", "Read the full message →" linking to /director
PAGE 3 — Director's Desk (/director)
Hero banner, portrait image placeholder + full letter-style long-form message from the Director (2–3 paragraphs, warm and personal tone), signature block
PAGE 4 — Projects Listing (/projects)
Hero banner: "Find the Residence That Is Right for You"
Sticky in-page anchor nav pills to jump to each project section (project names)
For each project (repeat pattern, alternating image-left/image-right layout):
Project name heading, one-paragraph description, Location, Built Form, 3 spec bullet tags, "View Project" + "Enquire" buttons
Create 4 sample projects for Unityaliving, Indore-appropriate, e.g.:
"Elysian — Vijay Nagar" — 4BHK independent floors, gated community
"The Palms — Rau" — 3BHK garden residences
"Silverwood — Bicholi Mardana" — premium duplex villas
"Meridian Heights — Super Corridor" — 5BHK sky residences
Bottom "Get in Touch" CTA banner
PAGE 5 — Project Detail (/projects/[slug]) — dynamic template
Full-bleed hero image of the project
Overview section: description, key specs table (location, built form, unit sizes, possession)
Image gallery grid (masonry, lightbox on click)
Amenities grid (icon + label, from amenities.ts)
Floor plan section (placeholder images/PDF download button)
Location map (embedded Google Map)
Enquiry form (project-specific, pre-filled "Interested in: [Project Name]")
PAGE 6 — Upcoming Projects Listing (/upcoming-projects)
Same layout pattern as Projects listing but for future/holiday-home destinations
4 sample destinations with category tag (Beach & Lake / Mountain / Farmland), short description, "Explore" link
PAGE 7 — Upcoming Project Detail (/upcoming-projects/[slug])
Same dynamic template as project detail, adapted copy for a retreat/weekend-home concept
PAGE 8 — Careers (/careers)
Hero: "Build Your Career With Us"
Culture/values 3-column block
Open positions list (accordion cards: title, department, location, "Apply" button opening a simple application form/modal with name, email, resume upload, message)
PAGE 9 — Media / News Listing (/media or /blog)
Grid of blog/news cards (image, category, date, title, excerpt) — 6 sample articles with real-estate-relevant titles (e.g., "5 Reasons Indore Is Emerging as Central India's Real Estate Hotspot", "Rent vs Buy in Indore: What Makes Sense in 2026")
Pagination or "Load more"
PAGE 10 — Blog Post Detail (/media/[slug])
Article hero image, title, date, category tag
Rich-text article body (structured to match Strapi rich-text block output)
Related articles section at bottom
PAGE 11 — Contact (/contact)
Split layout: left = contact details card (address, phone, email, working hours, social icons) + embedded Google Map (larger version than footer, centered on Indore, MP); right = enquiry form (Name, Phone, Email, Subject, Message, Enquiring-as dropdown, submit)
Success/confirmation state after form submit (toast or inline message)
PAGE 12 — Privacy Policy (/privacy-policy)
Simple long-form legal text template, styled with the same typography system, table of contents sidebar on desktop
PAGE 13 — Terms & Conditions (/terms-and-conditions)
Same template pattern as Privacy Policy
PAGE 14 — 404 Not Found
On-brand minimal page: large "404", short message, "Back to Home" button, same hero-style background image
4. FORM & INTERACTION BEHAVIOR
All forms should be built with clean client-side validation, disabled-state submit button while "sending", success/error toast notifications
Structure form submission as a single async function (submitEnquiry(data)) in /lib/api.ts — stub it to console.log / mock resolve now, so it's a one-line swap to POST to a Strapi enquiries collection endpoint later
WhatsApp button, phone links (tel:+916232691255), and mail links (mailto:unityaliving@gmail.com) must work immediately, no placeholders
5. ANIMATION SPEC (Framer Motion, keep consistent site-wide)
Page transition: soft fade (300ms)
Section reveal: fade-up (opacity 0→1, y: 24px→0) triggered on scroll into view, staggered 80–120ms between siblings
Hero text: line-by-line reveal with slight upward motion, 150ms stagger
Image cards: scale 1 → 1.05 on hover over 500ms ease
Nav links: underline draws left-to-right on hover, 250ms
Counters (stat numbers): count-up animation when scrolled into view
6. PERFORMANCE REQUIREMENTS
Use optimized/responsive <img> with explicit width/height to prevent layout shift
Lazy-load all images except the first hero slide (preload hero image 1 for fast LCP)
Code-split routes, avoid unnecessary heavy libraries (no full 3D engine)
Keep total hero JS light — animations via CSS transforms + Framer Motion, not canvas/WebGL
7. SAMPLE CONTENT TO GENERATE

Since I'll swap in real data via Strapi later, populate everything now with realistic placeholder/sample text and stock-style architectural/interior images (use elegant neutral-toned real estate photography placeholders) — for hero slides, all 4 projects, all 4 upcoming destinations, 6 blog posts, team/director bio, testimonials (add a testimonials carousel component even though the reference site didn't heavily feature one — 4–5 short client quotes with name/project).

Build this now as a fully working, multi-page, responsive Lovable project with React Router (or file-based routing) for all pages listed above, global Header/Footer/WhatsApp button, mock-Strapi-shaped data files, and Framer Motion animations throughout.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fcfccc24-3fc3-4abd-bb2c-3aae10ede122).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
