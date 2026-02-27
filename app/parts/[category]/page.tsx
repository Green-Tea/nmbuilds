import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/getProducts";
import { getBuildsByProductId } from "@/lib/getBuilds";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/types";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ category: string }>;
}

const CATEGORY_META: Record<
  ProductCategory,
  {
    label: string;
    plural: string;
    description: string;
    buyingGuide: string;
  }
> = {
  cpu: {
    label: "CPU",
    plural: "CPUs",
    description:
      "The processor executes every instruction your software runs. Core count matters for multitasking and parallel workloads; clock speed drives single-threaded performance.",
    buyingGuide:
      "Match your CPU to the workload: more cores for streaming and rendering, higher clocks for gaming. Check socket compatibility with your motherboard before buying.",
  },
  gpu: {
    label: "GPU",
    plural: "GPUs",
    description:
      "The graphics card renders frames in games, accelerates video encoding, and handles compute tasks like AI inference. VRAM capacity determines the resolution and texture quality you can run.",
    buyingGuide:
      "For 1080p gaming, 8 GB VRAM is sufficient. Step up to 12–16 GB for 1440p or future-proofing. Match the recommended PSU wattage listed below to your power supply.",
  },
  ram: {
    label: "RAM",
    plural: "RAM Kits",
    description:
      "System memory holds active data for your CPU. More RAM reduces disk swapping; faster RAM (measured in MT/s) improves bandwidth for CPU-bound tasks.",
    buyingGuide:
      "16 GB is the minimum for most builds today. 32 GB is recommended for content creation and heavy multitasking. Always run in dual-channel (two sticks) for better bandwidth.",
  },
  storage: {
    label: "Storage",
    plural: "Storage Drives",
    description:
      "NVMe SSDs connect directly to the CPU via PCIe for maximum throughput, making them ideal for your OS and primary applications. Sequential read/write speeds determine how fast large files transfer.",
    buyingGuide:
      "1 TB is a practical minimum for a primary drive. NVMe Gen 4 drives offer roughly 2× the sequential speeds of Gen 3 at a small price premium. Look for drives with DRAM cache for sustained write performance.",
  },
  motherboard: {
    label: "Motherboard",
    plural: "Motherboards",
    description:
      "The motherboard defines what CPU you can use (socket), how much RAM you can install, and which features (PCIe 5.0, Wi-Fi, USB4) are available to your build.",
    buyingGuide:
      "Match the socket to your CPU—LGA1700 for Intel 12th/13th Gen, AM4 for Ryzen 5000, AM5 for Ryzen 7000+. B-series chipsets offer the best value; X-series adds overclocking headroom.",
  },
  psu: {
    label: "PSU",
    plural: "Power Supplies",
    description:
      "The power supply converts AC mains power to the DC voltages your components need. Efficiency ratings (80 PLUS Bronze through Titanium) determine how much power is wasted as heat.",
    buyingGuide:
      "Size your PSU to 20–30% above your expected system load for efficiency and headroom. 650 W covers most mid-range builds; 850 W is recommended for high-end GPU/CPU combos.",
  },
  case: {
    label: "Case",
    plural: "Cases",
    description:
      "The case determines airflow quality, component clearance, and build aesthetics. Airflow-optimized mesh fronts lower temperatures compared to solid panels.",
    buyingGuide:
      "Check GPU length clearance and CPU cooler height before buying. ATX Mid-Tower cases fit the widest range of components. Prioritize cases with front mesh panels for the best thermal performance.",
  },
};

function formatSpecKey(key: string): string {
  const overrides: Record<string, string> = {
    vram: "VRAM",
    tdp: "TDP",
    baseClock: "Base Clock",
    boostClock: "Boost Clock",
    memoryBus: "Memory Bus",
    recommendedPSU: "Rec. PSU",
    cores: "Cores",
    threads: "Threads",
    socket: "Socket",
    generation: "Generation",
    capacity: "Capacity",
    speed: "Speed",
    type: "Type",
    interface: "Interface",
    readSpeed: "Read Speed",
    writeSpeed: "Write Speed",
    chipset: "Chipset",
    formFactor: "Form Factor",
    wattage: "Wattage",
    efficiency: "Efficiency",
    modular: "Modular",
    target: "Target",
    memoryType: "Memory Type",
    latency: "Latency",
  };
  return overrides[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = categoryParam as ProductCategory;
  if (!PRODUCT_CATEGORIES.includes(category)) return {};

  const meta = CATEGORY_META[category];
  return {
    title: `${meta.plural} – Specs, Prices & Buying Guide`,
    description: `Compare every ${meta.label} in our database. Specs, price ranges, and affiliate links for the best ${meta.plural.toLowerCase()} across all budget tiers.`,
  };
}

export default async function PartsCategoryPage({ params }: Props) {
  const { category: categoryParam } = await params;
  const category = categoryParam as ProductCategory;
  if (!PRODUCT_CATEGORIES.includes(category)) notFound();

  const meta = CATEGORY_META[category];
  const products = getProductsByCategory(category);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/parts" className="hover:text-slate-700 transition-colors">
            Parts
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{meta.plural}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">
            {meta.label}
          </p>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">{meta.plural}</h1>
          <p className="max-w-2xl text-sm text-slate-600">{meta.description}</p>
        </header>

        {/* Buying guide callout */}
        <aside className="mb-8 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Buying Guide
          </p>
          <p className="text-sm text-slate-700">{meta.buyingGuide}</p>
        </aside>

        {/* Products grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const builds = getBuildsByProductId(product.id);

            return (
              <article
                key={product.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                {/* Brand + category badge */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
                    {product.brand}
                  </span>
                  <span className="ml-auto text-sm font-semibold text-blue-700">
                    ${product.priceRange.min}–${product.priceRange.max}
                  </span>
                </div>

                {/* Name */}
                <h2 className="mb-3 text-base font-semibold text-slate-900 leading-snug">
                  {product.name}
                </h2>

                {/* Specs table */}
                <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="contents">
                      <dt className="text-slate-500">{formatSpecKey(key)}</dt>
                      <dd className="font-medium text-slate-800 text-right">{String(value)}</dd>
                    </div>
                  ))}
                </dl>

                {/* Used in builds */}
                {builds.length > 0 && (
                  <div className="mb-4 border-t border-slate-100 pt-3">
                    <p className="mb-1.5 text-xs font-medium text-slate-500">
                      Used in {builds.length} {builds.length === 1 ? "build" : "builds"}
                    </p>
                    <ul className="space-y-0.5">
                      {builds.slice(0, 3).map((build) => (
                        <li key={build.slug}>
                          <Link
                            href={`/builds/${build.slug}`}
                            className="text-xs text-blue-700 hover:underline"
                          >
                            {build.title.split(" – ")[0]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Affiliate CTA */}
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-auto block rounded-lg bg-blue-700 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-blue-800"
                >
                  Check Price on Amazon &rarr;
                </a>
              </article>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
