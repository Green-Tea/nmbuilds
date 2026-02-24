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
      <h2 className="text-xl font-bold text-zinc-100 mb-4">
        Components &amp; Parts
      </h2>
      <div className="space-y-6">
        {products.map((product) => (
          <article
            key={product.id}
            className="border border-zinc-800 rounded-lg p-4 bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {CATEGORY_LABELS[product.category] ?? product.category}
                </span>
                <h3 className="text-base font-semibold text-zinc-100 mt-0.5">
                  {product.name}
                </h3>
                <p className="text-sm text-zinc-400 mt-0.5">
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
