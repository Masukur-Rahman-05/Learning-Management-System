
import React from 'react';
import ReactPlayer from "react-player";

const VideoPlayer = ({ url, width, height, setVideoProgress }) => {
  
  const handleProgress = (state) => {
    const playedPercentage = state.played * 100;
    setVideoProgress(playedPercentage); // Update progress percentage
  };
    return (
      <div className="w-full h-full my-5">
        <ReactPlayer
          url={url}
          controls
          volume={0.5}
          width={width}
          height={height}
          onProgress={handleProgress}
        />
      </div>
    );
};

export default VideoPlayer;