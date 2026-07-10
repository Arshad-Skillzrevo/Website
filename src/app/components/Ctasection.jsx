import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Book a call below",
    description: "Pick a time that works for you — takes 30 seconds.",
  },
  {
    number: "2",
    title: "We'll talk about your brand",
    description: "Goals, challenges, what you've tried, and what you need.",
  },
  {
    number: "3",
    title: "I'll share how I can help",
    description: "Honest fit check — I'll only say yes if I know I can deliver.",
  },
  {
    number: "4",
    title: "We get to work",
    description: "Content that actually sounds and feels like your brand.",
  },
];

export default function CTASection({ whatsappLink }) {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-red-500/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-red-500/30"
        >
          {/* Left panel */}
          <div className="p-10 sm:p-14 bg-red-500/[0.07] flex flex-col justify-between gap-10">
            <div className="space-y-5">
              <p className="text-[11px] tracking-[0.18em] uppercase text-red-400/90 font-medium">
                Ready to start?
              </p>
              <h2
                className="text-4xl sm:text-5xl font-black leading-[1.1] text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let's build something{" "}
                <em className="italic text-red-400 not-italic" style={{ fontStyle: "italic" }}>
                  that feels like you
                </em>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-sm">
                Tired of content that doesn't represent your brand — or
                overwhelmed doing it all yourself? Let's talk.
              </p>
            </div>
            <p className="text-sm text-gray-500 italic border-l-2 border-red-500/40 pl-3 leading-relaxed">
              No pressure. No hard sell. Just a real conversation about your
              vision.
            </p>
          </div>

          {/* Right panel */}
          <div className="p-10 sm:p-14 border-t md:border-t-0 md:border-l border-red-500/20 flex flex-col gap-8">
            <p className="text-[11px] tracking-[0.14em] uppercase text-red-400/70 font-medium">
              Here's how it works
            </p>

            <div className="flex flex-col gap-6">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full border border-red-500/50 flex items-center justify-center text-[11px] font-medium text-red-400/90 shrink-0 mt-0.5">
                    {step.number}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-0.5">
                      {step.title}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-red-500/20" />

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-medium text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
            >
              <MessageCircle className="w-4 h-4 opacity-85" />
              Book your call now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}