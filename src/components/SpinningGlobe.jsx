import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import './SpinningGlobe.css';

const SpinningGlobe = () => {
  const navigate = useNavigate();
  const mountRef = useRef(null);
  const globeInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // New state for weather and time
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: '12°C',
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: '68%',
    wind: '8 km/h'
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate weather data and news/offers (in production, fetch from APIs)
  useEffect(() => {
    // This would typically be an API call to get real weather for Ruhpolding
    const weatherConditions = [
      { temp: '12°C', condition: 'Partly Cloudy', icon: '⛅', humidity: '68%', wind: '8 km/h' },
      { temp: '15°C', condition: 'Sunny', icon: '☀️', humidity: '55%', wind: '12 km/h' },
      { temp: '8°C', condition: 'Light Snow', icon: '🌨️', humidity: '85%', wind: '6 km/h' },
      { temp: '18°C', condition: 'Clear Sky', icon: '🌤️', humidity: '45%', wind: '10 km/h' }
    ];
    
    // Randomly select weather for demo (replace with real API)
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    setWeather(randomWeather);
  }, []);

  // Format time for Ruhpolding (Central European Time)
  const formatRuhpoldingTime = () => {
    const options = {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return currentTime.toLocaleTimeString('en-GB', options);
  };

  const formatRuhpoldingDate = () => {
    const options = {
      timeZone: 'Europe/Berlin',
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    };
    return currentTime.toLocaleDateString('en-GB', options);
  };

  // Menu options - REMOVED individual colors to use cohesive CSS
  const menuOptions = [
    {
      id: 'activities',
      title: 'Available Activities',
      icon: '🏔️',
      description: 'Explore mountain hiking, alpine lakes, and traditional Bavarian culture',
      priority: 'high'
    },
    {
      id: 'stories',
      title: 'Local Stories',
      icon: '📖',
      description: 'Discover the rich history and legends of Ruhpolding',
      priority: 'low'
    },
    {
      id: 'video',
      title: 'Discover Ruhpolding in Motion',
      icon: '🎬',
      description: 'Watch our immersive video journey through the region',
      priority: 'high'
    },
    {
      id: 'accommodation',
      title: 'Find Accommodation & Services',
      icon: '🏨',
      description: 'Hotels, restaurants, and additional services',
      priority: 'high'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: '📞',
      description: 'Get in touch for personalized recommendations',
      priority: 'low'
    }
  ];

  // Handle expand
  const handleExpand = useCallback(() => {
    setShowOptions(true);
  }, []);

  // Handle option selection with camera dive and navigation
  const handleOptionSelect = useCallback((option) => {
    if (!showOptions) {
      setShowOptions(true);
    } else {
      if (option.id === 'contact') {
        setShowContactForm(true);
      } else {
        // Start camera dive transition
        setIsTransitioning(true);
        setShowOptions(false);
        
        const instance = globeInstanceRef.current;
        if (instance && instance.camera && instance.scene) {
          const startTime = Date.now();
          const duration = 3000; // 3 seconds
          const startPosition = instance.camera.position.clone();
          const targetPosition = new THREE.Vector3(0, 0, 1.5); // Dive close to Earth
          
          const animateCameraDive = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing function for cinematic feel
            const easeInOutCubic = progress < 0.5 
              ? 4 * progress * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            // Animate camera position
            instance.camera.position.lerpVectors(startPosition, targetPosition, easeInOutCubic);
            instance.camera.lookAt(0, 0, 0);
            
            // Add camera shake for impact
            if (progress > 0.8) {
              const shake = (1 - progress) * 0.1;
              instance.camera.position.x += (Math.random() - 0.5) * shake;
              instance.camera.position.y += (Math.random() - 0.5) * shake;
            }
            
            // Speed up globe rotation during dive
            if (instance.globe) {
              instance.globe.rotation.y += 0.02 * (1 + progress * 2);
            }
            
            if (progress < 1) {
              requestAnimationFrame(animateCameraDive);
            } else {
              // Animation complete - navigate to new page
              setTimeout(() => {
                navigate(`/${option.id}`);
              }, 500);
            }
          };
          
          animateCameraDive();
        } else {
          // Fallback if 3D instance not available
          setTimeout(() => {
            navigate(`/${option.id}`);
          }, 1000);
        }
      }
    }
  }, [showOptions, navigate]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOptions && !event.target.closest('.options-panel') && !event.target.closest('canvas')) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showOptions]);

  const createGlobe = useCallback(() => {
    if (!mountRef.current || globeInstanceRef.current) return;

    try {
      const globeInstance = {
        scene: null,
        camera: null,
        renderer: null,
        globe: null,
        animationId: null
      };

      // Create scene
      globeInstance.scene = new THREE.Scene();

      // Create camera
      globeInstance.camera = new THREE.PerspectiveCamera(
        60,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      globeInstance.camera.position.set(0, 0, 6);

      // Create renderer
      globeInstance.renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true
      });
      globeInstance.renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      globeInstance.renderer.setClearColor(0x000000, 1);
      
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(globeInstance.renderer.domElement);

      // Add click listener
      globeInstance.renderer.domElement.addEventListener('click', handleExpand);

      // Create globe
      const globeGeometry = new THREE.SphereGeometry(2.2, 64, 64);
      const textureLoader = new THREE.TextureLoader();
      const earthTexture = textureLoader.load(
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_atmos_2048.jpg',
        () => setIsLoading(false),
        undefined,
        () => setIsLoading(false)
      );

      const globeMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 150,
        specular: 0x222222
      });

      globeInstance.globe = new THREE.Mesh(globeGeometry, globeMaterial);
      globeInstance.scene.add(globeInstance.globe);

      // Add atmosphere
      const atmosphereGeometry = new THREE.SphereGeometry(2.35, 64, 64);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x4A90E2,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      globeInstance.scene.add(atmosphere);

      // Create enhanced star field
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 1500;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const radius = 40 + Math.random() * 40;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Vary star colors
        const colorType = Math.random();
        if (colorType < 0.3) {
          // Blue stars
          colors[i3] = 0.5 + Math.random() * 0.5;
          colors[i3 + 1] = 0.7 + Math.random() * 0.3;
          colors[i3 + 2] = 1.0;
        } else if (colorType < 0.6) {
          // Orange stars
          colors[i3] = 1.0;
          colors[i3 + 1] = 0.6 + Math.random() * 0.4;
          colors[i3 + 2] = 0.3 + Math.random() * 0.3;
        } else {
          // White stars
          colors[i3] = 1.0;
          colors[i3 + 1] = 1.0;
          colors[i3 + 2] = 1.0;
        }
      }
      
      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const starMaterial = new THREE.PointsMaterial({
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending
      });
      
      const stars = new THREE.Points(starGeometry, starMaterial);
      globeInstance.scene.add(stars);
      globeInstance.stars = stars;

      // Add Ruhpolding marker
      const lat = 47.7637;
      const lon = 12.6454;
      const radius = 2.25;
      
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      const markerPosition = new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      const markerGeometry = new THREE.SphereGeometry(0.03, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.9
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(markerPosition);
      globeInstance.scene.add(marker);
      globeInstance.marker = marker;

      // Add pulsing ring around marker
      const ringGeometry = new THREE.RingGeometry(0.05, 0.08, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(markerPosition);
      ring.lookAt(0, 0, 0);
      globeInstance.scene.add(ring);
      globeInstance.ring = ring;

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      globeInstance.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      globeInstance.scene.add(directionalLight);

      // Animation loop
      const animate = () => {
        if (!globeInstance.scene || !globeInstance.renderer || !globeInstance.camera) return;

        globeInstance.animationId = requestAnimationFrame(animate);
        
        // Rotate globe
        if (globeInstance.globe) {
          globeInstance.globe.rotation.y += 0.005;
        }

        // Rotate stars
        if (globeInstance.stars) {
          globeInstance.stars.rotation.x += 0.0002;
          globeInstance.stars.rotation.y += 0.0003;
          globeInstance.stars.rotation.z += 0.0001;
        }

        // Animate marker
        if (globeInstance.marker) {
          const time = Date.now() * 0.005;
          globeInstance.marker.material.opacity = 0.7 + Math.sin(time) * 0.3;
        }

        // Animate ring
        if (globeInstance.ring) {
          const time = Date.now() * 0.003;
          globeInstance.ring.scale.setScalar(1 + Math.sin(time) * 0.3);
          globeInstance.ring.material.opacity = 0.4 + Math.sin(time) * 0.2;
        }
        
        globeInstance.renderer.render(globeInstance.scene, globeInstance.camera);
      };

      // Handle resize
      const handleResize = () => {
        if (globeInstance.camera && globeInstance.renderer && mountRef.current) {
          const width = mountRef.current.clientWidth;
          const height = mountRef.current.clientHeight;
          globeInstance.camera.aspect = width / height;
          globeInstance.camera.updateProjectionMatrix();
          globeInstance.renderer.setSize(width, height);
        }
      };

      window.addEventListener('resize', handleResize);
      globeInstance.handleResize = handleResize;

      animate();
      globeInstanceRef.current = globeInstance;
      setIsLoading(false);

    } catch (err) {
      console.error("Error creating globe:", err);
      setError("Failed to create globe");
      setIsLoading(false);
    }
  }, [handleExpand]);

  const cleanupGlobe = useCallback(() => {
    if (!globeInstanceRef.current) return;
    
    const instance = globeInstanceRef.current;
    
    if (instance.handleResize) {
      window.removeEventListener('resize', instance.handleResize);
    }
    
    if (instance.animationId) {
      cancelAnimationFrame(instance.animationId);
    }
    
    if (instance.renderer && instance.renderer.domElement) {
      instance.renderer.domElement.removeEventListener('click', handleExpand);
    }
    
    if (mountRef.current && instance.renderer && mountRef.current.contains(instance.renderer.domElement)) {
      mountRef.current.removeChild(instance.renderer.domElement);
    }
    
    if (instance.scene) {
      instance.scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
    
    if (instance.renderer) {
      instance.renderer.dispose();
    }
    
    globeInstanceRef.current = null;
  }, [handleExpand]);

  useEffect(() => {
    createGlobe();
    return cleanupGlobe;
  }, [createGlobe, cleanupGlobe]);

  if (error) {
    return (
      <div className="error-container">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="spinning-globe-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading Spinning Globe...</div>
        </div>
      )}

      {/* Redesigned Center Instructions - Much More Professional */}
      {!showOptions && !isLoading && !isTransitioning && (
        <div className="center-instructions">
          <div className="explore-badge">✨ EXPLORE</div>
          <div className="main-title">
            Ruhpolding
            <span className="title-accent">Experience</span>
          </div>
          <div className="instruction-text">Click anywhere to begin your journey</div>
        </div>
      )}

      {/* Floating Info Panel */}
      {!showOptions && !isTransitioning && (
        <div className="floating-info-panel">
          {/* Location Header */}
          <div className="info-header">
            <div className="location-icon">📍</div>
            <div className="location-details">
              <h3 className="location-name">Ruhpolding, Bavaria</h3>
              <p className="location-subtitle">Alpine Paradise</p>
            </div>
          </div>

          {/* Time & Date */}
          <div className="time-section">
            <div className="current-time">{formatRuhpoldingTime()}</div>
            <div className="current-date">{formatRuhpoldingDate()}</div>
          </div>

          {/* Weather */}
          <div className="weather-section">
            <div className="weather-main">
              <div className="weather-left">
                <span className="weather-icon">{weather.icon}</span>
                <div className="weather-details">
                  <div className="weather-temp">{weather.temp}</div>
                  <div className="weather-condition">{weather.condition}</div>
                </div>
              </div>
            </div>
            
            <div className="weather-stats">
              <div className="weather-stat">💧 {weather.humidity}</div>
              <div className="weather-stat">💨 {weather.wind}</div>
            </div>
          </div>

          {/* Featured Experience */}
          <div className="featured-experience">
            <div className="featured-label">⭐ Featured Today</div>
            <div className="featured-title">Alpine Winter Hiking</div>
            <div className="featured-description">
              Experience magical snow-covered trails with expert local guides
            </div>
          </div>

          {/* Latest News & Offers */}
          <div className="news-offers-section">
            <div className="section-label">📢 Latest News</div>
            
            <div className="news-item">
              <div className="news-badge">NEW</div>
              <div className="news-content">
                <div className="news-title">Spring Festival 2025</div>
                <div className="news-description">Traditional Bavarian celebration - March 15-17</div>
              </div>
            </div>

            <div className="news-item">
              <div className="news-badge special">OFFER</div>
              <div className="news-content">
                <div className="news-title">Early Bird Special</div>
                <div className="news-description">Save 20% on guided tours booked this month</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="transition-overlay">
          <div className="transition-effects">
            <div className="diving-text">
              Entering {menuOptions.find(opt => showOptions && opt.id)?.title || 'Experience'}...
            </div>
            <div className="diving-subtext">Preparing your journey</div>
          </div>
        </div>
      )}

      <div 
        ref={mountRef} 
        className={`globe-container ${showOptions ? 'globe-minimized' : ''}`}
      />

      {/* REMOVED - No longer showing duplicate text at bottom */}

      {/* FIXED: Compact Options Panel - REMOVED inline styles */}
      {!showOptions && !isTransitioning && (
        <div className="compact-options-panel">
          {menuOptions.map((option, index) => (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className={`compact-option-dot ${option.priority === 'high' ? 'dot-large' : 'dot-small'}`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {option.icon}
            </div>
          ))}
        </div>
      )}

      {/* FIXED: Options Panel - REMOVED inline styles */}
      {showOptions && !isTransitioning && (
        <div className="options-panel">
          <h2 className="options-title">Discover Ruhpolding</h2>

          <div className="options-list">
            {menuOptions.map((option, index) => (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className={`option-item ${option.priority === 'high' ? 'option-large' : 'option-small'}`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-text">{option.title}</div>
              </div>
            ))}
          </div>

          <div 
            className="minimize-hint"
            onClick={() => setShowOptions(false)}
          >
            Click to minimize
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="modal-overlay">
          <div className="contact-modal">
            <button
              onClick={() => setShowContactForm(false)}
              className="close-button"
            >
              ×
            </button>

            <h2 className="contact-title">📞 Contact Us</h2>

            <form className="contact-form">
              <input type="text" placeholder="Your Name" className="form-input" />
              <input type="email" placeholder="Your Email" className="form-input" />
              <textarea placeholder="Your Message" rows="4" className="form-textarea" />
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinningGlobe;