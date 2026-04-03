import { Fingerprint } from "lucide-react";
import { useLocation } from "wouter";

export default function ExamBanner() {
  const [, setLocation] = useLocation();

  return (
    <div className="fixed bottom-8 right-6 z-[60] animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div 
        onClick={() => setLocation("/exam-mode")}
        className="group relative flex items-center bg-[#0a0a0a] rounded-full border border-[#F59E0B]/50 pr-6 h-[44px] cursor-pointer hover:bg-[#111] transition-all hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
      >
        {/* Animated Background Ripple Rings */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[44px] h-[44px] z-0 pointer-events-none">
          {/* Ring 1 */}
          <div className="absolute w-11 h-11 rounded-full bg-[#F59E0B]/40 animate-[ping_3s_ease-out_infinite]"></div>
          {/* Ring 2 */}
          <div 
            className="absolute w-11 h-11 rounded-full bg-[#F59E0B]/30 animate-[ping_3s_ease-out_infinite]" 
            style={{ animationDelay: '1.5s' }}
          ></div>
          {/* Static Soft Glow */}
          <div className="absolute w-[68px] h-[68px] rounded-full bg-[#F59E0B]/10"></div>
        </div>

        {/* The Solid Orange Circle (Flushed perfectly to the left) */}
        <div className="relative w-[44px] h-[44px] rounded-full flex items-center justify-center bg-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.3)] z-10 flex-shrink-0 -ml-[1px]">
          <Fingerprint className="w-5 h-5 text-[#0a0a0a]" strokeWidth={2.5} />
        </div>

        {/* Text stack */}
        <div className="flex flex-col ml-3 z-10 justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.06em] text-[#F59E0B] leading-none mb-1">
            EXAM
          </span>
          <span className="text-sm font-bold text-white tracking-tight leading-none">
            Start Here
          </span>
        </div>
      </div>
    </div>
  );
}
