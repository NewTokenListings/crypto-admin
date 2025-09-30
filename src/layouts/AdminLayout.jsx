import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-xl px-3 py-2 text-sm ${
          isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
        }`
      }
      end
    >
      {label}
    </NavLink>
  )
}

export default function AdminLayout() {
  const { signOut, user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="hidden md:block w-64 p-4 border-r bg-white">
          <div className="mb-6">
            <a href="/" className="text-lg font-bold">Crypto Admin</a>
          </div>
          <nav className="space-y-1">
            <NavItem to="/admin/dashboard" label="Dashboard" />
            <NavItem to="/admin/users" label="Users" />
            <NavItem to="/admin/transactions" label="Transactions" />
          </nav>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="md:hidden">
                <select
                  className="rounded-lg border px-2 py-1"
                  onChange={(e) => (window.location.href = e.target.value)}
                  defaultValue="/admin/dashboard"
                >
                  <option value="/admin/dashboard">Dashboard</option>
                  <option value="/admin/users">Users</option>
                  <option value="/admin/transactions">Transactions</option>
                </select>
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-3">
                {user?.email && <span className="text-sm text-gray-600">{user.email}</span>}
                <button
                  onClick={() => signOut()}
                  className="rounded-xl border px-3 py-1.5 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
