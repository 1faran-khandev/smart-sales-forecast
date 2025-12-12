import React, { useState } from "react";
import Papa from "papaparse";

const CSVUploader = ({ onColumnsDetected }) => {
  const [preview, setPreview] = useState([]);
  const [detectedColumns, setDetectedColumns] = useState([]);

  // --- Detect Columns Function ---
  const detectColumns = (rows) => {
    if (!rows || rows.length === 0) return [];

    return Object.keys(rows[0]);
  };

  // --- Handle CSV Upload ---
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        setPreview(rows);

        // ⬇️ NEW UPDATED LOGIC YOU ASKED FOR
        const detected = detectColumns(rows);
        setDetectedColumns(detected);

        if (onColumnsDetected) {
          onColumnsDetected(detected);
        }
      },
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-3">Upload CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
        className="mb-4"
      />

      {preview.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">CSV Preview (10 rows)</h3>

          <div className="overflow-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {Object.keys(preview[0]).map((col, index) => (
                    <th key={index} className="px-3 py-2 border">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.slice(0, 10).map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex} className="px-3 py-2 border">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-4">Detected Columns</h3>
          <ul className="list-disc ml-6">
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
