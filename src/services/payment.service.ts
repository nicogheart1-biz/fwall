import { ApiService } from "@/src/services";
import { apiPayment } from "@/src/constants/api.constants";

export type CreatePaymentIntentRequest = {
  user?: string;
  amount: number;
  currency: string;
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
};
