import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useNavigation } from "@/hooks/useNavigation";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import ResourceList from "@/components/ResourceList";
import { Semester, Branch, Subject } from "@shared/schema";

const EASE_OUT = [0.16, 1, 0.3, 1];

export default function ResourcesPage() {
  const { currentSemester, currentBranch, currentSubject, setCurrentNavigationState } = useNavigation();
  const params = useParams<{ semester: string; branch: string; subject: string }>();

  useEffect(() => {
    if (params.semester && params.branch && params.subject) {
      setCurrentNavigationState(
        decodeURIComponent(params.semester) as Semester,
        decodeURIComponent(params.branch) as Branch,
        decodeURIComponent(params.subject) as Subject,
      );
    }
  }, [params.semester, params.branch, params.subject, setCurrentNavigationState]);

  if (!currentSemester || !currentBranch || !currentSubject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-400">Syncing resources...</p>
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
          <div className="eyebrow mb-3">Resource Dispatch</div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none mb-2">
            {currentSubject}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="id-pill">{currentBranch}</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="id-pill">{currentSemester}</span>
          </div>
        </motion.div>

        <ResourceList
          semester={currentSemester}
          branch={currentBranch}
          subject={currentSubject}
        />
      </div>
    </div>
  );
}
