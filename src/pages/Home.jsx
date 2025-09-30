export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white">
      <div className="text-center p-8">
        <h1 className="text-5xl font-extrabold mb-4">🚀 Coming Soon</h1>
        <p className="text-lg mb-6">
          We are building <span className="font-semibold">New Token Listing</span> website showcasing the newest tokens.
        </p>
        <a
          href="/admin/login"
          className="inline-flex items-center rounded-xl bg-white text-black px-6 py-3 font-semibold shadow hover:bg-gray-200"
        >
          Admin Login
        </a>
      </div>
    </div>
  )
}
