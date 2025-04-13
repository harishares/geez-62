
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  useEffect(() => {
    // Get saved theme or use default
    const savedTheme = localStorage.getItem("app-theme") || "default";
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
