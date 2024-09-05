import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Plane, MapPin, DollarSign, User, Mail, Phone, AlertCircle } from 'lucide-react';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>{children}</div>
);

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center mb-4">
    <Icon className="w-5 h-5 mr-3 text-blue-500" />
    <span className="font-medium mr-2">{label}:</span>
    <span>{value}</span>
  </div>
);

export default function BookingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // 在实际应用中，你应该根据 id 从 API 获取预约详情
  const bookingDetails = {
    id: id,
    serviceName: "Boeing 737 Training",
    date: "September 15, 2024",
    time: "2:00 PM",
    duration: "2 hours",
    aircraft: "Boeing 737",
    location: "New York Simulator Center",
    price: "$300",
    status: "已确认",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+1 (555) 123-4567"
  };

  const handleCancelBooking = () => {
    // 在实际应用中，这里应该调用 API 来取消预约
    console.log(`Cancelling booking ${id}`);
    // 模拟 API 调用
    setTimeout(() => {
      alert("预约已成功取消");
      navigate('/my-bookings');
    }, 1000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">预约详情</h1>
        
        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">预约信息</h2>
          <InfoRow icon={Plane} label="服务" value={bookingDetails.serviceName} />
          <InfoRow icon={Calendar} label="日期" value={bookingDetails.date} />
          <InfoRow icon={Clock} label="时间" value={`${bookingDetails.time} (${bookingDetails.duration})`} />
          <InfoRow icon={Plane} label="飞机型号" value={bookingDetails.aircraft} />
          <InfoRow icon={MapPin} label="地点" value={bookingDetails.location} />
          <InfoRow icon={DollarSign} label="价格" value={bookingDetails.price} />
          <InfoRow icon={AlertCircle} label="状态" value={bookingDetails.status} />
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">客户信息</h2>
          <InfoRow icon={User} label="姓名" value={bookingDetails.customerName} />
          <InfoRow icon={Mail} label="电子邮箱" value={bookingDetails.customerEmail} />
          <InfoRow icon={Phone} label="电话" value={bookingDetails.customerPhone} />
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">取消政策</h2>
          <p className="text-gray-600">
            如果您需要取消预约，请至少提前 48 小时通知我们。在此期限内取消的预约将获得全额退款。
            距离预约时间不足 48 小时取消的，将收取 50% 的取消费用。
          </p>
        </Card>

        {!showCancelConfirm ? (
          <button 
            onClick={() => setShowCancelConfirm(true)} 
            className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded hover:bg-red-600"
          >
            取消预约
          </button>
        ) : (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="font-bold">您确定要取消这个预约吗？</p>
            <p className="mb-4">取消后可能会按照取消政策收取费用。</p>
            <div className="flex justify-between">
              <button 
                onClick={handleCancelBooking} 
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
              >
                确认取消
              </button>
              <button 
                onClick={() => setShowCancelConfirm(false)} 
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
              >
                保留预约
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}