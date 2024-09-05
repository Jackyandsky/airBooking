import React, { useState } from 'react';
import { User, Mail, Phone, Home, MapPin, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>
);

const Input = ({ icon: Icon, label, type, placeholder, value, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default function PersonalInfoPage() {
  const [formData, setFormData] = useState({
    firstName: 'Ryan',
    lastName: 'Wong',
    email: 'jackyandsky@gmail.com',
    phone: '6048619267',
    address: '1188 Pinetree Way',
    city: 'Coquitlam',
    zipCode: 'v3b 0k9',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send this data to your backend
    navigate('/booking-confirmation');
  };

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Personal Information</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Required Information</h2>
            <Input
              icon={User}
              label="First Name"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
              name="firstName"
            />
            <Input
              icon={User}
              label="Last Name"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
              name="lastName"
            />
            <Input
              icon={Mail}
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              name="email"
            />
            <Input
              icon={Phone}
              label="Phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              required
              name="phone"
            />
          </Card>

          <Card className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Optional Information</h2>
            <Input
              icon={Home}
              label="Address"
              type="text"
              placeholder="123 Main St"
              value={formData.address}
              onChange={handleChange}
              name="address"
            />
            <Input
              icon={MapPin}
              label="City"
              type="text"
              placeholder="New York"
              value={formData.city}
              onChange={handleChange}
              name="city"
            />
            <Input
              icon={MapPin}
              label="Zip Code"
              type="text"
              placeholder="10001"
              value={formData.zipCode}
              onChange={handleChange}
              name="zipCode"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Any additional information..."
                ></textarea>
              </div>
            </div>
          </Card>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}