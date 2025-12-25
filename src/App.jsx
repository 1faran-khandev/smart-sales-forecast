import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/layout/Layout";
import PageLoader from "./components/ui/PageLoader";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import { ROUTES } from "./routes/routes";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Upload = lazy(() => import("./pages/Upload"));
const Forecast = lazy(() => import("./pages/Forecast"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path={ROUTES.UPLOAD.slice(1)} element={<Upload />} />
            <Route path={ROUTES.FORECAST.slice(1)} element={<Forecast />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
