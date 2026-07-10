// "use client";

// import { useState, useCallback, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ChevronLeft, ChevronRight, Play, Youtube, Clock } from "lucide-react";

// /* ─────────────────────────────────────────────
//    Data
// ───────────────────────────────────────────── */
// const videos = [
//   { id: "bzXDuVfLlnY", title: "Video Title 1"  },
//   { id: "Iu8U9eFnjxE", title: "Video Title 2"  },
//   { id: "LPoVRIo-iDU", title: "Video Title 3"  },
//   { id: "Nktf6KuWmTg", title: "Video Title 4"  },
//   { id: "lS98Vqp9Bug", title: "Video Title 5"  },
//   { id: "SO3_TzWDf2U", title: "Video Title 6"  },
//   { id: "lqyBUsROsww", title: "Video Title 7"  },
//   { id: "pzaljP0zc24", title: "Video Title 8"  },
//   { id: "Xyy7LxSu8so", title: "Video Title 9"  },
//   { id: "QTL0wVKHvQc", title: "Video Title 10" },
//   { id: "iOU8y2qQhxw", title: "Video Title 11" },
// ];

// const thumb    = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
// const videoUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

// /* ─────────────────────────────────────────────
//    Modal — full embed
// ───────────────────────────────────────────── */
// function VideoModal({ video, onClose, onPrev, onNext }) {
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === "Escape")     onClose();
//       if (e.key === "ArrowLeft")  onPrev();
//       if (e.key === "ArrowRight") onNext();
//     };
//     window.addEventListener("keydown", handler);
//     document.body.style.overflow = "hidden";
//     return () => {
//       window.removeEventListener("keydown", handler);
//       document.body.style.overflow = "";
//     };
//   }, [onClose, onPrev, onNext]);

//   return (
//     <motion.div
//       className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.22 }}
//     >
//       <motion.div className="absolute inset-0 bg-black/92 backdrop-blur-2xl" onClick={onClose} />

//       {/* Close */}
//       <button
//         onClick={onClose}
//         className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
//       >
//         <X className="w-5 h-5" />
//       </button>

//       {/* Nav */}
//       {[
//         { fn: onPrev, Icon: ChevronLeft,  pos: "left-5 sm:left-8",  label: "Previous" },
//         { fn: onNext, Icon: ChevronRight, pos: "right-5 sm:right-8", label: "Next"     },
//       ].map(({ fn, Icon, pos, label }) => (
//         <button
//           key={label}
//           onClick={fn}
//           className={`absolute ${pos} z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hidden sm:flex`}
//         >
//           <Icon className="w-6 h-6" />
//         </button>
//       ))}

//       {/* Card */}
//       <motion.div
//         key={video.id}
//         className="relative z-10 flex flex-col items-center gap-5 w-full max-w-5xl"
//         initial={{ scale: 0.9, y: 18, opacity: 0 }}
//         animate={{ scale: 1,   y: 0,  opacity: 1 }}
//         exit={{    scale: 0.9, y: 18, opacity: 0 }}
//         transition={{ type: "spring", stiffness: 300, damping: 26 }}
//       >
//         {/* 16:9 embed */}
//         <div
//           className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
//           style={{
//             aspectRatio: "16/9",
//             boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.7)",
//           }}
//         >
//           <iframe
//             src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
//             allow="autoplay; fullscreen"
//             allowFullScreen
//             className="w-full h-full border-0"
//             title={video.title}
//           />
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between w-full px-1">
//           <p className="text-white font-semibold text-sm sm:text-base truncate max-w-md">
//             {video.title}
//           </p>
//           <div className="flex items-center gap-3 flex-shrink-0 ml-4">
//             {/* Mobile nav */}
//             <div className="flex gap-2 sm:hidden">
//               <button onClick={onPrev} className="p-2 rounded-full bg-white/10 text-white border border-white/10">
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button onClick={onNext} className="p-2 rounded-full bg-white/10 text-white border border-white/10">
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//             <a
//               href={videoUrl(video.id)}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
//               style={{
//                 background: "rgba(255,40,40,0.12)",
//                 borderColor: "rgba(255,40,40,0.35)",
//                 color: "#ff7070",
//               }}
//             >
//               <Youtube className="w-3.5 h-3.5" />
//               YouTube
//             </a>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// /* ─────────────────────────────────────────────
//    Row card — 16:9 landscape
// ───────────────────────────────────────────── */
// function RowCard({ video, isActive, onClick }) {
//   return (
//     <motion.button
//       onClick={onClick}
//       className="relative flex-shrink-0 rounded-xl overflow-hidden group focus:outline-none"
//       style={{ width: "clamp(200px, 24vw, 300px)", aspectRatio: "16/9" }}
//       whileHover={{ scale: 1.05, zIndex: 10 }}
//       whileTap={{ scale: 0.97 }}
//       transition={{ type: "spring", stiffness: 380, damping: 26 }}
//     >
//       <img
//         src={thumb(video.id)}
//         alt={video.title}
//         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//         loading="lazy"
//         draggable={false}
//       />

//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

//       {/* Active ring */}
//       <div
//         className="absolute inset-0 rounded-xl border-2 transition-all duration-300"
//         style={{
//           borderColor: isActive ? "rgba(255,80,80,0.85)" : "transparent",
//           boxShadow:   isActive ? "0 0 20px rgba(255,60,60,0.3)" : "none",
//         }}
//       />

//       {/* Play */}
//       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//         <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
//           <Play className="w-4 h-4 text-white fill-white" />
//         </div>
//       </div>

//       {/* Title */}
//       <p className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-semibold leading-snug text-left line-clamp-2">
//         {video.title}
//       </p>
//     </motion.button>
//   );
// }

// /* ─────────────────────────────────────────────
//    Main export
// ───────────────────────────────────────────── */
// export function LongFormSection() {
//   const [featured, setFeatured]   = useState(videos[0]);
//   const [modalVideo, setModalVideo] = useState(null);
//   const rowRef = useRef(null);

//   const currentIndex = modalVideo
//     ? videos.findIndex((v) => v.id === modalVideo.id)
//     : -1;

//   const handlePrev = useCallback(() => {
//     setModalVideo(videos[(currentIndex - 1 + videos.length) % videos.length]);
//   }, [currentIndex]);

//   const handleNext = useCallback(() => {
//     setModalVideo(videos[(currentIndex + 1) % videos.length]);
//   }, [currentIndex]);

//   const scrollRow = (dir) => rowRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

//   return (
//     <div
//       className="w-full py-12 sm:py-20 bg-red-300/5"
//       style={{ fontFamily: "'DM Sans', sans-serif" }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital@1&display=swap');
//         .videos-row::-webkit-scrollbar { display: none; }
//         .videos-row { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <div className="max-w-7xl mx-auto px-4 sm:px-8">

//         {/* ── Section header ── */}
//         <div className="mb-8 sm:mb-12">
//           <p className="text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-red-400/70 mb-2">
//             Long Form
//           </p>
//           <div className="flex items-end justify-between gap-4">
//             <h2
//               className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
//               style={{ fontWeight: 700 }}
//             >
//               YouTube{" "}
//               <span
//                 className="text-red-500"
//                 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}
//               >
//                 Videos
//               </span>
//             </h2>
//             <p className="text-white/30 text-sm mb-1 hidden sm:block">
//               {videos.length} videos · click to watch
//             </p>
//           </div>
//           <div
//             className="mt-5 h-px"
//             style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)" }}
//           />
//         </div>

//         {/* ── Featured spotlight ── */}
//         <motion.div
//           key={featured.id}
//           className="relative w-full rounded-3xl overflow-hidden cursor-pointer group mb-6"
//           style={{
//             aspectRatio: "16/9",
//             maxHeight: "520px",
//             boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.55), 0 0 60px rgba(255,50,50,0.08)",
//           }}
//           onClick={() => setModalVideo(featured)}
//           whileHover={{ scale: 1.005 }}
//           transition={{ type: "spring", stiffness: 260, damping: 24 }}
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           {/* Thumbnail */}
//           <img
//             src={thumb(featured.id)}
//             alt={featured.title}
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//           />

//           {/* Gradient */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

//           {/* Top accent line */}
//           <div
//             className="absolute top-0 left-0 right-0 h-[3px]"
//             style={{ background: "linear-gradient(to right, #ff3c3c, #ff8c42, transparent)" }}
//           />

//           {/* Center play button */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <motion.div
//               className="p-6 rounded-full border border-white/25 bg-white/15 backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity"
//               whileHover={{ scale: 1.1 }}
//             >
//               <Play className="w-10 h-10 text-white fill-white" />
//             </motion.div>
//           </div>

//           {/* Bottom info */}
//           <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between gap-4">
//             <div>
//               <div
//                 className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3"
//                 style={{
//                   background: "rgba(255,50,50,0.2)",
//                   color: "#ff8080",
//                   border: "1px solid rgba(255,60,60,0.35)",
//                 }}
//               >
//                 <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
//                 Featured
//               </div>
//               <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl leading-snug max-w-2xl">
//                 {featured.title}
//               </p>
//             </div>
//             <a
//               href={videoUrl(featured.id)}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={(e) => e.stopPropagation()}
//               className="flex-shrink-0 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border transition-all"
//               style={{
//                 background: "rgba(255,40,40,0.15)",
//                 borderColor: "rgba(255,40,40,0.4)",
//                 color: "#ff7070",
//               }}
//             >
//               <Youtube className="w-4 h-4" />
//               Watch on YouTube
//             </a>
//           </div>
//         </motion.div>

//         {/* ── Scrollable row ── */}
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center justify-between">
//             <p className="text-white/50 text-sm font-medium">All Videos</p>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => scrollRow(-1)}
//                 className="p-2 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 text-white/60 hover:text-white transition-all"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => scrollRow(1)}
//                 className="p-2 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 text-white/60 hover:text-white transition-all"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           <div ref={rowRef} className="videos-row flex gap-3 overflow-x-auto pb-2">
//             {videos.map((video) => (
//               <RowCard
//                 key={video.id}
//                 video={video}
//                 isActive={video.id === featured.id}
//                 onClick={() => {
//                   setFeatured(video);
//                   setModalVideo(video);
//                 }}
//               />
//             ))}
//           </div>

//           <p className="text-white/20 text-xs">
//             Click a video to spotlight · click again to watch
//           </p>
//         </div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {modalVideo && (
//           <VideoModal
//             video={modalVideo}
//             onClose={() => setModalVideo(null)}
//             onPrev={handlePrev}
//             onNext={handleNext}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Youtube, X } from "lucide-react";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const videos = [
  { id: "Iu8U9eFnjxE", title: "Video 2"  },
  { id: "bzXDuVfLlnY", title: "Video 1"  },
  { id: "LPoVRIo-iDU", title: "Video 3"  },
  { id: "Nktf6KuWmTg", title: "Video 4"  },
  { id: "lS98Vqp9Bug", title: "Video 5"  },
  { id: "SO3_TzWDf2U", title: "Video 6"  },
  { id: "lqyBUsROsww", title: "Video 7"  },
  { id: "pzaljP0zc24", title: "Video 8"  },
  { id: "Xyy7LxSu8so", title: "Video 9"  },
  { id: "QTL0wVKHvQc", title: "Video 10" },
  { id: "iOU8y2qQhxw", title: "Video 11" },
];

const thumb    = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const videoUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

/* ─────────────────────────────────────────────
   Hook: responsive card dimensions
───────────────────────────────────────────── */
function useCardDims() {
  const [dims, setDims] = useState({ fw: 680, fh: 382, sw: 300, sh: 169, gap: 20 });

  useEffect(() => {
    function calc() {
      const vw = window.innerWidth;
      let fw, sw, gap;

      if (vw < 480) {
        gap = 10;
        fw  = Math.round(vw * 0.86);
        sw  = Math.round(vw * 0.40);
      } else if (vw < 768) {
        gap = 14;
        fw  = Math.round(vw * 0.78);
        sw  = Math.round(vw * 0.36);
      } else if (vw < 1100) {
        gap = 18;
        fw  = Math.min(580, Math.round(vw * 0.58));
        sw  = Math.round(fw * 0.48);
      } else {
        gap = 20;
        fw  = 680;
        sw  = 320;
      }

      setDims({
        fw, fh: Math.round((fw * 9) / 16),
        sw, sh: Math.round((sw * 9) / 16),
        gap,
      });
    }

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return dims;
}

/* ─────────────────────────────────────────────
   Embed Modal
───────────────────────────────────────────── */
function VideoModal({ video, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-10"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      <motion.div
        key={video.id}
        className="relative z-10 flex flex-col items-center gap-4 w-full max-w-5xl"
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1,    y: 0,  opacity: 1 }}
        exit={{    scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <div
          className="w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10"
          style={{ aspectRatio: "16/9", boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(220,38,38,0.15)" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full border-0"
            title={video.title}
          />
        </div>
        <div className="flex items-center justify-between w-full px-1 gap-3">
          <p className="text-white font-semibold text-sm sm:text-base truncate">{video.title}</p>
          <a
            href={videoUrl(video.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={{ background: "rgba(220,38,38,0.15)", borderColor: "rgba(220,38,38,0.4)", color: "#f87171" }}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Watch on </span>YouTube
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main
───────────────────────────────────────────── */
export function LongFormSection() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [modalVideo, setModalVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { fw, fh, sw, sh, gap } = useCardDims();

  const dragStartX = useRef(0);
  const dragDelta  = useRef(0);

  const goTo = useCallback((idx) => {
    setActiveIdx((idx + videos.length) % videos.length);
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowLeft")  goTo(activeIdx - 1);
      if (e.key === "ArrowRight") goTo(activeIdx + 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [activeIdx, goTo]);

  const onDragStart = (e) => {
    setIsDragging(false);
    dragStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    dragDelta.current  = 0;
  };
  const onDragMove = (e) => {
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    dragDelta.current = clientX - dragStartX.current;
    if (Math.abs(dragDelta.current) > 6) setIsDragging(true);
  };
  const onDragEnd = () => {
    if (Math.abs(dragDelta.current) > 45) {
      goTo(dragDelta.current < 0 ? activeIdx + 1 : activeIdx - 1);
    }
    setTimeout(() => setIsDragging(false), 10);
  };

  const getCardStyle = (i) => {
    let offset = i - activeIdx;
    if (offset >  videos.length / 2) offset -= videos.length;
    if (offset < -videos.length / 2) offset += videos.length;

    const isCenter = offset === 0;
    const absOff   = Math.abs(offset);

    if (absOff > 2.5) return null;

    const w     = isCenter ? fw : sw;
    const h     = isCenter ? fh : sh;
    const scale = isCenter ? 1  : 0.9  - Math.max(0, absOff - 1) * 0.05;
    const op    = isCenter ? 1  : 0.38 - Math.max(0, absOff - 1) * 0.10;
    const blur  = isCenter ? 0  : 1.5  + (absOff - 1) * 2;

    let x = 0;
    if (offset !== 0) {
      const sign = Math.sign(offset);
      x = sign * (fw / 2 + gap + sw / 2);
      if (absOff > 1) x += sign * (absOff - 1) * (sw + gap);
    }

    return { x, w, h, scale, op, blur, zIndex: isCenter ? 20 : 10 - absOff, isCenter };
  };

  const playBtnSize = fw < 360 ? 48 : fw < 480 ? 58 : 72;
  const playIconSize = fw < 360 ? 16 : fw < 480 ? 22 : 28;

  return (
    <div
      className="w-full py-12 sm:py-20 select-none overflow-hidden bg-gradient-to-bl from-black to-[#3b1010]"
      style={{ fontFamily: "'Syne', sans-serif", }}
    >
      

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="mb-8 sm:mb-14 flex items-end justify-between">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-red-500/60 mb-2 sm:mb-3">
              Long Form Content
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-none tracking-tight">
              YouTube{" "}
              <span
                className="text-red-500"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.1em" }}
              >
                Videos
              </span>
            </h2>
          </div>
          <p className="hidden sm:block text-white/20 text-xs tracking-widest mb-1">
            {videos.length} EPISODES
          </p>
        </div>

        {/* Swiper */}
        <div className="flex flex-col items-center">

          <div
            className="relative w-full cursor-grab active:cursor-grabbing"
            style={{ height: fh + 16, touchAction: "none" }}
            onMouseDown={onDragStart}
            onMouseMove={isDragging ? onDragMove : undefined}
            onMouseUp={onDragEnd}
            onMouseLeave={isDragging ? onDragEnd : undefined}
            onTouchStart={onDragStart}
            onTouchMove={onDragMove}
            onTouchEnd={onDragEnd}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {videos.map((v, i) => {
                const s = getCardStyle(i);
                if (!s) return null;
                const { x, w, h, scale, op, blur, zIndex, isCenter } = s;

                return (
                  <motion.div
                    key={v.id}
                    className="absolute"
                    style={{ zIndex, pointerEvents: "auto" }}
                    animate={{ x, scale, opacity: op, filter: `blur(${blur}px)` }}
                    transition={{ type: "spring", stiffness: 340, damping: 32, mass: 0.9 }}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{
                        width: w,
                        height: h,
                        borderRadius: isCenter ? 16 : 10,
                        cursor: isCenter ? "default" : "pointer",
                        boxShadow: isCenter
                          ? "0 0 0 1.5px rgba(220,38,38,0.55), 0 24px 70px rgba(0,0,0,0.7), 0 0 50px rgba(220,38,38,0.1)"
                          : "0 8px 24px rgba(0,0,0,0.5)",
                      }}
                      onClick={() => { if (!isCenter && !isDragging) goTo(i); }}
                    >
                      <img
                        src={thumb(v.id)}
                        alt={v.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />

                      <div
                        className="absolute inset-0"
                        style={{
                          background: isCenter
                            ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.08) 52%, transparent 100%)"
                            : "rgba(0,0,0,0.52)",
                        }}
                      />

                      {isCenter && (
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px]"
                          style={{ background: "linear-gradient(90deg, #dc2626, #f97316, transparent)" }}
                        />
                      )}

                      {isCenter && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.button
                            className="flex items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
                            style={{ width: playBtnSize, height: playBtnSize }}
                            whileHover={{ scale: 1.12, background: "rgba(220,38,38,0.4)", borderColor: "rgba(220,38,38,0.7)" }}
                            whileTap={{ scale: 0.94 }}
                            onClick={(e) => { e.stopPropagation(); if (!isDragging) setModalVideo(v); }}
                          >
                            <Play
                              className="text-white fill-white translate-x-0.5"
                              style={{ width: playIconSize, height: playIconSize }}
                            />
                          </motion.button>
                        </div>
                      )}

                      {isCenter && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 flex items-end justify-between gap-2">
                          <div className="min-w-0">
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold tracking-widest uppercase mb-1"
                              style={{ background: "rgba(220,38,38,0.2)", color: "#f87171", border: "1px solid rgba(220,38,38,0.3)" }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
                              Now Spotlit
                            </span>
                            <p className="text-white font-bold text-sm sm:text-lg leading-snug truncate">
                              {v.title}
                            </p>
                          </div>
                          <a
                            href={videoUrl(v.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex flex-shrink-0 items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-semibold border transition-all"
                            style={{ background: "rgba(220,38,38,0.15)", borderColor: "rgba(220,38,38,0.4)", color: "#f87171" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Youtube className="w-3.5 h-3.5" />
                            Watch
                          </a>
                        </div>
                      )}

                      {!isCenter && (
                        <p className="absolute bottom-2 left-2.5 right-2.5 text-white/60 text-[9px] sm:text-[11px] font-semibold line-clamp-2 leading-snug">
                          {v.title}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Nav + Dots */}
          <div className="mt-6 sm:mt-8 flex items-center gap-4 sm:gap-6">
            <motion.button
              onClick={() => goTo(activeIdx - 1)}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/12 hover:border-white/20 transition-all"
              style={{ width: 40, height: 40 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {videos.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  animate={{
                    width:      i === activeIdx ? 20 : 5,
                    opacity:    i === activeIdx ? 1  : 0.28,
                    background: i === activeIdx ? "#dc2626" : "#ffffff",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="h-[5px] rounded-full"
                  style={{ minWidth: 5 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => goTo(activeIdx + 1)}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/12 hover:border-white/20 transition-all"
              style={{ width: 40, height: 40 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          <p className="mt-3 text-white/20 text-[10px] sm:text-xs tracking-[0.2em] font-medium">
            {String(activeIdx + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {modalVideo && (
          <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}