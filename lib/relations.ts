import type { Build, RelatedBuilds } from "@/types";
import { getAllBuilds } from "./getBuilds";

/**
 * Returns related builds for a given build:
 * - 3 builds of the same userType (excluding self)
 * - 2 builds of the same budgetTier (excluding self, excluding already picked)
 * - 2 builds with product overlap (excluding self, excluding already picked)
 */
export function getRelatedBuilds(build: Build): RelatedBuilds {
  const all = getAllBuilds().filter((b) => b.id !== build.id);

  const sameUserType = all
    .filter((b) => b.userType === build.userType)
    .slice(0, 3);

  const pickedIds = new Set(sameUserType.map((b) => b.id));

  const sameBudgetTier = all
    .filter((b) => b.budgetTier === build.budgetTier && !pickedIds.has(b.id))
    .slice(0, 2);

  sameBudgetTier.forEach((b) => pickedIds.add(b.id));

  const buildProductSet = new Set(build.productIds);
  const productOverlap = all
    .filter(
      (b) =>
        !pickedIds.has(b.id) &&
        b.productIds.some((pid) => buildProductSet.has(pid))
    )
    .sort(
      (a, b) =>
        b.productIds.filter((pid) => buildProductSet.has(pid)).length -
        a.productIds.filter((pid) => buildProductSet.has(pid)).length
    )
    .slice(0, 2);

  return { sameUserType, sameBudgetTier, productOverlap };
}
