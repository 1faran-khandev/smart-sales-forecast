import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartSkeleton from "../components/skeletons/ChartSkeleton";

export default function ForecastChart({ data, loading }) {
  if (loading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Sales Forecast (Next 7 Days)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#3B82F6"
            strokeWidth={2}
            name="Actual Sales"
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#22C55E"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Forecast"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
