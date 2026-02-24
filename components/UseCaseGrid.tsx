import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    href: "/category/gamer",
    title: "Gamer Setups",
    desc: "High-performance gaming rigs.",
    image: "/images/use-case-gamer.svg",
  },
  {
    href: "/category/student",
    title: "Student Setups",
    desc: "Affordable setups for school.",
    image: "/images/use-case-student.svg",
  },
  {
    href: "/category/developer",
    title: "Developer Setups",
    desc: "Optimized workstations for coding.",
    image: "/images/use-case-developer.svg",
  },
  {
    href: "/category/creator",
    title: "Creator Setups",
    desc: "Gear for content creation.",
    image: "/images/use-case-creator.svg",
  },
];

export default function UseCaseGrid() {
  return (
    <section id="use-cases" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Browse by use case
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative h-36 w-full">
              <Image src={card.image} alt="" fill className="object-cover" />
            </div>
            <div className="p-5">
              <div className="text-lg font-semibold text-slate-900">{card.title}</div>
              <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
              <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                View builds →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
