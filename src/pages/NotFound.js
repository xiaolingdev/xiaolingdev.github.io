import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 404 主視覺 */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="text-[160px] font-bold text-gray-200 leading-none">
              404
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                找不到頁面
              </h1>
              <p className="text-gray-600">
                很抱歉，您要找的頁面似乎不存在
              </p>
            </div>
          </div>
        </div>

        {/* 建議連結 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            您可以試試：
          </h2>
          <div className="grid gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <div className="bg-blue-100 p-2 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">返回上一頁</div>
                <div className="text-sm text-gray-600">回到您之前瀏覽的頁面</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <div className="bg-green-100 p-2 rounded-lg">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">回到首頁</div>
                <div className="text-sm text-gray-600">瀏覽我們的主要內容</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/keyissue')}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <div className="bg-purple-100 p-2 rounded-lg">
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">重要議題</div>
                <div className="text-sm text-gray-600">探索熱門政策議題</div>
              </div>
            </button>
          </div>
        </div>

        {/* 底部資訊 */}
        <div className="text-center text-gray-600 space-y-2">
          <p>
            如果您認為這是個錯誤，請
            <button 
              onClick={() => navigate('/contact')}
              className="text-blue-600 hover:underline mx-1"
            >
              聯絡我們
            </button>
          </p>
          <p className="text-sm">
            錯誤代碼：404 Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;