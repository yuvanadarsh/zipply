"use client";

import { useState } from "react";
import { Mail, LogOut } from "lucide-react";
import { useAuth } from "./auth-provider";
import AuthModal from "./auth-modal";

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Mail className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              <a href="/">Zipply</a>
            </span>
          </div>

          <a
            href="https://blog.zipply.dev"
            rel="noopener noreferrer"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-slate-300 hover:text-blue-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Blog
          </a>

          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {user.avatar_url && <img src={user.avatar_url} alt={user.full_name || "User"} className="w-8 h-8 rounded-full border border-slate-700" />}
                    <span className="text-sm text-slate-300 hidden sm:block">{user.full_name || user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-full transition-all duration-200 hover:text-red-400 hover:bg-red-400/10 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-full transition-all duration-200 hover:text-blue-400 hover:bg-blue-400/10"
                >
                  Sign In
                </button>
              )}
            </>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
