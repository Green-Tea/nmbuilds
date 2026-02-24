import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllBuildSlugs,
  getBuildWithProducts,
  getTotalBuildPrice,
} from "@/lib/getBuilds";
import { getRelatedBuilds } from "@/lib/relations";
import { getMarkdownForBuild } from "@/lib/markdown";
import ProductList from "@/components/ProductList";
import InternalLinkSection from "@/components/InternalLinkSection";
import {
  USER_TYPE_LABELS,
  BUDGET_TIER_LABELS,
  BUDGET_TIER_RANGES,
} from "@/types";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllBuildSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const build = getBuildWithProducts(params.slug);
  if (!build) return {};

  const price = getTotalBuildPrice(build);

  return {
    title: build.title,
    description: build.description,
    openGraph: {
      title: build.title,
      description: build.description,
      type: "article",
      modifiedTime: build.lastUpdated,
    },
    other: {
      "price:amount": String(price.min),
      "price:currency": "USD",
    },
  };
}

export default function BuildPage({ params }: Props) {
  const build = getBuildWithProducts(params.slug);
  if (!build) notFound();

  const related = getRelatedBuilds(build);
  const price = getTotalBuildPrice(build);
  const markdown = getMarkdownForBuild(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: build.title,
    description: build.description,
    dateModified: build.lastUpdated,
    author: { "@type": "Organization", name: "NM Builds" },
    mainEntityOfPage: {
      "@type": "WebPage",
    },
    about: build.products.map((p) => ({
      "@type": "Product",
      name: p.name,
      brand: { "@type": "Brand", name: p.brand },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: p.priceRange.min,
        availability: "https://schema.org/InStock",
        url: p.affiliateUrl,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-10">
        <div className="flex gap-2 flex-wrap mb-2">
          <a
            href={`/category/${build.userType}/`}
            className="text-xs font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded hover:bg-zinc-700 transition-colors"
          >
            {USER_TYPE_LABELS[build.userType]}
          </a>
          <span className="text-xs font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
            {BUDGET_TIER_LABELS[build.budgetTier]}
          </span>
          <span className="text-xs text-zinc-500 px-2 py-0.5">
            {BUDGET_TIER_RANGES[build.budgetTier]}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-zinc-100 mb-3">{build.title}</h1>
        <p className="text-zinc-400 text-sm max-w-2xl">{build.description}</p>

        <div className="mt-4 text-sm text-zinc-300">
          <span className="font-medium">Estimated total:</span>{" "}
          <span className="text-amber-400 font-semibold">
            ${price.min.toLocaleString()} – ${price.max.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-500 ml-2">
            (prices approximate, check links for current pricing)
          </span>
        </div>

        <p className="text-xs text-zinc-600 mt-1">
          Last updated: {build.lastUpdated}
        </p>
      </header>

      <div className="space-y-12">
        <ProductList products={build.products} />

        {markdown?.content && (
          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">
              Build Notes
            </h2>
            <div
              className="prose prose-invert prose-sm max-w-none text-zinc-300"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown.content) }}
            />
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">
            Frequently Asked Questions
          </h2>
          <FaqSection build={build} price={price} />
        </section>

        <InternalLinkSection related={related} />
      </div>
    </>
  );
}

function markdownToHtml(md: string): string {
  // Minimal inline markdown → HTML conversion for build notes
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$2</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|p])(.+)$/gm, "<p>$1</p>");
}

interface FaqProps {
  build: ReturnType<typeof getBuildWithProducts> & object;
  price: { min: number; max: number };
}

function FaqSection({ build, price }: FaqProps) {
  if (!build) return null;

  const faqs = [
    {
      q: `What is the total cost of this ${BUDGET_TIER_LABELS[build.budgetTier].toLowerCase()} ${USER_TYPE_LABELS[build.userType].toLowerCase()} build?`,
      a: `The estimated total for this build is $${price.min.toLocaleString()} to $${price.max.toLocaleString()} depending on current pricing. Check the affiliate links above for live pricing on each component.`,
    },
    {
      q: `Is this build good for ${USER_TYPE_LABELS[build.userType].toLowerCase()}?`,
      a: `Yes. This build is specifically configured for ${USER_TYPE_LABELS[build.userType].toLowerCase()} workloads at the ${BUDGET_TIER_LABELS[build.budgetTier].toLowerCase()} budget tier. Every component was selected for the best performance-per-dollar for this use case.`,
    },
    {
      q: "Can I upgrade this build later?",
      a: `Yes. Most components can be upgraded independently. The motherboard socket and chipset determine CPU upgrade paths, while the PSU wattage and case clearance define GPU upgrade headroom.`,
    },
    {
      q: "Are affiliate links included?",
      a: "Yes. Each product links to Amazon with an affiliate tag. Purchasing through these links supports the site at no extra cost to you.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <dl className="space-y-4">
        {faqs.map(({ q, a }) => (
          <div key={q} className="border border-zinc-800 rounded-lg p-4">
            <dt className="text-sm font-semibold text-zinc-100 mb-1">{q}</dt>
            <dd className="text-sm text-zinc-400">{a}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
