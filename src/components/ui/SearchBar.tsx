import { useState, useEffect, useRef } from "react";
import { Search, Command } from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/exam-mode/search?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto px-4">
      <form onSubmit={handleSearch} className="relative group">
        <div className={`
          relative flex items-center bg-zinc-100 dark:bg-white/5 border transition-all duration-300 rounded-full overflow-hidden
          ${isFocused ? "border-amber-500/50 ring-4 ring-amber-500/10" : "border-zinc-200 dark:border-white/10 group-hover:border-white/20"}
        `}>
          <div className="pl-4 pr-2 text-zinc-400 dark:text-zinc-500">
            <Search className="w-4 h-4" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search subjects, formulas, questions..."
            className="w-full bg-transparent py-2 pr-10 outline-none text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />

          <div className="absolute right-4 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
            <Command className="w-2.5 h-2.5" />
            <span>/</span>
          </div>
        </div>

        {/* Suggestion Dropdown (Simplified) */}
        <AnimatePresence>
          {isFocused && query.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-2 left-0 right-0 p-2 bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl z-[100]"
            >
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-white/5 mb-2">
                Suggested Search
              </div>
              <button 
                type="button"
                onClick={() => setLocation(`/exam-mode/search?q=${query}`)}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 text-sm text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                Press enter to search for <span className="text-amber-500 font-medium">"{query}"</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
