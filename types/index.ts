export type ProductCategory =
  | "cpu"
  | "gpu"
  | "ram"
  | "storage"
  | "motherboard"
  | "psu"
  | "case";

export type UserType = "gamer" | "student" | "developer" | "creator";

export type BudgetTier =
  | "budget"
  | "mid"
  | "upper-mid"
  | "high-end"
  | "extreme";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  model: string;
  specs: Record<string, string | number>;
  affiliateUrl: string;
  priceRange: { min: number; max: number };
}

export interface Build {
  id: string;
  slug: string;
  title: string;
  userType: UserType;
  budgetTier: BudgetTier;
  description: string;
  productIds: string[];
  lastUpdated: string;
}

export interface BuildWithProducts extends Build {
  products: Product[];
}

export interface RelatedBuilds {
  sameUserType: Build[];
  sameBudgetTier: Build[];
  productOverlap: Build[];
}

export const USER_TYPES: UserType[] = [
  "gamer",
  "student",
  "developer",
  "creator",
];
export const BUDGET_TIERS: BudgetTier[] = [
  "budget",
  "mid",
  "upper-mid",
  "high-end",
  "extreme",
];
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "cpu",
  "gpu",
  "ram",
  "storage",
  "motherboard",
  "psu",
  "case",
];

export const USER_TYPE_LABELS: Record<UserType, string> = {
  gamer: "Gamers",
  student: "Students",
  developer: "Developers",
  creator: "Content Creators",
};

export const BUDGET_TIER_LABELS: Record<BudgetTier, string> = {
  budget: "Budget",
  mid: "Mid-Range",
  "upper-mid": "Upper Mid-Range",
  "high-end": "High-End",
  extreme: "Extreme",
};

export const BUDGET_TIER_RANGES: Record<BudgetTier, string> = {
  budget: "Under $600",
  mid: "$600 – $1,000",
  "upper-mid": "$1,000 – $1,500",
  "high-end": "$1,500 – $2,500",
  extreme: "$2,500+",
};
