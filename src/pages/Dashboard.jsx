import {
  FaDollarSign,
  FaChartLine,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const kpis = [
  {
    title: "Total Sales",
    value: 12345,
    change: 8.2,
    icon: FaDollarSign,
    color: "text-green-500",
  },
  {
    title: "7-Day Forecast",
    value: 14200,
    change: 12.5,
    icon: FaChartLine,
    color: "text-blue-500",
  },
  {
    title: "Inventory Alerts",
    value: 3,
    change: -1,
    icon: FaExclamationTriangle,
    color: "text-red-500",
  },
];

export default function Dashboard() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Forecasted Sales",
        data: [120, 200, 150, 170, 210, 190, 230],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.formattedValue}`,
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => {
          const isPositive = kpi.change >= 0;
          const ChangeIcon = isPositive ? FaArrowUp : FaArrowDown;
          const changeColor = isPositive ? "text-green-600" : "text-red-500";
          const Icon = kpi.icon;

          return (
            <div
              key={kpi.title}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition"
              aria-label={`${kpi.title} card`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {kpi.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {kpi.title === "Total Sales" || kpi.title === "7-Day Forecast"
                      ? `$${kpi.value.toLocaleString()}`
                      : kpi.value}
                  </h3>
                </div>
                <div className={`text-3xl ${kpi.color}`}>
                  <Icon />
                </div>
              </div>

              <div className={`mt-2 flex items-center text-sm ${changeColor}`}>
                <ChangeIcon className="mr-1" />
                {kpi.change > 0 || kpi.change < 0 ? `${Math.abs(kpi.change)}%` : kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Forecast Chart */}
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        aria-label="7-Day Sales Forecast Chart"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          7-Day Sales Forecast
        </h3>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
