import React from 'react';
import { useParams } from 'react-router-dom';
import { Check, Target, Clock } from 'lucide-react';

const PolicyDetail = () => {
  const { id } = useParams();

  // 這裡應該使用真實的數據獲取邏輯
  const policy = {
    id: 1,
    title: "綠色能源政策",
    description: "推動可再生能源發展，減少碳排放",
    image: "/images/green-energy.webp",
    content: "我們的綠色能源政策旨在加速台灣向可再生能源轉型，減少對化石燃料的依賴，從而降低碳排放，應對氣候變化。這項政策包括擴大太陽能和風能的應用，提高能源效率，以及鼓勵清潔能源技術的創新和應用。",
    objectives: [
      "到2030年，可再生能源占總發電量的30%",
      "減少碳排放，實現2050年碳中和目標",
      "創造綠色就業機會，促進經濟可持續發展"
    ],
    implementation: [
      "提供綠色能源補貼和稅收優惠",
      "投資可再生能源基礎設施建設",
      "支持綠色能源相關研究和技術創新",
      "推動能源效率標準和綠色建築規範"
    ],
    timeline: "2024-2030"
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="mb-12 relative overflow-hidden rounded-xl shadow-2xl">
        <img src={policy.image} alt={policy.title} className="w-full h-[50vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-5xl font-bold text-white mb-2">{policy.title}</h1>
          <p className="text-2xl text-gray-200">{policy.description}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">政策內容</h2>
        <p className="text-lg text-gray-600 leading-relaxed">{policy.content}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
            <Target className="text-light-blue mr-3" /> 政策目標
          </h2>
          <ul className="space-y-4">
            {policy.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <Check className="text-light-green mr-3 mt-1 flex-shrink-0" />
                <span className="text-lg text-gray-600">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
            <Clock className="text-light-blue mr-3" /> 實施時間
          </h2>
          <p className="text-2xl text-gray-600">{policy.timeline}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">實施計劃</h2>
        <ul className="space-y-4">
          {policy.implementation.map((step, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-light-blue flex items-center justify-center mr-4 mt-1">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <div className="flex-grow">
                <span className="text-lg text-gray-600">{step}</span>
                <div className="relative pt-2">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-light-blue">
                    <div style={{ width: `${(index + 1) * 25}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-light-purple"></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PolicyDetail;
