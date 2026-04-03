import { motion } from "framer-motion";
import { Send, FileText, FileSpreadsheet, BookOpen, CheckCircle } from "lucide-react";

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-background pt-8 pb-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-3xl mx-auto relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="eyebrow mb-6 inline-block">For the Community</div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-4">
            Got good notes? <span className="text-violet-500">Share them.</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg max-w-xl mx-auto">
            Help thousands of students by contributing your notes. We'll review and publish with credit to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-[2rem] p-8 md:p-12 border-violet-500/20"
        >
          <h2 className="text-xl font-bold text-white mb-6">What you can contribute:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { icon: FileText, text: "Handwritten notes (clear photos or scanned PDF)" },
              { icon: FileSpreadsheet, text: "Typed notes" },
              { icon: BookOpen, text: "Previous year papers" },
              { icon: CheckCircle, text: "Lab manuals" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                <div className="text-violet-500 bg-violet-500/10 p-2 rounded-lg">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-zinc-300">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-white/10 pt-10">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-violet-500/25"
            >
              Upload Materials
              <Send className="w-5 h-5" />
            </a>
            <p className="mt-4 text-xs font-medium text-zinc-500">
              Links to a Google Form. Review takes 24-48 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
