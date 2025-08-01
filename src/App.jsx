import { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { DarkModeProvider } from "./context/DarkModeContext";

// Lazy load heavy components
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const AIPortfolioChatbot = lazy(() => import("./components/AIPortfolioChatbot"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
  </div>
);

// Preload critical components after initial render
const preloadComponents = () => {
  // Preload Skills and Projects as they are heavy and important
  import("./pages/Skills");
  import("./pages/Projects");
  
  // Preload other components with slight delay
  setTimeout(() => {
    import("./pages/About");
    import("./pages/Contact");
    import("./components/AIPortfolioChatbot");
  }, 1000);
};

function App() {
  useEffect(() => {
    // Preload components after the initial render
    preloadComponents();
    
    // Optional: Preload on user interaction hints
    const handleUserInteraction = () => {
      preloadComponents();
      // Remove listeners after first interaction
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    // Preload on first user interaction
    window.addEventListener('mousemove', handleUserInteraction, { once: true });
    window.addEventListener('scroll', handleUserInteraction, { once: true });
    window.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return (
    <DarkModeProvider>
      <Navbar />
      <Home />
      
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Skills />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <AIPortfolioChatbot />
      </Suspense>
      
      <Footer />
    </DarkModeProvider>
  );
}

export default App;