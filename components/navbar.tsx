"use client";

import { Mail } from "lucide-react";

export default function Navbar() {
  const scrollToSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("join-beta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Mail className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Zipply</span>
        </div>

        <button
          onClick={scrollToSignup}
          className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-full transition-all duration-200 hover:text-blue-400 hover:bg-blue-400 transition ease-in-out duration-500 hover:cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}
