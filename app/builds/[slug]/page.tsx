import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllBuildSlugs,
  getBuildWithProducts,
  getTotalBuildPrice,
} from "@/lib/getBuilds";
import { getRelatedBuilds } from "@/lib/relations";
import { getMarkdownForBuild } from "@/lib/markdown";
import ProductList from "@/components/ProductList";
import InternalLinkSection from "@/components/InternalLinkSection";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  USER_TYPE_LABELS,
  BUDGET_TIER_LABELS,
  BUDGET_TIER_RANGES,
} from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBuildSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuildWithProducts(slug);
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

export default async function BuildPage({ params }: Props) {
  const { slug } = await params;
  const build = getBuildWithProducts(slug);
  if (!build) notFound();

  const related = getRelatedBuilds(build);
  const price = getTotalBuildPrice(build);
  const markdown = getMarkdownForBuild(slug);

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
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-10">
          <div className="mb-2 flex flex-wrap gap-2">
            <Link
              href={`/category/${build.userType}/`}
              className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-slate-700 transition-colors hover:bg-slate-200"
            >
              {USER_TYPE_LABELS[build.userType]}
            </Link>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
              {BUDGET_TIER_LABELS[build.budgetTier]}
            </span>
            <span className="px-2 py-0.5 text-xs text-slate-500">
              {BUDGET_TIER_RANGES[build.budgetTier]}
            </span>
          </div>

          <h1 className="mb-3 text-3xl font-bold text-slate-900">{build.title}</h1>
          <p className="max-w-2xl text-sm text-slate-600">{build.description}</p>

          <div className="mt-4 text-sm text-slate-700">
            <span className="font-medium">Estimated total:</span>{" "}
            <span className="font-semibold text-blue-700">
              ${price.min.toLocaleString()} – ${price.max.toLocaleString()}
            </span>
            <span className="ml-2 text-xs text-slate-500">
              (prices approximate, check links for current pricing)
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">Last updated: {build.lastUpdated}</p>
        </header>

        <div className="space-y-12">
          <ProductList products={build.products} />

          {markdown?.content && (
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">Build Notes</h2>
              <div
                className="prose prose-slate prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown.content) }}
              />
            </section>
          )}

          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <FaqSection build={build} price={price} />
          </section>

          <InternalLinkSection related={related} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function markdownToHtml(md: string): string {
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
      a: "Yes. Most components can be upgraded independently. The motherboard socket and chipset determine CPU upgrade paths, while the PSU wattage and case clearance define GPU upgrade headroom.",
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
          <div key={q} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <dt className="mb-1 text-sm font-semibold text-slate-900">{q}</dt>
            <dd className="text-sm text-slate-600">{a}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
