import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PackageDetails from "@/components/PackageDetails";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Packages from './pages/Packages';
import AboutUs from "@/components/About";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import BlogDetails from "@/components/BlogDetails";
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

          {/* Static Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />

          {/* Admin Contact */}
          <Route path="/contact-admin" element={<ContactAdmin />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;