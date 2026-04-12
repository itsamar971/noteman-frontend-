import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, AlertCircle } from "lucide-react";
import ExamNavbar from "@/components/layout/ExamNavbar";
import FilterBar from "@/components/ui/FilterBar";
import ResultCard from "@/components/ui/ResultCard";
import { Resource } from "@shared/schema";

export default function ExamSearchPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialQ = searchParams.get("q") || "";
  const initialType = searchParams.get("resourceType") || "";

  const [filters, setFilters] = useState({
    q: initialQ,
    branch: "",
    semester: "",
    resourceType: initialType,
  });

  // Sync state if URL changes (e.g. clicking from Hub)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const type = searchParams.get("resourceType") || "";
    setFilters(prev => ({ ...prev, q, resourceType: type }));
  }, [location]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["/api/resources/search", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.q) params.set("q", filters.q);
      if (filters.branch) params.set("branch", filters.branch);
      if (filters.semester) params.set("semester", filters.semester);
      if (filters.resourceType) params.set("resourceType", filters.resourceType);
      
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/resources/search?${params.toString()}`);
      if (!res.ok) throw new Error("Search failed");
      return res.json() as Promise<{ resources: Resource[]; total: number }>;
    },
  });

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <ExamNavbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar - Filters */}
          <aside className="lg:w-80 shrink-0">
            <FilterBar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Results Area */}
          <div className="flex-grow">
            <div className="mb-8 p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Search className="w-5 h-5 text-amber-500" />
                  {filters.q ? (
                    <span className="text-neutral-400 font-normal">
                      Showing results for <span className="text-white">"{filters.q}"</span>
                    </span>
                  ) : (
                    "Explore Revision Materials"
                  )}
                </h2>
                <p className="text-neutral-500 text-xs mt-1">
                  {data?.total || 0} relative materials found
                </p>
              </div>
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
                  <p className="text-neutral-500 text-sm font-medium">Scanning archives...</p>
                </motion.div>
              ) : isError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-10 rounded-3xl bg-red-500/5 border border-red-500/20 text-center"
                >
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Connection Interrupted</h3>
                  <p className="text-neutral-500 text-sm">We couldn't reach the backend. Please check your internet or try again later.</p>
                </motion.div>
              ) : data?.resources.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center py-32"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-neutral-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No matches found</h3>
                  <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                    Try adjusting your filters or search keywords to broaden your exploration.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {data?.resources.map((resource) => (
                    <ResultCard key={resource.id} resource={resource} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
