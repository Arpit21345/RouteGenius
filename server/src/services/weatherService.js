import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getForecast = async (city, days = 5, startDate = null) => {
  try {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'your_weather_api_key_here') {
      console.warn('Weather API key not configured');
      return generateMockForecast(days, startDate);
    }
    
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
        cnt: days * 8
      }
    });
    
    const dailyForecasts = [];
    const baseDate = startDate ? new Date(startDate) : new Date();
    
    for (let i = 0; i < days; i++) {
      const targetDate = new Date(baseDate);
      targetDate.setDate(targetDate.getDate() + i);
      const dateStr = targetDate.toISOString().split('T')[0];
      
      const dayData = response.data.list[i * 8] || response.data.list[0];
      dailyForecasts.push({
        date: dateStr,
        temperature: Math.round(dayData.main.temp),
        description: dayData.weather[0].description,
        icon: dayData.weather[0].icon
      });
    }
    
    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    return generateMockForecast(days, startDate);
  }
};


//  mock data in case any problem happens

const generateMockForecast = (days, startDate = null) => {
  const forecasts = [];
  const weatherConditions = [
    { desc: 'Clear sky', icon: '01d', temp: 28 },
    { desc: 'Few clouds', icon: '02d', temp: 26 },
    { desc: 'Scattered clouds', icon: '03d', temp: 24 },
    { desc: 'Partly cloudy', icon: '04d', temp: 23 },
    { desc: 'Light rain', icon: '10d', temp: 20 }
  ];
  
  const baseDate = startDate ? new Date(startDate) : new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    const weather = weatherConditions[i % weatherConditions.length];
    
    forecasts.push({
      date: date.toISOString().split('T')[0],
      temperature: weather.temp + Math.floor(Math.random() * 5),
      description: weather.desc,
      icon: weather.icon
    });
  }
  
  return forecasts;
};
