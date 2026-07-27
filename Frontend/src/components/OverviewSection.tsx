import { Button } from "@/components/ui/button";
export const OverviewSection = () => {
  return (
    <section id="Lab" className="my-20 glass-card p-12 rounded-lg mt-25">
      <h2 className="font-heading text-4xl mb-8 text-ocean-gradient text-center">
        Why DEEP ORIGIN?
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Problem Flip Card */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front glass-card rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <h3 className="font-display text-2xl font-bold text-cyan-300 mb-4">
                  The Challenge
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mb-6"></div>
              </div>
              <div className="p-6 text-foreground leading-relaxed">
                <p className="mb-4 text-gray-200 font-light text-lg">
                  Over 95% of the deep ocean remains unexplored. Traditional biodiversity studies rely on databases lacking deep-sea genetic sequences.
                </p>
                <div className="text-center mt-6">
                  <span className="text-sm text-cyan-300/80 font-medium">
                    Tap to explore challenges
                  </span>
                </div>
              </div>
            </div>
            <div className="flip-card-back glass-card rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <h3 className="font-display text-2xl font-bold text-cyan-300 mb-4">
                  The Implications
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mb-6"></div>
              </div>
              <div className="p-6 text-foreground leading-relaxed">
                <p className="mb-4 text-gray-200 font-medium text-center">
                  This leads to critical limitations:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-cyan-400 text-lg mr-2">•</span>
                    <span className="text-gray-200 font-light">Species misidentification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 text-lg mr-2">•</span>
                    <span className="text-gray-200 font-light">Unclassified genetic data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 text-lg mr-2">•</span>
                    <span className="text-gray-200 font-light">Missed discovery opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Solution Flip Card */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front glass-card rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <h3 className="font-display text-2xl font-bold text-emerald-300 mb-4">
                  Our Innovation
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mx-auto mb-6"></div>
              </div>
              <div className="p-6 text-foreground leading-relaxed">
                <p className="mb-4 text-gray-200 font-light text-lg">
                  We developed an AI pipeline that clusters genetic sequences by similarity before database comparison.
                </p>
                <div className="text-center mt-6">
                  <span className="text-sm text-emerald-300/80 font-medium">
                    Tap to see benefits
                  </span>
                </div>
              </div>
            </div>
            <div className="flip-card-back glass-card rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <h3 className="font-display text-2xl font-bold text-emerald-300 mb-4">
                  Key Advantages
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mx-auto mb-6"></div>
              </div>
              <div className="p-6 text-foreground leading-relaxed">
                <p className="mb-4 text-gray-200 font-medium text-center">
                  This breakthrough enables:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-emerald-400 text-lg mr-2">•</span>
                    <span className="text-gray-200 font-light">Novel species discovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 text-lg mr-2">•</span>
                    <span className="text-gray-200 font-light">Accurate biodiversity assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 text-lg mr-2">•</span>
                    <span className="text-gray-200 font-light">60% faster processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 text-lg mr-2">•</span>
                    <span className="text-gray-200 font-light">Reduced database dependency</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Added Button Component */}
      <div className="mt-12 text-center">
        <Button
          asChild
          variant="hero"
          size="lg"
          className="text-lg px-12 py-6 animate-fade-in-up [animation-delay:0.6s] bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        >
          <a href="https://edna-project.onrender.com" target="_blank" rel="noopener noreferrer">
            Launch Analysis Platform
          </a>
        </Button>
      </div>
      
      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
        }
        
        .font-display {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
        }
        
        .text-ocean-gradient {
          background: linear-gradient(135deg, #67B26F 0%, #4ca2cd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Flip card styling */
        .flip-card {
          perspective: 1000px;
          height: 320px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner,
        .flip-card:focus .flip-card-inner,
        .flip-card:active .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background: rgba(23, 42, 69, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        .glass-card {
          background: rgba(23, 42, 69, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        /* Mobile touch support */
        @media (max-width: 768px) {
          .flip-card {
            height: 380px;
          }
          
          .flip-card-inner.flipped {
            transform: rotateY(180deg);
          }
          
          .font-display {
            font-size: 1.5rem;
          }
        }
      `}</style>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const flipCards = document.querySelectorAll('.flip-card');
            
            flipCards.forEach(card => {
              card.addEventListener('touchstart', function(e) {
                e.preventDefault();
                const inner = this.querySelector('.flip-card-inner');
                inner.classList.toggle('flipped');
              }, { passive: false });
            });
          });
        `
      }} />
      
    </section>
  );
};