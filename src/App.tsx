import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PackageDetails from '@/components/PackageDetails';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Packages from './pages/Packages'; // <-- Add Packages page
import AboutUs from "./components/About";
import Contact from "./components/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/packages" element={<Packages />} />           {/* Packages list */}
          <Route path="/packages/:id" element={<PackageDetails />} /> {/* Package details */}
          <Route path="*" element={<NotFound />} />                  {/* Catch-all must be last */}
           <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
