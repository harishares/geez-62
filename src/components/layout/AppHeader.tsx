
import { useState } from "react";
import { Bell, Search, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function AppHeader() {
  const [theme, setTheme] = useState("default");

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("app-theme", newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  return (
    <header className="w-full border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <h1 className="text-lg font-semibold md:text-xl">GEN Z CLG</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px] bg-background/50"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Palette className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
          </Button>
        </div>
      </div>
    </header>
  );
}
