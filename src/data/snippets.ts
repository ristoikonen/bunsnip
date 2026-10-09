// src/data/snippets.ts

export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  keywords: string[];
}

export const SNIPPET_REGISTRY = {
  mapFilter: {
    id: "map-filter",
    title: "Transforming and Filtering with .map() and .filter()",
    keywords: ["map", "filter"],
    code: `const discountedElectronics = rawProducts
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
    keywords: ["slice", "pagination", "take", "drop"],
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
  satisfiesOp: {
    id: "satisfies-op",
    title: "Safe Object Definition with satisfies",
    keywords: ["satisfies", "as const"],
    code: `const theme = {
  primary: "#0077ff",
} satisfies Record<string, string>;`
  }
} satisfies Record<string, CodeSnippet>; 

// Dynamically compile a strict unique keyword list for your combo lookup
export const ALL_KEYWORDS = Array.from(
  new Set(Object.values(SNIPPET_REGISTRY).flatMap((s) => s.keywords))
);
