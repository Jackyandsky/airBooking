import React, { useState } from 'react';
import { CreditCard, DollarSign, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>
);

const PaymentMethod = ({ icon: Icon, name, selected, onSelect, color }) => (
    <button
      className={`flex items-center p-3 rounded-lg border ${
        selected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } w-full mb-2`}
      onClick={onSelect}
    >
      <Icon className={`w-6 h-6 mr-3 ${color}`} />
      <span className="font-medium">{name}</span>
    </button>
  );
  
  export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const navigate = useNavigate();

  // 在实际应用中，这些数据应该从前面的页面或全局状态中获取
  const orderSummary = {
    serviceName: "Boeing 737 Training",
    date: "2024-09-15",
    time: "14:00",
    duration: "2 hours",
    price: 300,
    tax: 30,
    total: 330
  };

  const handlePayment = () => {
    // 在这里处理支付逻辑
    console.log('Processing payment with', paymentMethod);
    // 可能需要调用支付API或重定向到支付网关
    navigate('/booking-success');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">Payment</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Card className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
              <PaymentMethod 
                icon={CreditCard} 
                name="Credit Card" 
                selected={paymentMethod === 'credit_card'}
                onSelect={() => setPaymentMethod('credit_card')}
                color="text-blue-500"
              />
              <PaymentMethod 
                icon={CreditCard} 
                name="PayPal" 
                selected={paymentMethod === 'paypal'}
                onSelect={() => setPaymentMethod('paypal')}
                color="text-indigo-500"
              />
            </Card>

            {paymentMethod === 'credit_card' && (
              <Card>
                <h3 className="text-lg font-semibold mb-3">Credit Card Details</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input type="text" className="w-full p-2 border rounded" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="MM/YY" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="123" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input type="text" className="w-full p-2 border rounded" placeholder="John Doe" />
                </div>
              </Card>
            )}
          </div>

          <div className="flex-1">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="mb-4">
                <p className="font-medium">{orderSummary.serviceName}</p>
                <p className="text-sm text-gray-600">{orderSummary.date} at {orderSummary.time}</p>
                <p className="text-sm text-gray-600">Duration: {orderSummary.duration}</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Price:</span>
                  <span>${orderSummary.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax:</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <button 
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded hover:bg-blue-600 flex items-center justify-center"
            onClick={handlePayment}
          >
            <Lock className="w-5 h-5 mr-2" />
            Pay ${orderSummary.total.toFixed(2)}
          </button>
          <p className="text-center text-sm text-gray-600 mt-2">
            Your payment is secure and encrypted.
          </p>
        </div>
      </div>
    </main>
  );
}