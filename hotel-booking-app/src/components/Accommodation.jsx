import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Accommodation.css';
import room from '../assets/images/room.png';


function Accommodation() {

  const navigate = useNavigate();  
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await axios.get('http://localhost:5139/api/Accommodation/');
        console.log(response.data);
        setAccommodations(response.data);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };
    fetchAccommodation();
  }, []);

  const handleCreate = () => {
    navigate('/accommodation/create');
  };
  
 
  const handleEdit = (id) => {
    navigate(`/Accommodation/edit/${id}`);
  };

  const handleDelete = (id) => {
    axios.post(`http://localhost:5139/api/Accommodation/delete/${id}`)
      .then((response) => {
        console.log('Accommodation deleted:', response);
        const updatedAccommodations = accommodations.filter((item) => item.accommodationId !== id);
        setAccommodations(updatedAccommodations);
      })
      .catch((error) => {
        console.error('Error deleting accommodation:', error);
      });
  }

  return (
    <div className="card-product">
    <div className="card-product-infos">
      <h1>Accommodations</h1>
      <button onClick={handleCreate} className="accommodation-button">Create New Accommodation</button>
      {Array.isArray(accommodations) &&
        accommodations.map((item) => (
          <div key={item.accommodationId} className="accommodation-card">
           <img src={room} alt="Background" />
            <div className="right-column"> 
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.location}</p>
              <p>Price per night: {item.pricePerNight}</p>
              <p>Available from: {item.availableFrom}</p>
              <p>Available to: {item.availableTo}</p>
              <p>User ID: {item.userId}</p>
              <div className="button-container">
                <button onClick={() => handleEdit(item.accommodationId)}>Edit</button>
                <button onClick={() => handleDelete(item.accommodationId)}>Delete</button>
                <button onClick={() => navigate(`/Accommodation/${item.accommodationId}`)}>View</button>{/*must check this line*/}
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
  

  );
}

export default Accommodation;
