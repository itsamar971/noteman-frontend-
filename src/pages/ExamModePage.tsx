import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Fingerprint, ArrowLeft, Zap } from "lucide-react";

export default function ExamModePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-[#F59E0B]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        className="z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Icon */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-[#F59E0B] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          <div className="relative w-24 h-24 rounded-full border border-[#F59E0B]/30 bg-[#111] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[#F59E0B]/10 animate-pulse" />
            <Fingerprint className="w-12 h-12 text-[#F59E0B]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 tracking-tighter mb-4">
            Exam Mode
          </h1>
          <div className="flex items-center justify-center gap-2 text-[#F59E0B] font-bold uppercase tracking-widest text-sm mb-6">
            <Zap className="w-4 h-4 fill-[#F59E0B]" />
            <span>Coming Soon</span>
          </div>
        </motion.div>

        <motion.p 
          className="text-zinc-400 max-w-md text-lg leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          We are engineering the ultimate rapid-revision experience. Tailored question banks, formula sheets, and past papers instantly matching your syllabus.
        </motion.p>

        {/* Back Button */}
        <motion.button
          onClick={() => setLocation("/")}
          className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
