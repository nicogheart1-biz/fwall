import { ApiService } from "@/src/services";
import { VideoProvidersService } from "@/src/services/videoProviders.service";
import { isReleased } from "@/src/utils/envs.utils";
import dynamic from "next/dynamic";

const PlaygroundComponent = dynamic(() => import("./playground.component"), {
  ssr: false,
});

const test = async () => {
  try {
    const response = await VideoProvidersService.getVideosWall();
    return response;
  } catch (error) {
    throw new Error(`Playground test failed with error: ${error}`);
  }
};

export default async function Playground() {
  if (isReleased) return;
  const data = {}
  //const data = await test();
  console.log("qui",JSON.stringify(data))

  return (
    <div className="mx-auto max-w-screen-xl py-4 sm:px-6 lg:px-8">
      <PlaygroundComponent data={JSON.stringify(data)} />
    </div>
  );
}
