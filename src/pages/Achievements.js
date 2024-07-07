import React from 'react';
import { Check } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      year: 2024,
      items: [
        "推動「綠色能源發展條例」修正案，促進再生能源發展",
        "主導「數位教育資源平等法」立法，縮小城鄉數位落差"
      ]
    },
    {
      year: 2023,
      items: [
        "成功協調增加偏遠地區教育經費，提升教育品質",
        "推動「空氣污染防制法」修正，加強工業區空污管控"
      ]
    },
    {
      year: 2022,
      items: [
        "發起「年輕人創業補助方案」，協助青年實現創業夢想",
        "推動「長期照護服務法」修正，完善老年人照護體系"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">翁曉玲立委政績清單</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        {achievements.map((yearAchievements, index) => (
          <div key={yearAchievements.year} className={`mb-8 ${index !== achievements.length - 1 ? 'border-b border-gray-200 pb-8' : ''}`}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{yearAchievements.year}年政績</h2>
            <div className="space-y-4">
              {yearAchievements.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-light-blue flex items-center justify-center mr-4 mt-1">
                    <Check className="text-white" size={20} />
                  </div>
                  <p className="text-lg text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-xl text-gray-600 mb-4">這只是翁曉玲立委眾多成就中的一小部分。</p>
        <p className="text-xl text-gray-600">她將繼續為台灣的未來貢獻自己的力量。</p>
      </div>
    </div>
  );
};

export default Achievements;