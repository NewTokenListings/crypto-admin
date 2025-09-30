import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

export default function Login() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/admin/dashboard'

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) alert(error.message)
  }

  if (session) {
    navigate(redirectTo, { replace: true })
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <button
          onClick={signInWithGoogle}
          className="w-full rounded-xl bg-black text-white py-2"
        >
          Sign in with Google
        </button>
        <Link to="/" className="text-sm inline-block mt-4 underline">
          ← Back to public site
        </Link>
      </div>
    </div>
  )
}
