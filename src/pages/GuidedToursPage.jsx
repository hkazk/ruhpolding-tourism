import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import './GuidedToursPage.css';

// Import all tour images for slider gallery
import tourHeroImage from '../assets/tour.jpg';
import tour1Image from '../assets/tour1.jpg';
import tour2Image from '../assets/tour2.jpg';
import tour3Image from '../assets/tour3.jpg';
import tour4Image from '../assets/tour4.jpg';
import tour5Image from '../assets/tour5.jpg';
import tour6Image from '../assets/tour6.jpg';
import tour7Image from '../assets/tour7.jpg';
import tour8Image from '../assets/tour8.jpg';

// Import map popup images
import map1Image from '../assets/map1.jpg';
import map2Image from '../assets/map2.jpg';
import map3Image from '../assets/map3.jpg';
import map4Image from '../assets/map4.jpg';
import map5Image from '../assets/map5.jpg';
import map6Image from '../assets/map6.jpg';

const GuidedToursPage = () => {
  const navigate = useNavigate();
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [useCustomMap, setUseCustomMap] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gallery images with descriptions
  const galleryImages = [
    {
      src: tour1Image,
      title: "Historic Architecture",
      description: "Discover centuries-old Bavarian buildings and traditional craftsmanship"
    },
    {
      src: tour2Image,
      title: "Alpine Landscapes",
      description: "Breathtaking mountain vistas and pristine natural beauty"
    },
    {
      src: tour3Image,
      title: "Cultural Heritage",
      description: "Experience authentic Bavarian traditions and local customs"
    },
    {
      src: tour4Image,
      title: "Nature Trails",
      description: "Peaceful walks through pristine forests and meadows"
    },
    {
      src: tour5Image,
      title: "Mountain Adventures",
      description: "Explore challenging peaks and scenic hiking routes"
    },
    {
      src: tour6Image,
      title: "Local Experiences",
      description: "Connect with local communities and traditional ways of life"
    },
    {
      src: tour7Image,
      title: "Scenic Viewpoints",
      description: "Capture stunning panoramic views from elevated lookouts"
    },
    {
      src: tour8Image,
      title: "Hidden Gems",
      description: "Discover secret spots known only to local guides"
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Real tour stops in Ruhpolding with actual coordinates and corresponding images
  const tourStops = [
    {
      id: 1,
      name: "Ruhpolding Town Center",
      description: "Start your journey at the historic market square with traditional Bavarian architecture and local shops.",
      coordinates: { lat: 47.7597, lng: 12.6454 },
      position: { top: '55%', left: '45%' },
      image: map1Image
    },
    {
      id: 2,
      name: "Parish Church St. Georg",
      description: "Visit the beautiful baroque church with its iconic onion dome and stunning mountain backdrop.",
      coordinates: { lat: 47.7615, lng: 12.6441 },
      position: { top: '45%', left: '42%' },
      image: map2Image
    },
    {
      id: 3,
      name: "Rauschberg Cable Car",
      description: "Take the cable car up to breathtaking alpine views over the Chiemgau region.",
      coordinates: { lat: 47.7511, lng: 12.6389 },
      position: { top: '70%', left: '35%' },
      image: map3Image
    },
    {
      id: 4,
      name: "Maiergschwendt Trail",
      description: "Hike through pristine alpine meadows with panoramic views of the Bavarian Alps.",
      coordinates: { lat: 47.7456, lng: 12.6702 },
      position: { top: '65%', left: '65%' },
      image: map4Image
    },
    {
      id: 5,
      name: "Weitsee Lake",
      description: "Discover this serene mountain lake perfect for reflection and photography.",
      coordinates: { lat: 47.7333, lng: 12.6556 },
      position: { top: '85%', left: '52%' },
      image: map5Image
    },
    {
      id: 6,
      name: "Unternberg Summit",
      description: "Reach the summit for spectacular 360-degree views of the surrounding peaks.",
      coordinates: { lat: 47.7289, lng: 12.6833 },
      position: { top: '80%', left: '72%' },
      image: map6Image
    }
  ];

  // Initialize Google Maps
  useEffect(() => {
    let mounted = true;

    const initMap = async () => {
      if (!window.google || !mapRef.current || !mounted) {
        if (mounted) setUseCustomMap(true);
        return;
      }

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 47.7597, lng: 12.6454 }, // Ruhpolding center
          zoom: 13,
          mapTypeId: 'terrain',
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true
        });

        // Create markers for each tour stop with custom images
        const markers = [];
        const infoWindows = [];

        tourStops.forEach((stop, index) => {
          const marker = new window.google.maps.Marker({
            position: stop.coordinates,
            map: map,
            title: stop.name,
            label: {
              text: stop.id.toString(),
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#4caf50',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 15
            },
            optimized: false
          });

          // Create info window content with custom image
          const infoWindowContent = `
            <div style="padding: 12px; max-width: 320px; font-family: Arial, sans-serif;">
              <div style="margin-bottom: 12px;">
                <img src="${stop.image}" 
                     style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; cursor: pointer;"
                     onclick="window.open('${stop.image}', '_blank')"
                     onmouseover="this.style.transform='scale(1.02)'; this.style.transition='transform 0.2s ease'"
                     onmouseout="this.style.transform='scale(1)'"
                     alt="Photo of ${stop.name}">
              </div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="
                  width: 24px; height: 24px; background: #4caf50; color: white; 
                  border-radius: 50%; display: flex; align-items: center; justify-content: center;
                  font-weight: bold; font-size: 12px;
                ">${stop.id}</div>
                <h3 style="margin: 0; color: #388e3c; font-size: 18px; font-weight: 600;">${stop.name}</h3>
              </div>
              <p style="margin: 0 0 12px 0; color: #2e7d32; font-size: 14px; line-height: 1.5;">${stop.description}</p>
              <div style="font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 8px;">
                <span style="color: #4caf50;">📍</span> Tour Stop ${stop.id} • Click photo to enlarge
              </div>
            </div>
          `;

          const infoWindow = new window.google.maps.InfoWindow({
            content: infoWindowContent,
            maxWidth: 350
          });

          marker.addListener('click', () => {
            // Close all other info windows
            infoWindows.forEach(iw => iw.close());
            infoWindow.open(map, marker);
          });

          if (mounted) {
            markers.push(marker);
            infoWindows.push(infoWindow);
          }
        });

        // Create tour route polyline
        const tourPath = new window.google.maps.Polyline({
          path: tourStops.map(stop => stop.coordinates),
          geodesic: true,
          strokeColor: '#8bc34a',
          strokeOpacity: 0.8,
          strokeWeight: 4
        });

        if (mounted) {
          tourPath.setMap(map);
          setMapLoaded(true);
        }
      } catch (error) {
        console.log('Google Maps initialization error:', error);
        if (mounted) setUseCustomMap(true);
      }
    };

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Only load script if it hasn't been loaded already
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');

      if (!existingScript) {
        const script = document.createElement('script');
        // Removed places library - just basic maps API
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDP_B1WvbqaYpfBlo-zjxDLT77x5GwpV3g&loading=async`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          if (mounted) {
            setTimeout(initMap, 500);
          }
        };

        script.onerror = () => {
          console.log('Failed to load Google Maps script');
          if (mounted) setUseCustomMap(true);
        };

        document.head.appendChild(script);
      } else {
        // Script exists, wait for it to load
        const checkGoogleMaps = () => {
          if (window.google && window.google.maps) {
            if (mounted) initMap();
          } else {
            setTimeout(checkGoogleMaps, 100);
          }
        };
        checkGoogleMaps();
      }
    }

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="guided-tours-page">
      <NavigationBar />

      {/* Hero Section */}
      <section className="guided-tours-hero" style={{backgroundImage: `url(${tourHeroImage})`}}>
        <div className="guided-tours-hero-overlay">
          <div className="guided-tours-hero-content">
            <h1>Expert Guided Tours</h1>
            <p>Discover hidden gems and local secrets with our knowledgeable guides who bring the history and culture of Ruhpolding to life through personalized tours.</p>
            
            <div className="guided-tours-stats">
              <div className="guided-tours-stat">
                <span className="number">15+</span>
                <span className="label">Tour Routes</span>
              </div>
              <div className="guided-tours-stat">
                <span className="number">5</span>
                <span className="label">Expert Guides</span>
              </div>
              <div className="guided-tours-stat">
                <span className="number">3h</span>
                <span className="label">Average Duration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="guided-tours-about">
        <div className="guided-tours-container">
          <h2>Breathe Deep, Walk Slow, Feel Renewed</h2>
          <p>Trade screen time for mountain time and reconnect with what matters: fresh air, stunning views, and real human connection. Our guided hikes in Ruhpolding take your team through lush forests, alpine meadows, and tranquil valleys against the majestic backdrop of the Bavarian Alps.</p>
          <p>Led by knowledgeable local guides, each hike is carefully designed to suit all fitness levels from relaxing nature walks to more challenging summit treks. Along the way, your group will experience quiet moments, shared laughter, and the powerful calm that only nature can offer.</p>
        </div>
      </section>

      {/* Interactive Map Section - Google Maps or Custom Fallback */}
      <section className="guided-tours-map-section">
        <div className="guided-tours-container">
          <h2>Interactive Tour Route</h2>
          <div className="guided-tours-map-container">
            {useCustomMap ? (
              // Custom SVG Map Fallback
              <svg 
                viewBox="0 0 800 600" 
                className="guided-tours-ruhpolding-map"
                style={{ width: '100%', height: '100%' }}
              >
                {/* Background with topographical feel */}
                <defs>
                  <radialGradient id="mountainGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#8bc34a" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#4caf50" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2e7d32" stopOpacity="0.1" />
                  </radialGradient>
                  <pattern id="forestPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="8" fill="#388e3c" opacity="0.1"/>
                  </pattern>
                </defs>
                
                {/* Background terrain */}
                <rect width="800" height="600" fill="url(#mountainGradient)" />
                <rect width="800" height="600" fill="url(#forestPattern)" />
                
                {/* Mountain ranges (simplified) */}
                <path d="M0 150 Q200 80 400 120 T800 100 L800 0 L0 0 Z" fill="#689f38" opacity="0.3" />
                <path d="M0 200 Q150 140 300 160 Q450 180 600 140 T800 150 L800 0 L0 0 Z" fill="#4caf50" opacity="0.2" />
                
                {/* Lakes */}
                <ellipse cx="420" cy="480" rx="35" ry="20" fill="#2196f3" opacity="0.6" />
                <text x="420" y="485" textAnchor="middle" fontSize="10" fill="#1976d2">Weitsee</text>
                
                {/* Roads */}
                <path d="M50 350 Q200 340 360 360 Q500 380 750 370" 
                      stroke="#8d6e63" strokeWidth="4" fill="none" opacity="0.5" />
                <path d="M360 360 Q380 280 420 200 Q460 150 500 120" 
                      stroke="#8d6e63" strokeWidth="3" fill="none" opacity="0.4" />
                
                {/* Town center area */}
                <rect x="340" y="340" width="40" height="30" fill="#795548" opacity="0.4" rx="3" />
                <text x="360" y="335" textAnchor="middle" fontSize="12" fill="#3e2723" fontWeight="bold">
                  Ruhpolding
                </text>
                
                {/* Tour markers */}
                {tourStops.map((stop) => (
                  <g key={stop.id}>
                    <circle
                      cx={stop.position.left.replace('%', '') * 8}
                      cy={stop.position.top.replace('%', '') * 6}
                      r="12"
                      fill="#4caf50"
                      stroke="#ffffff"
                      strokeWidth="3"
                      style={{
                        cursor: 'pointer',
                        transform: hoveredMarker === stop.id ? 'scale(1.3)' : 'scale(1)',
                        transformOrigin: 'center',
                        transition: 'transform 0.3s ease',
                        filter: hoveredMarker === stop.id ? 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.6))' : 'none'
                      }}
                      onMouseEnter={() => setHoveredMarker(stop.id)}
                      onMouseLeave={() => setHoveredMarker(null)}
                    />
                    <text
                      x={stop.position.left.replace('%', '') * 8}
                      y={stop.position.top.replace('%', '') * 6 + 4}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="bold"
                      fill="white"
                      style={{ pointerEvents: 'none' }}
                    >
                      {stop.id}
                    </text>
                    
                    {/* Tooltip */}
                    {hoveredMarker === stop.id && (
                      <g>
                        <rect
                          x={stop.position.left.replace('%', '') * 8 - 125}
                          y={stop.position.top.replace('%', '') * 6 - 100}
                          width="250"
                          height="80"
                          fill="rgba(255, 255, 255, 0.95)"
                          stroke="#4caf50"
                          strokeWidth="2"
                          rx="8"
                          filter="drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))"
                        />
                        <text
                          x={stop.position.left.replace('%', '') * 8}
                          y={stop.position.top.replace('%', '') * 6 - 75}
                          textAnchor="middle"
                          fontSize="14"
                          fontWeight="bold"
                          fill="#2e7d32"
                        >
                          {stop.name}
                        </text>
                        <foreignObject
                          x={stop.position.left.replace('%', '') * 8 - 120}
                          y={stop.position.top.replace('%', '') * 6 - 55}
                          width="240"
                          height="40"
                        >
                          <p style={{
                            fontSize: '12px',
                            color: '#388e3c',
                            textAlign: 'center',
                            margin: 0,
                            padding: '0 8px',
                            lineHeight: '1.3'
                          }}>
                            {stop.description}
                          </p>
                        </foreignObject>
                      </g>
                    )}
                  </g>
                ))}
                
                {/* Tour route line */}
                <path
                  d={`M${tourStops[0].position.left.replace('%', '') * 8} ${tourStops[0].position.top.replace('%', '') * 6} 
                     L${tourStops[1].position.left.replace('%', '') * 8} ${tourStops[1].position.top.replace('%', '') * 6}
                     L${tourStops[2].position.left.replace('%', '') * 8} ${tourStops[2].position.top.replace('%', '') * 6}
                     L${tourStops[3].position.left.replace('%', '') * 8} ${tourStops[3].position.top.replace('%', '') * 6}
                     L${tourStops[4].position.left.replace('%', '') * 8} ${tourStops[4].position.top.replace('%', '') * 6}
                     L${tourStops[5].position.left.replace('%', '') * 8} ${tourStops[5].position.top.replace('%', '') * 6}`}
                  stroke="#8bc34a"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  opacity="0.8"
                />
              </svg>
            ) : (
              // Google Maps
              <>
                <div 
                  ref={mapRef}
                  className="guided-tours-google-map"
                  style={{ width: '100%', height: '100%' }}
                />
                {!mapLoaded && (
                  <div className="guided-tours-map-loading">
                    <div className="guided-tours-loading-spinner"></div>
                    <p>Loading interactive map...</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="guided-tours-map-legend">
            <h3>Tour Stops Legend</h3>
            <div className="guided-tours-legend-items">
              {tourStops.map((stop) => (
                <div key={stop.id} className="guided-tours-legend-item">
                  <div className="guided-tours-legend-marker">{stop.id}</div>
                  <div className="guided-tours-legend-text">
                    <strong>{stop.name}</strong>
                    <span>{stop.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p style={{
            textAlign: 'center',
            marginTop: '2rem',
            color: '#388e3c',
            fontStyle: 'italic'
          }}>
            {useCustomMap ? '🖱️ Hover over the numbered markers to explore each tour stop' : '🖱️ Click on the numbered markers to explore each tour stop'}
          </p>
        </div>
      </section>

      {/* Tour Gallery Slider Section */}
      <section className="guided-tours-gallery">
        <div className="guided-tours-container">
          <h2>Tour Highlights Gallery</h2>
          <div className="guided-tours-gallery-slider">
            <div className="guided-tours-slider-container">
              <div 
                className="guided-tours-slider-track"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="guided-tours-slide">
                    <img src={image.src} alt={image.title} />
                    <div className="guided-tours-slide-overlay">
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button className="guided-tours-slider-btn guided-tours-prev-btn" onClick={prevSlide}>
                &#8249;
              </button>
              <button className="guided-tours-slider-btn guided-tours-next-btn" onClick={nextSlide}>
                &#8250;
              </button>
              
              {/* Slide Indicators */}
              <div className="guided-tours-slider-indicators">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    className={`guided-tours-indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="guided-tours-thumbnail-strip">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`guided-tours-thumbnail ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  <img src={image.src} alt={image.title} />
                  <div className="guided-tours-thumbnail-overlay">
                    <span>{image.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tour Routes Section */}
      <section className="guided-tours-routes">
        <div className="guided-tours-container">
          <div className="guided-tours-routes-content">
            <div className="guided-tours-routes-text">
              <span className="guided-tours-badge">Premium Experience</span>
              <h2>Guided Nature Adventures</h2>
              <p>These outdoor adventures are more than just a physical activity, they're a reset for the mind and a boost for team morale. Time spent in nature has been shown to relieve stress, improve mood, and foster meaningful conversations, making it the perfect addition to any corporate retreat or wellness itinerary.</p>
              <div className="guided-tours-route-features">
                <div className="guided-tours-route-feature">
                  <span>🥾</span>
                  <span>Professional Local Guides</span>
                </div>
                <div className="guided-tours-route-feature">
                  <span>🏔️</span>
                  <span>Scenic Alpine Routes</span>
                </div>
                <div className="guided-tours-route-feature">
                  <span>📸</span>
                  <span>Photo Opportunities</span>
                </div>
                <div className="guided-tours-route-feature">
                  <span>🌿</span>
                  <span>Wildlife & Flora Discovery</span>
                </div>
              </div>
              
              <button className="guided-tours-book-btn">
                Book Your Adventure
              </button>
            </div>
            <div className="guided-tours-routes-image">
              <img src={tour1Image} alt="Guided Tour Group" />
            </div>
          </div>
        </div>
      </section>

      {/* Tour Highlights Section */}
      <section className="guided-tours-highlights">
        <div className="guided-tours-container">
          <h2>What Makes Our Tours Special</h2>
          <div className="guided-tours-highlights-grid">
            <div className="guided-tours-highlight-card">
              <div className="guided-tours-highlight-icon">👥</div>
              <h3>Small Groups</h3>
              <p>Maximum 8 people per tour for personalized attention and intimate experiences.</p>
            </div>
            <div className="guided-tours-highlight-card">
              <div className="guided-tours-highlight-icon">🎓</div>
              <h3>Expert Knowledge</h3>
              <p>Local guides with deep knowledge of history, culture, and natural heritage.</p>
            </div>
            <div className="guided-tours-highlight-card">
              <div className="guided-tours-highlight-icon">🏆</div>
              <h3>All Skill Levels</h3>
              <p>Routes designed for everyone from beginners to experienced hikers.</p>
            </div>
            <div className="guided-tours-highlight-card">
              <div className="guided-tours-highlight-icon">🌟</div>
              <h3>Hidden Gems</h3>
              <p>Access to secret spots and viewpoints known only to locals.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidedToursPage;