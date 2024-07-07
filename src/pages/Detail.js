import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Share2 } from 'lucide-react';

const ActivityDetail = () => {
  const { id } = useParams();

  // 這裡應該使用真實的數據獲取邏輯
  const activity = {
    id: 1,
    title: "綠色能源政策說明會",
    date: "2024-07-15",
    time: "14:00 - 16:00",
    location: "台北市政府大禮堂",
    image: "/images/green-energy.webp",
    description: "在這場說明會中，翁曉玲立委將詳細介紹我們的綠色能源政策，包括如何推動可再生能源發展，減少碳排放，以及這項政策對台灣未來發展的重要性。",
    agenda: [
      "14:00 - 14:10 開幕致詞",
      "14:10 - 15:00 政策介紹",
      "15:00 - 15:30 問答環節",
      "15:30 - 16:00 茶敘交流"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
        <img src={activity.image} alt={activity.title} className="w-full h-96 object-cover rounded-t-xl" />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{activity.title}</h1>
          <div className="flex items-center mb-4 text-gray-600">
            <Calendar className="mr-2" size={20} />
            <span>{activity.date}</span>
          </div>
          <div className="flex items-center mb-4 text-gray-600">
            <Clock className="mr-2" size={20} />
            <span>{activity.time}</span>
          </div>
          <div className="flex items-center mb-4 text-gray-600">
            <MapPin className="mr-2" size={20} />
            <span>{activity.location}</span>
          </div>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{activity.description}</p>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">議程</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-8">
            {activity.agenda.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-light-blue text-white rounded-lg shadow hover:bg-light-purple transition duration-300">
              <Users className="mr-2" size={20} />
              參加人數
            </button>
            <button className="flex items-center px-4 py-2 bg-light-blue text-white rounded-lg shadow hover:bg-light-purple transition duration-300">
              <Share2 className="mr-2" size={20} />
              分享
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
