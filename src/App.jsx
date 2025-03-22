import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { DarkModeProvider } from "./context/DarkModeContext"; // Removed duplicate import
// import { DarkModeProvider } from "./context/DarkModeContext";


function App() {
  return (
    <>
      {/* <h1 className="text-4xl font-bold text-blue-500">Hello, Tailwind!</h1> */}
      <DarkModeProvider>

      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      </DarkModeProvider>
    </>
  );
}

export default App;
