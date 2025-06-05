import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccommodationPage.css';

const AccommodationPage = () => {
  const navigate = useNavigate();

  const accommodations = [
    {
      id: 1,
      name: 'Alpine Lodge Ruhpolding',
      type: 'Luxury Hotel',
      rating: 5,
      price: '€180-€320',
      image: '🏨',
      amenities: ['Spa & Wellness', 'Mountain View', 'Restaurant', 'Free WiFi']
    },
    {
      id: 2,
      name: 'Bavarian Mountain Chalet',
      type: 'Traditional Chalet',
      rating: 4,
      price: '€120-€200',
      image: '🏘️',
      amenities: ['Fireplace', 'Kitchen', 'Garden', 'Pet Friendly']
    },
    {
      id: 3,
      name: 'Eco Forest Retreat',
      type: 'Eco Lodge',
      rating: 4,
      price: '€90-€150',
      image: '🌲',
      amenities: ['Sustainable', 'Hiking Trails', 'Organic Food', 'Yoga Studio']
    },
    {
      id: 4,
      name: 'Lakeside Pension',
      type: 'Guesthouse',
      rating: 4,
      price: '€60-€110',
      image: '🏞️',
      amenities: ['Lake Access', 'Breakfast', 'Boat Rental', 'Fishing']
    }
  ];

  const services = [
    {
      id: 1,
      name: 'Mountain Guide Service',
      description: 'Professional guides for hiking and climbing',
      icon: '🥾',
      price: 'From €80/day'
    },
    {
      id: 2,
      name: 'Equipment Rental',
      description: 'Skiing, hiking, and outdoor gear rental',
      icon: '⛷️',
      price: 'From €25/day'
    },
    {
      id: 3,
      name: 'Local Transport',
      description: 'Shuttle services and airport transfers',
      icon: '🚐',
      price: 'From €15/trip'
    },
    {
      id: 4,
      name: 'Spa & Wellness',
      description: 'Relaxation and rejuvenation services',
      icon: '🧘',
      price: 'From €50/session'
    }
  ];

  return (
    <div className="accommodation-page">
      <div className="accommodation-hero">
        <button 
          onClick={() => navigate('/')} 
          className="back-to-globe-btn"
        >
          🌍 Back to Globe
        </button>
        <h1 className="accommodation-title">🏨 Accommodation & Services</h1>
        <p className="accommodation-subtitle">Find the perfect place to stay and services to enhance your visit</p>
      </div>

      <div className="accommodation-container">
        {/* Accommodation Section */}
        <section className="accommodations-section">
          <h2 className="section-title">Where to Stay</h2>
          <div className="accommodations-grid">
            {accommodations.map((accommodation) => (
              <div key={accommodation.id} className="accommodation-card">
                <div className="accommodation-header">
                  <div className="accommodation-icon">{accommodation.image}</div>
                  <div className="accommodation-rating">
                    {'⭐'.repeat(accommodation.rating)}
                  </div>
                </div>
                <h3 className="accommodation-name">{accommodation.name}</h3>
                <p className="accommodation-type">{accommodation.type}</p>
                <div className="accommodation-price">{accommodation.price}</div>
                <div className="accommodation-amenities">
                  {accommodation.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
                <button className="accommodation-book-btn">Book Now</button>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2 className="section-title">Additional Services</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.price}</div>
                <button className="service-book-btn">Learn More</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccommodationPage;