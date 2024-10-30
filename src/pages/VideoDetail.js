import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './VideoDetailPage.css';
import videoData from './data.js';

const VideoDetailPage = () => {
  const { title } = useParams();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    const loadVideo = () => {
      try {
        setIsLoading(true);

        // Decode the video title from the URL
        const decodedTitle = decodeURIComponent(title);
        console.log('Decoded video title:', decodedTitle);

        // Find the video data based on the title
        const video = videoData.find(v => v.title.replace(/\s+/g, '-').toLowerCase() === decodedTitle.toLowerCase());
        console.log('Found video:', video);

        if (!video) {
          throw new Error('Video not found');
        }

        setVideoInfo(video);
        setIsLoading(false);

        // Initialize video.js only if the player is not already initialized
        if (playerRef.current) {
          playerRef.current.dispose(); // Dispose of the previous player instance if any
          playerRef.current = null;
        }

        if (videoRef.current) {
          const videoJsOptions = {
            controls: true,
            autoplay: false,
            preload: 'auto',
            fluid: true,
            sources: [{
              src: video.m3u8_url,
              type: 'application/x-mpegURL'
            }]
          };

          playerRef.current = videojs(videoRef.current, videoJsOptions, function onPlayerReady() {
            console.log('Player is ready');
          });

          // Attach event listeners to the player
          playerRef.current.on('loadedmetadata', () => {
            console.log('Video metadata loaded');
          });

          playerRef.current.on('playing', () => {
            console.log('Video is playing');
          });

          playerRef.current.on('waiting', () => {
            console.log('Video is buffering');
          });

          playerRef.current.on('error', () => {
            console.error('Video.js error:', playerRef.current.error());
            setError('視頻播放時發生錯誤。請稍後再試。');
          });
        }
      } catch (err) {
        console.error('Error loading video:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadVideo();

    // Cleanup function to dispose of the player when the component unmounts
    return () => {
      if (playerRef.current) {
        console.log('Disposing player');
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [title]);

  if (isLoading) return <div className="loading">載入中...</div>;
  if (error) return <div className="error">錯誤: {error}</div>;
  if (!videoInfo) return <div className="not-found">找不到視頻</div>;

  return (
    <div className="video-detail-page">
      <h1 className="video-title">{videoInfo.title}</h1>
      <div className="video-container">
        <video 
          ref={videoRef} 
          className="video-js vjs-big-play-centered"
        />
      </div>
      <div className="video-info">
        <p className="video-date">日期: {videoInfo.date}</p>
        <p className="video-description">{videoInfo.description}</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      <Link to="/" className="back-link">返回列表</Link>
    </div>
  );
};

export default VideoDetailPage;
