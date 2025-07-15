import { ApiService } from "@/src/services";
import { apiPayment } from "@/src/constants/api.constants";
import { PremiumConstants } from "@/src/constants/premium.constants";

export type CreatePaymentIntentRequest = {
  user?: string;
  amount: number;
  currency: string;
  metadata?: {
    type?: 'premium_access';
    duration?: string;
    [key: string]: any;
  };
};

export type CreatePaymentIntentResponse = {
  success: boolean;
  clientSecret: string;
  code: number;
};

export type VerifyPaymentIntentResponse = {
  success: boolean;
  data: {
    id: string;
    status: string;
    amount: number;
    currency: string;
    userId?:string;
    created: number;
    succeeded: boolean;
    metadata?: {
      type?: string;
      [key: string]: any;
    };
  };
  code: number;
};

export const PaymentService = {
  createPaymentIntent: async (request: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> => {
    try {
      const response = (await ApiService.post(
        apiPayment.CREATE_INTENT(),
        request
      )) as CreatePaymentIntentResponse;
      return response;
    } catch (error) {
      console.error("PaymentService createPaymentIntent error", {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : null,
      });
      throw error;
    }
  },

  verifyPaymentIntent: async (paymentIntentId: string): Promise<VerifyPaymentIntentResponse> => {
    try {
      const response = (await ApiService.get(
        `${apiPayment.VERIFY_INTENT()}?payment_intent=${encodeURIComponent(paymentIntentId)}`
      )) as VerifyPaymentIntentResponse;
      return response;
    } catch (error) {
      console.error("PaymentService verifyPaymentIntent error", {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  // Crea un payment intent per l'accesso premium giornaliero
  createPremiumPaymentIntent: async (): Promise<CreatePaymentIntentResponse> => {
    const request: CreatePaymentIntentRequest = {
      amount: PremiumConstants.DAILY_ACCESS_PRICE,
      currency: PremiumConstants.CURRENCY,
      metadata: {
        type: 'premium_access',
        duration: '24h'
      }
    };
    
    return PaymentService.createPaymentIntent(request);
  },
};
