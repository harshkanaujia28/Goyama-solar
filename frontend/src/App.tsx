import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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

/* ---------------- AppRoutes ---------------- */

function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // First load animation
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        setIsFirstLoad(false);
      }, 4000); // 🔥 match your real video duration
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Route change animation (skip first render)
  useEffect(() => {
    if (isFirstLoad) return;

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // 🔥 match video duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <IntroAnimation visible={loading} />

      <Layout>
        <Routes location={location}>
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
    </>
  );
}

/* ---------------- App ---------------- */

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;