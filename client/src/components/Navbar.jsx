import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <img 
            src="/assets/Navbar-logo.png" 
            alt="RouteGenius Logo" 
            className="logo-img"
          />
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/plan" className="nav-link">Plan Trip</Link></li>
          <li><Link to="/explore" className="nav-link">Explore</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
