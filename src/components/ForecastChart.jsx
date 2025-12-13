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
    <div className="bg-white p-6 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Sales Forecast (Next 7 Days)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#2563eb"
            strokeWidth={2}
            name="Actual Sales"
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#16a34a"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Forecast"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
