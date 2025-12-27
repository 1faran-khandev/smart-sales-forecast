import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUpload, FaChartLine, FaLightbulb } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Dashboard", to: "/", icon: FaTachometerAlt },
  { label: "Upload CSV", to: "/upload", icon: FaUpload },
  { label: "Forecast", to: "/forecast", icon: FaChartLine },
  { label: "Insights", to: "/insights", icon: FaLightbulb },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-white
                 transition-transform duration-300 ease-in-out
                 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      aria-label="Sidebar Navigation"
    >
      {/* Logo */}
      <NavLink
        to="/"
        onClick={onClose}
        className="h-16 flex items-center justify-center border-b border-gray-800 hover:bg-gray-800 transition"
      >
        <span className="text-xl font-bold tracking-wide">
          Smart<span className="text-blue-500">Sales</span>
        </span>
      </NavLink>

      {/* Section */}
      <div className="mt-4 px-4 text-xs uppercase tracking-wider text-gray-500">Main</div>

      {/* Navigation */}
      <nav className="mt-2 px-3 flex flex-col gap-1" role="navigation">
        {NAV_LINKS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
               transition-colors duration-200 outline-none
               ${isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-800 hover:text-white"}
               focus:ring-2 focus:ring-blue-500`
            }
          >
            {/* Active indicator */}
            {({ isActive }) => (
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r
                  bg-blue-400 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
              />
            )}

            <Icon className="text-lg shrink-0" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
