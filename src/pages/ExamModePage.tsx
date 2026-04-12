import { motion } from "framer-motion";
import { BookOpen, Brain, Zap, FlaskConical, ArrowLeft } from "lucide-react";
import ExamCard from "@/components/ui/ExamCard";
import ExamNavbar from "@/components/layout/ExamNavbar";

const QUICK_KITS = [
  {
    title: "Formula Sheets",
    description: "Rapidly review key formulas, equations, and definitions across all engineering subjects.",
    icon: BookOpen,
    route: "/exam-mode/search?resourceType=formulas",
    color: "amber"
  },
  {
    title: "Important Questions",
    description: "Curated lists of high-probability exam questions and detailed step-by-step solutions.",
    icon: Brain,
    route: "/exam-mode/search?resourceType=important-questions",
    color: "indigo"
  },
  {
    title: "Cheat Sheets",
    description: "One-page summaries for last-minute cram sessions and foundational concepts.",
    icon: Zap,
    route: "/exam-mode/search?resourceType=cheatsheets",
    color: "emerald"
  },
  {
    title: "Rapid Practice",
    description: "Standard model papers and previous years questions to simulate the exam environment.",
    icon: FlaskConical,
    route: "/exam-mode/search?resourceType=practice",
    color: "blue"
  }
];

export default function ExamModePage() {
  return (
    <div className="h-screen flex flex-col bg-[#060606] text-white overflow-hidden">
      <ExamNavbar />
      
      <main className="flex-grow flex flex-col justify-center max-w-5xl mx-auto px-10 w-full relative pt-12">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[110px]" />
        </div>

        {/* Header Section */}
        <section className="text-center mb-10 relative">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            <Zap className="w-2.5 h-2.5 fill-amber-500" />
            Revision Ecosystem
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-2"
          >
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              Exam Mode
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 text-xs md:text-sm max-w-lg mx-auto leading-relaxed font-medium"
          >
            A high-performance sanctuary for deep focus and exam mastery.
          </motion.p>
        </section>

        {/* Quick Kits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
        >
          {QUICK_KITS.map((kit, index) => (
            <ExamCard
              key={kit.title}
              title={kit.title}
              description={kit.description}
              icon={kit.icon}
              route={kit.route}
              color={kit.color}
            />
          ))}
        </motion.div>

        {/* Specialized Minimalist Footer */}
        <div className="mt-8 text-center opacity-40">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600 cursor-default">
            © Noteman <span className="text-amber-500/30 mx-1">•</span> Opensource <span className="text-amber-500/30 mx-1">•</span> Free Forever
          </p>
        </div>
      </main>
    </div>
  );
}
