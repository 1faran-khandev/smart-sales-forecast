import { useState } from "react";

export default function Upload() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Upload Sales CSV</h1>

      <div className="max-w-xl p-6 bg-white rounded-xl shadow">
        <label
          htmlFor="csv"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-10 rounded-xl cursor-pointer hover:bg-gray-100 transition"
        >
          <span className="text-lg text-gray-600">Click to Upload CSV</span>
          <span className="text-sm text-gray-400 mt-2">
            {fileName ? fileName : "No file selected"}
          </span>
        </label>

        <input
          type="file"
          id="csv"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />

        {fileName && (
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Upload & Process
          </button>
        )}
      </div>
    </div>
  );
}
