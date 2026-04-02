import { motion } from "framer-motion";
import { Semester } from "@shared/schema";
import { ArrowRight, Calendar } from "lucide-react";

const SPRING = { type: "spring", stiffness: 280, damping: 22 };
const EASE_OUT = [0.16, 1, 0.3, 1];

interface SemesterCardProps {
  semester: Semester;
  description: string;
  onClick: (semester: Semester) => void;
  index?: number;
}

export default function SemesterCard({ semester, description, onClick, index = 0 }: SemesterCardProps) {
  return (
    <motion.div
      className="glass-card rounded-3xl p-6 cursor-pointer group relative overflow-hidden"
      onClick={() => onClick(semester)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: EASE_OUT }}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Glow blob */}
      <div className="glow-blob opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5
                      transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
        <Calendar className="w-4 h-4 text-indigo-500" />
      </div>

      <h3 className="text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-tight line-clamp-2
                     group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 mb-2">
        {semester}
      </h3>

      <p className="text-zinc-500 dark:text-zinc-500 text-xs font-medium leading-relaxed">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400
                      opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0
                      transition-all duration-300">
        View Subjects
        <ArrowRight className="w-3 h-3" />
      </div>
    </motion.div>
  );
}
