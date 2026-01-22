import { useEffect, useRef } from "react";

export const OceanBackground = () => {
  const dnaHelixRef = useRef<HTMLDivElement>(null);
  const waveContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const rainRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // helper to pick non-overlapping bottom positions
    const pickBottom = (existing: number[], min = 10, max = 120) => {
      let tries = 0;
      while (tries++ < 20) {
        const b = Math.floor(Math.random() * (max - min) + min);
        // ensure not within 24px of existing
        if (!existing.some((e) => Math.abs(e - b) < 28)) return b;
      }
      return Math.floor(Math.random() * (max - min) + min);
    };

    // Create DNA bases (keep same)
    if (dnaHelixRef.current) {
      dnaHelixRef.current.innerHTML = "";
      for (let i = 0; i < 40; i++) {
        const baseLeft = document.createElement("div");
        baseLeft.className = "dna-base";
        baseLeft.style.animationDelay = `${i * 0.3}s`;
        dnaHelixRef.current.appendChild(baseLeft);

        const baseRight = document.createElement("div");
        baseRight.className = "dna-base";
        baseRight.style.animationDelay = `${i * 0.3 + 1.5}s`;
        dnaHelixRef.current.appendChild(baseRight);
      }
    }

    // Create fish in waves — glowing + swim effects
    if (waveContainerRef.current) {
      waveContainerRef.current.innerHTML = "";

      const usedBottoms: number[] = [];
      const fishCount = 6; // fewer fish as requested

      for (let i = 0; i < fishCount; i++) {
        const fish = document.createElement("div");
        fish.className = "fish absolute z-10";
        fish.innerHTML = "🐟"; // fallback emoji — replace with <img> if available

        // Choose direction: true => left-to-right, false => right-to-left
        const leftToRight = Math.random() > 0.4; // slightly bias to left-to-right

        // pick non-overlapping vertical position (bottom)
        const bottom = pickBottom(usedBottoms, 8, 140);
        usedBottoms.push(bottom);
        fish.style.bottom = `${bottom}px`;

        // random size
        const size = Math.random() * 40 + 36; // 36px-76px
        fish.style.width = `${size}px`;
        fish.style.height = `${size}px`;
        fish.style.fontSize = `${size * 0.9}px`;
        fish.style.opacity = `${0.7 + Math.random() * 0.3}`;

        // animation duration and staggered delay to avoid stacking at start
        const duration = Math.random() * 24 + 18; // 18s - 42s
        const delay = Math.random() * 6 + i * 0.4; // stagger with small offset per fish

        // set start position off-screen with small random offset so they don't stack
        if (leftToRight) {
          fish.style.left = `${- (Math.random() * 220 + 120)}px`; // start slightly off left
          fish.style.animation = `swimRight ${duration}s linear ${delay}s infinite`;
          // face right (normal)
          fish.style.transform = "scaleX(1)";
        } else {
          // start just off the right edge using vw; set large px using window width
          const startX = (typeof window !== 'undefined') ? (window.innerWidth + (Math.random() * 220 + 120)) : 1200;
          fish.style.left = `${startX}px`;
          fish.style.animation = `swimLeft ${duration}s linear ${delay}s infinite`;
          // flip horizontally so it faces left
          fish.style.transform = "scaleX(-1)";
        }

        // biolum glow
        fish.style.filter = `drop-shadow(0 0 6px rgba(0,200,255,0.6)) hue-rotate(${Math.random() * 60 - 30}deg)`;

        waveContainerRef.current.appendChild(fish);
      }

      // Inject swim animations only once
      if (!document.getElementById("fish-animations")) {
        const style = document.createElement("style");
        style.id = "fish-animations";
        style.textContent = `
          @keyframes swimRight {
            0% { transform: translateX(0) translateY(0) scaleX(1); }
            50% { transform: translateX(50vw) translateY(-8px) scaleX(1); }
            100% { transform: translateX(calc(100vw + 320px)) translateY(0) scaleX(1); }
          }
          @keyframes swimLeft {
            0% { transform: translateX(0) translateY(0) scaleX(-1); }
            50% { transform: translateX(-50vw) translateY(8px) scaleX(-1); }
            100% { transform: translateX(calc(-100vw - 320px)) translateY(0) scaleX(-1); }
          }
          .fish:hover { transform: scale(1.12) !important; filter: brightness(1.2) drop-shadow(0 0 12px rgba(0,200,255,0.9)); }
        `;
        document.head.appendChild(style);
      }
    }

    // Create bubbles rising (instead of static dots)
    if (particlesRef.current) {
      particlesRef.current.innerHTML = "";
      for (let i = 0; i < 60; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";

        const size = Math.random() * 8 + 4;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = "0";
        bubble.style.animationDuration = `${Math.random() * 12 + 8}s`;
        bubble.style.animationDelay = `${Math.random() * 6}s`;

        particlesRef.current.appendChild(bubble);
      }

      if (!document.getElementById("bubble-animations")) {
        const style = document.createElement("style");
        style.id = "bubble-animations";
        style.textContent = `
          .bubble { position:absolute; border-radius:50%; background:rgba(255,255,255,0.08); box-shadow:0 0 6px rgba(200,240,255,0.4); animation: rise linear infinite; }
          @keyframes rise {
            0% { transform: translateY(0) scale(0.8); opacity:0.8; }
            100% { transform: translateY(-110vh) scale(1.3); opacity:0; }
          }
        `;
        document.head.appendChild(style);
      }
    }

    // 🌧️ Create rain drops (same as before)
    if (rainRef.current) {
      rainRef.current.innerHTML = "";
      dropsRef.current = [];

      for (let i = 0; i < 60; i++) {
        const drop = document.createElement("div");
        drop.className = "drop";

        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${(Math.random() * 1.2 + 0.8).toFixed(2)}s`;
        drop.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;
        drop.style.opacity = `${Math.random() * 0.5 + 0.3}`;

        rainRef.current.appendChild(drop);
        dropsRef.current.push(drop);
      }

      const rippleInterval = setInterval(() => {
        if (Math.random() > 0.9 && rainRef.current) {
          const ripple = document.createElement("div");
          ripple.className = "ripple";
          ripple.style.left = `${Math.random() * 100}vw`;
          ripple.style.bottom = "0";
          rainRef.current.appendChild(ripple);
          setTimeout(() => ripple.remove(), 1500);
        }
      }, 1000);

      const refreshInterval = setInterval(() => {
        dropsRef.current.forEach((d) => {
          if (Math.random() > 0.4) {
            d.style.left = `${Math.random() * 100}vw`;
            d.style.animationDuration = `${(Math.random() * 1.2 + 0.8).toFixed(2)}s`;
            d.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;
            d.style.opacity = `${Math.random() * 0.5 + 0.3}`;
          }
        });
      }, 4000);

      return () => {
        clearInterval(rippleInterval);
        clearInterval(refreshInterval);
      };
    }
  }, []);

  return (
    <div className="scientific-background">
      <div className="grid-overlay" />
      <div ref={particlesRef} />
      <div className="dna-helix" ref={dnaHelixRef} />
      <div className="wave-container" ref={waveContainerRef}>
        <div className="wave" />
        <div className="wave" />
      </div>
      <div ref={rainRef} className="rain" aria-hidden="true" />
    </div>
  );
};
