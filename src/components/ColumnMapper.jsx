import React from "react";

export default function ColumnMapper({ columns, mapping, setMapping, onContinue }) {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Map Your Columns
      </h3>

      {/* Date Column */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Date Column
        </label>
        <select
          value={mapping.date || ""}
          onChange={(e) => setMapping({ ...mapping, date: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select date column</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      {/* Sales Column */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Sales Column
        </label>
        <select
          value={mapping.sales || ""}
          onChange={(e) => setMapping({ ...mapping, sales: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select sales column</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      {/* Continue Button */}
      <div className="text-right">
        <button
          onClick={onContinue}
          disabled={!mapping.date || !mapping.sales}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            mapping.date && mapping.sales
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
