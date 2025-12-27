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
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ErrorBoundary>
                <Dashboard />
              </ErrorBoundary>
            }
          />

          <Route
            path={ROUTES.UPLOAD}
            element={
              <ErrorBoundary>
                <Upload />
              </ErrorBoundary>
            }
          />

          <Route
            path={ROUTES.FORECAST}
            element={
              <ErrorBoundary>
                <Forecast />
              </ErrorBoundary>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
