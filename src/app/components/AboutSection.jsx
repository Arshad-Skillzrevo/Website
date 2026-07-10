"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Target, Zap, ArrowRight } from "lucide-react";




/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const highlights = [
  {
    icon: Target,
    title: "Strategic Vision",
    description: "Understanding your brand's unique story and the audience it deserves.",
  },
  {
    icon: Sparkles,
    title: "Creative Excellence",
    description: "Visuals crafted to authentically represent your voice — not a template.",
  },
  {
    icon: Zap,
    title: "Lasting Impact",
    description: "Content that connects deeply, not just chases fleeting trends.",
  },
];

const principles = [
  { label: "Quality over quantity" },
  { label: "Story over trends" },
  { label: "Your brand at the center", accent: true },
];

/* ─────────────────────────────────────────────
   Reusable fade-in wrapper
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0, x = 0, y = 20, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Highlight card
───────────────────────────────────────────── */
function HighlightCard({ icon: Icon, title, description, delay }) {
  return (
    <FadeIn delay={delay}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full rounded-2xl p-6 flex flex-col gap-4 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(139,92,246,0.12)",
          backdropFilter: "blur(12px)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
          e.currentTarget.style.background = "rgba(139,92,246,0.06)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(139,92,246,0.12)";
          e.currentTarget.style.background = "rgba(255,255,255,0.025)";
        }}
      >
        {/* Corner glow */}
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
            style={{ background: "rgba(139,92,246,0.1)", color: "rgba(167,139,250,1)" }}>
            <Icon className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base tracking-tight">{title}</h4>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
          {description}
        </p>
      </motion.div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────
   Main About Section
───────────────────────────────────────────── */
export default function AboutSection() {
    const whatsappNumber = "919068737471";
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in your services. Let's discuss my project."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  return (
    <section
      id="about"
      className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;700;900&family=Fraunces:ital,wght@1,300;1,700&display=swap');`}</style>

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,40,217,0.06) 0%, transparent 65%)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section label + heading ── */}
        <FadeIn className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
            style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "rgba(216,180,254,0.85)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            About Me
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
            Building Brands That{" "}
            <span className="great-vibes" style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(167,139,250,1)" }}>
              Make Trends
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-20 mx-auto mt-7 rounded-full"
            style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.7), transparent)", transformOrigin: "center" }}
          />
        </FadeIn>

        {/* ── Main 2-col grid ── */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">

          {/* LEFT — identity card */}
          <FadeIn x={-24} delay={0.1} className="flex flex-col gap-5">
            {/* Profile card */}
            <div className="rounded-2xl p-7 flex flex-col gap-6"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(139,92,246,0.14)", backdropFilter: "blur(14px)" }}>

              {/* Avatar row */}
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-2xl blur-md opacity-60"
                    style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.8), rgba(139,92,246,0.4))" }} />
                  <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg text-white"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                    HV
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">Harsh Varlani</h3>
                  <p className="text-sm font-medium mt-0.5" style={{ color: "rgba(167,139,250,0.8)" }}>
                    Founder · Edit Wizard
                  </p>
                </div>
              </div>

              <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)" }} />

              <div className="space-y-4 text-sm leading-7" style={{ color: "rgba(255,255,255,0.5)" }}>
                <p>
                  I believe every brand has a story worth telling—and that story deserves to be told beautifully. Not with flashy trends that fade in a month, but with a{" "}
                  <span className="font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>visual identity that feels uniquely yours.</span>
                </p>
                <p>
                  As a freelance video editor and graphic designer, I work with entrepreneurs, coaches, and businesses who are done settling for generic content. You know your message matters. You know your brand deserves better.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <FadeIn delay={0.25}>
              <div className="relative rounded-2xl p-6 overflow-hidden"
                style={{ background: "rgba(109,40,217,0.08)", border: "1px solid rgba(139,92,246,0.22)", backdropFilter: "blur(12px)" }}>
                {/* Decorative quote mark */}
                <div className="absolute top-3 right-5 text-6xl font-black leading-none select-none pointer-events-none"
                  style={{ color: "rgba(139,92,246,0.12)", fontFamily: "Georgia, serif" }}>
                  "
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "rgba(167,139,250,0.8)" }} />
                  <p className="text-base font-medium leading-relaxed" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "rgba(216,180,254,0.9)" }}>
                    "Crafting visual stories that connect authentically, calmly, and creatively."
                  </p>
                </div>
              </div>
            </FadeIn>
          </FadeIn>

          {/* RIGHT — approach card */}
          <FadeIn x={24} delay={0.15}>
            <div className="h-full rounded-2xl p-7 flex flex-col gap-6"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(139,92,246,0.14)", backdropFilter: "blur(14px)" }}>

              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <h3 className="text-xl font-black text-white tracking-tight">My Approach</h3>
              </div>

              <div className="space-y-4 text-sm leading-7" style={{ color: "rgba(255,255,255,0.5)" }}>
                <p>
                  I don't just edit videos or design graphics. I take time to{" "}
                  <span className="font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>understand your brand</span>,
                  your audience, and what makes you different.
                </p>
                <p>
                  Whether it's transforming your LinkedIn presence, editing your podcast into something people actually watch, or designing social content that stops the scroll — my focus is simple:
                </p>
              </div>

              {/* Principles list */}
              <div className="flex flex-col gap-2.5 pt-1">
                {principles.map(({ label, accent }, i) => (
                  <FadeIn key={label} delay={0.3 + i * 0.08}>
                    <div
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={{
                        background: accent ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${accent ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.06)"}`,
                        color: accent ? "rgba(216,180,254,1)" : "rgba(255,255,255,0.8)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: accent ? "rgba(167,139,250,1)" : "rgba(99,102,241,0.6)" }} />
                      {label}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Highlight cards ── */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {highlights.map(({ icon, title, description }, i) => (
            <HighlightCard
              key={title}
              icon={icon}
              title={title}
              description={description}
              delay={0.1 + i * 0.1}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <FadeIn delay={0.2} className="text-center">
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              boxShadow: "0 8px 40px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 50px rgba(109,40,217,0.55), inset 0 1px 0 rgba(255,255,255,0.12)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 40px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"}
          >
            <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            Let's Build Something Together
            <ArrowRight className="w-4 h-4 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
          </motion.a>
        </FadeIn>
      </div>
    </section>
  );
}