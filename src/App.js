import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';  // 假设这是您的主页组件
import BookingDetailsPage from './BookingDetailsPage';
import PersonalInfoPage from './PersonalInfoPage';
import BookingConfirmationPage from './BookingConfirmationPage';
import PaymentPage from './PaymentPage';
import BookingSuccessPage from './BookingSuccessPage';
import MyBookingsPage from './MyBookingsPage';
import BookingDetails from './BookingDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingDetailsPage />} />
        <Route path="/personal-info" element={<PersonalInfoPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking-success" element={<BookingSuccessPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/booking/:id" element={<BookingDetails />} />
      </Routes>
    </Router>
  );
}

export default App;