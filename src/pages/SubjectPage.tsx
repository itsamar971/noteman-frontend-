import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SubjectCard from "@/components/cards/SubjectCard";
import AddPdfModal from "@/components/modals/AddPdfModal";
import { Plus, BookOpen } from "lucide-react";
import { Subject, Semester, Branch } from "@shared/schema";

const EASE_OUT = [0.16, 1, 0.3, 1];
const SPRING   = { type: "spring", stiffness: 280, damping: 22 };

export default function SubjectPage() {
  const { isAdmin } = useAuth();
  const { currentSemester, currentBranch, navigateToSubject, setCurrentNavigationState, getFilteredSubjects } = useNavigation();
  const [isAddPdfModalOpen, setIsAddPdfModalOpen] = useState(false);
  const params = useParams<{ semester: string; branch: string }>();

  useEffect(() => {
    if (params.semester && params.branch) {
      setCurrentNavigationState(
        decodeURIComponent(params.semester) as Semester,
        decodeURIComponent(params.branch) as Branch,
      );
    }
  }, [params.semester, params.branch, setCurrentNavigationState]);

  if (!currentSemester || !currentBranch) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="ambient-bg" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-16 relative z-10">
        <BreadcrumbNavigation />

        {/* Page header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <div className="eyebrow mb-3">Module Matrix</div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
                {currentSemester}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-2 max-w-lg">
                <span className="text-gradient font-black">{currentBranch}</span> specialization curricula — select a subject to access resources.
              </p>
            </div>

            {isAdmin && (
              <motion.button
                onClick={() => setIsAddPdfModalOpen(true)}
                className="btn-brand flex items-center gap-2 text-xs flex-shrink-0"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
              >
                <Plus className="w-4 h-4" />
                Contribute Resource
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Subjects grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {getFilteredSubjects().map((subject, i) => (
            <SubjectCard
              key={subject}
              subject={subject}
              description={`Course materials, exam papers & lab manuals for ${subject}.`}
              onClick={navigateToSubject}
              index={i}
            />
          ))}
        </motion.div>

        <AddPdfModal
          isOpen={isAddPdfModalOpen}
          onClose={() => setIsAddPdfModalOpen(false)}
          semester={currentSemester}
          branch={currentBranch}
        />
      </div>
    </div>
  );
}
