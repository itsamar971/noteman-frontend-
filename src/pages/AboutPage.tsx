import { motion } from "framer-motion";
import { 
  Users, 
  MapPin, 
  Database, 
  Layers, 
  Clock, 
  Heart,
  BookOpen,
  Zap,
  Globe,
  ArrowUpRight
} from "lucide-react";

const SPRING = { type: "spring", stiffness: 280, damping: 22 };
const EASE_OUT = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden pb-24">
      {/* Ambient background glows */}
      <div className="ambient-bg" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

      <main className="content-pad pt-12 md:pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-32 md:space-y-48"
        >
          {/* ============ HERO SECTION ============ */}
          <motion.section variants={itemVariants} className="text-center space-y-8">
            <div className="flex justify-center">
              <span className="eyebrow bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
                The Mission
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] max-w-4xl mx-auto">
              We built <span className="text-gradient">NoteMan</span> because we were tired of scrambling for notes 3 days before exams.
            </h1>
          </motion.section>

          {/* ============ THE PROBLEM & SOLUTION ============ */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="eyebrow">The Chaos</div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic opacity-90">
                  Deadlines, PDFs, <br/> and Broken Links.
                </h2>
                <p className="text-zinc-500 font-medium leading-relaxed max-w-lg">
                  Most B.Tech students don't carry books. Lectures get missed. And when exam 
                  season hits, everyone is hunting for the same PDFs across random Telegram 
                  groups and sketchy websites.
                </p>
              </div>

              <div className="space-y-4">
                <div className="eyebrow text-emerald-400 after:bg-emerald-400">The Fix</div>
                <p className="text-zinc-300 font-bold text-lg leading-relaxed">
                  NoteMan fixes that — one clean, organized place 
                  for every branch, every year, and every subject.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="glass-card rounded-[2rem] p-8 md:p-12 relative border-white/5 bg-zinc-900/40">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 flex items-center justify-center border border-indigo-500/20">
                      <Layers className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h4 className="font-black uppercase tracking-widest text-[10px] text-zinc-500">Organized</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">Systematically mapped to R22 syllabus.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/15 flex items-center justify-center border border-purple-500/20">
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="font-black uppercase tracking-widest text-[10px] text-zinc-500">Fast</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">Zero ads. Zero login walls. Direct downloads.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20">
                      <Database className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="font-black uppercase tracking-widest text-[10px] text-zinc-500">Curated</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">Hand-picked textbooks & lab manuals.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center border border-amber-500/20">
                      <Globe className="w-5 h-5 text-amber-400" />
                    </div>
                    <h4 className="font-black uppercase tracking-widest text-[10px] text-zinc-500">Open</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">Free & Open Source for the community.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ============ WHO WE ARE ============ */}
          <motion.section variants={itemVariants} className="text-center space-y-12">
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex justify-center">
                <span className="eyebrow">The Collective</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Built by students, <br/> For <span className="text-indigo-400">students.</span>
              </h2>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                We're a small team from Hyderabad who got tired of the chaos and decided to 
                do something about it. No ads. No paywalls. No login walls. Just notes.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: "Branches", val: "11+", icon: Layers },
                { label: "Semesters", val: "8", icon: Clock },
                { label: "Resources", val: "500+", icon: Database },
                { label: "Syllabus", val: "R22", icon: Heart },
              ].map((stat) => (
                <div key={stat.label} className="stat-card group">
                  <div className="glow-blob opacity-40 group-hover:opacity-70 transition-opacity" />
                  <div className="relative z-10 space-y-2">
                    <stat.icon className="w-5 h-5 text-indigo-500/50 mb-4" />
                    <div className="text-3xl font-black tracking-tighter text-white">{stat.val}</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 line-clamp-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ============ OPEN SOURCE CALLOUT ============ */}
          <motion.section variants={itemVariants}>
             <div className="bg-indigo-600 rounded-[2.5rem] p-1 md:p-2 overflow-hidden group">
               <div className="bg-zinc-950 rounded-[2.2rem] p-10 md:p-20 relative overflow-hidden flex flex-col items-center text-center space-y-8">
                 {/* Decorative pattern */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                 <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 animate-float">
                   <Users className="w-8 h-8 text-indigo-400" />
                 </div>
                 
                 <div className="space-y-4 relative z-10">
                   <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Join the Movement.</h2>
                   <p className="text-zinc-500 font-medium max-w-xl mx-auto leading-relaxed">
                     NoteMan is growing every day. Join our community to share notes, suggest new features, or just to stay updated with your branch. 
                   </p>
                 </div>

                 <div className="relative z-10 w-full flex justify-center">
                   <button 
                    id="join-community"
                    onClick={() => window.open('https://chat.whatsapp.com/Bm4EJ47LtnQ2ynYXraxqB5?mode=gi_t', '_blank')}
                    className="btn-brand h-12 px-12 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95"
                   >
                      Join Whatsapp Community
                      <ArrowUpRight className="w-4 h-4" />
                   </button>
                 </div>
               </div>
             </div>
          </motion.section>

        </motion.div>
      </main>
    </div>
  );
}
