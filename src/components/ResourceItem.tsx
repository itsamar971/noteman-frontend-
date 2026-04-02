import { motion } from "framer-motion";
import { useState } from "react";
import { Download, Eye, FileText, Calendar, Hash } from "lucide-react";
import PdfViewerModal from "@/components/modals/PdfViewerModal";
import { useToast } from "@/hooks/use-toast";
import { Resource } from "@shared/schema";

const SPRING = { type: "spring", stiffness: 280, damping: 22 };
const EASE_OUT = [0.16, 1, 0.3, 1];

interface ResourceItemProps {
  resource: Resource;
  index?: number;
}

export default function ResourceItem({ resource, index = 0 }: ResourceItemProps) {
  const { toast } = useToast();
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  const formattedDate = resource.uploadedAt
    ? new Date(resource.uploadedAt).toLocaleDateString("en-US", { year: "2-digit", month: "short", day: "numeric" })
    : "Unknown";

  const incrementView = async () => {
    try { await fetch(`/api/resources/${resource.id}/view`, { method: "POST" }); } catch {}
  };

  const handleDownload = () => {
    try {
      incrementView();
      if (!resource.fileUrl) throw new Error("Resource URL not found");
      const link = document.createElement("a");
      link.href = resource.fileUrl;
      link.download = resource.fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Download started", description: `Downloading ${resource.title}` });
    } catch (error: any) {
      toast({ title: "Download failed", description: error.message, variant: "destructive" });
    }
  };

  const handleView = () => { incrementView(); setIsPdfViewerOpen(true); };

  const sizeLabel = resource.pages && resource.pages > 0
    ? `${resource.pages} pp.`
    : `${(resource.fileSize / 1024 / 1024).toFixed(1)} MB`;

  return (
    <>
      <motion.div
        className="glass-card rounded-2xl p-5 group relative overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ delay: index * 0.06, duration: 0.5, ease: EASE_OUT }}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Glow blob */}
        <div className="glow-blob opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ width: 100, height: 100 }} />

        <div className="flex items-start gap-4 relative z-10">
          {/* Icon */}
          <div className="w-10 h-10 flex-shrink-0 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center
                          transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]">
            <FileText className="w-4 h-4 text-indigo-500" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-black text-zinc-900 dark:text-white line-clamp-1
                           group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {resource.title}
            </h4>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
              {resource.category === "textbook" && resource.author && (
                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-600 truncate">
                  {resource.author}
                </span>
              )}
              <span className="flex items-center gap-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-600">
                <Hash className="w-2.5 h-2.5" />
                {sizeLabel}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-600">
                <Calendar className="w-2.5 h-2.5" />
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 flex-shrink-0">
            <motion.button
              className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20
                         flex items-center justify-center text-indigo-500
                         hover:bg-indigo-500/20 transition-colors duration-200"
              onClick={handleDownload}
              title="Download"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={SPRING}
            >
              <Download className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20
                         flex items-center justify-center text-purple-500
                         hover:bg-purple-500/20 transition-colors duration-200"
              onClick={handleView}
              title="View"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={SPRING}
            >
              <Eye className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <PdfViewerModal
        isOpen={isPdfViewerOpen}
        onClose={() => setIsPdfViewerOpen(false)}
        resourceId={resource.id}
        title={resource.title}
      />
    </>
  );
}
