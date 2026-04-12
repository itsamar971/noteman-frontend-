import { Resource } from "@shared/schema";
import { FileText, Download, Eye, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface ResultCardProps {
  resource: Resource;
}

export default function ResultCard({ resource }: ResultCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        {/* Icon Type */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
          <FileText className="w-5 h-5" />
        </div>

        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-500">
              {resource.resourceType || "General"}
            </span>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tight">
              {resource.branch}
            </span>
          </div>
          
          <h3 className="text-white font-bold text-base mb-1 line-clamp-1 group-hover:text-amber-500 transition-colors">
            {resource.title}
          </h3>
          <p className="text-neutral-400 text-xs mb-4 line-clamp-2">
            {resource.subject} • {resource.semester}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-medium">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {formatFileSize(resource.fileSize)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {resource.viewCount} Views
              </span>
            </div>

            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-amber-500 hover:text-black rounded-lg transition-all duration-300 shadow-xl"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
