import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";

// Pages
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check localStorage on initial render (not in useState to avoid race conditions)
  // Once the app loads, this flag persists for the entire session
  const [isLoading, setIsLoading] = useState(() => {
    const hasVisited = localStorage.getItem("hasVisitedPortfolio");
    console.log("🔍 DEBUG: hasVisited from localStorage:", hasVisited);
    const shouldShowPreloader = !hasVisited;
    console.log("📺 DEBUG: Should show preloader?", shouldShowPreloader);
    return shouldShowPreloader;
  });

  // Guard: Once isLoading is false, it should NEVER be true again in this session
  const handlePreloaderComplete = () => {
    // Mark that user has visited for the first time
    console.log("✅ DEBUG: Preloader completed, setting localStorage flag");
    localStorage.setItem("hasVisitedPortfolio", "true");
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          {/* Preloader Overlay - Only renders on first visit */}
          {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

          {/* Main Application - Always mounted */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;