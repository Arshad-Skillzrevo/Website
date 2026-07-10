import { useState, useEffect, useRef } from "react";


const fonts = {
  display: "'Bebas Neue', sans-serif",
  body: "'DM Sans', sans-serif",
  mono: "'DM Mono', monospace",
};

const GlobalStyles = () => (
  <style>{`
    html{scroll-behavior:smooth;},
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  `}</style>
);

const vcData = [
  {
    title: "This Sport Will Replace The Gym — Ft. Anurag Chaudhary",
    badge: "● New",
    badgeStyle: "bg-red-700 text-white",
    duration: "43:01",
    meta: ["Long-form", "Agra → Bangkok"],
  },
  {
    title: "Karm Karo, Result Ki Chinta Mat Karo! — Ft. Nakshtra",
    badge: "AT Media Podcast",
    badgeStyle: "bg-black/70 border border-white/20 text-white",
    duration: "28:12",
    meta: ["Episode 12", "Bhagavad Gita"],
  },
  {
    title: "40 Saal Purani Kahani — Lok Devta, Tantra Aur Ek Puri Zindagi",
    badge: "Don't Miss This",
    badgeStyle: "bg-black/70 border border-white/20 text-white",
    duration: "21:27",
    meta: ["Long-form", "Ambaa Talks"],
  },
  {
    title: "The Hook Formula We Use On Every Single Client Video",
    badge: "AT Media Podcast",
    badgeStyle: "bg-black/70 border border-white/20 text-white",
    duration: "36:45",
    meta: ["Strategy", "Deep Dive"],
  },
  {
    title: "We Rebuilt A Creator's Entire Content System From Scratch",
    badge: "Ambaa Talks",
    badgeStyle: "bg-black/70 border border-white/20 text-white",
    duration: "52:10",
    meta: ["Long-form", "Case Study"],
  },
];

const igPosts = [
  {
    likes: 248,
    type: "Post",
    content: (
      <div
        className="text-center p-3 w-full h-full flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(135deg,#0a0a0a,#1a0a0a)" }}
      >
        <p className="text-red-600 text-[9px] tracking-widest uppercase mb-2">
          Case Study
        </p>
        <p className="text-stone-100 text-sm font-bold leading-tight">
          ONE PODCAST
          <br />
          <span className="text-red-600">8K → 16M</span>
          <br />
          SUBSCRIBERS
        </p>
        <p className="text-zinc-600 text-[8px] mt-2">It was a formula.</p>
      </div>
    ),
  },
  {
    likes: 91,
    type: "Reel",
    content: (
      <div
        className="text-center p-3 w-full h-full flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(135deg,#f5f0e8,#ede5d5)" }}
      >
        <p className="text-zinc-500 text-[9px] tracking-widest uppercase mb-2">
          Mataki Chetna
        </p>
        <div className="w-12 h-12 bg-zinc-900 rounded flex items-center justify-center mb-2">
          <span className="text-red-600 text-lg">▶</span>
        </div>
        <p className="bg-zinc-900 text-stone-100 text-[9px] tracking-widest uppercase px-2 py-1">
          Our Edits
        </p>
      </div>
    ),
  },
  {
    likes: 63,
    type: "Post",
    content: (
      <div className="text-center p-3 w-full h-full flex flex-col items-center justify-center bg-zinc-950">
        <p className="text-zinc-600 text-[8px] tracking-widest uppercase mb-2">
          AT Media Productions
        </p>
        <p className="text-red-600 text-4xl font-bold leading-none mb-2">
          HIRI
          <br />
          NG
        </p>
        <p className="text-zinc-500 text-[8px]">
          Video Editors
          <br />
          Graphic Designers
        </p>
      </div>
    ),
  },
];

const tgPosts = [
  {
    bg: "linear-gradient(160deg,#0d0808,#1a0505,#2a0a00)",
    caption: "182 Posts · Ancient Tantra",
    label: (
      <p className="text-stone-100 text-[10px] font-semibold leading-tight">
        EK MANDIR
        <br />
        MEIN 10 DEVI?
      </p>
    ),
  },
  {
    bg: "linear-gradient(160deg,#080808,#151515)",
    caption: "Top performing reel",
    label: (
      <div className="text-center">
        <p className="text-red-600 text-3xl font-bold leading-none">15.6K</p>
        <p className="text-zinc-600 text-[8px] tracking-widest uppercase mt-1">
          ❤ Likes
        </p>
        <p className="text-zinc-500 text-[9px] mt-2">Maa ki murti ke neeche</p>
      </div>
    ),
  },
  {
    bg: "linear-gradient(160deg,#120510,#1e0a18)",
    caption: "Collab Content",
    label: (
      <p className="text-stone-100 text-[11px] font-semibold leading-tight">
        REALITY OF
        <br />
        <span className="text-red-600 text-base">HYROX</span>
        <br />
        FT. ANURAG
      </p>
    ),
  },
  {
    bg: "linear-gradient(160deg,#0a0a00,#151500)",
    caption: "Podcast crossover",
    label: (
      <div className="text-center">
        <p className="text-zinc-500 text-[9px] tracking-widest uppercase mb-2">
          Ambaa Talks Podcast
        </p>
        <p className="text-stone-100 text-xs font-semibold">
          AT THE INTERSECTION OF TANTRA & BUSINESS
        </p>
      </div>
    ),
  },
  {
    bg: "#0a0a0a",
    caption: "Viral content",
    label: (
      <div className="text-center">
        <p className="text-zinc-600 text-[9px] tracking-widest uppercase mb-2">
          Sanatan Dharma
        </p>
        <p className="text-red-600 text-sm font-bold">
          JAISE PREMANAND
          <br />
          JI MAHARAJ
        </p>
      </div>
    ),
  },
  {
    bg: "linear-gradient(160deg,#050510,#0a0a1a)",
    caption: "Mystical Wisdom",
    label: (
      <p className="text-stone-100 text-[11px] font-semibold leading-tight">
        MAHABHARAT
        <br />
        KA SABSE
        <br />
        <span className="text-red-600">BADA RAHASYA</span>
      </p>
    ),
  },
];

const results = [
  {
    n: "01",
    title: "4,054 Followers Built Organically",
    sub: "Ancient Tantra is a niche. We found the audience that was already searching.",
  },
  {
    n: "02",
    title: "15.6K Likes on a Single Reel",
    sub: "Hook-first editing, platform-native pacing. One video. Massive reach.",
  },
  {
    n: "03",
    title: "182 Posts. Consistent. On System.",
    sub: "No scrambling. No gaps. A posting engine that runs without the creator burning out.",
  },
  {
    n: "04",
    title: "Cross-Platform Content Repurposing",
    sub: "Instagram Reels → YouTube Shorts → Podcast clips. One shoot. Maximum reach.",
  },
];

const LabelRow = ({ text }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-7 h-px bg-red-700 block" />
    <span className="text-red-600 text-[9px] tracking-[4px] uppercase font-medium">
      {text}
    </span>
  </div>
);

const BtnRed = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white text-[10px] font-bold tracking-[2px] uppercase px-7 py-4 transition-colors"
  >
    {children}
  </a>
);

const BtnOutline = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 border border-zinc-800 hover:border-zinc-500 text-white text-[10px] font-semibold tracking-[2px] uppercase px-7 py-4 transition-colors"
  >
    {children}
  </a>
);

export default function ATMediaSections() {
  const vcRef = useRef(null);

  const [videos, setVideos] = useState([]);


useEffect(() => {
  async function getVideos() {
    try {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBJD1oMTn9GbEehkrpUGHcWCfStlzi7JDg&channelId=UClJoLM1GrN-0rwoUzqY03AA&part=snippet,id&type=video&videoDuration=medium&order=date&maxResults=10`
        );
      const data = await res.json();

      setVideos(data.items || []);
    } catch (err) {
      console.error(err);
    }
  }

  getVideos();
}, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-7");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scroll = (dir) =>
    vcRef.current?.scrollBy({ left: dir * 274, behavior: "smooth" });

  return (
    <div className="bg-zinc-950 text-stone-100 font-light antialiased overflow-x-hidden">
      <GlobalStyles />
      {/* ── AMBAA TALKS ── */}
      <section id="ambaa-talks" className="px-6 pt-20 relative overflow-hidden max-w-6xl mx-auto">
        {/* watermark */}
        <span
          className="absolute top-10 -right-5 text-white/[0.025] font-black  uppercase tracking-widest pointer-events-none select-none whitespace-nowrap"
          style={{ fontSize: "clamp(60px,18vw,130px)" }}
        >
          AMBAA TALKS
        </span>

        <div className="reveal opacity-0 translate-y-7 transition-all duration-700">
          <LabelRow text="Our Media Arm" />
          <h2 className={`text-8xl leading-none tracking-tight mb-4 ${fonts.display}`}
            style={{
              fontFamily: fonts.display,
            }}
          >
            We're In The
            <br />
            <em
              className="font-serif italic text-red-500 not-italic"
              style={{ fontStyle: "italic" }}
            >
              Game Too.
            </em>
          </h2>
        </div>

        {/* Channel card */}
        <div className="reveal opacity-0 translate-y-7 transition-all duration-700 delay-100 mt-8 mb-10 bg-zinc-900 border border-zinc-800 border-l-4 border-l-red-700 p-8 relative overflow-hidden">
          <div
            className="absolute bottom-0 right-0 w-28 h-28 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(204,34,0,.08),transparent 70%)",
            }}
          />
          <div className="inline-flex items-center gap-2 bg-red-900/20 border border-red-800/40 px-3 py-1 mb-5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-red-500 text-[9px] tracking-[3px] uppercase">
              Now Airing
            </span>
          </div>
          <h3
            className="text-stone-100 font-black uppercase tracking-wide leading-none mb-5"
            style={{ fontSize: "clamp(44px,12vw,72px)" }}
          >
            <span className="block">Ambaa</span>
            <span className="block">Talks</span>
          </h3>
          <p className="text-zinc-500 text-[10px] tracking-[3px] uppercase mb-4">
            Podcast · Stories · Perspectives · Growth
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            We don't just produce content for clients —{" "}
            <strong className="text-stone-200 font-medium">
              we make our own.
            </strong>
            <br />
            <br />
            Ambaa Talks is our interview series where we sit down with creators,
            founders, and operators. Real conversations about content, business,
            and what actually works in the market.
            <br />
            <br />
            When we advise you, we're speaking from inside the game — not from a
            slide deck.
          </p>
          <p className="text-red-600 text-[10px] tracking-[2px] uppercase">
            @AmbaaTalks
          </p>
        </div>

        {/* Stats */}
        <div className="reveal opacity-0 translate-y-7 transition-all duration-700 delay-100 grid grid-cols-3 border border-zinc-800 mb-12">
          {[
            ["2K+", "Subscribers"],
            ["227", "Videos Live"],
            ["∞", "Free Value"],
          ].map(([n, l], i) => (
            <div
              key={l}
              className={`py-6 text-center ${i < 2 ? "border-r border-zinc-800" : ""}`}
            >
              <span className="block font-serif text-3xl font-bold text-stone-200 leading-none mb-1">
                {n}
              </span>
              <span className="text-zinc-500 text-[9px] tracking-[2px] uppercase">
                {l}
              </span>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className="reveal opacity-0 translate-y-7 transition-all duration-700 delay-200">
          <div className="flex items-center justify-between mb-5">
            <span className="text-zinc-500 text-[9px] tracking-[3px] uppercase">
              Latest Episodes
            </span>
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
          </div>
          <div className="overflow-hidden -mx-6 px-6">
            <div
              ref={vcRef}
              className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {videos.map((video, i) => (
                <a
                  key={video.id.videoId || i}
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-64 snap-start group no-underline"
                >
                  <div
                    className="relative w-full bg-zinc-900 mb-3 overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={
                        video.snippet.thumbnails.high?.url ||
                        video.snippet.thumbnails.medium?.url ||
                        video.snippet.thumbnails.default?.url
                      }
                      alt={video.snippet.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="42" height="42" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="12"
                          fill="rgba(204,34,0,.9)"
                        />
                        <path d="M10 8l6 4-6 4V8z" fill="white" />
                      </svg>
                    </div>

                    {/* Badge */}
                    <span className="absolute top-2 left-2 bg-red-700 text-white text-[8px] tracking-[1.5px] uppercase px-2 py-1">
                      Latest
                    </span>

                    {/* Published Date */}
                    <span className="absolute bottom-2 right-2 bg-black/85 text-white text-[10px] px-1.5 py-0.5">
                      {new Date(video.snippet.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Video Title */}
                  <p className="text-stone-200 text-[13px] font-medium leading-snug mb-1 group-hover:-translate-y-0.5 transition-transform line-clamp-2">
                    {video.snippet.title}
                  </p>

                  {/* Channel Name */}
                  <div className="flex gap-2 text-zinc-500 text-[9px] tracking-[1.5px] uppercase">
                    <span>{video.snippet.channelTitle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal opacity-0 translate-y-7 transition-all duration-700 delay-300 flex flex-wrap gap-3 mt-9 mb-20">
          <BtnRed href="https://www.youtube.com/@AmbaaTalks">
            Watch Ambaa Talks
          </BtnRed>
          <BtnOutline href="https://www.youtube.com/@AmbaaTalks">
            @AmbaaTalks →
          </BtnOutline>
        </div>
      </section>


    </div>
  );
}
