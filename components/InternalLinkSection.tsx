import type { RelatedBuilds } from "@/types";
import BuildCard from "./BuildCard";

interface InternalLinkSectionProps {
  related: RelatedBuilds;
}

export default function InternalLinkSection({
  related,
}: InternalLinkSectionProps) {
  const hasUserType = related.sameUserType.length > 0;
  const hasBudget = related.sameBudgetTier.length > 0;
  const hasOverlap = related.productOverlap.length > 0;

  if (!hasUserType && !hasBudget && !hasOverlap) return null;

  return (
    <nav aria-label="Related PC builds">
      <h2 className="text-xl font-bold text-zinc-100 mb-4">Related Builds</h2>

      {hasUserType && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Same Use Case
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.sameUserType.map((b) => (
              <BuildCard key={b.id} build={b} />
            ))}
          </div>
        </section>
      )}

      {hasBudget && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Same Budget Tier
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.sameBudgetTier.map((b) => (
              <BuildCard key={b.id} build={b} />
            ))}
          </div>
        </section>
      )}

      {hasOverlap && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Builds With Shared Parts
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.productOverlap.map((b) => (
              <BuildCard key={b.id} build={b} />
            ))}
          </div>
        </section>
      )}
    </nav>
  );
}
