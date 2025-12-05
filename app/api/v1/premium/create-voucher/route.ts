import { NextRequest, NextResponse } from "next/server";
import { CreateVoucherRequest, CreateVoucherResponse, PremiumVoucherI } from "@/src/types/premium.types";
import { PremiumConstants } from "@/src/constants/premium.constants";
import { premiumDatabaseService } from "@/src/services/premium.database.service";
import { PaymentService } from "@/src/services/payment.service";

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
          message: "Payment Intent ID è obbligatorio",
        },
        { status: 400 }
      );
    }

    // 1. Verificare che il payment intent sia effettivamente riuscito con Stripe
    try {
      const paymentVerification = await PaymentService.verifyPaymentIntent(paymentIntentId);
      
      if (!paymentVerification.success) {
        return NextResponse.json(
          {
            success: false,
            voucher: null,
            code: 400,
            message: "Payment Intent non valido",
          },
          { status: 400 }
        );
      }

      // Verifica che il pagamento sia stato completato con successo
      if (!paymentVerification.data.succeeded || paymentVerification.data.status !== 'succeeded') {
        return NextResponse.json(
          {
            success: false,
            voucher: null,
            code: 400,
            message: "Il pagamento non è stato completato con successo",
          },
          { status: 400 }
        );
      }

      // Verifica che l'importo corrisponda al prezzo premium
      if (paymentVerification.data.amount !== PremiumConstants.DAILY_ACCESS_PRICE) {
        return NextResponse.json(
          {
            success: false,
            voucher: null,
            code: 400,
            message: "L'importo del pagamento non corrisponde al prezzo premium",
          },
          { status: 400 }
        );
      }

    } catch (error) {
      console.error("Errore durante la verifica del payment intent:", error);
      return NextResponse.json(
        {
          success: false,
          voucher: null,
          code: 500,
          message: "Errore durante la verifica del pagamento",
        },
        { status: 500 }
      );
    }

    // 2. Controllare che non sia già stato usato per creare un voucher
    try {
      const isAlreadyUsed = await premiumDatabaseService.isPaymentIntentAlreadyUsed(paymentIntentId);
      
      if (isAlreadyUsed) {
        return NextResponse.json(
          {
            success: false,
            voucher: null,
            code: 409,
            message: "Questo pagamento è già stato utilizzato per creare un voucher",
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error("Errore durante la verifica dell'utilizzo del payment intent:", error);
      return NextResponse.json(
        {
          success: false,
          voucher: null,
          code: 500,
          message: "Errore durante la verifica dell'utilizzo del pagamento",
        },
        { status: 500 }
      );
    }
    
    const now = Date.now();
    const expiresAt = now + PremiumConstants.VOUCHER_VALIDITY_DURATION; // Durata validità voucher (diversa dall'accesso)
    
    // Genera un codice voucher univoco
    const voucherCode = premiumDatabaseService.generateVoucherCode();
    
    const voucher: PremiumVoucherI = {
      code: voucherCode,
      createdAt: now,
      expiresAt,
      used: false,
      paymentIntentId,
    };

    // Salva il voucher nel database Firebase
    try {
      await premiumDatabaseService.createVoucher(voucher);
    } catch (error) {
      console.error("Errore durante la creazione del voucher:", error);
      return NextResponse.json(
        {
          success: false,
          voucher: null,
          code: 500,
        },
        { status: 500 }
      );
    }

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
