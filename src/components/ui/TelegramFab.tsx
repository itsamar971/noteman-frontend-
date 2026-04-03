import { useEffect, useState } from "react";
import { Send } from "lucide-react";

export default function TelegramFab() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show FAB after slight scroll for better UX
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <div className="group relative flex items-center justify-center">
        {/* Tooltip */}
        <div className="absolute right-full mr-4 px-3 py-1.5 bg-zinc-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-xl">
          Join our Telegram for updates
          {/* Tooltip Arrow */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-zinc-800"></div>
        </div>

        {/* Button */}
        <a 
          href="#"
          className="flex items-center justify-center w-14 h-14 bg-[#2AABEE] text-white rounded-full shadow-[0_0_20px_rgba(42,171,238,0.3)] hover:shadow-[0_0_25px_rgba(42,171,238,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300"
          aria-label="Join Community"
        >
          <Send className="w-6 h-6 ml-[-2px] mt-[2px]" />
        </a>
      </div>
    </div>
  );
}
