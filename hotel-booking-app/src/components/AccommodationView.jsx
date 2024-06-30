import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import room from '../assets//images/room.png';
import '../styles/Booking.css';

function AccommodationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await axios.get(`http://localhost:5139/api/Accommodation/${id}`);
        setAccommodation(response.data);
      } catch (error) {
        console.error('Error fetching accommodation:', error);
      }
    };
    fetchAccommodation();
  }, [id]);


 
  const handleBack = () => {
    navigate('/accommodation');
  };
  
  const handleBook = () => {
    navigate('/accommodation/book/');
  };

  return (
    <div className="card-product">
      <div className="card-product-infos">
        {accommodation ? (
          <div className="right-column"> 
            <img src={room} alt="Background" /> 
            <h1>{accommodation.name}</h1>
            <p><strong>Description:</strong> {accommodation.description}</p>
            <p><strong>Location:</strong> {accommodation.location}</p>
            <p><strong>Address:</strong> {accommodation.address}</p>
            <p><strong>City:</strong> {accommodation.city}</p>
            <p><strong>Price Per Night:</strong> ${accommodation.pricePerNight}</p>
            <p><strong>Available From:</strong> {accommodation.availableFrom}</p>
            <p><strong>Available To:</strong> {accommodation.availableTo}</p>
            <button onClick={handleBook} className="btn">Book</button>
            <button onClick={handleBack} className="btn">Back to Accommodations</button>
          </div>
        ) : (
          <p>Loading accommodation View...</p>
        )}
    </div>
  </div>
  );
}

export default AccommodationView;
