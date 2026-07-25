export type Category =
  | 'regenerative'
  | 'herbal'
  | 'coffee-tea'
  | 'beauty'
  | 'devices'
  | 'womens'
  | 'mens'

export interface Product {
  id: string
  name: string
  brand: string
  category: Category
  price: number
  image: string
  tagline: string
  description: string
  benefits: string[]
  featured?: boolean
  bestSeller?: boolean
  stock: number
  unit?: string
}

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'regenerative', label: 'Regenerative Medicines' },
  { id: 'herbal', label: 'Herbal' },
  { id: 'coffee-tea', label: 'Coffee & Tea' },
  { id: 'beauty', label: 'Beauty & Care' },
  { id: 'devices', label: 'Therapy Devices' },
  { id: 'womens', label: "Women's Health" },
  { id: 'mens', label: "Men's Health" },
]

export const products: Product[] = [
  {
    id: 'fish-oil',
    name: 'Norland Fish Oil',
    brand: 'Vmax',
    category: 'regenerative',
    price: 145000,
    image: '/products/fish-oil.png',
    tagline: 'Omega 3 · 6 · 9 — Not Fortified',
    description:
      'Omega 3, 6 and 9 soft capsules that support brain, heart, joints, eyes and healthy skin. 60 capsules per bottle.',
    benefits: [
      'Boosts brain & mental health',
      'Balances cholesterol (↑ good, ↓ bad)',
      'Supports heart & prevents blood clots',
      'Relieves joint pain (uric acid)',
      'Improves eye health',
      'Supports healthy skin',
      'Helps with allergies',
    ],
    featured: true,
    bestSeller: true,
    stock: 24,
    unit: '60 capsules',
  },
  {
    id: 'seabuckthorn',
    name: 'Norland Seabuckthorn Oil',
    brand: 'Vmax',
    category: 'regenerative',
    price: 155000,
    image: '/products/seabuckthorn.png',
    tagline: 'Omega 3·6·7·9 · Vitamins C, E & A',
    description:
      'Seabuckthorn oil capsules rich in omegas and vitamins C, E and A — for immunity, lungs, digestion and antioxidant support.',
    benefits: [
      'Boosts immunity',
      'Supports respiratory health',
      'Supports brain health & memory',
      'Helps with digestion & gastric ulcers',
      'Powerful antioxidant',
    ],
    featured: true,
    bestSeller: true,
    stock: 18,
    unit: '60 capsules',
  },
  {
    id: 'nmn',
    name: 'Vmax NMN Capsules',
    brand: 'Vmax',
    category: 'regenerative',
    price: 280000,
    image: '/products/nmn.png',
    tagline: 'β-Nicotinamide Mononucleotide — Anti-aging',
    description:
      'NMN capsules for cell repair, anti-aging, better sleep, muscle recovery and stronger immunity. 40 capsules.',
    benefits: [
      'Repairs damaged cells',
      'Strong anti-aging support',
      'Enhances longevity',
      'Improves sleep quality',
      'Enhances brain functions',
      'Boosts immunity',
    ],
    featured: true,
    bestSeller: true,
    stock: 12,
    unit: '40 capsules',
  },
  {
    id: 'hypoglycemic',
    name: 'Hypoglycemic Capsules',
    brand: 'Norland',
    category: 'regenerative',
    price: 160000,
    image: '/products/lalabuy/hypoglycemic.jpg',
    tagline: 'Blood sugar support',
    description:
      'Helps stabilize blood sugar, activate insulin-producing cells, and support people managing type 2 diabetes symptoms.',
    benefits: [
      'Stabilizes blood sugar',
      'Activates insulin-producing cells (islets)',
      'Helps people with type 2 diabetes',
      'Helps prevent diabetic complications',
    ],
    bestSeller: true,
    stock: 20,
  },
  {
    id: 'beta-carotene',
    name: 'Natural B-Carotene',
    brand: 'Vita Source',
    category: 'regenerative',
    price: 145000,
    image: '/products/lalabuy/beta-carotene.jpg',
    tagline: 'Antioxidant · vitamin A source',
    description:
      'Natural beta-carotene for antioxidant and anti-aging support, fertility, memory, vision and heart wellness.',
    benefits: [
      'Anti-inflammatory, antioxidant & anti-aging',
      'Aids fertility in both genders',
      'Improves memory function',
      'Source of vitamin A for vision',
      'Supports brain, heart and prostate wellness',
    ],
    featured: true,
    bestSeller: true,
    stock: 22,
  },
  {
    id: 'propolis-lecithin',
    name: 'Propolis Lecithin Capsules',
    brand: 'Norland',
    category: 'regenerative',
    price: 160000,
    image: '/products/lalabuy/propolis-lecithin.jpg',
    tagline: 'Metabolism · cholesterol · brain',
    description:
      'Supports fat metabolism, cholesterol balance, cell membranes, memory and diabetes-related complications.',
    benefits: [
      'Removes excess fats & improves metabolism',
      'Makes cell membranes soft and permeable',
      'Regulates cholesterol',
      'Supports brain development & memory',
      'Anti-fatigue; used for diabetes complications',
    ],
    stock: 15,
  },
  {
    id: 'cordyceps',
    name: 'Cordyceps-Sinensis Capsules',
    brand: 'Norland',
    category: 'herbal',
    price: 188000,
    image: '/products/lalabuy/cordyceps.jpg',
    tagline: 'Lung · immunity · respiratory',
    description:
      'Cordyceps capsules that improve lung function, boost immunity, fight respiratory infections and support heart & brain.',
    benefits: [
      'Improves lung function',
      'Boosts immunity',
      'Supports respiratory diseases & allergies',
      'Antioxidant support',
      'Improves heart and brain function',
    ],
    bestSeller: true,
    stock: 16,
  },
  {
    id: 'calcium-iron-zinc',
    name: 'Calcium, Iron & Zinc',
    brand: 'Health Way',
    category: 'regenerative',
    price: 160000,
    image: '/products/lalabuy/calcium-iron-zinc.jpg',
    tagline: 'Bones · blood · enzymes',
    description:
      'Triple-mineral formula for bones, teeth, nerves, metabolism and immunity — helpful for pregnant and breastfeeding mothers.',
    benefits: [
      'Calcium for bones, teeth, nerves & muscles',
      'Iron builds connective tissue & immunity',
      'Zinc supports 100+ enzyme pathways',
      'Good for pregnant and breastfeeding mothers',
    ],
    stock: 25,
  },
  {
    id: 'healthy-way-herbal',
    name: 'Healthy Way Herbal Capsules',
    brand: 'Health Way',
    category: 'herbal',
    price: 145000,
    image: '/products/extracted/healthy-way-herbal.png',
    tagline: 'Liver & gallbladder support',
    description:
      'Herbal capsules that support gallbladder and liver function, cell repair, bowel movement and organ fat control.',
    benefits: [
      'Improves gallbladder function',
      'Supports hepatitis care',
      'Promotes liver cell self-repair',
      'Regulates bowel movement',
    ],
    stock: 14,
  },
  {
    id: 'calcium-powder',
    name: 'Nutrient Calcium Powder',
    brand: 'Norland',
    category: 'regenerative',
    price: 120000,
    image: '/products/lalabuy/calcium-powder.jpg',
    tagline: 'Strong bones for every age',
    description:
      'Calcium powder that strengthens bones and teeth, supports children\'s growth, arthritis care, appetite and pregnancy wellness.',
    benefits: [
      'Strengthens bones and teeth',
      'Helps children grow stronger',
      'Supports arthritis & bone diseases',
      'Improves appetite and metabolism',
      'Good for pregnant women',
    ],
    bestSeller: true,
    stock: 19,
  },
  {
    id: 'immune-plus',
    name: 'Immune+ Capsules',
    brand: 'Health Way',
    category: 'regenerative',
    price: 145000,
    image: '/products/lalabuy/immune-plus.jpg',
    tagline: 'Immunity · hormones · fertility',
    description:
      'Natural anti-aging capsules that balance female hormones, supply omega-3s, support the heart and promote fertility.',
    benefits: [
      'Natural anti-aging support',
      'Balances female hormones',
      'Omega-3 for heart & bones',
      'Promotes fertility',
    ],
    featured: true,
    bestSeller: true,
    stock: 28,
    unit: '60 capsules',
  },
  {
    id: 'ginseng-cordyceps',
    name: 'Ginseng Cordyceps-Sinensis',
    brand: 'Norland',
    category: 'mens',
    price: 188000,
    image: '/products/lalabuy/ginseng-cordyceps.jpg',
    tagline: 'Energy · vitality · kidney support',
    description:
      'Boosts energy and male vitality, supports kidney and heart health, and helps purify blood and fight stubborn infections.',
    benefits: [
      'Boosts energy; reduces alcohol toxicity',
      'Supports erectile function & stamina',
      'Supports kidney and heart health',
      'Blood purifier; anti-viral & anti-bacterial',
    ],
    bestSeller: true,
    stock: 11,
  },
  {
    id: 'longvigor',
    name: 'Longvigor Coffee',
    brand: 'Norland',
    category: 'coffee-tea',
    price: 150000,
    image: '/products/lalabuy/longvigor.jpg',
    tagline: 'Microcirculation & male vitality',
    description:
      'Functional coffee that quickly promotes microcirculation, balances hormones and reinvigorates male vitality.',
    benefits: [
      'Quickly promotes microcirculation',
      'Balances hormone secretion',
      'Reinvigorates male vitality',
    ],
    featured: true,
    bestSeller: true,
    stock: 20,
  },
  {
    id: 'detox-pack',
    name: 'Detox Pack (1 Set)',
    brand: 'Norland',
    category: 'herbal',
    price: 3500000,
    image: '/products/lalabuy/detox-pack.jpg',
    tagline: '90-day deep cellular cleanse',
    description:
      'Complete detox set for deeper-layer detoxification — cleanses cells one by one and restores organ function in about 90 days.',
    benefits: [
      'Deeper layer detoxification',
      'Cleanses cells one by one',
      'Restores tissue and organ function',
      'Cleanses major organs in 90 days',
    ],
    featured: true,
    stock: 3,
  },
  {
    id: 'gi-vital',
    name: 'GI Vital Softgel',
    brand: 'Norland',
    category: 'regenerative',
    price: 190000,
    image: '/products/lalabuy/gi-vital.jpg',
    tagline: 'Stomach comfort & digestion',
    description:
      'Softgels that repair damaged cells, support gastric mucosa, help heal ulcers and activate cell rejuvenation.',
    benefits: [
      'Repairs damaged cells',
      'Replaces gastric mucosa tissues',
      'Helps heal gastric ulcers',
      'Anti-aging & cell regeneration',
    ],
    featured: true,
    bestSeller: true,
    stock: 30,
    unit: '50 softgels',
  },
  {
    id: 'peptides',
    name: 'Micro-Molecule Peptides',
    brand: 'Norland',
    category: 'regenerative',
    price: 210000,
    image: '/products/lalabuy/peptides.jpg',
    tagline: 'Instant energy · protein source',
    description:
      'Protein-rich peptides for instant energy, anti-fatigue strength, better memory, heart support and liver protection.',
    benefits: [
      'Source of proteins',
      'Instant energy and vitality',
      'Strengthens the body; anti-fatigue',
      'Improves memory, heart & digestion',
      'Protects the liver',
    ],
    stock: 5,
  },
  {
    id: 'energy-bracelet',
    name: 'Energy Bracelet',
    brand: 'Norland',
    category: 'devices',
    price: 340000,
    image: '/products/lalabuy/energy-bracelet.jpg',
    tagline: 'Circulation · stress · EMF balance',
    description:
      'Wearable bracelet that helps suppress stress hormones, neutralize EMF, improve circulation and support stroke recovery.',
    benefits: [
      'Suppresses stress hormones',
      'Neutralizes electromagnetic radiation',
      'Improves blood circulation',
      'Helps in stroke recovery support',
    ],
    bestSeller: true,
    stock: 10,
  },
  {
    id: 'cordyceps-coffee',
    name: 'Cordyceps Coffee',
    brand: 'Norland',
    category: 'coffee-tea',
    price: 60000,
    image: '/products/lalabuy/cordyceps-coffee.jpg',
    tagline: 'Respiratory · detox · calm focus',
    description:
      'Cordyceps coffee that supports respiration, detox, stress relief, memory and immunity — suitable for many BP and diabetes concerns.',
    benefits: [
      'Improves respiratory system & detoxifies',
      'Reduces stress, anxiety & cholesterol',
      'Improves memory',
      'Immune booster; raises energy levels',
    ],
    bestSeller: true,
    stock: 35,
  },
  {
    id: 'vision-vitale',
    name: 'Vision Vitale',
    brand: 'Norland',
    category: 'regenerative',
    price: 160000,
    image: '/products/lalabuy/vision-vitale.jpg',
    tagline: 'Eye cell repair & clarity',
    description:
      'Vision supplement that repairs eye cells and supports sight loss, myopia, cataracts, retinopathy and eye fatigue.',
    benefits: [
      'Improves vision; repairs eye cells',
      'Supports myopia and sight-loss wellness',
      'Supports cataracts & diabetic retinopathy',
      'Alleviates eye fatigue',
    ],
    bestSeller: true,
    stock: 17,
  },
  {
    id: 'anion-liner',
    name: 'Anion Panty Liners',
    brand: 'Norland',
    category: 'womens',
    price: 30000,
    image: '/products/lalabuy/anion-liner.jpg',
    tagline: 'Hormone balance · odor control',
    description:
      'Anion panty liners that help balance hormones, reduce odor, support UTI care and promote oxygen supply to the womb.',
    benefits: [
      'Balances hormones',
      'Helps prevent vaginal infections',
      'Eliminates odor; supports cervical wellness',
      'Promotes oxygen supply to the womb',
    ],
    bestSeller: true,
    stock: 50,
  },
  {
    id: 'anion-napkin',
    name: 'Anion Sanitary Napkins',
    brand: 'Norland',
    category: 'womens',
    price: 25000,
    image: '/products/lalabuy/anion-napkin.jpg',
    tagline: '7-layer breathable protection',
    description:
      'Heavy-absorption sanitary napkins with a 7-layer breathable design, odor control and menstrual-pain relief.',
    benefits: [
      'Heavy absorption capacity',
      'Eliminates odor; cervical wellness support',
      'Relieves menstrual pain',
      '7-layer breathable material',
    ],
    bestSeller: true,
    stock: 45,
  },
  {
    id: 'kuding-tea',
    name: 'Kuding Tea',
    brand: 'Norland',
    category: 'coffee-tea',
    price: 60000,
    image: '/products/lalabuy/kuding-tea.jpg',
    tagline: 'Detox · focus · weight support',
    description:
      'Herbal tea that detoxifies, improves bowel movement, focus and circulation, and supports weight and cholesterol balance.',
    benefits: [
      'Detoxifies; improves bowel movement',
      'Helps prevent cold & flu',
      'Improves mental focus & circulation',
      'Supports weight management',
    ],
    featured: true,
    bestSeller: true,
    stock: 40,
  },
  {
    id: 'female-nouripad',
    name: 'Female Nouripad',
    brand: 'Nouripad',
    category: 'womens',
    price: 180000,
    image: '/products/lalabuy/female-nouripad.jpg',
    tagline: 'Reproductive detox & fertility',
    description:
      'Female care pad that detoxifies the reproductive tract, supports infection and fibroid wellness, hormones and fertility.',
    benefits: [
      'Detoxifies reproductive & urinary tract',
      'Supports infections, cysts and fibroids',
      'Improves fertility and hormones',
      'Enhances sexual satisfaction',
    ],
    bestSeller: true,
    stock: 18,
  },
  {
    id: 'male-nouripad',
    name: 'Male Nouripad',
    brand: 'Nouripad',
    category: 'mens',
    price: 180000,
    image: '/products/lalabuy/male-nouripad.jpg',
    tagline: 'Prostate · stamina · libido',
    description:
      'Male care pad for prostate health, smoother urination, energy, libido, sperm count and chronic UTI support.',
    benefits: [
      'Promotes prostate health & urination',
      'More energy and stronger stamina',
      'Boosts libido and sperm count',
      'Supports chronic UTIs and hemorrhoids',
    ],
    bestSeller: true,
    stock: 16,
  },
  {
    id: 'toothpaste',
    name: 'Sunlight Herbal Toothpaste',
    brand: 'Norland',
    category: 'beauty',
    price: 30000,
    image: '/products/lalabuy/toothpaste.jpg',
    tagline: '100% herbal oral care',
    description:
      '100% herbal toothpaste that whitens teeth, soothes gums, removes plaque and supports mouth ulcers and bad breath.',
    benefits: [
      'Whitens teeth; removes plaque',
      'Treats bleeding & itchy gums',
      'Supports mouth ulcers & inflammation',
      'Herbal formula with pain-relief support',
    ],
    bestSeller: true,
    stock: 55,
  },
  {
    id: 'immune-vitale',
    name: 'Immune Vitale',
    brand: 'Norland',
    category: 'mens',
    price: 145000,
    image: '/products/lalabuy/immune-vitale.jpg',
    tagline: 'Immunity · kidney · vitality',
    description:
      'Immune support capsules for kidney wellness, prostate health, fertility and erectile function.',
    benefits: [
      'Improves immune system',
      'Kidney treatment support',
      'Improves prostate and fertility',
      'Supports erectile function',
    ],
    bestSeller: true,
    stock: 21,
  },
  {
    id: 'alkaline-cup',
    name: 'Healthy Way Alkaline Cup',
    brand: 'Health Way',
    category: 'devices',
    price: 450000,
    image: '/products/lalabuy/alkaline-cup.jpg',
    tagline: 'pH balance · daily hydration',
    description:
      'Alkaline cup that balances minerals and body pH, boosts immunity, relieves fatigue and supports healthy aging.',
    benefits: [
      'Balances trace elements and pH',
      'Immune enhancer; relieves fatigue',
      'Improves blood circulation',
      'Supports healthy aging',
    ],
    featured: true,
    bestSeller: true,
    stock: 7,
  },
  {
    id: 'anti-pigmenty',
    name: 'Anti-Pigmenty Liner',
    brand: 'Nouripad',
    category: 'beauty',
    price: 30000,
    image: '/products/womens-wellness.png',
    tagline: 'Soft · Smooth · 30 PCS',
    description:
      'Soft, smooth feminine liners for daily comfort and a healthier glow as part of women’s wellness care. 30 pieces.',
    benefits: [
      'Soft smooth comfort',
      'Daily feminine wellness',
      'Supports healthy glow',
      '30 pieces per pack',
    ],
    featured: true,
    stock: 40,
    unit: '30 pcs',
  },
  {
    id: 'therapy-device',
    name: 'Low & Medium Frequency Therapy Device',
    brand: 'Risen Care',
    category: 'devices',
    price: 350000,
    image: '/products/therapy-device.png',
    tagline: 'TENS / EMS pain relief & massage',
    description:
      'Handheld therapy device with dual-channel intensity, massage/cupping modes and timer for pain relief and muscle recovery.',
    benefits: [
      'Dual-channel intensity control',
      'Modes: massage, cupping, moxibustion, thumping',
      'Adjustable session timer',
      'Electrode pads for targeted relief',
    ],
    featured: true,
    bestSeller: true,
    stock: 8,
  },
]

export function formatUGX(amount: number): string {
  return `UGX ${amount.toLocaleString('en-UG')}`
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured)
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller)
}
