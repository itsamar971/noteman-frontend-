import { semesters, branches } from "@shared/schema";
import { ChevronDown, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterBarProps {
  filters: {
    branch?: string;
    semester?: string;
    resourceType?: string;
  };
  setFilters: (filters: any) => void;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const resourceTypes = [
    { label: "All Types", value: "" },
    { label: "Formulas", value: "formulas" },
    { label: "Important Questions", value: "important-questions" },
    { label: "Cheat Sheets", value: "cheatsheets" },
    { label: "Rapid Practice", value: "practice" },
  ];

  const clearFilters = () => {
    setFilters({ branch: "", semester: "", resourceType: "" });
  };

  const hasActiveFilters = filters.branch || filters.semester || filters.resourceType;

  return (
    <div className="flex flex-col gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl sticky top-24">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-white font-bold">
          <Filter className="w-4 h-4 text-amber-500" />
          Refine Results
        </div>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Resource Type Filter */}
      <div className="space-y-3">
        <label className="text-[11px] font-black uppercase tracking-[0.08em] text-neutral-500">
          Material Type
        </label>
        <div className="flex flex-wrap gap-2">
          {resourceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilters({ ...filters, resourceType: type.value })}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                ${filters.resourceType === type.value 
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" 
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 border border-white/5"}
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Select Dropdowns (Branch & Semester) */}
      <div className="space-y-4">
        {/* Branch Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-[0.08em] text-neutral-500">
            Engineering Branch
          </label>
          <div className="relative">
            <select
              value={filters.branch || ""}
              onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-neutral-300 outline-none appearance-none cursor-pointer focus:border-amber-500/50 transition-colors"
            >
              <option value="">All Branches</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500 pointer-events-none" />
          </div>
        </div>

        {/* Semester Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-[0.08em] text-neutral-500">
            Academic Semester
          </label>
          <div className="relative">
            <select
              value={filters.semester || ""}
              onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-neutral-300 outline-none appearance-none cursor-pointer focus:border-amber-500/50 transition-colors"
            >
              <option value="">All Semesters</option>
              {semesters.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Premium Tip */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
        <p className="text-[10px] text-amber-500/80 leading-relaxed font-medium">
          PRO TIP: Combine <strong>Branch</strong> and <strong>Type</strong> to find exactly what you need for the upcoming finals.
        </p>
      </div>
    </div>
  );
}
