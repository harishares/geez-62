
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ActivitySquare, 
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
  Users,
  TrendingUp
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
    name: "Progress",
    path: "/progress",
    icon: TrendingUp
  }
];

const mobileNavItemsSecondary = [
  {
    name: "LAW FU",
    path: "/law-fu",
    icon: Shield
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

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const NavItem = ({ item, onClick }: { item: typeof mobileNavItems[0], onClick?: () => void }) => {
    const isActive = location.pathname === item.path;
    
    const handleClick = (e: React.MouseEvent) => {
      if (onClick) onClick();
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
            ? "bg-gradient-to-t from-purple-900/40 via-purple-900/10 to-transparent text-sidebar-accent-foreground font-medium" 
            : "text-sidebar-foreground/80 hover:text-sidebar-foreground"
        )}
        style={{
          boxShadow: isActive ? undefined : undefined,
        }}
      >
        <item.icon size={20} />
        <span className="text-xs">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
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
      
      <div className="h-16 w-full md:hidden"></div>
    </>
  );
}
