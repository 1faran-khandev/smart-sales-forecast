import React from "react";

// Define the columns to map
const COLUMN_TYPES = [
  { key: "date", label: "Date Column", hint: "Used for time-based analysis" },
  { key: "sales", label: "Sales Column", hint: "Numeric values for forecasting" },
];

export default function ColumnMapper({
  columns = [],
  mapping = {},
  setMapping,
  onContinue,
}) {
  // Validation states
  const isValid = mapping.date && mapping.sales;
  const isDuplicate = mapping.date && mapping.sales && mapping.date === mapping.sales;

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Step 2 of 3
        </p>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Map Your Columns
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Tell us which columns represent dates and sales values
        </p>
      </div>

      {/* Mapping Fields */}
      {COLUMN_TYPES.map(({ key, label, hint }) => (
        <div className="mb-5" key={key}>
          <label
            htmlFor={key}
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{hint}</p>

          <select
            id={key}
            value={mapping[key] || ""}
            onChange={(e) => setMapping({ ...mapping, [key]: e.target.value })}
            aria-invalid={isDuplicate || !isValid}
            className="w-full border border-gray-300 dark:border-gray-600 p-2.5 rounded-lg
                       dark:bg-gray-700 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select column</option>
            {columns.map((col) => (
              <option
                key={col}
                value={col}
                disabled={
                  Object.values(mapping).includes(col) && mapping[key] !== col
                }
              >
                {col}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Validation Messages */}
      {isDuplicate && (
        <p className="text-sm text-red-500 mb-4">
          Date and Sales columns must be different.
        </p>
      )}
      {!isValid && !isDuplicate && (
        <p className="text-sm text-red-500 mb-4">
          Please select both Date and Sales columns.
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-3">
        <button
          onClick={() => setMapping({})}
          type="button"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Reset
        </button>

        <button
          onClick={onContinue}
          disabled={!isValid || isDuplicate}
          className={`px-6 py-2 rounded-lg text-white font-medium transition
            ${isValid && !isDuplicate
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
            }
          `}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
