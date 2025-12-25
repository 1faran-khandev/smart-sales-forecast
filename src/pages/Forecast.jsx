import { useEffect, useState } from "react";
import ForecastChart from "../components/ForecastChart";
import { dummyForecastData } from "../data/dummyForecastData";

export default function Forecast() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate API / CSV processing delay
    const timer = setTimeout(() => {
      setData(dummyForecastData);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        Sales Forecast
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Forecasted sales for the next 7 days based on uploaded CSV data.
      </p>
      <ForecastChart data={data} loading={loading} />
    </div>
  );
}
