import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Animated illustration */}
      <div className="mb-8 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-40 w-40 text-blue-500 dark:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Error Title */}
      <h1 className="text-6xl font-extrabold mb-4 text-gray-800 dark:text-white">
        404
      </h1>

      {/* Error Message */}
      <p className="text-2xl mb-6 text-gray-600 dark:text-gray-300">
        Oops! The page you are looking for doesn’t exist.
      </p>

      {/* Action Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Go Back to Dashboard
      </Link>

      {/* Optional: small footer text */}
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        If you think this is an error, contact support.
      </p>
    </div>
  );
}
