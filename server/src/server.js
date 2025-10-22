import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import itineraryRoutes from './routes/itinerary.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/itinerary', itineraryRoutes);



// Database 
connectDB();

// server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
