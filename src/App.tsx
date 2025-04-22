
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import SmartTools from "./pages/SmartTools";
import LawFU from "./pages/LawFU";
import StartupHub from "./pages/StartupHub";
import Progress from "./pages/Progress";
import Rank from "./pages/Rank";
import DailyTasks from "./pages/DailyTasks";
import Events from "./pages/Events";
import Learning from "./pages/Learning";
import Mentorship from "./pages/Mentorship";
import Networking from "./pages/Networking";
import Earn from "./pages/Earn";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const App = () => {
  useEffect(() => {
    localStorage.setItem("userLoggedIn", "true");
    
    // Get saved theme or use dark-purple as default
    const savedTheme = localStorage.getItem("app-theme") || "dark-purple";
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  return (
    <Router>
      <TooltipProvider>
        <AppLayout>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/smart-tools" element={<SmartTools />} />
            <Route path="/law-fu" element={<LawFU />} />
            <Route path="/startup-hub" element={<StartupHub />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/daily-tasks" element={<DailyTasks />} />
            <Route path="/events" element={<Events />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </TooltipProvider>
    </Router>
  );
};

export default App;
