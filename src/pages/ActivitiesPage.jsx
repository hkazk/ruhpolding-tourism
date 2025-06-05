import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActivitiesPage.css';
// Import your actual images (only import the ones that exist)
import heroImage from '../assets/path.jpg';

// Function to safely import images
const getActivityImage = (imageName) => {
  try {
    return require(`../assets/${imageName}`);
  } catch (error) {
    return null; // Return null if image doesn't exist
  }
};

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const [hoveredActivity, setHoveredActivity] = useState(null);
  const parallaxRef = useRef(null);
  const heroRef = useRef(null);
  const activitiesRef = useRef(null);

  useEffect(() => {
    // Load GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.onload = initParallax;
      document.head.appendChild(scrollTriggerScript);
    };
    document.head.appendChild(script);

    return () => {
      // Complete cleanup - kill ALL ScrollTriggers
      if (window.gsap && window.ScrollTrigger) {
        window.ScrollTrigger.killAll();
        window.gsap.killTweensOf("*"); // Kill all tweens
      }
    };
  }, []);

  const initParallax = () => {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    const { gsap } = window;
    gsap.registerPlugin(window.ScrollTrigger);

    // Kill any existing animations first
    gsap.killTweensOf("*");
    window.ScrollTrigger.killAll();

    // ONLY animate elements that actually exist
    const activityCards = document.querySelectorAll('.activity-card');
    const heroContent = document.querySelector('.hero-content');

    if (activityCards.length > 0) {
      gsap.fromTo(activityCards,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: activitiesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (heroContent) {
      gsap.fromTo(heroContent, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  };

  const activities = [
    {
      id: 1,
      title: "Alpine Hiking",
      description: "Explore breathtaking mountain trails with panoramic views of the Bavarian Alps. From gentle valley walks to challenging summit hikes.",
      image: getActivityImage('hiking.jpg'),
      imageName: 'hiking.jpg',
      difficulty: "Easy to Expert",
      duration: "2-8 hours",
      season: "Apr - Oct",
      highlights: ["Scenic viewpoints", "Alpine flora", "Mountain huts", "Photo opportunities"],
      color: "#2ECC71"
    },
    {
      id: 2,
      title: "Crystal Clear Lakes",
      description: "Discover pristine alpine lakes perfect for swimming, boating, or peaceful contemplation surrounded by mountain peaks.",
      image: getActivityImage('lakes.jpg'),
      imageName: 'lakes.jpg',
      difficulty: "Easy",
      duration: "1-4 hours", 
      season: "May - Sep",
      highlights: ["Swimming", "Boat rentals", "Fishing", "Lakeside cafés"],
      color: "#3498DB"
    },
    {
      id: 3,
      title: "Traditional Bavarian Culture",
      description: "Immerse yourself in authentic Bavarian traditions, from folk festivals to traditional crafts and local gastronomy.",
      image: getActivityImage('culture.jpg'),
      imageName: 'culture.jpg',
      difficulty: "All levels",
      duration: "2-6 hours",
      season: "Year-round",
      highlights: ["Folk festivals", "Traditional crafts", "Local cuisine", "Historical tours"],
      color: "#E67E22"
    },
    {
      id: 4,
      title: "Expert Guided Tours", 
      description: "Discover hidden gems and local secrets with our knowledgeable guides who bring the history and culture of Ruhpolding to life through personalized tours.",
      image: getActivityImage('tours.jpg'),
      imageName: 'tours.jpg',
      difficulty: "All levels",
      duration: "2-6 hours",
      season: "Year-round",
      highlights: ["Local insights", "Historical landmarks", "Photo opportunities", "Small groups"],
      color: "#9B59B6"
    },
    {
      id: 5,
      title: "Traditional Bavarian Cuisine",
      description: "Savor authentic Alpine flavors through cooking classes, brewery tours, and tastings of regional specialties prepared by local artisans.",
      image: getActivityImage('cuisine.jpg'),
      imageName: 'cuisine.jpg',
      difficulty: "All levels",
      duration: "2-4 hours",
      season: "Year-round", 
      highlights: ["Cooking workshops", "Brewery visits", "Wine tastings", "Local delicacies"],
      color: "#1ABC9C"
    },
    {
      id: 6,
      title: "Cultural Museums & Heritage",
      description: "Immerse yourself in the rich heritage of the region through curated museum visits showcasing traditional crafts, local history, and Alpine culture.",
      image: getActivityImage('museum.jpg'),
      imageName: 'museum.jpg',
      difficulty: "All levels",
      duration: "1-3 hours",
      season: "Year-round",
      highlights: ["Historical exhibits", "Traditional crafts", "Cultural artifacts", "Interactive displays"],
      color: "#E74C3C"
    }
  ];

  return (
    <div className="activities-page" ref={parallaxRef}>
      {/* Unified Background for Entire Page */}
      <div className="unified-background">
        <div 
          className="unified-hero-image"
          style={{
            backgroundImage: `url(${heroImage})`
          }}
        ></div>
        <div className="unified-gradient-overlay"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <h1 className="hero-title">
            Discover
            <span className="hero-title-highlight"> Ruhpolding</span>
          </h1>
          <p className="hero-subtitle">
            Where Alpine Adventures Meet Bavarian Tradition
          </p>
          <p className="hero-description">
            Immerse yourself in a world of endless possibilities nestled in the heart of the Bavarian Alps. 
            From challenging mountain peaks to serene lake shores, every moment here is an invitation to explore, 
            discover, and connect with nature's magnificence.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Activities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">365</span>
              <span className="stat-label">Days of Adventure</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1,669m</span>
              <span className="stat-label">Peak Elevation</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow">↓</div>
          <span>Explore Activities</span>
        </div>
      </section>

      {/* Activities Section */}
      <section className="activities-section" ref={activitiesRef}>
        <div className="activities-container">
          <div className="section-header">
            <h2 className="section-title">Featured Activities</h2>
            <p className="section-subtitle">
              Choose your adventure from our carefully curated selection of experiences
            </p>
          </div>

          <div className="activities-grid">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="activity-card"
                onMouseEnter={() => setHoveredActivity(activity.id)}
                onMouseLeave={() => setHoveredActivity(null)}
              >
                <div className="activity-image-container">
                  {activity.image ? (
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="activity-image"
                    />
                  ) : (
                    <div className="activity-image-placeholder">
                      <div className="placeholder-content">
                        <div className="placeholder-icon">📸</div>
                        <p>Add image: {activity.imageName}</p>
                        <small>Place in /src/assets/</small>
                      </div>
                    </div>
                  )}
                  <div className="activity-overlay" />
                  <div 
                    className="activity-color-accent"
                    style={{ backgroundColor: activity.color }}
                  />
                </div>

                <div className="activity-content">
                  <div className="activity-header">
                    <h3 className="activity-title">{activity.title}</h3>
                    <div 
                      className="activity-icon"
                      style={{ color: activity.color }}
                    >
                      ✦
                    </div>
                  </div>

                  <p className="activity-description">{activity.description}</p>

                  <div className="activity-details">
                    <div className="detail-item">
                      <span className="detail-label">Difficulty:</span>
                      <span className="detail-value">{activity.difficulty}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">{activity.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Season:</span>
                      <span className="detail-value">{activity.season}</span>
                    </div>
                  </div>

                  <div className="activity-highlights">
                    <h4 className="highlights-title">What to Expect:</h4>
                    <div className="highlights-list">
                      {activity.highlights.map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="activity-button-container">
                    <button 
                      className="activity-button"
                      style={{ 
                        backgroundColor: activity.color,
                        boxShadow: `0 4px 15px ${activity.color}40`
                      }}
                      onClick={() => {
                        if (activity.id === 6) {
                          navigate('/museums');
                        } else if (activity.id === 5) {
                          navigate('/cuisine');
                        } else if (activity.id === 4) {
                          navigate('/guided-tours');
                        } else {
                          // Handle other activities or show coming soon
                          alert('Coming soon!');
                        }
                      }}
                    >
                      Discover More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;