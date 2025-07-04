import React, { useState, useEffect, useRef,useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Loader, 
  Maximize2,
  ExternalLink,
  X
} from 'lucide-react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// 添加通用的 formatDate 函數
const formatDate = (dateString) => {
  if (!dateString) return '無日期';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '日期格式錯誤';
    
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    return '日期解析錯誤';
  }
};
// VideoCard.js
const VideoCard = ({ video, index, onExpandClick }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);
  
    // 清理和初始化播放器
    const cleanupAndInitializePlayer = useCallback(() => {
      // 首先清理現有的播放器
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (error) {
          console.warn('Error disposing video player:', error);
        }
        playerRef.current = null;
      }
  
      // 重新建立 video 元素
      if (videoContainerRef.current) {
        // 清空容器
        videoContainerRef.current.innerHTML = '';
        
        // 創建新的 video 元素
        const videoElement = document.createElement('video');
        videoElement.className = 'video-js vjs-default-skin vjs-big-play-centered w-full h-full';
        videoElement.playsInline = true;
        
        // 添加源
        const sourceElement = document.createElement('source');
        sourceElement.src = video.video_url;
        sourceElement.type = 'application/x-mpegURL';
        videoElement.appendChild(sourceElement);
        
        // 添加到容器
        videoContainerRef.current.appendChild(videoElement);
        videoRef.current = videoElement;
  
        // 初始化 VideoJS
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
  
          playerRef.current = player;
          setIsPlayerInitialized(true);
        } catch (error) {
          console.error('Error initializing video player:', error);
        }
      }
    }, [video.video_url]);
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        cleanupAndInitializePlayer();
      }, 100);
  
      return () => {
        clearTimeout(timeoutId);
        if (playerRef.current) {
          try {
            playerRef.current.dispose();
          } catch (error) {
            console.warn('Error disposing video player:', error);
          }
          playerRef.current = null;
          setIsPlayerInitialized(false);
        }
      };
    }, [cleanupAndInitializePlayer]);
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
  
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="aspect-w-16 aspect-h-9 relative group">
          {!isPlayerInitialized && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
              <div className="animate-pulse">載入中...</div>
            </div>
          )}
          <div ref={videoContainerRef} className="w-full h-full" />
          <button
            onClick={() => onExpandClick(video)}
            className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70 z-20"
            title="放大觀看"
          >
            <Maximize2 size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <Calendar size={14} />
            <span>{formatDate(video.日期)}</span>
          </div>
  
          <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
            {video.會議名稱}
          </h3>
  
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              <Clock size={14} className="inline mr-1" />
              發言時間：{video.委員發言時間}
            </div>
  
            <a
              href={video.IVOD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ExternalLink size={16} className="mr-1" />
              原始連結
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  const VideoModal = ({ video, isOpen, onClose }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);
  
    const cleanupAndInitializePlayer = useCallback(() => {
      if (!isOpen || !video) return;
  
      // 清理現有的播放器
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (error) {
          console.warn('Error disposing modal video player:', error);
        }
        playerRef.current = null;
      }
  
      // 重新建立 video 元素
      if (videoContainerRef.current) {
        // 清空容器
        videoContainerRef.current.innerHTML = '';
        
        // 創建新的 video 元素
        const videoElement = document.createElement('video');
        videoElement.className = 'video-js vjs-default-skin vjs-big-play-centered w-full h-full';
        videoElement.playsInline = true;
        
        // 添加源
        const sourceElement = document.createElement('source');
        sourceElement.src = video.video_url;
        sourceElement.type = 'application/x-mpegURL';
        videoElement.appendChild(sourceElement);
        
        // 添加到容器
        videoContainerRef.current.appendChild(videoElement);
        videoRef.current = videoElement;
  
        // 初始化 VideoJS
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
  
          playerRef.current = player;
          setIsPlayerInitialized(true);
        } catch (error) {
          console.error('Error initializing modal video player:', error);
        }
      }
    }, [isOpen, video]);
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        cleanupAndInitializePlayer();
      }, 100);
  
      return () => {
        clearTimeout(timeoutId);
        if (playerRef.current) {
          try {
            playerRef.current.dispose();
          } catch (error) {
            console.warn('Error disposing modal video player:', error);
          }
          playerRef.current = null;
          setIsPlayerInitialized(false);
        }
      };
    }, [cleanupAndInitializePlayer]);
  
    useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
  
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }
  
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);
  
    if (!isOpen || !video) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
          {/* Modal Header */}
          <div className="flex items-start justify-between p-4 border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              {video.會議名稱}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            >
              <X size={20} />
            </button>
          </div>
  
          {/* Modal Body */}
          <div className="p-6">
            <div className="aspect-w-16 aspect-h-9 relative">
              {!isPlayerInitialized && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                  <div className="animate-pulse">載入中...</div>
                </div>
              )}
              <div ref={videoContainerRef} className="w-full h-full" />
            </div>
  
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(video.日期)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>發言時間：{video.委員發言時間}</span>
                </div>
              </div>
  
              {video.會議簡介 && (
                <div className="prose max-w-none">
                  <h4 className="text-lg font-semibold mb-2">會議簡介</h4>
                  <p className="text-gray-600">{video.會議簡介}</p>
                </div>
              )}
            </div>
          </div>
  
          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-4 border-t p-4">
            <a
              href={video.IVOD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              <ExternalLink size={16} />
              <span>在國會頻道觀看</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // LatestIvodSection Component
  const LatestIvodSection = () => {
    const [latestIvods, setLatestIvods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const activeVideoPlayers = useRef([]);
  
    useEffect(() => {
      const fetchLatestIvods = async () => {
        try {
          setLoading(true);
          const response = await fetch('https://v2.ly.govapi.tw/ivods?委員名稱=翁曉玲&limit=3');
          if (!response.ok) {
            throw new Error('Failed to fetch ivods');
          }
          const data = await response.json();
          setLatestIvods(data.ivods || []);
        } catch (err) {
          console.error('Error fetching ivods:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLatestIvods();
  
      // Clean up all video players when component unmounts
      return () => {
        activeVideoPlayers.current.forEach(player => {
          if (player && typeof player.dispose === 'function') {
            try {
              player.dispose();
            } catch (error) {
              console.warn('Error disposing video player:', error);
            }
          }
        });
        activeVideoPlayers.current = [];
      };
    }, []);
  
    const handleVideoClick = (video) => {
      setSelectedVideo(video);
      setIsModalOpen(true);
    };
  
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">最新質詢影片</h2>
            <Link 
              to="/video-gallery" 
              className="inline-flex items-center px-6 py-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors font-semibold"
            >
              查看所有影片 
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
  
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="flex items-center gap-2 text-indigo-600">
                <Loader className="animate-spin" />
                <span>載入中...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              <p>載入失敗</p>
              <p className="text-sm text-gray-500 mt-2">{error}</p>
            </div>
          ) : latestIvods.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              暫無質詢影片
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestIvods.map((ivod, index) => (
                <VideoCard
                  key={ivod.IVOD_ID}
                  video={ivod}
                  index={index}
                  onExpandClick={handleVideoClick}
                />
              ))}
            </div>
          )}
        </div>
  
        <VideoModal 
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedVideo(null);
          }}
        />
      </section>
    );
  };
  
  export { VideoModal, VideoCard, LatestIvodSection };