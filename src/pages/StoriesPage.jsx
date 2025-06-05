import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StoriesPage.css';

const StoriesPage = () => {
  const navigate = useNavigate();

  const stories = [
    {
      id: 1,
      title: 'The Legend of Ruhpolding',
      excerpt: 'Discover the ancient tales of how this magical valley was first discovered by Bavarian settlers...',
      category: 'Legends',
      readTime: '5 min read',
      image: '🏰'
    },
    {
      id: 2,
      title: 'Alpine Traditions',
      excerpt: 'From traditional folk music to ancient crafts, explore the cultural heritage that lives on...',
      category: 'Culture',
      readTime: '8 min read',
      image: '🎼'
    },
    {
      id: 3,
      title: 'Tales from the Mountains',
      excerpt: 'Local shepherds share stories passed down through generations about the mystical peaks...',
      category: 'Folklore',
      readTime: '6 min read',
      image: '⛰️'
    },
    {
      id: 4,
      title: 'Historic Churches',
      excerpt: 'The spiritual heart of Ruhpolding lies in its beautiful churches with centuries of history...',
      category: 'History',
      readTime: '7 min read',
      image: '⛪'
    }
  ];

  return (
    <div className="stories-page">
      <div className="stories-hero">
        <button 
          onClick={() => navigate('/')} 
          className="back-to-globe-btn"
        >
          🌍 Back to Globe
        </button>
        <h1 className="stories-title">📖 Local Stories</h1>
        <p className="stories-subtitle">Discover the rich history and legends of Ruhpolding</p>
      </div>

      <div className="stories-container">
        <div className="stories-grid">
          {stories.map((story) => (
            <article key={story.id} className="story-card">
              <div className="story-header">
                <div className="story-icon">{story.image}</div>
                <div className="story-meta">
                  <span className="story-category">{story.category}</span>
                  <span className="story-read-time">{story.readTime}</span>
                </div>
              </div>
              <h3 className="story-title">{story.title}</h3>
              <p className="story-excerpt">{story.excerpt}</p>
              <button className="story-read-btn">Read Story</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;