import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import './ItineraryResults.css';

const ItineraryResults = () => {
  const location = useLocation();
  const itinerary = location.state?.itinerary || null;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    const element = document.getElementById('itinerary-content');
    const opt = {
      margin: 0.5,
      filename: `${itinerary.destination}-Itinerary.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!itinerary) {
    return (
      <main className="itinerary-results">
        <div className="container">
          <p>Loading itinerary...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="itinerary-results">
      <div className="container">
        <div id="itinerary-content">
          <div className="results-header">
            <h1>{itinerary.destination} Adventure</h1>
            <p className="trip-meta">
              {itinerary.groupType && `👥 ${itinerary.groupType} | `}
              📅 {itinerary.days} Days
            </p>
          </div>

          <div className="itinerary-content">
            <div className="day-cards">
              {itinerary.dailyPlan?.map((day, index) => (
                <div key={index} className="day-card">
                  <div className="day-header">
                    <h2>Day {day.day} - {day.title}</h2>
                    {itinerary.weather && itinerary.weather[index] && (
                      <div className="weather-info">
                        <img 
                          src={`https://openweathermap.org/img/wn/${itinerary.weather[index].icon}@2x.png`}
                          alt={itinerary.weather[index].description}
                          className="weather-icon"
                        />
                        <div className="weather-details">
                          <span className="temperature">{itinerary.weather[index].temperature}°C</span>
                          <span className="weather-desc">{itinerary.weather[index].description}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="activities">
                    {day.activities?.map((activity, actIndex) => (
                      <div key={actIndex} className="activity">
                        <div className="activity-time">{activity.time}</div>
                        <div className="activity-details">
                          <h3>{activity.name}</h3>
                          <p>{activity.description}</p>
                          {activity.cost && <span className="cost">💰 {activity.cost}</span>}
                          {activity.tips && (
                            <div className="tips">💡 {activity.tips}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="btn btn-primary" 
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? '⏳ Generating PDF...' : '📥 Download Itinerary'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ItineraryResults;
