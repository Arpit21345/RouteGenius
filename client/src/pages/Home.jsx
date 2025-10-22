import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <main className="home">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">
            Smart Travel Planning<br />with <span className="highlight">AI</span>
          </h1>
          <p className="hero-subtitle">
            Create personalized itineraries in minutes. Let AI plan your perfect trip.
          </p>
          
          <div className="cta-buttons">
            <Link to="/plan" className="btn btn-primary">
              🚀 Plan Your Perfect Trip
            </Link>
            <Link to="/explore" className="btn btn-secondary">
              🌍 Explore Destinations
            </Link>
          </div>
        </div>
        
        <div className="features-section">
          <h2 className="text-center">Why RouteGenius?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>Smart itineraries tailored to your preferences and budget</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick & Easy</h3>
              <p>Get a complete travel plan in just a few minutes</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>Family Friendly</h3>
              <p>Options for solo, couples, families, and groups</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌤️</div>
              <h3>Weather Insights</h3>
              <p>Real-time weather info for better planning</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
