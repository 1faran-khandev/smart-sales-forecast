export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">Total Sales</div>
        <div className="p-4 bg-white shadow rounded">Next 7 Days Forecast</div>
        <div className="p-4 bg-white shadow rounded">Inventory Alerts</div>
      </div>
    </div>
  );
}
