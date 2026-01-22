import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Lab", href: "#Lab" },
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
  ];

  const scrollToSection = (id: string) => {
    if (id.startsWith('#')) {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('.sidebar');
      
      if (sidebar && !sidebar.contains(event.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Detect hover on left edge of screen
  useEffect(() => {
    const detectHover = (e: MouseEvent) => {
      if (e.clientX < 30) { // 30px from left edge
        setIsSidebarOpen(true);
      }
    };

    document.addEventListener('mousemove', detectHover);
    return () => {
      document.removeEventListener('mousemove', detectHover);
    };
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div 
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="sidebar-content">
          {/* Logo */}
          <div className="sidebar-logo">
            <a href="/" className="flex items-center justify-center">
              <div className="circle-logo">
                <img src="/logo1.jpg" alt="Deep Origin Logo" />
              </div>
            </a>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.name} className="nav-item">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                      setIsSidebarOpen(false);
                    }}
                    className="nav-link"
                  >
                    <span className="nav-text animate-text-gradient">{item.name}</span>
                    <div className="hover-indicator"></div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Made by text at bottom */}
          <div className="made-by-text">
            <p>Made by DEEP ABYSS </p>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500&display=swap');
        
        /* Glass card effect */
        .sidebar {
          position: fixed;
          left: -280px;
          top: 0;
          height: 100%;
          width: 280px;
          transition: all 0.4s ease;
          z-index: 1000;
          padding: 25px 0;
          overflow-y: auto;
          background: rgba(30, 30, 50, 0.7);
          backdrop-filter: blur(12px);
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .sidebar.open {
          left: 0;
        }
        
        .sidebar-content {
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: space-between;
        }
        
        .sidebar-logo {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          width: 100%;
        }

        .circle-logo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
        }

        .circle-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .nav-list {
          list-style: none;
          width: 100%;
          padding: 0;
          margin-top: 20px;
        }
        
        .nav-item {
          margin-bottom: 25px;
          width: 100%;
          position: relative;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          text-decoration: none;
          border-radius: 0;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 22px;
          position: relative;
          background: transparent;
          border: none;
          box-shadow: none;
        }
        
        .nav-text {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          font-size: 22px;
        }
        
        /* Made by text styling */
        .made-by-text {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          width: 100%;
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 300;
        }
        
        .heart-sign {
          color: #ff3366;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        /* Text gradient animation */
        @keyframes text-gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-text-gradient {
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
          animation: text-gradient 8s ease-in-out infinite;
        }
        
        .hover-indicator {
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          background: rgba(118, 75, 162, 0.6);
          transition: all 0.3s ease;
          z-index: 1;
          border-radius: 0 8px 8px 0;
        }
        
        .nav-link:hover {
          background: transparent;
          transform: translateX(10px);
          box-shadow: none;
          border: none;
        }
        
        .nav-link:hover .nav-text {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .nav-link:hover .hover-indicator {
          width: 100%;
        }
        
        /* Add a subtle indicator for the hidden sidebar */
        .sidebar:not(.open) {
          border-right: 2px solid rgba(118, 75, 162, 0.5);
        }
        
        @media (max-width: 768px) {
          .sidebar {
            width: 240px;
            left: -240px;
          }
          
          .sidebar.open {
            left: 0;
          }
          
          .circle-logo {
            width: 80px;
            height: 80px;
          }

          .nav-link {
            padding: 14px 16px;
            font-size: 20px;
          }
          
          .nav-text {
            font-size: 20px;
          }
          
          .nav-item {
            margin-bottom: 20px;
          }
          
          .made-by-text {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};
