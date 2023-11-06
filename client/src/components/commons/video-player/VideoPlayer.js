import React from "react";
import ReactPlayer from "react-player/lazy";

const VideoPlayer = ({ url, className }) => {
  return (
    <ReactPlayer
      url={url}
      className={className}
      playing={true}
      loop
      controls={true}
      volume={0.8}
      muted
      playbackRate={1.5}
      progressInterval={1000}
      playsinline
      pip
      stopOnUnmount={false}
      config={{
        youtube: {
          playerVars: { showinfo: 1, controls: 1 },
        },
      }}
    />
  );
};

export default VideoPlayer;
