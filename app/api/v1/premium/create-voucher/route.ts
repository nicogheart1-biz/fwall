import { NextRequest, NextResponse } from "next/server";
import { CreateVoucherRequest, CreateVoucherResponse, PremiumVoucherI } from "@/src/types/premium.types";
import { PremiumConstants } from "@/src/constants/premium.constants";

export async function POST(request: NextRequest) {
  try {
    const body: CreateVoucherRequest = await request.json();
    const { paymentIntentId } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        {
          success: false,
          voucher: null,
          code: 400,
        },
        { status: 400 }
      );
    }

    // In un'implementazione reale, qui dovresti:
    // 1. Verificare che il payment intent sia effettivamente riuscito con Stripe
    // 2. Controllare che non sia già stato usato per creare un voucher
    // 3. Salvare il voucher nel database
    
    // Per ora creiamo un voucher mock
    const now = Date.now();
    const expiresAt = now + PremiumConstants.ACCESS_DURATION;
    
    // Genera un codice voucher univoco (12 caratteri alfanumerici)
    const voucherCode = generateVoucherCode();
    
    const voucher: PremiumVoucherI = {
      code: voucherCode,
      createdAt: now,
      expiresAt,
      used: false,
      paymentIntentId,
    };

    // In un'implementazione reale, salveresti il voucher nel database qui
    // await saveVoucherToDatabase(voucher);

    const response: CreateVoucherResponse = {
      success: true,
      voucher,
      code: 200,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating voucher:", error);
    
    return NextResponse.json(
      {
        success: false,
        voucher: null,
        code: 500,
      },
      { status: 500 }
    );
  }
}

function generateVoucherCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Formato: XXXX-XXXX-XXXX
  return `${result.slice(0, 4)}-${result.slice(4, 8)}-${result.slice(8, 12)}`;
}
