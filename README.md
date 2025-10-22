# 🧭 RouteGenius - AI Travel Planner

> Smart Travel Planning with AI - Create personalized itineraries in minutes

RouteGenius is an AI-powered travel planning application that helps users generate personalized travel itineraries based on their preferences, budget, and travel style. Built with the MERN stack and Google's Gemini AI.

## ✨ Features

### 🎯 Core Features
- **AI-Powered Itinerary Generation**: Get detailed day-by-day travel plans using Google Gemini AI
- **Multi-Step Form with Skip Options**: Collect detailed preferences without forcing users to fill everything
- **Chain of Thought Visualization**: See the AI's thinking process as it creates your itinerary
- **Suggested Trips**: Pre-curated destinations with filtering options
- **Weather Integration**: Real-time weather data using OpenWeatherMap API

### 🎨 User Experience
- **Clean Black, White & Blue Design**: Professional interface that doesn't look AI-generated
- **Family-Friendly Options**: Special considerations for families, seniors, and accessibility needs
- **Mobile Responsive**: Works seamlessly on all devices
- **Fast & Intuitive**: Simple navigation with clear visual feedback

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with custom design system

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Google Gemini AI** for itinerary generation
- **OpenWeatherMap API** for weather data

## 📁 Project Structure

```
RouteGenius/
├── client/                    # Frontend React application
│   ├── public/
│   │   └── assets/
│   │       └── Navbar-LOGO.png
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── ItineraryBuilder.jsx
│   │   │   ├── ThinkingProcess.jsx
│   │   │   ├── ItineraryResults.jsx
│   │   │   └── SuggestedTrips.jsx
│   │   ├── services/         # API service functions
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env                  # Environment variables
│   └── package.json
│
└── server/                   # Backend Node.js application
    ├── src/
    │   ├── models/          # MongoDB models
    │   │   └── Itinerary.js
    │   ├── controllers/     # Route controllers
    │   │   └── itineraryController.js
    │   ├── routes/          # API routes
    │   │   ├── itinerary.js
    │   │   └── trips.js
    │   ├── services/        # Business logic
    │   │   ├── geminiService.js
    │   │   └── weatherService.js
    │   ├── config/          # Configuration files
    │   └── server.js        # Entry point
    ├── .env                 # Environment variables
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Gemini API key
- OpenWeatherMap API key (optional)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd RouteGenius
```

### 2. Setup Client (Frontend)

```bash
cd client
npm install
```

Create `.env` file in `client/` folder:
```env
VITE_API_URL=http://localhost:5000
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
```

### 3. Setup Server (Backend)

```bash
cd ../server
npm install
```

Create `.env` file in `server/` folder:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/routegenius
GEMINI_API_KEY=your_gemini_api_key_here
WEATHER_API_KEY=your_openweathermap_api_key_here
CLIENT_URL=http://localhost:3000
```

### 4. Run the Application

**Start the backend server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:3000`

## 🔑 Getting API Keys

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy and paste into `server/.env` as `GEMINI_API_KEY`

### OpenWeatherMap API (Optional)
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "API Keys" section
4. Copy your API key
5. Paste into both `.env` files

**Note**: The app works without weather API using mock data for testing.

## 📝 Environment Variables Reference

### Client (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |
| `VITE_WEATHER_API_KEY` | OpenWeatherMap API key | `your_key_here` |

### Server (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/routegenius` |
| `GEMINI_API_KEY` | Google Gemini API key | `your_key_here` |
| `WEATHER_API_KEY` | OpenWeatherMap API key | `your_key_here` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🎯 Features Walkthrough

### 1. Itinerary Builder (3-Step Form)
**Step 1: Where & When**
- Destination
- Start & End dates
- Budget level

**Step 2: Your Interests**
- Adventure & Sports
- Culture & History
- Food & Dining
- Nature & Wildlife
- And more...

**Step 3: Travel Details (Optional)**
- Group type (Solo, Couple, Family, etc.)
- Number of travelers
- Special requirements (Accessibility, Senior-friendly, etc.)
- Additional comments

### 2. Chain of Thought (AI Thinking Process)
Watch the AI analyze your preferences step-by-step:
- Analyzing destination
- Understanding preferences
- Planning for group type
- Considering budget
- Creating itinerary

### 3. Generated Itinerary
- Day-wise breakdown
- Timed activities
- Cost estimates
- Helpful tips
- Weather information

### 4. Suggested Trips
- 8 pre-curated destinations
- Filter by traveler type
- Quick overview of highlights
- One-click trip planning

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1E90FF` - Main actions and highlights
- **Dark Blue**: `#0066CC` - Hover states
- **Black**: `#000000` - Text and borders
- **White**: `#FFFFFF` - Backgrounds
- **Gray Shades**: For secondary text and UI elements

### Typography
- **Font Family**: Inter, system fonts
- Clean, readable hierarchy
- Consistent spacing

## 📦 Scripts

### Client
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Server
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
```

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `client`
4. Add environment variables
5. Deploy

### Backend (Render)
1. Create new Web Service
2. Connect GitHub repository
3. Set root directory to `server`
4. Add environment variables
5. Deploy

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running locally
- Or use MongoDB Atlas connection string
- App will continue without DB (itineraries won't be saved)

### API Key Issues
- Double-check API keys are correctly copied
- Ensure no extra spaces in `.env` files
- Restart servers after changing `.env`

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```
