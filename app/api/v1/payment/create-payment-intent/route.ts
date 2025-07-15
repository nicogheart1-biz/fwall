import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ResponseCodesConstants } from "@/src/constants";
import { jsonErrorResponse } from "@/server/api.utils.server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, amount, currency = "eur" } = body;

    console.log(`API POST payment/create-payment-intent`, {
      userId,
      amount,
      currency,
    });

    if (!amount || amount <= 0) {
      return jsonErrorResponse(400, {
        code: ResponseCodesConstants.PAYMENT_INTENT_BAD_REQUEST.code,
        success: false,
      });
    }

    // Crea il Payment Intent con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // amount dovrebbe già essere in centesimi
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        code: ResponseCodesConstants.PAYMENT_INTENT_SUCCESS.code,
        clientSecret: paymentIntent.client_secret,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return jsonErrorResponse(500, {
      code: ResponseCodesConstants.PAYMENT_INTENT_ERROR.code,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
