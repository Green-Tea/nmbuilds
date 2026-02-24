import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";

export default function CTAPanels() {
  return (
    <section id="cta-panels" className="mx-auto max-w-6xl px-4 pb-16">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-44 w-full">
            <Image src={assetPath("/images/featured-gamer.svg")} alt="" fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900">Browse all builds</h3>
            <p className="mt-2 text-sm text-slate-600">
              Explore every build in one place and filter by your needs.
            </p>
            <Link
              href="/builds"
              className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              View builds
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-44 w-full">
            <Image src={assetPath("/images/cta-guides.svg")} alt="" fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900">Expert guides & tips</h3>
            <p className="mt-2 text-sm text-slate-600">
              Practical advice for optimizing performance and spending.
            </p>
            <Link
              href="/guides"
              className="mt-5 inline-flex rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
            >
              Read guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
