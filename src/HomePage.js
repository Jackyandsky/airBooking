import React, { useState, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ${className}`}
  >
    {children}
  </button>
);

const aircraftTypes = [
  { id: 'boeing737', name: 'Boeing 737', icon: '✈️' },
  { id: 'airbus320', name: 'Airbus A320', icon: '🛩️' },
  { id: 'cessna172', name: 'Cessna 172', icon: '🛩️' },
  { id: 'embraer175', name: 'Embraer 175', icon: '✈️' },
  { id: 'bombardiercrj', name: 'Bombardier CRJ', icon: '✈️' },
  { id: 'airbusa330', name: 'Airbus A330', icon: '✈️' },
  { id: 'boeing787', name: 'Boeing 787', icon: '✈️' },
  { id: 'airbusa350', name: 'Airbus A350', icon: '✈️' },
];

const locations = [
  { 
    id: 1, 
    name: "New York Flight Center", 
    lat: 40.7128, 
    lng: -74.0060,
    aircraftTypes: ['boeing737', 'airbus320', 'embraer175'],
    description: "State-of-the-art flight simulation center in the heart of New York City.",
    operatingHours: "Mon-Fri: 8AM-10PM, Sat-Sun: 9AM-8PM"
  },
  { 
    id: 2, 
    name: "LA Pilot Training Hub", 
    lat: 34.0522, 
    lng: -118.2437,
    aircraftTypes: ['airbus320', 'cessna172', 'bombardiercrj'],
    description: "Comprehensive pilot training facility with a focus on commercial and private aviation.",
    operatingHours: "Mon-Sun: 7AM-11PM"
  },
  { 
    id: 3, 
    name: "Chicago Simulation Institute", 
    lat: 41.8781, 
    lng: -87.6298,
    aircraftTypes: ['boeing737', 'cessna172', 'airbusa330', 'boeing787'],
    description: "Advanced simulation technology for both professional pilots and enthusiasts.",
    operatingHours: "Mon-Fri: 6AM-9PM, Sat: 8AM-6PM, Sun: Closed"
  },
];

export default function HomePage() {
  const [selectedAircraftTypes, setSelectedAircraftTypes] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredLocations(
      locations.filter(location => 
        selectedAircraftTypes.length === 0 || 
        selectedAircraftTypes.some(type => location.aircraftTypes.includes(type))
      )
    );
  }, [selectedAircraftTypes]);

  const handleAircraftTypeToggle = (aircraftId) => {
    setSelectedAircraftTypes(prev => 
      prev.includes(aircraftId)
        ? prev.filter(id => id !== aircraftId)
        : [...prev, aircraftId]
    );
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleClosePopup = () => {
    setSelectedLocation(null);
  };

  const handleBooking = () => {
    console.log("Proceeding to booking for:", selectedLocation);
    // Here you would typically navigate to the booking page
    navigate('/booking', { state: { selectedLocation } });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Flight Simulator Booking</h1>
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Aircraft Type(s)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {aircraftTypes.map(aircraft => (
              <button
                key={aircraft.id}
                onClick={() => handleAircraftTypeToggle(aircraft.id)}
                className={`p-2 rounded flex flex-col items-center justify-center text-center ${
                  selectedAircraftTypes.includes(aircraft.id)
                    ? 'bg-blue-100 border-blue-500 border-2'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl mb-1">{aircraft.icon}</span>
                <span className="text-xs">{aircraft.name}</span>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4">Available Locations</h2>
          <div className="bg-gray-200 h-64 relative rounded overflow-hidden mb-4">
            <img src="/api/placeholder/400/300" alt="Map placeholder" className="w-full h-full object-cover" />
            {filteredLocations.map(location => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                style={{
                  left: `${(location.lng + 180) / 3.6}%`,
                  top: `${(90 - location.lat) / 1.8}%`
                }}
              >
                <MapPin size={24} />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} available.
            Click on a pin to view details.
          </p>
        </Card>
      </div>
      
      {selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md relative">
            <button onClick={handleClosePopup} className="absolute top-2 right-2">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedLocation.name}</h2>
            <p className="mb-2 text-sm">{selectedLocation.description}</p>
            <p className="mb-4 text-sm"><strong>Operating Hours:</strong> {selectedLocation.operatingHours}</p>
            <div className="mb-4">
              <strong>Available Aircraft:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedLocation.aircraftTypes.map(type => (
                  <span key={type} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {aircraftTypes.find(a => a.id === type).name}
                  </span>
                ))}
              </div>
            </div>
            <Button onClick={handleBooking} className="w-full">
              Book at {selectedLocation.name}
            </Button>
          </Card>
        </div>
      )}
    </main>
  );
}