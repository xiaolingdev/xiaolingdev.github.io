// PolicyIssues.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PolicyIssues = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/policies');
        if (!response.ok) {
          throw new Error('Failed to fetch policies');
        }
        const result = await response.json();
        
        console.log('API Response:', result);
        
        // 如果是單一政策，將其轉換為數組
        const policiesData = result.data;
        const policiesArray = Array.isArray(policiesData) ? policiesData : [policiesData];
        
        // 將政策按類別分組
        const groupedPolicies = [];
        policiesArray.forEach(policy => {
          if (!policy || !policy.category_id) return;
          
          let category = groupedPolicies.find(cat => cat.id === policy.category_id);
          if (category) {
            category.policies.push(policy);
          } else {
            groupedPolicies.push({
              id: policy.category_id,
              name: getCategoryName(policy.category_id),
              policies: [policy]
            });
          }
        });
        
        setPolicies(groupedPolicies);
      } catch (err) {
        console.error('Error fetching policies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const getCategoryName = (categoryId) => {
    const categories = {
      1: "環境永續",
      2: "科技創新",
      3: "社會福利"
    };
    return categories[categoryId] || "其他";
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!policies.length) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">政策議題</h1>
        <div className="text-center text-gray-600">目前沒有政策資料</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">政策議題</h1>
      
      {policies.map((category) => (
        <div key={category.id} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.policies.map((policy) => (
              <div key={policy.id} className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-80 transition-all duration-300 group-hover:opacity-90" />
                {/* 使用 API 提供的圖片 URL */}
                <img 
                  src={policy.image_url || '/placeholder-image.jpg'} 
                  alt={policy.title} 
                  className="w-full h-80 object-cover transition-all duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold mb-2 text-white">{policy.title}</h3>
                  <p className="text-lg text-white mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {policy.description}
                  </p>
                  <Link 
                    to={`/policy-detail/${policy.id}`} 
                    className="inline-flex items-center text-white hover:text-gray-200 transition duration-300 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                  >
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