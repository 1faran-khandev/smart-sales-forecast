import React, { useState } from "react";
import Papa from "papaparse";

const PREVIEW_LIMIT = 10;

export default function CSVUploader({ onColumnsDetected, maxFileSizeMB = 2 }) {
  const [preview, setPreview] = useState([]);
  const [detectedColumns, setDetectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const detectColumns = (rows) =>
    rows?.length ? Object.keys(rows[0]) : [];

  const validateFile = (file) => {
    if (!file) return "No file selected.";
    if (file.type !== "text/csv") return "Only CSV files are allowed.";
    if (file.size > maxFileSizeMB * 1024 * 1024)
      return `File size must be under ${maxFileSizeMB}MB.`;
    return "";
  };

  const parseCSV = (file) => {
    setLoading(true);
    setError("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        setLoading(false);
        setPreview(data.slice(0, PREVIEW_LIMIT));

        const columns = detectColumns(data);
        setDetectedColumns(columns);
        onColumnsDetected?.(columns);
      },
      error: (err) => {
        setLoading(false);
        setError("Failed to parse CSV: " + err.message);
      },
    });
  };

  const handleUpload = (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFileName(file.name);
    parseCSV(file);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white text-center">
        Upload CSV File
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
        Upload a CSV file to preview data and detect columns automatically
      </p>

      {/* Upload Area */}
      <label
        htmlFor="csv-upload"
        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer
                   border-gray-300 dark:border-gray-600 hover:border-blue-500 transition"
      >
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Drag & drop your CSV here, or click to browse
        </span>
        <span className="text-xs text-gray-400 mt-1">
          Max size: {maxFileSizeMB}MB
        </span>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={(e) => handleUpload(e.target.files[0])}
          className="hidden"
        />
      </label>

      {/* Status */}
      {loading && (
        <p className="mt-4 text-blue-500 animate-pulse">
          Parsing CSV and analyzing structure…
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-500 font-medium">
          {error}
        </p>
      )}

      {fileName && !loading && !error && (
        <p className="mt-4 text-green-600 dark:text-green-400">
           {fileName} uploaded successfully
        </p>
      )}

      {/* Results */}
      {preview.length > 0 && (
        <>
          {/* Columns */}
          <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-700 dark:text-gray-200">
            Detected Columns
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {detectedColumns.map((col) => (
              <span
                key={col}
                className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
              >
                {col}
              </span>
            ))}
          </div>

          {/* Preview Table */}
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Data Preview (first {PREVIEW_LIMIT} rows)
          </h3>
          <div className="overflow-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b">
                <tr>
                  {Object.keys(preview[0]).map((col) => (
                    <th
                      key={col}
                      className="px-3 py-2 border text-left text-gray-700 dark:text-gray-200"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    {Object.values(row).map((value, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-3 py-2 border text-gray-800 dark:text-gray-100"
                      >
                        {value || "-"}
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
