
import { useState, useEffect } from "react";
import { Bell, Search, Palette, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCapacitor } from "@/hooks/use-capacitor";

export function Header() {
  const [theme, setTheme] = useState("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { showNotification } = useCapacitor();

  useEffect(() => {
    // Get saved theme
    const savedTheme = localStorage.getItem("app-theme") || "dark-purple";
    setTheme(savedTheme);
    
    // Load profile photo from localStorage if available
    const savedPhoto = localStorage.getItem("userProfilePhoto");
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("app-theme", newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  const handleNotification = async () => {
    toast.success("Notification sent!");
    await showNotification("GEN Z CLG", "You have a new notification!");
  };

  const handleLogout = () => {
    toast.success("Session refreshed");
  };

  return (
    <header className="w-full border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between h-16 px-4 md:container md:px-6">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-sidebar">
                <div className="h-full overflow-y-auto">
                  <NavMenu isMobile={true} onClose={() => setSidebarOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          <h1 className="text-lg font-semibold md:text-xl">GEN Z CLG</h1>
        </div>
        
        {!isMobile && <NavMenu isMobile={false} />}
        
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
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
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => window.location.href = "/settings"}>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Refresh Session</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function NavMenu({ isMobile, onClose }: { isMobile: boolean; onClose?: () => void }) {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Smart Tools", path: "/smart-tools" },
    { name: "Progress", path: "/progress" },
    { name: "Rank", path: "/rank" },
    { name: "Daily Tasks", path: "/daily-tasks" },
    { name: "Events", path: "/events" },
    { name: "Learning", path: "/learning" }
  ];
  
  return (
    <nav className={isMobile ? "p-4" : "hidden md:flex items-center justify-center"}>
      <ul className={isMobile ? "space-y-2" : "flex items-center gap-4"}>
        {navItems.map((item) => (
          <li key={item.name}>
            <a 
              href={item.path}
              className={`${isMobile ? 'block py-2 px-3' : 'px-3 py-2'} rounded-md hover:bg-primary/10 text-foreground transition-colors`}
              onClick={onClose}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
