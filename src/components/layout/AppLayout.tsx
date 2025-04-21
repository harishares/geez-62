
import { useEffect, useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { MobileNavigation } from "./MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
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
      {/* Background Image with mobile optimization */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <img 
          src="/lovable-uploads/796b2bf1-a44e-4399-8064-677f9a614493.png" 
          alt="Digital Network Background" 
          className="object-cover w-full h-full"
        />
      </div>
      
      {!isMobile && <AppSidebar profilePhoto={profilePhoto} />}
      
      <div className="flex-1 flex flex-col relative w-full">
        <AppHeader profilePhoto={profilePhoto} />
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        {isMobile && <MobileNavigation />}
      </div>
    </div>
  );
}
