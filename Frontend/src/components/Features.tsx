import { useEffect, useRef } from "react";

const features = [
  {
    icon: "🧬",
    title: "Metabarcoding Analysis",
    description: "Identify multiple species from single water samples using targeted genetic markers and high-throughput sequencing."
  },
  {
    icon: "🔍", 
    title: "Species Detection",
    description: "Detect rare and elusive marine organisms with sensitivity rates orders of magnitude higher than traditional methods."
  },
  {
    icon: "📊",
    title: "Bioinformatics Pipeline", 
    description: "Advanced computational workflows for processing raw sequence data into actionable biodiversity metrics."
  }
];

export const Features = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-32">
      {features.map((feature, index) => (
        <div
          key={index}
          ref={el => cardsRef.current[index] = el}
          className="feature-card p-10 rounded-lg transition-all duration-700 hover:scale-105 hover:-translate-y-2"
        >
          <div className="text-4xl mb-6 text-primary transition-transform duration-300 hover:scale-125 hover:-translate-y-1">
            {feature.icon}
          </div>
          
          <h3 className="font-heading text-2xl mb-4 text-white transition-colors duration-300 hover:text-primary">
            {feature.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed transition-colors duration-300 hover:text-foreground">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
};