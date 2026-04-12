import { LucideIcon, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

interface ExamCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  color?: string;
}

export default function ExamCard({ title, description, icon: Icon, route, color = "amber" }: ExamCardProps) {
  const [, setLocation] = useLocation();

  const colorStyles = {
    amber: "from-amber-500/10 to-[#4a2e00]/5 hover:shadow-amber-500/10 border-amber-500/20",
    blue: "from-blue-500/10 to-blue-900/5 hover:shadow-blue-500/10 border-blue-500/20",
    indigo: "from-indigo-500/10 to-indigo-900/5 hover:shadow-indigo-500/10 border-indigo-500/20",
    emerald: "from-emerald-500/10 to-emerald-900/5 hover:shadow-emerald-500/10 border-emerald-500/20",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setLocation(route)}
      className={`
        relative group cursor-pointer p-6 rounded-[1.25rem] border transition-all duration-500
        ${colorStyles[color as keyof typeof colorStyles] || colorStyles.amber}
        hover:border-white/20 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)]
      `}
    >
      {/* Dynamic Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.25rem]" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/30 group-hover:bg-amber-500/5 transition-all duration-500">
            <Icon className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="w-7 h-7 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
            <ArrowLeft className="w-3.5 h-3.5 text-white rotate-180" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mb-5 opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
        
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500/40 group-hover:text-amber-500 transition-all duration-500">
            Enter Hub
          </span>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-amber-500/20 to-transparent group-hover:from-amber-500/40 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
}
