
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ActivitySquare, 
  BarChart3, 
  BookOpen,
  Home, 
  Network,
  Settings, 
  Sparkles,
  Target,
  Award,
  ListChecks,
  Shield,
  Rocket,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: Home
  },
  {
    name: "Smart Tools",
    path: "/smart-tools",
    icon: Sparkles
  },
  {
    name: "LAW F U",
    path: "/law-fu",
    icon: Shield
  },
  {
    name: "Startup Hub",
    path: "/startup-hub",
    icon: Rocket
  },
  {
    name: "Progress",
    path: "/progress",
    icon: BarChart3
  },
  {
    name: "Rank",
    path: "/rank",
    icon: Award
  },
  {
    name: "Daily Tasks",
    path: "/daily-tasks",
    icon: ListChecks
  },
  {
    name: "Events",
    path: "/events",
    icon: ActivitySquare
  },
  {
    name: "Learning",
    path: "/learning",
    icon: BookOpen
  },
  {
    name: "Mentorship",
    path: "/mentorship",
    icon: Users
  },
  {
    name: "Networking",
    path: "/networking",
    icon: Network
  },
  {
    name: "Earn",
    path: "/earn",
    icon: Target
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings
  }
];

type AppSidebarProps = {
  profilePhoto?: string | null;
  isMobileSheet?: boolean;
  onNavigate?: () => void;
};

export function AppSidebar({ profilePhoto, isMobileSheet, onNavigate }: AppSidebarProps) {
  const location = useLocation();
  
  const handleNavigation = () => {
    // Call onNavigate if provided (for mobile sheet closing)
    if (onNavigate) {
      onNavigate();
    }
  };
  
  return (
    <aside className="h-screen bg-purple-900/90 w-64 fixed left-0 top-0 border-r border-purple-800/30">
      <div className="p-4 border-b border-purple-800/30">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-purple-600 flex items-center justify-center">
            <ActivitySquare className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-lg text-white">GEN Z CLG</span>
        </div>
      </div>
      
      <nav className="p-2 overflow-y-auto h-[calc(100vh-4rem)]">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                    "text-gray-300 hover:text-white group relative overflow-hidden",
                    isActive 
                      ? "bg-purple-800/50 text-white font-medium"
                      : "hover:bg-purple-800/30"
                  )}
                  onClick={handleNavigation}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
