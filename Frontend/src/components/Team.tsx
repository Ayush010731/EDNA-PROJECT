import { useState } from 'react';

export const TeamSection = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());

  const toggleFlip = (id) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlippedCards(newFlipped);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Ayush Ojha",
      role: "Frontend Developer",
      bio: "Developed and optimized responsive UI components ensuring seamless user experience across devices.",
      photo: "/I10.jpg"
    },
    {
      id: 2,
      name: "Akash Patel",
      role: "Frontend Developer",
      bio: "Implemented interactive frontend features with clean, maintainable code aligned to modern design standards.",
      photo: "/I3.jpeg"
    },
    {
      id: 3,
      name: "Ansh Singh Rathore",
      role: "Backend Developer",
      bio: "Engineered robust backend services with secure APIs and efficient database integration for smooth data flow.",
      photo: "/I9.jpeg"
    },
    {
      id: 4,
      name: "Anant Kaushik",
      role: "R&D",
      bio: "Conducted extensive research to identify and curate relevant datasets, ensuring data quality and reliability.",
      photo: "/I4.PNG"
    },
    {
      id: 5,
      name: "Anushka Sharma",
      role: "Backend Developer",
      bio: "Designed and trained machine learning models, integrated predictive pipelines, and optimized performance for real-time analysis.",
      photo: "/I5.jpg"
    },
    {
      id: 6,
      name: "Harshit Rawat",
      role: "R&D",
      bio: "Contributed to research by exploring and identifying useful datasets for the project.",
      photo: "/I2.jpeg"
    }
  ];

  return (
    <section id="team" className="py-16 px-4 relative">
      {/* Background with subtle gradient for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-800/50 -z-10"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Team</h2>
          <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
            Meet the experts behind our oceanic eDNA research and analysis platform
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(member => (
            <div 
              key={member.id} 
              className={`flip-card ${flippedCards.has(member.id) ? 'flipped' : ''}`}
              onClick={() => toggleFlip(member.id)}
            >
              <div className="flip-card-inner">
                {/* Front Side - Photo (80%) and Text (20%) */}
                <div className="flip-card-front">
                  <div className="photo-section">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="team-photo"
                    />
                    <div className="photo-overlay"></div>
                  </div>
                  <div className="text-section">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                  </div>
                </div>

                {/* Back Side - Description Only */}
                <div className="flip-card-back">
                  <div className="back-content">
                    <h3 className="team-name-back">{member.name}</h3>
                    <p className="team-role-back">{member.role}</p>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .flip-card {
          background: transparent;
          perspective: 1000px;
          height: 380px;
          width: 100%;
          cursor: pointer;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.7s ease;
          transform-style: preserve-3d;
          border-radius: 16px;
        }
        
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .flip-card-front {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .photo-section {
          height: 80%; /* Increased photo height */
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        
        .team-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .photo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(15, 23, 42, 0.7) 100%);
        }
        
        .text-section {
          height: 20%; /* Reduced text height */
          width: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(5px);
        }
        
        .flip-card-back {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transform: rotateY(180deg);
          padding: 30px;
          text-align: center;
        }
        
        .back-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          gap: 15px;
        }
        
        .team-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 5px;
          font-family: 'Inter', sans-serif;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          letter-spacing: 0.5px;
        }
        
        .team-role {
          color: #7dd3fc;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .team-name-back {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 5px;
          font-family: 'Inter', sans-serif;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          letter-spacing: 0.5px;
        }
        
        .team-role-back {
          color: #7dd3fc;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          margin-bottom: 15px;
        }
        
        .team-bio {
          color: #e2e8f0;
          line-height: 1.6;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          max-width: 300px;
        }
        
        @media (max-width: 768px) {
          .flip-card {
            height: 350px;
          }
          
          .team-name {
            font-size: 1.3rem;
          }
          
          .team-role {
            font-size: 0.9rem;
          }
          
          .team-name-back {
            font-size: 1.5rem;
          }
          
          .team-role-back {
            font-size: 1rem;
          }
          
          .team-bio {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};
