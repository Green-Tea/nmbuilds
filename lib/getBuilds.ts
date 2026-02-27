import type { Build, BuildWithProducts, UserType, BudgetTier } from "@/types";
import buildsData from "@/data/builds.json";
import { getProductsByIds } from "./getProducts";

const builds = buildsData as Build[];

export function getAllBuilds(): Build[] {
  return builds;
}

export function getBuildBySlug(slug: string): Build | undefined {
  return builds.find((b) => b.slug === slug);
}

export function getBuildWithProducts(slug: string): BuildWithProducts | undefined {
  const build = getBuildBySlug(slug);
  if (!build) return undefined;
  return {
    ...build,
    products: getProductsByIds(build.productIds),
  };
}

export function getBuildsByUserType(userType: UserType): Build[] {
  return builds.filter((b) => b.userType === userType);
}

export function getBuildsByBudgetTier(tier: BudgetTier): Build[] {
  return builds.filter((b) => b.budgetTier === tier);
}

export function getAllBuildSlugs(): string[] {
  return builds.map((b) => b.slug);
}

export function getAllUserTypes(): UserType[] {
  return [...new Set(builds.map((b) => b.userType))];
}

export function getBuildsByProductId(productId: string): Build[] {
  return builds.filter((b) => b.productIds.includes(productId));
}

export function getTotalBuildPrice(build: BuildWithProducts): {
  min: number;
  max: number;
} {
  const total = build.products.reduce(
    (acc, p) => ({
      min: acc.min + p.priceRange.min,
      max: acc.max + p.priceRange.max,
    }),
    { min: 0, max: 0 }
  );
  return total;
}
