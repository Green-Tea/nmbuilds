import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="bg-slate-900 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Find the perfect setup
            <br />
            for your needs
          </h1>
          <p className="mt-4 max-w-prose text-base text-slate-200 md:text-lg">
            Expert PC setups for gamers, students, developers, and creators.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/builds"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-500"
            >
              Browse builds
            </Link>
            <Link
              href="/guides"
              className="rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              Read guides
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/images/hero-setup.svg"
              alt="Desk setup with PC and monitor"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
