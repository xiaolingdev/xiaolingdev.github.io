import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Video, Search, Filter, X, Play } from 'lucide-react';

const VideoGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const videoRefs = useRef([]);
  const modalVideoRef = useRef(null);
  const itemsPerPage = 6;

  // 搜尋和篩選狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [sessionFilter, setSessionFilter] = useState('');
  const [termFilter, setTermFilter] = useState('');

  // 手機版影片播放Modal狀態
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // 檢測是否為手機設備
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://v2.ly.govapi.tw/ivods?委員名稱=翁曉玲');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data.ivods || []);
        setFilteredVideos(data.ivods || []);
        setTotalItems(data.total || 0);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // 搜尋和篩選邏輯
  useEffect(() => {
    let filtered = [...videos];

    // 搜尋功能
    if (searchTerm.trim()) {
      filtered = filtered.filter(video => 
        video.會議名稱?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.會議資料?.標題?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 日期篩選
    if (dateFilter.start) {
      filtered = filtered.filter(video => 
        new Date(video.日期) >= new Date(dateFilter.start)
      );
    }
    if (dateFilter.end) {
      filtered = filtered.filter(video => 
        new Date(video.日期) <= new Date(dateFilter.end)
      );
    }

    // 屆期篩選
    if (termFilter) {
      filtered = filtered.filter(video => 
        video.會議資料?.屆?.toString() === termFilter
      );
    }

    // 會期篩選
    if (sessionFilter) {
      filtered = filtered.filter(video => 
        video.會議資料?.會期?.toString() === sessionFilter
      );
    }

    setFilteredVideos(filtered);
    setCurrentPage(1); // 重置到第一頁
  }, [searchTerm, dateFilter, termFilter, sessionFilter, videos]);

  // 修復播放器初始化邏輯 (僅電腦版)
  useEffect(() => {
    if (isMobile) return; // 手機版不初始化嵌入式播放器
    
    // 安全清理現有播放器
    videoRefs.current.forEach(ref => {
      if (ref && ref.player && typeof ref.player.dispose === 'function') {
        try {
          // 檢查播放器是否還有效
          if (!ref.player.isDisposed()) {
            ref.player.dispose();
          }
        } catch (error) {
          console.warn('Error disposing player:', error);
        }
        ref.player = null;
      }
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentVideos = filteredVideos.slice(startIndex, endIndex);

    // 使用 setTimeout 確保 DOM 已更新
    const timeoutId = setTimeout(() => {
      currentVideos.forEach((_, index) => {
        const videoElement = videoRefs.current[index];
        if (videoElement && !videoElement.player) {
          try {
            const player = videojs(videoElement, {
              controls: true,
              autoplay: false,
              preload: 'metadata',
              fluid: true,
              playbackRates: [0.5, 1, 1.5, 2],
              controlBar: {
                children: [
                  'playToggle',
                  'volumePanel',
                  'currentTimeDisplay',
                  'timeDivider',
                  'durationDisplay',
                  'progressControl',
                  'playbackRateMenuButton',
                  'fullscreenToggle',
                ],
              },
            });

            videoElement.player = player;
          } catch (error) {
            console.warn('Error initializing player:', error);
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      videoRefs.current.forEach(ref => {
        if (ref && ref.player && typeof ref.player.dispose === 'function') {
          try {
            if (!ref.player.isDisposed()) {
              ref.player.dispose();
            }
          } catch (error) {
            console.warn('Error disposing player in cleanup:', error);
          }
          ref.player = null;
        }
      });
    };
  }, [filteredVideos, currentPage, isMobile]);

  // Modal播放器初始化
  useEffect(() => {
    if (showVideoModal && selectedVideo && modalVideoRef.current && !modalVideoRef.current.player) {
      try {
        const player = videojs(modalVideoRef.current, {
          controls: true,
          autoplay: true,
          preload: 'auto',
          fluid: true,
          responsive: true,
          playbackRates: [0.5, 1, 1.5, 2],
          controlBar: {
            children: [
              'playToggle',
              'volumePanel',
              'currentTimeDisplay',
              'timeDivider',
              'durationDisplay',
              'progressControl',
              'playbackRateMenuButton',
              'fullscreenToggle',
            ],
          },
        });

        modalVideoRef.current.player = player;
      } catch (error) {
        console.warn('Error initializing modal player:', error);
      }
    }

    return () => {
      if (modalVideoRef.current && modalVideoRef.current.player) {
        try {
          if (!modalVideoRef.current.player.isDisposed()) {
            modalVideoRef.current.player.dispose();
          }
        } catch (error) {
          console.warn('Error disposing modal player:', error);
        }
        modalVideoRef.current.player = null;
      }
    };
  }, [showVideoModal, selectedVideo]);

  // 組件卸載時清理所有播放器
  useEffect(() => {
    return () => {
      videoRefs.current.forEach(ref => {
        if (ref && ref.player && typeof ref.player.dispose === 'function') {
          try {
            if (!ref.player.isDisposed()) {
              ref.player.dispose();
            }
          } catch (error) {
            console.warn('Error disposing player on unmount:', error);
          }
        }
      });
      videoRefs.current = [];
      
      if (modalVideoRef.current && modalVideoRef.current.player) {
        try {
          if (!modalVideoRef.current.player.isDisposed()) {
            modalVideoRef.current.player.dispose();
          }
        } catch (error) {
          console.warn('Error disposing modal player on unmount:', error);
        }
      }
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 處理影片點擊
  const handleVideoClick = (video) => {
    if (isMobile) {
      setSelectedVideo(video);
      setShowVideoModal(true);
    }
  };

  // 關閉Modal
  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  // 清除所有篩選
  const clearAllFilters = () => {
    setSearchTerm('');
    setDateFilter({ start: '', end: '' });
    setTermFilter('');
    setSessionFilter('');
  };

  // 獲取可用的屆期選項
  const getAvailableTerms = () => {
    const terms = [...new Set(videos.map(video => video.會議資料?.屆).filter(Boolean))];
    return terms.sort((a, b) => b - a);
  };

  // 獲取可用的會期選項
  const getAvailableSessions = () => {
    const sessions = [...new Set(videos.map(video => video.會議資料?.會期).filter(Boolean))];
    return sessions.sort((a, b) => a - b);
  };

  const displayVideos = () => {
    if (loading) {
      return Array(itemsPerPage).fill(0).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="aspect-w-16 aspect-h-9 bg-gray-300"></div>
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
          <p className="text-red-500">載入影片時發生錯誤：{error}</p>
        </div>
      );
    }

    if (!filteredVideos.length) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">
            {searchTerm || dateFilter.start || dateFilter.end || termFilter || sessionFilter 
              ? '沒有找到符合條件的影片' 
              : '目前沒有可用的影片'
            }
          </p>
        </div>
      );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageVideos = filteredVideos.slice(startIndex, endIndex);

    return pageVideos.map((video, index) => (
      <div key={video.IVOD_ID || index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="aspect-w-16 aspect-h-9 relative">
          {isMobile ? (
            // 手機版：顯示縮圖和播放按鈕
            <div 
              className="relative w-full h-full cursor-pointer group overflow-hidden"
              onClick={() => handleVideoClick(video)}
            >
              {/* 影片縮圖 */}
              <video
                className="w-full h-full object-cover"
                preload="metadata"
                muted
                playsInline
              >
                <source src={video.video_url} type="application/x-mpegURL" />
              </video>
              
              {/* 播放覆蓋層 */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300">
                <div className="w-20 h-20 bg-white bg-opacity-95 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-opacity-100 transition-all duration-300 shadow-lg">
                  <Play className="w-10 h-10 text-gray-700 ml-1" fill="currentColor" />
                </div>
              </div>
              
              {/* 播放提示 */}
              <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-xs font-medium">
                點擊播放
              </div>
              
              {/* 時長顯示（如果有的話） */}
              {video.委員發言時間 && (
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {video.委員發言時間}
                </div>
              )}
            </div>
          ) : (
            // 電腦版：嵌入式播放器
            <video
              ref={el => {
                if (el) {
                  videoRefs.current[index] = el;
                }
              }}
              className="video-js vjs-default-skin vjs-big-play-centered w-full h-full object-cover"
            >
              <source src={video.video_url} type="application/x-mpegURL" />
              <p className="vjs-no-js">
                請啟用JavaScript並使用支援HTML5的瀏覽器以觀看影片
              </p>
            </video>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-indigo-600 transition duration-300 line-clamp-2">
            {video.會議名稱}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(video.日期)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{video.委員發言時間}</span>
              </div>
            </div>
            {video.會議資料 && (
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <Tag size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p>第{video.會議資料.屆}屆第{video.會議資料.會期}會期</p>
                  <p className="line-clamp-1">{video.會議資料.標題}</p>
                </div>
              </div>
            )}
            <a 
              href={video.IVOD_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition duration-300"
            >
              <Video size={16} className="mr-1" />
              立院影片連結
            </a>
          </div>
        </div>
      </div>
    ));
  };

  const totalPages = Math.ceil((filteredVideos?.length || 0) / itemsPerPage);

  const changePage = (direction) => {
    setCurrentPage(prev => {
      const newPage = prev + direction;
      return newPage > 0 && newPage <= totalPages ? newPage : prev;
    });
  };

  const updatePaginationButtons = () => ({
    prevDisabled: currentPage === 1,
    nextDisabled: currentPage >= totalPages
  });

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">質詢影片集</h2>
          {!loading && !error && (
            <p className="text-gray-600">
              共 {filteredVideos.length} 部影片
              {filteredVideos.length !== videos.length && ` (從 ${videos.length} 部影片中篩選)`}
            </p>
          )}
        </div>

        {/* 搜尋和篩選區域 */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          {/* 搜尋框 */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜尋會議名稱或標題..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* 篩選按鈕 */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
            >
              <Filter size={16} className="mr-2" />
              進階篩選
            </button>
            
            {(searchTerm || dateFilter.start || dateFilter.end || termFilter || sessionFilter) && (
              <button
                onClick={clearAllFilters}
                className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition duration-300"
              >
                <X size={16} className="mr-2" />
                清除篩選
              </button>
            )}
          </div>

          {/* 篩選選項 */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">開始日期</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={dateFilter.start}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">結束日期</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={dateFilter.end}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">屆期</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={termFilter}
                  onChange={(e) => setTermFilter(e.target.value)}
                >
                  <option value="">所有屆期</option>
                  {getAvailableTerms().map(term => (
                    <option key={term} value={term}>第{term}屆</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">會期</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={sessionFilter}
                  onChange={(e) => setSessionFilter(e.target.value)}
                >
                  <option value="">所有會期</option>
                  {getAvailableSessions().map(session => (
                    <option key={session} value={session}>第{session}會期</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayVideos()}
        </div>
        {!loading && !error && filteredVideos.length > 0 && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <button 
              onClick={() => changePage(-1)} 
              disabled={updatePaginationButtons().prevDisabled}
              className={`flex items-center px-4 py-2 rounded-md ${
                updatePaginationButtons().prevDisabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition duration-300`}
            >
              <ArrowLeft className="mr-2" size={16} /> 上一頁
            </button>
            <span className="text-gray-600">
              第 {currentPage} / {totalPages} 頁
            </span>
            <button 
              onClick={() => changePage(1)} 
              disabled={updatePaginationButtons().nextDisabled}
              className={`flex items-center px-4 py-2 rounded-md ${
                updatePaginationButtons().nextDisabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition duration-300`}
            >
              下一頁 <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        )}
      </div>

      {/* 手機版影片播放 Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full max-w-full max-h-full">
            {/* 關閉按鈕 */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-50 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-300"
            >
              <X size={24} />
            </button>
            
            {/* 影片標題 */}
            <div className="absolute top-4 left-4 right-16 z-40 bg-black bg-opacity-50 text-white p-3 rounded">
              <h3 className="text-lg font-semibold line-clamp-2">{selectedVideo.會議名稱}</h3>
              <p className="text-sm opacity-80 mt-1">{formatDate(selectedVideo.日期)}</p>
            </div>

            {/* 影片播放器 */}
            <div className="w-full h-full flex items-center justify-center p-4 pt-20">
              <div className="w-full max-w-full" style={{ aspectRatio: '16/9' }}>
                <video
                  ref={modalVideoRef}
                  className="video-js vjs-default-skin w-full h-full"
                  controls
                  data-setup="{}"
                >
                  <source src={selectedVideo.video_url} type="application/x-mpegURL" />
                  <p className="vjs-no-js">
                    請啟用JavaScript並使用支援HTML5的瀏覽器以觀看影片
                  </p>
                </video>
              </div>
            </div>

            {/* 影片資訊 */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{selectedVideo.委員發言時間}</span>
                </div>
                {selectedVideo.會議資料 && (
                  <div className="flex items-center">
                    <Tag size={16} className="mr-1" />
                    <span>第{selectedVideo.會議資料.屆}屆第{selectedVideo.會議資料.會期}會期</span>
                  </div>
                )}
              </div>
              {selectedVideo.會議資料?.標題 && (
                <p className="text-sm mt-2 opacity-80 line-clamp-2">{selectedVideo.會議資料.標題}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;