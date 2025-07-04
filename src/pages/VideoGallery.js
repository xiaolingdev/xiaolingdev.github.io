import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Maximize2 } from 'lucide-react';

const VideoGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // 先測試基本的數據獲取
  useEffect(() => {
    console.log('開始獲取影片數據...');
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 測試 API 連接
        console.log('正在調用 API...');
        const response = await fetch('https://v2.ly.govapi.tw/ivods?委員名稱=翁曉玲');
        console.log('API 響應狀態:', response.status);
        
        if (!response.ok) {
          throw new Error(`API 錯誤: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('獲取到的數據:', data);
        
        // 檢查第一個影片的詳細結構
        if (data.ivods && data.ivods.length > 0) {
          console.log('第一個影片的詳細資料:', data.ivods[0]);
          console.log('影片URL:', data.ivods[0].video_url);
          console.log('所有可用的欄位:', Object.keys(data.ivods[0]));
        }
        
        setVideos(data.ivods || []);
        console.log('設置影片數量:', data.ivods?.length || 0);
        
      } catch (err) {
        console.error('獲取影片時發生錯誤:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log('數據獲取完成');
      }
    };

    fetchVideos();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '未知日期';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleVideoClick = (video) => {
    console.log('點擊影片:', video);
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // 簡化的影片顯示邏輯
  const displayVideos = () => {
    console.log('渲染影片，loading:', loading, 'error:', error, 'videos length:', videos.length);

    if (loading) {
      return Array(itemsPerPage).fill(0).map((_, index) => (
        <div key={`loading-${index}`} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="w-full h-48 bg-gray-300"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ));
    }

    if (error) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-red-500 mb-4">載入影片時發生錯誤：{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            重新載入
          </button>
        </div>
      );
    }

    if (!videos || videos.length === 0) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">目前沒有可用的影片</p>
        </div>
      );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageVideos = videos.slice(startIndex, endIndex);

    console.log('當前頁面影片:', pageVideos.length);

    return pageVideos.map((video, index) => (
      <div key={video.IVOD_ID || `video-${index}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative group">
          <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
            {video.video_url ? (
              <>
                {/* 嘗試顯示縮圖 */}
                {(video.thumbnail || video.poster || video.截圖 || video.圖片) ? (
                  <img 
                    src={video.thumbnail || video.poster || video.截圖 || video.圖片}
                    alt={video.會議名稱}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* 備用顯示 */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100" style={{display: (video.thumbnail || video.poster || video.截圖 || video.圖片) ? 'none' : 'flex'}}>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm">點擊播放影片</p>
                  </div>
                </div>
                
                {/* 播放按鈕覆蓋層 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center group-hover:bg-opacity-10">
                  <button
                    onClick={() => handleVideoClick(video)}
                    className="w-16 h-16 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all duration-200 transform hover:scale-110"
                    title="播放影片"
                  >
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <button
                  onClick={() => handleVideoClick(video)}
                  className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70"
                  title="放大觀看"
                >
                  <Maximize2 size={20} />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">無影片網址</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-indigo-600 transition duration-300">
            {video.會議名稱 || '未命名會議'}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(video.日期)}</span>
              </div>
              {video.委員發言時間 && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{video.委員發言時間}</span>
                </div>
              )}
            </div>
            
            {video.會議資料 && (
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <Tag size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p>第{video.會議資料.屆}屆第{video.會議資料.會期}會期</p>
                  <p className="truncate">{video.會議資料.標題}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  const totalPages = Math.ceil((videos?.length || 0) / itemsPerPage);

  const changePage = (direction) => {
    setCurrentPage(prev => {
      const newPage = prev + direction;
      if (newPage >= 1 && newPage <= totalPages) {
        return newPage;
      }
      return prev;
    });
  };

  console.log('組件渲染中，當前狀態:', { loading, error, videosCount: videos.length, currentPage, totalPages });

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">質詢影片集</h2>
          {!loading && !error && (
            <p className="text-gray-600">共 {videos.length} 部影片</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {displayVideos()}
        </div>

        {!loading && !error && videos.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4">
            <button 
              onClick={() => changePage(-1)} 
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-md transition duration-300 ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <ArrowLeft className="mr-2" size={16} /> 上一頁
            </button>
            
            <span className="text-gray-600">
              第 {currentPage} / {totalPages} 頁
            </span>
            
            <button 
              onClick={() => changePage(1)} 
              disabled={currentPage >= totalPages}
              className={`flex items-center px-4 py-2 rounded-md transition duration-300 ${
                currentPage >= totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              下一頁 <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        )}
      </div>
      
      {/* 改善的模態框 */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{selectedVideo.會議名稱}</h3>
                <p className="text-sm text-gray-600">{formatDate(selectedVideo.日期)}</p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {selectedVideo.video_url ? (
                <div className="relative bg-black rounded">
                  <video 
                    controls 
                    className="w-full max-h-96"
                    poster={selectedVideo.thumbnail || selectedVideo.poster || selectedVideo.截圖 || selectedVideo.圖片}
                    onError={(e) => {
                      console.error('影片播放錯誤:', e);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  >
                    <source src={selectedVideo.video_url} type="application/x-mpegURL" />
                    <source src={selectedVideo.video_url} type="video/mp4" />
                    您的瀏覽器不支援影片播放
                  </video>
                  
                  {/* 錯誤回退顯示 */}
                  <div className="hidden bg-gray-100 p-8 text-center rounded">
                    <p className="text-gray-600 mb-4">影片無法在此瀏覽器播放</p>
                    <a 
                      href={selectedVideo.video_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      在新頁面開啟影片
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">無可用的影片</p>
              )}
              
              {/* 影片資訊 */}
              <div className="mt-4 space-y-2">
                {selectedVideo.委員發言時間 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>發言時間：{selectedVideo.委員發言時間}</span>
                  </div>
                )}
                {selectedVideo.會議資料 && (
                  <div className="flex items-start text-sm text-gray-600">
                    <Tag size={16} className="mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p>第{selectedVideo.會議資料.屆}屆第{selectedVideo.會議資料.會期}會期</p>
                      <p>{selectedVideo.會議資料.標題}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;