import React from 'react';
import { Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <Construction size={64} className="text-yellow-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">網站施工中</h1>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        此頁面正在建置中，我們正努力為您提供更好的服務體驗。
      </p>
      <button 
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        返回首頁
      </button>
    </div>
  );
};

export default UnderConstruction;