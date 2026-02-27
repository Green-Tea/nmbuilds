import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBuildsByUserType } from "@/lib/getBuilds";
import {
  USER_TYPES,
  USER_TYPE_LABELS,
  BUDGET_TIER_LABELS,
  BUDGET_TIER_RANGES,
  type UserType,
} from "@/types";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Props {
  params: Promise<{ userType: string }>;
}

export function generateStaticParams() {
  return USER_TYPES.map((userType) => ({ userType }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userType: userTypeParam } = await params;
  const userType = userTypeParam as UserType;
  if (!USER_TYPES.includes(userType)) return {};

  const label = USER_TYPE_LABELS[userType];
  return {
    title: `Best PC Builds for ${label} – All Budget Tiers 2024`,
    description: `Compare the best PC builds for ${label.toLowerCase()} across every budget tier from budget to extreme. Structured hardware recommendations with affiliate links.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { userType: userTypeParam } = await params;
  const userType = userTypeParam as UserType;
  if (!USER_TYPES.includes(userType)) notFound();

  const builds = getBuildsByUserType(userType);
  const label = USER_TYPE_LABELS[userType];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-10">
          <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Category</p>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">PC Builds for {label}</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            All {label.toLowerCase()} PC builds from budget to extreme. Each build is tailored for{" "}
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
            <article key={build.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
                  {BUDGET_TIER_LABELS[build.budgetTier]}
                </span>
                <span className="text-xs text-slate-500">{BUDGET_TIER_RANGES[build.budgetTier]}</span>
              </div>
              <h2 className="mb-2 text-base font-semibold text-slate-900">
                <Link href={`/builds/${build.slug}/`} className="transition-colors hover:text-blue-700">
                  {build.title}
                </Link>
              </h2>
              <p className="mb-3 text-sm text-slate-600">{build.description}</p>
              <Link
                href={`/builds/${build.slug}/`}
                className="text-xs font-medium text-blue-700 hover:text-blue-800"
              >
                View full build &rarr;
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
