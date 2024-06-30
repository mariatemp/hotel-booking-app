import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AccommodationCreate.css';

function AccommodationCreate() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    address: '',
    city: '',
    pricePerNight: '',
    availableFrom: '',
    availableTo: '',
    userId: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.post(
        'http://localhost:5139/api/Accommodation/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Accommodation created:', response.data);

      // Navigate to Accommodation page
      navigate('/accommodation');
    } catch (error) {
      console.error('Error creating accommodation:', error);
    }
  };

  return (
    <div className="edit-accommodation-form">
    <h2>Create Accommodation</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Name"
         className="form-control"
        value={formData.name}
        onChange={handleChange}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="form-control"
        value={formData.description}
        onChange={handleChange}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        name="location"
        placeholder="Location"
         className="form-control"
        value={formData.location}
        onChange={handleChange}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        name="address"
        placeholder="Address"
          className="form-control"
        value={formData.address}
        onChange={handleChange}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="city">City:</label>
      <input
        type="text"
        name="city"
        placeholder="City"
        className="form-control"
        value={formData.city}
        onChange={handleChange}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="pricePerNight">Price Per Night:</label>
      <input
        type="number"
        name="pricePerNight"
        placeholder="Price Per Night"
        className="form-control"
        value={formData.pricePerNight}
        onChange={handleChange}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="availableFrom">Available From:</label>
      <input
        type="date"
        name="availableFrom"
         className="form-control"
        value={formData.availableFrom}
        onChange={handleChange}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="availableTo">Available To:</label>
      <input
        type="date"
        name="availableTo"
          className="form-control"
        value={formData.availableTo}
        onChange={handleChange}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="userId">User Id:</label>
       <input
        type="string"
        name="userId"
         className="form-control"
        value={formData.userId}
        onChange={handleChange}
        required
      />
      </div>
    </form>
      <button type="submit" className="btn">Create Accommodation</button>
    </div>
  );
}

export default AccommodationCreate;
