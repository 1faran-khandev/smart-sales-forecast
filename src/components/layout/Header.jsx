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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationCount = 3;

  // Sync theme
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white dark:bg-gray-800 shadow-sm px-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
          aria-label="Toggle sidebar"
        >
          <FaBars size={18} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((p) => !p)}
            className="relative text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
            aria-label="Notifications"
          >
            <FaBell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-3 text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                Notifications
              </p>
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-300">
                   New forecast generated
                </li>
                <li className="text-gray-600 dark:text-gray-300">
                   File uploaded successfully
                </li>
                <li className="text-gray-600 dark:text-gray-300">
                   Data variance detected
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
          aria-label="Toggle theme"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile((p) => !p)}
            className="flex items-center gap-2"
          >
            <FaUserCircle className="text-2xl text-gray-600 dark:text-gray-200" />
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
              Admin
            </span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-sm">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                Settings
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
