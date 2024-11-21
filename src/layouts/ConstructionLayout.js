import React from 'react';
import { Construction } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

const ConstructionLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Construction Banner */}
      <div className="bg-yellow-50 border-b border-yellow-100 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Construction className="text-yellow-500" size={24} />
            <p className="text-yellow-800">
              此區域正在建置中，我們正努力為您提供更好的服務體驗
            </p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
          >
            返回首頁
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default ConstructionLayout;