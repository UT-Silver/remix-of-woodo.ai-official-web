import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import SplashScreen from "./components/SplashScreen";
import ParticleBackground from "./components/ParticleBackground";
import Index from "./pages/Index";
import Vision from "./pages/Vision";
import Team from "./pages/Team";
import Portfolio from "./pages/Portfolio";
import Think from "./pages/Think";
import ArticlePage from "./pages/ArticlePage";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("woodo_intro_seen")) return false;
    return true;
  });

  const onSplashComplete = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem("woodo_intro_seen", "1");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash && <SplashScreen onComplete={onSplashComplete} />}
        <BrowserRouter>
          <ParticleBackground />
          {!showSplash && <ScrollProgress />}
          {/* Nav is always rendered but hidden during splash so SplashScreen can measure its position */}
          <div className="nav-bar" style={{ opacity: showSplash ? 0 : 1, pointerEvents: showSplash ? "none" : "auto" }}>
            <Navbar />
          </div>
          <main className="relative" style={{ zIndex: 10 }}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/team" element={<Team />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/think" element={<Think />} />
              <Route path="/think/:slug" element={<ArticlePage />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <div style={{ position: "relative", zIndex: 10 }}>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
