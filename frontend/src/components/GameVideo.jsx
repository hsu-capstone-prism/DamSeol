import React, { useRef, useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

const GameVideo = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  if (hasError || !videoSrc) {
    return (
      <div className="video-container error-container">
        <div className="error-message">
          <p>비디오를 불러올 수 없습니다.</p>
          <p>관련 영상이 준비 중입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="game-video"
        width="100%"
        muted
        onEnded={handleVideoEnded}
        onError={handleVideoError}
      >
        <source src={videoSrc} type="video/mp4" />
        브라우저가 비디오를 지원하지 않습니다.
      </video>
      {!isPlaying && (
        <button className="play-button" onClick={handlePlay}>
          <FaPlay />
        </button>
      )}
    </div>
  );
};

export default GameVideo;
