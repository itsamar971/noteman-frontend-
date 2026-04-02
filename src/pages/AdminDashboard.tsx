import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  Plus,
  TrendingUp,
  FileText,
  Eye,
  LogOut,
  BookOpen,
  Activity,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AddPdfModal from "@/components/modals/AddPdfModal";
import { useToast } from "@/hooks/use-toast";

const SPRING = { type: "spring", stiffness: 280, damping: 22 };
const EASE_OUT = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export default function AdminDashboard() {
  const { user, logout, isAdmin, loading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: trending, isLoading: trendingLoading } = useQuery<any[]>({
    queryKey: ["/api/analytics/top"],
    queryFn: () => apiRequest("GET", "/api/analytics/top?limit=5").then(r => r.json()),
    enabled: !loading && isAdmin,
  });
  const { data: allResources, isLoading: statsLoading } = useQuery<any[]>({
    queryKey: ["/api/resources"],
    queryFn: () => apiRequest("GET", "/api/resources").then((r) => r.json()),
    enabled: !loading && isAdmin,
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      setLocation("/login");
    }
  }, [loading, isAdmin, setLocation]);

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  const totalResources = Array.isArray(allResources) ? allResources.length : 0;
  const totalViews     = Array.isArray(allResources) ? allResources.reduce((a, c) => a + (c.viewCount || 0), 0) : 0;

  const stats = [
    {
      label: "Total Resources",
      value: totalResources,
      icon: FileText,
      color: "bg-indigo-500/15 text-indigo-400",
      badge: "Indexed",
      badgeColor: "badge-indigo",
      loading: statsLoading,
    },
    {
      label: "Total Engagement",
      value: totalViews,
      icon: Eye,
      color: "bg-purple-500/15 text-purple-400",
      badge: "Live",
      badgeColor: "badge-indigo",
      loading: statsLoading,
    },
    {
      label: "System Status",
      value: "ONLINE",
      icon: Activity,
      color: "bg-emerald-500/15 text-emerald-400",
      badge: "Operational",
      badgeColor: "badge-emerald",
      loading: false,
      isStatus: true,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[500px]"
           style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-16 relative z-10">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* ============ HEADER ============ */}
          <motion.div variants={itemVariants}>
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-[2rem] p-6 relative overflow-hidden">
              {/* Glow blob */}
              <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
                {/* Left: Identity */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500/15 border border-indigo-500/25 rounded-2xl flex items-center justify-center">
                    <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <div className="eyebrow mb-1">Control Matrix</div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">
                      Admin Dashboard
                    </h1>
                    <p className="text-zinc-500 text-xs font-medium mt-0.5">
                      Welcome back, <span className="text-zinc-300 font-bold">{(user as any)?.username || 'Administrator'}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-brand flex items-center gap-2 text-xs"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING}
                  >
                    <Plus className="w-4 h-4" />
                    Add Resource
                  </motion.button>
                  <motion.button
                    onClick={() => logout()}
                    className="w-11 h-11 rounded-xl border border-zinc-800 flex items-center justify-center
                               text-zinc-500 hover:text-red-400 hover:border-red-500/30
                               transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={SPRING}
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ============ STATS ============ */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  className="stat-card"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={SPRING}
                >
                  {/* Glow blob */}
                  <div className="glow-blob opacity-50" />

                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={s.badgeColor}>
                      {s.badge}
                    </span>
                  </div>

                  <div className="relative z-10">
                    {s.loading ? (
                      <Skeleton className="h-9 w-20 bg-zinc-800 mb-1" />
                    ) : s.isStatus ? (
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-black tabular-nums tracking-tighter text-white">{s.value}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                      </div>
                    ) : (
                      <div className="text-3xl font-black tabular-nums tracking-tighter text-white">{s.value}</div>
                    )}
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 mt-1">{s.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ============ CONTENT ============ */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >

            {/* Trending list */}
            <div className="lg:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="eyebrow mb-1">Analytics Node</div>
                  <h2 className="text-xl font-black uppercase tracking-tighter text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    Top Resources
                  </h2>
                </div>
              </div>

              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden divide-y divide-zinc-800/60">
                {trendingLoading ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="p-5 flex items-center gap-4">
                      <Skeleton className="w-10 h-10 rounded-2xl bg-zinc-800" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/2 bg-zinc-800" />
                        <Skeleton className="h-3 w-1/4 bg-zinc-800" />
                      </div>
                    </div>
                  ))
                ) : trending && trending.length > 0 ? (
                  trending.map((resource, i) => (
                    <motion.div
                      key={resource.id}
                      className="p-5 flex items-center justify-between group hover:bg-zinc-800/30 transition-colors duration-200"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: EASE_OUT }}
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <span className="text-[10px] font-black text-zinc-700 tabular-nums w-4 text-center">
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          resource.category === 'exam'
                            ? 'bg-indigo-500/15 text-indigo-400'
                            : 'bg-purple-500/15 text-purple-400'
                        }`}>
                          {resource.category === 'exam'
                            ? <FileText className="w-4 h-4" />
                            : <BookOpen className="w-4 h-4" />
                          }
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                            {resource.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-zinc-600 text-[10px] font-medium">{resource.subject}</span>
                            <span className="text-zinc-800">·</span>
                            <span className={`text-[8px] font-black uppercase tracking-widest ${
                              resource.category === 'exam' ? 'text-indigo-600' : 'text-purple-600'
                            }`}>
                              {resource.category === 'exam' ? 'PDF' : 'Textbook'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 text-white font-black text-sm tabular-nums">
                          <Eye className="w-3 h-3 text-zinc-600" />
                          {resource.viewCount || 0}
                        </div>
                        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-700 mt-0.5">Clicks</div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-16 text-center">
                    <Zap className="w-8 h-8 text-zinc-800 mx-auto mb-3" />
                    <p className="text-zinc-700 text-xs font-bold uppercase tracking-widest">No data synced yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Quick Guide */}
              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
                <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-indigo-500/8 blur-[60px] rounded-full" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-32 h-32 bg-purple-500/8 blur-[60px] rounded-full" />

                <div className="relative z-10">
                  <div className="eyebrow mb-3">Dispatch Guide</div>
                  <h3 className="text-base font-black uppercase tracking-tight text-white mb-3">
                    Upload Protocol
                  </h3>
                  <p className="text-zinc-500 text-xs font-medium leading-relaxed mb-4">
                    Resources added here are immediately available to students in their respective semesters.
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Verify PDF quality before sync",
                      "Ensure correct subject tagging",
                      "Keep titles descriptive for indexing",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-zinc-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.5)] flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Manage Categories */}
              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6">
                <div className="eyebrow mb-3">Provision</div>
                <h3 className="text-base font-black uppercase tracking-tight text-white mb-4">
                  Manage Categories
                </h3>
                <div className="space-y-1.5">
                  {[
                    { label: "Manage PDFs", icon: FileText, color: "text-indigo-400", path: "/admin/manage-resources" },
                    { label: "Textbooks",   icon: BookOpen,  color: "text-purple-400" },
                    { label: "Branch Settings", icon: Zap,  color: "text-emerald-400" },
                  ].map(({ label, icon: Icon, color, path }) => (
                    <motion.button
                      key={label}
                      onClick={() => {
                        if (path) setLocation(path);
                        else {
                          toast({ title: "Coming Soon", description: `${label} module is being initialized.` });
                        }
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl
                                 border border-transparent hover:border-zinc-700
                                 hover:bg-zinc-800/50 transition-all duration-200 group"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-xs font-bold text-zinc-300 group-hover:text-white uppercase tracking-wide transition-colors">{label}</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <AddPdfModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        semester=""
        branch=""
        subject=""
      />
    </div>
  );
}
