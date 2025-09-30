export default function DataTable({ columns, data }) {
  const cols = columns ?? (data[0] ? Object.keys(data[0]).map((key) => ({ key, header: key })) : [])
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            {cols.map((c) => (
              <th key={c.key} className="px-4 py-3 font-medium capitalize">{c.header ?? c.key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={cols.length}>
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="border-t">
                {cols.map((c) => (
                  <td key={c.key} className="px-4 py-3">{String(row[c.key] ?? '')}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
