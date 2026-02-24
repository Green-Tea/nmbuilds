import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";

const navItems = [
  { href: "/builds", label: "Builds" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/60 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <Image
            src={assetPath("/images/logo-mark.png")}
            alt="NM Builds logo"
            width={42}
            height={42}
            className="rounded-md"
            priority
          />
          <span>
            <span className="font-bold">nm</span> builds
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-200 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/search"
          aria-label="Search"
          className="rounded-md p-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
