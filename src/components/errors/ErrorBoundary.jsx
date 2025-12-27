import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production, send this to Sentry / LogRocket
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">
              Something went wrong 😕
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              An unexpected error occurred. You can try refreshing the page or
              go back and continue.
            </p>

            {/* Optional: show error message in dev */}
            {process.env.NODE_ENV === "development" && (
              <pre className="mt-4 max-h-40 overflow-auto rounded bg-gray-100 p-3 text-xs text-red-600">
                {this.state.error?.message}
              </pre>
            )}

            <div className="mt-5 flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 rounded bg-black px-4 py-2 text-sm text-white hover:opacity-90"
              >
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className="flex-1 rounded border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
