import Link from "next/link";
import type { Build } from "@/types";
import { BUDGET_TIER_LABELS, USER_TYPE_LABELS, BUDGET_TIER_RANGES } from "@/types";

interface BuildCardProps {
  build: Build;
}

export default function BuildCard({ build }: BuildCardProps) {
  return (
    <article className="border border-zinc-800 rounded-lg p-4 bg-zinc-900 hover:border-zinc-600 transition-colors">
      <div className="flex gap-2 flex-wrap mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
          {USER_TYPE_LABELS[build.userType]}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
          {BUDGET_TIER_LABELS[build.budgetTier]}
        </span>
        <span className="text-xs text-zinc-500 px-2 py-0.5">
          {BUDGET_TIER_RANGES[build.budgetTier]}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-zinc-100 leading-snug">
        <Link
          href={`/builds/${build.slug}/`}
          className="hover:text-amber-400 transition-colors"
        >
          {build.title}
        </Link>
      </h3>
      <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
        {build.description}
      </p>
      <div className="mt-3">
        <Link
          href={`/builds/${build.slug}/`}
          className="text-xs text-amber-500 hover:text-amber-400 font-medium"
        >
          View build &rarr;
        </Link>
      </div>
    </article>
  );
}
