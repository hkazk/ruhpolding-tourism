import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Helper function to check if link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">🏔️</span>
        Ruhpolding
      </Link>
      <ul className="navbar-links">
        <li>
          <Link 
            to="/" 
            className={isActiveLink('/') ? 'active' : ''}
          >
            Explore
          </Link>
        </li>
        <li>
          <span className="navbar-info">Weather</span>
        </li>
        <li>
          <span className="navbar-info">Events</span>
        </li>
        <li>
          <span className="navbar-info">Gallery</span>
        </li>
        <li>
          <span className="navbar-info">Live Cam</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;