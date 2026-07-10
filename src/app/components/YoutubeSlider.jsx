import { useState, useEffect, useRef, useCallback } from "react";

const CHANNEL_ID = "UClJoLM1GrN-0rwoUzqY03AA";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatViews(n) {
  if (!n) return "";
  const num = parseInt(n, 10);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M views`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K views`;
  return `${num} views`;
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-72 rounded-xl overflow-hidden animate-pulse"
      style={{ background: "#1a1a1a" }}>
      <div className="w-full aspect-video" style={{ background: "#2e2e2e" }} />
      <div className="p-3 space-y-2">
        <div className="h-4 rounded" style={{ background: "#2e2e2e", width: "90%" }} />
        <div className="h-3 rounded" style={{ background: "#2e2e2e", width: "60%" }} />
      </div>
    </div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────

function VideoCard({ video, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 w-72 rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: "#1a1a1a",
        border: isActive ? "2px solid #df3c3c" : "2px solid transparent",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(223,60,60,0.18)"
          : "0 2px 12px rgba(0,0,0,0.4)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            background: "rgba(0,0,0,0.35)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 48,
              height: 48,
              background: "#df3c3c",
              boxShadow: "0 0 20px rgba(223,60,60,0.7)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Duration badge placeholder — live badge */}
        <div
          className="absolute bottom-2 right-2 text-white text-xs font-mono px-1.5 py-0.5 rounded"
          style={{ background: "rgba(0,0,0,0.75)", fontFamily: "'DM Mono', monospace" }}
        >
          {timeAgo(video.publishedAt)}
        </div>
      </div>

      {/* Meta */}
      <div className="p-3">
        <h3
          className="text-sm font-semibold leading-snug line-clamp-2 mb-1.5"
          style={{ color: "#f5f0e8", fontFamily: "'DM Sans', sans-serif" }}
        >
          {video.title}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className="text-xs"
            style={{ color: "#888", fontFamily: "'DM Mono', monospace" }}
          >
            {formatViews(video.viewCount)}
          </span>
          {video.viewCount && (
            <span style={{ color: "#2e2e2e" }}>·</span>
          )}
          <span
            className="text-xs"
            style={{ color: "#888", fontFamily: "'DM Mono', monospace" }}
          >
            {formatDate(video.publishedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Player ──────────────────────────────────────────────────────────────

function VideoPlayer({ video }) {
  if (!video) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#111",
        border: "1px solid #2e2e2e",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}
    >
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&rel=0&modestbranding=1`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4 md:p-5">
        <h2
          className="text-lg md:text-xl font-semibold leading-snug mb-1"
          style={{ color: "#f5f0e8", fontFamily: "'DM Sans', sans-serif" }}
        >
          {video.title}
        </h2>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          <span
            className="text-sm"
            style={{ color: "#df3c3c", fontFamily: "'DM Mono', monospace" }}
          >
            {formatViews(video.viewCount)}
          </span>
          <span style={{ color: "#2e2e2e" }}>·</span>
          <span
            className="text-sm"
            style={{ color: "#888", fontFamily: "'DM Mono', monospace" }}
          >
            {formatDate(video.publishedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function YoutubeSlider({ apiKey }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ── Fetch videos ──
  useEffect(() => {
    if (!apiKey) {
      setError("YouTube API key required. Pass it as the `apiKey` prop.");
      setLoading(false);
      return;
    }

    async function fetchVideos() {
      try {
        setLoading(true);

        // Step 1: Get upload playlist ID
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${apiKey}`
        );
        const channelData = await channelRes.json();

        if (channelData.error) throw new Error(channelData.error.message);

        const uploadsPlaylistId =
          channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsPlaylistId) throw new Error("Could not find uploads playlist.");

        // Step 2: Get latest 20 videos from playlist
        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&key=${apiKey}`
        );
        const playlistData = await playlistRes.json();
        if (playlistData.error) throw new Error(playlistData.error.message);

        const videoIds = playlistData.items
          .map((item) => item.snippet.resourceId.videoId)
          .join(",");

        // Step 3: Get stats (views etc.)
        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
        );
        const statsData = await statsRes.json();
        if (statsData.error) throw new Error(statsData.error.message);

        const formatted = statsData.items.map((item) => ({
          videoId: item.id,
          title: item.snippet.title,
          thumbnail:
            item.snippet.thumbnails?.maxres?.url ||
            item.snippet.thumbnails?.high?.url ||
            item.snippet.thumbnails?.medium?.url,
          publishedAt: item.snippet.publishedAt,
          viewCount: item.statistics?.viewCount,
        }));

        setVideos(formatted);
      } catch (err) {
        setError(err.message || "Failed to load videos.");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [apiKey]);

  // ── Scroll sync ──
  const updateScrollButtons = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [videos, updateScrollButtons]);

  const scroll = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  // ── Render ──
  const activeVideo = videos[activeIndex] || null;

  return (
    <section
      className="w-full px-4 md:px-8 py-10 md:py-16"
      style={{ background: "#0a0a0a", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 max-w-screen-xl mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-1">
            {/* Red accent bar */}
            <div
              className="rounded-full"
              style={{ width: 4, height: 32, background: "#df3c3c" }}
            />
            <h2
              className="text-3xl md:text-4xl tracking-wide uppercase"
              style={{
                color: "#f5f0e8",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.08em",
              }}
            >
              Latest Videos
            </h2>
          </div>
          <p className="text-sm ml-4" style={{ color: "#888" }}>
            Ambaa Talks — Unveiling the Unknown
          </p>
        </div>

        {/* Arrow Controls */}
        <div className="flex gap-2">
          {[
            { dir: -1, disabled: !canScrollLeft, label: "←" },
            { dir: 1, disabled: !canScrollRight, label: "→" },
          ].map(({ dir, disabled, label }) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              disabled={disabled}
              className="flex items-center justify-center rounded-full transition-all duration-200 text-sm font-bold select-none"
              style={{
                width: 40,
                height: 40,
                background: disabled ? "#1a1a1a" : "#df3c3c",
                color: disabled ? "#444" : "#fff",
                border: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                boxShadow: disabled ? "none" : "0 4px 16px rgba(223,60,60,0.3)",
                transform: disabled ? "none" : "scale(1)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto space-y-8">
        {/* Active Video Player */}
        {!loading && !error && activeVideo && (
          <VideoPlayer video={activeVideo} />
        )}

        {/* Error State */}
        {error && (
          <div
            className="rounded-xl p-6 text-center"
            style={{ background: "#1a1a1a", border: "1px solid #df3c3c33" }}
          >
            <p style={{ color: "#df3c3c", fontFamily: "'DM Mono', monospace" }}>
              ⚠ {error}
            </p>
            <p className="text-xs mt-2" style={{ color: "#888" }}>
              Make sure your YouTube Data API v3 key is valid and has quota available.
            </p>
          </div>
        )}

        {/* Slider */}
        <div className="relative">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: "linear-gradient(to right, #0a0a0a, transparent)",
              opacity: canScrollLeft ? 1 : 0,
            }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: "linear-gradient(to left, #0a0a0a, transparent)",
              opacity: canScrollRight ? 1 : 0,
            }}
          />

          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : videos.map((video, i) => (
                  <VideoCard
                    key={video.videoId}
                    video={video}
                    isActive={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
          </div>
        </div>

        {/* Dot indicators */}
        {!loading && videos.length > 0 && (
          <div className="flex justify-center gap-1.5 pt-2">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  background: i === activeIndex ? "#df3c3c" : "#2e2e2e",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}