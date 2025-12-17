import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUpload,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

export default function Sidebar({ isOpen }) {
  const links = [
    { name: "Dashboard", to: "/", icon: FaTachometerAlt },
    { name: "Upload CSV", to: "/upload", icon: FaUpload },
    { name: "Forecast", to: "/forecast", icon: FaChartLine },
    { name: "Insights", to: "/insights", icon: FaLightbulb },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-gray-900 text-white
      transition-all duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <span className="text-xl font-bold tracking-wide">
          {isOpen ? "SmartSales" : "SS"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-1 px-2">
        {links.map(({ name, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {/* Active Indicator */}
            <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-[.active]:opacity-100" />

            {/* Icon */}
            <Icon className="text-lg shrink-0" />

            {/* Label */}
            {isOpen && (
              <span className="text-sm font-medium whitespace-nowrap">
                {name}
              </span>
            )}

            {/* Tooltip (Collapsed Mode) */}
            {!isOpen && (
              <span
                className="absolute left-14 z-50 whitespace-nowrap rounded bg-black px-3 py-1
                text-xs opacity-0 group-hover:opacity-100 transition"
              >
                {name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
