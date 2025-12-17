import {
  FaBell,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Header({
  title = "Dashboard",
  onToggleSidebar,
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3);

  // Load theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
        >
          <FaBars size={18} />
        </button>

        {/* Page Title */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
        >
          <FaBell size={20} />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-2xl text-gray-600 dark:text-gray-200" />
          <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
