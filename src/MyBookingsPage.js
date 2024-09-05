import React, { useState } from 'react';
import { Calendar, Clock, Plane, MapPin, DollarSign, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>{children}</div>
);

const BookingItem = ({ booking, onCancel }) => (
  <Card className="mb-4">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold">{booking.serviceName}</h3>
        <p className="text-gray-600">{booking.status}</p>
      </div>
      {booking.status === '即将到来' && (
        <button 
          onClick={() => onCancel(booking.id)} 
          className="text-red-500 hover:text-red-700"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-blue-500" />
        <span>{booking.date}</span>
      </div>
      <div className="flex items-center">
        <Clock className="w-5 h-5 mr-2 text-blue-500" />
        <span>{booking.time}</span>
      </div>
      <div className="flex items-center">
        <Plane className="w-5 h-5 mr-2 text-blue-500" />
        <span>{booking.aircraft}</span>
      </div>
      <div className="flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-blue-500" />
        <span>{booking.location}</span>
      </div>
    </div>
    <div className="mt-4 flex justify-between items-center">
      <div className="flex items-center">
        <DollarSign className="w-5 h-5 mr-2 text-green-500" />
        <span className="font-semibold">{booking.price}</span>
      </div>
      {booking.status === '即将到来' && (
        <Link 
          to={`/booking/${booking.id}`} 
          className="text-blue-500 hover:text-blue-700"
        >
          查看详情
        </Link>
      )}
    </div>
  </Card>
);

export default function MyBookingsPage() {
  // 这里应该从API或全局状态获取实际的预约数据
  const [bookings, setBookings] = useState([
    {
      id: 1,
      serviceName: "Boeing 737 Training",
      status: "即将到来",
      date: "2024-09-15",
      time: "14:00",
      aircraft: "Boeing 737",
      location: "New York Simulator Center",
      price: "$300"
    },
    {
      id: 2,
      serviceName: "Airbus A320 Basic",
      status: "已完成",
      date: "2024-08-20",
      time: "10:00",
      aircraft: "Airbus A320",
      location: "Los Angeles Flight Academy",
      price: "$250"
    },
    // 可以添加更多预约
  ]);

  const handleCancelBooking = (bookingId) => {
    // 这里应该调用API来取消预约
    console.log(`Cancelling booking ${bookingId}`);
    // 然后更新状态
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">我的预约</h1>
        
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <BookingItem 
              key={booking.id} 
              booking={booking} 
              onCancel={handleCancelBooking} 
            />
          ))
        ) : (
          <Card>
            <p className="text-center text-gray-600">您目前没有任何预约。</p>
            <Link 
              to="/book" 
              className="block text-center mt-4 text-blue-500 hover:text-blue-700"
            >
              立即预约
            </Link>
          </Card>
        )}

        <div className="mt-6 text-center">
          <Link 
            to="/book" 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            创建新预约
          </Link>
        </div>
      </div>
    </main>
  );
}