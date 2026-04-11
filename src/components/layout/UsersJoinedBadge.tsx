import { Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const POLL_INTERVAL_MS = 3000;

export default function UsersJoinedBadge() {
  const [count, setCount] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function trackVisit() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visit`, {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCount(data.joinedUsers);
        }
      } catch {
        /* silent */
      }
    }

    trackVisit();

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stats`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setCount(data.joinedUsers);
        }
      } catch {
        /* noop */
      }
    }, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatted = count !== null ? count.toLocaleString("en-IN") : "…";

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-6 z-[60] animate-in slide-in-from-bottom-5 fade-in duration-500 scale-90 sm:scale-100 origin-bottom-left">
      <div className="group relative flex items-center bg-[#0a0a0a] rounded-full border border-[#F59E0B]/50 pr-3 sm:pr-4 h-[40px] sm:h-[44px] shadow-[0_4px_20px_rgba(0,0,0,0.8)]">

        {/* The Solid Orange Circle — flush left, same as ExamBanner */}
        <div className="relative w-[44px] h-[44px] rounded-full flex items-center justify-center bg-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.3)] z-10 flex-shrink-0 -ml-[1px]">
          <Users className="w-5 h-5 text-[#0a0a0a]" strokeWidth={2.5} />
        </div>

        {/* Text stack — same as ExamBanner */}
        <div className="flex flex-col ml-2 z-10 justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.06em] text-[#F59E0B] leading-none mb-1">
            USERS JOINED
          </span>
          <span className="text-sm font-bold text-white tracking-tight leading-none tabular-nums">
            {formatted}
          </span>
        </div>
      </div>
    </div>
  );
}
