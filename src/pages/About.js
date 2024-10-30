import React, { useState, useEffect } from 'react';
import { Award, Book, Building, Calendar, ChevronRight, Briefcase, Users } from 'lucide-react';

const AboutXiaoling = () => {
  const [legislatorData, setLegislatorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLegislatorData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://v2.ly.govapi.tw/legislator/11-翁曉玲');
        if (!response.ok) {
          throw new Error('Failed to fetch legislator data');
        }
        const data = await response.json();
        setLegislatorData(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching legislator data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLegislatorData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl">載入失敗</p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <section className="relative h-[60vh]">
        <img 
          src={legislatorData?.照片位址 || "/images/hero-image.webp"} 
          alt={`立法委員${legislatorData?.委員姓名}`} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end items-center text-white text-center p-8">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">{legislatorData?.委員姓名}</h1>
          <p className="text-2xl sm:text-3xl text-gray-200 mb-2">{legislatorData?.委員英文姓名}</p>
          <p className="text-xl text-gray-200">第{legislatorData?.屆}屆立法委員</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">個人簡介</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="text-indigo-600 flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-600">黨籍</p>
                  <p className="text-lg font-medium">{legislatorData?.黨籍}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="text-indigo-600 flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-600">選區</p>
                  <p className="text-lg font-medium">{legislatorData?.選區名稱}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="text-indigo-600 flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-600">到職日期</p>
                  <p className="text-lg font-medium">{legislatorData?.到職日}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 flex items-center">
                  <Book className="text-indigo-600 mr-2" size={24} />
                  現任委員會
                </h3>
                <ul className="space-y-2">
                  {legislatorData?.委員會.map((committee, index) => (
                    <li key={index} className="text-gray-600">{committee}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <Award className="text-indigo-600 mr-2" size={28} />
              學歷
            </h3>
            <ul className="space-y-3">
              {legislatorData?.學歷.map((edu, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="text-indigo-600 mt-1 mr-2 flex-shrink-0" size={20} />
                  <span className="text-gray-600">{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <Briefcase className="text-indigo-600 mr-2" size={28} />
              經歷
            </h3>
            <ul className="space-y-3">
              {legislatorData?.經歷.map((exp, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="text-indigo-600 mt-1 mr-2 flex-shrink-0" size={20} />
                  <span className="text-gray-600">{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">問政理念</h2>
          <ul className="space-y-4">
            {[
              '致力於提升法治品質，確保司法公平正義',
              '推動數位治理，建構智慧政府',
              '重視科技法制，平衡創新與監理',
              '加強社會溝通，促進多元對話'
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="text-indigo-600 mt-1 mr-2 flex-shrink-0" size={20} />
                <span className="text-lg text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutXiaoling;