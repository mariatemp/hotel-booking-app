import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Edit.css'

function AccommodationEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await axios.get(`http://localhost:5139/api/Accommodation/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching accommodation:', error);
      }
    };
    fetchAccommodation();
  }, [id]);

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
      await axios.post(`http://localhost:5139/api/Accommodation/edit/${id}`, formData);
      navigate('/accommodation');
    } catch (error) {
      console.error('Error updating accommodation:', error);
    }
  };

  const handleBack = () => {
    navigate('/accommodation');
  };


  return (
    <div className="edit-accommodation-form">
    <h1>Edit Accommodation</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="Enter accommodation name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          className="form-control"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          className="form-control"
          placeholder="Enter location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          className="form-control"
          placeholder="Enter city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="pricePerNight">Price Per Night:</label>
        <input
          type="number"
          id="pricePerNight"
          name="pricePerNight"
          className="form-control"
          placeholder="Enter price per night"
          value={formData.pricePerNight}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="availableFrom">Available From:</label>
        <input
          type="date"
          id="availableFrom"
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
          id="availableTo"
          name="availableTo"
          className="form-control"
          value={formData.availableTo}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          className="form-control"
          placeholder="Enter user ID"
          value={formData.userId}
          onChange={handleChange}
          required
        />
      </div>
      </form>
        <button type="submit" className="btn" >Save Changes</button>
        <button type="button" onClick={handleBack} className="btn">Back to Accommodations</button>
    </div>
  );
}

export default AccommodationEdit;
