import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ResourceItem from "@/components/ResourceItem";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, FileText, Zap } from "lucide-react";

const EASE_OUT = [0.16, 1, 0.3, 1];

interface ResourceListProps {
  semester: string;
  branch: string;
  subject: string;
}

function SectionHeading({ icon: Icon, label, count, color }: { icon: any; label: string; count: number; color: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[8px] font-black uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-600">Resource Node</div>
          <h3 className="text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-none">{label}</h3>
        </div>
      </div>
      {count > 0 && (
        <span className="badge-indigo">{count} items</span>
      )}
    </div>
  );
}

export default function ResourceList({ semester, branch, subject }: ResourceListProps) {
  const [examPdfs, setExamPdfs] = useState<any[]>([]);
  const [textbooks, setTextbooks] = useState<any[]>([]);

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ["/api/resources/filter", { semester, branch, subject }],
    queryFn: () =>
      fetch(`/api/resources/filter?semester=${encodeURIComponent(semester)}&branch=${encodeURIComponent(branch)}&subject=${encodeURIComponent(subject)}`)
        .then(r => r.json()),
  });

  useEffect(() => {
    if (Array.isArray(resources)) {
      setExamPdfs(resources.filter((r: any) => r.category === "exam"));
      setTextbooks(resources.filter((r: any) => r.category === "textbook"));
    }
  }, [resources]);

  const SkeletonSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
      ))}
    </div>
  );

  const EmptyState = ({ label }: { label: string }) => (
    <div className="py-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
      <Zap className="w-7 h-7 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">No {label} indexed yet</p>
    </div>
  );

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {/* PDFs */}
      <div>
        <SectionHeading
          icon={FileText}
          label="PDFs"
          count={examPdfs.length}
          color="bg-indigo-500/10 text-indigo-500"
        />
        {isLoading ? (
          <SkeletonSection />
        ) : error ? (
          <p className="text-center text-red-500 text-xs font-bold uppercase tracking-widest">Failed to load PDFs</p>
        ) : examPdfs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examPdfs.map((pdf, i) => (
              <ResourceItem key={pdf.id} resource={pdf} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState label="PDFs" />
        )}
      </div>

      {/* Textbooks */}
      <div>
        <SectionHeading
          icon={BookOpen}
          label="Textbooks"
          count={textbooks.length}
          color="bg-purple-500/10 text-purple-500"
        />
        {isLoading ? (
          <SkeletonSection />
        ) : error ? (
          <p className="text-center text-red-500 text-xs font-bold uppercase tracking-widest">Failed to load textbooks</p>
        ) : textbooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {textbooks.map((book, i) => (
              <ResourceItem key={book.id} resource={book} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState label="textbooks" />
        )}
      </div>
    </motion.div>
  );
}
