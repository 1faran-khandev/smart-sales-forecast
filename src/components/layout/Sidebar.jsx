export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 fixed left-0 top-0">
      <h1 className="text-2xl font-bold mb-8">SmartSales</h1>

      <nav className="space-y-3">
        <a href="/" className="block px-3 py-2 rounded hover:bg-gray-700">Dashboard</a>
        <a href="/upload" className="block px-3 py-2 rounded hover:bg-gray-700">Upload CSV</a>
        <a href="/forecast" className="block px-3 py-2 rounded hover:bg-gray-700">Forecast</a>
        <a href="/insights" className="block px-3 py-2 rounded hover:bg-gray-700">Insights</a>
      </nav>
    </div>
  );
}
