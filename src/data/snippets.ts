// src/data/snippets.ts

export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  keywords: string[];
}

export const SNIPPET_REGISTRY: Record<string, CodeSnippet> = {
  mapFilter: {
    id: "map-filter",
    title: "Transforming and Filtering with .map() and .filter()",
    keywords: ["map", "filter"],
    code: `interface Product {
  id: number;
  name: string;
  category: "Electronics" | "Apparel";
  price: number;
  inStock: boolean;
}

// Safe object array definition with the satisfies -operator
const rawProducts = [
  { id: 1, name: "Mechanical Keyboard", category: "Electronics", price: 150, inStock: true },
  { id: 2, name: "Studio Monitor", category: "Electronics", price: 300, inStock: true },
  { id: 3, name: "Out of Stock GPU", category: "Electronics", price: 800, inStock: false },
  { id: 4, name: "Merino Wool Hoodie", category: "Apparel", price: 120, inStock: true }
] satisfies Product[];

// Filter and Map pipeline: Calculate 10% discount for available electronics
const discountedElectronics = rawProducts
  .filter((p) => p.inStock && p.category === "Electronics")
  .map((p) => ({ ...p, finalPrice: +(p.price * 0.9).toFixed(2) }));`
  },
  arrayFromAsync: {
    id: "array-from-async",
    title: "Collecting an Async Iterable with Array.fromAsync()",
    keywords: ["Array.fromAsync", "async", "iterable"],
    code: `async function* fetchIncomingProducts() {
  yield { id: 1, name: "Wireless Mouse", price: 45 };
  yield { id: 2, name: "Mechanical Keyboard", price: 120 };
}

const rawProducts = await Array.fromAsync(fetchIncomingProducts());
console.log(\`Fetched \${rawProducts.length} products.\`);`
  },
  arraySlice: {
    id: "array-slice",
    title: "Paginating Arrays with .slice()",
    keywords: ["slice", "pagination"],
    code: `const allProductNames = rawProducts.map((product) => product.name);

// Take the first two items for a spotlight.
const spotlightItems = allProductNames.slice(0, 2);

// Drop the first two items to get the remaining catalog.
const catalogItems = allProductNames.slice(2);`
  },
  mapGetOrInsert: {
    id: "map-get-or-insert",
    title: "Grouping Values with Map.prototype.getOrInsert()",
    keywords: ["Map", "getOrInsert", "grouping"],
    code: `const inventoryByCategory = new Map<string, string[]>();

const rawProducts = [
  { category: 'Electronics', name: 'Mechanical Keyboard' },
  { category: 'Electronics', name: 'Studio Monitor' },
  { category: 'Apparel', name: 'Merino Wool Hoodie' }
];

for (const product of rawProducts) {
  inventoryByCategory
    .getOrInsert(product.category, [])
    .push(product.name);
}

for (const [category, items] of inventoryByCategory) {
  console.log(category, items);
}`
  },
  setOperations: {
    id: "set-operations",
    title: "Combining Wishlists with Set Operations",
    keywords: ["Set", "union", "intersection", "difference"],
    code: `const vipWishlist = new Set([
  "Wireless Mouse",
  "Mechanical Keyboard",
  "Standing Desk",
]);
const promoEligible = new Set([
  "Mechanical Keyboard",
  "Standing Desk",
  "USB-C Hub",
]);

const allInterests = vipWishlist.union(promoEligible);
const commonItems = vipWishlist.intersection(promoEligible);
const exclusiveVipItems = vipWishlist.difference(promoEligible);
const uniqueToEither = vipWishlist.symmetricDifference(promoEligible);`
  },
  TemporalZonedDateTime : {
    id: "time-operations",
    title: "Local Clock Math - When Australian clocks change",
    keywords: ["Temporal", "ZonedDateTime" , "toPlainTime"],
    code: `// Saturday night before clocks go forward in Sydney
const satNight = Temporal.ZonedDateTime.from("2026-10-03T23:00:00+10:00[Australia/Sydney]");

// Add exactly 12 hours of real elapsed time
const sunMorning = satNight.add({ hours: 12 });

// Temporal knows that 2:00 AM became 3:00 AM! 
// It outputs 12:00 PM instead of 11:00 AM, adjusting for the lost hour perfectly.
console.log(sunMorning.toPlainTime().toString()); // "12:00:00"`
  },
  satisfiesOp: {
    id: "satisfies-op",
    title: "Safe Object Definition with satisfies",
    keywords: ["satisfies", "as const"],
    code: `type MarketConfig = {
  ticker: string;
  retracementLevels: Record<string, number | string>;
  isTradeable: boolean;
};

// Validates against MarketConfig, but preserves exact literal types and precise method access
const crudeOilConfig = {
  ticker: "CL=F",
  retracementLevels: {
    shallow: "23.6%",
    midpoint: 0.500,
    goldenPocket: 0.618,
  },
  isTradeable: true,
} satisfies MarketConfig;

// Inferred as: number
const midpoint = crudeOilConfig.retracementLevels.midpoint; 
// Inferred as: string
const shallow = crudeOilConfig.retracementLevels.shallow;   
// "23.6%"
console.log(shallow.toUpperCase()); `
  },


  recordUnion: {
    id: "record-key",
    title: "Union of string literals to Record",
    keywords: ["union", "Record", "key"],
    code: `type UserRole = 'admin' | 'editor' | 'viewer';

// TypeScript forces you to implement all three strategies
const RedirectStrategies: Record<UserRole, string> = {
  admin: '/dashboard/admin',
  editor: '/dashboard/editor',
  viewer: '/public/view', // If you delete this line => Compilation error!
};

OR

const FlexibleStrategies: Record<UserRole, (id?: string | number) => string> = {
  admin: (id) => \`/dashboard/admin/\${id}\`,
`
  },


};

// Dynamically compile a strict unique keyword list for your combo lookup
export const ALL_KEYWORDS = Array.from(
  new Set(Object.values(SNIPPET_REGISTRY).flatMap((s) => s.keywords))
);
