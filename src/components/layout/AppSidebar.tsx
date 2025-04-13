
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ActivitySquare, 
  BarChart3, 
  BookOpen,
  ChevronLeft, 
  ChevronRight, 
  GraduationCap,
  Home, 
  Network,
  Settings, 
  Sparkles,
  Target,
  Award,
  ListChecks
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  isMobileSheet?: boolean;
  onNavigate?: () => void;
};

export function AppSidebar({ isMobileSheet = false, onNavigate }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar sticky top-0 transition-all duration-300 border-r border-border flex flex-col",
        isMobileSheet ? "w-full border-r-0" : (collapsed ? "w-[80px]" : "w-[240px]")
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className={cn("flex items-center gap-2", collapsed && !isMobileSheet && "hidden")}>
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <ActivitySquare className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="font-bold text-lg">GEN Z CLG</span>
        </div>
        <div className={cn("mx-auto", (!collapsed || isMobileSheet) && "hidden")}>
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <ActivitySquare className="text-primary-foreground h-5 w-5" />
          </div>
        </div>
        {!isMobileSheet && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(prev => !prev)}
            className="ml-auto hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground transition-all"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}
      </div>
      
      <nav className="p-2 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                    "text-sidebar-foreground group relative overflow-hidden",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                  onClick={onNavigate}
                >
                  <item.icon size={20} className={cn(
                    "flex-shrink-0 transition-transform duration-300",
                    !isActive && "group-hover:scale-110"
                  )} />
                  {(!collapsed || isMobileSheet) && (
                    <span className={cn(
                      "transition-transform duration-300",
                      !isActive && "group-hover:translate-x-1"
                    )}>
                      {item.name}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border mt-auto">
        <Link to="/login" className={cn("flex items-center gap-3 hover:opacity-80 transition-opacity", collapsed && !isMobileSheet && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <span className="font-medium text-xs">JD</span>
          </div>
          {(!collapsed || isMobileSheet) && (
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
