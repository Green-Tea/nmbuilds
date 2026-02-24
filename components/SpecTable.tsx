interface SpecTableProps {
  specs: Record<string, string | number>;
  caption?: string;
}

export default function SpecTable({ specs, caption }: SpecTableProps) {
  const entries = Object.entries(specs);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        {caption && (
          <caption className="text-left text-xs text-zinc-500 mb-1">
            {caption}
          </caption>
        )}
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b border-zinc-800">
              <td className="py-2 pr-4 font-medium text-zinc-400 whitespace-nowrap w-40">
                {formatKey(key)}
              </td>
              <td className="py-2 text-zinc-100">{String(value)}</td>
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
