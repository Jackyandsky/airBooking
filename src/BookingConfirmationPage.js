import React from 'react';
import { MapPin, Calendar, Clock, DollarSign, User, Mail, Phone, Home, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>
);

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center mb-2">
    <Icon className="w-5 h-5 mr-2 text-gray-500" />
    <span className="font-medium mr-2">{label}:</span>
    <span>{value}</span>
  </div>
);

export default function BookingConfirmationPage() {
  // 在实际应用中，这些数据应该通过props或全局状态管理（如Redux）传入
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    navigate('/payment');
  };
  const bookingInfo = {
    provider: "FlightSim Co.",
    address: "123 Airport Rd, New York, NY 10001",
    aircraft: "Boeing 737",
    date: "2024-09-15",
    time: "14:00",
    duration: "2 hours",
    timezone: "EST",
    amount: "$300"
  };

  const userInfo = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "456 Main St",
    city: "New York",
    postcode: "10001",
    remark: "First time flying a 737 simulator!"
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Booking Confirmation</h1>
        
        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
          <InfoRow icon={MapPin} label="Provider" value={bookingInfo.provider} />
          <InfoRow icon={MapPin} label="Address" value={bookingInfo.address} />
          <InfoRow icon={Plane} label="Aircraft" value={bookingInfo.aircraft} />
          <InfoRow icon={Calendar} label="Date" value={bookingInfo.date} />
          <InfoRow icon={Clock} label="Time" value={`${bookingInfo.time} (${bookingInfo.timezone})`} />
          <InfoRow icon={Clock} label="Duration" value={bookingInfo.duration} />
          <InfoRow icon={DollarSign} label="Amount" value={bookingInfo.amount} />
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <InfoRow icon={User} label="Name" value={`${userInfo.firstName} ${userInfo.lastName}`} />
          <InfoRow icon={Mail} label="Email" value={userInfo.email} />
          <InfoRow icon={Phone} label="Phone" value={userInfo.phone} />
          <InfoRow icon={Home} label="Address" value={`${userInfo.address}, ${userInfo.city}, ${userInfo.postcode}`} />
          {userInfo.remark && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Remarks:</h3>
              <p className="bg-gray-100 p-3 rounded">{userInfo.remark}</p>
            </div>
          )}
        </Card>

        <div className="flex justify-between">
          <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700">
            Edit Booking
          </button>
          <button onClick={handleSubmit} className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
            Confirm and Pay
          </button>
        </div>
      </div>
    </main>
  );
}