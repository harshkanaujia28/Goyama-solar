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
import SolarCalculator from "./pages/SolarCalculator";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Manufacturing from "./pages/Manufacturing";
import Products from "./pages/Products";
import VisionMission from "./pages/VisionMission";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FloatingSolarCalculator from "./components/FloatingSolarCalculator";
import GoyamaBlogPost from "./pages/GoyamaBlogPost";
import BlogDealerGuide from "./pages/BlogDealerGuide";
import BlogTopconVsPerc from "./pages/BlogTopconVsPerc";

import Blog from "./pages/Blog";

const queryClient = new QueryClient();

/* ---------------- AppRoutes ---------------- */

function AppRoutes() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem("goyama_intro");

    const now = Date.now();

    const shouldShow =
      !lastSeen ||
      now - Number(lastSeen) > 30 * 60 * 1000;

    if (shouldShow) {
      setLoading(true);

      localStorage.setItem(
        "goyama_intro",
        now.toString()
      );

      const timer = setTimeout(() => {
        setLoading(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <IntroAnimation visible={loading} />

      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/solar-calculator" element={<SolarCalculator />} /> */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/indian-manufacturer-vs-imports-2026" element={<GoyamaBlogPost />} />
          <Route path="/blog/how-to-become-solar-panel-dealer-india-2026" element={<BlogDealerGuide />} />
          <Route path="/blog/topcon-vs-monoperc-solar-panels-2026" element={<BlogTopconVsPerc />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <FloatingSolarCalculator /> */}
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