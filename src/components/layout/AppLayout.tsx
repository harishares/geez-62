
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { MobileNavigation } from "./MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppLayout() {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Get saved theme or use dark-purple as default
    const savedTheme = localStorage.getItem("app-theme") || "dark-purple";
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <img 
          src="/lovable-uploads/796b2bf1-a44e-4399-8064-677f9a614493.png" 
          alt="Digital Network Background" 
          className="object-cover w-full h-full"
        />
      </div>
      
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
