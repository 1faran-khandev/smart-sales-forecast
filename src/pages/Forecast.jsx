import { useEffect, useState } from "react";
import ForecastChart from "../components/ForecastChart";
import { forecastSeries } from "../data/forecastData";

export default function Forecast() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(forecastSeries);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const totalActual = data
    .filter(d => !d.isForecast && d.actualRevenue)
    .reduce((sum, d) => sum + d.actualRevenue, 0);

  const totalForecast = data
    .filter(d => d.isForecast)
    .reduce((sum, d) => sum + d.predictedRevenue, 0);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Sales Forecast Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Predicted revenue for upcoming days based on historical sales data.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <p className="text-sm text-gray-500">Actual Revenue</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            ${totalActual}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <p className="text-sm text-gray-500">Forecasted Revenue</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            ${totalForecast}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <p className="text-sm text-gray-500">Confidence</p>
          <p className="text-xl font-semibold text-green-600">
            High
          </p>
        </div>
      </div>

      {/* Chart */}
      <ForecastChart data={data} loading={loading} />
    </div>
  );
}
