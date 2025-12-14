import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6 mb-4">
      {/* Left: Page Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="text-gray-600 dark:text-gray-200 hover:text-blue-600 transition">
          <FaBell size={20} />
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="text-gray-600 dark:text-gray-200 hover:text-blue-600 transition"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* Profile Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 font-bold">
          A
        </div>
      </div>
    </header>
  );
}
