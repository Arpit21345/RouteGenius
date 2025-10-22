import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuggestedTrips.css';

const SuggestedTrips = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const trips = [
    {
      id: 1,
      destination: 'Bali, Indonesia',
      image: '🏖️',
      highlights: ['Beautiful beaches', 'Temple visits', 'Rice terraces', 'Water sports'],
      bestTime: 'April - October',
      budget: 'Mid-Range',
      duration: 7,
      durationDisplay: '7 days',
      goodFor: ['couples', 'families']
    },
    {
      id: 2,
      destination: 'Dubai, UAE',
      image: '🏙️',
      highlights: ['Modern architecture', 'Desert safari', 'Shopping malls', 'Luxury dining'],
      bestTime: 'November - March',
      budget: 'Luxury',
      duration: 5,
      durationDisplay: '5 days',
      goodFor: ['families', 'couples']
    },
    {
      id: 3,
      destination: 'Paris, France',
      image: '🗼',
      highlights: ['Eiffel Tower', 'Museums', 'Cafes', 'Historic sites'],
      bestTime: 'April - June',
      budget: 'Mid-Range',
      duration: 6,
      durationDisplay: '6 days',
      goodFor: ['couples', 'solo']
    },
    {
      id: 4,
      destination: 'Tokyo, Japan',
      image: '🗾',
      highlights: ['Technology', 'Temples', 'Food culture', 'Cherry blossoms'],
      bestTime: 'March - May',
      budget: 'Mid-Range',
      duration: 7,
      durationDisplay: '7 days',
      goodFor: ['solo', 'friends']
    },
    {
      id: 5,
      destination: 'Santorini, Greece',
      image: '🏛️',
      highlights: ['White buildings', 'Sunsets', 'Beach relaxation', 'Wine tasting'],
      bestTime: 'April - November',
      budget: 'Luxury',
      duration: 5,
      durationDisplay: '5 days',
      goodFor: ['couples']
    },
    {
      id: 6,
      destination: 'Iceland',
      image: '🌋',
      highlights: ['Northern lights', 'Hot springs', 'Waterfalls', 'Glaciers'],
      bestTime: 'June - August',
      budget: 'Luxury',
      duration: 8,
      durationDisplay: '8 days',
      goodFor: ['solo', 'friends']
    },
    {
      id: 7,
      destination: 'Thailand',
      image: '🛕',
      highlights: ['Temples', 'Street food', 'Islands', 'Night markets'],
      bestTime: 'November - February',
      budget: 'Budget-Friendly',
      duration: 10,
      durationDisplay: '10 days',
      goodFor: ['solo', 'friends', 'families']
    },
    {
      id: 8,
      destination: 'Switzerland',
      image: '🏔️',
      highlights: ['Alps', 'Chocolate', 'Lakes', 'Scenic trains'],
      bestTime: 'June - September',
      budget: 'Luxury',
      duration: 7,
      durationDisplay: '7 days',
      goodFor: ['families', 'couples']
    }
  ];

  const filteredTrips = filter === 'all' 
    ? trips 
    : trips.filter(trip => trip.goodFor.includes(filter));

  const handlePlanTrip = (trip) => {
    navigate('/plan', { state: { preselected: trip } });
  };

  return (
    <main className="suggested-trips">
      <div className="container">
        <h1 className="text-center">Explore Popular Destinations</h1>
        <p className="subtitle text-center">Get inspired for your next adventure</p>

        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Trips
          </button>
          <button 
            className={`filter-btn ${filter === 'couples' ? 'active' : ''}`}
            onClick={() => setFilter('couples')}
          >
            For Couples
          </button>
          <button 
            className={`filter-btn ${filter === 'families' ? 'active' : ''}`}
            onClick={() => setFilter('families')}
          >
            For Families
          </button>
          <button 
            className={`filter-btn ${filter === 'solo' ? 'active' : ''}`}
            onClick={() => setFilter('solo')}
          >
            Solo Travel
          </button>
          <button 
            className={`filter-btn ${filter === 'friends' ? 'active' : ''}`}
            onClick={() => setFilter('friends')}
          >
            With Friends
          </button>
        </div>

        <div className="trips-grid">
          {filteredTrips.map(trip => (
            <div key={trip.id} className="trip-card">
              <div className="trip-icon">{trip.image}</div>
              <h3>{trip.destination}</h3>
              <div className="trip-info">
                <span className="duration">📅 {trip.durationDisplay}</span>
                <span className="budget">💰 {trip.budget}</span>
              </div>
              <ul className="highlights">
                {trip.highlights.map((highlight, index) => (
                  <li key={index}>✓ {highlight}</li>
                ))}
              </ul>
              <p className="best-time">🌤️ Best time: {trip.bestTime}</p>
              <button 
                onClick={() => handlePlanTrip(trip)}
                className="btn btn-primary"
              >
                Plan This Trip
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SuggestedTrips;
