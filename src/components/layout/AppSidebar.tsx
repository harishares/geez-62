import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  ActivitySquare, 
  BookOpen,
  ChevronLeft, 
  ChevronRight, 
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
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
  isMobileSheet?: boolean;
  onNavigate?: () => void;
  profilePhoto?: string | null;
};

export function AppSidebar({ isMobileSheet = false, onNavigate, profilePhoto }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/settings");
  };

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
                      ? "bg-gradient-to-r from-purple-900/20 via-purple-800/20 to-purple-900/10 text-sidebar-accent-foreground font-medium"
                      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                  onClick={onNavigate}
                  style={{
                    boxShadow: isActive ? undefined : undefined,
                  }}
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
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border mt-auto">
        <a 
          href="#" 
          className={cn(
            "flex items-center gap-3 hover:opacity-80 transition-opacity", 
            collapsed && !isMobileSheet && "justify-center"
          )}
          onClick={handleProfileClick}
        >
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <Avatar className="h-full w-full">
              {profilePhoto ? (
                <AvatarImage src={profilePhoto} alt="Profile" />
              ) : (
                <AvatarFallback className="text-xs">JD</AvatarFallback>
              )}
            </Avatar>
          </div>
          {(!collapsed || isMobileSheet) && (
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          )}
        </a>
      </div>
    </aside>
  );
}
