import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBuilds, getBuildsByUserType } from "@/lib/getBuilds";
import BuildCard from "@/components/BuildCard";
import {
  USER_TYPES,
  USER_TYPE_LABELS,
  BUDGET_TIER_LABELS,
  BUDGET_TIER_RANGES,
  type UserType,
} from "@/types";

interface Props {
  params: { userType: string };
}

export function generateStaticParams() {
  return USER_TYPES.map((userType) => ({ userType }));
}

export function generateMetadata({ params }: Props): Metadata {
  const userType = params.userType as UserType;
  if (!USER_TYPES.includes(userType)) return {};

  const label = USER_TYPE_LABELS[userType];
  return {
    title: `Best PC Builds for ${label} – All Budget Tiers 2024`,
    description: `Compare the best PC builds for ${label.toLowerCase()} across every budget tier from budget to extreme. Structured hardware recommendations with affiliate links.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const userType = params.userType as UserType;
  if (!USER_TYPES.includes(userType)) notFound();

  const builds = getBuildsByUserType(userType);
  const label = USER_TYPE_LABELS[userType];

  return (
    <>
      <header className="mb-10">
        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
          Category
        </p>
        <h1 className="text-2xl font-bold text-zinc-100 mb-3">
          PC Builds for {label}
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl">
          All {label.toLowerCase()} PC builds from budget to extreme. Each
          build is tailored for{" "}
          {userType === "gamer"
            ? "gaming performance across resolutions and frame rates"
            : userType === "student"
            ? "academic workloads, productivity, and everyday use"
            : userType === "developer"
            ? "code compilation, containerized environments, and developer tooling"
            : "video editing, 3D rendering, and creative production"}
          .
        </p>
      </header>

      <div className="grid gap-6">
        {builds.map((build) => (
          <article
            key={build.id}
            className="border border-zinc-800 rounded-lg p-5 bg-zinc-900"
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                {BUDGET_TIER_LABELS[build.budgetTier]}
              </span>
              <span className="text-xs text-zinc-500">
                {BUDGET_TIER_RANGES[build.budgetTier]}
              </span>
            </div>
            <h2 className="text-base font-semibold text-zinc-100 mb-2">
              <a
                href={`/builds/${build.slug}/`}
                className="hover:text-amber-400 transition-colors"
              >
                {build.title}
              </a>
            </h2>
            <p className="text-sm text-zinc-400 mb-3">{build.description}</p>
            <a
              href={`/builds/${build.slug}/`}
              className="text-xs text-amber-500 hover:text-amber-400 font-medium"
            >
              View full build &rarr;
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
