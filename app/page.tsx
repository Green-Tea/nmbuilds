import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import UseCaseGrid from "@/components/UseCaseGrid";
import FeaturedBuilds from "@/components/FeaturedBuilds";
import CTAPanels from "@/components/CTAPanels";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NM Builds – PC Build Recommendations for Every Budget",
  description:
    "Find the best PC build for your use case and budget. Structured hardware recommendations for gamers, students, developers, and content creators.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <NavBar />
      <main>
        <Hero />
        <UseCaseGrid />
        <FeaturedBuilds />
        <CTAPanels />
      </main>
      <Footer />
    </div>
  );
}
