import { useState } from "react";
import Papa from "papaparse";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    Papa.parse(selectedFile, {
      header: true,
      preview: 10, // first 10 rows
      complete: (results) => {
        setPreview(results.data);
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Upload Sales CSV</h1>

      <div className="border-2 border-dashed border-gray-400 rounded-xl p-10 flex flex-col items-center justify-center bg-white shadow-sm mb-8">
        <input
          id="csv"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="csv"
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Select CSV File
        </label>

        {file && (
          <p className="mt-4 text-gray-600">
            <span className="font-semibold">Selected:</span> {file.name}
          </p>
        )}
      </div>

      {/* CSV Preview Table */}
      {preview.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Preview (First 10 Rows)</h2>

          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                {Object.keys(preview[0]).map((key) => (
                  <th
                    key={key}
                    className="border px-3 py-2 bg-gray-100 font-medium text-sm"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {preview.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="border px-3 py-2 text-sm">
                      {value || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
