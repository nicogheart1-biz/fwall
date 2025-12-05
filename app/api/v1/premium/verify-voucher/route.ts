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
import { premiumDatabaseService } from "@/src/services/premium.database.service";

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

    // Gestione dei voucher di test in ambiente mock
    if (isTestVoucher) {
      const now = Date.now();
      const expiresAt = now + PremiumConstants.ACCESS_DURATION;

      // Crea una sessione premium per i test
      const session: PremiumSessionI = {
        accessCode: voucherCode,
        expiresAt,
        startedAt: now,
      };

      // Salva la sessione nel database
      try {
        await premiumDatabaseService.createPremiumSession(session);
      } catch (error) {
        console.error("Errore nella creazione della sessione di test:", error);
      }

      const response: VerifyVoucherResponse = {
        success: true,
        valid: true,
        session,
        message: PremiumMessages.ACCESS_GRANTED,
        code: 200,
      };

      return NextResponse.json(response);
    }

    // Verifica reale del voucher nel database Firebase
    let session: PremiumSessionI;
    
    try {
      const voucher = await premiumDatabaseService.getVoucher(voucherCode);

      // Verifica se il voucher esiste
      if (!voucher) {
        return NextResponse.json({
          success: true,
          valid: false,
          message: PremiumMessages.INVALID_VOUCHER,
          code: 200,
        });
      }

      // Verifica se il voucher è già stato usato
      if (voucher.used) {
        return NextResponse.json({
          success: true,
          valid: false,
          message: PremiumMessages.VOUCHER_ALREADY_USED,
          code: 200,
        });
      }

      // Verifica se il voucher è scaduto
      if (premiumDatabaseService.isVoucherExpired(voucher)) {
        return NextResponse.json({
          success: true,
          valid: false,
          message: "Voucher scaduto",
          code: 200,
        });
      }

      // Marca il voucher come usato
      await premiumDatabaseService.markVoucherAsUsed(voucherCode);

      // Crea una sessione premium
      const now = Date.now();
      const expiresAt = now + PremiumConstants.ACCESS_DURATION;

      session = {
        accessCode: voucherCode,
        expiresAt,
        startedAt: now,
      };

      // Salva la sessione nel database
      await premiumDatabaseService.createPremiumSession(session);

    } catch (error) {
      console.error("Errore durante la verifica del voucher:", error);
      return NextResponse.json(
        {
          success: false,
          valid: false,
          message: "Errore durante la verifica del voucher",
          code: 500,
        },
        { status: 500 }
      );
    }

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
