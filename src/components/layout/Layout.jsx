import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
