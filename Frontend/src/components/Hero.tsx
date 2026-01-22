// src/components/Hero.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Logo appears first
    const logoTimer = setTimeout(() => setShowLogo(true), 200);

    // Headline starts after logo animation (logo anim = 900ms here)
    const headlineTimer = setTimeout(() => setShowHeadline(true), 1200);

    // Subtitle after headline typing completes (headline typing = 3000ms)
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 4500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(headlineTimer);
      clearTimeout(subtitleTimer);
    };
  }, []);

  // Open gallery: if #gallery exists on this page -> smooth scroll,
  // otherwise navigate to /gallery route using React Router.
  const openGallery = (startIndex?: number) => {
    const galleryEl = document.getElementById("gallery");
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: "smooth" });
      return;
    }
    // Navigate using React Router; pass optional startIndex in state
    navigate("/gallery", { state: { startIndex: startIndex ?? 0 } });
  };

  return (
    <section id="home" className="text-center py-40 pb-32 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow [animation-delay:2s]"></div>
      </div>

      {/* DEEP ORIGIN Logo (arrives first) */}
      <div
        className={`mx-auto mb-6 w-full max-w-2xl text-center transition-all ${
          showLogo ? "logo-enter" : "opacity-0 scale-90"
        }`}
        aria-hidden={!showLogo}
      >
        <div className="inline-block px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md">
          <div className="font-heading font-extrabold text-4xl md:text-5xl tracking-widest leading-none">
            <span className="logo-gradient">DEEP ORIGIN</span>
          </div>
        </div>
      </div>

      {/* Main headline with typing */}
      <div
        className={`font-heading font-bold text-6xl mb-6 leading-tight mx-auto max-w-4xl overflow-hidden transition-all ${
          showHeadline ? "animate-typing opacity-100" : "opacity-0"
        }`}
      >
        Advanced Environmental DNA Analysis for Marine Ecosystems
      </div>

      {/* Subtitle */}
      <p
        className={`text-xl max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-700 ${
          showSubtitle ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-5"
        }`}
      >
        Revolutionizing ocean biodiversity monitoring through cutting-edge genetic sequencing and AI-powered analysis
      </p>

      {/* Buttons */}
      <div
        className={`flex gap-6 justify-center mb-16 transition-all duration-700 ${
          showSubtitle ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-5"
        }`}
      >
        <Button
          size="lg"
          className="px-8 py-6 text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
          onClick={() => document.getElementById("Lab")?.scrollIntoView({ behavior: "smooth" })}
        >
          Explore Laboratory
        </Button>

        {/* Gallery button (React Router aware) */}
        <Button
          size="lg"
          className="px-8 py-6 text-lg bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-400/25"
          onClick={() => openGallery()}
        >
          Gallery
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="px-8 py-6 text-lg border-cyan-400 text-cyan-300 hover:bg-cyan-950/50 hover:text-cyan-200 transition-all duration-300 transform hover:scale-105"
          onClick={() => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })}
        >
          Meet Our Team
        </Button>
      </div>

      {/* Scoped styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500&display=swap');

        .font-heading { font-family: 'Playfair Display', serif; }

        /* Logo entrance */
        .logo-enter {
          animation: logoPop 700ms cubic-bezier(.2,.9,.2,1) both;
        }
        @keyframes logoPop {
          0% { opacity: 0; transform: scale(0.85) translateY(-8px); filter: blur(2px); }
          60% { transform: scale(1.06) translateY(0); opacity: 1; filter: blur(0); }
          100% { transform: scale(1) translateY(0); opacity: 1; filter: blur(0); }
        }

        /* small shimmer gradient for logo text */
        .logo-gradient {
          background: linear-gradient(90deg, #06b6d4 0%, #60a5fa 30%, #a78bfa 60%, #fb7185 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: logoShimmer 2.5s linear infinite;
          display:inline-block;
        }
        @keyframes logoShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Typing animation only for headline */
        @keyframes typing {
          from { width: 0; border-right: 3px solid rgba(6,182,212,0.85); }
          to { width: 100%; border-right: 3px solid rgba(6,182,212,0.85); }
        }

        .animate-typing {
          animation: typing 3s steps(60, end) forwards;
          white-space: nowrap;
          overflow: hidden;
        }

        /* Text gradient animation for headline (starts after typing finishes) */
        @keyframes text-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-typing {
          background: linear-gradient(
            to right,
            #ec4899,
            #8b5cf6,
            #06b6d4,
            #10b981,
            #ec4899
          );
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation:
            typing 3s steps(60, end) forwards,
            text-gradient 8s ease-in-out infinite 3s;
        }

        /* slow pulse */
        @keyframes pulse-slow { 0%,100%{opacity:0.5}50%{opacity:0.8} }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }

        /* Responsive fallbacks */
        @media (max-width: 768px) {
          .font-heading { font-size: 2.5rem; white-space: normal; }
          .animate-typing { animation: none; border: none; white-space: normal; -webkit-text-fill-color: white; background: none; }
          .logo-gradient { font-size: 1.8rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
