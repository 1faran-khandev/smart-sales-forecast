import React, { useState } from "react";
import Papa from "papaparse";
import { validateCSV } from "../utils/csvValidation";
import ColumnMapper from "./ColumnMapper";
import ForecastChart from "./ForecastChart";
import { dummyForecastData } from "../utils/dummyForecast";

export default function CSVUploader() {
  const [preview, setPreview] = useState([]);
  const [columns, setColumns] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [mapping, setMapping] = useState({});
  const [showForecast, setShowForecast] = useState(false);

  const handleCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // reset previous state
    setPreview([]);
    setColumns([]);
    setErrors([]);
    setIsValid(false);
    setMapping({});
    setShowForecast(false);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;

        // Validate CSV
        const validation = validateCSV(rows);
        setErrors(validation.errors);
        setIsValid(validation.isValid);

        // Show first 10 rows as preview
        setPreview(rows.slice(0, 10));

        // Detect columns
        if (rows.length > 0) {
          setColumns(Object.keys(rows[0]));
        }
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Sales CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleCSV}
        className="w-full border p-2 rounded"
      />

      {/* ERROR STATE */}
      {errors.length > 0 && (
        <div className="mt-4 bg-red-100 border border-red-300 p-4 rounded">
          <h3 className="font-semibold text-red-700 mb-2">
            Data validation failed
          </h3>
          <ul className="text-sm text-red-600 list-disc ml-5">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SUCCESS STATE */}
      {isValid && (
        <div className="mt-4 bg-green-100 border border-green-300 p-3 rounded text-green-700">
          ✅ Data looks good. Please map your columns.
        </div>
      )}

      {/* COLUMN PREVIEW */}
      {columns.length > 0 && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Detected Columns:</strong> {columns.join(", ")}
        </div>
      )}

      {/* CSV PREVIEW TABLE */}
      {preview.length > 0 && (
        <div className="mt-6 overflow-auto border rounded">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(preview[0]).map((col) => (
                  <th key={col} className="border p-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, index) => (
                <tr key={index} className="border-t">
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border p-2">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* COLUMN MAPPING */}
      {isValid && columns.length > 0 && (
        <ColumnMapper
          columns={columns}
          mapping={mapping}
          setMapping={setMapping}
          onContinue={() => {
            console.log("Final Mapping:", mapping);
            setShowForecast(true);
          }}
        />
      )}

      {/* FORECAST CHART */}
      {showForecast && <ForecastChart data={dummyForecastData} />}
    </div>
  );
}
