import { motion } from "framer-motion";
import { SearchX, ArrowLeft } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";

export default function NotFound() {
  const { navigateToHome } = useNavigation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background glow */}
      <div className="pointer-events-none fixed top-1/2 left-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-zinc-900 border border-white/10 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative">
          <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-3xl" />
          <SearchX className="w-10 h-10 text-white relative z-10" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
          Lost in the <span className="text-red-500">syllabus?</span>
        </h1>
        
        <p className="text-zinc-400 text-lg md:text-xl font-medium mb-10 max-w-md mx-auto leading-relaxed">
          This page doesn't exist. But your notes do.
        </p>

        <button
          onClick={() => navigateToHome()}
          className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Take me back to notes
        </button>
        
        <div className="mt-16 text-zinc-600 font-bold tracking-tight text-xl">
          NoteMan
        </div>
      </motion.div>
    </div>
  );
}
