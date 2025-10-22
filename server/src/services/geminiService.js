import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateItinerary = async (formData) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    const prompt = buildPrompt(formData, days);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const itineraryData = parseAIResponse(text);
    
    if (!itineraryData || !itineraryData.dailyPlan) {
      console.log('AI response parsing failed, using fallback');
      return generateFallbackItinerary(formData);
    }
    
    return {
      destination: formData.destination,
      days,
      groupType: formData.groupType,
      ...itineraryData
    };
    
  } catch (error) {
    console.error('Error generating itinerary:', error.message);
    return generateFallbackItinerary(formData);
  }
};

const buildPrompt = (data, days) => {
  return `Create a detailed ${days}-day travel itinerary for ${data.destination}.

TRAVELER PROFILE:
- Group Type: ${data.groupType || 'General'}
- Number of People: ${data.numberOfAdults || 1} adults${data.numberOfChildren ? `, ${data.numberOfChildren} children` : ''}
${data.childrenAges?.length ? `- Children Ages: ${data.childrenAges.join(', ')} years` : ''}
- Budget: ${data.budget}
- Interests: ${data.interests?.join(', ') || 'General sightseeing'}

${data.specialRequirements?.length ? `SPECIAL REQUIREMENTS:\n- ${data.specialRequirements.join('\n- ')}` : ''}

${data.additionalComments ? `ADDITIONAL NOTES:\n${data.additionalComments}` : ''}

IMPORTANT CONSIDERATIONS:
${data.groupType === 'family' ? '- Include kid-friendly activities with rest breaks\n' : ''}
${data.specialRequirements?.includes('Wheelchair Accessible') ? '- All locations must be wheelchair accessible\n' : ''}
${data.specialRequirements?.includes('Senior-Friendly') ? '- Minimize walking, include comfortable seating\n' : ''}

Please provide a day-by-day itinerary in the following JSON format:
{
  "dailyPlan": [
    {
      "day": 1,
      "title": "Day title",
      "activities": [
        {
          "time": "9:00 AM",
          "name": "Activity name",
          "description": "Activity description",
          "cost": "Estimated cost",
          "tips": "Helpful tips"
        }
      ]
    }
  ],
  "thinkingSteps": [
    "Step-by-step reasoning of how you created this itinerary"
  ]
}

Make it detailed, practical, and tailored to the traveler's needs.`;
};

const parseAIResponse = (text) => {
  try {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonText = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonText);
    }
    
    // If no JSON found, return fallback
    throw new Error('No JSON found in response');
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return null;
  }
};


//  mock data in case any problem happens
const generateFallbackItinerary = (formData) => {
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  const budgetCosts = {
    'budget-friendly': { meal: '$10-20', activity: '$15-30' },
    'mid-range': { meal: '$25-50', activity: '$40-80' },
    'luxury': { meal: '$60-150', activity: '$100+' }
  };
  
  const costs = budgetCosts[formData.budget] || budgetCosts['mid-range'];
  
  return {
    destination: formData.destination,
    days,
    groupType: formData.groupType,
    dailyPlan: Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1} in ${formData.destination}`,
      activities: [
        {
          time: '9:00 AM',
          name: 'Morning Exploration',
          description: `Start your day exploring the highlights of ${formData.destination}`,
          cost: costs.activity,
          tips: 'Arrive early to avoid crowds'
        },
        {
          time: '12:30 PM',
          name: 'Lunch',
          description: 'Try local cuisine at recommended restaurants',
          cost: costs.meal,
          tips: 'Ask locals for their favorite spots'
        },
        {
          time: '2:30 PM',
          name: 'Afternoon Activities',
          description: 'Continue exploring popular attractions and landmarks',
          cost: costs.activity,
          tips: 'Stay hydrated and take breaks as needed'
        },
        {
          time: '7:00 PM',
          name: 'Dinner & Evening',
          description: 'Enjoy dinner and evening activities',
          cost: costs.meal,
          tips: 'Book reservations in advance for popular spots'
        }
      ]
    })),
    thinkingSteps: [
      'Analyzed destination and preferences',
      'Planned activities based on budget',
      'Added practical tips'
    ]
  };
};
