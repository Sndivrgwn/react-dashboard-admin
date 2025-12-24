import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "AI Assistant", to: "/assistant" },
  { label: "E-commerce", to: "/ecommerce" },
  { label: "Calendar", to: "/calendar" },
  { label: "User", to: "/profile" },
  { label: "Tasks", to: "/tasks" },
  { label: "Forms", to: "/forms" },
  { label: "Pages", to: "/pages" },
];

const tableItems = [
  { label: "Basic Tables", to: "/tables/basic" },
  { label: "Data Tables", to: "/tables/data" },
];

const supportItems = [
  { label: "Chat", to: "/" },
  { label: "Support Ticket", to: "/" },
  { label: "Email", to: "/" },
];

export default function Sidebar({ isOpen = true }) {
  const location = useLocation();
  const isTablesActive = location.pathname.startsWith("/tables");
  const [isTablesOpen, setIsTablesOpen] = useState(isTablesActive);

  useEffect(() => {
    if (isTablesActive) {
      setIsTablesOpen(true);
    }
  }, [isTablesActive]);

  return (
    <aside
      className={[
        "flex h-full w-full flex-col border-r border-white/10 bg-slate-950 px-5 py-6 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-900">
          <span className="text-sm font-semibold">TA</span>
        </div>
        <div>
          <p className="text-base font-semibold text-white">TailAdmin</p>
          <p className="text-xs text-white/50">Workspace</p>
        </div>
      </div>

      <div className="mt-8">
        <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Menu
        </p>
        <nav className="mt-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end
              className={({ isActive }) =>
                [
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white",
                ].join(" ")
              }
            >
              <span>{item.label}</span>
              {item.label === "AI Assistant" || item.label === "E-commerce" ? (
                <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  NEW
                </span>
              ) : null}
            </NavLink>
          ))}

          <div>
            <button
              type="button"
              onClick={() => setIsTablesOpen((prev) => !prev)}
              className={[
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                isTablesActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              <span>Tables</span>
              <span
                className={[
                  "flex h-6 w-6 items-center justify-center rounded-full transition",
                  isTablesOpen ? "text-white" : "text-white/60",
                ].join(" ")}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={[
                    "h-4 w-4 transition-transform",
                    isTablesOpen ? "rotate-0" : "rotate-180",
                  ].join(" ")}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
            {isTablesOpen ? (
              <div className="mt-2 space-y-1 pl-3">
                {tableItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "flex items-center rounded-xl px-3 py-2 text-sm transition",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/10 hover:text-white",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ) : null}
          </div>
        </nav>
      </div>

      <div className="mt-8">
        <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Support
        </p>
        <nav className="mt-4 space-y-1">
          {supportItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>{item.label}</span>
              {item.label === "Support Ticket" ? (
                <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  NEW
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
        <p className="font-semibold text-white/80">Need help?</p>
        <p className="mt-1">support@tailadmin.dev</p>
      </div>
    </aside>
  );
}
