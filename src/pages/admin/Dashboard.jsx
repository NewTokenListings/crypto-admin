export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Welcome 👋</h1>
      <p className="text-gray-600">
        This is your admin dashboard. Use the sidebar to navigate to Users and Transactions.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-2xl font-bold">—</div>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-gray-500">Transactions</div>
          <div className="text-2xl font-bold">—</div>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-gray-500">Status</div>
          <div className="text-2xl font-bold">OK</div>
        </div>
      </div>
    </div>
  )
}
