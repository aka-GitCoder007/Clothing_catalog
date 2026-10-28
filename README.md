# VØID ARCHIVE — Avant-Garde Luxury Streetwear & Technical Haute Couture

A complete, immersive, high-end 3D clothing e-commerce web application engineered for **VØID ARCHIVE**, a fictional luxury streetwear fashion house operating between Tokyo, Paris, and Berlin. 

Designed with a brutalist, architectural, futuristic editorial aesthetic inspired by Rick Owens, Balenciaga, Prada, A-COLD-WALL*, and technical performance outerwear.

---

## 🏛️ Architectural Aesthetic & Design System

- **Color Palette:**
  - Obsidian Void: `#080808`
  - Deep Charcoal: `#0e0e0e`, `#141414`, `#1c1c1c`
  - Alabaster Off-White: `#F5F3EE`
  - Muted Silver & Titanium: `#A0A0A0`, `#8F9094`, `#C4C4C4`
  - Crimson Accent: `#9E1B22` / `#D12630`
- **Typography:**
  - Modern high-fashion sans-serif with ultra-wide letter spacing (`Inter`)
  - Technical monospace data labels (`JetBrains Mono`)
  - Massive architectural headlines, brutalist strokes, and uppercase metadata
- **Philosophy:**
  - Form subverts utility. Utility enforces form. Monolithic durability with zero generic template compromises.

---

## ⚡ Tech Stack

- **Framework:** React 18 with TypeScript
- **Bundler & Tooling:** Vite
- **Styling:** Tailwind CSS with custom editorial configuration
- **Animations:** Framer Motion (page transitions, spring drawers, toast notifications, hover reveals)
- **3D Graphics:** Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Icons:** Lucide React
- **Routing:** React Router DOM (v6)
- **State Management:** Zustand with `persist` middleware for persistent storage in browser `localStorage`
- **Confetti:** Canvas Confetti

---

## ✨ Features Implemented

### 1. Interactive 3D Hero Experience
- Custom procedural 3D technical garment sculpture (**M-01 Exoskeleton Parka Chassis**) featuring:
  - Articulated bicep and sleeve geometries with ballistic elbow rings
  - High funnel collar with throat tab
  - Dual magnetic chest harness straps (Fidlock® V-Buckles)
  - Orbiting holographic HUD rings with technical coordinates
  - Floating sine-wave animation and smooth mouse/drag rotation
- **Interactive 3D Controls:**
  - **4 Material Coatings:** `OBSIDIAN`, `CHROME` (liquid metal), `CRIMSON` (bioluminescent), and `BONE` (chalk matte)
  - **Exploded Chassis View:** Assembles / disassembles garment components in 3D space
  - **X-Ray Mode:** Toggles technical wireframe view
  - **Auto-Rotation:** Toggleable continuous showcase spin
  - **Camera Controls:** Damped OrbitControls with bounded tilt angles
  - **Graceful WebGL Fallback:** Automatic detection with 2.5D archival layered fallback if WebGL is unavailable

### 2. Comprehensive Navigation & Header
- Dynamic Announcement Bar with rotating ticker announcements, free shipping counter, and live currency selector (USD `$`, EUR `€`, GBP `£`, JPY `¥`)
- Minimalist luxury header with brand logo, nav links (`SHOP`, `NEW ARRIVALS`, `COLLECTIONS`, `EDITORIAL`, `ATELIER`), live search modal trigger, wishlist count badge, and interactive cart badge with live subtotal
- Responsive full-screen slide-out mobile navigation drawer

### 3. Product Catalogue & Shop (`/shop`)
- **18 Detailed Luxury Streetwear Products** across 6 categories:
  - Outerwear (GORE-TEX Parkas, Primaloft Bombers, Technical Trenches, Haori Kimonos)
  - Hoodies & Sweats (650 GSM Ultra-Heavy French Terry, Acid Washed Pullovers)
  - T-Shirts & Tops (340 GSM Heavy Boxy Tees, Merino Balaclava Baselayers)
  - Pants & Cargos (Ballistic 12-Pocket Cargos, Pleated Wool Trousers, Zip Flared Trackpants)
  - Footwear (Strata 65mm Vibram platform boots, Cyber-Derby hybrid sneakers)
  - Tactical Accessories (Modular Chest Rig, Fidlock Crossbody, Beta-Titanium Shield Glasses, Cobra Belts)
- **Comprehensive Functional Filters:**
  - Multi-category checkboxes
  - Interactive price range slider ($200 - $1600)
  - Size matrix filter (XS, S, M, L, XL, XXL, OS)
  - Tonal color palette swatches
  - Stock availability toggle (All, In Stock, Limited Editions [1/100])
  - Capsule collection filter
- **Sorting Options:**
  - Featured Archives
  - New Arrivals First
  - Price: Low to High
  - Price: High to Low
  - Top Rated
- **Search & Filter Pills:**
  - Live query debouncing, individual removable filter tags, and "Clear All" reset
- **Grid Layout Switcher:** 2-column, 3-column, or 4-column responsive layouts
- **Quick Actions on Product Cards:**
  - Dual-image hover transitions
  - Quick size selector drawer directly on the card
  - Wishlist heart animation toggle
  - Quick View modal trigger with full specs

### 4. Product Detail Page (`/product/:id`)
- Multi-angle high-resolution image gallery with thumbnail strip
- **3D Spatial Mode:** Toggle between 3D interactive viewer and photography for hero pieces
- Price display with original price comparison and currency conversion
- Color variant switcher
- Size selector with live stock status (e.g. "Only 2 left") and strict validation before checkout
- Quantity stepper
- Interactive **Biometric Size Guide Modal** (with live metric / imperial unit conversion)
- Collapsible Accordions:
  - Design & Architecture
  - Technical Specifications & Hardware
  - Complimentary Global Shipping & Archival Care
- Customer reviews section with verified purchaser badges
- "Complete the Silhouette" related product recommendations
- Session memory of recently viewed specimens

### 5. Shopping Cart Drawer & Dedicated Bag Page (`/cart`)
- Slide-over drawer accessible from any page + full dedicated `/cart` page
- Quantity controls with stock caps, item removal, size/color variant display
- **Free Shipping Progress Meter:** Dynamic bar calculating distance to the $350 free courier threshold
- **Promo Code System:** Supports codes `VOID10` (10% off), `ARCHIVE20` (20% off orders > $500), and `VIPFIRST` (15% off)
- Transparent fee calculation: Subtotal, Promo Discount, Courier Shipping, and 8% Estimated Duty & Tax
- Persistent storage in `localStorage`

### 6. Simulated Luxury Checkout UI (`/checkout`)
- Clearly labeled portfolio demo notice banner
- Step 1: Contact Information (Email, Phone)
- Step 2: Shipping Destination Address (Pre-filled sample addresses with full validation)
- Step 3: Dispatch Method (Complimentary Archival Courier vs. Priority Air Dispatch)
- Step 4: Payment Simulation (Credit card formatting, Apple Pay / biometric ready, Web3 USDC)
- "Place Archival Order" button with simulation loading state
- **Order Confirmation Page (`/order-confirmation/:orderId`):**
  - Unique order number generation (`VA-2026-XXXXXX`)
  - Order status progress tracker (Authorized -> Archival Packaging -> Priority Dispatch -> Client Destination)
  - Complete dispatch manifest breakdown
  - Celebratory confetti particle explosion
  - Clear cart action upon order completion

### 7. Wishlist (`/wishlist`)
- Full persistent wishlist page
- Add/remove items with feedback
- Move to cart functionality
- Empty wishlist state with curated capsule recommendations

### 8. Live Search Overlay
- Fullscreen blur backdrop search modal
- Live search query filtering across names, descriptions, membranes, materials, and collections
- Trending keyword ciphers (`GORE-TEX`, `CARGO`, `HOODIE`, `650GSM`, `VIBRAM`)
- Instant product cards with direct navigation

### 9. Editorial & Lookbook Pages
- `/editorial`: High-fashion runway dossier documenting Chapter VII with styling coordinates
- `/collections`: Deep-dive into each seasonal capsule
- `/about`: Atelier manifesto, brutalist design hypothesis, fabrication standards, and coordinates for Tokyo & Paris showrooms

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended; developed on Node v24)
- npm or pnpm

### Installation & Startup

1. Open your terminal in the project directory:
   ```bash
   cd "e:\Clothing catalog"
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local address displayed in the terminal:
   ```
   http://localhost:3000
   ```

### Production Build

To compile a production-ready optimized build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Directory Structure

```
e:\Clothing catalog\
├── public\
├── src\
│   ├── assets\
│   ├── components\
│   │   ├── cart\
│   │   │   ├── CartDrawer.tsx
│   │   │   └── CartItemRow.tsx
│   │   ├── home\
│   │   │   ├── BestSellers.tsx
│   │   │   ├── EditorialSection.tsx
│   │   │   ├── FeaturedCollections.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   └── TechSpecsSection.tsx
│   │   ├── layout\
│   │   │   ├── AnnouncementBar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── product\
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductQuickView.tsx
│   │   │   └── SizeGuideModal.tsx
│   │   ├── search\
│   │   │   └── SearchOverlay.tsx
│   │   ├── shop\
│   │   │   ├── ActiveFilters.tsx
│   │   │   ├── FilterDrawer.tsx
│   │   │   ├── FilterSidebar.tsx
│   │   │   └── SortDropdown.tsx
│   │   ├── three\
│   │   │   ├── Hero3DCanvas.tsx
│   │   │   ├── TechnicalJacket3D.tsx
│   │   │   └── ThreeFallback.tsx
│   │   └── ui\
│   │       ├── Accordion.tsx
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   ├── data\
│   │   └── products.ts
│   ├── pages\
│   │   ├── AboutPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── CollectionsPage.tsx
│   │   ├── EditorialPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── OrderConfirmationPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ShopPage.tsx
│   │   └── WishlistPage.tsx
│   ├── store\
│   │   ├── cartStore.ts
│   │   ├── uiStore.ts
│   │   └── wishlistStore.ts
│   ├── types\
│   │   ├── cart.ts
│   │   ├── filter.ts
│   │   ├── order.ts
│   │   └── product.ts
│   ├── utils\
│   │   ├── constants.ts
│   │   └── formatters.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

