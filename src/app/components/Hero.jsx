"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, MessageCircle, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Config
───────────────────────────────────────────── */
const whatsappNumber = "919068737471";
const whatsappMessage = encodeURIComponent(
  "Hi! I'm interested in your services. Let's discuss my project."
);
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const designTools = [
  { name: "Photoshop",    logo: "https://static.cdnlogo.com/logos/a/88/adobe-photoshop.svg" },
  { name: "After Effects",logo: "/ae.svg" },
  { name: "Premiere Pro", logo: "https://static.cdnlogo.com/logos/a/54/adobe-premiere-pro-cc-14-3-0-svg.svg" },
  { name: "Illustrator",  logo: "https://static.cdnlogo.com/logos/a/67/adobe-illustrator-cc-icon.svg" },
  { name: "Figma",        logo: "https://static.cdnlogo.com/logos/f/43/figma.svg" },
  { name: "Canva",        logo: "https://static.cdnlogo.com/logos/c/41/canva.svg" },
];

/* ─────────────────────────────────────────────
   Floating icon (background layer)
───────────────────────────────────────────── */
function FloatingIcon({ logo, alt, className, yRange, xRange = [0, 0], duration, delay, rotate = [0, 10, 0] }) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      animate={{ y: yRange, x: xRange, rotate }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay, repeatType: "mirror" }}
    >
      <img src={logo} alt={alt} className="w-full h-full grayscale invert opacity-50" draggable={false} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Tool badge with tooltip
───────────────────────────────────────────── */
function ToolBadge({ name, logo, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 220 }}
      whileHover={{ scale: 1.25, y: -4 }}
      className="relative group cursor-default"
      title={name}
    >
      <div
        className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <img src={logo} alt={name} className="w-6 h-6 sm:w-7 sm:h-7 object-contain grayscale invert" />
      </div>
      {/* Tooltip */}
      <div
        className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[10px] font-medium px-2.5 py-1 rounded-md pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
        style={{ background: "#000000", color: "#ffffff", border: "1px solid #ff0000" }}
      >
        {name}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Animated word cycle
───────────────────────────────────────────── */
const words = ["Brands", "Creators", "Startups", "Visionaries"];

function WordCycle() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-block relative" style={{ minWidth: "5ch" }}>
      <motion.span
        key={idx}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
        style={{ color: "#ff0000" }}
      >
        {words[idx]}
      </motion.span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   Magnetic cursor-follow effect
───────────────────────────────────────────── */
function useMagneticCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return { smoothX, smoothY };
}

/* ─────────────────────────────────────────────
   Noise grain overlay (pure CSS)
───────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
        mixBlendMode: "overlay",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Main Hero
───────────────────────────────────────────── */
export default function Hero() {
  const { smoothX, smoothY } = useMagneticCursor();

  // Soft radial glow that follows cursor
  const glowX = useTransform(smoothX, v => `${v}px`);
  const glowY = useTransform(smoothY, v => `${v}px`);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#000000" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,700;0,9..40,900;1,9..40,400&family=Fraunces:ital,wght@1,300;1,700&display=swap');

        .hero-heading { font-family: 'DM Sans', sans-serif; font-weight: 900; letter-spacing: -0.04em; line-height: 1; }
        .hero-italic  { font-family: 'Fraunces', serif; font-style: italic; font-weight: 300; letter-spacing: -0.02em; }

        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .ping-ring { animation: pulse-ring 1.8s ease-out infinite; }

        @keyframes drift-up { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
        @keyframes drift-down { 0%,100% { transform: translateY(0); } 50% { transform: translateY(18px); } }
      `}</style>

      {/* Cursor glow */}
      <motion.div
        className="absolute pointer-events-none z-0 hidden lg:block"
        style={{
          left: glowX, top: glowY,
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,0,0.07) 0%, transparent 70%)",
          transform: "translate(-50%,-50%)",
        }}
      />

      {/* Static ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position:"absolute", top:"-15%", left:"-5%", width:"55vw", height:"55vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,0,0,0.09) 0%, transparent 65%)", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", bottom:"-20%", right:"-5%", width:"45vw", height:"45vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", top:"40%", left:"40%", width:"30vw", height:"30vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(255,0,0,0.04) 0%, transparent 65%)", filter:"blur(40px)" }} />
      </div>

      {/* Fine grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <GrainOverlay />

      {/* Background floating tool icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon logo={designTools[0].logo} alt="Photoshop"    className="top-[12%] left-[6%]  w-12 h-12 sm:w-16 sm:h-16 opacity-[0.07]" yRange={[0,-22,0]} duration={6}   delay={0}   rotate={[0,8,0]} />
        <FloatingIcon logo={designTools[1].logo} alt="After Effects" className="top-[18%] right-[8%]  w-10 h-10 sm:w-14 sm:h-14 opacity-[0.07]" yRange={[0,24,0]}  duration={7}   delay={0.6} rotate={[0,-12,0]} />
        <FloatingIcon logo={designTools[3].logo} alt="Illustrator"   className="top-[45%] left-[4%]  w-14 h-14 sm:w-20 sm:h-20 opacity-[0.06]" yRange={[0,-28,0]} xRange={[0,8,0]} duration={8} delay={1} rotate={[0,10,0]} />
        <FloatingIcon logo={designTools[2].logo} alt="Premiere Pro"  className="top-[48%] right-[6%]  w-12 h-12 sm:w-16 sm:h-16 opacity-[0.06]" yRange={[0,18,0]}  xRange={[0,-10,0]} duration={7.5} delay={1.5} rotate={[0,-8,0]} />
        <FloatingIcon logo={designTools[4].logo} alt="Figma"         className="bottom-[18%] left-[10%] w-10 h-10 sm:w-14 sm:h-14 opacity-[0.07]" yRange={[0,-20,0]} duration={6.5} delay={2} rotate={[0,12,0]} />
        <FloatingIcon logo={designTools[5].logo} alt="Canva"         className="bottom-[22%] right-[13%] w-12 h-12 sm:w-16 sm:h-16 opacity-[0.07]" yRange={[0,26,0]} duration={7} delay={2.5} rotate={[0,-10,0]} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center px-5 sm:px-8 py-24 sm:py-32 flex flex-col items-center gap-8 sm:gap-10">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid #ff0000",
              color: "#ffffff",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="ping-ring absolute inline-flex h-full w-full rounded-full bg-red-600" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            Available for Freelance Projects
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="hero-heading text-[clamp(2.6rem,7vw,6rem)] text-white">
            Visual Stories for<br />
            <div className="great-vibes font-light text-[clamp(3.8rem,8.5vw,7.4rem)] py-4">
              <WordCycle />
            </div>
          </h1>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-28 mx-auto rounded-full"
            style={{ background: "linear-gradient(to right, transparent, #ff0000, transparent)", transformOrigin: "center" }}
          />
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl"
          style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300 }}
        >
          I help brands, creators, and entrepreneurs build their unique visual identity
          through{" "}
          <span style={{ color: "#ff0000", fontWeight: 400 }}>
            thoughtful design and storytelling
          </span>
          —one pixel at a time.
        </motion.p>

        {/* Tool badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap"
        >
          {designTools.map(({ name, logo }, i) => (
            <ToolBadge key={name} name={name} logo={logo} delay={0.75 + i * 0.08} />
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white w-full sm:w-auto overflow-hidden"
            style={{
              background: "#ff0000",
              boxShadow: "0 8px 40px rgba(255,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            Book a Call
            <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </motion.a>

          <motion.a
            href="/#services"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold w-full sm:w-auto transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid #ffffff",
              color: "#ffffff",
              backdropFilter: "blur(12px)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#000000";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "#ffffff";
            }}
          >
            View My Work
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Social proof micro-line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="flex items-center gap-3 text-xs sm:text-sm"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <div className="flex -space-x-2">
            {[0,1,2].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-bold"
                style={{ borderColor: "#000000", background: "#ff0000", color: "#ffffff" }}>
                {["A","B","C"][i]}
              </div>
            ))}
          </div>
          <span>Trusted by 30+ happy clients</span>
          <span className="text-red-600">✦</span>
          <span>5★ rated</span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}