# Vulcanizare Ciuson Website Redesign - 2026

## Overview
Complete modern redesign of the vulcanizare (tire repair) shop website using Next.js 15, React 19, and Tailwind CSS.

## Design System

### Color Palette
- **Primary Orange**: #FF6633 (CTAs, accents, highlights)
- **Dark Background**: #1A1A1A (main background)
- **Cream/Beige**: #E8DCC8 (secondary backgrounds)
- **Text Light**: #F5F5F5 (primary text on dark)
- **Text Dark**: #2D2D2D (text on light backgrounds)
- **Text Muted**: #999 (secondary/tertiary text)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold 600-800 weight
- **Body**: Regular 400 weight
- **All caps labels**: 600-700 weight with letter-spacing

## Components Created/Modified

### Layout (`app/layout.tsx`)
- Updated to use Inter font
- Added JSON-LD schema markup for local business
- Removed image background overlay
- Tailwind color integration

### Home Page (`app/page.tsx`)
- Hero section with animations
- Services grid (2x2)
- 3D Wheel section
- CTA/Booking section

### Hero Component (`components/Hero.tsx`)
- **Use client** with Framer Motion
- Staggered animations on load
- 24/7 badge with pulse animation
- Large headline with orange accent
- Scroll indicator with bounce animation
- Smooth parallax effects

### Services Component (`components/Services.tsx`)
- **2x2 responsive grid** (1 col mobile, 2 col tablet, 2x2 desktop)
- 4 service cards:
  1. VULCANIZARE (Professional tire repair)
  2. VULCANIZARE MOBILĂ (24/7 mobile service)
  3. REPARAȚII ANVELOPE (Cold/hot repairs)
  4. SPĂLĂTORIE AUTO (Car detailing)
- Card hover effects: scale, shadow, color change
- Glassmorphic backgrounds
- Number badges (01-04)
- Scroll-triggered animations

### WheelSection Component (`components/WheelSection.tsx`)
- Centerpiece 3D wheel section
- Feature callouts left/right
- Lazy loading with Suspense
- Responsive text layout

### WheelCanvas Component (`components/WheelCanvas.tsx`)
- Three.js 3D scene setup
- Rotating torus geometry (placeholder)
- Metallic materials with orange accent lights
- Mobile fallback (static image)
- Responsive canvas sizing
- ~2 second rotation cycle

### CtaSection Component (`components/CtaSection.tsx`)
- Split layout: Left (services + CTA), Right (map + info)
- Quick service buttons: Anvelope, Jante, Echilibrare, TPMS
- Google Maps embedded
- Contact information display
- "Vezi Prețuri" button
- Fully responsive grid layout

### Navbar Component (`components/Navbar.tsx`)
- Fixed header with scroll detection
- Desktop navigation with links
- Mobile hamburger menu
- Responsive logo/branding
- Phone CTA button
- Active state highlighting
- Smooth transitions

### Footer Component (`components/Footer.tsx`)
- Centered minimal design
- Vulcanizare Ciuson branding
- Copyright year dynamic
- Quick navigation links
- Orange divider line
- Removed WebbingHUB attribution (as requested)

### Preturi Page (`app/preturi/page.tsx`)
- Dark theme matching homepage
- Price table with hover effects
- Loading state with spinner
- Responsive table layout
- CTA button for calls
- Firebase integration for price data

### Not Found Page (`app/not-found.tsx`)
- 404 error page with dark theme
- Return home link
- Matching design system

## Styling & Animations

### Global CSS (`app/globals.css`)
- Smooth scroll behavior
- Custom animations:
  - `fadeInUp`: Staggered fade-in
  - `float`: Floating motion
  - `slideInLeft/Right/Up`: Directional reveals
- Glassmorphism effect utility class

### Tailwind Config
- Extended color palette
- Custom animations in keyframes
- Background gradient utilities
- Letter spacing for headings

### Animations Library
- **Framer Motion** for scroll-triggered and interactive animations
- **Three.js** for 3D rendering
- CSS transitions for basic hover states
- Staggered animations for list items

## Responsive Breakpoints
- **Mobile**: < 640px (single column, optimized touch)
- **Tablet**: 640-1024px (2-column layouts)
- **Desktop**: 1024px+ (full 2x2 grids, interactions)

## Performance Optimizations
- Next.js Image optimization
- Lazy loading components with Suspense
- Code splitting by route
- Framer Motion GPU-accelerated animations
- Three.js canvas optimization for mobile (fallback image)

## SEO & Metadata
- Proper OpenGraph tags
- Twitter card support
- JSON-LD schema markup (LocalBusiness)
- Canonical URLs
- Meta descriptions
- Sitemap support

## Contact Information
- Phone: +40 761 627 184
- Location: km9+700, Timișoara
- Available: 24/7

## Brand Assets Preserved
- Service names in Romanian
- Phone number
- Location details
- 24/7 availability messaging

## Future Integration
- **3D Wheel Model**: Ready to accept GLTF/GLB files or custom Three.js models
  - Place model files in `public/models/`
  - Update `WheelCanvas.tsx` to load the model
  - Supports interactive rotation and click interactions

## Tech Stack
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion 11
- **3D Graphics**: Three.js r128
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Database**: Firebase (preserved)
- **Components**: shadcn/ui (for future use)

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development
```bash
npm install
npm run dev  # Runs on http://localhost:3030
npm run build
npm start
npm run lint
```

## Notes
- All images in `/public/images/` are preserved
- Firebase configuration is preserved
- Analytics tracking is preserved
- Mobile-first responsive design
- Performance optimized with lazy loading
- Smooth animations with no jank
- Ready for Vercel deployment
