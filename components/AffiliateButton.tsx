interface AffiliateButtonProps {
  href: string;
  label?: string;
}

export default function AffiliateButton({
  href,
  label = "Check Price on Amazon",
}: AffiliateButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold text-sm px-4 py-2 rounded transition-colors"
    >
      {label} &rarr;
    </a>
  );
}
