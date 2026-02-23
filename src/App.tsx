import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IntroAnimation from "./components/IntroAnimation";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Manufacturing from "./pages/Manufacturing";
import Products from "./pages/Products";
import VisionMission from "./pages/VisionMission";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Router Always Mounted */}
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/manufacturing" element={<Manufacturing />} />
              <Route path="/products" element={<Products />} />
              <Route path="/vision-mission" element={<VisionMission />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>

          {/* Intro Overlay On Top */}
          {!introComplete && (
            <IntroAnimation onComplete={handleIntroComplete} />
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;