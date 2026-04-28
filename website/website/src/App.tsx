import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { PermissionProvider } from "@/context/PermissionContext";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import BusDetail from "./pages/BusDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
const queryClient = new QueryClient();

const App = () => (
  <AccessibilityProvider>
    {/* TODO: Replace role="user" with the role from real auth once login is implemented (not my job so enjoy -oli) */}
    <PermissionProvider role="user">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/bus/:id" element={<BusDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </PermissionProvider>
  </AccessibilityProvider>
);

export default App;
