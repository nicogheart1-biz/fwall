import { NextRequest, NextResponse } from "next/server";
import { premiumDatabaseService } from "@/src/services/premium.database.service";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    const params = await context.params;
    const sessionId = params.sessionId;

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Session ID è obbligatorio",
          code: 400,
        },
        { status: 400 }
      );
    }

    const session = await premiumDatabaseService.getPremiumSession(sessionId);

    if (!session) {
      return NextResponse.json({
        success: true,
        exists: false,
        valid: false,
        message: "Sessione non trovata",
        code: 404,
      });
    }

    const isExpired = premiumDatabaseService.isSessionExpired(session);
    const timeRemaining = Math.max(0, session.expiresAt - Date.now());

    return NextResponse.json({
      success: true,
      exists: true,
      valid: !isExpired,
      session: {
        accessCode: session.accessCode,
        startedAt: session.startedAt,
        expiresAt: session.expiresAt,
        timeRemaining,
        isExpired
      },
      code: 200,
    });
  } catch (error) {
    console.error("Error checking session status:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Errore interno del server",
        code: 500,
      },
      { status: 500 }
    );
  }
}
