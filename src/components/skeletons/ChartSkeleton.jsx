export default function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow animate-pulse">
      {/* Title */}
      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6" />

      {/* Chart Lines */}
      <div className="space-y-4">
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-11/12 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-10/12 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-9/12 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
