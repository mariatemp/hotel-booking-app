import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import room from '../assets//images/room.png';
import '../styles/Booking.css';

function Bookings() {
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5139/api/Booking`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const handleBack = () => {
    navigate('/accommodation');
  };

  return (
<div className="card-product">
   
   <div className="card-product-infos">
     <h1>Bookings</h1>
        {Array.isArray(booking) && booking.length > 0 && booking.map((item) => (
          <div key={item.Id} className="accommodation-card">
            <img src={room} alt="Background" />
            <div className="right-column"> 
              <h2>{item.name}</h2>
              <p><strong>First Name:</strong> {item.firstname}</p>
              <p><strong>Last Name:</strong> {item.lastname}</p>
              <p><strong>Start Date:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(item.endDate).toLocaleDateString()}</p>
              <p><strong>Number of Guests:</strong> {item.numberOfGuests}</p>
              <p><strong>Price:</strong> {item.pricePerNight}</p>
              <p><strong>Total Price:</strong> {item.totalPrice}</p>
            </div>
          </div>
      ))}
    </div>
    <div className="button-container">
      <button onClick={handleBack}>Back to Accommodations</button>
    </div>
  </div>
  
  );
}

export default Bookings;
