import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import AddPdfModal from "@/components/modals/AddPdfModal";
import { ArrowRight, Cpu, Zap, Shield, Radio, FlaskConical, MapPin, Hammer, Bot, GitBranch, ChevronDown, MessageSquare } from "lucide-react";
import { branches, Branch } from "@shared/schema";

const SPRING = { type: "spring", stiffness: 300, damping: 24 };
const EASE_OUT = [0.16, 1, 0.3, 1];

const branchMeta: Record<string, { icon: React.ElementType; color: string; accent: string }> = {
  "Civil Engineering":                           { icon: Hammer,       color: "bg-amber-500/10 text-amber-500",   accent: "border-amber-500/20" },
  "Electrical & Electronics Engineering":        { icon: Zap,          color: "bg-yellow-500/10 text-yellow-500", accent: "border-yellow-500/20" },
  "Mechanical Engineering":                      { icon: Cpu,          color: "bg-orange-500/10 text-orange-500", accent: "border-orange-500/20" },
  "Electronics & Communication Engineering":     { icon: Radio,        color: "bg-indigo-500/10 text-indigo-500", accent: "border-indigo-500/20" },
  "Chemical Engineering":                        { icon: FlaskConical, color: "bg-emerald-500/10 text-emerald-500", accent: "border-emerald-500/20" },
  "Geoinformatics":                              { icon: MapPin,       color: "bg-cyan-500/10 text-cyan-500",     accent: "border-cyan-500/20" },
  "Metallurgical Engineering":                   { icon: Hammer,       color: "bg-zinc-500/10 text-zinc-400",     accent: "border-zinc-500/20" },
  "CSE (Artificial Intelligence & Machine Learning)": { icon: Bot,    color: "bg-purple-500/10 text-purple-500", accent: "border-purple-500/20" },
  "CSE (Cyber Security)":                        { icon: Shield,       color: "bg-red-500/10 text-red-500",       accent: "border-red-500/20" },
  "CSE (Regular / General)":                     { icon: GitBranch,    color: "bg-indigo-500/10 text-indigo-500", accent: "border-indigo-500/20" },
  "Biotechnology":                               { icon: FlaskConical, color: "bg-teal-500/10 text-teal-500",     accent: "border-teal-500/20" },
};

const branchDescriptions: Record<string, string> = {
  "Civil Engineering":                           "Structures, surveying & environmental systems.",
  "Electrical & Electronics Engineering":        "Power systems, circuits & electrical machines.",
  "Mechanical Engineering":                      "Thermodynamics, mechanics & design.",
  "Electronics & Communication Engineering":     "Communication, signals & digital logic.",
  "Chemical Engineering":                        "Process engineering & chemical tech.",
  "Geoinformatics":                              "GIS, remote sensing & mapping.",
  "Metallurgical Engineering":                   "Materials science & metals processing.",
  "CSE (Artificial Intelligence & Machine Learning)": "AI models, deep learning & data science.",
  "CSE (Cyber Security)":                        "Network security & ethical hacking.",
  "CSE (Regular / General)":                     "Software, algorithms & web development.",
  "Biotechnology":                               "Bio-processing & molecular biology.",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export default function Home() {
  const { isAdmin } = useAuth();
  const { navigateToBranch } = useNavigation();
  const [isAddPdfModalOpen, setIsAddPdfModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      {/* ===== D'FESTA STYLE BACKGROUND GLOWS ===== */}

      {/* Warm amber/orange glow — bottom left (like D'FESTA) */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 w-[700px] h-[500px] -translate-x-1/4 translate-y-1/4"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.22) 0%, rgba(234,88,12,0.10) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Indigo/violet glow — top right (like D'FESTA) */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[600px] h-[500px] translate-x-1/4 -translate-y-1/4"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.20) 0%, rgba(168,85,247,0.10) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle center top glow */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(99,102,241,0.07) 0%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-8 pb-24 px-6 overflow-hidden">
        {/* Inner glows (animate) */}
        <div className="pointer-events-none absolute top-1/3 left-1/4 w-72 h-72 rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />
        <div className="pointer-events-none absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', filter: 'blur(30px)', animationDelay: '1.5s' }} />

        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          {/* Eyebrow — gap from top */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          >
            <span className="eyebrow animate-float px-4 py-2 rounded-full bg-indigo-500/8 border border-indigo-500/15">
              R22 Syllabus Fully Supported
            </span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            className="leading-none mb-8"
            style={{ fontFamily: '"Bungee", sans-serif' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
          >
            <span className="block text-5xl md:text-7xl text-zinc-900 dark:text-white tracking-tight">
              Academic Excellence
            </span>
            <span
              className="block text-5xl md:text-7xl tracking-tight"
              style={{ color: '#6366F1' }}
            >
              Unlocked
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
          >
            The ultimate resource repository for engineering students — textbooks, exam papers &amp; lab manuals, curated by semester.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 }}
          >
            <motion.button
              className="btn-brand flex items-center gap-2 px-8 h-12 text-sm"
              onClick={() => document.getElementById('branches-section')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING}
            >
              Start Exploring
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="h-12 px-8 rounded-xl border border-zinc-200 dark:border-zinc-800
                         text-zinc-700 dark:text-zinc-300 font-black uppercase tracking-wide text-xs
                         hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400
                         transition-all duration-200"
              onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING}
            >
              View FAQs
            </motion.button>
          </motion.div>

          {/* Stats — inline, equal gap below buttons */}
          <motion.div
            className="flex items-center justify-center gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { value: "11+", label: "Branches" },
              { value: "8",   label: "Semesters" },
              { value: "500+", label: "Resources" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08, duration: 0.5, ease: EASE_OUT }}
              >
                <div className="text-2xl font-black tabular-nums tracking-tighter text-zinc-900 dark:text-white">{s.value}</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </section>

      {/* ==================== BRANCHES ==================== */}
      <section id="branches-section" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Section Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div className="eyebrow mb-4">Engineering Matrix</div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Select Your <span className="text-gradient">Branch</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-3 max-w-lg font-medium">
              Discover curated educational materials organized by specialization and semester.
            </p>
          </motion.div>

          {/* Branches Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
          >
            {branches.map((branch, idx) => {
              const meta = branchMeta[branch] || { icon: GitBranch, color: "bg-indigo-500/10 text-indigo-500", accent: "border-indigo-500/20" };
              const Icon = meta.icon;
              return (
                <motion.div
                  key={branch}
                  variants={cardVariants}
                  className="glass-card rounded-3xl p-6 cursor-pointer group"
                  onClick={() => navigateToBranch(branch as Branch)}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={SPRING}
                >
                  {/* Glow blob */}
                  <div className="glow-blob opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${meta.color} transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Index eyebrow */}
                  <div className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">
                    Node {String(idx + 1).padStart(2, '0')}
                  </div>

                  <h3 className="text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-tight mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {branch}
                  </h3>

                  <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed line-clamp-2 font-medium">
                    {branchDescriptions[branch]}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                    Access Semester
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section id="faq-section" className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div className="flex justify-center mb-4">
              <div className="eyebrow">Intellectual Query</div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Everything students actually ask
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {[
              {
                q: "Is NoteMan completely free?",
                a: "Yes, 100% free. No subscription, no premium plan, no hidden charges. Download as many notes as you want — forever."
              },
              {
                q: "Do I need to create an account to download notes?",
                a: "Nope. No sign-up, no login, no email required. Just come, find your subject, and download. That's it."
              },
              {
                q: "My branch or subject is missing. What do I do?",
                a: "Use the Contact Us form and select 'Request a Subject / Branch.' We'll prioritize adding it. You can also contribute directly if NoteMan is open source."
              },
              {
                q: "Are previous year question papers available?",
                a: "Yes. PYQs are available for most subjects alongside notes and textbooks. Look for the 'Previous Papers' tag inside your subject page."
              },
              {
                q: "Can I upload my own notes to NoteMan?",
                a: "Currently, only admins can upload content to maintain quality. But if you have genuinely good notes, reach out to us — we'll review and add them with credit to you."
              },
              {
                q: "The download link is broken or the file won't open. Help?",
                a: "Sorry about that! Use the Contact Us form, select 'Broken or Wrong Download Link,' and mention the subject name. We'll fix it within 24–48 hours."
              },
              {
                q: "Will NoteMan stay free forever?",
                a: "That's the plan. NoteMan is open source and built for students — not for profit. As long as we're running, it stays free."
              }
            ].map((faq, idx) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <motion.div
                  key={idx}
                  className={`glass-card rounded-[2rem] border-white/5 bg-zinc-900/20 overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-indigo-500/30 bg-zinc-900/40' : ''}`}
                  initial={false}
                >
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-bold text-sm md:text-base text-zinc-800 dark:text-zinc-200 pr-8">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={SPRING}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 transition-colors ${isOpen ? 'bg-indigo-500 border-indigo-400 text-white' : 'text-zinc-500'}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial="collapsed"
                    animate={isOpen ? "open" : "collapsed"}
                    variants={{
                      open: { opacity: 1, height: "auto", marginBottom: 24 },
                      collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                    }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    <div className="px-6 pb-2">
                      <div className="h-px w-full bg-zinc-800/50 mb-6" />
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AddPdfModal
        isOpen={isAddPdfModalOpen}
        onClose={() => setIsAddPdfModalOpen(false)}
      />
    </div>
  );
}
