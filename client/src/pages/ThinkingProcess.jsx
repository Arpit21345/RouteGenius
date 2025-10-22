import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ThinkingProcess.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const THINKING_STEPS = [
  '🤔 Analyzing your destination...',
  '🎯 Understanding your preferences...',
  '👥 Planning for your group...',
  '💰 Considering your budget...',
  '♿ Checking accessibility options...',
  '📅 Creating day-wise itinerary...',
  '✨ Adding special touches...'
];

const ThinkingProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const formData = location.state?.formData;
    
    if (!formData) {
      navigate('/plan');
      return;
    }

    let stepInterval;
    let timeoutId;
    
    const generateItinerary = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/itinerary/generate`, formData);
        
        if (stepInterval) clearInterval(stepInterval);
        if (timeoutId) clearTimeout(timeoutId);
        
        setCurrentStep(THINKING_STEPS.length - 1);
        setProgress(100);
        
        setTimeout(() => {
          navigate(`/itinerary/${response.data.id}`, { state: { itinerary: response.data } });
        }, 500);
        
      } catch (error) {
        console.error('Error generating itinerary:', error);
        
        if (stepInterval) clearInterval(stepInterval);
        if (timeoutId) clearTimeout(timeoutId);
        
        alert('Failed to generate itinerary. Please try again.');
        navigate('/plan');
      }
    };

    stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev < THINKING_STEPS.length - 1 ? prev + 1 : prev;
        setProgress((next / THINKING_STEPS.length) * 100);
        return next;
      });
    }, 1200);

    generateItinerary();

    return () => {
      if (stepInterval) clearInterval(stepInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [location.state?.formData, navigate]);

  return (
    <main className="thinking-process">
      <div className="container">
        <div className="thinking-container">
          <h1>Creating Your Perfect Itinerary</h1>
          <p className="subtitle">Our AI is working its magic...</p>

          <div className="thinking-steps">
            {THINKING_STEPS.map((step, index) => (
              <div 
                key={index}
                className={`thinking-step ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              >
                {index < currentStep ? '✓' : index === currentStep ? '⏳' : '○'} {step}
              </div>
            ))}
          </div>

          <div className="progress-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{Math.round(progress)}% Complete</p>
          
          {currentStep >= THINKING_STEPS.length - 1 && (
            <p className="status-text">✨ Finalizing your itinerary...</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ThinkingProcess;
