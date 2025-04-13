
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ActivitySquare, 
  BarChart3, 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Settings, 
  Target
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
    name: "Activities",
    path: "/activities",
    icon: ActivitySquare
  },
  {
    name: "Progress",
    path: "/progress",
    icon: BarChart3
  },
  {
    name: "Goals",
    path: "/goals",
    icon: Target
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: CalendarDays
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings
  }
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar sticky top-0 transition-all duration-300 border-r border-border flex flex-col",
        collapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className={cn("flex items-center gap-2", collapsed && "hidden")}>
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <ActivitySquare className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="font-bold text-lg">Trackify</span>
        </div>
        <div className={cn("mx-auto", !collapsed && "hidden")}>
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <ActivitySquare className="text-primary-foreground h-5 w-5" />
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(prev => !prev)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="p-2 flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent transition-colors",
                  "text-sidebar-foreground hover:text-sidebar-accent-foreground",
                  window.location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                )}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <span className="font-medium text-xs">JD</span>
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
