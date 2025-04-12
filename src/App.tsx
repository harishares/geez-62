
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
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  
  // Check login status on app load
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
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
            {/* Landing page redirect */}
            <Route path="/welcome" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Index />} />
            
            {/* Root path - redirect to dashboard if logged in, otherwise to login page */}
            <Route path="/" element={
              isLoggedIn ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
            } />
            
            {/* Login route */}
            <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
            
            {/* Dashboard as a separate route for direct navigation */}
            <Route path="/dashboard" element={
              isLoggedIn ? (
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            
            {/* Protected routes - require login */}
            <Route path="/smart-tools" element={
              isLoggedIn ? (
                <AppLayout>
                  <SmartTools />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/progress" element={
              isLoggedIn ? (
                <AppLayout>
                  <Progress />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/rank" element={
              isLoggedIn ? (
                <AppLayout>
                  <Rank />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/daily-tasks" element={
              isLoggedIn ? (
                <AppLayout>
                  <DailyTasks />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/events" element={
              isLoggedIn ? (
                <AppLayout>
                  <Events />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/learning" element={
              isLoggedIn ? (
                <AppLayout>
                  <Learning />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/networking" element={
              isLoggedIn ? (
                <AppLayout>
                  <Networking />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/earn" element={
              isLoggedIn ? (
                <AppLayout>
                  <Earn />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/settings" element={
              isLoggedIn ? (
                <AppLayout>
                  <Settings />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
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
