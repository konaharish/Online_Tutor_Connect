
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import BecomeTutor from "./pages/BecomeTutor";
import BecomeStudent from "./pages/BecomeStudent";
import Auth from "./pages/Auth";
import Bookings from "./pages/Bookings";
import TeacherNotFound from "./pages/TeacherNotFound";
import NotFound from "./pages/NotFound";
import { AuthGuard } from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/teacher-not-found" element={<TeacherNotFound />} />
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } 
            />
            <Route 
              path="/bookings" 
              element={
                <AuthGuard>
                  <Bookings />
                </AuthGuard>
              } 
            />
            <Route 
              path="/become-tutor" 
              element={
                <AuthGuard>
                  <BecomeTutor />
                </AuthGuard>
              } 
            />
            <Route 
              path="/become-student" 
              element={
                <AuthGuard>
                  <BecomeStudent />
                </AuthGuard>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
