import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Video, Maximize2 } from 'lucide-react';
import VideoModal from './VideoModal';

// 全局樣式 - 您可以將其移至獨立的CSS文件
const captionsStyles = `
  .vjs-caption-overlay {
    position: absolute;
    bottom: 70px;
    left: 10%;
    right: 10%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    font-size: 16px;
    text-align: center;
    z-index: 1;
    border-radius: 4px;
    transition: opacity 0.3s;
    max-height: 100px;
    overflow-y: auto;
  }
  
  .transcription-status {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    align-items: center;
    z-index: 2;
  }
  
  .transcription-button {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    background: #4f46e5;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
    margin-left: 8px;
  }
  
  .transcription-button:hover {
    background: #4338ca;
  }
  
  .transcription-button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const VideoGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRefs = useRef([]);
  const styleRef = useRef(null);
  const itemsPerPage = 6;

  // 初始化樣式
  useEffect(() => {
    if (!styleRef.current) {
      const styleElement = document.createElement('style');
      styleElement.textContent = captionsStyles;
      document.head.appendChild(styleElement);
      styleRef.current = styleElement;
    }

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
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

  useEffect(() => {
    videoRefs.current.forEach(ref => {
      if (ref && ref.player) {
        ref.player.dispose();
      }
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentVideos = videos.slice(startIndex, endIndex);

    currentVideos.forEach((_, index) => {
      const videoElement = videoRefs.current[index];
      if (videoElement) {
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
      }
    });

    return () => {
      videoRefs.current.forEach(ref => {
        if (ref && ref.player) {
          ref.player.dispose();
        }
      });
    };
  }, [videos, currentPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleVideoClick = (video) => {
    // 如果當前有播放中的影片，先暫停
    videoRefs.current.forEach(ref => {
      if (ref && ref.player) {
        ref.player.pause();
      }
    });
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
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

    if (!videos.length) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">目前沒有可用的影片</p>
        </div>
      );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageVideos = videos.slice(startIndex, endIndex);

    return pageVideos.map((video, index) => (
      <div key={video.IVOD_ID || index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative group">
          <div className="aspect-w-16 aspect-h-9">
            <video
              ref={el => videoRefs.current[index] = el}
              className="video-js vjs-default-skin vjs-big-play-centered w-full h-full object-cover"
            >
              <source src={video.video_url} type="application/x-mpegURL" />
              <p className="vjs-no-js">
                請啟用JavaScript並使用支援HTML5的瀏覽器以觀看影片
              </p>
            </video>
          </div>
          <button
            onClick={() => handleVideoClick(video)}
            className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70"
            title="放大觀看並開啟即時字幕"
          >
            <Maximize2 size={20} />
          </button>
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
          </div>
        </div>
      </div>
    ));
  };

  const totalPages = Math.ceil((videos?.length || 0) / itemsPerPage);

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
            <p className="text-gray-600">共 {totalItems} 部影片</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayVideos()}
        </div>
        {!loading && !error && videos.length > 0 && (
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
      
      <VideoModal 
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default VideoGallery;