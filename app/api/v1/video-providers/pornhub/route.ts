import { NextResponse } from "next/server";
import { ResponseCodesConstants } from "@/src/constants";
import { PornhubService } from "@/src/services/pornhub.service";
import { VideoProvidersUtils } from "@/src/utils/videoProviders.utils";

const requestHandler = async (req: Request) => {
  const { method } = req;

  console.log(`API ${method} test`);

  switch (method) {
    case "POST": {
      try {
        const body = await req.json();
        if (!body) {
          return NextResponse.json(
            {
              code: ResponseCodesConstants.RECAPTCHA_VALIDATE_BAD_REQUEST.code,
              success: false,
            },
            { status: 400 }
          );
        }
        const response = await PornhubService.getVideos(body);

        return NextResponse.json(
          {
            code: ResponseCodesConstants.RECAPTCHA_VALIDATE_SUCCESS.code,
            data: VideoProvidersUtils.formatVideos({
              pornhub: response,
            }),
            success: true,
          },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          {
            code: ResponseCodesConstants.RECAPTCHA_VALIDATE_ERROR.code,
            success: false,
            error,
          },
          { status: 500 }
        );
      }
      break;
    }
    default: {
      return NextResponse.json(
        {
          code: ResponseCodesConstants.RECAPTCHA_VALIDATE_METHOD_NOT_ALLOWED
            .code,
          success: false,
        },
        { status: 405 }
      );
      break;
    }
  }
};

export async function POST(req: Request) {
  return requestHandler(req);
}
