import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PolicyIssues = () => {
  const policyCategories = [
    {
      name: "環境永續",
      policies: [
        { id: 1, title: "綠色能源政策", description: "推動可再生能源發展，減少碳排放", image: "/images/green-energy.webp", color: "from-green-400 to-green-600" },
        { id: 2, title: "海洋保育計劃", description: "保護海洋生態，減少塑膠污染", image: "/images/ocean-conservation.webp", color: "from-blue-400 to-blue-600" }
      ]
    },
    {
      name: "科技創新",
      policies: [
        { id: 3, title: "數位轉型計劃", description: "協助傳統產業進行數位化轉型", image: "/images/digital-transformation.webp", color: "from-purple-400 to-purple-600" },
        { id: 4, title: "AI 發展策略", description: "推動 AI 技術研發和應用", image: "/images/ai-development.webp", color: "from-yellow-400 to-yellow-600" }
      ]
    },
    {
      name: "社會福利",
      policies: [
        { id: 5, title: "長照 2.0 plus", description: "完善老年人照護體系", image: "/images/elderly-care.webp", color: "from-red-400 to-red-600" },
        { id: 6, title: "青年住房方案", description: "協助青年解決居住問題", image: "/images/youth-housing.webp", color: "from-teal-400 to-teal-600" }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">政策議題</h1>
      
      {policyCategories.map((category) => (
        <div key={category.name} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.policies.map((policy) => (
              <div key={policy.id} className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${policy.color} opacity-80 transition-all duration-300 group-hover:opacity-90`} />
                <img src={policy.image} alt={policy.title} className="w-full h-80 object-cover transition-all duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold mb-2 text-white">{policy.title}</h3>
                  <p className="text-lg text-white mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">{policy.description}</p>
                  <Link to={`/policy-detail`} className="inline-flex items-center text-white hover:text-gray-200 transition duration-300 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                   {/*  <Link to={`/policy-detail/${policy.id}`} className="inline-flex items-center text-white hover:text-gray-200 transition duration-300 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
 */}
                    了解更多 <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PolicyIssues;
