"use client";

const VideoCardOverlay = () => {
  return (
    <div
      className="absolute w-full h-full bg-transparent top-0 left-0 pointer-events-none"
      onClick={() => console.log("video clicked")}
    ></div>
  );
};

export default VideoCardOverlay;
