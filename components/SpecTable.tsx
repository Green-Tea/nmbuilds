interface SpecTableProps {
  specs: Record<string, string | number>;
  caption?: string;
}

export default function SpecTable({ specs, caption }: SpecTableProps) {
  const entries = Object.entries(specs);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {caption && <caption className="mb-1 text-left text-xs text-slate-500">{caption}</caption>}
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b border-slate-200">
              <td className="w-40 whitespace-nowrap py-2 pr-4 font-medium text-slate-500">
                {formatKey(key)}
              </td>
              <td className="py-2 text-slate-900">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
