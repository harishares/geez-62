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
import LawFU from "./pages/LawFU";

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
            
            {/* Dashboard route */}
            <Route path="/dashboard" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            
            {/* All other routes within the app layout */}
            <Route path="/smart-tools" element={
              <AppLayout>
                <SmartTools />
              </AppLayout>
            } />
            <Route path="/progress" element={
              <AppLayout>
                <Progress />
              </AppLayout>
            } />
            <Route path="/rank" element={
              <AppLayout>
                <Rank />
              </AppLayout>
            } />
            <Route path="/daily-tasks" element={
              <AppLayout>
                <DailyTasks />
              </AppLayout>
            } />
            <Route path="/events" element={
              <AppLayout>
                <Events />
              </AppLayout>
            } />
            <Route path="/learning" element={
              <AppLayout>
                <LawFU />
              </AppLayout>
            } />
            <Route path="/networking" element={
              <AppLayout>
                <Networking />
              </AppLayout>
            } />
            <Route path="/earn" element={
              <AppLayout>
                <Earn />
              </AppLayout>
            } />
            <Route path="/settings" element={
              <AppLayout>
                <Settings />
              </AppLayout>
            } />
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
