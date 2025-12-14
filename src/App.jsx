import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound"; 

export default function App() {
  return (
    <Routes>
      {/* All pages using Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />       {/* Default page */}
        <Route path="upload" element={<Upload />} /> {/* /upload page */}
      </Route>

      {/* Fallback route for unknown paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
