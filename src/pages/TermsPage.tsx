import { useLocation } from "wouter";
import { ArrowLeft, Scale, Calendar, Mail, Globe } from "lucide-react";

const sections = [
  {
    id: "1",
    title: "About NoteMan",
    content: (
      <p className="text-white/60 leading-relaxed">
        NoteMan ("we", "us", "our") is a free, open-source platform designed to help engineering
        students access study materials, lecture notes, and textbooks across all branches, years,
        semesters, and subjects. By accessing or using NoteMan, you ("user", "student") agree to
        these Terms and Conditions in full.
      </p>
    ),
  },
  {
    id: "2",
    title: "Acceptance of Terms",
    content: (
      <p className="text-white/60 leading-relaxed">
        By visiting, browsing, or downloading any content from NoteMan, you confirm that you have
        read, understood, and agreed to be bound by these Terms. If you do not agree, please do
        not use this platform.
      </p>
    ),
  },
  {
    id: "3",
    title: "Eligibility",
    content: (
      <p className="text-white/60 leading-relaxed">
        NoteMan is intended for use by students, educators, and academic institutions. You must be
        at least 13 years of age to use this platform. By using NoteMan, you represent that you
        meet this requirement.
      </p>
    ),
  },
  {
    id: "4",
    title: "Use of the Platform",
    content: (
      <div className="space-y-4 text-white/60 leading-relaxed">
        <p>4.1 NoteMan is a read-only platform for general users. Students and visitors can browse, view, and download available study materials.</p>
        <p>4.2 General users do not have access to any administrative panel, content management system, or backend features. Administrative access is strictly limited to authorized personnel only.</p>
        <p>4.3 You agree not to:</p>
        <ul className="list-none space-y-2 pl-4 border-l border-violet-500/30">
          {[
            "Attempt to gain unauthorized access to any administrative or backend systems",
            "Reverse engineer, scrape, or automate mass downloads of content",
            "Use the platform for any commercial purpose without written permission",
            "Upload, submit, or inject any malicious code or unauthorized content",
            "Misrepresent the source or ownership of any material obtained from NoteMan",
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
    id: "5",
    title: "Content and Intellectual Property",
    content: (
      <div className="space-y-3 text-white/60 leading-relaxed">
        <p>5.1 NoteMan hosts study materials, notes, and textbooks that may include content uploaded by contributors or sourced from publicly available academic resources.</p>
        <p>5.2 We do not claim ownership over third-party copyrighted materials. If any content is believed to infringe on intellectual property rights, please contact us and we will take appropriate action promptly.</p>
        <p>5.3 Original content, design, and code created by the NoteMan team is open-source and made available under the applicable open-source license (refer to our GitHub repository for license details).</p>
        <p>5.4 Users are permitted to download and use materials for personal, non-commercial academic purposes only.</p>
      </div>
    ),
  },
  {
    id: "6",
    title: "Disclaimer of Warranties",
    content: (
      <div className="space-y-4 text-white/60 leading-relaxed">
        <p>NoteMan is provided "as is" and "as available" without any warranties, express or implied. We do not guarantee:</p>
        <ul className="list-none space-y-2 pl-4 border-l border-violet-500/30">
          {[
            "The accuracy, completeness, or relevance of any study material",
            "Uninterrupted or error-free access to the platform",
            "That downloaded materials will be free from defects",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>Use of any study material for examination preparation is at your own discretion and risk.</p>
      </div>
    ),
  },
  {
    id: "7",
    title: "Limitation of Liability",
    content: (
      <p className="text-white/60 leading-relaxed">
        To the maximum extent permitted by applicable law, NoteMan and its contributors shall not
        be liable for any direct, indirect, incidental, or consequential damages arising out of
        your use of or inability to use the platform, including but not limited to exam outcomes,
        academic performance, or data loss.
      </p>
    ),
  },
  {
    id: "8",
    title: "Copyright Infringement (DMCA / Takedown Requests)",
    content: (
      <div className="space-y-4 text-white/60 leading-relaxed">
        <p>If you are a copyright owner and believe that content hosted on NoteMan infringes your rights, please send a written notice to our contact email with the following:</p>
        <ul className="list-none space-y-2 pl-4 border-l border-violet-500/30">
          {[
            "Your name and contact details",
            "Identification of the copyrighted work",
            "URL or location of the infringing material",
            "A statement of good faith belief that the use is unauthorized",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>We will review and act on valid requests within a reasonable timeframe.</p>
      </div>
    ),
  },
  {
    id: "9",
    title: "Changes to Terms",
    content: (
      <p className="text-white/60 leading-relaxed">
        We reserve the right to modify these Terms at any time. Changes will be posted on this
        page with an updated effective date. Continued use of the platform after changes
        constitutes your acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: "10",
    title: "Governing Law",
    content: (
      <p className="text-white/60 leading-relaxed">
        These Terms shall be governed by and construed in accordance with the laws of India. Any
        disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana,
        India.
      </p>
    ),
  },
];

export default function TermsPage() {
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
            <Scale className="w-4 h-4 text-violet-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-400">
              Legal
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Terms &amp;{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Conditions
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
        <div
          className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 md:p-8 space-y-4"
        >
          <div className="flex items-start gap-4">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20
                         flex items-center justify-center text-xs font-black text-violet-400"
            >
              11
            </span>
            <h2 className="text-lg font-bold text-white pt-1">Contact</h2>
          </div>
          <div className="pl-12 space-y-3 text-white/60 leading-relaxed">
            <p>For any queries, DMCA notices, or concerns regarding these Terms, reach us at:</p>
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
