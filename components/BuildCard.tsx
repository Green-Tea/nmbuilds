import Link from "next/link";
import type { Build } from "@/types";
import { BUDGET_TIER_LABELS, USER_TYPE_LABELS, BUDGET_TIER_RANGES } from "@/types";

interface BuildCardProps {
  build: Build;
}

export default function BuildCard({ build }: BuildCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow">
      <div className="mb-2 flex flex-wrap gap-2">
        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
          {USER_TYPE_LABELS[build.userType]}
        </span>
        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
          {BUDGET_TIER_LABELS[build.budgetTier]}
        </span>
        <span className="px-2 py-0.5 text-xs text-slate-500">
          {BUDGET_TIER_RANGES[build.budgetTier]}
        </span>
      </div>
      <h3 className="text-sm font-semibold leading-snug text-slate-900">
        <Link href={`/builds/${build.slug}/`} className="transition-colors hover:text-blue-700">
          {build.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-xs text-slate-600">{build.description}</p>
      <div className="mt-3">
        <Link
          href={`/builds/${build.slug}/`}
          className="text-xs font-medium text-blue-700 hover:text-blue-800"
        >
          View build &rarr;
        </Link>
      </div>
    </article>
  );
}
