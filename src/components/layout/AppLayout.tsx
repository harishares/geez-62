
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { MobileNavigation } from "./MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { TaskTimer } from "@/components/ui/task-timer";

export function AppLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [currentTask, setCurrentTask] = useState("Current Task");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    // Get saved theme or use dark-purple as default
    const savedTheme = localStorage.getItem("app-theme") || "dark-purple";
    document.documentElement.dataset.theme = savedTheme;
    
    // Load profile photo from localStorage if available
    const savedPhoto = localStorage.getItem("userProfilePhoto");
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
    
    // Update task name based on current route
    const pathSegments = location.pathname.split("/");
    const currentPath = pathSegments[1] || "dashboard";
    const formattedPath = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
    setCurrentTask(formattedPath === "Dashboard" ? "General Work" : `${formattedPath} Task`);
  }, [location.pathname]);

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
      
      {!isMobile && <AppSidebar profilePhoto={profilePhoto} />}
      
      <div className="flex-1 flex flex-col relative">
        <AppHeader profilePhoto={profilePhoto} />
        <main className="flex-1 p-4 md:p-6 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm">
          <Outlet />
        </main>
        
        {isMobile && <MobileNavigation />}
        
        {/* TaskTimer - Now in a relative container so it can be dragged within bounds */}
        <TaskTimer taskName={currentTask} />
      </div>
    </div>
  );
}
