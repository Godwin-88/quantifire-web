# QuantiFire Web — Landing Page Rebrand & 3D Animation Plan

## Goal

Rebrand `quantifire-web` from a quant finance personal portfolio to a **full-service digital agency** offering five core services: **Quantitative Research, Web Development, Process Automation, Data Engineering, Data Analytics**. Mirror the structural template of `fweezytech/src/app/page.tsx` and add **unique 3D CSS animations** to the homepage hero that differ from fweezytech's device-stack approach.

---

## 1. Brand Identity Changes

| Item | Before | After |
|---|---|---|
| Site title | Quantifaya — Antifragile Quantitative Intelligence | QuantiFire — Digital Engineering & Analytics |
| Tagline | TradFi and DeFi quant tools | Quantitative Research · Web Development · Process Automation · Data Engineering · Data Analytics |
| Primary accent | `#e94560` (qf-red) | `#6366f1` (indigo — modern agency feel) |
| Secondary accent | `#3b82f6` (qf-blue) | `#0ea5e9` (sky blue) |
| Footer brand text | "Full-Stack Engineer · AI/ML · Quant Finance" | "Digital Engineering Agency · Nairobi, Kenya" |
| Nav links | Blog, Projects, Contact | Services, Work, About, Contact |
| Metadata descriptions | Quant finance focused | Services-focused, SEO for quant research / web dev / automation / data eng / analytics |

---

## 2. Structural Template (from fweezytech)

Mirror the homepage structure of `fweezytech/src/app/page.tsx`:

```
<HeroSection3D />
<SocialProofBar />
<ServicesSection />
<ServiceDetailSection />     // 4 detailed sections, one per service
<ProcessSection />           // How-we-work section
<PortfolioSection />         // Sample work / case studies
<CTASection />
<NewsletterSection />
```

Each section component follows fweezytech conventions:
- `'use client'` for animated sections
- `ScrollReveal` wrapper for scroll-triggered entrance
- `CounterAnimation` for stats
- `SectionHeading` for consistent section headers with label + title + view-all link
- CSS 3D transforms (`perspective`, `transform-style: preserve-3d`) for hero 3D effect
- `framer-motion` for all animations

---

## 3. Component Changes

### 3.1 Remove
- `src/components/landing/Hero.tsx` — replace with 3D hero
- `src/components/landing/ProductSections.tsx` — replace with ServicesSection
- `src/components/landing/SocialProof.tsx` — replace with animated SocialProofBar
- `src/components/landing/ContentPreview.tsx` — replace with PortfolioSection
- `src/components/landing/ContactCTA.tsx` — replace with CTASection

### 3.2 Add (mirroring fweezytech's `components/home/` pattern)

| Component | Source Template | Description |
|---|---|---|
| `src/components/home/HeroSection3D.tsx` | **new — unique design** | Canvas 3D particle constellation + rotating icosahedron wireframe + flip-card service previews |
| `src/components/home/SocialProofBar.tsx` | `fweezytech/.../SocialProofBar.tsx` | Animated counters for client stats |
| `src/components/home/ServicesSection.tsx` | **new** | Grid of 5 service flip-cards with 3D perspective card-flip on hover (front: icon + name, back: tagline + features) |
| `src/components/home/ServiceDetailSection.tsx` | `fweezytech/.../HeroSection.tsx` | 5 alternating-layout sections per service |
| `src/components/home/ProcessSection.tsx` | new | 3-step process (Discover → Build → Scale) |
| `src/components/home/PortfolioSection.tsx` | `fweezytech/.../ArticlesSection.tsx` (adapted) | Case study cards |
| `src/components/home/CTASection.tsx` | `fweezytech/.../AboutCTA.tsx` (adapted) | Primary CTA |
| `src/components/home/NewsletterSection.tsx` | `fweezytech/.../NewsletterSection.tsx` | Email capture |
| `src/components/home/SectionHeading.tsx` | `fweezytech/.../SectionHeading.tsx` | Reusable section header |
| `src/components/home/ScrollReveal.tsx` | `fweezytech/.../ScrollReveal.tsx` | Intersection observer animation wrapper |
| `src/components/home/CounterAnimation.tsx` | `fweezytech/.../CounterAnimation.tsx` | Animated number counter |
| `src/components/home/ParticleField.tsx` | **new — custom** | Canvas 3D particle constellation with orbital motion, neural-network bonds, and mouse repulsion (not a copy of fweezytech's particle field) |

### 3.3 Update Existing

- **`src/app/page.tsx`** — replace with new home page structure mirroring fweezytech's `page.tsx`
- **`src/components/layout/Navbar.tsx`** — update brand, nav links, and CTAs for services brand
- **`src/components/layout/Footer.tsx`** — rebrand links, update company info, remove finance-specific links
- **`src/app/globals.css`** — update brand colors, add new animation utilities for 3D
- **`src/app/layout.tsx`** — update metadata (title, description, OG tags) for new brand

---

## 4. 3D Animation Implementation (unique, not a copy of fweezytech)

Unlike fweezytech's device-stack (`rotateY` + Z-translation) approach, quantifire uses two distinct 3D techniques:

1. **Canvas 3D Particle Constellation** — A `tsParticles`-style particle system rendered on `<canvas>` where particles orbit and connect in a data-flow constellation pattern around the hero text. Particles drift along curved paths (spherical coordinates), form temporary bonds between nearby nodes (like a neural network), and respond to mouse position with gentle repulsion. This creates a living "data ecosystem" feel distinct from fweezytech's static particle field.

2. **CSS 3D Perspective Card Flip** — Service cards in the ServicesSection use `perspective: 1000px` with `rotateY(180deg)` on hover, flipping to reveal a detailed description on the back face. Each card is a "flip card" where the front shows the icon + service name and the back shows the tagline + key features. This is fundamentally different from fweezytech's 3D device tilt.

3. **Scroll-driven 3D Parallax Layers** — The hero section has 3 depth layers (foreground text, midground constellations, background gradient) that move at different speeds on scroll using `translateZ` with `perspective`. This creates a depth-of-field effect without JavaScript animation libraries.

4. **Rotating Geometric Wireframe** — A CSS-only rotating icosahedron wireframe (`border` triangles forming a polyhedron) as a subtle ambient background element in the hero, using `@keyframes rotate3d` animation. This ties the "quantitative research" brand identity to geometric/mathematical aesthetics.

---

## 5. Dependency Changes

### Add to `package.json`
```
framer-motion: ^11.x  (not in quantifire-web yet — required for all animations)
```

### Tailwind Config Updates (`tailwind.config.ts`)
- Add new brand colors: `brand-primary: #6366f1`, `brand-accent: #0ea5e9`, `brand-bg: #0f0a2e`
- Add 3D animation keyframes (`float`, `rotate3d`, `parallax`)
- Add `font-heading` variable (use Space Grotesk like fweezytech, or keep Inter)

### CSS Updates (`globals.css`)
- Add new `bg-grid` with indigo tones
- Add `hero-glow` radial gradients with new brand colors
- Add `.perspective-1000` utility class for 3D containers
- Add `preserve-3d` helpers

---

## 6. File Operations

```
quantifire-web/src/
├── app/
│   ├── layout.tsx              → Update metadata, brand, OG tags
│   ├── page.tsx                → Full rewrite with new page structure
│   └── globals.css             → Update brand colors, 3D utilities
├── components/
│   ├── landing/                → DELETE entire directory
│   └── home/                   → CREATE (12 new components)
│       ├── HeroSection3D.tsx
│       ├── SocialProofBar.tsx
│       ├── ServicesSection.tsx
│       ├── ServiceDetailSection.tsx
│       ├── ProcessSection.tsx
│       ├── PortfolioSection.tsx
│       ├── CTASection.tsx
│       ├── NewsletterSection.tsx
│       ├── SectionHeading.tsx
│       ├── ScrollReveal.tsx
│       ├── CounterAnimation.tsx
│       └── ParticleField.tsx
│   └── layout/
│       ├── Navbar.tsx          → Update brand + links
│       └── Footer.tsx          → Update brand + links
├── tailwind.config.ts          → Add new brand colors, animations
└── package.json                → Add framer-motion dependency
```

---

## 7. Implementation Steps (order matters)

1. **Add `framer-motion` dependency** — `npm install framer-motion`
2. **Update `tailwind.config.ts`** — brand colors, animations, font-heading
3. **Update `globals.css`** — brand palette, 3D utilities, hero glow effects
4. **Update `layout.tsx`** — new metadata, brand description, OG tags
5. **Update `Navbar.tsx`** — brand name, new nav links, updated CTAs
6. **Update `Footer.tsx`** — new brand links, company description
7. **Create `components/home/` directory** and all 12 new components (copy/adapt from fweezytech)
8. **Rewrite `page.tsx`** — new page structure using home components
9. **Delete `components/landing/` directory** — old components no longer needed
10. **Verify build** — `npx next build` to confirm no errors
11. **Verify typecheck** — `npx tsc --noEmit`

---

## 8. 3D Animation Details (Canvas 3D Perspective — unique to quantifire)

HeroSection3D structure:
- `<canvas>` particle constellation: particles orbit in spherical coordinates, form transient bonds between nearby nodes (neural-network visualization), and gently repel from mouse cursor
- Rotating icosahedron wireframe (`border`-based CSS triangles) as ambient background, animated with `@keyframes rotate3d`
- 3 scroll-depth layers: foreground text, midground constellations, background gradient — different `translateZ` speeds on scroll
- Service flip-cards in ServicesSection: `perspective: 1000px` + `rotateY(180deg)` on hover, front face shows icon + name, back face shows tagline + features

Service card 3D flip:
- Each card uses `transform-style: preserve-3d` on the card container
- Front face: icon, service name, short description
- Back face (rotated 180deg): tagline, feature list, CTA link
- `framer-motion` `animate` for smooth flip transition on hover

Icosahedron wireframe:
- 20 triangular faces built with CSS `border` elements forming a polyhedron
- `@keyframes rotate3d` animates `transform: rotate3d(1, 0.5, 0.3, 360deg)` over 20s infinite
- Ultra-low opacity (`opacity: 0.06`) so it's a subtle ambient effect, not a distraction

---

## 9. Service Data (replaces PRODUCTS data)

```
SERVICES = [
  {
    id: 'quantitative-research',
    name: 'Quantitative Research',
    icon: '📐',
    tagline: 'Rigorous statistical models that transform data into competitive advantage',
    description: 'Custom quantitative research engines — from Monte Carlo simulations to factor models and time-series forecasting. Built for finance, energy, and logistics sectors.',
    features: ['Monte Carlo Simulation', 'Factor Model Construction', 'Time-Series Forecasting', 'Risk Decomposition', 'Backtesting Frameworks'],
    color: '#6366f1',
  },
  {
    id: 'web-development',
    name: 'Web Development',
    icon: '🌐',
    tagline: 'Fast, accessible, and scalable web applications',
    description: 'Full-stack web applications built with modern frameworks — Next.js, React, Tailwind — delivered with production-grade quality.',
    features: ['Next.js 16 + React 19', 'TypeScript · Tailwind CSS', 'Responsive & Accessible', 'CMS Integration', 'Performance Optimized'],
    color: '#0ea5e9',
  },
  {
    id: 'process-automation',
    name: 'Process Automation',
    icon: '⚡',
    tagline: 'Eliminate manual work with intelligent automation',
    description: 'Workflow automation using n8n, Make, and custom scripts. From data pipelines to multi-step approval flows — we automate it.',
    features: ['n8n · Make Integrations', 'Custom Python Scripts', 'API Orchestration', 'Error Handling & Retries', 'Monitoring Dashboards'],
    color: '#10b981',
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    icon: '🔗',
    tagline: 'Robust pipelines that turn raw data into structured assets',
    description: 'ETL/ELT pipelines, data warehousing, and real-time streaming. Built on PostgreSQL, dbt, and cloud-native infrastructure.',
    features: ['ETL Pipeline Design', 'dbt Transformations', 'PostgreSQL · BigQuery', 'Real-time Streaming', 'Data Quality Monitoring'],
    color: '#f59e0b',
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    icon: '📊',
    tagline: 'Actionable insights powered by statistical rigor',
    description: 'Exploratory analysis, statistical modeling, and dashboards that drive decisions. Python, R, and BI tool expertise.',
    features: ['Statistical Modeling', 'Python · R Analysis', 'Dashboard Design', 'A/B Testing Framework', 'Predictive Analytics'],
    color: '#ec4899',
  },
]
```

---

## 10. Brand Color Palette (new)

```
--brand-primary:   #6366f1  (indigo — primary CTA, headings)
--brand-accent:    #0ea5e9  (sky blue — secondary accents, highlights)
--brand-bg:        #0f0a2e  (deep indigo bg — hero gradients)
--brand-fg:        #e2e8f0  (light text on dark)
```

These replace the old `qf` palette and align with the agency/consulting positioning.

---

## 11. Risks & Open Questions

1. **framer-motion version compatibility** — fweezytech uses `^12.43.0`. quantifire-web uses Next.js 16.1.7 which is compatible. Recommend installing `framer-motion@^11.0.0` for stability.
2. **Tailwind CSS v4 vs v3** — quantifire-web uses Tailwind v3 (postcss.config.js with `tailwindcss` plugin). fweezytech uses Tailwind v4 (`@tailwindcss/postcss`). The plan keeps quantifire on **Tailwind v3** to avoid breaking changes — the structural pattern is replicated without upgrading the Tailwind version.
3. **`@/` path alias** — both projects use `"@/*": ["./src/*"]` in tsconfig.json. No changes needed.
4. **ParticleField canvas** — fweezytech's ParticleField uses `requestAnimationFrame` and is marked `'use client'` / dynamically imported with `ssr: false`. This pattern should be replicated.
5. **No Supabase or CMS changes** — this plan only touches the landing page. Backend services (Supabase, blog, products) remain unchanged.

---

## 12. Validation

1. `npx next build` — must complete without errors
2. `npx tsc --noEmit` — no type errors
3. `npx next lint` — no lint errors
4. Visual check: homepage has 3D hero with floating service cards, particle background, scroll-reveal animations on all sections
5. All 5 services visible and properly branded (Quantitative Research listed first)
6. 3D animations are unique — canvas particle constellation and card flip, not a device stack
7. Navbar and Footer reflect new agency branding
7. Mobile responsiveness intact (fweezytech pattern is mobile-first)
