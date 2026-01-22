// src/components/Gallery.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  images?: string[];
  captions?: string[]; // captions matching images (optional)
  initialIndex?: number;
  autoPlayDefault?: boolean; // default now false (no autoplay)
  intervalMs?: number;
};

const ImageSlideshow: React.FC<Props> = ({
  images: imagesProp,
  captions: captionsProp,
  initialIndex = 0,
  autoPlayDefault = false, // autoplay removed by default
  intervalMs = 3500,
}) => {
  const navigate = useNavigate();

  // default images (use your public/asset paths)
  const defaultImages = [
    "/G1.png",
    "/G2.png",
    "/G3.png",
    "/G4.png",
    "/G5.png",
    "/G6.png",
    "/G7.png",
    "/G8.png",
    "/G9.png",
  ];
  const defaultCaptions = [
    "Giant Amphipod",
    "Comb Jelly (Ctenophore)",
    "Dumbo Octopus (Grimpoteuthis)",
    "Siphonophore",
    "Xenophyophore",
    "Giant Isopod",
    "Frilled Shark",
    "Barreleye Fish",
    "Black Seadevil (Melanocetus johnsonii)",
  ];

  // choose images/captions defensively
  const imagesRaw = imagesProp && imagesProp.length > 0 ? imagesProp : defaultImages;
  const images = imagesRaw.filter(Boolean);
  const captionsRaw = captionsProp && captionsProp.length > 0 ? captionsProp : defaultCaptions;
  const captionsSanitized = captionsRaw.map((c) => (typeof c === "string" ? c.trim() : ""));
  const captions =
    captionsSanitized.length >= images.length
      ? captionsSanitized.slice(0, images.length)
      : [...captionsSanitized, ...Array(images.length - captionsSanitized.length).fill("")];

  const length = images.length;

  // clamp initial index
  const clampIndex = (idx: number) => {
    if (length === 0) return 0;
    if (idx < 0) return 0;
    if (idx > length - 1) return length - 1;
    return idx;
  };

  const [index, setIndex] = useState<number>(() => clampIndex(initialIndex));
  const [autoPlay, setAutoPlay] = useState<boolean>(autoPlayDefault);

  // interval ref (if you enable autoplay via prop)
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // update index if initialIndex prop changes
  useEffect(() => {
    setIndex(clampIndex(initialIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIndex, images.length]);

  // navigation helpers
  function goPrev() {
    setIndex((i) => (i - 1 + length) % length);
  }
  function goNext() {
    setIndex((i) => (i + 1) % length);
  }
  function goTo(i: number) {
    setIndex(() => ((i % length) + length) % length);
  }

  // autoplay (disabled by default). If autoPlay true, interval will run.
  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (autoPlay && length > 1) {
      intervalRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % length);
      }, intervalMs) as unknown as number;
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, length, intervalMs]);

  // pause on hover (only relevant if autoplay enabled)
  const handleMouseEnter = () => setAutoPlay(false);
  const handleMouseLeave = () => setAutoPlay(autoPlayDefault);

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [length]);

  // touch swipe support
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    let startX: number | null = null;

    function onTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      setAutoPlay(false);
    }
    function onTouchEnd(e: TouchEvent) {
      if (startX == null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goPrev();
        else goNext();
      }
      startX = null;
      setAutoPlay(autoPlayDefault);
    }

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [containerRef.current, length, autoPlayDefault]);

  // custom cursor + sparks (same as before)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      const spark = document.createElement("div");
      spark.className = "cursor-spark";
      spark.style.left = `${e.clientX - 4}px`;
      spark.style.top = `${e.clientY - 4}px`;
      spark.style.boxShadow = "0 0 10px rgba(96,165,250,0.95), 0 0 22px rgba(6,182,212,0.35)";
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 420);
    };

    const hoverSelector = "button, a, [role='button'], .arrow, input, label";
    const hoverElements = Array.from(document.querySelectorAll(hoverSelector));
    const onEnter = () => cursorRef.current?.classList.add("hover");
    const onLeave = () => cursorRef.current?.classList.remove("hover");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Back handler: prefer navigate(-1), fallback to history.back()
  const handleBack = () => {
    try {
      navigate(-1);
    } catch {
      window.history.back();
    }
  };

  return (
    <section id="slideshow" className="slideshow-section" aria-label="Image slideshow">
      {/* Custom cursor */}
      <div ref={cursorRef} className="gallery-cursor" aria-hidden />

      {/* Top header aligned left with back button on right */}
      <div className="gallery-header">
        <div className="gallery-header-inner">
          <h1 className="gallery-title">Gallery</h1>
          <p className="gallery-sub">Explore our deep-sea specimens</p>
        </div>

        {/* Back button top-right - icon + text with strong gradient */}
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="back-btn"
          title="Back"
          type="button"
        >
          <svg className="back-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6L9 12l6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="back-text">Back</span>
        </button>
      </div>

      <div
        className="slideshow-wrapper"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides */}
        <div className="slides-area" role="list">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={captions[i] ?? `Slide ${i + 1}`}
              role="listitem"
              draggable={false}
              className={`slide ${i === index ? "active" : ""}`}
              loading="lazy"
            />
          ))}
        </div>

        {/* Caption column BELOW the photo, centered */}
        <div className="caption-column" aria-hidden={false}>
          <div className="caption-inner">
            <h3 className="caption-title">{captions[index]}</h3>
          </div>
        </div>

        {/* Arrows (keep) */}
        {length > 1 && (
          <>
            <button className="arrow left" aria-label="Previous" onClick={goPrev}>
              ‹
            </button>
            <button className="arrow right" aria-label="Next" onClick={goNext}>
              ›
            </button>
          </>
        )}
      </div>

      {/* Inline styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&display=swap');

        :root {
          --accent-a: #06b6d4;
          --accent-b: #60a5fa;
          --accent-c: #a78bfa;
          --btn-grad-a: #06b6d4;
          --btn-grad-b: #7c3aed;
        }

        .slideshow-section {
          position: relative;
          padding: 6px 0 24px; /* reduced horizontal padding to allow full-bleed */
          min-height: 100vh;
          overflow: hidden;
          color: rgba(230,242,255,0.95);
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial;
          background: linear-gradient(180deg, #041022 0%, #021021 100%);
        }

        /* Header placed near top, LEFT aligned */
        .gallery-header {
          position: relative;
          max-width: 1400px;
          margin: 8px auto 6px;
          padding: 0 20px;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between; /* header content left, back button right */
        }
        .gallery-header-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* left align content */
          gap: 6px;
        }
        .gallery-title {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 3rem; /* increased size */
          line-height: 1;
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b) 45%, var(--accent-c) 85%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 6px 26px rgba(2,6,23,0.6);
        }
        .gallery-sub {
          margin: 0;
          color: rgba(230,247,255,0.9);
          font-size: 1.05rem; /* slightly larger */
          font-weight: 500;
        }

        /* Back button: icon + text, vivid gradient, pill */
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: 600;
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial;
          background: linear-gradient(135deg, rgba(6,182,212,0.12), rgba(124,58,237,0.12));
          position: relative;
          overflow: hidden;
          min-width: 96px;
          height: 48px;
          box-shadow: 0 8px 30px rgba(2,6,23,0.45);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .back-btn::before{
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 60%;
          background: linear-gradient(90deg, var(--btn-grad-a), var(--btn-grad-b));
          opacity: 0.16;
          pointer-events: none;
        }

        .back-btn .back-icon {
          z-index: 2;
          flex: 0 0 auto;
        }
        .back-btn .back-text {
          z-index: 2;
          font-size: 1rem;
          letter-spacing: 0.2px;
        }

        .back-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 48px rgba(2,6,23,0.55);
        }

        /* Custom cursor */
        .gallery-cursor {
          position: fixed;
          left: 0;
          top: 0;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(1);
          background: linear-gradient(90deg, rgba(6,182,212,0.95), rgba(96,165,250,0.95));
          box-shadow: 0 4px 18px rgba(6,182,212,0.12), 0 2px 6px rgba(96,165,250,0.08);
          z-index: 99999;
          transition: transform 180ms ease, width 160ms ease, height 160ms ease, opacity 180ms;
          opacity: 0.98;
        }
        .gallery-cursor.hover {
          transform: translate(-50%, -50%) scale(1.9);
          width: 36px;
          height: 36px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 40%), linear-gradient(90deg, rgba(6,182,212,0.95), rgba(96,165,250,0.95));
          box-shadow: 0 10px 34px rgba(6,182,212,0.18), 0 10px 50px rgba(96,165,250,0.08);
        }
        .cursor-spark {
          position: fixed;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(6,182,212,0.9) 40%, transparent 70%);
          pointer-events: none;
          z-index: 99990;
          transform: translate(-50%, -50%);
          animation: spark-fade 420ms linear forwards;
        }
        @keyframes spark-fade {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.9); filter: blur(3px); }
        }

        /* Full-bleed slideshow wrapper */
        .slideshow-wrapper {
          position: relative;
          z-index: 10;
          width: 100vw;                   /* full viewport width */
          left: 50%;
          right: 50%;
          margin-left: -50vw;             /* center full-bleed */
          margin-right: -50vw;
          max-width: none;
          border-radius: 0;               /* full-bleed, no rounded corners */
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(2,8,23,0.6);
          background: #000;               /* fallback background */
          border-top: 1px solid rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.02);
        }

        /* Slides are now taller so full image shows more */
        .slides-area {
          position: relative;
          width: 100%;
          height: 92vh;    /* increased to show larger image */
          min-height: 520px;
          max-height: 1100px;
          background: #000;
        }

        .slide {
          position: absolute;
          inset: 0;
          width: 100%;      /* use container width to avoid horizontal scroll */
          height: 100%;
          object-fit: cover; /* cover the area while keeping aspect */
          opacity: 0;
          transform: scale(1.02);
          transition: opacity 700ms ease, transform 700ms ease;
        }
        .slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        /* caption below the full-bleed image (content width centered) */
        .caption-column {
          width: 100%;
          background: linear-gradient(180deg, rgba(2,6,23,0.66), rgba(2,6,23,0.58));
          padding: 22px 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .caption-inner {
          width: 100%;
          max-width: 1200px;
          text-align: center;
          padding: 0 18px;
        }
        .caption-title {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.9rem; /* increased caption size */
          line-height: 1.15;
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b) 45%, var(--accent-c) 85%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          text-shadow: 0 6px 18px rgba(2,6,23,0.45);
        }

        /* arrows positioned over the full-bleed image */
        .arrow {
          position: absolute;
          top: calc(50% - 28px);
          transform: translateY(-50%);
          background: linear-gradient(180deg, rgba(8,20,37,0.6), rgba(2,6,23,0.45));
          border: 1px solid rgba(255,255,255,0.04);
          color: white;
          font-size: 36px; /* slightly larger arrow */
          padding: 14px 18px;
          border-radius: 12px;
          cursor: pointer;
          backdrop-filter: blur(6px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.5);
          z-index: 40;
          transition: transform 160ms ease, background 180ms ease;
        }
        .arrow.left { left: 36px; }
        .arrow.right { right: 36px; }
        .arrow:hover { transform: translateY(-50%) scale(1.06); }

        /* responsive */
        @media (max-width: 1200px) {
          .slides-area { height: 88vh; min-height: 480px; }
          .gallery-title { font-size: 2.6rem; }
          .caption-title { font-size: 1.6rem; }
        }
        @media (max-width: 900px) {
          .slides-area { height: 78vh; min-height: 380px; }
          .gallery-title { font-size: 2.3rem; }
          .arrow { font-size: 30px; padding: 12px 14px; left: 16px; right: 16px; }
          .caption-title { font-size: 1.35rem; }
        }
        @media (max-width: 480px) {
          .slides-area { height: 62vh; }
          .gallery-title { font-size: 1.9rem; }
          .caption-title { font-size: 1.05rem; }
          .back-btn { height: 40px; min-width: 80px; padding: 8px 10px; gap: 8px; }
        }
      `}</style>
    </section>
  );
};

export default ImageSlideshow;
