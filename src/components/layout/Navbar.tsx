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

  const handleAdminClick = () => {
    setLocation(isAdmin ? "/admin/dashboard" : "/login");
  };

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
            { name: "Community", href: "https://chat.whatsapp.com/Bm4EJ47LtnQ2ynYXraxqB5?mode=gi_t" },
            { name: "About Us", href: "/about" },
            { name: "Contact", href: "https://docs.google.com/forms/d/e/1FAIpQLSctIIgnPikT8HukJTp_pApE35JH6x8HhTw8jeB9JIHV_lZJTg/viewform?usp=dialog" },
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
        </div>

        {/* RIGHT - Admin Button */}
        <button
          onClick={handleAdminClick}
          className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold
                     px-5 py-2 rounded-lg transition-colors duration-200"
        >
          + Admin
        </button>

      </div>
    </nav>
  );
}
