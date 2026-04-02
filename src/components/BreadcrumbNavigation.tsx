import { motion } from "framer-motion";
import { useNavigation } from "@/hooks/useNavigation";
import { Home, ChevronRight } from "lucide-react";
import { Semester, Branch, Subject } from "@shared/schema";

const EASE_OUT = [0.16, 1, 0.3, 1];

export default function BreadcrumbNavigation() {
  const {
    currentSemester,
    currentBranch,
    currentSubject,
    navigateToHome,
    navigateToSemester,
    navigateToBranch,
  } = useNavigation();

  const crumbs = [
    {
      label: "Home",
      icon: Home,
      action: () => navigateToHome(),
      active: !currentBranch,
    },
    currentBranch && {
      label: currentBranch,
      action: () => navigateToBranch(currentBranch as Branch),
      active: !currentSemester,
    },
    currentSemester && {
      label: currentSemester,
      action: () => navigateToSemester(currentSemester as Semester),
      active: !currentSubject,
    },
    currentSubject && {
      label: currentSubject,
      action: null,
      active: true,
    },
  ].filter(Boolean) as any[];

  return (
    <nav className="flex flex-wrap items-center gap-3 mb-8" aria-label="Breadcrumb">
      {/* Syllabus badge */}
      <motion.span
        className="badge-indigo"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        R22 Syllabus
      </motion.span>

      <div className="flex items-center gap-1 flex-wrap">
        {crumbs.map((crumb, i) => {
          const Icon = crumb.icon;
          const isLast = i === crumbs.length - 1;
          return (
            <motion.div
              key={i}
              className="flex items-center gap-1"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: EASE_OUT }}
            >
              {i > 0 && <ChevronRight className="w-3 h-3 text-zinc-600 dark:text-zinc-700 flex-shrink-0" />}

              {isLast ? (
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 line-clamp-1 max-w-[180px]">
                  {Icon ? <Home className="w-3 h-3 inline mr-1" /> : null}
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={(e) => { e.preventDefault(); crumb.action?.(); }}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500
                             hover:text-indigo-600 dark:hover:text-indigo-400
                             transition-colors duration-200 flex items-center gap-1 max-w-[140px]"
                >
                  {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
                  <span className="truncate">{crumb.label}</span>
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}
