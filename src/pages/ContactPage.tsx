import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Sparkles, Zap, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const formLink = "https://docs.google.com/forms/d/e/1FAIpQLSctIIgnPikT8HukJTp_pApE35JH6x8HhTw8jeB9JIHV_lZJTg/viewform?usp=dialog";

  return (
    <div className="min-h-[calc(100vh-280px)] w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Immersive Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-indigo-500/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-purple-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/10 blur-[150px] pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div 
        className="z-10 w-full max-w-3xl flex flex-col items-center pt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Eyebrow Label */}
        <motion.div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
            We're listening
          </span>
        </motion.div>

        {/* Hero Typography */}
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 tracking-tighter text-center mb-4 leading-tight">
          Let's Build <br className="hidden md:block" /> Something Better.
        </h1>
        
        <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-8 text-center max-w-xl mx-auto">
          Missing a core subject? Found a nasty bug? Or just want to collaborate? NoteMan thrives on student feedback.
        </p>

        {/* The Premium CTA Card */}
        <motion.div 
          className="w-full relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Card Hover Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-md opacity-20 group-hover:opacity-60 transition duration-700" />
          
          <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 h-full shadow-[0_8px_40px_rgb(0,0,0,0.5)]">
            
            <div className="flex items-center gap-6 text-left w-full md:w-auto">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 animate-pulse-slow">
                <Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Official Feedback Form</h3>
                <p className="text-zinc-500 font-medium text-sm">Direct line to the engineering team.</p>
              </div>
            </div>

            <a
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group/btn flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-xl font-black text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full md:w-auto justify-center"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-200 via-purple-200 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Open Form <ArrowRight className="w-5 h-5 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
              </span>
            </a>

          </div>
        </motion.div>
        
        {/* Footer Meta */}
        <motion.div 
          className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6 w-full max-w-xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 text-zinc-500">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold tracking-tight">Vercel Edge</span>
          </div>
          <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
          <div className="flex items-center gap-2 text-zinc-500">
            <MessageSquare className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-bold tracking-tight">~24h Response Time</span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
