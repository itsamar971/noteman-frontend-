import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { Menu, X, ArrowLeft } from "lucide-react";
import SearchBar from "../ui/SearchBar";

export default function ExamNavbar() {
  const { isAdmin } = useAuth();
  const [location, setLocation] = useLocation();
  const { navigateToHome } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[70] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 h-16 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-8">
        
        {/* LEFT - Back to Home or Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={navigateToHome}
            className="p-2 hover:bg-white/5 rounded-full text-neutral-400 hover:text-white transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={navigateToHome}
            className="hidden sm:block flex items-center hover:opacity-80 transition-opacity shrink-0"
          >
            <img src="/navbar-logo.svg" alt="NoteMan" className="h-6 w-auto" />
          </button>
        </div>

        {/* CENTER - Smart Search Bar */}
        <div className="flex-grow max-w-2xl hidden md:block">
          <SearchBar />
        </div>

        {/* RIGHT - Admin/Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
             <button
               onClick={() => setLocation(isAdmin ? "/admin/dashboard" : "/login")}
               className="px-4 py-1.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
             >
               {isAdmin ? "Dashboard" : "Admin"}
             </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown & Mobile Search */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-6 px-6 flex flex-col gap-6 z-[65] animate-in slide-in-from-top-4">
          <div className="py-2">
            <SearchBar />
          </div>
          
          <div className="h-px w-full bg-white/5" />
          
          <button
            onClick={() => { setIsMobileMenuOpen(false); setLocation("/about"); }}
            className="text-left text-zinc-300 font-medium py-2 hover:text-amber-500 transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => { setIsMobileMenuOpen(false); setLocation("/contact"); }}
            className="text-left text-zinc-300 font-medium py-2 hover:text-amber-500 transition-colors"
          >
            Contact
          </button>
          
          <div className="h-px w-full bg-white/5" />
          
          <button
            onClick={() => { setIsMobileMenuOpen(false); setLocation(isAdmin ? "/admin/dashboard" : "/login"); }}
            className="text-left font-bold text-amber-500 py-2"
          >
            {isAdmin ? "Admin Dashboard" : "Admin Login"}
          </button>
        </div>
      )}
    </nav>
  );
}
