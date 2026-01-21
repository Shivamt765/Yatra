import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PackageDetails from "@/components/PackageDetails";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Packages from './pages/Packages';
import AboutUs from "./components/About";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import ContactAdmin from './pages/ContactAdmin';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Packages Route */}
          <Route path="/packages" element={<Packages />}>
            <Route path=":category" element={<Packages />} />
            <Route path=":category/:country" element={<Packages />} />
          </Route>

          {/* Package Details */}
          <Route path="/packages/details/:slug" element={<PackageDetails />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Contact-admin" element={<ContactAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;