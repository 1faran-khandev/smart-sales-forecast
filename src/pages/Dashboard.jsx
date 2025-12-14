import { FaDollarSign, FaChartLine, FaExclamationTriangle } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Dummy data for forecast chart
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Forecasted Sales",
        data: [120, 200, 150, 170, 210, 190, 230],
        fill: false,
        backgroundColor: "#3B82F6",
        borderColor: "#3B82F6",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Next 7 Days Sales Forecast",
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow rounded flex items-center gap-4">
          <FaDollarSign className="text-3xl text-green-500" />
          <div>
            <p className="text-gray-500">Total Sales</p>
            <p className="text-xl font-bold">$12,345</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded flex items-center gap-4">
          <FaChartLine className="text-3xl text-blue-500" />
          <div>
            <p className="text-gray-500">Next 7 Days Forecast</p>
            <p className="text-xl font-bold">~ $14,200</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded flex items-center gap-4">
          <FaExclamationTriangle className="text-3xl text-red-500" />
          <div>
            <p className="text-gray-500">Inventory Alerts</p>
            <p className="text-xl font-bold">3 Items Low</p>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="p-4 bg-white shadow rounded">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
