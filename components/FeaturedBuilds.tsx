import Link from "next/link";
import { assetPath } from "@/lib/assetPath";
import { getAllBuilds, getBuildWithProducts, getTotalBuildPrice } from "@/lib/getBuilds";
import FeaturedBuildsClient from "./FeaturedBuildsClient";

const featuredTabs = [
  {
    id: "quick-links",
    label: "Quick links",
    slugs: [
      "budget-gaming-pc-build",
      "budget-student-pc-build",
      "high-end-content-creator-pc-build",
    ],
  },
  {
    id: "budget-picks",
    label: "Budget picks",
    slugs: [
      "budget-gaming-pc-build",
      "budget-student-pc-build",
      "budget-content-creator-pc-build",
    ],
  },
  {
    id: "high-end",
    label: "High-End",
    slugs: [
      "high-end-gaming-pc-build",
      "high-end-developer-pc-build",
      "high-end-content-creator-pc-build",
    ],
  },
];

export default function FeaturedBuilds() {
  const builds = getAllBuilds();

  const tabs = featuredTabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    builds: tab.slugs
      .map((slug) => builds.find((build) => build.slug === slug))
      .filter((build): build is NonNullable<typeof build> => Boolean(build))
      .map((build) => {
        const fullBuild = getBuildWithProducts(build.slug);
        const minPrice = fullBuild ? getTotalBuildPrice(fullBuild).min : 0;
        return {
          href: `/builds/${build.slug}`,
          title: build.title.split(" – ")[0],
          tagline: build.description,
          price: `From $${minPrice.toLocaleString()}`,
          image: assetPath(`/images/featured-${build.userType}.svg`),
        };
      }),
  }));

  return (
    <section id="featured-builds" className="mx-auto max-w-6xl px-4 pb-12">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Featured builds</h2>

      <FeaturedBuildsClient tabs={tabs} />

      <div className="mt-6">
        <Link href="/builds" className="text-sm font-medium text-blue-600 hover:underline">
          View all builds →
        </Link>
      </div>
    </section>
  );
}
