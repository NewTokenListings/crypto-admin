import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ALLOWED_EMAIL = "your.email@gmail.com" // 👈 replace with your Gmail

export default function ProtectedRoute({ children }) {
  const { session, initializing } = useAuth()
  const location = useLocation()

  if (initializing) {
    return <div className="flex h-screen items-center justify-center">Loading…</div>
  }

  if (!session || session.user.email !== ALLOWED_EMAIL) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}
