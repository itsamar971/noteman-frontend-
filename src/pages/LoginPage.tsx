import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Lock, ChevronLeft, Eye, EyeOff } from "lucide-react";

const EASE_OUT = [0.16, 1, 0.3, 1];

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithCredentials, loading } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await loginWithCredentials(username, password);
    if (success) {
      setLocation("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-purple-500/8 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Back button */}
      <motion.button
        className="absolute top-6 left-6 flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-200"
        onClick={() => setLocation("/")}
        whileHover={{ x: -3 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </motion.button>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        {/* Card */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-zinc-950">

          {/* Header */}
          <div className="relative p-8 pb-6 border-b border-zinc-800">
            {/* Glow blob */}
            <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full" />

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT }}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-indigo-500/15 border border-indigo-500/25 rounded-2xl flex items-center justify-center mb-5">
                <Lock className="w-5 h-5 text-indigo-400" />
              </div>

              {/* Eyebrow */}
              <div className="eyebrow mb-3" style={{ color: '#818CF8' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_6px_rgba(129,140,248,0.6)]" />
                Admin Auth Node
              </div>

              <h1 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">
                System<br />Access
              </h1>
              <p className="text-zinc-500 text-sm font-medium mt-2">
                Authorized administrators only.
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: EASE_OUT }}
          >
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500"
                >
                  Username / ID
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800
                             focus:border-indigo-500/50 focus:outline-none
                             rounded-xl h-12 px-4
                             text-white font-bold text-sm
                             placeholder:text-zinc-700 placeholder:font-normal
                             transition-colors duration-200"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800
                               focus:border-indigo-500/50 focus:outline-none
                               rounded-xl h-12 px-4 pr-12
                               text-white font-bold text-sm
                               placeholder:text-zinc-700 placeholder:font-normal
                               transition-colors duration-200"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl font-black uppercase tracking-wide text-xs
                           bg-gradient-to-r from-indigo-600 to-purple-600
                           hover:from-indigo-500 hover:to-purple-500
                           text-white shadow-lg shadow-indigo-500/20
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  "Login to Dashboard"
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-700">
              Restricted · Admin Access Only
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
