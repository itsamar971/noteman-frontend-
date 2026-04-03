import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { navigateToHome } = useNavigation();
  const { isDark, toggle } = useDarkMode();

  const [location] = useLocation();
  if (location === "/login" || location.startsWith("/admin")) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT - Dark mode toggle + Brand */}
        <div className="flex items-center gap-3">
          <button
            id="dark-mode-toggle"
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       border border-zinc-200 dark:border-white/10 text-zinc-400 dark:text-white/40 hover:text-zinc-900 dark:hover:text-white
                       hover:border-zinc-300 dark:hover:border-white/20 hover:scale-110 active:scale-95
                       transition-all duration-200"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => navigateToHome()}
            className="text-zinc-900 dark:text-white font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            NoteMan
          </button>
        </div>

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

        {/* RIGHT - Admin Button */}
        <button
          onClick={() => setLocation(isAdmin ? "/admin/dashboard" : "/login")}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-white/70 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all text-sm font-medium"
        >
          Admin
        </button>

      </div>
    </nav>
  );
}
