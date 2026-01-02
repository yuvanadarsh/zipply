import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 pt-32 pb-0">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-0 max-w-4xl mx-auto leading-tight animate-fade-in-up">
        Stop drowning in <span className="text-emerald-400 underline decoration-emerald-400/30 underline-offset-8">noise</span>.
        <br />
        Start getting <span className="text-blue-400 underline decoration-blue-400/30 underline-offset-8">summaries</span>.
      </h1>
    </div>
  );
}
