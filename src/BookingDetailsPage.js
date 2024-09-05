import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Card 和 Button 组件定义保持不变
const Card = ({ children, className }) => (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>
  );
  
  const Button = ({ children, onClick, className, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
// 模拟的后端数据
const availableSlots = {
    '2024-09-10': {
      'boeing737': ['09:00', '11:00', '13:00', '15:00'],
      'airbus320': ['10:00', '12:00', '14:00', '16:00'],
      'cessna172': ['08:30', '10:30', '12:30', '14:30', '16:30'],
    },
    '2024-09-11': {
      'boeing737': ['09:30', '11:30', '13:30', '15:30'],
      'cessna172': ['09:00', '11:00', '13:00', '15:00', '17:00'],
      'boeing787': ['10:00', '13:00', '16:00'],
    },
    '2024-09-12': {
      'airbus320': ['09:00', '11:00', '13:00', '15:00', '17:00'],
      'embraer175': ['10:00', '12:00', '14:00', '16:00'],
      'boeing747': ['11:00', '14:00', '17:00'],
    },
    '2024-09-13': {
      'boeing737': ['08:00', '10:00', '12:00', '14:00', '16:00'],
      'airbus320': ['09:30', '11:30', '13:30', '15:30'],
      'cessna172': ['08:30', '10:30', '12:30', '14:30', '16:30'],
      'boeing787': ['09:00', '12:00', '15:00', '18:00'],
    },
    '2024-09-14': {
      'embraer175': ['09:00', '11:00', '13:00', '15:00'],
      'boeing747': ['10:00', '13:00', '16:00'],
      'airbus330': ['08:30', '11:30', '14:30', '17:30'],
    },
  };
  
  const services = [
    { id: 'boeing737', name: 'Boeing 737 Training', aircraft: 'Boeing 737', icon: '✈️', duration: '2 hours', price: '$300' },
    { id: 'airbus320', name: 'Airbus A320 Basics', aircraft: 'Airbus A320', icon: '🛫', duration: '1.5 hours', price: '$250' },
    { id: 'cessna172', name: 'Cessna 172 Intro', aircraft: 'Cessna 172', icon: '🛩️', duration: '1 hour', price: '$150' },
    { id: 'boeing787', name: 'Boeing 787 Advanced', aircraft: 'Boeing 787', icon: '🛬', duration: '3 hours', price: '$450' },
    { id: 'embraer175', name: 'Embraer 175 Regional', aircraft: 'Embraer 175', icon: '🛩️', duration: '2 hours', price: '$280' },
    { id: 'boeing747', name: 'Boeing 747 Jumbo', aircraft: 'Boeing 747', icon: '✈️', duration: '4 hours', price: '$600' },
    { id: 'airbus330', name: 'Airbus A330 Long-haul', aircraft: 'Airbus A330', icon: '🛫', duration: '3.5 hours', price: '$500' },
  ];

const Calendar = ({ availableDates, selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isDateAvailable = (date) => {
    return availableDates.includes(date.toISOString().split('T')[0]);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map(day => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1);
          const dateString = date.toISOString().split('T')[0];
          const isAvailable = isDateAvailable(date);
          const isSelected = selectedDate === dateString;
          return (
            <button
              key={index}
              onClick={() => isAvailable && onSelectDate(dateString)}
              className={`p-2 rounded ${
                isAvailable
                  ? isSelected
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-blue-100'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              disabled={!isAvailable}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function BookingDetailsPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableServices, setAvailableServices] = useState(services);
  const [selectedService, setSelectedService] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if (selectedDate) {
      const servicesForDate = availableSlots[selectedDate];
      if (servicesForDate) {
        const availableServiceIds = Object.keys(servicesForDate);
        setAvailableServices(services.filter(service => availableServiceIds.includes(service.id)));
      } else {
        setAvailableServices([]);
      }
      setSelectedService(null);
      setAvailableTimes([]);
      setSelectedTime('');
    } else {
      setAvailableServices(services);
      setAvailableTimes([]);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && selectedService) {
      const timesForService = availableSlots[selectedDate][selectedService.id];
      setAvailableTimes(timesForService || []);
      setSelectedTime('');
    }
  }, [selectedDate, selectedService]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleServiceSelect = (service) => {
    if (selectedDate) {
      setSelectedService(service);
    }
  };

  const handleTimeSelect = (time) => {
    if (selectedDate && selectedService) {
      setSelectedTime(time);
    }
  };

  const handleBooking = () => {
    console.log("Booking confirmed:", { selectedDate, selectedService, selectedTime });
    // Here you would typically send this data to your backend
    navigate('/personal-info');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Book Your Flight Simulator Session</h1>
        
        <Card className="mb-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <CalendarIcon className="mr-2" size={20} /> Select Date
          </h2>
          <Calendar 
            availableDates={Object.keys(availableSlots)}
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
          />
        </Card>

        <Card className={`mb-4 ${!selectedDate ? 'opacity-50' : ''}`}>
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Plane className="mr-2" size={20} /> Select Service
          </h2>
          <div className="max-h-[240px] overflow-y-auto space-y-2">
            {availableServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                disabled={!selectedDate}
                className={`w-full p-2 rounded text-left flex items-start ${
                  selectedService && selectedService.id === service.id
                    ? 'bg-blue-100 border-blue-500 border-2'
                    : 'bg-gray-50 hover:bg-gray-100'
                } ${!selectedDate ? 'cursor-not-allowed' : ''}`}
              >
                <span className="text-2xl mr-3">{service.icon}</span>
                <div>
                  <div className="font-semibold">{service.name}</div>
                  <div className="text-sm text-gray-600">
                    Aircraft: {service.aircraft} | Duration: {service.duration} | Price: {service.price}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className={`mb-4 ${!selectedService ? 'opacity-50' : ''}`}>
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Clock className="mr-2" size={20} /> Select Time
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                disabled={!selectedService}
                className={`p-2 rounded ${
                  selectedTime === time
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                } ${!selectedService ? 'cursor-not-allowed' : ''}`}
              >
                {time}
              </button>
            ))}
          </div>
        </Card>

        <Button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedService || !selectedTime}
          className="w-full"
        >
          Confirm Booking
        </Button>
      </div>
    </main>
  );
}