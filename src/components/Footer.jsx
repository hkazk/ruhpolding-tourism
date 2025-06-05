import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-background-overlay"></div>
      
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🏔️</span>
              <span className="footer-logo-text">Ruhpolding</span>
            </div>
            <p className="footer-tagline">
              Discover the authentic heart of the Bavarian Alps, where pristine nature meets rich cultural heritage.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <span className="social-icon">📘</span>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <span className="social-icon">📹</span>
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <span className="social-icon">✉️</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">Explore</h3>
            <ul className="footer-links">
              <li><Link to="/activities">Mountain Activities</Link></li>
              <li><Link to="/guided-tours">Expert Guides</Link></li>
              <li><Link to="/museums">Cultural Heritage</Link></li>
              <li><Link to="/cuisine">Local Cuisine</Link></li>
            </ul>
          </div>

          {/* Experience */}
          <div className="footer-section">
            <h3 className="footer-section-title">Experience</h3>
            <ul className="footer-links">
              <li><a href="#">Alpine Hiking</a></li>
              <li><a href="#">Crystal Lakes</a></li>
              <li><a href="#">Traditional Crafts</a></li>
              <li><a href="#">Seasonal Events</a></li>
            </ul>
          </div>

          {/* Visit Information */}
          <div className="footer-section">
            <h3 className="footer-section-title">Visit</h3>
            <ul className="footer-links">
              <li><a href="#">Getting Here</a></li>
              <li><a href="#">Where to Stay</a></li>
              <li><a href="#">Weather Guide</a></li>
              <li><a href="#">Safety Tips</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-section">
            <h3 className="footer-section-title">Connect</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div className="contact-details">
                  <p>Ruhpolding Tourist Office</p>
                  <p>83324 Ruhpolding, Bavaria</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-details">
                  <p>+49 8663 8806-0</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕒</span>
                <div className="contact-details">
                  <p>Mon-Fri: 9:00-17:00</p>
                  <p>Sat-Sun: 9:00-13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h3 className="newsletter-title">Stay Connected with Ruhpolding</h3>
            <p className="newsletter-description">
              Receive updates about seasonal activities, local events, and exclusive alpine experiences.
            </p>
          </div>
          <div className="newsletter-form">
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-button">
                Subscribe
              </button>
            </div>
            <p className="newsletter-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; 2025 Ruhpolding Tourism. All rights reserved.</p>
            <p className="footer-location">Authentic Bavarian Alps Experience</p>
          </div>
          <div className="footer-bottom-right">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-legal-link">Terms of Service</a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-legal-link">Cookie Policy</a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-legal-link">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;