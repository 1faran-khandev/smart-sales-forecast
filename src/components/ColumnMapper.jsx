import React from "react";

export default function ColumnMapper({
  columns,
  mapping,
  setMapping,
  onContinue,
}) {
  return (
    <div className="mt-6 bg-white border rounded p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Map Your Columns</h3>

      {/* Date Column */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Date Column
        </label>
        <select
          value={mapping.date || ""}
          onChange={(e) =>
            setMapping({ ...mapping, date: e.target.value })
          }
          className="w-full border p-2 rounded"
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
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Sales Column
        </label>
        <select
          value={mapping.sales || ""}
          onChange={(e) =>
            setMapping({ ...mapping, sales: e.target.value })
          }
          className="w-full border p-2 rounded"
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
          className={`px-4 py-2 rounded text-white ${
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
