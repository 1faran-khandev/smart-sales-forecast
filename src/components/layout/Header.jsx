import {
  FaBell,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Header({ title, onToggleSidebar }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationCount] = useState(3);

  // Sync theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="md:hidden text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
        >
          <FaBars size={18} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
        >
          <FaBell size={20} />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <FaUserCircle className="text-2xl text-gray-600 dark:text-gray-200" />
          <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
