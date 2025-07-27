import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { DarkModeProvider } from "./context/DarkModeContext";
import AIPortfolioChatbot from "./components/AIPortfolioChatbot";

function App() {
  return (
    <DarkModeProvider>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <AIPortfolioChatbot/>
      <Footer />
    </DarkModeProvider>
  );
}

export default App;
