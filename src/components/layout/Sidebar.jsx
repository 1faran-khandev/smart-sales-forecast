import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUpload, FaChartLine, FaLightbulb } from "react-icons/fa";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", to: "/", icon: <FaTachometerAlt /> },
    { name: "Upload CSV", to: "/upload", icon: <FaUpload /> },
    { name: "Forecast", to: "/forecast", icon: <FaChartLine /> },
    { name: "Insights", to: "/insights", icon: <FaLightbulb /> },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition-all ${
      isActive ? "bg-gray-700 font-bold" : ""
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 fixed left-0 top-0 shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">SmartSales</h1>

      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
            <span className="text-lg">{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
