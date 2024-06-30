import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookingCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    BookingId: '',
    UserId:'',
    AccommodationId:id,
    Firstname: '',
    Lastname: '',
    StartDate: '',
    EndDate: '',
    NumberOfGuests: 1,
    PricePerNight: '',
    TotalPrice: ''
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await axios.get(`http://localhost:5139/api/Accommodation/${id}`);
        setFormData(prevData => ({
          ...prevData,
          accommodationId: id,
          ...response.data,
        }));
      } catch (error) {
        console.error('Error fetching accommodation:', error);
      }
    };
  
    if (id) {
      fetchAccommodation();
    }
  }, [id]);

  

  const calculateTotalPrice = () => {
    const { startDate, endDate, pricePerNight } = formData;
    if (startDate && endDate && pricePerNight) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      const total = nights * parseFloat(pricePerNight);
      setFormData(prevData => ({ ...prevData, totalPrice: total.toFixed(2) }));
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.StartDate, formData.EndDate, formData.PricePerNight]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Firstname.trim() || !formData.Lastname.trim() || formData.NumberOfGuests < 1) {
      console.error("Validation failed: Required fields are missing or incorrect.");
      return; // Stop the form submission
  }
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const payload = {
        bookingDTO: formData
      };
      console.log("Payload being sent:", JSON.stringify(payload));
      const response = await axios.post(
        'http://localhost:5139/api/Accommodation/book',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Booking created:', response.data);
      navigate('/booking');
    } catch (error) {
      console.error('Error creating booking:', error.response?.data || error.message);
    }
  };
  

  return (
    <div className="edit-accommodation-form">
    <h2>Create Accommodation</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="userId">UserId:</label>
        <input
          type="text"
          name="UserId"
          value={formData.UserId}
          onChange={handleChange}
          required
        />
        
      </div>
      <div className="form-group">
        <label htmlFor="name">First Name:</label>
        <input
          type="text"
          name="Firstname"
          value={formData.Firstname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label  htmlFor="Lastname">Last Name:</label>
        <input
          type="text"
          name="Lastname"
          value={formData.Lastname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="availableFrom">Start Date:</label>
        <input
          type="date"
          name="StartDate"
          value={formData.StartDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="availableTo">End Date:</label>
        <input
          type="date"
          name="EndDate"
          value={formData.EndDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Number of Guests:</label>
        <input
          type="number"
          name="NumberOfGuests"
          value={formData.NumberOfGuests}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Price Per Night:</label>
        <input
          type="text"
          name="PricePerNight"
          value={formData.PricePerNight || ''} 
          readOnly
        />
      </div>
      <div className="form-group">
        <label>Total Price:</label>
        <input
          type="number"
          name="TotalPrice"
          value={formData.TotalPrice}
          readOnly
        />
      </div>
      <button type="submit"  className="btn">Confirm Booking</button>
    </form>
  </div>
  );
};

export default BookingCreate;
