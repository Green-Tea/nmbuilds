import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Search</h1>
        <p className="mt-3 text-slate-600">Search is planned for the next iteration.</p>
      </main>
      <Footer />
    </div>
  );
}
