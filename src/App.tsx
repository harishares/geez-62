
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";

const App = () => {
  useEffect(() => {
    localStorage.setItem("userLoggedIn", "true");
    
    // Set dark-purple theme by default
    document.documentElement.dataset.theme = "dark-purple";
    localStorage.setItem("app-theme", "dark-purple");
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="flex h-screen bg-[#1a1b23]">
        {/* Left Sidebar */}
        <div className="w-60 bg-[#1a1b23] border-r border-white/10">
          <div className="flex items-center gap-2 px-4 h-14 border-b border-white/10">
            <div className="h-8 w-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
              <span className="text-purple-400 font-bold">GZ</span>
            </div>
            <span className="text-white font-semibold">GEN Z CLG</span>
          </div>
          
          <nav className="py-4">
            <ul className="space-y-1 px-2">
              {[
                { name: "Dashboard", path: "/dashboard", icon: "✦" },
                { name: "Smart Tools", path: "/smart-tools", icon: "⚡" },
                { name: "LAW F U", path: "/law-fu", icon: "⚖️" },
                { name: "Startup Hub", path: "/startup-hub", icon: "🚀" },
                { name: "Progress", path: "/progress", icon: "📊" },
                { name: "Rank", path: "/rank", icon: "🏆" },
                { name: "Daily Tasks", path: "/daily-tasks", icon: "✓" },
                { name: "Events", path: "/events", icon: "📅" },
                { name: "Learning", path: "/learning", icon: "📚" },
                { name: "Mentorship", path: "/mentorship", icon: "👥" },
                { name: "Networking", path: "/networking", icon: "🔗" },
                { name: "Earn", path: "/earn", icon: "💰" }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.path}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                <span className="text-purple-400 font-medium">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-gray-400 truncate">john@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Header */}
          <header className="h-14 border-b border-white/10 bg-[#1a1b23]/95 backdrop-blur-sm flex items-center justify-between px-6">
            <h1 className="text-white text-lg font-medium">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                🔍
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                🔔
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                ⚙️
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto bg-gradient-to-b from-[#1a1b23] to-[#12131a] p-6">
            <div className="max-w-7xl mx-auto">
              <Dashboard />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default App;
