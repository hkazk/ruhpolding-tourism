import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import './MuseumPage.css';

// Import museum images
import museumImage from '../assets/museum.jpg';
import museum1Image from '../assets/museum1.jpg';
import museum2Image from '../assets/museum2.jpg';
import museum3Image from '../assets/museum3.jpg';

const MuseumPage = () => {
  const navigate = useNavigate();

  return (
    <div className="museum-page">
      <NavigationBar />

      {/* Hero Section */}
      <section className="hero" style={{backgroundImage: `url(${museum2Image})`}}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Heimatmuseum Ruhpolding</h1>
            <p>Discover the rich heritage and traditions of Bavarian Alpine culture through authentic artifacts and immersive storytelling.</p>
            
            <div className="stats">
              <div className="stat">
                <span className="number">200+</span>
                <span className="label">Historic Artifacts</span>
              </div>
              <div className="stat">
                <span className="number">300</span>
                <span className="label">Years of History</span>
              </div>
              <div className="stat">
                <span className="number">5</span>
                <span className="label">Exhibition Rooms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2>Cultural Discovery Experience</h2>
          <p>For lovers seeking more than just a typical holiday, the Heimatmuseum Ruhpolding offers a meaningful and enriching experience. Located within Ruhpolding, this museum is meticulously curated to serve as an educational vehicle into the traditions, stories, and everyday life of Bavarian culture.</p>
          <p>Walking through the museum is like stepping through time, offering insight into traditional furniture and rustic garments. Every room tells a different tale of the people, their work, choices and existence in the heart of this charming town.</p>
        </div>
      </section>

      {/* Collections Section */}
      <section className="collections">
        <div className="container">
          <h2>Museum Collections</h2>
          <div className="collections-grid">
            <div className="collection-card">
              <img src={museumImage} alt="Traditional Furniture" />
              <div className="card-content">
                <div className="icon">🪑</div>
                <h3>Traditional Furniture</h3>
                <p>Authentic 18th-century Bavarian wardrobes and handcrafted wooden artifacts showcasing Alpine craftsmanship.</p>
              </div>
            </div>
            <div className="collection-card">
              <img src={museum1Image} alt="Rural Life & Traditions" />
              <div className="card-content">
                <div className="icon">🏠</div>
                <h3>Rural Life & Traditions</h3>
                <p>Authentic room settings and household items showcasing how Alpine families lived through the centuries.</p>
              </div>
            </div>
            <div className="collection-card">
              <img src={museum3Image} alt="Traditional Crafts" />
              <div className="card-content">
                <div className="icon">🔨</div>
                <h3>Traditional Crafts</h3>
                <p>Tools and techniques used by local craftsmen, from woodworking to traditional Alpine trades.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Experience Section */}
      <section className="experience">
        <div className="container">
          <div className="experience-content">
            <div className="experience-text">
              <span className="badge">Featured Experience</span>
              <h2>Virtual Museum Tour</h2>
              <p>Explore our traditional Bavarian wardrobe exhibition in an immersive 3D environment. Walk through an authentic Alpine room setting and discover the craftsmanship behind these historic pieces.</p>
              <div className="features">
                <div className="feature">
                  <span>🏠</span>
                  <span>Authentic Room Setting</span>
                </div>
                <div className="feature">
                  <span>🗄️</span>
                  <span>Interactive 3D Objects</span>
                </div>
                <div className="feature">
                  <span>📱</span>
                  <span>Mobile Compatible</span>
                </div>
              </div>
              <button onClick={() => navigate('/wardrobe-room')}>
                Start Virtual Tour
              </button>
            </div>
            <div className="experience-image">
              <img src={museumImage} alt="Virtual Tour Preview" />
              <div className="play-button" onClick={() => navigate('/wardrobe-room')}>
                <span>▶</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Information */}
      <section className="visit">
        <div className="container">
          <h2>Plan Your Visit</h2>
          <div className="visit-grid">
            <div className="visit-card">
              <div className="visit-icon">📍</div>
              <h3>Location</h3>
              <p>Heimatmuseum Ruhpolding<br/>Historic Town Center, Bavaria</p>
            </div>
            <div className="visit-card">
              <div className="visit-icon">🕒</div>
              <h3>Hours</h3>
              <p>Tuesday - Sunday<br/>9:00 AM - 5:00 PM<br/>Closed Mondays</p>
            </div>
            <div className="visit-card">
              <div className="visit-icon">🎫</div>
              <h3>Admission</h3>
              <p>Adults: €8<br/>Students: €5<br/>Children: Free</p>
            </div>
            <div className="visit-card">
              <div className="visit-icon">🌐</div>
              <h3>More Info</h3>
              <p>
                <a href="https://www.ruhpolding.de/heimatmuseum-ruhpolding/" target="_blank" rel="noopener noreferrer">
                  Official Website
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MuseumPage;