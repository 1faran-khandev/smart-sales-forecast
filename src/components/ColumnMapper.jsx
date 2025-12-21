import React from "react";

const COLUMN_TYPES = [
  { key: "date", label: "Date Column" },
  { key: "sales", label: "Sales Column" },
];

export default function ColumnMapper({ columns, mapping, setMapping, onContinue }) {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
        Map Your Columns
      </h3>

      {COLUMN_TYPES.map(({ key, label }) => (
        <div className="mb-5" key={key}>
          <label htmlFor={key} className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <select
            id={key}
            value={mapping[key] || ""}
            onChange={(e) => setMapping({ ...mapping, [key]: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select {key} column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      ))}

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
