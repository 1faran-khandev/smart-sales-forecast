import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ErrorBoundary } from "react-error-boundary";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/upload": "Upload CSV",
  "/forecast": "Forecast",
  "/insights": "Insights",
};

function LayoutErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-6 text-center text-red-500 space-y-4">
      <h2 className="text-lg font-bold">Oops! Something went wrong.</h2>
      <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded break-words">
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const pageTitle = useMemo(
    () => PAGE_TITLES[location.pathname] || "Application",
    [location.pathname]
  );

  useEffect(() => {
    document.title = `${pageTitle} | Smart Forecast`;
  }, [pageTitle]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col min-h-screen transition-all duration-300 md:ml-64">
        {/* Header */}
        <Header
          title={pageTitle}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Page Content */}
        <main role="main" className="flex-1 p-6 focus:outline-none">
          <ErrorBoundary FallbackComponent={LayoutErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
