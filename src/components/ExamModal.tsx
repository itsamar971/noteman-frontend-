import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Fingerprint } from "lucide-react";
import { useLocation } from "wouter";

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExamModal({ isOpen, onClose }: ExamModalProps) {
  const [, setLocation] = useLocation();

  // Handle ESC key and Body Scroll Lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              className="relative w-full max-w-[350px] p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-[#0a0a0a] via-neutral-900 to-[#4a2e00] ring-1 ring-white/10 overflow-hidden flex flex-col items-center text-center"
            >
              {/* Background Glow Effect inside Modal */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-[#F59E0B] rounded-full blur-[80px] opacity-20 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#111] shadow-[0_0_30px_rgba(245,158,11,0.15)] ring-1 ring-[#F59E0B]/30 mb-6 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
              >
                <Fingerprint className="w-8 h-8 text-[#F59E0B]" strokeWidth={2} />
              </motion.div>

              {/* Title & Description */}
              <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                Exam Mode
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                Enter an immersive, distraction-free environment specifically designed for intense focus and exam preparation.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => {
                  onClose();
                  setLocation("/exam-mode");
                }}
                className="w-full relative group overflow-hidden rounded-xl bg-white text-black font-semibold text-[15px] h-12 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Now
                </span>
                {/* Subtle hover gradient swipe */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
