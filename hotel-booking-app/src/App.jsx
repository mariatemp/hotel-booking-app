import React from 'react'
import Accommodation from './components/Accommodation'
import AccommodationCreate from './components/AccommodationCreate'
import AccommodationEdit from './components/AccommodationEdit'
import AccommodationView from './components/AccommodationView'
import Booking from './components/Bookings'
import BookingCreate from './components/BookingCreate'
import {Route, BrowserRouter, Routes} from  'react-router-dom'
import Home from './components/Home'
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Accommodation/" element={<Accommodation/>}/>
        <Route path="/Accommodation/create" element={<AccommodationCreate/>}/>
        <Route path="/Accommodation/edit/:id" element={<AccommodationEdit/>}/>
        <Route path="/Accommodation/:id" element={<AccommodationView/>}/>
        <Route path="/Accommodation/book/" element={<BookingCreate />}/>
        <Route path="/Booking/" element={<Booking/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
