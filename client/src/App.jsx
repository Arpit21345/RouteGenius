import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItineraryBuilder from './pages/ItineraryBuilder';
import ThinkingProcess from './pages/ThinkingProcess';
import ItineraryResults from './pages/ItineraryResults';
import SuggestedTrips from './pages/SuggestedTrips';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<ItineraryBuilder />} />
          <Route path="/thinking" element={<ThinkingProcess />} />
          <Route path="/itinerary/:id" element={<ItineraryResults />} />
          <Route path="/explore" element={<SuggestedTrips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;