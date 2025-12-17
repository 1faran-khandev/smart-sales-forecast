import React, { useState } from "react";
import Papa from "papaparse";

const CSVUploader = ({ onColumnsDetected }) => {
  const [preview, setPreview] = useState([]);
  const [detectedColumns, setDetectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Detect Columns
  const detectColumns = (rows) => (rows?.length ? Object.keys(rows[0]) : []);

  // Handle CSV Upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      setError("Only CSV files are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
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
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Upload CSV
      </h2>

      {/* File Input */}
      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {loading && (
        <p className="text-blue-500 mb-2">Parsing CSV, please wait...</p>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {preview.length > 0 && (
        <>
          {/* CSV Preview */}
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            CSV Preview (10 rows)
          </h3>
          <div className="overflow-auto border rounded mb-4">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b">
                <tr>
                  {Object.keys(preview[0]).map((col, index) => (
                    <th
                      key={index}
                      className="px-3 py-2 border text-gray-700 dark:text-gray-200"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.slice(0, 10).map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
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

          {/* Detected Columns */}
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Detected Columns
          </h3>
          <ul className="list-disc ml-6 text-gray-800 dark:text-gray-100">
            {detectedColumns.map((col, index) => (
              <li key={index}>{col}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CSVUploader;
