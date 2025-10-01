import { useAuth } from "../../context/AuthContext";

export default function AuthDebug() {
  const { session, user, initializing } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Auth Debug</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {JSON.stringify(
          {
            initializing,
            session,
            user,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
