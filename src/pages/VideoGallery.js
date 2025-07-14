import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Video, Search, Filter, X, Play, Subtitles } from 'lucide-react';


// 模擬 HLS.js (在實際環境中這會從 CDN 載入)
const HLS_AVAILABLE = typeof window !== 'undefined' && window.Hls;

const VideoGallery = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const videoRefs = useRef([]);
  const modalVideoRef = useRef(null);
  const hlsInstances = useRef([]);
  const modalHlsInstance = useRef(null);
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

  // 字幕相關狀態
  const [transcripts, setTranscripts] = useState(new Map());
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [loadingTranscripts, setLoadingTranscripts] = useState(new Set());

  // 載入 HLS.js
  useEffect(() => {

    if (!HLS_AVAILABLE) {
            const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.10/hls.min.js';
      script.onload = () => {

      };
      script.onerror = () => {
        console.error('❌ DEBUG: Failed to load HLS.js');
      };
      document.head.appendChild(script);
    } else {
    }
  }, []);

  // 檢測是否為手機設備
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 獲取字幕資料
  const fetchTranscript = async (ivodId) => {
        
    if (transcripts.has(ivodId)) {
            return transcripts.get(ivodId);
    }
    
    if (loadingTranscripts.has(ivodId)) {
            return transcripts.get(ivodId);
    }

    setLoadingTranscripts(prev => new Set([...prev, ivodId]));
    
    try {
      const url = `https://ly.govapi.tw/v2/ivod/${ivodId}`;
            
      const response = await fetch(url);
            
      if (!response.ok) {
        throw new Error(`Failed to fetch transcript for ${ivodId}: ${response.status}`);
      }
      
      const data = await response.json();
                  
      // 正確的資料結構：data.data.transcript 而不是 data.transcript
      const transcriptData = data.data || data; // 支援兩種可能的結構
      const transcript = transcriptData.transcript;
      
            
      // 檢查各種可能的 transcript 位置
      if (transcript) {
                                
        if (transcript.whisperx) {
                            } else {
                            }
        
        if (transcript.pyannote) {
                            } else {
                  }
      } else {
                        
        // 檢查是否有其他可能的字段名稱
        const possibleFields = ['transcripts', 'subtitle', 'subtitles', 'text', 'captions'];
        for (const field of possibleFields) {
          if (data[field] || (data.data && data.data[field])) {
                      }
        }
      }
      
      if (transcript && transcript.whisperx) {
                        
        const vttContent = generateVTT(transcript.whisperx);
                        
        const vttBlob = new Blob([vttContent], { type: 'text/vtt' });
        const vttUrl = URL.createObjectURL(vttBlob);
                
        const finalTranscriptData = {
          whisperx: transcript.whisperx,
          pyannote: transcript.pyannote,
          vttUrl: vttUrl,
          vttContent: vttContent
        };
        
        setTranscripts(prev => new Map([...prev, [ivodId, finalTranscriptData]]));
                return finalTranscriptData;
      } else {
                                        if (data.data) {
                  }
                if (transcript) {
                            }
        
        // 嘗試找到任何包含文字的字段
        function findTextFields(obj, path = '') {
          const textFields = [];
          for (const [key, value] of Object.entries(obj)) {
            const currentPath = path ? `${path}.${key}` : key;
            if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
              const firstItem = value[0];
              if (firstItem.text || firstItem.content || firstItem.transcript) {
                textFields.push({ path: currentPath, sample: firstItem });
              }
            } else if (typeof value === 'object' && value !== null) {
              textFields.push(...findTextFields(value, currentPath));
            }
          }
          return textFields;
        }
        
        const textFields = findTextFields(data);
              }
    } catch (error) {
      console.error('💥 DEBUG: Error fetching transcript for', ivodId, ':', error);
    } finally {
      setLoadingTranscripts(prev => {
        const newSet = new Set(prev);
        newSet.delete(ivodId);
                return newSet;
      });
    }
    
    return null;
  };

// 在這裡加入
const splitTextIntoTwoLineChunks = (text, maxLineLength = 20, maxLines = 2) => {
  const chars = [...text];
  const lines = [];
  let line = '';

  for (let i = 0; i < chars.length; i++) {
    line += chars[i];
    if (line.length >= maxLineLength || /[。！？；：]/.test(chars[i])) {
      lines.push(line.trim());
      line = '';
    }
  }

  if (line) lines.push(line.trim());

  // 每段最多兩行，超過的自動推成新段
  const chunks = [];
  for (let i = 0; i < lines.length; i += maxLines) {
    const group = lines.slice(i, i + maxLines).join('\n');
    chunks.push(group);
  }

  return chunks;
};

// 接著是你原本的字幕生成函式
const generateVTT = (whisperxData) => {
  let vtt = 'WEBVTT\n\n';
  let cueIndex = 0;

  for (let i = 0; i < whisperxData.length; i++) {
    const segment = whisperxData[i];
    const { start, end, text } = segment;

    const duration = end - start;
    const traditional = text;
    const processedText = traditional;
    const chunks = splitTextIntoTwoLineChunks(processedText); // 用新函式切段

    const chunkDuration = duration / chunks.length;

    chunks.forEach((chunk, index) => {
      const chunkStart = start + (index * chunkDuration);
      const chunkEnd = start + ((index + 1) * chunkDuration);
      const startTime = formatTime(chunkStart);
      const endTime = formatTime(chunkEnd);

      vtt += `${cueIndex++}\n`;
      vtt += `${startTime} --> ${endTime}\n`;
      vtt += `${chunk}\n\n`;
    });
  }

  return vtt;
};


const splitTextIntoChunks = (text, maxLength = 40) => {
  const chunks = [];
  let currentLine = '';

  const chars = [...text];
  for (let i = 0; i < chars.length; i++) {
    currentLine += chars[i];
    if (currentLine.length >= maxLength || /[。！？]/.test(chars[i])) {
      chunks.push(currentLine.trim());
      currentLine = '';
    }
  }
  if (currentLine) chunks.push(currentLine.trim());

  // 將兩行合併為一個字幕段落，使用換行符
  const merged = [];
  for (let i = 0; i < chunks.length; i += 2) {
    if (i + 1 < chunks.length) {
      merged.push(`${chunks[i]}\n${chunks[i + 1]}`);
    } else {
      merged.push(chunks[i]);
    }
  }

  return merged;
};

  // 格式化時間為 VTT 格式
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);
    
    const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    
    // 只在第一次調用時顯示DEBUG，避免日誌過多
    if (seconds < 1) {
          }
    
    return formatted;
  };

  // 初始化 HLS 播放器
  const initializeHLSPlayer = async (videoElement, videoUrl, ivodId, isModal = false) => {
    
    if (!videoElement) {
            return null;
    }

    let hls = null;
    
    if (window.Hls && window.Hls.isSupported()) {
            hls = new window.Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90
      });
      
            hls.loadSource(videoUrl);
      hls.attachMedia(videoElement);
      
      hls.on(window.Hls.Events.MANIFEST_PARSED, async () => {
                
        // 如果啟用字幕，載入字幕
        if (subtitlesEnabled && ivodId) {
                    const transcriptData = await fetchTranscript(ivodId);
          
          if (transcriptData && transcriptData.vttUrl) {
                        
            // 清除現有字幕軌道
            const tracks = videoElement.textTracks;
                        
            for (let i = tracks.length - 1; i >= 0; i--) {
              const track = tracks[i];
              if (track.kind === 'subtitles') {
                                track.mode = 'disabled';
              }
            }
            
            // 添加新的字幕軌道
                        const track = videoElement.addTextTrack('subtitles', '中文字幕', 'zh-TW');
            track.mode = 'showing';
                        
            // 載入 VTT 內容
                        fetch(transcriptData.vttUrl)
              .then(response => {
                                return response.text();
              })
              .then(vttText => {
                                                
                // 解析 VTT 並添加 cues
                const lines = vttText.split('\n');
                                
                let i = 0;
                let cueCount = 0;
                
                while (i < lines.length) {
                  const line = lines[i].trim();
                  
                  // 跳過 WEBVTT 標頭和空行
                  if (line === 'WEBVTT' || line === '' || !line.includes('-->')) {
                    i++;
                    continue;
                  }
                  
                  // 解析時間戳
                  if (line.includes('-->')) {
                                        const [startTime, endTime] = line.split(' --> ');
                    const start = parseVTTTime(startTime);
                    const end = parseVTTTime(endTime);
                    
                                        
                    // 獲取字幕文本
                    i++;
                    let text = '';
                    while (i < lines.length && lines[i].trim() !== '') {
                      text += (text ? ' ' : '') + lines[i].trim();
                      i++;
                    }
                    
                                        
                    if (text && start !== null && end !== null) {
                      try {
                        const cue = new VTTCue(start, end, text);
                        cue.snapToLines = false;
                        cue.line = 85; // 位置在底部85%
                        cue.align = 'center';
                        track.addCue(cue);
                        cueCount++;
                                              } catch (error) {
                        console.error('❌ DEBUG: Error adding cue:', error, { start, end, text });
                      }
                    } else {
                                          }
                  }
                  i++;
                }
                
                                              })
              .catch(error => {
                console.error('💥 DEBUG: Error loading subtitles:', error);
              });
          } else {
                      }
        } else {
                  }
      });

      hls.on(window.Hls.Events.ERROR, (event, data) => {
        console.error('💥 DEBUG: HLS error:', { event, data });
        if (data.fatal) {
                    switch (data.type) {
            case window.Hls.ErrorTypes.NETWORK_ERROR:
                            hls.startLoad();
              break;
            case window.Hls.ErrorTypes.MEDIA_ERROR:
                            hls.recoverMediaError();
              break;
            default:
                            hls.destroy();
              break;
          }
        }
      });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari 原生支援
            videoElement.src = videoUrl;
    } else {
          }
    
    return hls;
  };

  // 解析 VTT 時間格式
  const parseVTTTime = (timeString) => {
        
    const parts = timeString.split(':');
    if (parts.length !== 3) {
            return null;
    }
    
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const secondsParts = parts[2].split('.');
    const seconds = parseInt(secondsParts[0]);
    const milliseconds = secondsParts[1] ? parseInt(secondsParts[1]) : 0;
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
    
        
    return totalSeconds;
  };

  useEffect(() => {
    const fetchVideos = async () => {
            
      try {
        setLoading(true);

        // 先載入第一頁，取得 total_page
                const firstPageRes = await fetch('https://v2.ly.govapi.tw/ivods?委員名稱=翁曉玲&page=1&limit=100');
        
                
        if (!firstPageRes.ok) throw new Error('Failed to fetch videos (page 1)');
        const firstPageData = await firstPageRes.json();

        const totalPages = firstPageData.total_page || 1;
        let allVideos = firstPageData.ivods || [];

        
        // 並行載入第 2 頁到 totalPages
        const remainingFetches = [];
        for (let page = 2; page <= totalPages; page++) {
          const url = `https://v2.ly.govapi.tw/ivods?委員名稱=翁曉玲&page=${page}&limit=100`;
          remainingFetches.push(fetch(url).then(res => res.json()));
        }

                const remainingResults = await Promise.all(remainingFetches);
        
        for (const result of remainingResults) {
          if (result?.ivods) {
            allVideos = allVideos.concat(result.ivods);
                      }
        }

        
        setVideos(allVideos);
        setFilteredVideos(allVideos);
        setTotalItems(allVideos.length);
      } catch (err) {
        console.error('💥 DEBUG: Error fetching videos:', err);
        setError(err.message || '載入失敗');
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

  // 初始化頁面影片播放器
  useEffect(() => {
                        
    if (isMobile) {
            return; // 手機版不初始化嵌入式播放器
    }
    
    // 清理現有的 HLS 實例
        hlsInstances.current.forEach((hls, index) => {
      if (hls) {
                hls.destroy();
      }
    });
    hlsInstances.current = [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentVideos = filteredVideos.slice(startIndex, endIndex);
    
    // 使用 setTimeout 確保 DOM 已更新
    const timeoutId = setTimeout(async () => {
            
      for (let index = 0; index < currentVideos.length; index++) {
        const video = currentVideos[index];
        const videoElement = videoRefs.current[index];
        
                
        if (videoElement && video.video_url) {
          const hls = await initializeHLSPlayer(videoElement, video.video_url, video.IVOD_ID);
          hlsInstances.current[index] = hls;
                  } else {
                  }
      }
      
          }, 100);

    return () => {
            clearTimeout(timeoutId);
      hlsInstances.current.forEach((hls, index) => {
        if (hls) {
                    hls.destroy();
        }
      });
      hlsInstances.current = [];
    };
  }, [filteredVideos, currentPage, isMobile, subtitlesEnabled]);

  // Modal播放器初始化
  useEffect(() => {
        
    if (showVideoModal && selectedVideo && modalVideoRef.current) {
      const initializeModalPlayer = async () => {
                
        // 清理現有實例
        if (modalHlsInstance.current) {
                    modalHlsInstance.current.destroy();
          modalHlsInstance.current = null;
        }

                const hls = await initializeHLSPlayer(
          modalVideoRef.current, 
          selectedVideo.video_url, 
          selectedVideo.IVOD_ID, 
          true
        );
        modalHlsInstance.current = hls;
        
        // 自動播放
        if (modalVideoRef.current) {
                    modalVideoRef.current.play()
            .then(() => {
                          })
            .catch(error => {
              console.warn('⚠️ DEBUG: Autoplay failed:', error);
            });
        }
      };

      initializeModalPlayer();
    }

    return () => {
            if (modalHlsInstance.current) {
                modalHlsInstance.current.destroy();
        modalHlsInstance.current = null;
      }
    };
  }, [showVideoModal, selectedVideo, subtitlesEnabled]);

  // 組件卸載時清理所有資源
  useEffect(() => {
    return () => {
      hlsInstances.current.forEach(hls => {
        if (hls) {
          hls.destroy();
        }
      });
      
      if (modalHlsInstance.current) {
        modalHlsInstance.current.destroy();
      }

      // 清理所有 VTT blob URLs
      transcripts.forEach(transcript => {
        if (transcript.vttUrl) {
          URL.revokeObjectURL(transcript.vttUrl);
        }
      });
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
        <div className="relative" style={{ aspectRatio: '16/9' }}>
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
              
              {/* 字幕指示器 */}
              {subtitlesEnabled && (
                <div className="absolute top-3 right-3 bg-blue-600 bg-opacity-90 text-white px-2 py-1 rounded-full text-xs flex items-center">
                  <Subtitles size={12} className="mr-1" />
                  字幕
                </div>
              )}
              
              {/* 時長顯示 */}
              {video.委員發言時間 && (
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {video.委員發言時間}
                </div>
              )}
            </div>
          ) : (
            // 電腦版：嵌入式播放器
            <div className="relative w-full h-full">
              <video
                ref={el => {
                  if (el) {
                    videoRefs.current[index] = el;
                  }
                }}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                playsInline
                style={{ background: '#000' }}
              >
                <source src={video.video_url} type="application/x-mpegURL" />
                您的瀏覽器不支援影片播放
              </video>
              
              {/* 字幕狀態指示器 */}
              {subtitlesEnabled && (
                <div className="absolute top-2 right-2 bg-blue-600 bg-opacity-90 text-white px-2 py-1 rounded text-xs flex items-center">
                  <Subtitles size={12} className="mr-1" />
                  {transcripts.has(video.IVOD_ID) ? '字幕' : 
                   loadingTranscripts.has(video.IVOD_ID) ? '載入中' : '字幕'}
                </div>
              )}
            </div>
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
            <div className="flex items-center justify-between">
              <a 
                href={video.IVOD_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition duration-300"
              >
                <Video size={16} className="mr-1" />
                立院影片連結
              </a>
              {transcripts.has(video.IVOD_ID) && (
                <div className="flex items-center text-xs text-green-600">
                  <Subtitles size={14} className="mr-1" />
                  字幕已載入
                </div>
              )}
              {loadingTranscripts.has(video.IVOD_ID) && (
                <div className="flex items-center text-xs text-blue-600">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-1"></div>
                  載入字幕中
                </div>
              )}
            </div>
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

          {/* 字幕控制和篩選按鈕 */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                <Filter size={16} className="mr-2" />
                進階篩選
              </button>
              
              <button
                onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                className={`flex items-center px-4 py-2 rounded-lg transition duration-300 ${
                  subtitlesEnabled 
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Subtitles size={16} className="mr-2" />
                {subtitlesEnabled ? '字幕已啟用' : '字幕已停用'}
              </button>

            </div>
            
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
            
            {/* 字幕狀態指示器 */}
            {subtitlesEnabled && (
              <div className="absolute top-4 left-4 z-40 bg-blue-600 bg-opacity-90 text-white px-3 py-2 rounded-lg flex items-center">
                <Subtitles size={16} className="mr-2" />
                <span className="text-sm">
                  {transcripts.has(selectedVideo.IVOD_ID) ? '字幕已載入' : 
                   loadingTranscripts.has(selectedVideo.IVOD_ID) ? '載入字幕中...' : '準備載入字幕'}
                </span>
              </div>
            )}
            
            {/* 影片標題 */}
            <div className="absolute top-20 left-4 right-16 z-40 bg-black bg-opacity-50 text-white p-3 rounded">
              <h3 className="text-lg font-semibold line-clamp-2">{selectedVideo.會議名稱}</h3>
              <p className="text-sm opacity-80 mt-1">{formatDate(selectedVideo.日期)}</p>
            </div>

            {/* 影片播放器 */}
            <div className="w-full h-full flex items-center justify-center p-4 pt-32">
              <div className="w-full max-w-full" style={{ aspectRatio: '16/9' }}>
                <video
                  ref={modalVideoRef}
                  className="w-full h-full"
                  controls
                  playsInline
                  style={{ background: '#000' }}
                >
                  <source src={selectedVideo.video_url} type="application/x-mpegURL" />
                  您的瀏覽器不支援影片播放
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