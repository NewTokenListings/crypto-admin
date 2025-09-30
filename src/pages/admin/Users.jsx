import DataTable from '../../components/DataTable'
import { useSupabaseTable } from '../../hooks/useSupabaseTable'

export default function Users() {
  const { data, loading, error, refresh } = useSupabaseTable({
    table: 'users',
    select: 'id,email,created_at',
    order: { column: 'created_at', ascending: false },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <button onClick={refresh} className="rounded-xl border px-3 py-1.5 hover:bg-gray-50">
          Refresh
        </button>
      </div>
      {loading && <p className="text-gray-500">Loading…</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
      {!loading && !error && <DataTable data={data} />}
    </div>
  )
}
