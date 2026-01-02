import Hero from "@/components/hero";
import JoinBetaForm from "@/components/join-beta-form";
import Navbar from "@/components/navbar";
import Benefits from "@/components/benefits";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#030712] to-black overflow-hidden flex flex-col">
      <Navbar />

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col w-full">
        <Hero />

        <div className="w-full max-w-xl mx-auto mb-20 px-4">
          <p className="text-lg md:text-xl text-slate-400 text-center max-w-2xl mx-auto mb-10">
            Zipply condenses your chaotic inbox into a beautiful daily brief. Reclaim your focus and keep your unread count at zero, automatically.
          </p>
          <div className="flex justify-center">
            <a href="#join-beta" className="px-8 py-4 bg-emerald-400 text-slate-900 font-bold rounded-lg hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/20">
              Join the Beta Today
            </a>
          </div>
        </div>

        <Benefits />
        <Testimonials />

        <div id="join-beta" className="py-20 relative px-4">
          <div className="max-w-3xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for zero clutter?</h2>
            <p className="text-slate-400 mb-8">Join the waitlist for early beta access. Limited spots available.</p>
            <JoinBetaForm />
          </div>
        </div>
      </div>

      <footer className="relative z-10 w-full py-8 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Zipply. Built for human focus.</p>
      </footer>
    </main>
  );
}
