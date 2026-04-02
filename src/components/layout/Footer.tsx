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
    { icon: Twitter,   label: "X (Twitter)", href: "#" },
    { icon: Instagram, label: "Instagram",   href: "#" },
    { icon: Linkedin,  label: "LinkedIn",    href: "#" },
    { icon: Github,    label: "GitHub",      href: "https://github.com" },
  ];

  const legalLinks = [
    { label: "About Us",          href: "/about" },
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-16">
      {/* Main footer body - Only shown on Home Page */}
      {isHome && (
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ── LEFT: Brand + Info ── */}
          <div className="flex flex-col gap-5">
            {/* Brand */}
            <button
              onClick={() => navigateToHome()}
              className="text-violet-500 font-black text-2xl tracking-tight hover:text-violet-400 transition-colors w-fit"
            >
              NoteMan
            </button>

            {/* Company blurb */}
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Your one-stop academic resource hub.<br />
              Built for students, by students.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-2.5 text-white/40 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-violet-500/70" />
                Hyderabad, India
              </span>
              <a
                href="mailto:noteman@gmail.com"
                className="flex items-center gap-2 hover:text-white/70 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-violet-500/70" />
                noteman@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-1">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/30 hover:text-white transition-colors duration-200 hover:scale-110 active:scale-95 inline-block"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Legal & Policies ── */}
          <div className="flex flex-col gap-4 md:items-end">
            <p className="text-white font-bold text-sm tracking-wide">Legal & Policies</p>
            <ul className="flex flex-col gap-3 md:items-end">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => setLocation(href)}
                    className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Bottom bar - Always shown ── */}
      <div className={isHome ? "border-t border-white/10" : ""}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} NoteMan. All rights reserved.
          </p>
          <p className="text-white/20 text-xs text-center sm:text-right">
            Made with ♥ from trovofi in India · Data stored in India
          </p>
        </div>
      </div>
    </footer>
  );
}
