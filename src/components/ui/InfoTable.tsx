import type { LucideIcon } from 'lucide-react';

type InfoTableProps = {
  title?: string;
  icon?: LucideIcon;
  headers?: string[];
  rows: string[][];
  /** Right-align the last column (e.g. for amounts) */
  alignLastRight?: boolean;
};

// Simple bordered table for schedules and fee overviews.
// Cells may contain line breaks; the first column is rendered bold.
export default function InfoTable({ title, icon: Icon, headers, rows, alignLastRight = false }: InfoTableProps) {
  const lastIndex = (headers ?? rows[0] ?? []).length - 1;
  const alignClass = (index: number) =>
    alignLastRight && index === lastIndex ? 'text-right' : 'text-left';

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {title && (
        <div className="bg-muted/30 px-6 py-4 flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-primary" />}
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          {headers && (
            <thead>
              <tr className="bg-surface">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-sm font-semibold text-foreground ${alignClass(index)}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-border">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, index) => (
                  <td
                    key={index}
                    className={`px-6 py-4 whitespace-pre-line ${alignClass(index)} ${
                      index === 0
                        ? 'text-foreground font-medium'
                        : alignLastRight && index === lastIndex
                          ? 'font-bold text-primary text-lg whitespace-nowrap'
                          : 'text-muted'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
