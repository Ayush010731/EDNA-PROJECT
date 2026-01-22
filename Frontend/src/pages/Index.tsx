import { useRef, useEffect } from "react";
import { OceanBackground } from "@/components/OceanBackground";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { OverviewSection } from "@/components/OverviewSection";
import { ProcessFlowchart } from "@/components/ProcessFlowchart";
import { Features } from "@/components/Features";
import { TeamSection } from "@/components/Team";


const Index = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }

      // Create spark effect (single ephemeral element)
      const spark = document.createElement("div");
      spark.className =
        "fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-50 animate-ping";
      spark.style.left = e.clientX - 4 + "px";
      spark.style.top = e.clientY - 4 + "px";
      spark.style.boxShadow =
        "0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary-glow))";

      document.body.appendChild(spark);

      setTimeout(() => {
        if (spark.parentNode) {
          spark.parentNode.removeChild(spark);
        }
      }, 500);
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll(
      "button, a, .feature-card, [data-hover='true']"
    );

    const handleMouseEnter = () => {
      cursorRef.current?.classList.add("hover");
    };

    const handleMouseLeave = () => {
      cursorRef.current?.classList.remove("hover");
    };

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Custom cursor */}
      <div ref={cursorRef} className="ocean-cursor" />

      {/* Background effects */}
      <OceanBackground />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <Header />
        <Hero />
        <OverviewSection />
        <ProcessFlowchart />
        <Features />
        <TeamSection/>
        

        <footer className="text-center py-16 mt-20 border-t border-white/5 text-muted-foreground">
          <p>© 2025 DEEP ORIGIN | Marine Genomics Research Division</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
