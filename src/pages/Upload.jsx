import React, { useState } from "react";
import CSVUploader from "../components/CSVUploader";
import { FaCheckCircle } from "react-icons/fa";

export default function Upload() {
  const [columns, setColumns] = useState([]);

  const handleColumnsDetected = (detected) => {
    setColumns(detected);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Upload CSV
      </h1>

      {/* Page Description */}
      <p className="text-gray-600 dark:text-gray-300">
        Upload your CSV file to analyze sales, forecasts, or inventory data. 
        Preview the data and detected columns before processing.
      </p>

      {/* CSV Uploader */}
      <div className="max-w-4xl">
        <CSVUploader onColumnsDetected={handleColumnsDetected} />
      </div>

      {/* Detected Columns Summary */}
      {columns.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow transform transition-all duration-300 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            Detected Columns ({columns.length})
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
            {columns.map((col, idx) => (
              <li key={idx}>{col}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
