import { List, CheckCircle, Zap } from "lucide-react";

export default function Benefits() {
  const appBenefits = [
    {
      icon: <List className="w-6 h-6 text-emerald-400" />,
      title: "Daily Smart Summaries",
      description: "Get a concise, well-structured roundup of all your emails delivered once a day. No more digging through threads.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
      title: "Auto-Clean Inbox",
      description: "Our AI automatically marks read and low-priority emails as read, keeping your unread count at zero.",
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: "Priority Focus",
      description: "Surface what matters most. We highlight critical action items so you never miss an important update.",
    },
  ];

  return (
    <section className="py-20 relative z-10 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Reclaim your workday</h2>
          <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {appBenefits.map((benefit, index) => (
            <div key={index} className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-emerald-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
