import { NextRequest, NextResponse } from "next/server";
import {
  VerifyVoucherRequest,
  VerifyVoucherResponse,
  PremiumSessionI,
} from "@/src/types/premium.types";
import {
  PremiumConstants,
  PremiumMessages,
} from "@/src/constants/premium.constants";
import { isMocked } from "@/src/utils/envs.utils";

// Storage temporaneo per i voucher (in produzione usare un database)
const usedVouchers = new Set<string>();

// Voucher di test validi
const TEST_VOUCHERS = isMocked
  ? ["TEST-PREM-2025", "DEMO-USER-TEST", "FREE-TRIAL-24H"]
  : [];

export async function POST(request: NextRequest) {
  try {
    const body: VerifyVoucherRequest = await request.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          message: "Codice voucher non valido",
          code: 400,
        },
        { status: 400 }
      );
    }

    const voucherCode = code.trim().toUpperCase();

    // Verifica il formato del voucher (XXXX-XXXX-XXXX) o se è un voucher di test
    const voucherFormat = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    const isTestVoucher = TEST_VOUCHERS.includes(voucherCode);

    if (!voucherFormat.test(voucherCode) && !isTestVoucher) {
      return NextResponse.json({
        success: true,
        valid: false,
        message: PremiumMessages.INVALID_VOUCHER,
        code: 200,
      });
    }

    // Controlla se il voucher è già stato usato
    if (usedVouchers.has(voucherCode)) {
      return NextResponse.json({
        success: true,
        valid: false,
        message: PremiumMessages.VOUCHER_ALREADY_USED,
        code: 200,
      });
    }

    // In un'implementazione reale, qui dovresti:
    // 1. Cercare il voucher nel database
    // 2. Verificare che non sia scaduto
    // 3. Verificare che non sia già stato usato
    // 4. Marcarlo come usato

    // Per i voucher di test o quelli con formato corretto, simuliamo che siano validi
    // In produzione, dovresti fare una verifica reale nel database

    const now = Date.now();
    const expiresAt = now + PremiumConstants.ACCESS_DURATION;

    // Crea una sessione premium
    const session: PremiumSessionI = {
      accessCode: voucherCode,
      expiresAt,
      startedAt: now,
    };

    // Marca il voucher come usato
    usedVouchers.add(voucherCode);

    const response: VerifyVoucherResponse = {
      success: true,
      valid: true,
      session,
      message: PremiumMessages.ACCESS_GRANTED,
      code: 200,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error verifying voucher:", error);

    return NextResponse.json(
      {
        success: false,
        valid: false,
        message: "Errore interno del server",
        code: 500,
      },
      { status: 500 }
    );
  }
}
