import { useState, useEffect } from "react";
import { FaDollarSign, FaChartLine, FaExclamationTriangle, FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";

// KPI Skeleton for loading state
function KpiSkeleton() {
  return <div className="bg-gray-200 dark:bg-gray-700 p-5 rounded-xl animate-pulse h-28" />;
}

// KPI Configuration (data-driven)
const KPI_CONFIG = [
  { key: "totalSales", title: "Total Sales", icon: FaDollarSign, color: "text-green-500", format: "currency" },
  { key: "forecast", title: "7-Day Forecast", icon: FaChartLine, color: "text-blue-500", format: "currency" },
  { key: "alerts", title: "Inventory Alerts", icon: FaExclamationTriangle, color: "text-red-500", format: "number" },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({});
  const [forecastData, setForecastData] = useState([]);

  // Simulate fetching data from API
  useEffect(() => {
    const timeout = setTimeout(() => {
      setKpis({
        totalSales: { value: 12345, change: 8.2 },
        forecast: { value: 14200, change: 12.5 },
        alerts: { value: 3, change: -1 },
      });

      setForecastData([
        { date: "Mon", value: 120 },
        { date: "Tue", value: 200 },
        { date: "Wed", value: 150 },
        { date: "Thu", value: 170 },
        { date: "Fri", value: 210 },
        { date: "Sat", value: 190 },
        { date: "Sun", value: 230 },
      ]);

      setLoading(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  // Prepare chart data
  const lastValue = forecastData[forecastData.length - 1]?.value || 0;
  const trend =
    forecastData[forecastData.length - 1]?.value >= forecastData[0]?.value
      ? "Upward trend expected"
      : "Downward trend expected";

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading
          ? Array(3).fill(0).map((_, i) => <KpiSkeleton key={i} />)
          : KPI_CONFIG.map((config) => {
              const data = kpis[config.key];
              const isPositive = data.change >= 0;
              const ChangeIcon = isPositive ? FaArrowUp : FaArrowDown;
              const changeColor = isPositive ? "text-green-600" : "text-red-500";
              const Icon = config.icon;

              return (
                <div
                  key={config.key}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition"
                  aria-label={`${config.title} card`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{config.title}</p>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {config.format === "currency" ? `$${data.value.toLocaleString()}` : data.value}
                      </h3>
                    </div>
                    <div className={`text-3xl ${config.color}`}>
                      <Icon />
                    </div>
                  </div>

                  <div className={`mt-2 flex items-center text-sm ${changeColor}`}>
                    <ChangeIcon className="mr-1" />
                    {data.change === 0 ? "No change" : `${Math.abs(data.change)}%`}
                  </div>
                </div>
              );
            })}
      </div>

      {/* Sales Forecast Chart */}
      {loading ? (
        <ChartSkeleton />
      ) : (
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          aria-label="7-Day Sales Forecast Chart"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">7-Day Sales Forecast</h3>
            <span className={`text-sm font-medium ${trend.includes("Upward") ? "text-green-600" : "text-red-500"}`}>
              {trend}
            </span>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderRadius: "8px",
                  border: "none",
                  color: "#F9FAFB",
                }}
                labelStyle={{ color: "#E5E7EB" }}
                formatter={(value) => `$${value}`}
              />
              <Legend />
              <ReferenceLine x={forecastData[0]?.date} stroke="#6B7280" strokeDasharray="4 4" label={{ value: "Forecast Start", position: "top", fill: "#9CA3AF" }} />

              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3 }} name="Forecasted Sales" />
            </LineChart>
          </ResponsiveContainer>

          {/* Executive Insight */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Forecast indicates a consistent sales trend this week. Consider reviewing inventory for high-demand days.
          </p>
        </div>
      )}
    </div>
  );
}
