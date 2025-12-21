import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUpload,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

const NAV_LINKS = [
  { label: "Dashboard", to: "/", icon: FaTachometerAlt },
  { label: "Upload CSV", to: "/upload", icon: FaUpload },
  { label: "Forecast", to: "/forecast", icon: FaChartLine },
  { label: "Insights", to: "/insights", icon: FaLightbulb },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-screen bg-gray-900 text-white
        transition-transform duration-300 ease-in-out
        w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      aria-label="Sidebar Navigation"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <span className="text-xl font-bold tracking-wide">
          Smart<span className="text-blue-500">Sales</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="mt-4 px-3 flex flex-col gap-1">
        {NAV_LINKS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <Icon className="text-lg shrink-0" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
