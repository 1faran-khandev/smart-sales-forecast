import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
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

  const actualData = data.filter(d => !d.isForecast && d.actualRevenue !== null);
  const forecastData = data.filter(d => d.isForecast);

  const lastActual = actualData[actualData.length - 1];
  const firstForecast = forecastData[0];

  const trend =
    firstForecast.predictedRevenue >= lastActual.actualRevenue
      ? "Upward trend expected"
      : "Downward trend expected";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Sales Forecast (Next 7 Days)
        </h3>
        <span
          className={`text-sm font-medium ${
            trend.includes("Upward")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {trend}
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

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
            labelStyle={{ color: "#E5E7EB" }}
          />

          <Legend />

          {/* Divider between actual & forecast */}
          <ReferenceLine
            x={forecastData[0]?.date}
            stroke="#6B7280"
            strokeDasharray="4 4"
            label={{ value: "Forecast Start", position: "top", fill: "#9CA3AF" }}
          />

          {/* Actual Revenue */}
          <Line
            type="monotone"
            dataKey="actualRevenue"
            stroke="#3B82F6"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            name="Actual Revenue"
          />

          {/* Forecast Revenue */}
          <Line
            type="monotone"
            dataKey="predictedRevenue"
            stroke="#22C55E"
            strokeWidth={2.5}
            strokeDasharray="6 4"
            dot={{ r: 3 }}
            name="Forecasted Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
