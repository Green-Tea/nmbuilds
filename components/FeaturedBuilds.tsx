import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";
import { getAllBuilds, getBuildWithProducts, getTotalBuildPrice } from "@/lib/getBuilds";

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
  const defaultTab = featuredTabs[0];

  const featured = defaultTab.slugs
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
    });

  return (
    <section id="featured-builds" className="mx-auto max-w-6xl px-4 pb-12">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Featured builds</h2>

      <div className="mt-4 flex items-center gap-4 border-b border-slate-200 pb-3 text-sm font-semibold">
        {featuredTabs.map((tab, index) => (
          <span
            key={tab.id}
            className={index === 0 ? "text-blue-600" : "text-slate-500"}
          >
            {tab.label}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {featured.map((build) => (
          <Link
            key={build.href}
            href={build.href}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative h-44 w-full">
              <Image src={build.image} alt="" fill className="object-cover" />
            </div>
            <div className="p-5">
              <div className="text-lg font-semibold text-slate-900">{build.title}</div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{build.tagline}</p>
              <div className="mt-4 text-2xl font-semibold text-slate-900">{build.price}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/builds" className="text-sm font-medium text-blue-600 hover:underline">
          View all builds →
        </Link>
      </div>
    </section>
  );
}
