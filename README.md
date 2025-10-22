# RouteGenius - AI Travel Itinerary Planner

An intelligent travel planning application that generates personalized day-by-day itineraries using Google's Gemini AI. The system analyzes user preferences, budget constraints, travel dates, and group composition to create detailed travel plans with real-time weather forecasts.

## Features

### Core Functionality
- **AI-Powered Itinerary Generation**: Leverages Google Gemini 1.5 Flash model for intelligent travel planning
- **Weather Forecasting**: 5-day weather predictions for destinations using OpenWeatherMap API
- **Multi-Step Form**: Progressive data collection with optional fields for enhanced user experience
- **Chain of Thought Visualization**: Real-time display of AI reasoning process during itinerary generation
- **PDF Export**: Client-side PDF generation using html2pdf.js library
- **Graceful Fallback**: Continues operation even without database connectivity

### Technical Features
- RESTful API architecture with Express.js
- MongoDB database with Mongoose ODM for data persistence
- CORS-enabled cross-origin resource sharing
- Environment-based configuration management
- Error handling with fallback itinerary generation
- Responsive design for mobile and desktop devices

## Technology Stack

### Frontend Technologies
- **React 18.3.1** - UI component library
- **Vite 5.4.11** - Build tool and development server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API communication
- **html2pdf.js 0.10.2** - PDF generation library
- **CSS3** - Custom styling with responsive design

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js 4.21.1** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.8.3** - MongoDB object modeling
- **Google Generative AI SDK 0.21.0** - Gemini AI integration
- **Axios 1.7.7** - External API requests
- **dotenv 16.4.5** - Environment variable management
- **cors 2.8.5** - Cross-origin resource sharing

### External APIs
- **Google Gemini API** (gemini-1.5-flash model)
- **OpenWeatherMap API** (Forecast API v2.5)

## Project Structure

```
RouteGenius/
├── client/                           # Frontend application
│   ├── public/
│   │   └── assets/
│   │       └── Navbar-logo.png      # Application logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation component
│   │   │   └── Navbar.css           # Navigation styles
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── ItineraryBuilder.jsx # 3-step itinerary form
│   │   │   ├── ThinkingProcess.jsx  # AI processing animation
│   │   │   ├── ItineraryResults.jsx # Generated itinerary display
│   │   │   └── SuggestedTrips.jsx   # Pre-curated trip suggestions
│   │   ├── services/
│   │   │   └── api.js               # Axios API service layer
│   │   ├── App.jsx                  # Main application component
│   │   ├── App.css                  # Global application styles
│   │   ├── index.css                # Base CSS reset and variables
│   │   └── main.jsx                 # React DOM entry point
│   ├── .env                         # Client environment variables
│   ├── .env.example                 # Environment template
│   ├── vite.config.js               # Vite configuration
│   └── package.json                 # Frontend dependencies
│
└── server/                          # Backend application
    ├── src/
    │   ├── models/
    │   │   └── Itinerary.js         # MongoDB itinerary schema
    │   ├── controllers/
    │   │   └── itineraryController.js # Business logic for itinerary generation
    │   ├── routes/
    │   │   └── itinerary.js         # API route definitions
    │   ├── services/
    │   │   ├── geminiService.js     # Google Gemini AI integration
    │   │   └── weatherService.js    # OpenWeatherMap API integration
    │   ├── config/
    │   │   └── database.js          # MongoDB connection configuration
    │   └── server.js                # Express server entry point
    ├── .env                         # Server environment variables
    ├── .env.example                 # Environment template
    └── package.json                 # Backend dependencies
```

## System Architecture

### Data Models

#### Itinerary Model (MongoDB Schema)
```javascript
{
  destination: String,           // Travel destination city
  startDate: Date,               // Trip start date
  endDate: Date,                 // Trip end date
  budget: String,                // Budget level (budget/moderate/luxury)
  interests: [String],           // Array of user interests
  groupType: String,             // Solo/Couple/Family/Friends
  numberOfAdults: Number,        // Adult traveler count
  numberOfChildren: Number,      // Child traveler count
  specialRequirements: [String], // Accessibility/Senior-friendly needs
  dailyPlan: [{
    day: Number,
    date: String,
    activities: [String],
    estimatedCost: String
  }],
  weather: [{
    date: String,
    temperature: Number,
    description: String,
    icon: String
  }],
  tips: [String],               // Travel tips
  totalEstimatedCost: String,
  createdAt: Date
}
```

### API Endpoints

#### POST /api/itinerary/generate
Generates personalized travel itinerary with weather data.

**Request Body:**
```javascript
{
  destination: "Paris",
  startDate: "2024-06-01",
  endDate: "2024-06-07",
  budget: "moderate",
  interests: ["culture", "food", "history"],
  groupType: "couple",
  numberOfAdults: 2,
  numberOfChildren: 0,
  specialRequirements: []
}
```

**Response:**
```javascript
{
  success: true,
  data: {
    itinerary: { /* Itinerary object */ },
    weather: [ /* 5-day forecast array */ ]
  }
}
```

### Service Layer Architecture

#### geminiService.js
- **generateItinerary()**: Main function coordinating AI generation
- **buildPrompt()**: Constructs detailed prompt for Gemini AI
- **parseAIResponse()**: Parses and validates AI-generated content
- **generateFallbackItinerary()**: Creates default itinerary if AI fails

#### weatherService.js
- **getForecast()**: Fetches 5-day weather forecast from OpenWeatherMap
- **generateMockForecast()**: Provides realistic mock data if API unavailable

## Environment Configuration

### Client Environment Variables (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |
| `VITE_WEATHER_API_KEY` | OpenWeatherMap API key | No* |

*Weather API is optional; system uses mock data if unavailable

### Server Environment Variables (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/routegenius
GEMINI_API_KEY=your_gemini_api_key
WEATHER_API_KEY=your_openweathermap_api_key
CLIENT_URL=http://localhost:5173
```

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `NODE_ENV` | Environment mode (development/production) | Yes |
| `MONGODB_URI` | MongoDB connection string | No* |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `WEATHER_API_KEY` | OpenWeatherMap API key | No** |
| `CLIENT_URL` | Frontend URL for CORS configuration | Yes |

*MongoDB is optional; app continues without database persistence  
**Weather service uses mock data if API key not provided

## Installation and Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn package manager
- MongoDB (optional - local instance or MongoDB Atlas)
- Google Gemini API key (required)
- OpenWeatherMap API key (optional)

### Installation Steps

1. **Install Client Dependencies**
```bash
cd client
npm install
```

2. **Configure Client Environment**
```bash
cp .env.example .env
# Edit .env file with your configuration
```

3. **Install Server Dependencies**
```bash
cd ../server
npm install
```

4. **Configure Server Environment**
```bash
cp .env.example .env
# Edit .env file with your API keys and configuration
```

5. **Start Development Servers**

Backend (Terminal 1):
```bash
cd server
npm run dev
```

Frontend (Terminal 2):
```bash
cd client
npm run dev
```

### Obtaining API Keys

**Google Gemini API:**
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Sign in and create new API key
- Add to `server/.env` as `GEMINI_API_KEY`

**OpenWeatherMap API:**
- Visit [OpenWeatherMap](https://openweathermap.org/api)
- Create free account and generate API key
- Add to both `.env` files as `WEATHER_API_KEY` or `VITE_WEATHER_API_KEY`

## Application Workflow

### User Journey

1. **Landing Page (Home.jsx)**
   - Introduction to RouteGenius
   - Call-to-action to start planning
   - Navigation to suggested trips

2. **Itinerary Builder (ItineraryBuilder.jsx)**
   - **Step 1: Destination & Travel Dates**
     - Destination input
     - Start date and end date pickers
     - Budget selection (Budget/Moderate/Luxury)
   
   - **Step 2: Travel Interests**
     - Multi-select interest categories
     - Options: Adventure, Culture, Food, Nature, Shopping, Nightlife, History, Relaxation
   
   - **Step 3: Traveler Details** (Optional)
     - Group type selection
     - Adult and child count
     - Special requirements (Wheelchair Accessible, Senior Friendly, Pet Friendly)
     - Additional comments

3. **Thinking Process (ThinkingProcess.jsx)**
   - Animated AI reasoning visualization
   - Parallel API call execution
   - Progress indicators for each analysis step
   - Automatic navigation on completion

4. **Results Display (ItineraryResults.jsx)**
   - Day-by-day itinerary breakdown
   - Activity timings and descriptions
   - Weather forecast per day
   - Estimated costs
   - Travel tips
   - PDF download functionality

### AI Processing Flow

```
User Input → Form Validation → API Request
    ↓
geminiService.generateItinerary()
    ↓
buildPrompt() → Gemini API → parseAIResponse()
    ↓
weatherService.getForecast() → OpenWeatherMap API
    ↓
Merge Itinerary + Weather Data
    ↓
Save to MongoDB (optional) → Return to Client
```

## Design System

### Color Scheme
- **Primary**: `#1E90FF` (Dodger Blue)
- **Primary Hover**: `#0066CC`
- **Text Primary**: `#000000`
- **Text Secondary**: `#666666`
- **Background**: `#FFFFFF`
- **Border**: `#DDD`, `#E0E0E0`
- **Error**: `#FF4444`
- **Success**: `#4CAF50`

### Typography
- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
- **Heading Sizes**: 2.5rem (h1), 2rem (h2), 1.5rem (h3)
- **Body Text**: 1rem
- **Line Height**: 1.6

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Available Scripts

### Client Scripts
```bash
npm run dev          # Start Vite dev server (port 5173)
npm run build        # Build production bundle
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

### Server Scripts
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
```

## Error Handling

### Graceful Degradation
- **MongoDB Unavailable**: Application continues without persistence
- **Weather API Failure**: Returns mock weather data
- **Gemini API Failure**: Generates fallback itinerary with 4 activities per day
- **Network Errors**: User-friendly error messages with retry options

### Fallback Itinerary Structure
When Gemini API is unavailable:
- 4 activities per day
- Morning, afternoon, and evening slots
- Budget-appropriate cost estimates
- Generic travel tips

## CORS Configuration

Server allows requests from:
- `http://localhost:5173` (Vite dev server)
- Configured via `CLIENT_URL` environment variable
- Credentials enabled for cookie/session support

## Troubleshooting

### Common Issues

**Port Already in Use**
```powershell
# Windows PowerShell
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

**MongoDB Connection Failed**
- Verify MongoDB is running: `mongod --version`
- Check connection string format
- Application continues without database

**API Keys Not Working**
- Verify no extra spaces in `.env` files
- Restart server after environment changes
- Check API key validity on provider dashboards

**Build Errors**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall dependencies: `npm install`
- Check Node.js version: `node --version`

## Project Dependencies

### Client Dependencies
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.28.0
- axios: ^1.7.7
- html2pdf.js: ^0.10.2

### Server Dependencies
- express: ^4.21.1
- mongoose: ^8.8.3
- @google/generative-ai: ^0.21.0
- axios: ^1.7.7
- cors: ^2.8.5
- dotenv: ^16.4.5

### Development Dependencies
- nodemon: ^3.1.7
- @vitejs/plugin-react: ^4.3.3
- vite: ^5.4.11
