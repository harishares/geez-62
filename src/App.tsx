
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Events from "./pages/Events";
import Learning from "./pages/Learning";
import Networking from "./pages/Networking";
import Earn from "./pages/Earn";
import SmartTools from "./pages/SmartTools";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Rank from "./pages/Rank";
import DailyTasks from "./pages/DailyTasks";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  
  // Check login status on app load
  useEffect(() => {
    const checkLoginStatus = () => {
      const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
      setIsLoggedIn(userLoggedIn);
    };
    
    // Check immediately
    checkLoginStatus();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Show nothing until we check login status
  if (isLoggedIn === null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
            <Route element={isLoggedIn ? <AppLayout /> : <Navigate to="/login" replace />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/smart-tools" element={<SmartTools />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/rank" element={<Rank />} />
              <Route path="/daily-tasks" element={<DailyTasks />} />
              <Route path="/events" element={<Events />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/networking" element={<Networking />} />
              <Route path="/earn" element={<Earn />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
