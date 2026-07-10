'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, X, ChevronLeft, ChevronRight, Download, ExternalLink } from 'lucide-react';

/* ─────────────────────────────────────────────
   Data helpers
───────────────────────────────────────────── */
const slider1Banners = Array.from({ length: 17 }, (_, i) => ({ src: `/banners/${i + 1}.png`, id: i + 1 }));
const slider2Banners = Array.from({ length: 17 }, (_, i) => ({ src: `/banners/${i + 18}.png`, id: i + 18 }));
const slider3Banners = Array.from({ length: 19 }, (_, i) => ({ src: `/banners/${i + 35}.png`, id: i + 35 }));
const allBanners = [...slider1Banners, ...slider2Banners, ...slider3Banners];

// Moved outside component — computed once, never re-created
const tripled1 = [...slider1Banners, ...slider1Banners, ...slider1Banners];
const tripled2 = [...slider2Banners, ...slider2Banners, ...slider2Banners];
const tripled3 = [...slider3Banners, ...slider3Banners, ...slider3Banners];

/* ─────────────────────────────────────────────
   Global styles — injected once via a module-level
   constant, NOT inside render.
───────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&family=Playfair+Display:ital@1&display=swap');
  * { box-sizing: border-box; }
  @keyframes scroll-left  { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
  @keyframes scroll-right { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
`;

/* ─────────────────────────────────────────────
   StyleInjector — renders the style tag once
───────────────────────────────────────────── */
const StyleInjector = React.memo(function StyleInjector() {
  return <style>{GLOBAL_STYLES}</style>;
});

/* ─────────────────────────────────────────────
   Modal
───────────────────────────────────────────── */
const Modal = React.memo(function Modal({ banner, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Backdrop — no backdrop-blur for perf; subtle black overlay is enough */}
        <motion.div
          className="absolute inset-0 bg-black/90"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {/* Nav buttons */}
        <button
          onClick={onPrev}
          className="absolute left-3 sm:left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white hidden sm:flex items-center justify-center"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-3 sm:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white hidden sm:flex items-center justify-center"
          aria-label="Next banner"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-4 max-w-5xl w-full"
          initial={{ scale: 0.88, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.88, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          key={banner.id}
        >
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{ aspectRatio: '4/1', maxHeight: '280px' }}
          >
            <Image
              src={banner.src}
              alt={`LinkedIn Banner #${banner.id}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                #{banner.id} / 53
              </span>
              <span className="text-sm text-white/60 hidden sm:block">LinkedIn Banner</span>
            </div>
            <div className="flex gap-2 sm:hidden">
              <button onClick={onPrev} className="p-2 rounded-full bg-white/10 text-white"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={onNext} className="p-2 rounded-full bg-white/10 text-white"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={banner.src}
                download
                className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

/* ─────────────────────────────────────────────
   Banner card — plain button instead of motion.button.
   Hover effects handled purely in CSS for zero JS overhead.
───────────────────────────────────────────── */
const BannerCard = React.memo(function BannerCard({ banner, onClick }) {
  return (
    <button
      onClick={onClick}
      className="banner-card relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      style={{
        width: 'clamp(280px, 40vw, 720px)',
        height: 'clamp(70px, 10vw, 180px)',
      }}
      aria-label={`Open banner #${banner.id}`}
    >
      <Image
        src={banner.src}
        alt={`LinkedIn Banner ${banner.id}`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 280px, (max-width: 1280px) 40vw, 720px"
        draggable={false}
        // Don't load all 153 images eagerly — lazy load non-visible ones
        loading="lazy"
      />
      {/* Hover overlay — pure CSS, zero JS */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        #{banner.id}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-2.5 rounded-full bg-white/20 border border-white/30">
          <ExternalLink className="w-4 h-4 text-white" />
        </div>
      </div>
    </button>
  );
});

/* ─────────────────────────────────────────────
   SliderRow — receives pre-tripled array so no
   inline triple() call on each render.
───────────────────────────────────────────── */
const SliderRow = React.memo(function SliderRow({ tripledBanners, direction, isPaused, duration, onBannerClick }) {
  const animName = direction === 'left' ? 'scroll-left' : 'scroll-right';
  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #080a0f, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #080a0f, transparent)' }}
      />
      <div
        className="flex gap-4 sm:gap-6 w-max"
        style={{
          animation: `${animName} ${duration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
          // Use will-change to promote to its own GPU layer
          willChange: 'transform',
        }}
      >
        {tripledBanners.map((banner, idx) => (
          <BannerCard
            key={`${banner.id}-${idx}`}
            banner={banner}
            onClick={() => onBannerClick(banner)}
          />
        ))}
      </div>
    </div>
  );
});

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function LinkedInBannerSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const [modalBanner, setModalBanner] = useState(null);

  const currentIndex = modalBanner ? allBanners.findIndex(b => b.id === modalBanner.id) : -1;

  const handlePrev = useCallback(() => {
    setModalBanner(allBanners[(currentIndex - 1 + allBanners.length) % allBanners.length]);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setModalBanner(allBanners[(currentIndex + 1) % allBanners.length]);
  }, [currentIndex]);

  const handleClose = useCallback(() => setModalBanner(null), []);

  return (
    <div
      className="relative w-full md:min-h-screen py-10 sm:py-16 overflow-hidden"
      style={{ background: '#080a0f', fontFamily: "'DM Sans', sans-serif" }}
    >
      <StyleInjector />

      {/* Ambient orbs — static, no animation, cheap */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%', width: '60vw', height: '60vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,82,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Header */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-14">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-blue-400/70 mb-2">
              Professional Collection
            </p>
            <h1
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
              className="text-3xl sm:text-4xl md:text-5xl text-white leading-tight"
            >
              LinkedIn Banner{' '}
              <span
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400 }}
                className="text-blue-300"
              >
                Gallery
              </span>
            </h1>
            <p className="mt-2 text-white/40 text-sm sm:text-base">
              53 professional designs · click any to preview
            </p>
          </div>
          <button
            onClick={() => setIsPaused(p => !p)}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200"
            style={{
              background: isPaused ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)',
              borderColor: isPaused ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.1)',
              color: 'white',
            }}
            aria-label={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused
              ? <><Play className="w-4 h-4 fill-white" /><span className="text-sm hidden sm:inline">Resume</span></>
              : <><Pause className="w-4 h-4 fill-white/70" /><span className="text-sm hidden sm:inline text-white/60">Pause</span></>
            }
          </button>
        </div>
        <div className="mt-8 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
      </div>

      {/* Sliders — pass pre-built tripled arrays */}
      <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
        <SliderRow tripledBanners={tripled1} direction="right" isPaused={isPaused} duration={60} onBannerClick={setModalBanner} />
        <SliderRow tripledBanners={tripled2} direction="left"  isPaused={isPaused} duration={70} onBannerClick={setModalBanner} />
        <SliderRow tripledBanners={tripled3} direction="right" isPaused={isPaused} duration={80} onBannerClick={setModalBanner} />
      </div>

      {/* Footer */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 mt-10 sm:mt-14">
        <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
        <div className="flex items-center justify-between text-white/25 text-xs sm:text-sm">
          <span>© LinkedIn Banner Gallery</span>
          <span>53 designs total</span>
        </div>
      </div>

      {/* Modal */}
      {modalBanner && (
        <Modal
          banner={modalBanner}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}