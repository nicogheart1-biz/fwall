"use client";

import { VideoProvidersService } from "@/src/services/videoProviders.service";
import { useEffect } from "react";

const PlaygroundComponent = (props: { data: any }) => {
  const { data = "{}" } = props;
  const test = async () => {
    try {
      const response = await VideoProvidersService.getVideosWall();
      console.log('response', response)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    test();
  }, []);

  console.log("data", JSON.parse(data));

  return <div>PlaygroundComponent</div>;
};
export default PlaygroundComponent;
