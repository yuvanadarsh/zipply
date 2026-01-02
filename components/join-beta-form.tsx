"use client";

import { useActionState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { submitBetaSignup, type FormState } from "@/actions/submit-beta-signup";

const initialState: FormState = {
  status: "idle",
  message: "",
};

export default function JoinBetaForm() {
  const [state, formAction, isPending] = useActionState(submitBetaSignup, initialState);

  // We want to keep the success state visible

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up delay-300">
      {state.status === "success" ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center shadow-lg backdrop-blur-sm">
          <div className="flex justify-center mb-3">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
          <p className="text-emerald-100">{state.message}</p>
        </div>
      ) : (
        <form action={formAction} className="relative group">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-3 h-12 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
              required
              disabled={isPending}
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 h-12 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold shadow-lg shadow-emerald-500/20 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <span>Join Beta</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          {state.status === "error" && (
            <p className="absolute -bottom-8 left-0 text-red-400 text-sm flex items-center gap-1 animate-pulse">
              <span>•</span> {state.message}
            </p>
          )}
        </form>
      )}

      <p className="text-center text-slate-500 text-sm mt-8 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Limited spots available for early access.
      </p>
    </div>
  );
}
