"use client"
import React, { useState, useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { throttle } from "../../lib/throttleDebounce";

const Navbar = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const pathname = usePathname();
  const router = useRouter();
  const sectionCacheRef = useRef({});

  const isHomeRoute = pathname === "/";

  // ── Scroll handler: update background + active section ──
  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 20);

      if (isHomeRoute) {
        const sections = ["home", "about", "skills", "experience", "projects", "contact"];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          if (!sectionCacheRef.current[section]) {
            sectionCacheRef.current[section] = document.getElementById(section);
          }
        }

        for (const section of sections) {
          const element = sectionCacheRef.current[section];
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
              break;
            }
          }
        }
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomeRoute]);

  const navItems = isHomeRoute
    ? ["Home", "About", "Skills", "Experience", "Projects", "Contact", "Blog"]
    : ["Portfolio", "Blog"];

  const handleNavClick = (item) => {
    if (isHomeRoute) {
      if (item === "Blog") {
        router.push("/blog");
      } else {
        document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (item === "Portfolio") router.push("/");
      else if (item === "Blog") router.push("/blog");
    }
  };

  const isItemActive = (item) => {
    if (isHomeRoute && item !== "Blog") return activeSection === item;
    if (item === "Blog") return pathname === "/blog";
    if (item === "Portfolio") return pathname === "/";
    return false;
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/50"
            : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 xl:px-10 py-4">

          {/* ── Logo ── */}
          <Link href="/" prefetch={true}>
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Icon with glow ring */}
              <div className="relative flex-shrink-0" style={{ width: "48px", height: "48px" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full blur-sm opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                <img
                  src="/assets/iconImage.png"
                  alt="Udit Portfolio Logo"
                  className="relative rounded-full object-cover border border-white/20 shadow-lg w-full h-full"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold text-white tracking-wide">
                  Udit&apos;s Portfolio
                </span>
                <span className="text-xs text-purple-400 font-medium tracking-widest mt-1 uppercase">
                  Web Developer
                </span>
              </div>
            </motion.div>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const active = isItemActive(item);
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.06, ease: "easeOut" }}
                >
                  {isHomeRoute && item !== "Blog" ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-md group cursor-pointer ${
                        active
                          ? "text-purple-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item}
                      {/* Underline */}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                          active ? "w-3/4 opacity-100" : "w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-70"
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item === "Blog" ? "/blog" : item === "Portfolio" ? "/" : `/#${item.toLowerCase()}`}
                      prefetch={true}
                      className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-md group ${
                        active
                          ? "text-purple-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                          active ? "w-3/4 opacity-100" : "w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-70"
                        }`}
                      />
                    </Link>
                  )}
                </motion.div>
              );
            })}

            {/* ── Theme toggle — COMMENTED OUT ──
            <motion.button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="relative ml-4 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <Sun className="text-yellow-400 w-5 h-5" size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <Moon className="text-blue-300 w-5 h-5" size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-500" />
            </motion.button>
            ── END Theme toggle ── */}

            {/* Decorative dot (from reference image) */}
            <div className="ml-3 flex flex-col items-center gap-1 opacity-80">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="5" r="2.5" stroke="rgba(168,85,247,0.8)" strokeWidth="1.5" />
                <line x1="9" y1="7.5" x2="9" y2="14" stroke="rgba(168,85,247,0.5)" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="9" cy="15.5" r="1.5" fill="rgba(168,85,247,0.9)" />
              </svg>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            </div>
          </div>

          {/* ── Mobile hamburger ── */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Mobile overlay menu ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-20 right-4 w-64 z-50 md:hidden rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.92, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Header strip */}
              <div className="px-5 py-3 border-b border-white/5 bg-gradient-to-r from-purple-600/20 to-transparent">
                <span className="text-white text-sm font-semibold tracking-wide">Navigation</span>
              </div>

              {/* Links */}
              <div className="p-3 space-y-1">
                {navItems.map((item, index) => {
                  const active = isItemActive(item);
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {isHomeRoute && item !== "Blog" ? (
                        <button
                          onClick={() => { handleNavClick(item); setIsOpen(false); }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                            active
                              ? "text-purple-400 bg-purple-500/10"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {item}
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                        </button>
                      ) : (
                        <Link
                          href={item === "Blog" ? "/blog" : item === "Portfolio" ? "/" : `/#${item.toLowerCase()}`}
                          prefetch={true}
                          onClick={() => setIsOpen(false)}
                          className={`w-full block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                            active
                              ? "text-purple-400 bg-purple-500/10"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {item}
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;