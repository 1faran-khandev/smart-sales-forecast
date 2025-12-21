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
    <div>
      <ForecastChart data={data} loading={loading} />
    </div>
  );
}
