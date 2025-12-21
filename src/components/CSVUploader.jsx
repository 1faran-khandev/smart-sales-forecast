import React, { useState } from "react";
import Papa from "papaparse";

export default function CSVUploader({ onColumnsDetected, maxFileSizeMB = 2 }) {
  const [preview, setPreview] = useState([]);
  const [detectedColumns, setDetectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectColumns = (rows) => (rows?.length ? Object.keys(rows[0]) : []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      setError("Only CSV files are allowed.");
      return;
    }

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxFileSizeMB}MB.`);
      return;
    }

    setError("");
    setLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setLoading(false);
        const rows = results.data;
        setPreview(rows);

        const detected = detectColumns(rows);
        setDetectedColumns(detected);

        if (onColumnsDetected) onColumnsDetected(detected);
      },
      error: (err) => {
        setLoading(false);
        setError("Failed to parse CSV: " + err.message);
      },
    });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white text-center">
        Upload CSV
      </h2>

      {/* File Input */}
      <div className="mb-4">
        <label htmlFor="csv-upload" className="sr-only">
          CSV Upload
        </label>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleUpload}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && (
        <p className="text-blue-500 mb-2 animate-pulse">Parsing CSV, please wait...</p>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {preview.length > 0 && (
        <>
          {/* Detected Columns */}
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Detected Columns
          </h3>
          <ul className="list-disc ml-6 text-gray-800 dark:text-gray-100 mb-4">
            {detectedColumns.map((col, index) => (
              <li key={index}>{col}</li>
            ))}
          </ul>

          {/* CSV Preview */}
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            CSV Preview (first 10 rows)
          </h3>
          <div className="overflow-auto border rounded mb-4">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b">
                <tr>
                  {Object.keys(preview[0]).map((col, index) => (
                    <th
                      key={index}
                      className="px-3 py-2 border text-gray-700 dark:text-gray-200 text-left"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.slice(0, 10).map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    {Object.values(row).map((value, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-3 py-2 border text-gray-800 dark:text-gray-100"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
