import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { navigateToHome } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [location] = useLocation();
  if (location === "/login" || location.startsWith("/admin")) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT - Brand Logo */}
        <button
          onClick={() => { setIsMobileMenuOpen(false); navigateToHome(); }}
          className="flex items-center hover:opacity-80 transition-opacity shrink-0"
        >
          <img src="/navbar-logo.svg" alt="NoteMan" className="h-6 md:h-7 w-auto" />
        </button>

        {/* MIDDLE - Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "About Us", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (item.href.startsWith("http")) {
                  window.open(item.href, "_blank");
                } else {
                  setLocation(item.href);
                }
              }}
              className="relative text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white text-sm transition-colors duration-200 group font-medium"
            >
              {item.name}
              {/* Underline effect */}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-indigo-500 dark:bg-white rounded-full transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          <a
            href="https://chat.whatsapp.com/Bm4EJ47LtnQ2ynYXraxqB5?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-white/70 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all text-sm font-medium"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-[#2AABEE]"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2z" />
            </svg>
            Join Community
          </a>
        </div>

        {/* RIGHT - Admin Button Desktop & Hamburger Mobile */}
        <div className="flex items-center">
          <button
            onClick={() => setLocation(isAdmin ? "/admin/dashboard" : "/login")}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-white/70 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all text-sm font-medium"
          >
            Admin
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-zinc-900 dark:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 shadow-lg animate-in slide-in-from-top-4 py-4 px-6 flex flex-col gap-4 z-40">
          <button
            onClick={() => { setIsMobileMenuOpen(false); setLocation("/about"); }}
            className="text-left text-zinc-700 dark:text-zinc-300 font-medium py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => { setIsMobileMenuOpen(false); setLocation("/contact"); }}
            className="text-left text-zinc-700 dark:text-zinc-300 font-medium py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Contact
          </button>
          <a
            href="https://chat.whatsapp.com/Bm4EJ47LtnQ2ynYXraxqB5?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#2AABEE]">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2z" />
            </svg>
            Join Community
          </a>
          <div className="h-px w-full bg-zinc-200 dark:bg-white/10 my-2" />
          <button
            onClick={() => { setIsMobileMenuOpen(false); setLocation(isAdmin ? "/admin/dashboard" : "/login"); }}
            className="text-left font-bold text-indigo-600 dark:text-indigo-400 py-2"
          >
            Admin
          </button>
        </div>
      )}
    </nav>
  );
}
