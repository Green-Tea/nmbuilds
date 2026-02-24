export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <div>
          © {new Date().getFullYear()} nm builds. Affiliate links may earn a
          commission.
        </div>
        <div className="mt-2">Prices listed are approximate and may change.</div>
      </div>
    </footer>
  );
}
