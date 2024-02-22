import React from "react";
import ReactPlayer from "react-player/lazy";

const VideoPlayer = ({ url, className, width, height, playing = true }) => {
  return (
    <ReactPlayer
      url={url}
      className={className}
      width={width || "100%"}
      height={height || "100%"}
      playing={playing}
      loop
      controls={true}
      volume={0.8}
      muted
      playbackRate={1.0}
      progressInterval={1000}
      playsinline
      pip
      stopOnUnmount={false}
      config={{
        attributes: {
          type: "video/x-matroska",
        },
        youtube: {
          playerVars: { showinfo: 1, controls: 1 },
        },
      }}
    />
  );
};

export default VideoPlayer;
