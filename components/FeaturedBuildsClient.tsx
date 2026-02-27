"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type BuildCard = {
  href: string;
  title: string;
  tagline: string;
  price: string;
  image: string;
};

type Tab = {
  id: string;
  label: string;
  builds: BuildCard[];
};

export default function FeaturedBuildsClient({ tabs }: { tabs: Tab[] }) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <>
      <div className="mt-4 flex items-center gap-4 border-b border-slate-200 pb-3 text-sm font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`cursor-pointer transition-colors ${
              tab.id === activeId ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {activeTab.builds.map((build) => (
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
    </>
  );
}
