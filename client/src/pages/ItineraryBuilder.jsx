import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ItineraryBuilder.css';

const ItineraryBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 'mid-range',
    interests: [],
    groupType: 'solo',
    numberOfAdults: 1,
    numberOfChildren: 0,
    specialRequirements: [],
    additionalComments: '',
  });

 
  useEffect(() => {
    if (location.state?.preselected) {
      const trip = location.state.preselected;
      
      // Map budget from trip format to form format
      const budgetMap = {
        'Budget-Friendly': 'budget-friendly',
        'Mid-Range': 'mid-range',
        'Luxury': 'luxury'
      };
      
      setFormData(prev => ({
        ...prev,
        destination: trip.destination || '',
        budget: budgetMap[trip.budget] || 'mid-range',
        // Set default dates (today + duration)
        startDate: getDefaultStartDate(),
        endDate: getDefaultEndDate(trip.duration),
      }));
    }
  }, [location.state]);

  const getDefaultStartDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7); // 7 days from now
    return today.toISOString().split('T')[0];
  };

  const getDefaultEndDate = (duration) => {
    // Ensure duration is a valid number
    const days = parseInt(duration) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7); // Start from 7 days ahead
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days); // Add duration
    return endDate.toISOString().split('T')[0];
  };

  const interestsOptions = [
    'Adventure & Sports',
    'Culture & History',
    'Food & Dining',
    'Nature & Wildlife',
    'Shopping',
    'Nightlife',
    'Relaxation & Spa',
    'Photography'
  ];

  const specialRequirementsOptions = [
    'Wheelchair Accessible',
    'Senior-Friendly',
    'Kid-Friendly Activities',
    'Dietary Restrictions'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async () => {
    // Navigate to thinking process page with form data
    navigate('/thinking', { state: { formData } });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const skipOptional = () => setStep(3);

  return (
    <main className="itinerary-builder">
      <div className="container">
        <h1 className="text-center">Plan Your Perfect Trip</h1>
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Basics</div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Interests</div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Details</div>
        </div>

        <div className="form-container">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="form-step">
              <h2>Where & When</h2>
              {location.state?.preselected && (
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'rgba(30, 144, 255, 0.1)',
                  borderLeft: '4px solid var(--primary-blue)',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}>
                  <p style={{ margin: 0, color: 'var(--dark-blue)', fontWeight: 600 }}>
                    ✨ Trip pre-selected! Review and adjust the details below.
                  </p>
                </div>
              )}
              
              <div className="form-group">
                <label>Destination *</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Mumbai, Paris, Tokyo"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Budget *</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option value="budget-friendly">Budget-Friendly</option>
                  <option value="mid-range">Mid-Range</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              <button onClick={nextStep} className="btn btn-primary">
                Next →
              </button>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="form-step">
              <h2>Your Interests</h2>
              <p className="step-description">Select all that apply</p>

              <div className="checkbox-grid">
                {interestsOptions.map(interest => (
                  <label key={interest} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleCheckboxChange('interests', interest)}
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>

              <div className="button-group">
                <button onClick={prevStep} className="btn btn-secondary">
                  ← Back
                </button>
                <button onClick={nextStep} className="btn btn-primary">
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Traveler Details (Optional) */}
          {step === 3 && (
            <div className="form-step">
              <h2>Travel Details <span className="optional">(Optional)</span></h2>
              <button onClick={skipOptional} className="skip-btn">
                Skip All →
              </button>

              <div className="form-group">
                <label>Group Type</label>
                <select
                  name="groupType"
                  value={formData.groupType}
                  onChange={handleInputChange}
                >
                  <option value="solo">Solo Traveler</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family with Kids</option>
                  <option value="friends">Friends Group</option>
                  <option value="senior">Senior Citizens</option>
                </select>
              </div>

              {formData.groupType === 'family' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Number of Adults</label>
                    <input
                      type="number"
                      name="numberOfAdults"
                      value={formData.numberOfAdults}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Number of Children</label>
                    <input
                      type="number"
                      name="numberOfChildren"
                      value={formData.numberOfChildren}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Special Requirements</label>
                <div className="checkbox-grid">
                  {specialRequirementsOptions.map(req => (
                    <label key={req} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.specialRequirements.includes(req)}
                        onChange={() => handleCheckboxChange('specialRequirements', req)}
                      />
                      <span>{req}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Additional Comments (max 150 words)</label>
                <textarea
                  name="additionalComments"
                  value={formData.additionalComments}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your preferences... e.g., 'We love street food', 'Avoid crowds', 'Need nap times for toddler'"
                  rows="4"
                  maxLength="750"
                />
              </div>

              <div className="button-group">
                <button onClick={prevStep} className="btn btn-secondary">
                  ← Back
                </button>
                <button onClick={handleSubmit} className="btn btn-primary">
                  🎯 Generate My Itinerary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ItineraryBuilder;
