import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ComparisonsPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Build comparisons</h1>
        <p className="mt-3 text-slate-600">Curated side-by-side comparisons are coming soon.</p>
      </main>
      <Footer />
    </div>
  );
}
