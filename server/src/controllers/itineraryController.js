import Itinerary from '../models/Itinerary.js';
import { generateItinerary } from '../services/geminiService.js';
import { getForecast } from '../services/weatherService.js';

export const createItinerary = async (req, res) => {
  try {
    const formData = req.body;
    
    if (!formData.destination || !formData.startDate || !formData.endDate) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide destination, start date, and end date'
      });
    }
    
    const aiGeneratedData = await generateItinerary(formData);
    
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    const weatherData = await getForecast(formData.destination, Math.min(days, 7), formData.startDate);
    
    const itinerary = new Itinerary({
      ...formData,
      ...aiGeneratedData,
      weather: weatherData
    });
    
    try {
      await itinerary.save();
    } catch (dbError) {
      console.warn('Could not save to database:', dbError.message);
    }
    
    const response = {
      id: itinerary._id || Date.now().toString(),
      ...aiGeneratedData,
      weather: weatherData
    };
    
    res.status(201).json(response);
    
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({
      error: 'Failed to generate itinerary',
      message: error.message
    });
  }
};

