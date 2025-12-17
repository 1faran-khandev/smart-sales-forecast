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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Sales Forecast (Next 7 Days)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" darkStroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#4b5563"
            className="dark:text-gray-300"
          />
          <YAxis stroke="#4b5563" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#2563eb"
            strokeWidth={2}
            name="Actual Sales"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#16a34a"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Forecast"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
