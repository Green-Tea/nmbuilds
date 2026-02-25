import Link from "next/link";
import { getAllBuilds } from "@/lib/getBuilds";
import { BUDGET_TIER_LABELS, BUDGET_TIER_RANGES } from "@/types";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function BuildsPage() {
  const builds = getAllBuilds();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">All builds</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Explore every NM Builds recommendation by use case and budget tier.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {builds.map((build) => (
            <article
              key={build.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                {BUDGET_TIER_LABELS[build.budgetTier]} · {BUDGET_TIER_RANGES[build.budgetTier]}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                <Link href={`/builds/${build.slug}`} className="hover:underline">
                  {build.title.split(" – ")[0]}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-600">{build.description}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
