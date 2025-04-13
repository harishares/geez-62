
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppHeader() {
  return (
    <header className="w-full border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <h1 className="text-lg font-semibold md:text-xl">Performance Tracker</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px] bg-background"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
          </Button>
        </div>
      </div>
    </header>
  );
}
