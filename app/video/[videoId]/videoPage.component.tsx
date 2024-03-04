import { VideoI } from "@/src/types/videoProvider.types";
import { capitalize } from "@/src/utils/common.utils";

type VideoPageComponentI = {
  videoDetails: VideoI;
};

const VideoPageComponent = (props: VideoPageComponentI) => {
  const { videoDetails } = props;
  return (
    <div>
      <h2>{capitalize(videoDetails.title)}</h2>
      {videoDetails.embedUrl ? <iframe width="100%" height="400px" src={videoDetails.embedUrl} /> : null}
    </div>
  );
};

export default VideoPageComponent;
