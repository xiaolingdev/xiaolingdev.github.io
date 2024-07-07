import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const Activities = () => {
  const activityCategories = [
    {
      name: "政策說明會",
      activities: [
        { id: 1, title: "綠色能源政策說明會", date: "2024-07-15", location: "台北市政府大禮堂", image: "/images/green-energy-event.webp" },
        { id: 2, title: "數位轉型政策座談會", date: "2024-08-01", location: "台中科技園區", image: "/images/digital-transformation-event.webp" }
      ]
    },
    {
      name: "社區服務",
      activities: [
        { id: 3, title: "新北市淨灘活動", date: "2024-07-20", location: "新北市八里區海灘", image: "/images/beach-cleaning.webp" },
        { id: 4, title: "弱勢家庭課後輔導", date: "2024-07-25", location: "台北市文山區社區中心", image: "/images/tutoring.webp" }
      ]
    },
    {
      name: "青年論壇",
      activities: [
        { id: 5, title: "青年創業論壇", date: "2024-08-10", location: "台北 101 會議中心", image: "/images/youth-entrepreneurship.webp" },
        { id: 6, title: "大學生政策研討會", date: "2024-08-15", location: "國立台灣大學", image: "/images/student-policy-forum.webp" }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">活動資訊</h1>
      
      {activityCategories.map((category) => (
        <section key={category.name} className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">{category.name}</h2>
          <div className="space-y-12">
            {category.activities.map((activity, index) => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-light-blue to-light-purple text-white shadow-md">
                    <Calendar size={32} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-500">{activity.date}</p>
                </div>
                <div className="ml-8 flex-grow">
                  <div className={`h-full border-l-2 border-light-blue pl-8 ${index === category.activities.length - 1 ? '' : 'pb-12'}`}>
                    <h3 className="text-2xl font-semibold mb-3 text-gray-800">{activity.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="mr-2" size={16} />
                      <span>{activity.location}</span>
                    </div>
                    <Link to={`/activity-detail`} className="inline-flex items-center text-light-blue hover:text-light-purple transition-colors duration-300">
                      了解更多 <ArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Activities;
