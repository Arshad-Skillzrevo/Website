
"use client";
import { useState, useCallback, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { FaPlay, FaYoutube } from "react-icons/fa";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const shorts = [
  { id: "ZYK8-MGhde4", title: "Short 1" },
  { id: "0qgcRSixSV0", title: "Short 2" },
  { id: "TsNyzW5qkeA", title: "Short 3" },
  { id: "Sop9QqvaZCA", title: "Short 4" },
  { id: "MFGfvoNU57A", title: "Short 5" },
  { id: "LL36AKBbJrI", title: "Short 6" },
  { id: "iCpLcj0Qi6M", title: "Short 7" },
  { id: "UZjm1c6zN00", title: "Short 8" },
  { id: "-poUrXp0UDQ", title: "Short 9" },
  { id: "j0-Qj-iSDPc", title: "Short 10" },
  { id: "TtJlRcJKU3U", title: "Short 11" },
  { id: "tLehqxRvfB4", title: "Short 12" },
  { id: "O5R5AuKWl6w", title: "Short 13" },
  { id: "OXtY7fb_ABg", title: "Short 14" },
  { id: "FLfvSnd9Rv8", title: "Short 15" },
  { id: "D-zcT6g9c6o", title: "Short 16" },
  { id: "h0ySWWg2pGc", title: "Short 17" },
  { id: "sBIQSyfVPMc", title: "Short 18" },
  { id: "_B01p1ZCMRQ", title: "Short 19" },
  { id: "3TdrLCCRoeg", title: "Short 20" },
  { id: "Mw6ovR8QsH4", title: "Short 21" },
  { id: "m6vVlqsyiU0", title: "Short 22" },
  { id: "0EX_tkLFw8s", title: "Short 23" },
  { id: "LM7hslCaU-o", title: "Short 24" },
  { id: "pMeRGNilDTk", title: "Short 25" },
  { id: "1BJGP6Q19Tw", title: "Short 26" },
];

const thumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const shortUrl = (id) => `https://www.youtube.com/shorts/${id}`;

/* ─────────────────────────────────────────────
   Global styles
───────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @keyframes halo-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 0.9; transform: scale(1.05); }
  }
  .halo-ring { animation: halo-pulse 2.6s ease-in-out infinite; }
`;

const StyleInjector = memo(function StyleInjector() {
  return <style>{GLOBAL_STYLES}</style>;
});

/* ─────────────────────────────────────────────
   Layout constants
───────────────────────────────────────────── */
const DESKTOP = { center: 260, side: 170, gap: 18 };
const MOBILE = { center: 175, side: 105, gap: 12 };
const AUTO_MS = 3500;

/* ─────────────────────────────────────────────
   useSwiper — infinite wrap
───────────────────────────────────────────── */
function useSwiper(count, onUserInteract) {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(null);
  const didDrag = useRef(false);

  const prev = useCallback(() => {
    onUserInteract();
    setActive(i => (i - 1 + count) % count);
  }, [count, onUserInteract]);

  const next = useCallback(() => {
    onUserInteract();
    setActive(i => (i + 1) % count);
  }, [count, onUserInteract]);

  const goTo = useCallback((i) => {
    onUserInteract();
    setActive(i);
  }, [onUserInteract]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next]);

  const onDown = useCallback((clientX) => {
    startX.current = clientX;
    didDrag.current = false;
    setDragging(true);
  }, []);

  const onMove = useCallback((clientX) => {
    if (startX.current === null) return;
    const d = clientX - startX.current;
    if (Math.abs(d) > 5) didDrag.current = true;
    setDrag(d);
  }, []);

  const onUp = useCallback((clientX) => {
    if (startX.current === null) return;
    const d = (clientX ?? startX.current) - startX.current;
    if (Math.abs(d) > 55) {
      onUserInteract();
      d < 0 ? next() : prev();
    }
    startX.current = null;
    setDrag(0);
    setDragging(false);
    setTimeout(() => { didDrag.current = false; }, 60);
  }, [next, prev, onUserInteract]);

  return { active, drag, dragging, didDrag, prev, next, goTo, onDown, onMove, onUp };
}

/* ─────────────────────────────────────────────
   SlideCard
───────────────────────────────────────────── */
const SlideCard = memo(function SlideCard({
  short, index, active, drag, isPlaying, layout, onActivate, onPlay,
}) {
  const offset = index - active;
  const isCenter = offset === 0;
  const isAdjacent = Math.abs(offset) === 1;
  const isVisible = Math.abs(offset) <= 3;
  if (!isVisible) return null;

  const { center, side, gap } = layout;
  let x;
  if (offset === 0) {
    x = drag;
  } else if (offset < 0) {
    x = offset * (side + gap) - (center - side) / 2 + drag;
  } else {
    x = offset * (side + gap) + (center - side) / 2 + drag;
  }

  const scale = isCenter ? 1 : isAdjacent ? 0.78 : 0.62;
  const opacity = isCenter ? 1 : isAdjacent ? 0.5 : Math.abs(offset) === 2 ? 0.25 : 0.1;
  const zIndex = 20 - Math.abs(offset) * 4;
  const w = isCenter ? center : side;

  return (
    <motion.div
      className="absolute top-0"
      style={{ width: w, left: "50%", marginLeft: -w / 2, zIndex }}
      animate={{ x, scale, opacity }}
      transition={{
        x: { type: "spring", stiffness: 360, damping: 38, mass: 0.7 },
        scale: { type: "spring", stiffness: 300, damping: 32 },
        opacity: { duration: 0.22 },
      }}
    >
      {/* Halo */}
      {isCenter && (
        <div
          className="halo-ring absolute pointer-events-none"
          style={{
            inset: "-16px",
            borderRadius: "1.8rem",
            background: "radial-gradient(ellipse at center, rgba(239,68,68,0.2) 0%, transparent 68%)",
            zIndex: -1,
          }}
        />
      )}

      <div
        onClick={() => isCenter ? onPlay() : onActivate(index)}
        style={{
          aspectRatio: "9/16",
          width: "100%",
          borderRadius: "1.1rem",
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          border: isCenter
            ? "1.5px solid rgba(239,68,68,0.45)"
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: isCenter
            ? "0 0 40px rgba(239,68,68,0.15), 0 24px 60px rgba(0,0,0,0.55)"
            : "0 8px 24px rgba(0,0,0,0.35)",
        }}
      >
        {/* Red top bar */}
        {isCenter && (
          <div
            className="absolute top-0 inset-x-0 z-10"
            style={{ height: "2.5px", background: "linear-gradient(90deg, #ef4444, #f97316, #ef4444)" }}
          />
        )}

        {/* Thumbnail */}
        <img
          src={thumb(short.id)}
          alt={short.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
          draggable={false}
        />

        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: isCenter
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)"
            : "rgba(0,0,0,0.45)",
        }} />

        {/* Center idle state */}
        {isCenter && !isPlaying && (
          <>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 12,
            }}>
              <div style={{
                padding: w > 200 ? "18px" : "14px",
                borderRadius: "50%",
                background: "rgba(239,68,68,0.18)",
                border: "1.5px solid rgba(239,68,68,0.55)",
                boxShadow: "0 0 28px rgba(239,68,68,0.22)",
                display: "flex",
              }}>
                <FaPlay style={{ width: w > 200 ? 28 : 20, height: w > 200 ? 28 : 20, color: "white" }} />
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                fontFamily: "'Syne', sans-serif",
              }}>
                Tap to play
              </span>
            </div>

            {/* Title */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: w > 200 ? "18px" : "12px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 9px", borderRadius: 99, marginBottom: 8,
                background: "rgba(239,68,68,0.18)", border: "1px solid rgba(239,68,68,0.3)",
                fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#fca5a5",
                fontFamily: "'Syne', sans-serif",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                Shorts
              </div>
              <p style={{
                color: "white", fontWeight: 600, fontSize: w > 200 ? 13 : 11,
                lineHeight: 1.35, fontFamily: "'Syne', sans-serif",
                display: "-webkit-box", WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>
                {short.title}
              </p>
            </div>
          </>
        )}

        {/* Center playing state */}
        {isCenter && isPlaying && (
          <>
            <iframe
              key={short.id}
              src={`https://www.youtube.com/embed/${short.id}?autoplay=1&rel=0&modestbranding=1`}
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              title={short.title}
            />
            <button
              onClick={(e) => { e.stopPropagation(); onPlay(); }}
              style={{
                position: "absolute", top: 10, right: 10, zIndex: 30,
                padding: 6, borderRadius: "50%", cursor: "pointer",
                background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.15)",
                color: "white", display: "flex",
              }}
              aria-label="Stop"
            >
              <FiX style={{ width: 14, height: 14 }} />
            </button>
          </>
        )}

        {/* Side card number */}
        {!isCenter && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontSize: w > 130 ? 28 : 20, fontWeight: 900,
              color: "rgba(255,255,255,0.1)", fontFamily: "'Syne', sans-serif",
              letterSpacing: "-0.04em",
            }}>
              {index + 1}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
});

/* ─────────────────────────────────────────────
   DotStrip
───────────────────────────────────────────── */
const DotStrip = memo(function DotStrip({ count, active, goTo }) {
  const MAX = 9;
  const half = Math.floor(MAX / 2);
  const start = Math.max(0, Math.min(active - half, count - MAX));
  const end = Math.min(count - 1, start + MAX - 1);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
      {start > 0 && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)" }}>•••</span>}
      {Array.from({ length: end - start + 1 }, (_, i) => {
        const idx = start + i;
        const isAct = idx === active;
        return (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Short ${idx + 1}`}
            style={{
              width: isAct ? 22 : 6, height: 6, borderRadius: 3, padding: 0,
              background: isAct ? "#ef4444" : "rgba(255,255,255,0.18)",
              border: "none", cursor: "pointer",
              transition: "width 0.25s ease, background 0.2s ease",
            }}
          />
        );
      })}
      {end < count - 1 && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)" }}>•••</span>}
    </div>
  );
});

/* ─────────────────────────────────────────────
   ProgressBar
───────────────────────────────────────────── */
const ProgressBar = memo(function ProgressBar({ active, paused }) {
  return (
    <div style={{
      height: 2, borderRadius: 1, overflow: "hidden",
      background: "rgba(255,255,255,0.07)", width: 120, margin: "0 auto",
    }}>
      <motion.div
        key={`${active}-${paused}`}
        style={{ height: "100%", background: "#ef4444", originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: paused ? 0 : 1 }}
        transition={paused
          ? { duration: 0 }
          : { duration: AUTO_MS / 1000, ease: "linear" }
        }
      />
    </div>
  );
});

/* ─────────────────────────────────────────────
   NavButton
───────────────────────────────────────────── */
function NavButton({ onClick, ariaLabel, side, isMobile, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        position: "absolute",
        [side]: "max(8px, calc(50% - 320px))",
        zIndex: 30,
        padding: isMobile ? "8px" : "11px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.07)",
        color: "white",
        cursor: "pointer",
        display: "flex",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export function ShortsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  /* ── User-interaction pause ── */
  const userPauseTimer = useRef(null);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const touchUser = useCallback(() => {
    isPausedRef.current = true;
    setIsPaused(true);
    if (userPauseTimer.current) clearTimeout(userPauseTimer.current);
    userPauseTimer.current = setTimeout(() => {
      isPausedRef.current = false;
      setIsPaused(false);
    }, 6000);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const layout = isMobile ? MOBILE : DESKTOP;
  const trackH = Math.round(layout.center * 16 / 9);

  const {
    active, drag, dragging, didDrag,
    prev, next, goTo, onDown, onMove, onUp,
  } = useSwiper(shorts.length, touchUser);

  /* Stop video on slide change */
  useEffect(() => { setIsPlaying(false); }, [active]);

  /* ── Auto-advance ── */
  const nextRef = useRef(next);
  useEffect(() => { nextRef.current = next; }, [next]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!isPausedRef.current && !isPlaying) {
        nextRef.current();
      }
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [isPlaying]);

  const handlePlay = useCallback(() => setIsPlaying(p => !p), []);
  const handleActivate = useCallback((idx) => {
    if (didDrag.current) return;
    goTo(idx);
  }, [goTo, didDrag]);

  const isAutoPaused = isPaused || isPlaying;
  const iconSize = isMobile ? 18 : 22;

  return (
    <div
      className="w-full py-12 sm:py-20 bg-gradient-to-b from-black to-[#4e1515]"
      style={{ fontFamily: "'Syne', sans-serif" }}


    >
      <StyleInjector />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: "rgba(239,68,68,0.6)" }}
          >
            Short Form
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            YouTube{" "}
            <span style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic", fontWeight: 400, color: "#df3c3c",
            }}>
              Shorts
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.22)" }}>
            Drag · swipe · or use arrows &nbsp;·&nbsp; tap center card to play
          </p>
        </div>

        {/* Counter */}
        <div className="flex justify-center mb-7">
          <div
            className="flex items-baseline gap-1.5 px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                style={{
                  color: "#ef4444", fontWeight: 800, fontSize: 18,
                  fontFamily: "'Syne', sans-serif",
                  minWidth: "1.6ch", display: "inline-block", textAlign: "right",
                }}
              >
                {String(active + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, fontWeight: 500 }}>
              / {String(shorts.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Stage */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>

          <NavButton onClick={prev} ariaLabel="Previous" side="left" isMobile={isMobile}>
            <FiChevronLeft style={{ width: iconSize, height: iconSize }} />
          </NavButton>

          {/* Drag track */}
          <div
            style={{
              position: "relative", width: "100%", height: trackH,
              cursor: dragging ? "grabbing" : "grab",
              touchAction: "pan-y", overflow: "hidden",
            }}
            onMouseDown={(e) => onDown(e.clientX)}
            onMouseMove={(e) => onMove(e.clientX)}
            onMouseUp={(e) => onUp(e.clientX)}
            onMouseLeave={(e) => onUp(e.clientX)}
            onTouchStart={(e) => onDown(e.touches[0].clientX)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
            onTouchEnd={(e) => onUp(e.changedTouches[0].clientX)}
          >
            {shorts.map((short, i) => (
              <SlideCard
                key={short.id}
                short={short}
                index={i}
                active={active}
                drag={drag}
                isPlaying={isPlaying && i === active}
                layout={layout}
                onActivate={handleActivate}
                onPlay={handlePlay}
              />
            ))}
          </div>

          <NavButton onClick={next} ariaLabel="Next" side="right" isMobile={isMobile}>
            <FiChevronRight style={{ width: iconSize, height: iconSize }} />
          </NavButton>

        </div>

        {/* Dots + progress + link */}
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <DotStrip count={shorts.length} active={active} goTo={goTo} />
          <ProgressBar active={active} paused={isAutoPaused} />
          <a
            href={shortUrl(shorts[active].id)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 11, fontWeight: 600,
              color: "rgba(255,255,255,0.22)", textDecoration: "none",
              fontFamily: "'Syne', sans-serif", transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(252,165,165,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
          >
            <FaYoutube style={{ width: 13, height: 13 }} />
            Open on YouTube
          </a>
        </div>

      </div>
    </div>
  );
}