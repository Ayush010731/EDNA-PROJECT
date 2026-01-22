import { useEffect, useState } from "react";

interface ResultsProps {
  results: {
    speciesCount: number;
    readQuality: string;
    novelSequences: number;
    confidence: string;
    chartData: Array<{ name: string; value: number }>;
  } | null;
  isVisible: boolean;
}

export const Results = ({ results, isVisible }: ResultsProps) => {
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    if (isVisible && results) {
      // Trigger bar animation after component is visible
      setTimeout(() => setAnimatedBars(true), 100);
    }
  }, [isVisible, results]);

  if (!results || !isVisible) return null;

  return (
    <section className="analysis-card p-12 rounded-lg my-12 animate-fade-in-up">
      <h3 className="font-heading text-3xl mb-8 text-primary">
        Analysis Results
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 rounded-lg border-l-4 border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-soft">
          <h4 className="font-heading mb-3 text-muted-foreground">Species Identified</h4>
          <p className="text-3xl font-bold text-primary">{results.speciesCount}</p>
        </div>
        
        <div className="glass-card p-6 rounded-lg border-l-4 border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-soft">
          <h4 className="font-heading mb-3 text-muted-foreground">Read Quality</h4>
          <p className="text-3xl font-bold text-primary">{results.readQuality}%</p>
        </div>
        
        <div className="glass-card p-6 rounded-lg border-l-4 border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-soft">
          <h4 className="font-heading mb-3 text-muted-foreground">Novel Sequences</h4>
          <p className="text-3xl font-bold text-primary">{results.novelSequences}</p>
        </div>
        
        <div className="glass-card p-6 rounded-lg border-l-4 border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-soft">
          <h4 className="font-heading mb-3 text-muted-foreground">Analysis Confidence</h4>
          <p className="text-3xl font-bold text-primary">{results.confidence}%</p>
        </div>
      </div>

      <div className="glass-card p-8 rounded-lg">
        <h4 className="font-heading text-xl mb-6 text-center text-muted-foreground">
          Species Distribution
        </h4>
        
        <div className="flex items-end justify-around h-72 px-4">
          {results.chartData.map((item, index) => (
            <div key={item.name} className="flex flex-col items-center">
              <div
                className="w-12 bg-gradient-primary rounded-t transition-all duration-1000 relative"
                style={{
                  height: animatedBars ? `${item.value * 2}px` : '0px'
                }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                  {item.value}%
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-2 text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};