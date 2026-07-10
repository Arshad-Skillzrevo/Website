

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ATMediaSections from "./components/ATMediaSections";
import GlobalLeadModal from "./components/GlobalLeadModal";
import { Bebas_Neue, DM_Sans, DM_Mono } from "next/font/google";

export const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
});

// const Services = dynamic(() => import("./components/Services"));

const SocialPostSlider = dynamic(
  () =>
    import("./components/Socialpostslider").then((m) => m.SocialPostSlider),
  { ssr: false },
);

const ThumbnailSliderCSS = dynamic(
  () =>
    import("./components/Thumbnailslider").then((m) => m.ThumbnailSliderCSS),
  { ssr: false },
);

const LinkedInBannerSlider = dynamic(
  () => import("./components/LinkedinBannerSlider"),
  { ssr: false },
);

const ShortsSection = dynamic(
  () => import("./components/Shortssection").then((m) => m.ShortsSection),
  { ssr: false },
);

const LongFormSection = dynamic(
  () => import("./components/LongFormSection").then((m) => m.LongFormSection),
  { ssr: false },
);

const colors = {
  black: "#0a0a0a",
  white: "#f5f0e8",
  accent: "#df3c3c",
  grey: "#1a1a1a",
  mid: "#2e2e2e",
  muted: "#888",
};

const fonts = {
  display: bebas.style.fontFamily,
  body: dmSans.style.fontFamily,
  mono: dmMono.style.fontFamily,
};

const GlobalStyles = () => (
  <style>{`
html{scroll-behavior:smooth;},
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
    @keyframes ticker {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .hero-bg-text {
      position: absolute;
      top: -2%;
      right: -3%;
      font-family: ${fonts.display};
      font-size: clamp(180px, 28vw, 420px);
      color: #111;
      line-height: 1;
      pointer-events: none;
      user-select: none;
      animation: fadeIn 1.2s ease forwards;
    }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
    .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
    .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
    .fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }
    .ticker-inner { display: inline-flex; animation: ticker 24s linear infinite; }
    .service-card { transition: background 0.2s; }
    .service-card:hover { background: #111 !important; }
    .who-card { transition: background 0.2s; }
    .who-card:hover { background: #222 !important; }
    .nav-link { color: ${colors.muted}; text-decoration: none; font-size: 0.83rem; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; transition: color 0.2s; }
    .nav-link:hover { color: ${colors.white}; }
    .btn-sec { border: 1px solid #444; color: ${colors.white}; padding: 16px 34px; font-weight: 500; font-size: 0.93rem; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; display: inline-block; transition: border-color 0.2s; cursor: pointer; background: transparent; }
    .btn-sec:hover { border-color: ${colors.white}; }
    .footer-link { color: ${colors.muted}; text-decoration: none; font-size: 0.9rem; transition: color 0.2s; display: block; }
    .footer-link:hover { color: ${colors.white}; }
    .dm-pill { display: inline-block; border: 1px solid #333; color: ${colors.muted}; padding: 16px 34px; font-weight: 500; font-size: 0.93rem; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; transition: border-color 0.2s, color 0.2s; cursor: pointer; background: transparent; }
    .dm-pill:hover { border-color: ${colors.white}; color: ${colors.white}; }
    .diff-card:hover .diff-us-accent { color: ${colors.accent}; }
    @media (max-width: 900px) {
      .hero-bg-text { font-size: 140px; right: -10%; opacity: 0.35; }
      .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
      .three-col { grid-template-columns: 1fr !important; }
      .four-col { grid-template-columns: 1fr !important; }
      .nav-links-wrap { display: none !important; }
      h1 { font-size: clamp(56px, 14vw, 100px) !important; }
      h2 { font-size: clamp(40px, 10vw, 70px) !important; }
    }
  `}</style>
);

const SectionLabel = ({ children, dark = false }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: "0.72rem",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.8)" : colors.accent,
      marginBottom: 18,
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    <span
      style={{
        width: 24,
        height: 1,
        background: dark ? "rgba(255,255,255,0.8)" : colors.accent,
        display: "inline-block",
      }}
    />
    {children}
  </div>
);

const Heading = ({ children, style = {} }) => (
  <h2
    style={{
      fontFamily: fonts.display,
      fontSize: "clamp(42px, 6vw, 80px)",
      lineHeight: 0.95,
      letterSpacing: "0.02em",
      marginBottom: 20,
      color: colors.white,
      ...style,
    }}
  >
    {children}
  </h2>
);

// ── NAV ──
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 5%",
        background: scrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.7)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? "#1e1e1e" : "transparent"}`,
        transition: "all 0.3s ease",
      }}
    >
      <GlobalLeadModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: "2rem",
          letterSpacing: "0.08em",
          color: colors.accent,
        }}
      >
        <img
          src="/atlogo.png"
          alt="AT Media"
          style={{ height: 28, width: "auto" }}
        />
      </div>
      <ul
        className="nav-links-wrap"
        style={{ display: "flex", gap: 36, listStyle: "none" }}
      >
        {["Services", "Process", "Who We Help", "Ambaa Talks"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="nav-link"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setOpen(true)}
        href="#audit"
        style={{
          background: colors.accent,
          color: colors.black,
          border: "none",
          padding: "10px 22px",
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: "0.83rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          cursor: "pointer",
          textDecoration: "none",
          transition: "opacity 0.2s",
        }}
      >
        Free Audit
      </button>
    </nav>
  );
};

// ── HERO ──
const Hero = () => {
  const [open, setOpen] = useState(false);

  return (
  <section

    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "140px 5% 100px",
      position: "relative",
      overflow: "hidden",
      // background: colors.black,
    }}
    className="bg-gradient-to-b from-black to-[#4e1515]"
  >
    <div className="hero-bg-text">AT</div>
    <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
      <div
        className="fade-up-1"
        style={{
          fontFamily: fonts.mono,
          fontSize: "0.78rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: colors.accent,
          marginBottom: 24,
          // display: "flex",
          alignItems: "center",
          gap: 10,
                    textAlign: "center",
          marginInline: "auto",
        }}
      >
        
        Content Agency
      </div>
      <h1
        className="fade-up-2"
        style={{
          fontFamily: fonts.display,
          fontSize: "clamp(64px, 10vw, 140px)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          marginBottom: 28,
          color: colors.white,
          textAlign: "center",
        }}
      >
        We Turn Content
        <br />
        Into <span style={{ color: colors.accent }}>Growth.</span>
      </h1>
      <p
        className="fade-up-3"
        style={{
          fontSize: "clamp(1rem, 1.4vw, 1.22rem)",
          color: "#bbb",
          maxWidth: 520,
          marginBottom: 16,
          lineHeight: 1.75,
          fontFamily: fonts.body,
          textAlign: "center",
          marginInline: "auto",
        }}
      >
        We help creators, founders, and podcasters transform raw footage into
        high-performing short-form videos, scroll-stopping thumbnails, and
        complete content systems.
      </p>
      <p
        className="fade-up-3"
        style={{
          fontSize: "1.08rem",
          color: colors.white,
          fontWeight: 600,
          marginBottom: 44,
          fontFamily: fonts.body,
                    textAlign: "center",
          marginInline: "auto",
        }}
      >
        Posting but not growing? We fix that.
      </p>
      <div
        className="fade-up-4"
        style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
      >
        {/* <a
          href="#cta"
          style={{
            background: colors.accent,
            color: colors.black,
            padding: "16px 34px",
            fontWeight: 700,
            fontSize: "0.93rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        > */}
          
        {/* </a> */}


        <button
        onClick={() => setOpen(true)}
        // className="px-6 py-3 bg-red-500 rounded-xl text-white"
        style={{
            background: colors.accent,
            color: colors.black,
            padding: "16px 34px",
            fontWeight: 700,
            fontSize: "0.93rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
      >
        Let's Talk
      </button>

      <button
        onClick={() => setOpen(true)}
        className="btn-sec">
          Get a Free Audit →
      </button>

        

      <GlobalLeadModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      </div>
    </div>
  </section>
  )
};

// ── TICKER ──
const Ticker = () => {
  const items = [
    "Short-Form Editing",
    "Thumbnail Design",
    "Content Strategy",
    "Hook Optimisation",
    "Repurposing Systems",
    "Growth-Focused Editing",
  ];
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        background: colors.accent,
        padding: "14px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: fonts.display,
              fontSize: "1.1rem",
              letterSpacing: "0.08em",
              color: colors.white,
              padding: "0 28px",
            }}
          >
            {item} <span style={{ opacity: 0.3 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ── PROBLEM ──
const Problem = () => (
  <section
    id="the-real-problem"
    style={{ padding: "100px 5%", background: colors.grey }}
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel>The Real Problem</SectionLabel>
      <Heading>
        Creators Don't
        <br />
        Lack Content.
      </Heading>
      <div
        className="two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          marginTop: 60,
          alignItems: "start",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            color: "#ccc",
            lineHeight: 1.8,
            fontFamily: fonts.body,
          }}
        >
          Most creators are already putting in the work. The content exists.
          <br />
          <br />
          The problem is{" "}
          <strong style={{ color: colors.white }}>
            how it gets packaged, presented, and positioned.
          </strong>{" "}
          A great idea buried in a weak hook is invisible. A mediocre idea with
          the right structure gets a million views.
          <br />
          <br />
          We focus on closing that gap.
        </p>
        <ul style={{ listStyle: "none" }}>
          {[
            "Retention — keeping people watching",
            "Watch time — the metric that drives distribution",
            "Scroll-stopping edits — hooks that compete",
            "Distribution-ready formatting — built for each platform",
          ].map((item) => (
            <li
              key={item}
              style={{
                padding: "20px 0",
                borderBottom: "1px solid #2a2a2a",
                fontSize: "1rem",
                fontWeight: 500,
                color: colors.white,
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontFamily: fonts.body,
              }}
            >
              <span
                style={{
                  color: colors.accent,
                  fontFamily: fonts.mono,
                  fontSize: "1rem",
                }}
              >
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

// ── SERVICES ──
const serviceData = [
  {
    num: "01",
    title: "Short-Form\nEditing",
    desc: "We take your long-form content or raw footage and turn it into high-performing reels, shorts, and clips — built to stop the scroll and hold attention.",
    features: [
      "Hook optimisation from the first frame",
      "Fast-paced, platform-native editing",
      "Subtitles that drive completion rate",
      "Formatted for Reels, Shorts, and TikTok",
    ],
    link: "#short-form-video-editing",
  },
  {
    num: "02",
    title: "Long-Form\nEditing",
    desc: "We take your long-form content or raw footage and turn it into high-performing videos — built to stop the scroll and hold attention.",
    features: [
      "Hook optimisation from the first frame",
      "Fast-paced, platform-native editing",
      "Subtitles that drive completion rate",
      "Formatted for Reels, Shorts, and TikTok",
    ],
    link: "#long-form-video-editing",
  },
  {
    num: "03",
    title: "Thumbnail\nDesign",
    desc: "Your thumbnail is your first ad. We design for click-through rate — not just aesthetics. Every element earns its place.",
    features: [
      "High contrast, instantly readable",
      "Clear visual hierarchy",
      "Tested against platform benchmarks",
      "Built for CTR, not just design awards",
    ],
    link: "#thumbnail",
  },
  {
    num: "04",
    title: "Content\nSystems",
    desc: "We don't just edit — we build the engine. A content system that runs consistently, repurposes intelligently, and grows your brand on autopilot.",
    features: [
      "Content strategy aligned to your goals",
      "Repurposing workflows that save time",
      "Posting structure for consistency",
      "Growth-focused planning, not guesswork",
    ],
    link: "#social-media-design",
  },
];

const Services = () => (
  <section
    id="services"
    style={{ padding: "100px 5%",  }}
    className="-bg-conic-30 from-black to-[#4e1515]"

  >
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <SectionLabel>What We Do</SectionLabel>
      <Heading>
        Four Ways
        <br />
        We Work.
      </Heading>
      <div
        className="three-col"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 2,
          marginTop: 60,
          background: "#1e1e1e",
        }}
      >
        {serviceData.map((s) => (
          <div
            key={s.num}
            className="service-card"
            style={{ background: colors.black, padding: "48px 40px" }}
          >
            <a href={s.link} style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  color: colors.accent,
                  marginBottom: 24,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: "2.3rem",
                  letterSpacing: "0.03em",
                  lineHeight: 1,
                  marginBottom: 16,
                  color: colors.white,
                  whiteSpace: "pre-line",
                }}
              >
                {s.title}
              </div>
              <p
                style={{
                  color: colors.muted,
                  fontSize: "0.93rem",
                  marginBottom: 28,
                  lineHeight: 1.75,
                  fontFamily: fonts.body,
                }}
              >
                {s.desc}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {s.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: "0.86rem",
                      color: "#999",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: fonts.body,
                    }}
                  >
                    <span style={{ color: colors.accent, fontSize: "0.6rem" }}>
                      ✦
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── WHY CONTENT FAILS ──
const failsData = [
  {
    num: "01",
    title: "Weak Hooks",
    desc: "The first 2–3 seconds don't earn the viewer's next 30. They're gone before you've started.",
  },
  {
    num: "02",
    title: "Slow Pacing",
    desc: "Dead air and slow cuts bleed watch time. Retention drops — and so does your reach.",
  },
  {
    num: "03",
    title: "Poor Structure",
    desc: "No clear arc, no payoff. Viewers disengage before they get the value you promised.",
  },
  {
    num: "04",
    title: "No Retention Strategy",
    desc: "Posting without a plan to hold attention is posting into a void. We build the plan.",
  },
];

const WhyFails = () => (
  <section
    id="why-content-fails"
    style={{ padding: "100px 5%", background: colors.grey }}
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel>Why Most Content Fails</SectionLabel>
      <Heading>
        It's Not
        <br />
        Your Ideas.
      </Heading>
      <div
        className="two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          marginTop: 60,
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            color: "#bbb",
            lineHeight: 1.85,
            fontFamily: fonts.body,
          }}
        >
          Most content doesn't fail because the creator isn't talented or the
          idea isn't good.
          <br />
          <br />
          It fails for{" "}
          <strong style={{ color: colors.white }}>
            four fixable reasons.
          </strong>{" "}
          We've seen them across hundreds of pieces of content — and we know
          exactly how to address them.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {failsData.map((f) => (
            <div
              key={f.num}
              style={{
                background: colors.black,
                padding: "24px 28px",
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "0.72rem",
                  color: colors.accent,
                  marginTop: 3,
                  whiteSpace: "nowrap",
                }}
              >
                {f.num}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: colors.white,
                    marginBottom: 4,
                    fontFamily: fonts.body,
                    fontSize: "0.97rem",
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#ccc",
                    lineHeight: 1.65,
                    fontFamily: fonts.body,
                  }}
                >
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── PROCESS ──
const steps = [
  {
    num: "1",
    label: "Step 01",
    title: "Audit",
    desc: "We review your existing content and pinpoint exactly what's holding your growth back — no guessing, no generic feedback.",
  },
  {
    num: "2",
    label: "Step 02",
    title: "Strategy",
    desc: "We map the content types, formats, and angles that will actually move the needle for your brand — not what works for someone else.",
  },
  {
    num: "3",
    label: "Step 03",
    title: "Execution",
    desc: "We edit, design, and package your content for performance. Every deliverable is built to grab attention and hold it.",
  },
  {
    num: "4",
    label: "Step 04",
    title: "Scale",
    desc: "You post consistently with a system that works. No more scrambling. No more wondering why it's not growing.",
  },
];

const Process = () => (
  <section
    id="process"
    style={{ padding: "100px 5%", background: colors.black }}
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel>How We Work</SectionLabel>
      <Heading>
        Four Steps.
        <br />
        One System.
      </Heading>
      <div
        className="four-col"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 2,
          marginTop: 60,
          background: "#1e1e1e",
        }}
      >
        {steps.map((s) => (
          <div
            key={s.num}
            style={{
              background: colors.black,
              padding: "44px 36px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -10,
                right: 10,
                fontFamily: fonts.display,
                fontSize: "7rem",
                color: "#161616",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                color: colors.accent,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: "2rem",
                letterSpacing: "0.03em",
                marginBottom: 12,
                color: colors.white,
              }}
            >
              {s.title}
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                color: colors.muted,
                lineHeight: 1.75,
                fontFamily: fonts.body,
              }}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── WHO IT'S FOR ──
const whoData = [
  {
    title: "Creators",
    desc: "You're already creating. You want growth that reflects the work you're putting in.",
  },
  {
    title: "Founders",
    desc: "Building a personal brand alongside your company. Content is your long-term leverage.",
  },
  {
    title: "Podcasters",
    desc: "You record great conversations. We make sure they reach the audience they deserve.",
  },
  {
    title: "Coaches & Operators",
    desc: "You sell through content. We make sure that content does its job — consistently.",
  },
];

const WhoItsFor = () => (
  <section
    id="who-we-help"
    style={{ padding: "100px 5%", background: colors.grey }}
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel>Who This Is For</SectionLabel>
      <Heading>
        Built For
        <br />
        Serious People.
      </Heading>
      <div
        className="two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          marginTop: 60,
          background: "#2a2a2a",
        }}
      >
        {whoData.map((w) => (
          <div
            key={w.title}
            className="who-card"
            style={{
              background: colors.grey,
              padding: "40px",
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{ color: colors.accent, fontSize: "1.4rem", marginTop: 2 }}
            >
              →
            </div>
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  marginBottom: 6,
                  color: colors.white,
                  fontFamily: fonts.body,
                }}
              >
                {w.title}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: colors.muted,
                  lineHeight: 1.65,
                  fontFamily: fonts.body,
                }}
              >
                {w.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── DIFFERENTIATORS ──
const diffData = [
  {
    them: "Most editors focus on visuals.",
    us: "We focus on",
    accent: "performance.",
    rest: " Every edit decision is made to increase watch time, not just look good.",
  },
  {
    them: "Most creators post whenever they can.",
    us: "We build",
    accent: "systems.",
    rest: " Consistency isn't willpower — it's infrastructure.",
  },
  {
    them: "Most content gets scrolled past.",
    us: "We make content that's",
    accent: "hard to ignore.",
    rest: " From the hook to the final frame.",
  },
];

const Different = () => (
  <section
    id="what-makes-us-different"
    style={{ padding: "100px 5%", background: colors.black }}
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel>What Makes Us Different</SectionLabel>
      <Heading>
        We Don't
        <br />
        Just Edit.
      </Heading>
      <div
        className="three-col"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 2,
          marginTop: 60,
          background: "#1e1e1e",
        }}
      >
        {diffData.map((d, i) => (
          <div
            key={i}
            style={{ background: colors.black, padding: "48px 40px" }}
          >
            <div
              style={{
                fontSize: "0.88rem",
                color: colors.muted,
                textDecoration: "line-through",
                marginBottom: 14,
                fontFamily: fonts.body,
              }}
            >
              {d.them}
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: colors.white,
                lineHeight: 1.6,
                fontFamily: fonts.body,
              }}
            >
              {d.us} <span style={{ color: colors.accent }}>{d.accent}</span>
              {d.rest}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── AMBAA TALKS ──
const AmbaaSection = () => (
  <section
    id="ambaa-talks"
    style={{ padding: "100px 5%", background: colors.grey }}
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel>Our Media Arm</SectionLabel>
      <Heading>
        We're In The
        <br />
        Game Too.
      </Heading>
      <div
        className="two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          marginTop: 60,
          alignItems: "center",
        }}
      >
        <div>
          {[
            <>
              We don't just produce content for clients —{" "}
              <strong style={{ color: colors.white }}>we make our own.</strong>
            </>,
            <>
              Ambaa Talks is our interview series where we sit down with
              creators, founders, and operators to talk about content, business,
              and growth. It's not just a show — it keeps us connected to what's
              actually working in the market.
            </>,
            <>
              When we advise you, we're speaking from the inside — not from a
              slide deck.
            </>,
          ].map((p, i) => (
            <p
              key={i}
              style={{
                color: "#bbb",
                fontSize: "1.03rem",
                lineHeight: 1.82,
                marginBottom: 16,
                fontFamily: fonts.body,
              }}
            >
              {p}
            </p>
          ))}
          <a
            href="#"
            className="btn-sec"
            style={{ marginTop: 16, display: "inline-block" }}
          >
            Watch Ambaa Talks →
          </a>
        </div>
        <div
          style={{
            background: colors.black,
            border: "1px solid #2e2e2e",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              color: colors.accent,
              textTransform: "uppercase",
            }}
          >
            Now Airing
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: "3rem",
              lineHeight: 1,
              letterSpacing: "0.04em",
              color: colors.white,
            }}
          >
            AMBAA
            <br />
            TALKS
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: colors.muted,
              lineHeight: 1.7,
              fontFamily: fonts.body,
            }}
          >
            Creators. Founders. Operators.
            <br />
            Real conversations about content and growth.
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: "0.7rem",
              color: colors.accent,
              letterSpacing: "0.1em",
            }}
          >
            @ATMEDIAPRODUCTION
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── FREE AUDIT ──
const Audit = () =>{ 
  const [open, setOpen] = useState(false);
  return (
  <section
    id="audit"
    style={{
      padding: "100px 5%",
      background: colors.accent,
      color: colors.white,
    }}
  >
    <GlobalLeadModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel dark>No Risk</SectionLabel>
      <h2
        style={{
          fontFamily: fonts.display,
          fontSize: "clamp(42px, 6vw, 80px)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          marginBottom: 20,
        }}
      >
        Not Sure
        <br />
        What's Wrong?
      </h2>
      <div
        className="two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          marginTop: 60,
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "1.03rem",
              lineHeight: 1.82,
              fontFamily: fonts.body,
            }}
          >
            Send us your page. We'll go through your content and tell you
            exactly what's holding you back — your hooks, your pacing, your
            structure, your ideas.
            <br />
            <br />
            No pitch. No pressure. Just an honest look at where the gaps are.
          </p>
          <button
          onClick={() => setOpen(true)}
            href="#"
            style={{
              background: colors.black,
              padding: "18px 38px",
              fontWeight: 700,
              fontSize: "0.93rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              textDecoration: "none",
              display: "inline-block",
              marginTop: 36,
              transition: "opacity 0.2s",
            }}
          >
            Get Our Free Audit
          </button>
        </div>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[
            "Hook-by-hook breakdown and improvement notes",
            "Editing and pacing feedback",
            "Fresh content ideas for your niche",
            "Specific growth suggestions you can action today",
          ].map((item) => (
            <li
              key={item}
              style={{
                fontSize: "0.97rem",
                color: colors.white,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: fonts.body,
              }}
            >
              <span
                style={{
                  background: colors.white,
                  color: colors.black,
                  width: 26,
                  height: 26,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);}

// ── FINAL CTA ──
const FinalCTA = () => {
  const [open, setOpen] = useState(false);
  return (
  <section
    id="cta"
    style={{
      padding: "140px 5%",
      background: colors.black,
      textAlign: "center",
    }}
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel>Limited Spots</SectionLabel>
      <h2
        style={{
          fontFamily: fonts.display,
          fontSize: "clamp(52px, 9vw, 110px)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          marginBottom: 0,
          color: colors.white,
        }}
      >
        Ready To
        <br />
        <span style={{ color: colors.accent }}>Actually Grow?</span>
      </h2>
      <p
        style={{
          fontSize: "1.12rem",
          color: "#999",
          margin: "32px auto 48px",
          maxWidth: 500,
          lineHeight: 1.82,
          fontFamily: fonts.body,
        }}
      >
        If you're posting content and not getting results, it's not random —{" "}
        <strong style={{ color: colors.white }}>there's a reason.</strong>
        <br />
        We'll find it. And we'll fix it.
      </p>
      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
        onClick={() => setOpen(true)}
          href="#"
          style={{
            background: colors.accent,
            color: colors.black,
            padding: "16px 34px",
            fontWeight: 700,
            fontSize: "0.93rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          Let's Talk
        </button>
        <button
        onClick={() => setOpen(true)}
        href="#" className="dm-pill">
          Get a Free Audit →
        </button>
      </div>
      <p
        style={{
          fontFamily: fonts.mono,
          fontSize: "0.76rem",
          color: colors.muted,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: 28,
        }}
      >
        We work with a limited number of clients — spots are intentionally kept
        small.
      </p>
    </div>
    <GlobalLeadModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
  </section>
);}

// ── FOOTER ──
const Footer = () => (
  <footer
    style={{
      background: "#050505",
      borderTop: "1px solid #1a1a1a",
      padding: "60px 5%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 32,
    }}
  >
    <div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: "2.2rem",
          letterSpacing: "0.08em",
          color: colors.accent,
        }}
      >
        AT MEDIA
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          color: colors.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginTop: 6,
          fontFamily: fonts.body,
        }}
      >
        Content. Systems. Growth.
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <a href="mailto:navdeep@atmediaproduction.com" className="footer-link">
        navdeep@atmediaproduction.com
      </a>
      <a
        href="https://instagram.com/atmediaproduction"
        target="_blank"
        rel="noreferrer"
        className="footer-link"
      >
        Instagram — @atmediaproduction
      </a>
      <a href="https://www.youtube.com/@AmbaaTalks" target="_blank" rel="noreferrer" className="footer-link">
        YouTube — Ambaa Talks
      </a>
    </div>
    <div
      style={{
        fontSize: "0.78rem",
        color: "#333",
        textAlign: "right",
        fontFamily: fonts.body,
      }}
    >
      © 2026 AT Media.
      <br />
      All rights reserved.
    </div>
  </footer>
);

// ── APP ──
export default function ATMedia() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: fonts.body,
        background: colors.black,
        color: colors.white,
        overflowX: "hidden",
      }}
    >
      <GlobalStyles />
      <Nav />
      <Hero />
      <Ticker />
      <Problem />
      <Services />
      <div className="relative z-10">
        <div id="short-form-video-editing" />
        <ShortsSection />

        {/* ✅ Lazy heavy sections */}

        <div id="thumbnail" />
        <ThumbnailSliderCSS />

        <div id="long-form-video-editing" />
        <LongFormSection />

        <div id="social-media-design" />
        <SocialPostSlider />
      </div>
      <WhyFails />
      <Process />
      <WhoItsFor />
      <Different />
      <ATMediaSections/>
      {/* <AmbaaSection /> */}
      <Audit />
      <FinalCTA />
      <Footer />
    </div>
  );
}

