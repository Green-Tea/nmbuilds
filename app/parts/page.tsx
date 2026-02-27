import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/getProducts";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/types";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PC Parts – Component Specs, Reviews & Buying Guides",
  description:
    "Browse specs, prices, and buying guides for every PC component category: CPUs, GPUs, RAM, storage, motherboards, power supplies, and cases.",
};

const CATEGORY_META: Record<
  ProductCategory,
  { label: string; plural: string; description: string }
> = {
  cpu: {
    label: "CPU",
    plural: "CPUs",
    description:
      "Processors are the core of every build. Compare clock speeds, core counts, and socket compatibility.",
  },
  gpu: {
    label: "GPU",
    plural: "GPUs",
    description:
      "Graphics cards drive gaming performance, video rendering, and creative workloads. Compare VRAM and target resolutions.",
  },
  ram: {
    label: "RAM",
    plural: "RAM Kits",
    description:
      "System memory affects multitasking and application responsiveness. Compare capacity, speed, and latency.",
  },
  storage: {
    label: "Storage",
    plural: "Storage Drives",
    description:
      "NVMe and SATA SSDs for fast boot times and application load speeds. Compare read/write throughput and capacity.",
  },
  motherboard: {
    label: "Motherboard",
    plural: "Motherboards",
    description:
      "Motherboards define CPU and memory compatibility. Compare socket types, chipsets, and expansion options.",
  },
  psu: {
    label: "PSU",
    plural: "Power Supplies",
    description:
      "Power supplies deliver stable power to your components. Compare wattage ratings and efficiency certifications.",
  },
  case: {
    label: "Case",
    plural: "Cases",
    description:
      "PC cases house and cool your build. Compare form factors, airflow design, and build quality.",
  },
};

export default function PartsPage() {
  const allProducts = getAllProducts();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-10">
          <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">
            Components
          </p>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">PC Parts</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Specs, prices, and buying guides for every component category. Each
            part links to the builds it appears in.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((category) => {
            const meta = CATEGORY_META[category];
            const count = allProducts.filter(
              (p) => p.category === category
            ).length;

            return (
              <Link
                key={category}
                href={`/parts/${category}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
                    {meta.label}
                  </span>
                  <span className="text-xs text-slate-400">
                    {count} {count === 1 ? "product" : "products"}
                  </span>
                </div>
                <h2 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {meta.plural}
                </h2>
                <p className="text-sm text-slate-600">{meta.description}</p>
                <span className="mt-4 block text-xs font-medium text-blue-700">
                  Browse {meta.plural} &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
