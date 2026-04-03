import { motion } from "framer-motion";
import { Download, FileText, Database, Book, Calendar, Loader2 } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const getIcon = (category: string) => {
  switch (category) {
    case "textbook":
      return Book;
    case "exam":
      return FileText;
    default:
      return Database;
  }
};

export default function RecentlyAddedCarousel() {
  const { toast } = useToast();
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ["/api/resources/recent"],
    queryFn: async () => {
      // Just fetch all and take the latest 10 since no dedicated /recent route was exposed for unauthenticated
      const res = await apiRequest("GET", "/api/resources");
      const all = await res.json();
      return all
        .sort((a: any, b: any) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
        .slice(0, 10);
    },
  });

  const handleDownload = async (resource: any) => {
    try {
      await apiRequest("POST", `/api/resources/${resource.id}/view`);
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

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-24 py-12 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error || !resources || resources.length === 0) {
    return null; // hide quietly if no data just in case
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-24">
      <div className="flex items-center justify-between px-6 lg:px-12 mb-10">
        <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight flex items-center gap-3">
          Recently Added
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </h3>
      </div>
      
      <div className="overflow-hidden px-6 lg:px-12 pb-12" ref={emblaRef}>
        <div className="flex gap-6 relative">
          {resources.map((item: any, idx: number) => {
            const Icon = getIcon(item.category);
            const dateStr = item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "New";
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_28%] min-w-0"
              >
                <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 h-full flex flex-col group hover:border-indigo-500/40 hover:bg-[#151515] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden">
                  
                  {/* Subtle top glow ring inside card */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900 border border-white/5 px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {dateStr}
                    </span>
                  </div>
                  
                  <h4 className="text-base font-bold text-white mb-3 line-clamp-2 min-h-[48px] leading-relaxed group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-md uppercase tracking-wider line-clamp-1">
                      {item.branch}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleDownload(item)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-zinc-100 hover:text-black hover:border-transparent transition-all active:scale-95 group-hover:shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    Download File
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
