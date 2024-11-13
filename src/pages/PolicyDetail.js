// PolicyDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Target, Clock } from 'lucide-react';

const DEFAULT_IMAGE = '/api/placeholder/800/400';

const PolicyDetail = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/policies/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch policy details');
        }
        const result = await response.json();
        console.log('API Response:', result);
        setPolicy(result.data);
        setImageError(false);
      } catch (err) {
        console.error('Error fetching policy:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPolicy();
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!policy) {
    return <div className="text-center">政策不存在</div>;
  }

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  // 確保 objectives 是一個數組形式
  const objectivesArray = policy.objectives ? 
    (Array.isArray(policy.objectives) ? policy.objectives : [policy.objectives]) : 
    [];

  // 確保 implementations 是一個數組形式
  const implementationsArray = policy.implementations ? 
    (Array.isArray(policy.implementations) ? policy.implementations : [policy.implementations]) : 
    [];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="mb-12 relative overflow-hidden rounded-xl shadow-2xl">
        <img 
          src={imageError ? DEFAULT_IMAGE : (policy.image_url || DEFAULT_IMAGE)}
          alt={policy.title} 
          className="w-full h-[50vh] object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-5xl font-bold text-white mb-2">{policy.title}</h1>
          <p className="text-2xl text-gray-200">{policy.description || '無描述'}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">政策內容</h2>
        <p className="text-lg text-gray-600 leading-relaxed">{policy.content || '暫無內容'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
            <Target className="text-blue-500 mr-3" /> 政策目標
          </h2>
          {objectivesArray.length > 0 ? (
            <ul className="space-y-4">
              {objectivesArray.map((obj, index) => (
                <li key={obj.id || index} className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-600">
                    {obj.objective}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">暫無政策目標</p>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
            <Clock className="text-blue-500 mr-3" /> 實施進度
          </h2>
          {implementationsArray.length > 0 ? (
            <div className="space-y-6">
              {implementationsArray.map((impl, index) => (
                <div key={impl.id || index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-600">{impl.step}</span>
                    <span className="text-lg font-semibold text-blue-500">
                      {impl.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${impl.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">暫無實施進度</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyDetail;