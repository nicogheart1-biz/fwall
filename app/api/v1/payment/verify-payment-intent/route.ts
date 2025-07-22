import { NextRequest, NextResponse } from "next/server";
import { ResponseCodesConstants } from "@/src/constants";
import Stripe from "stripe";
import { jsonErrorResponse, verifyPaymentWithStripe } from "@/server/api.utils.server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentIntentId = searchParams.get("payment_intent");
    const userId = searchParams.get("user_id");

    console.log(`API GET payment/verify-payment-intent`, { paymentIntentId, userId });

    if (!paymentIntentId) {
      return jsonErrorResponse(400, {
        code: ResponseCodesConstants.PAYMENT_INTENT_BAD_REQUEST.code,
        success: false,
      });
    }

const paymentData = await verifyPaymentWithStripe(paymentIntentId, userId || undefined);

    return NextResponse.json(
      {
        code: ResponseCodesConstants.PAYMENT_INTENT_SUCCESS.code,
        data: paymentData,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying payment intent:", error);
    
    // Gestione errori specifici di Stripe
    if (error instanceof Stripe.errors.StripeError) {
      if (error.code === 'resource_missing') {
        return jsonErrorResponse(404, {
          code: ResponseCodesConstants.PAYMENT_INTENT_NOT_FOUND.code,
          success: false,
          error: "Payment intent not found",
        });
      }
    }

    return jsonErrorResponse(500, {
      code: ResponseCodesConstants.PAYMENT_INTENT_ERROR.code,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
