"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components";
import { PaymentService } from "@/src/services/payment.service";
import { PremiumService } from "@/src/services/premium.service";
import {
  PremiumConstants,
  PremiumMessages,
} from "@/src/constants/premium.constants";
import { usePremium } from "@/src/hooks/usePremium";
import { useAppStore } from "@/src/store/app/app.store";
import { ToastStatusEnum } from "@/src/enums/toast.enum";
import { CreditCardIcon, StarIcon } from "@heroicons/react/24/solid";
import { AnalyticsUtils } from "@/src/utils/analytics.utils";
import { AnalyticsEventEnum } from "@/src/enums/analytics.enums";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type PremiumCheckoutFormI = {
  onSuccess?: (voucherCode: string) => void;
};

const PremiumCheckoutForm = (props: PremiumCheckoutFormI) => {
  const { onSuccess } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { refreshAccess } = usePremium();
  const { showToast } = useAppStore();

  // Crea il payment intent al mount del componente
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await PaymentService.createPremiumPaymentIntent();
        if (response.success) {
          setClientSecret(response.clientSecret);
        } else {
          showToast({
            type: ToastStatusEnum.ERROR,
            message: "Errore nell'inizializzazione del pagamento",
          });
        }
      } catch (error) {
        console.error("Errore nella creazione del payment intent:", error);
        showToast({
          type: ToastStatusEnum.ERROR,
          message: "Errore nell'inizializzazione del pagamento",
        });
      }
    };

    createPaymentIntent();
  }, [showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log payment started
    AnalyticsUtils.logEvent(AnalyticsEventEnum.PREMIUM_PAYMENT_STARTED, {
      price: PremiumConstants.DAILY_ACCESS_PRICE / 100,
      method: "stripe_card",
    });

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        // Log payment failed
        AnalyticsUtils.logEvent(AnalyticsEventEnum.PREMIUM_PAYMENT_FAILED, {
          error: error.message || "Unknown error",
          price: PremiumConstants.DAILY_ACCESS_PRICE / 100,
        });
        
        showToast({
          type: ToastStatusEnum.ERROR,
          message: error.message || PremiumMessages.PAYMENT_ERROR,
        });
      } else if (paymentIntent.status === "succeeded") {
        try {
          const voucherResponse = await PremiumService.createVoucher({
            paymentIntentId: paymentIntent.id,
          });

          if (voucherResponse.success && voucherResponse.voucher) {
            // Log voucher created successfully
            AnalyticsUtils.logEvent(AnalyticsEventEnum.PREMIUM_VOUCHER_CREATED, {
              voucher_code: voucherResponse.voucher.code,
              payment_intent_id: paymentIntent.id,
            });
            
            showToast({
              type: ToastStatusEnum.SUCCESS,
              message: PremiumMessages.PAYMENT_SUCCESS,
            });

            try {
              const accessResponse = await PremiumService.verifyVoucher({
                code: voucherResponse.voucher.code,
              });

              if (accessResponse.success && accessResponse.valid) {
                refreshAccess();
                onSuccess?.(voucherResponse.voucher.code);
              }
            } catch (accessError) {
              console.error("Errore nell'attivazione automatica:", accessError);
              onSuccess?.(voucherResponse.voucher.code);
            }
          } else {
            showToast({
              type: ToastStatusEnum.ERROR,
              message: voucherResponse.message || 
                "Pagamento completato ma errore nella generazione del codice di accesso",
            });
          }
        } catch (voucherError) {
          console.error("Errore nella creazione del voucher:", voucherError);
          showToast({
            type: ToastStatusEnum.ERROR,
            message:
              "Pagamento completato ma errore nella generazione del codice di accesso",
          });
        }
      }
    } catch (error) {
      console.error("Errore nel pagamento:", error);
      showToast({
        type: ToastStatusEnum.ERROR,
        message: PremiumMessages.PAYMENT_ERROR,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div className="bg-white-100 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <StarIcon className="size-10 text-secondary-500" />
          <h3 className="text-2xl font-semibold text-primary-900">
            Premium Access 24h
          </h3>
        </div>

        <div className="bg-secondary-500/10 border-2 border-secondary-200 rounded-lg p-4 mb-4 shadow">
          <div className="flex justify-between items-center">
            <span className="text-primary-700 font-bold text-xl">Daily access</span>
            <span className="text-2xl font-bold text-secondary-500 font-underline">
              ${(PremiumConstants.DAILY_ACCESS_PRICE / 100).toFixed(2)}
            </span>
          </div>
          <ul className="text-lg text-gray-600 mt-2 space-y-1">
            <li>• 24h unlimited access</li>
            <li>• Exclusive premium videos</li>
            <li>• No registration required</li>
            <li>• 100% anonymous access</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border border-primary-500 rounded-md p-3 shadow">
          <div className="flex items-center gap-2 mb-3">
            <CreditCardIcon className="h-5 w-5 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Credit Card Information
            </label>
          </div>
          <CardElement options={cardElementOptions} />
        </div>

        <Button
          type="submit"
          primary
          full
          label={
            isLoading
              ? "Processing payment..."
              : `Pay $${(PremiumConstants.DAILY_ACCESS_PRICE / 100).toFixed(2)}`
          }
          disabled={!stripe || !clientSecret || isLoading}
          isLoading={isLoading}
        />
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Secure Payment via Stripe</p>
        <p>You&apos;ll receive a voucher after completing the payment</p>
      </div>
    </div>
  );
};

type PremiumCheckoutI = {
  onSuccess?: (voucherCode: string) => void;
};

const PremiumCheckout = (props: PremiumCheckoutI) => {
  return (
    <Elements stripe={stripePromise}>
      <PremiumCheckoutForm {...props} />
    </Elements>
  );
};

export default PremiumCheckout;
