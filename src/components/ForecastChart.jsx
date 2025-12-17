// src/components/ForecastChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ForecastChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Sales Forecast (Next 7 Days)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D1D5DB",
              borderRadius: "5px",
            }}
          />
          {/* Actual Sales */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#2563EB"
            strokeWidth={2}
            name="Actual Sales"
            dot={{ r: 4 }}
          />
          {/* Forecast Sales */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#16A34A"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Forecast Sales"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
