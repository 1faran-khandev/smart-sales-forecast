export default function ChartSkeleton() {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow animate-pulse"
      role="status"
      aria-busy="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Chart Area */}
      <div className="flex gap-4">
        {/* Y-axis */}
        <div className="flex flex-col justify-between h-40">
          <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Lines */}
        <div className="flex-1 space-y-4">
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-11/12 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-10/12 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-9/12 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}
