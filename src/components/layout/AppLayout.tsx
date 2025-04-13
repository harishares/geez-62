
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  useEffect(() => {
    // Get saved theme or use dark-purple as default
    const savedTheme = localStorage.getItem("app-theme") || "dark-purple";
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 bg-[radial-gradient(ellipse_at_top,rgba(95,75,139,0.2),transparent)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
