
import { useState, useEffect } from "react";
import { Bell, Search, Palette, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { AppSidebar } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useCapacitor } from "@/hooks/use-capacitor";

type AppHeaderProps = {
  profilePhoto?: string | null;
};

export function AppHeader({ profilePhoto }: AppHeaderProps) {
  const [theme, setTheme] = useState("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { showNotification } = useCapacitor();

  useEffect(() => {
    // Get saved theme
    const savedTheme = localStorage.getItem("app-theme") || "dark-purple";
    setTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("app-theme", newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  const navigateToSettings = () => {
    navigate("/settings");
  };

  const handleNotification = async () => {
    toast.success("Notification sent!");
    await showNotification("GEN Z CLG", "You have a new notification!");
  };

  return (
    <header className="w-full border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between h-16 px-4 md:container md:px-6">
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-sidebar">
              <div className="h-full overflow-y-auto">
                <AppSidebar isMobileSheet={true} onNavigate={() => setSidebarOpen(false)} profilePhoto={profilePhoto} />
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        <h1 className="text-lg font-semibold md:text-xl">GEN Z CLG</h1>
        
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search for desktop */}
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px] bg-background/50"
            />
          </div>
          
          {/* Search for mobile */}
          {isMobile && (
            <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto pt-12">
                <div className="relative w-full mb-4">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    autoFocus
                    type="search"
                    placeholder="Search..."
                    className="pl-9 w-full"
                  />
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Palette className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-border">
              <DropdownMenuItem onClick={() => handleThemeChange("default")}>
                Default Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("dark-purple")}>
                Dark Purple
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("blue")}>
                Blue Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("green")}>
                Green Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("orange")}>
                Orange Theme
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={handleNotification}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={navigateToSettings}
          >
            <Avatar className="h-8 w-8">
              {profilePhoto ? (
                <AvatarImage src={profilePhoto} alt="Profile" />
              ) : (
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
