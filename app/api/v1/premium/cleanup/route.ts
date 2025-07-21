import { NextRequest, NextResponse } from "next/server";
import { premiumDatabaseService } from "@/src/services/premium.database.service";

export async function POST(request: NextRequest) {
  try {
    // Verifica che la richiesta abbia un token di autorizzazione (opzionale)
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CLEANUP_API_TOKEN;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Esegui la pulizia
    const [expiredVouchers, expiredSessions] = await Promise.all([
      premiumDatabaseService.cleanupExpiredVouchers(),
      premiumDatabaseService.cleanupExpiredSessions()
    ]);

    const response = {
      success: true,
      cleaned: {
        vouchers: expiredVouchers,
        sessions: expiredSessions,
        total: expiredVouchers + expiredSessions
      },
      timestamp: new Date().toISOString(),
      message: `Cleanup completato: ${expiredVouchers} voucher e ${expiredSessions} sessioni eliminate`
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error during cleanup:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Errore durante la pulizia",
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Gestisci anche richieste GET per monitoraggio
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CLEANUP_API_TOKEN;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cleanup API is ready",
      endpoint: "/api/v1/premium/cleanup",
      method: "POST",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Service unavailable"
      },
      { status: 503 }
    );
  }
}
