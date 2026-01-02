import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      //quote: "I used to spend 2 hours a day on email. Now I just read my 5-minute summary and I'm done. Absolute game changer.",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus tempor eros id volutpat.",

      author: "Sarah Chen",
      role: "Product Manager",
    },
    {
      //quote: "The auto-mark-as-read feature is magic. My inbox finally feels like a tool instead of a burden.",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus tempor eros id volutpat.",
      author: "Marcus Thorne",
      role: "Software Architect",
    },
    {
      //quote: "Clean, minimal, and saves me so much mental energy. If you value your time, you need this.",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus tempor eros id volutpat.",
      author: "Elena Rodriguez",
      role: "Freelance Designer",
    },
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">Loved by focus-seekers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="text-emerald-400 font-semibold">{testimonial.author}</p>
                <p className="text-slate-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
