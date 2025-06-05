import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoPage.css';

const VideoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="video-page">
      <div className="video-hero">
        <button 
          onClick={() => navigate('/')} 
          className="back-to-globe-btn"
        >
          🌍 Back to Globe
        </button>
        <h1 className="video-title">🎬 Discover Ruhpolding in Motion</h1>
        <p className="video-subtitle">Experience the beauty of our region through immersive video</p>
      </div>

      <div className="video-container">
        <div className="main-video">
          <div className="video-placeholder">
            <div className="play-button">
              <div className="play-icon">▶️</div>
            </div>
            <div className="video-info">
              <h3>Ruhpolding: A Journey Through Time</h3>
              <p>4K Ultra HD • 12:34 minutes</p>
            </div>
          </div>
        </div>

        <div className="video-grid">
          <div className="video-card">
            <div className="video-thumbnail">
              <div className="thumbnail-icon">🏔️</div>
              <div className="video-duration">5:42</div>
            </div>
            <div className="video-card-info">
              <h4>Mountain Adventures</h4>
              <p>Explore the breathtaking peaks and trails</p>
            </div>
          </div>

          <div className="video-card">
            <div className="video-thumbnail">
              <div className="thumbnail-icon">🏞️</div>
              <div className="video-duration">3:28</div>
            </div>
            <div className="video-card-info">
              <h4>Alpine Lakes</h4>
              <p>Crystal clear waters and serene landscapes</p>
            </div>
          </div>

          <div className="video-card">
            <div className="video-thumbnail">
              <div className="thumbnail-icon">🎭</div>
              <div className="video-duration">7:15</div>
            </div>
            <div className="video-card-info">
              <h4>Cultural Heritage</h4>
              <p>Traditional festivals and local customs</p>
            </div>
          </div>

          <div className="video-card">
            <div className="video-thumbnail">
              <div className="thumbnail-icon">⛷️</div>
              <div className="video-duration">6:33</div>
            </div>
            <div className="video-card-info">
              <h4>Winter Wonderland</h4>
              <p>Skiing, snowboarding, and winter magic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;