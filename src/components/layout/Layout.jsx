import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

/**
 * Centralized page title config (scalable & clean)
 */
const PAGE_TITLES = {
  "/": "Dashboard",
  "/upload": "Upload CSV",
  "/forecast": "Forecast",
  "/insights": "Insights",
};

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * Close sidebar on route change (mobile UX win)
   */
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  /**
   * Memoized page title (performance + clarity)
   */
  const pageTitle = useMemo(() => {
    return PAGE_TITLES[location.pathname] || "Application";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col min-h-screen md:ml-64 transition-all duration-300">
        {/* Header */}
        <Header
          title={pageTitle}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
