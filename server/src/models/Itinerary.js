import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  budget: {
    type: String,
    enum: ['budget-friendly', 'mid-range', 'luxury'],
    required: true
  },
  
 
  interests: [{
    type: String
  }],
  
  
  groupType: {
    type: String,
    enum: ['solo', 'couple', 'family', 'friends', 'senior']
  },
  numberOfAdults: Number,
  numberOfChildren: Number,
  childrenAges: [Number],
  

  specialRequirements: [{
    type: String
  }],
  

  additionalComments: String,
  
 
  dailyPlan: [{
    day: Number,
    title: String,
    activities: [{
      time: String,
      name: String,
      description: String,
      cost: String,
      tips: String
    }]
  }],
  
  
  thinkingSteps: [String],
  
  
  weather: [{
    date: String,
    temperature: Number,
    description: String,
    icon: String
  }],
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Itinerary', itinerarySchema);
