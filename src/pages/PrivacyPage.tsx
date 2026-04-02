import { useLocation } from "wouter";
import { ArrowLeft, ShieldCheck, Calendar, Mail, Globe } from "lucide-react";

const sections = [
  {
    id: "1",
    title: "Introduction",
    content: (
      <p className="text-white/60 leading-relaxed">
        NoteMan ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy
        explains what information we collect, how we use it, and what rights you have when you use
        our platform at{" "}
        <a
          href="https://www.noteman.in"
          className="text-violet-400 hover:text-violet-300 transition-colors"
        >
          www.noteman.in
        </a>
        .
      </p>
    ),
  },
  {
    id: "2",
    title: "Information We Collect",
    content: (
      <div className="space-y-5 text-white/60 leading-relaxed">
        <div>
          <p className="font-semibold text-white/80 mb-2">2.1 Information You Do Not Need to Provide</p>
          <ul className="list-none space-y-2 pl-4 border-l border-violet-500/30">
            {[
              "No registration or sign-up is required to access or download content",
              "No account creation means no personal profile data is stored",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white/80 mb-2">2.2 Information Collected Automatically</p>
          <p className="mb-3">When you visit NoteMan, certain technical data may be collected automatically, including:</p>
          <ul className="list-none space-y-2 pl-4 border-l border-violet-500/30">
            {[
              "IP address (anonymized where possible)",
              "Browser type and version",
              "Device type (desktop, mobile, tablet)",
              "Pages visited and content accessed",
              "Date and time of visits",
              "Referring URL (the page you came from)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            This data is collected through standard server logs and/or analytics tools (such as Google
            Analytics or similar) for the sole purpose of understanding platform usage and improving
            performance.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white/80 mb-2">2.3 Download Activity</p>
          <p>
            We may log anonymized records of which files are downloaded to measure content popularity
            and improve our library. No personally identifiable information is linked to download
            activity.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "3",
    title: "Cookies",
    content: (
      <div className="space-y-4 text-white/60 leading-relaxed">
        <p>NoteMan may use cookies and similar tracking technologies to:</p>
        <ul className="list-none space-y-2 pl-4 border-l border-violet-500/30">
          {[
            "Remember user preferences (such as preferred branch or semester filters)",
            "Analyze site traffic and usage patterns",
            "Improve platform performance",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>
          You can disable cookies through your browser settings. Please note that disabling cookies
          may affect some functionality of the site.
        </p>
      </div>
    ),
  },
  {
    id: "4",
    title: "How We Use the Information",
    content: (
      <div className="space-y-4 text-white/60 leading-relaxed">
        <p>We use the collected data to:</p>
        <ul className="list-none space-y-2 pl-4 border-l border-violet-500/30">
          {[
            "Monitor and maintain platform performance and uptime",
            "Identify and fix technical errors",
            "Understand which subjects and materials are most accessed",
            "Improve the overall user experience",
            "Prevent abuse, unauthorized access, or misuse of the platform",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>We do not use your data for advertising, profiling, or any commercial purposes.</p>
      </div>
    ),
  },
  {
    id: "5",
    title: "Data Sharing and Disclosure",
    content: (
      <div className="space-y-4 text-white/60 leading-relaxed">
        <p>We do not sell, trade, or rent any user data to third parties. We may share limited technical data with:</p>
        <ul className="list-none space-y-2 pl-4 border-l border-violet-500/30">
          {[
            "Hosting and infrastructure providers (strictly for operating the platform)",
            "Analytics service providers (in anonymized, aggregated form only)",
            "Law enforcement or regulatory authorities, if required by law",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "6",
    title: "Data Retention",
    content: (
      <p className="text-white/60 leading-relaxed">
        Server logs and anonymized analytics data are retained for a maximum of 90 days, after
        which they are permanently deleted. We do not store any personal user data beyond this
        period.
      </p>
    ),
  },
  {
    id: "7",
    title: "Children's Privacy",
    content: (
      <p className="text-white/60 leading-relaxed">
        NoteMan is intended for engineering students aged 17 and above. We do not knowingly collect
        personal information from children under the age of 13. If you believe we have inadvertently
        collected such information, please contact us and we will delete it immediately.
      </p>
    ),
  },
  {
    id: "8",
    title: "Third-Party Links",
    content: (
      <p className="text-white/60 leading-relaxed">
        NoteMan may contain links to third-party websites or resources (such as external textbook
        repositories or reference sites). We are not responsible for the privacy practices or
        content of those external sites. We encourage you to review their privacy policies
        independently.
      </p>
    ),
  },
  {
    id: "9",
    title: "Security",
    content: (
      <p className="text-white/60 leading-relaxed">
        We take reasonable technical and organizational measures to protect the platform and any
        data we hold from unauthorized access, loss, or misuse. However, no method of internet
        transmission is 100% secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "10",
    title: "Your Rights",
    content: (
      <div className="space-y-4 text-white/60 leading-relaxed">
        <p>Even though NoteMan collects minimal data, you have the right to:</p>
        <ul className="list-none space-y-2 pl-4 border-l border-violet-500/30">
          {[
            "Request information about what data (if any) we hold related to your IP or device",
            "Request deletion of any identifiable data we may have collected",
            "Opt out of analytics tracking (by using browser Do Not Track settings or disabling cookies)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>To exercise any of these rights, contact us at the email below.</p>
      </div>
    ),
  },
  {
    id: "11",
    title: "Changes to This Policy",
    content: (
      <p className="text-white/60 leading-relaxed">
        We may update this Privacy Policy from time to time. Any changes will be reflected on this
        page with an updated effective date. We encourage you to review this page periodically.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero banner */}
      <div className="relative border-b border-white/10 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% -10%, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 flex flex-col gap-6">
          {/* Back button */}
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors w-fit group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to NoteMan
          </button>

          {/* Badge */}
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-violet-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-400">
              Legal
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Privacy{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Policy
              </span>
            </h1>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Effective Date: April 1, 2026
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Last Updated: April 1, 2026
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 md:p-8
                       hover:border-violet-500/20 hover:bg-white/[0.05] transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20
                           flex items-center justify-center text-xs font-black text-violet-400"
              >
                {section.id}
              </span>
              <h2 className="text-lg font-bold text-white pt-1">{section.title}</h2>
            </div>
            <div className="pl-12">{section.content}</div>
          </div>
        ))}

        {/* Contact card */}
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 md:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20
                         flex items-center justify-center text-xs font-black text-violet-400"
            >
              12
            </span>
            <h2 className="text-lg font-bold text-white pt-1">Contact</h2>
          </div>
          <div className="pl-12 space-y-3 text-white/60 leading-relaxed">
            <p>
              If you have any questions, concerns, or requests related to this Privacy Policy,
              please contact us at:
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="mailto:noteman@gmail.com"
                className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors w-fit"
              >
                <Mail className="w-4 h-4" />
                noteman@gmail.com
              </a>
              <a
                href="https://www.noteman.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors w-fit"
              >
                <Globe className="w-4 h-4" />
                www.noteman.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
