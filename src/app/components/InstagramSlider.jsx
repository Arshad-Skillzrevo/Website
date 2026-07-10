import { useEffect, useRef, useState } from "react";

/**
 * SETUP — do this once:
 * 1. Go to https://developers.facebook.com and create an app
 * 2. Add "Instagram Basic Display" product
 * 3. Add @atmediaproduction as a test user
 * 4. Generate a long-lived access token (valid 60 days):
 *    https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens
 * 5. Paste the token in your .env file:
 *    VITE_INSTAGRAM_TOKEN=your_token_here   (Vite)
 *    REACT_APP_INSTAGRAM_TOKEN=your_token_here  (CRA)
 */

const TOKEN = import.meta.env.VITE_INSTAGRAM_TOKEN; // change to process.env.REACT_APP_INSTAGRAM_TOKEN if using CRA
const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
const API_URL = `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=12&access_token=${TOKEN}`;

const LabelRow = ({ text }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-7 h-px bg-red-700 block" />
    <span className="text-red-600 text-[9px] tracking-[4px] uppercase font-medium">{text}</span>
  </div>
);

function PostCard({ post, onClick }) {
  const isVideo = post.media_type === "VIDEO";
  const imgSrc = isVideo ? post.thumbnail_url : post.media_url;
  const caption = post.caption?.slice(0, 80) + (post.caption?.length > 80 ? "…" : "");
  const date = new Date(post.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div
      onClick={() => onClick(post)}
      className="flex-shrink-0 w-64 snap-start cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden bg-zinc-900 mb-3" style={{ aspectRatio: "1" }}>
        <img
          src={imgSrc}
          alt={caption || "Instagram post"}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
        />
        {/* Video badge */}
        {isVideo && (
          <span className="absolute top-2 left-2 bg-black/70 border border-white/20 text-white text-[8px] tracking-[1.5px] uppercase px-2 py-1">
            ▶ Video
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs tracking-[2px] uppercase">View Post</span>
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-zinc-400 text-[12px] leading-relaxed mb-1 line-clamp-2">{caption}</p>
      )}
      <p className="text-zinc-600 text-[9px] tracking-[1.5px] uppercase">{date}</p>
    </div>
  );
}

function Lightbox({ post, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!post) return null;
  const isVideo = post.media_type === "VIDEO";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-zinc-900 border border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-zinc-400 hover:text-white text-xl leading-none transition-colors"
        >
          ✕
        </button>

        {/* Media */}
        {isVideo ? (
          <video
            src={post.media_url}
            controls
            autoPlay
            className="w-full"
            style={{ maxHeight: "60vh", objectFit: "contain" }}
          />
        ) : (
          <img
            src={post.media_url}
            alt={post.caption || "Instagram post"}
            className="w-full"
            style={{ maxHeight: "60vh", objectFit: "contain" }}
          />
        )}

        {/* Info */}
        <div className="p-5">
          {post.caption && (
            <p className="text-zinc-300 text-sm leading-relaxed mb-4 max-h-24 overflow-y-auto">
              {post.caption}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 text-[9px] tracking-[2px] uppercase">
              {new Date(post.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-500 text-[9px] tracking-[2px] uppercase transition-colors"
            >
              Open on Instagram →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstagramSlider() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!TOKEN) {
      setError("No access token found. Add VITE_INSTAGRAM_TOKEN to your .env file.");
      setLoading(false);
      return;
    }

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error.message);
        // Filter out CAROUSEL_ALBUM children if any, keep images + videos
        const filtered = (data.data || []).filter(
          (p) => p.media_type === "IMAGE" || p.media_type === "VIDEO"
        );
        setPosts(filtered);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const scroll = (dir) => sliderRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <section className="px-6 py-20 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,#cc2200,transparent)" }} />

      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <LabelRow text="Follow The Work" />
          <h2 className="text-4xl font-light leading-none tracking-tight text-stone-100">
            @atmedia<em className="font-serif not-italic" style={{ fontStyle: "italic", color: "#e03010" }}>production</em>
          </h2>
        </div>

        {/* Nav arrows */}
        {!loading && !error && posts.length > 0 && (
          <div className="flex gap-2">
            {["←", "→"].map((a, i) => (
              <button
                key={a}
                onClick={() => scroll(i === 0 ? -1 : 1)}
                className="w-9 h-9 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              >
                {a}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center gap-3 py-16">
          <span className="w-4 h-4 rounded-full border-2 border-red-700 border-t-transparent animate-spin" />
          <span className="text-zinc-500 text-sm tracking-widest uppercase">Fetching posts…</span>
        </div>
      )}

      {error && (
        <div className="border border-red-900/50 bg-red-950/20 p-5 max-w-lg">
          <p className="text-red-400 text-xs font-mono leading-relaxed">{error}</p>
          <p className="text-zinc-500 text-[11px] mt-3 leading-relaxed">
            Make sure your token is valid and the account is added as a test user in the Meta Developer dashboard.
          </p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="text-zinc-500 text-sm py-16">No posts found for this account.</p>
      )}

      {/* Slider */}
      {!loading && !error && posts.length > 0 && (
        <>
          <div className="overflow-hidden -mx-6 px-6">
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onClick={setActivePost} />
              ))}
            </div>
          </div>

          {/* Post count */}
          <p className="text-zinc-600 text-[9px] tracking-[2.5px] uppercase mt-5">
            {posts.length} posts loaded · Scroll to explore
          </p>
        </>
      )}

      {/* Follow CTA */}
      <div className="flex flex-wrap gap-3 mt-8">
        <a
          href="https://instagram.com/atmediaproduction"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white text-[10px] font-bold tracking-[2px] uppercase px-7 py-4 transition-colors"
        >
          Follow on Instagram
        </a>
        <a
          href="https://instagram.com/atmediaproduction"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center border border-zinc-800 hover:border-zinc-500 text-white text-[10px] font-semibold tracking-[2px] uppercase px-7 py-4 transition-colors"
        >
          DM "Growth" →
        </a>
      </div>

      {/* Lightbox */}
      <Lightbox post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
}