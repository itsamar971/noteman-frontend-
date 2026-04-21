import { useLocation } from "wouter";
import { useNavigation } from "@/hooks/useNavigation";
import { Github, Twitter, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const [location, setLocation] = useLocation();
  const { navigateToHome } = useNavigation();

  // Hide footer completely on login and admin pages
  if (location === "/login" || location.startsWith("/admin")) return null;

  const isHome = location === "/";

  const socialLinks = [
    { icon: Twitter,   label: "X (Twitter)", href: "https://x.com/NoteMannn" },
    { icon: Instagram, label: "Instagram",   href: "https://www.instagram.com/_noteman__?igsh=MXhkY2xoaDV5YW54NQ==" },
  ];

  const legalLinks = [
    { label: "About Us",          href: "/about" },
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-16 pt-16 pb-6">
      {!isHome && <div className="hidden" />} {/* Small trick to satisfy unused isHome if needed */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Column 1 - Brand */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigateToHome()}
            className="text-violet-500 font-black text-2xl tracking-tight hover:text-violet-400 transition-colors w-fit"
          >
            NoteMan
          </button>
          <div className="text-white/60 text-sm leading-relaxed space-y-2">
            <p className="font-semibold text-white/80">Built by students, for students.</p>
          </div>
          <div className="flex items-center gap-4 pt-2">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/30 hover:text-white transition-transform hover:-translate-y-1 duration-200 inline-block"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold tracking-wide">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            <li><button onClick={() => setLocation("/")} className="text-white/50 text-sm hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => setLocation("/about")} className="text-white/50 text-sm hover:text-white transition-colors">About Us</button></li>
            <li><button onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSctIIgnPikT8HukJTp_pApE35JH6x8HhTw8jeB9JIHV_lZJTg/viewform?usp=dialog", "_blank")} className="text-white/50 text-sm hover:text-white transition-colors">Contact Us</button></li>
            <li><button onClick={() => setLocation("/contribute")} className="text-white/50 text-sm hover:text-white transition-colors">Contribute</button></li>
          </ul>
        </div>

        {/* Column 3 - Legal & Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold tracking-wide">Legal & Info</h4>
          <ul className="flex flex-col gap-3">
            <li><button onClick={() => setLocation("/terms")} className="text-white/50 text-sm hover:text-white transition-colors">Terms & Conditions</button></li>
            <li><button onClick={() => setLocation("/privacy")} className="text-white/50 text-sm hover:text-white transition-colors">Privacy Policy</button></li>
            <li className="text-white/50 text-sm cursor-default flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> R22 Syllabus Supported</li>
            <li className="text-white/50 text-sm cursor-default flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> JNTU Hyderabad</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-medium text-center md:text-left">
            © 2026 NoteMan. Open Source. Free Forever.
          </p>
          <p className="text-white/40 text-sm font-medium text-center md:text-right">
            Made with ♥ from trovofi in India
          </p>
        </div>
      </div>
    </footer>
  );
}
