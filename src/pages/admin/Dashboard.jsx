import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white shadow rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {user ? (
          <>
            <img
              src={user.user_metadata?.avatar_url}
              alt="avatar"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="mb-2">
              Welcome, <strong>{user.user_metadata?.full_name}</strong>
            </p>
            <p className="mb-4 text-gray-600">{user.email}</p>
            <button
              onClick={signOut}
              className="rounded-xl bg-black text-white px-4 py-2"
            >
              Sign Out
            </button>
          </>
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
}
