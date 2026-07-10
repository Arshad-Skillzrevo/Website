"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Award, MessageCircle, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Sparkles,
    number: "01",
    title: "No Cookie-Cutter Solutions",
    description:
      "Every brand is different. I don't use templates or follow trends—I build visuals that are uniquely yours.",
  },
  {
    icon: Award,
    number: "02",
    title: "Quality Over Everything",
    description:
      "I'm not interested in churning out content. I'm interested in creating work that you're proud to share.",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Clear Communication",
    description:
      "No ghosting, no confusion. I keep you updated throughout the process and make revisions until it feels right.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Brand-Driven Storytelling",
    description:
      "I don't just make things look good—I make sure they tell your story and connect with the people who matter most.",
  },
];

function ReasonRow({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-start gap-6 sm:gap-10 py-8 sm:py-10 border-b last:border-b-0"
      style={{ borderColor: "rgba(168,85,247,0.1)" }}
    >
      {/* Hover fill */}
      <div
        className="absolute inset-0 -mx-4 sm:-mx-8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(168,85,247,0.05), transparent)" }}
      />

      {/* Number */}
      <span
        className="flex-shrink-0 text-5xl sm:text-7xl font-black leading-none select-none"
        style={{
          fontFamily: "'Syne', sans-serif",
          WebkitTextStroke: "1px rgba(168,85,247,0.25)",
          color: "transparent",
          transition: "all 0.4s ease",
        }}
      >
        {item.number}
      </span>

      {/* Content */}
      <div className="flex-1 pt-1 sm:pt-3">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="p-2 rounded-lg border transition-all duration-300 group-hover:border-red-400/40 group-hover:bg-red-500/10"
            style={{
              background: "rgba(168,85,247,0.07)",
              borderColor: "rgba(168,85,247,0.15)",
            }}
          >
            <Icon className="w-4 h-4 text-red-400" />
          </div>
          <h3
            className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-red-100 transition-colors duration-300"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {item.title}
          </h3>
        </div>
        <p className="text-white/45 text-sm sm:text-base leading-relaxed group-hover:text-white/60 transition-colors duration-300 max-w-xl">
          {item.description}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 hidden sm:block">
        <div
          className="w-8 h-8 rounded-full border flex items-center justify-center"
          style={{ borderColor: "rgba(168,85,247,0.35)", background: "rgba(168,85,247,0.1)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="rgb(192,132,252)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function WhyWorkWithMe() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t relative overflow-hidden"
      style={{ borderColor: "rgba(168,85,247,0.1)" }}
    >
      

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(168,85,247,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <div ref={headRef} className="mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(192,132,252,0.7)", fontFamily: "'DM Sans', sans-serif" }}
          >
            The difference
          </motion.p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Why work
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                with me?
              </span>
            </motion.h2>

            {/* Vertical divider + tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={headInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center gap-4 sm:max-w-[220px]"
            >
              <div className="w-px h-12 flex-shrink-0 hidden sm:block" style={{ background: "rgba(168,85,247,0.25)" }} />
              <p className="text-white/35 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Four principles that guide every project I take on.
              </p>
            </motion.div>
          </div>

          {/* Underline */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={headInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px"
            style={{ background: "linear-gradient(to right, rgba(168,85,247,0.5), rgba(168,85,247,0.1), transparent)" }}
          />
        </div>

        {/* Reasons list */}
        <div className="px-0 sm:px-4">
          {reasons.map((item, i) => (
            <ReasonRow key={item.number} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}