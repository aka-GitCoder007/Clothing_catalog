import { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'sp-01-spider-hoodie',
    name: 'SPIDER TECH HOODIE',
    subtitle: 'Futuristic Streetwear Cybernetic Pullover',
    sku: 'SP-01',
    price: 580,
    originalPrice: 650,
    category: 'hoodies',
    description: 'A futuristic black streetwear hoodie with bold red detailing and technical-inspired design. Forged from custom 650 GSM structural loopback French cotton with an articulated cowl hood, biometric spider chest insignia, and integrated metallic orbital hardware.',
    details: [
      '650 GSM ultra-dense structural French terry cotton with brushed interior',
      'High-density precision rubberized crimson spider chest emblem',
      'Articulated biometric shoulder and sleeve panels with technical web graphics',
      'Dual cylindrical metallic drawstrings with anodized silver aglets',
      'Reinforced kangaroo front bellows pouch with bar-tack stress relief',
      'Double-ply structured cowl hood engineered to hold architectural silhouette',
      'Heavyweight 2x2 ribbed cuffs and waist hem for tailored taper'
    ],
    materials: [
      '100% Organic Heavy Combed Cotton (650 GSM)',
      'Hardware: Anodized Titanium & Aircraft Aluminum',
      'Rib: 95% Cotton, 5% Elastane'
    ],
    careInstructions: [
      'Machine wash gentle cold (30°C) inside out',
      'Use technical garment detergent to preserve crimson graphic luster',
      'Flat air dry in shade — do not tumble dry',
      'Do not iron directly on graphic prints'
    ],
    images: [
      '/assets/products/void-archive-spider-hoodie.png',
      '/assets/products/void-archive-spider-hoodie-clean.png'
    ],
    colors: [
      { name: 'OBSIDIAN — Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'CRIMSON — Black and red', hex: '#9E1B22', code: 'CRM' },
      { name: 'BONE — Off-white', hex: '#ded8cc', code: 'BON' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 3, 'M': 8, 'L': 6, 'XL': 2 },
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isLimitedEdition: true,
    collection: 'SYSTEMIC SILENCE FW26',
    rating: 5.0,
    reviewCount: 64,
    has3DModel: true,
    modelType: 'hoodie',
    image3D: '/assets/products/void-archive-spider-hoodie-clean.png',
    reviews: [
      {
        id: 'r-sp1',
        author: 'Arlo K.',
        rating: 5,
        date: '2026-10-18',
        comment: 'The crimson spider graphics and metallic aglets are next level. Heavyweight drape sits perfectly boxy.',
        verified: true
      },
      {
        id: 'r-sp2',
        author: 'Vesper M.',
        rating: 5,
        date: '2026-10-04',
        comment: 'The architectural hood structure holds without collapsing. True futuristic luxury streetwear.',
        verified: true
      }
    ]
  },
  {
    id: 'va-01-exoskeleton-parka',
    name: 'EXOSKELETON PARKA M-01',
    subtitle: 'Modular Weatherproof Technical Shell',
    sku: 'VA-26-OW-01',
    price: 1250,
    originalPrice: 1400,
    category: 'outerwear',
    description: 'Constructed from triple-layer hydrophobic GORE-TEX Pro membrane with articulated ballistic elbow hinges. Features integrated Fidlock magnetic harness retention system and concealed waterproof storm zips.',
    details: [
      'GORE-TEX Pro 3L breathable waterproof laminate (28,000mm)',
      'German engineered Fidlock® V-Buckle magnetic chest strap',
      'Articulated biometric sleeve pattern for unrestricted movement',
      'Two-way matte black waterproof RiRi Aquazip closures',
      'Dual concealed deployable storm hood with wire brim adjustment',
      'Modular internal sling carry system for rapid transition'
    ],
    materials: ['74% Polyamide (Cordura®)', '26% PTFE GORE-TEX Pro', 'Titanium anodized hardware'],
    careInstructions: [
      'Machine wash gentle cold (30°C)',
      'Use technical garment detergent only',
      'Tumble dry low to reactivate DWR coating',
      'Do not dry clean or bleach'
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=85',
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Raw Titanium', hex: '#8c8d8f', code: 'TIT' },
      { name: 'Soot Charcoal', hex: '#1c1c1e', code: 'STC' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 2, 'M': 5, 'L': 4, 'XL': 1 },
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isLimitedEdition: true,
    collection: 'SYSTEMIC SILENCE FW26',
    rating: 4.9,
    reviewCount: 38,
    has3DModel: true,
    modelType: 'jacket',
    reviews: [
      {
        id: 'r1',
        author: 'Kaelen V.',
        rating: 5,
        date: '2026-09-14',
        comment: 'The architectural tailoring is unmatched. Withstood torrential Tokyo downpours effortlessly.',
        verified: true
      },
      {
        id: 'r2',
        author: 'Marc R.',
        rating: 5,
        date: '2026-08-28',
        comment: 'Fidlock harness makes airport travel seamless. The silhouette commands attention.',
        verified: true
      }
    ]
  },
  {
    id: 'va-02-monolith-bomber',
    name: 'MONOLITH HEAVY BOMBER',
    subtitle: 'Oversized Primaloft® Quilted Flight Jacket',
    sku: 'VA-26-OW-02',
    price: 980,
    category: 'outerwear',
    description: 'An aggressive reinterpretation of the classic MA-1 silhouette, engineered with Japanese heavy flight satin and 200g Primaloft® Gold insulation. Features an exaggerated dropped shoulder cut and tactical sleeve utility pockets.',
    details: [
      'Japanese high-density nylon twill with oil-resistant Teflon treatment',
      'Primaloft® Gold 200gsm thermal barrier insulation',
      'Heavyweight 2x2 ribbed collar, cuffs, and hem in merino blend',
      'Internal emergency carry webbing straps',
      'Laser-cut VØID serial identifier plaque on left arm'
    ],
    materials: ['100% Japanese Flight Nylon', 'Insulation: 100% Recycled Polyester (Primaloft®)', 'Rib: 80% Merino Wool, 20% Elastane'],
    careInstructions: ['Dry clean only by leather & technical specialist', 'Do not iron'],
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Dark Blood', hex: '#631015', code: 'BLD' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 4, 'M': 6, 'L': 2, 'XL': 0 },
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isLimitedEdition: false,
    collection: 'SYSTEMIC SILENCE FW26',
    rating: 4.8,
    reviewCount: 42,
    has3DModel: true,
    modelType: 'jacket'
  },
  {
    id: 'va-03-cyber-hoodie',
    name: 'TACTICAL CYBER HOODIE 650GSM',
    subtitle: 'Ultra-Heavyweight French Terry Pullover',
    sku: 'VA-26-HD-01',
    price: 420,
    category: 'hoodies',
    description: 'Crafted from custom knitted 650 GSM organic French terry cotton. Engineered with a double-layered structured hood that maintains shape, ergonomic articulated underarm gussets, and concealed headphone routing ports.',
    details: [
      '650 GSM ultra-dense loopback organic cotton',
      'Pre-shrunk vintage wash with hand-applied distressed edges',
      'Double-ply hood constructed with zero drawstrings for brutalist minimalism',
      'Kangaroo pocket with dual interior zipped microfiber compartments',
      'Discreet high-density rubberized tonal branding on nape'
    ],
    materials: ['100% Organic Combed Cotton (650 GSM)', 'Cuffs: 95% Cotton, 5% Spandex'],
    careInstructions: ['Machine wash cold inside out', 'Flat air dry only', 'Do not tumble dry'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Alabaster Chalk', hex: '#EBE8DF', code: 'ALB' },
      { name: 'Concrete Gray', hex: '#4a4d52', code: 'CON' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: { 'XS': 3, 'S': 8, 'M': 12, 'L': 9, 'XL': 5, 'XXL': 2 },
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isLimitedEdition: false,
    collection: 'ESSENTIALS PROTOCOL',
    rating: 5.0,
    reviewCount: 94,
    has3DModel: true,
    modelType: 'hoodie'
  },
  {
    id: 'va-04-void-heavy-tee',
    name: 'VØID OVERSIGHT T-SHIRT 340GSM',
    subtitle: 'Boxy Cut Architectural Heavyweight Tee',
    sku: 'VA-26-TS-01',
    price: 240,
    category: 't-shirts',
    description: 'An immaculate heavy jersey tee constructed from 340 GSM luxury carded cotton. Designed with drop-shoulder proportion, reinforced 3cm ribbed collar that never sags, and tonal laser-etched typography.',
    details: [
      '340 GSM 100% combed ringspun cotton jersey',
      'Wide architectural boxy fit with dropped shoulders',
      'High 3.2cm tight rib neckline',
      'Blind stitched sleeves and hem',
      'Cold garment dye with enzyme wash finish'
    ],
    materials: ['100% Ringspun Cotton'],
    careInstructions: ['Machine wash cold', 'Wash with similar dark tones', 'Line dry in shade'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Bone White', hex: '#F0ECE1', code: 'BON' },
      { name: 'Washed Ash', hex: '#2c2d30', code: 'ASH' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: { 'XS': 6, 'S': 14, 'M': 18, 'L': 15, 'XL': 7 },
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    isLimitedEdition: false,
    collection: 'ESSENTIALS PROTOCOL',
    rating: 4.8,
    reviewCount: 71
  },
  {
    id: 'va-05-ballistic-cargo',
    name: 'BALLISTIC MODULAR CARGO PANT',
    subtitle: 'Ergonomic 12-Pocket Articulated Trousers',
    sku: 'VA-26-PT-01',
    price: 680,
    originalPrice: 750,
    category: 'pants',
    description: 'Engineered for tactical utility and avant-garde silhouette. Features 12 compartmentalized 3D bellow pockets, magnetic flap closures, adjustable bungee cinch hems, and knee pleating for dynamic motion.',
    details: [
      'Military-grade Cordura® 500D ripstop water-resistant fabric',
      'Deep ergonomic knee darts and diamond gusset crotch',
      'Concealed tension-lock waistband with Cobra-style buckle',
      'Ankle shock-cord cinches with custom CNC aluminum toggles',
      'Teflon stain repellent and weather shield coating'
    ],
    materials: ['70% Cordura Ripstop', '30% Stretch Nylon', 'Duraflex & Aluminum hardware'],
    careInstructions: ['Machine wash cold gentle', 'Do not tumble dry', 'Cool iron with press cloth'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Dark Olive', hex: '#282b23', code: 'OLV' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 3, 'M': 7, 'L': 5, 'XL': 2 },
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isLimitedEdition: false,
    collection: 'SYSTEMIC SILENCE FW26',
    rating: 4.9,
    reviewCount: 53,
    has3DModel: true,
    modelType: 'pants'
  },
  {
    id: 'va-06-strata-boot',
    name: 'STRATA HIGH-PLATFORM SNEAKER',
    subtitle: 'Brutalist Molded Vibram® Sole Footwear',
    sku: 'VA-26-FT-01',
    price: 890,
    category: 'footwear',
    description: 'Futuristic architectural footwear fusing Italian calfskin leather with a massive sculptural Vibram® Megagrip outsole. Features a side-zip entry with quick-lace speed system.',
    details: [
      'Full grain Italian matte calfskin leather',
      'Custom sculpted 65mm Vibram® Megagrip compound platform',
      'Side waterproof YKK Excella zipper for instantaneous entry',
      'Ortholite memory foam anatomical insole with silver ion odor control',
      'Padded Achilles support and calf collar'
    ],
    materials: ['Upper: 100% Italian Calf Leather', 'Sole: 100% Vibram® Rubber Megagrip', 'Lining: 100% Breathable Calfskin'],
    careInstructions: ['Wipe clean with damp cloth', 'Use neutral leather conditioner', 'Store in archival dust bag'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Monolith', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Chalk Bone', hex: '#DDD8CB', code: 'CHK' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 2, 'M': 4, 'L': 6, 'XL': 1 },
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isLimitedEdition: true,
    collection: 'SYSTEMIC SILENCE FW26',
    rating: 4.9,
    reviewCount: 29
  },
  {
    id: 'va-07-matrix-trench',
    name: 'KINETIC SUBVERSION TRENCH COAT',
    subtitle: 'Maxi Length Technical Duster',
    sku: 'VA-26-OW-03',
    price: 1480,
    category: 'outerwear',
    description: 'An authoritative floor-sweeping silhouette forged from bonded Italian technical gabardine with matte rubberized finish. Features magnetic split storm flaps, internal harness straps, and deep modular storm lapels.',
    details: [
      'Italian bonded tech-gabardine with 15k water resistance',
      'Double-breasted storm construction with hidden magnetic snaps',
      'Removable belt with matte black aircraft-grade aluminum buckle',
      'Rear dramatic deep walking vent with snap closure',
      'Silk-blend cupro lining with internal document pockets'
    ],
    materials: ['68% Technical Cotton', '32% Polyurethane Membrane', 'Lining: 100% Cupro'],
    careInstructions: ['Specialist dry clean only', 'Do not steam directly on rubberized surface'],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Slate Gray', hex: '#373a40', code: 'SLT' }
    ],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 1, 'M': 3, 'L': 2 },
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isLimitedEdition: true,
    collection: 'GENESIS ARCHIVE',
    rating: 5.0,
    reviewCount: 19,
    has3DModel: true,
    modelType: 'coat'
  },
  {
    id: 'va-08-tactical-vest',
    name: 'MODULAR RIG CHEST SYSTEM',
    subtitle: 'MOLLE-Compatible Harness Vest',
    sku: 'VA-26-AC-01',
    price: 360,
    category: 'accessories',
    description: 'A versatile utility chest harness engineered with ballistic nylon and laser-cut MOLLE webbing. Equipped with quick-release magnetic Fidlock buckles and detachable waterproof utility pouches.',
    details: [
      '1000D Cordura® high-tenacity nylon construction',
      'Dual magnetic rapid-release shoulder and rib buckles',
      '3 detachable modular pouches with internal key tethers',
      'Breathable 3D spacer mesh back panel for ventilation',
      'Fully adjustable 4-point harness system'
    ],
    materials: ['100% Cordura 1000D Nylon', 'Fidlock® V-Buckles', 'YKK Aquaguard Zippers'],
    careInstructions: ['Spot clean with mild soap and water', 'Air dry thoroughly'],
    images: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Ghost Silver', hex: '#A8ABB2', code: 'SIL' }
    ],
    sizes: ['OS'],
    stock: { 'OS': 15 },
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isLimitedEdition: false,
    collection: 'SYSTEMIC SILENCE FW26',
    rating: 4.7,
    reviewCount: 31,
    has3DModel: true,
    modelType: 'jacket'
  },
  {
    id: 'va-09-wide-trouser',
    name: 'ARCHITECTURAL PLEATED WIDE TROUSER',
    subtitle: 'Fluid Drape Japanese Wool-Blend Pant',
    sku: 'VA-26-PT-02',
    price: 520,
    category: 'pants',
    description: 'Impeccably tailored wide-leg trousers cut with deep double inverted front pleats. Designed to drape dramatically over footwear with high-rise waist and extended floor hem.',
    details: [
      'Japanese virgin wool with 5% elastane high-twist bounce',
      'Double architectural forward knife pleats',
      'Extended waistband tab with concealed horn button closure',
      'Split rear v-notch waistband for supreme comfort',
      'Reinforced kick tape along interior hems'
    ],
    materials: ['95% Japanese Virgin Wool', '5% Elastane', 'Lining: 100% Viscose'],
    careInstructions: ['Dry clean only', 'Warm iron with pressing cloth'],
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Pebble Gray', hex: '#7a7a7a', code: 'PEB' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 5, 'M': 8, 'L': 6, 'XL': 3 },
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isLimitedEdition: false,
    collection: 'STUDIO EDITION',
    rating: 4.8,
    reviewCount: 22
  },
  {
    id: 'va-10-cyber-hooded-vest',
    name: 'THERMAL SHIELD DOWN GILET',
    subtitle: '800 Fill-Power Geometric Puffer',
    sku: 'VA-26-OW-04',
    price: 760,
    category: 'outerwear',
    description: 'Sculptural asymmetric down vest filled with 800-fill responsible goose down. Features geometric baffle welding, an oversized funnel neck, and side-entry fleece-lined handwarmer pockets.',
    details: [
      '800 FP RDS-certified ethical goose down (90/10)',
      'Ultralight ripstop micro-nylon with matte crinkle finish',
      'Asymmetric two-way magnetic front zipper',
      'Interior zip security pocket with RFID shielding',
      'Elasticized internal storm waist skirt'
    ],
    materials: ['Shell: 100% Recycled Polyamide', 'Fill: 90% Goose Down, 10% Feather'],
    careInstructions: ['Machine wash gentle cold with down wash', 'Tumble dry low with 3 dryer balls'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Raw Silver', hex: '#B8BAC2', code: 'RSV' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 3, 'M': 5, 'L': 4, 'XL': 1 },
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isLimitedEdition: false,
    collection: 'SYSTEMIC SILENCE FW26',
    rating: 4.9,
    reviewCount: 47,
    has3DModel: true,
    modelType: 'jacket'
  },
  {
    id: 'va-11-raw-hem-hoodie',
    name: 'DESTRUCTIVE ACID WASH HOODIE',
    subtitle: 'Overdyed Mineral Fade Sweatshirt',
    sku: 'VA-26-HD-02',
    price: 390,
    category: 'hoodies',
    description: 'Each piece is individually treated with mineral wash and artisan distress distressing. Cut in an oversized boxy proportion with dropped shoulder seams and raw unfinished cuffs.',
    details: [
      '500 GSM loopback heavyweight French cotton',
      'Hand-applied acid wash creating unique patina per garment',
      'Raw edge roll hem and distressed pocket borders',
      'Reinforced shoulder tape for shape longevity',
      'Brushed silver metal eyelets on reverse'
    ],
    materials: ['100% Heavy Combed Cotton'],
    careInstructions: ['Wash cold separately to preserve unique wash', 'Dry flat in shade'],
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Mineral Obsidian', hex: '#1c1c1f', code: 'MIN' },
      { name: 'Acid Rust', hex: '#4a251b', code: 'RST' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 4, 'M': 9, 'L': 7, 'XL': 3 },
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isLimitedEdition: true,
    collection: 'GENESIS ARCHIVE',
    rating: 4.7,
    reviewCount: 26,
    has3DModel: true,
    modelType: 'hoodie'
  },
  {
    id: 'va-12-merino-balaclava-tee',
    name: 'INTEGRATED BALACLAVA BASELAYER',
    subtitle: 'Merino Seamless Compression Longsleeve',
    sku: 'VA-26-TS-02',
    price: 290,
    category: 't-shirts',
    description: 'A revolutionary baselayer constructed with seamless 3D circular knitting. Features an integrated pull-over balaclava hood that can be worn up as a face mask or lowered as a relaxed mock neck collar.',
    details: [
      '18.5 micron superfine Australian merino wool with elastane',
      'Body-mapped thermal zones and ventilation ribs under arms',
      'Thumbhole cuffs to keep sleeves anchored in motion',
      'Laser-cut breathability perforations at mouth and nose',
      'Natural anti-microbial and temperature regulating properties'
    ],
    materials: ['85% Superfine Merino Wool', '15% Polyamide'],
    careInstructions: ['Hand wash or gentle wool cycle cold', 'Dry flat', 'Do not wring'],
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Glacier Silver', hex: '#C2C5CC', code: 'GLC' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 6, 'M': 10, 'L': 8, 'XL': 4 },
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isLimitedEdition: false,
    collection: 'STUDIO EDITION',
    rating: 4.8,
    reviewCount: 35
  },
  {
    id: 'va-13-futuristic-sneaker-low',
    name: 'CYBER-DERBY HYBRID SNEAKER',
    subtitle: 'Lug-Sole Formal Hybrid',
    sku: 'VA-26-FT-02',
    price: 820,
    category: 'footwear',
    description: 'An aggressive fusion between a classic bespoke derby shoe and a trail runner. Constructed with polished brushed box calf leather and a lugged geometric TPU chassis.',
    details: [
      'Polished Italian box calf leather with mirror gloss toe cap',
      'Chunky sculpted geometric TPU lug sole with air cushion heel',
      'Speed-lacing cord system with quick-cinch metal clamp',
      'Reinforced rubberized mudguard wrapping the perimeter',
      'Full leather interior lining with cushioned arch support'
    ],
    materials: ['Upper: 100% Box Calf Leather', 'Sole: 100% Sculpted TPU & Rubber'],
    careInstructions: ['Buff with soft cloth and wax polish', 'Do not immerse in water'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Black Onyx', hex: '#050505', code: 'ONX' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 2, 'M': 5, 'L': 4, 'XL': 2 },
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isLimitedEdition: false,
    collection: 'SYSTEMIC SILENCE FW26',
    rating: 4.9,
    reviewCount: 40
  },
  {
    id: 'va-14-tactical-crossbody',
    name: 'TACTICAL FIDLOCK CROSSBODY 4L',
    subtitle: 'Waterproof Dimension-Polyant® Pack',
    sku: 'VA-26-AC-02',
    price: 280,
    category: 'accessories',
    description: 'Engineered from ultra-durable sailcloth X-Pac® X50 fabric. Delivers impenetrable waterproof protection with magnetic Fidlock sling release and organizational compartments for tactical everyday carry.',
    details: [
      'Dimension-Polyant X-Pac® X50 reinforced sailcloth laminate',
      'German Fidlock magnetic quick-detach shoulder buckle',
      'YKK Aquaguard matte waterproof zippers',
      'Internal padded neoprene sleeve fitting up to 11" tablets',
      'Laser-cut hypalon attachment points for modular clips'
    ],
    materials: ['X-Pac® X50 MultiCam Black / Slate', 'Aircraft Aluminum Hardware'],
    careInstructions: ['Wipe clean with wet cloth', 'Air dry only'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Raw Silver', hex: '#BFC1C7', code: 'RSV' }
    ],
    sizes: ['OS'],
    stock: { 'OS': 22 },
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isLimitedEdition: false,
    collection: 'ESSENTIALS PROTOCOL',
    rating: 4.9,
    reviewCount: 61
  },
  {
    id: 'va-15-nylon-track-pant',
    name: 'KINETIC ZIPPERED NYLON TRACK PANT',
    subtitle: 'Transformative Flared Warm-Up Pant',
    sku: 'VA-26-PT-03',
    price: 480,
    category: 'pants',
    description: 'Crafted from crinkled Italian water-repellent nylon. Features full-length outer leg two-way zippers that allow the wearer to customize the drape from straight-leg silhouette to dramatic flared architectural opening.',
    details: [
      'Crinkled memory nylon with water-resistant finish',
      'Full outer seam two-way YKK zippers revealing breathable mesh gussets',
      'Elastic waistband with extended internal drawstring and metal aglets',
      'Deep slanted front zip pockets and single rear welt pocket',
      'Relaxed straight fit converting to wide flare'
    ],
    materials: ['100% Italian Crinkle Nylon', 'Mesh: 100% Polyester'],
    careInstructions: ['Machine wash cold inside out', 'Hang to dry', 'Do not iron'],
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Chalk White', hex: '#EBE5D8', code: 'CHK' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 5, 'M': 8, 'L': 6, 'XL': 2 },
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isLimitedEdition: false,
    collection: 'STUDIO EDITION',
    rating: 4.7,
    reviewCount: 18,
    has3DModel: true,
    modelType: 'pants'
  },
  {
    id: 'va-16-titanium-sunglasses',
    name: 'VOID-01 TITANIUM MASK EYEWEAR',
    subtitle: 'Monolithic Shield Sunglasses',
    sku: 'VA-26-AC-03',
    price: 490,
    category: 'accessories',
    description: 'Sculptural single-piece wrap shield sunglasses forged from Japanese beta-titanium and Zeiss nylon polarized optics. Offers 100% UVA/UVB protection with anti-reflective mirror coating.',
    details: [
      'Japanese ultra-light beta-titanium frame chassis (18 grams)',
      'Carl Zeiss Vision category 3 cylindrical nylon shield lens',
      'Hypoallergenic titanium nose pads with laser knurling',
      'Micro-screws coated with vibration-resistant nylon threads',
      'Includes handcrafted leather magnetic hardshell case and microfiber cloth'
    ],
    materials: ['100% Japanese Beta-Titanium', 'Zeiss Polarized Nylon Lens'],
    careInstructions: ['Clean with included microfiber cloth and lens solution', 'Keep in protective case when not in use'],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Mirror', hex: '#111111', code: 'MIR' },
      { name: 'Silver Chrome', hex: '#E0E0E0', code: 'CHR' }
    ],
    sizes: ['OS'],
    stock: { 'OS': 9 },
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isLimitedEdition: true,
    collection: 'GENESIS ARCHIVE',
    rating: 5.0,
    reviewCount: 31
  },
  {
    id: 'va-17-kimono-jacket',
    name: 'HAORI TECHNICAL HYBRID KIMONO',
    subtitle: 'Primaloft® Insulated Wrap Jacket',
    sku: 'VA-26-OW-05',
    price: 890,
    category: 'outerwear',
    description: 'Traditional Japanese Haori silhouette re-imagined through technical luxury lenses. Features an asymmetric wrap closure secured with an anodized aluminum buckle, lightweight insulation, and hidden seam hand pockets.',
    details: [
      'Water-resistant matte microfiber twill shell',
      '100g Primaloft® Gold lightweight thermal core',
      'Cross-body wrap closure with adjustable nylon tape fastening',
      'Internal shoulder harness for hands-free carry',
      'Ribbed internal storm cuffs'
    ],
    materials: ['85% Polyamide', '15% Polyurethane', 'Insulation: 100% Primaloft Gold'],
    careInstructions: ['Machine wash gentle cold', 'Line dry in shade'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Raw Basalt', hex: '#2b2c2e', code: 'BST' }
    ],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 2, 'M': 4, 'L': 3 },
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    isLimitedEdition: true,
    collection: 'SYSTEMIC SILENCE FW26',
    rating: 4.9,
    reviewCount: 16,
    has3DModel: true,
    modelType: 'jacket'
  },
  {
    id: 'va-18-leather-harness-belt',
    name: 'COBRA ANODIZED TACTICAL BELT',
    subtitle: 'AustriAlpin® Buckle Bridle Leather Belt',
    sku: 'VA-26-AC-04',
    price: 220,
    category: 'accessories',
    description: 'Forged from 4mm thick full-grain English bridle leather combined with genuine Austrian AustriAlpin Cobra® 38mm quick-release buckle. Tested to withstand 18kN of tensile load.',
    details: [
      'Full grain vegetable-tanned 10-12oz bridle leather from UK tanneries',
      'Original AustriAlpin® 38mm aluminum CNC Cobra buckle with matte PVD coating',
      'Hand-burnished beeswax edges',
      'Laser-engraved serial code on inner tip'
    ],
    materials: ['100% English Bridle Leather', 'AustriAlpin® Cobra Anodized Buckle'],
    careInstructions: ['Condition with neutral beeswax leather balm annually'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Matte', hex: '#0a0a0a', code: 'OBS' },
      { name: 'Silver Accent', hex: '#CCCCCC', code: 'SIL' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 7, 'M': 12, 'L': 9, 'XL': 5 },
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isLimitedEdition: false,
    collection: 'ESSENTIALS PROTOCOL',
    rating: 4.9,
    reviewCount: 58
  }
];

export const CATEGORIES: { id: string; name: string; slug: string; count?: number }[] = [
  { id: 'all', name: 'ALL ARCHIVE', slug: 'all' },
  { id: 'outerwear', name: 'OUTERWEAR', slug: 'outerwear' },
  { id: 'hoodies', name: 'HOODIES & SWEATS', slug: 'hoodies' },
  { id: 't-shirts', name: 'T-SHIRTS & TOPS', slug: 't-shirts' },
  { id: 'pants', name: 'CARGOS & PANTS', slug: 'pants' },
  { id: 'footwear', name: 'FOOTWEAR', slug: 'footwear' },
  { id: 'accessories', name: 'TACTICAL ACCESSORIES', slug: 'accessories' },
];

export const COLLECTIONS = [
  {
    id: 'systemic-silence',
    name: 'SYSTEMIC SILENCE FW26',
    season: 'AUTUMN / WINTER 2026',
    headline: 'TECHNICAL HAUTE COUTURE',
    description: 'An aggressive exploration into post-industrial silhouette architecture, combining GORE-TEX Pro, titanium hardware, and ballistic Cordura tailoring.',
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1400&q=85',
    itemCount: 8,
  },
  {
    id: 'genesis-archive',
    name: 'GENESIS ARCHIVE',
    season: 'PERMANENT CAPSULE',
    headline: 'MONOLITHIC ESSENTIALISM',
    description: 'Strict brutalist geometry stripped of all non-essential ornamentation. Zero-compromise fabrication engineered in Tokyo ateliers.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1400&q=85',
    itemCount: 4,
  },
  {
    id: 'essentials-protocol',
    name: 'ESSENTIALS PROTOCOL',
    season: 'CONTINUOUS RUN',
    headline: 'HEAVYWEIGHT FOUNDATIONS',
    description: 'Custom-knitted 650 GSM French terry and 340 GSM luxury carded cotton jersey built for daily tactical utility and eternal durability.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=85',
    itemCount: 6,
  },
  {
    id: 'studio-edition',
    name: 'STUDIO EDITION',
    season: 'LIMITED ARCHIVE',
    headline: 'AVANT-GARDE DRAPERY',
    description: 'Fluid architectural silhouettes exploring Japanese wool-blends, pleated volumes, and transformative zippered dynamics.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
    itemCount: 5,
  }
];

