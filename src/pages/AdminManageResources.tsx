import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  ChevronLeft, 
  Trash2, 
  Search, 
  Filter, 
  FileText, 
  BookOpen, 
  ExternalLink,
  Loader2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import CustomSelect from "@/components/ui/CustomSelect";

const EASE_OUT = [0.16, 1, 0.3, 1];

export default function AdminManageResources() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Fetch all resources
  const { data: resources, isLoading, error } = useQuery<any[]>({
    queryKey: ["/api/resources"],
    queryFn: () => apiRequest("GET", "/api/resources").then(r => r.json()),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/resources/${id}`);
      if (!response.ok) throw new Error("Failed to delete resource");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/top"] });
      toast({
        title: "Resource Deleted",
        description: "The resource has been permanently removed from the system.",
      });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "There was an error trying to delete this resource.",
        variant: "destructive",
      });
    }
  });

  const filteredResources = resources?.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      {/* Header Section */}
      <div className="border-b border-zinc-800 bg-zinc-900/30 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation("/admin/dashboard")}
              className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <div>
              <div className="eyebrow mb-1">Database Node</div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">Manage Resources</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl h-10 pl-10 pr-4 text-sm focus:border-indigo-500/50 outline-none transition-colors"
              />
            </div>
            <CustomSelect 
              value={categoryFilter}
              onChange={(value) => setCategoryFilter(value)}
              options={[
                { label: "All Types", value: "all" },
                { label: "PDFs", value: "exam" },
                { label: "Textbooks", value: "textbook" },
              ]}
              className="w-40"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-3xl bg-zinc-900" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-bold uppercase tracking-widest text-xs">Failed to load resource matrix</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-6">
              <Search className="w-8 h-8 opacity-20" />
            </div>
            <p className="font-bold uppercase tracking-widest text-xs">Zero matching sequences identified</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-5 hover:border-zinc-700 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      resource.category === 'exam' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-purple-500/10 text-purple-400'
                    }`}>
                      {resource.category === 'exam' ? <FileText className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                    </div>
                    <div className="flex items-center gap-2">
                       <a 
                        href={resource.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-white"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button 
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this resource? This action cannot be undone.")) {
                            deleteMutation.mutate(resource.id);
                          }
                        }}
                        className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 text-zinc-500 hover:text-red-400 transition-all"
                      >
                        {deleteMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{resource.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700/50">
                        {resource.branch}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700/50">
                        Sem {resource.semester?.replace('Semester', '')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
