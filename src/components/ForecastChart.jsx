import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";

export default function ForecastChart({ data = [], loading }) {
  if (loading) {
    return <ChartSkeleton />;
  }

  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No forecast data available. Upload CSV to generate predictions.
        </p>
      </div>
    );
  }

  const lastActual = data[data.length - 1]?.actual;
  const lastForecast = data[data.length - 1]?.forecast;
  const trend =
    lastForecast > lastActual ? " Upward trend expected" : " Downward trend expected";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Sales Forecast (Next 7 Days)
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {trend}
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              borderRadius: "8px",
              border: "none",
              color: "#F9FAFB",
            }}
          />
          <Legend />

          {/* Actual */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Actual Sales"
          />

          {/* Forecast */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#22C55E"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={{ r: 3 }}
            name="Forecast"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}