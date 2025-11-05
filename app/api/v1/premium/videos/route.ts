import { NextRequest, NextResponse } from "next/server";
import { PremiumVideosResponse, PremiumVideoI } from "@/src/types/premium.types";
import premiumVideosMock from "@/mock/premium/videos.json";

export async function GET(request: NextRequest) {
  try {    
    // Cast dei video mock al tipo corretto
    const videos = premiumVideosMock.map(video => ({
      ...video,
      premium: true as const
    })) as PremiumVideoI[];
    
    const response: PremiumVideosResponse = {
      success: true,
      videos,
      code: 200,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching premium videos:", error);
    
    return NextResponse.json(
      {
        success: false,
        videos: [],
        code: 500,
      },
      { status: 500 }
    );
  }
}
