import type { Product } from "@/types";
import SpecTable from "./SpecTable";
import AffiliateButton from "./AffiliateButton";

interface ProductListProps {
  products: Product[];
}

const CATEGORY_LABELS: Record<string, string> = {
  cpu: "CPU",
  gpu: "GPU",
  ram: "RAM",
  storage: "Storage",
  motherboard: "Motherboard",
  psu: "Power Supply",
  case: "Case",
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <section aria-label="Build component list">
      <h2 className="mb-4 text-xl font-bold text-slate-900">Components &amp; Parts</h2>
      <div className="space-y-6">
        {products.map((product) => (
          <article key={product.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {CATEGORY_LABELS[product.category] ?? product.category}
                </span>
                <h3 className="mt-0.5 text-base font-semibold text-slate-900">{product.name}</h3>
                <p className="mt-0.5 text-sm text-slate-600">
                  ${product.priceRange.min} – ${product.priceRange.max}
                </p>
              </div>
              <AffiliateButton href={product.affiliateUrl} />
            </div>
            <div className="mt-4">
              <SpecTable specs={product.specs} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
