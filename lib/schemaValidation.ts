import type { Product, Build } from "@/types";
import {
  PRODUCT_CATEGORIES,
  USER_TYPES,
  BUDGET_TIERS,
} from "@/types";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateProduct(p: unknown): p is Product {
  if (typeof p !== "object" || p === null) {
    throw new ValidationError("Product must be an object");
  }
  const prod = p as Record<string, unknown>;

  if (typeof prod.id !== "string" || !prod.id)
    throw new ValidationError(`Product missing id: ${JSON.stringify(p)}`);
  if (typeof prod.name !== "string" || !prod.name)
    throw new ValidationError(`Product ${prod.id} missing name`);
  if (!PRODUCT_CATEGORIES.includes(prod.category as never))
    throw new ValidationError(
      `Product ${prod.id} has invalid category: ${prod.category}`
    );
  if (typeof prod.brand !== "string" || !prod.brand)
    throw new ValidationError(`Product ${prod.id} missing brand`);
  if (typeof prod.model !== "string" || !prod.model)
    throw new ValidationError(`Product ${prod.id} missing model`);
  if (typeof prod.specs !== "object" || prod.specs === null)
    throw new ValidationError(`Product ${prod.id} missing specs`);
  if (typeof prod.affiliateUrl !== "string" || !prod.affiliateUrl)
    throw new ValidationError(`Product ${prod.id} missing affiliateUrl`);
  const range = prod.priceRange as Record<string, unknown>;
  if (typeof range?.min !== "number" || typeof range?.max !== "number")
    throw new ValidationError(`Product ${prod.id} has invalid priceRange`);

  return true;
}

export function validateBuild(b: unknown, productIds: Set<string>): b is Build {
  if (typeof b !== "object" || b === null) {
    throw new ValidationError("Build must be an object");
  }
  const build = b as Record<string, unknown>;

  if (typeof build.id !== "string" || !build.id)
    throw new ValidationError(`Build missing id: ${JSON.stringify(b)}`);
  if (typeof build.slug !== "string" || !build.slug)
    throw new ValidationError(`Build ${build.id} missing slug`);
  if (typeof build.title !== "string" || !build.title)
    throw new ValidationError(`Build ${build.id} missing title`);
  if (!USER_TYPES.includes(build.userType as never))
    throw new ValidationError(
      `Build ${build.id} has invalid userType: ${build.userType}`
    );
  if (!BUDGET_TIERS.includes(build.budgetTier as never))
    throw new ValidationError(
      `Build ${build.id} has invalid budgetTier: ${build.budgetTier}`
    );
  if (typeof build.description !== "string" || !build.description)
    throw new ValidationError(`Build ${build.id} missing description`);
  if (!Array.isArray(build.productIds) || build.productIds.length === 0)
    throw new ValidationError(`Build ${build.id} has no productIds`);

  for (const pid of build.productIds as string[]) {
    if (!productIds.has(pid)) {
      throw new ValidationError(
        `Build ${build.id} references unknown product: ${pid}`
      );
    }
  }

  if (typeof build.lastUpdated !== "string" || !build.lastUpdated)
    throw new ValidationError(`Build ${build.id} missing lastUpdated`);

  return true;
}

export function validateAllData(
  products: unknown[],
  builds: unknown[]
): { products: Product[]; builds: Build[] } {
  const validatedProducts: Product[] = [];
  const productIdSet = new Set<string>();

  for (const p of products) {
    validateProduct(p);
    const prod = p as Product;
    if (productIdSet.has(prod.id)) {
      throw new ValidationError(`Duplicate product id: ${prod.id}`);
    }
    productIdSet.add(prod.id);
    validatedProducts.push(prod);
  }

  const validatedBuilds: Build[] = [];
  const buildIdSet = new Set<string>();
  const buildSlugSet = new Set<string>();

  for (const b of builds) {
    validateBuild(b, productIdSet);
    const build = b as Build;
    if (buildIdSet.has(build.id)) {
      throw new ValidationError(`Duplicate build id: ${build.id}`);
    }
    if (buildSlugSet.has(build.slug)) {
      throw new ValidationError(`Duplicate build slug: ${build.slug}`);
    }
    buildIdSet.add(build.id);
    buildSlugSet.add(build.slug);
    validatedBuilds.push(build);
  }

  return { products: validatedProducts, builds: validatedBuilds };
}
