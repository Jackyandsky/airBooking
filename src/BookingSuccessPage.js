import React from 'react';
import { Check, Mail, Calendar, Clock, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>{children}</div>
);

const InfoRow = ({ icon: Icon, children }) => (
  <div className="flex items-center mb-2">
    <Icon className="w-5 h-5 mr-2 text-green-500" />
    <span>{children}</span>
  </div>
);

export default function BookingSuccessPage() {
  // 这些数据应该从你的应用状态或通过props传入
  const bookingDetails = {
    serviceName: "Boeing 737 Training",
    date: "September 15, 2024",
    time: "2:00 PM",
    duration: "2 hours",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-2xl">
        <Card className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">预约成功!</h1>
          <p className="text-xl text-gray-600 mb-4">您的预约已经成功预定了.</p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">预约详情</h2>
          <InfoRow icon={Plane}>{bookingDetails.serviceName}</InfoRow>
          <InfoRow icon={Calendar}>{bookingDetails.date}</InfoRow>
          <InfoRow icon={Clock}>{bookingDetails.time} ({bookingDetails.duration})</InfoRow>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">下一步</h2>
          <p className="mb-2">
            <Mail className="inline w-5 h-5 mr-2 text-blue-500" />
            预约详细信息的邮件已经寄到您的电子信箱.
          </p>
          <p className="text-sm text-gray-600">
              如果几分钟内没有收到邮件，请检查您的垃圾邮件文件夹。
            </p>
        </Card>

        <div className="flex justify-between">
          <Link 
            to="/my-bookings" 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            查看我的预约
          </Link>
          <Link 
            to="/" 
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
          >
            返回主页
          </Link>
        </div>
      </div>
    </main>
  );
}