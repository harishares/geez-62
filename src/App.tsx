
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
import Rank from "./pages/Rank";
import DailyTasks from "./pages/DailyTasks";
import { useEffect } from "react";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  // Set logged in state on app load to ensure all protected routes are accessible
  useEffect(() => {
    localStorage.setItem("userLoggedIn", "true");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Welcome landing page */}
            <Route path="/welcome" element={<Index />} />
            
            {/* Root path - redirect straight to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            
            {/* Dashboard as a separate route */}
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            
            {/* All other routes within the app layout */}
            <Route element={<AppLayout />}>
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
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
