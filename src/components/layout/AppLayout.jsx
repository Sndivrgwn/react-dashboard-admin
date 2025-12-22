import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-full bg-slate-950 text-white">
      <div className="flex h-full">
        <div
          className={[
            "h-full transition-[width,opacity] duration-300",
            isSidebarOpen ? "w-[260px] opacity-100" : "w-0 opacity-0",
          ].join(" ")}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <Navbar
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          />
          <main className="flex-1 overflow-y-auto px-6 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
