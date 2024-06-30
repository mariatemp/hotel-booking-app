import { Link } from "react-router-dom";
import '../styles/Home.css';
import island from '../assets/images/island.jpg'; // Update with your image path

function Home() {
  return (
    <div className="main-container">
     
      <div className="image-container">
        <img src={island} alt="Background" className="background-image"/>
        <div className="text-overlay">
          <h1>Welcome</h1>
          <p>Your journey starts here</p>
        </div>
           <div className="left-column">
            <Link to="/accommodation/" className='btn'>Accommodation</Link>
            <Link to="/booking/" className='btn'>Booking</Link>
          </div>
      </div>
    </div>
  );
}

export default Home;
