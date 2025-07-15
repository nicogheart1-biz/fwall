import { NextResponse } from "next/server";

import { ErrorI } from "@/src/types/error.types";
import { NextURL } from "next/dist/server/web/next-url";
import Stripe from "stripe";

// Inizializzazione Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export type StripePaymentVerificationResult = {
  verified: true;
  amount: number;
  currency: string;
  status: string;
  userId?: string;
  created: number;
  id: string;
  succeeded: boolean;
};

/**
 * Verifica lo stato di un payment intent con Stripe
 * @param paymentId - ID del payment intent da verificare
 * @param userId - ID dell'utente che deve possedere il payment intent
 * @returns Risultato della verifica con dettagli del pagamento
 */
export const verifyPaymentWithStripe = async (
  paymentId: string,
  userId?: string
): Promise<StripePaymentVerificationResult> => {
  try {
    // Verifica lo stato del payment intent con Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (!paymentIntent) {
      throw new Error("Payment intent not found");
    }

    // Verifica che il payment intent appartenga all'utente autenticato
    if (userId && paymentIntent.metadata?.userId !== userId) {
      throw new Error(
        "Payment intent does not belong to the authenticated user"
      );
    }

    return {
      verified: true,
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      userId: paymentIntent.metadata?.userId,
      created: paymentIntent.created,
      succeeded: paymentIntent.status === "succeeded",
    };
  } catch (error) {
    console.error("Stripe payment verification failed:", error);
    throw error;
  }
};

export const jsonErrorResponse = (status: number = 500, response: ErrorI) =>
  NextResponse.json(response, { status });

export const getPagination = (
  nextUrl: NextURL,
  pageSize?: number,
  limit = 25
): { from: number; to: number; page: number; itemPerPage: number } => {
  const page = parseInt(nextUrl?.searchParams?.get("page") || "") || 1;
  const itemPerPage = Math.min(
    pageSize || parseInt(nextUrl?.searchParams?.get("pageSize") || "") || 10,
    limit
  );

  return {
    from: Math.max(0, itemPerPage * page - itemPerPage),
    to: Math.max(0, itemPerPage * page - 1),
    page,
    itemPerPage,
  };
};

export const getQueryParams = (url: string, blacklist: string[] = []) => {
  const params = new URL(url).searchParams;
  const queryObject = Object.fromEntries(params.entries());

  blacklist.forEach((key) => delete queryObject[key]);

  return queryObject;
};
