import type { Metadata } from "next";
import Link from "next/link";
import { getAllBuilds } from "@/lib/getBuilds";
import BuildCard from "@/components/BuildCard";
import {
  USER_TYPE_LABELS,
  BUDGET_TIER_LABELS,
  BUDGET_TIER_RANGES,
  USER_TYPES,
  BUDGET_TIERS,
} from "@/types";

export const metadata: Metadata = {
  title: "NM Builds – PC Build Recommendations for Every Budget",
  description:
    "Find the best PC build for your use case and budget. Structured hardware recommendations for gamers, students, developers, and content creators.",
};

export default function HomePage() {
  const builds = getAllBuilds();

  return (
    <>
      <section className="mb-12">
        <h1 className="text-2xl font-bold text-zinc-100 mb-3">
          PC Build Recommendations
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl">
          Structured, up-to-date PC builds for every use case and budget tier.
          Every recommendation is built on real hardware data — no filler, no
          fluff.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-base font-semibold text-zinc-300 mb-4 uppercase tracking-wider text-xs">
          Browse by Use Case
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {USER_TYPES.map((type) => (
            <Link
              key={type}
              href={`/category/${type}/`}
              className="border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 transition-colors text-center"
            >
              <div className="text-sm font-semibold text-zinc-100">
                {USER_TYPE_LABELS[type]}
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {builds.filter((b) => b.userType === type).length} builds
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-base font-semibold text-zinc-300 mb-4 uppercase tracking-wider text-xs">
          Browse by Budget
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {BUDGET_TIERS.map((tier) => (
            <div
              key={tier}
              className="border border-zinc-800 rounded-lg p-3 text-center"
            >
              <div className="text-xs font-semibold text-zinc-100">
                {BUDGET_TIER_LABELS[tier]}
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {BUDGET_TIER_RANGES[tier]}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-base font-semibold text-zinc-300 mb-4 uppercase tracking-wider text-xs">
          All Builds
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {builds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      </section>
    </>
  );
}
