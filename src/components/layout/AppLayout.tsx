
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { MobileNavigation } from "./MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatedBackground } from "./AnimatedBackground";

export function AppLayout() {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Get saved theme or use dark-purple as default
    const savedTheme = localStorage.getItem("app-theme") || "dark-purple";
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {!isMobile && <AppSidebar />}
      
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm">
          <Outlet />
        </main>
        
        {isMobile && <MobileNavigation />}
      </div>
    </div>
  );
}
