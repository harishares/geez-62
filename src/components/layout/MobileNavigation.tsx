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
  Menu,
  X,
  Shield,
  Rocket,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const mobileNavItems = [
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
    name: "Startup Hub",
    path: "/startup-hub",
    icon: Rocket
  },
  {
    name: "Daily Tasks",
    path: "/daily-tasks",
    icon: ListChecks
  }
];

const mobileNavItemsSecondary = [
  {
    name: "LAW FU",
    path: "/law-fu",
    icon: Shield
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

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const NavItem = ({ item, onClick }: { item: typeof mobileNavItems[0], onClick?: () => void }) => {
    const isActive = location.pathname === item.path;
    
    const handleClick = (e: React.MouseEvent) => {
      if (onClick) onClick();
      
      // Show toast when clicking navigation items to indicate functionality
      toast.success(`Navigating to ${item.name}`);
    };
    
    return (
      <Link
        to={item.path}
        onClick={handleClick}
        className={cn(
          "flex flex-col items-center gap-1 p-2 rounded-md transition-all duration-200",
          "text-sidebar-foreground",
          isActive 
            ? "text-sidebar-accent-foreground font-medium" 
            : "text-sidebar-foreground/80 hover:text-sidebar-foreground"
        )}
      >
        <item.icon size={20} />
        <span className="text-xs">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Fixed bottom navigation for primary items */}
      <div className="fixed bottom-0 left-0 right-0 bg-sidebar border-t border-border z-20 flex justify-around py-1">
        {mobileNavItems.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2 rounded-md">
              <Menu size={20} />
              <span className="text-xs">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-sidebar h-auto rounded-t-xl">
            <div className="grid grid-cols-4 gap-1 py-3">
              {mobileNavItemsSecondary.map((item) => (
                <NavItem 
                  key={item.name} 
                  item={item} 
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Add padding to prevent content from being hidden under the navigation */}
      <div className="h-16 w-full md:hidden"></div>
    </>
  );
}
