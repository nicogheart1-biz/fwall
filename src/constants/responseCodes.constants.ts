import { ErrorI } from "@/src/types/error.types";

export const ResponseCodesConstants: { [key: string]: ErrorI } = {
  GENERIC_ERROR: {
    code: 1001,
  },

  // region CMS
  CMS_CONTENT_SUCCESS: {
    code: 6001,
  },
  CMS_CONTENT_ERROR: {
    code: 6002,
  },
  CMS_CONTENT_BAD_REQUEST: {
    code: 6003,
  },
  CMS_CONTENT_METHOD_NOT_ALLOWED: {
    code: 6006,
  },
  // endregion CMS

  // region reCAPTCHA
  RECAPTCHA_VALIDATE_SUCCESS: {
    code: 7001,
  },
  RECAPTCHA_VALIDATE_ERROR: {
    code: 7002,
  },
  RECAPTCHA_VALIDATE_BAD_REQUEST: {
    code: 7003,
  },
  RECAPTCHA_VALIDATE_METHOD_NOT_ALLOWED: {
    code: 7006,
  },
  // endregion reCAPTCHA

  // region PAYMENT
  PAYMENT_INTENT_SUCCESS: {
    code: 8001,
  },
  PAYMENT_INTENT_ERROR: {
    code: 8002,
  },
  PAYMENT_INTENT_BAD_REQUEST: {
    code: 8003,
  },
  PAYMENT_INTENT_NOT_FOUND: {
    code: 8004,
  },
  PAYMENT_INTENT_METHOD_NOT_ALLOWED: {
    code: 8006,
  },
  // endregion PAYMENT

  // region PREMIUM
  PREMIUM_VOUCHER_SUCCESS: {
    code: 9001,
  },
  PREMIUM_VOUCHER_ERROR: {
    code: 9002,
  },
  PREMIUM_VOUCHER_BAD_REQUEST: {
    code: 9003,
  },
  PREMIUM_VOUCHER_NOT_FOUND: {
    code: 9004,
  },
  PREMIUM_VOUCHER_EXPIRED: {
    code: 9005,
  },
  PREMIUM_VOUCHER_ALREADY_USED: {
    code: 9006,
  },
  PREMIUM_VIDEOS_SUCCESS: {
    code: 9101,
  },
  PREMIUM_VIDEOS_ERROR: {
    code: 9102,
  },
  PREMIUM_VIDEOS_BAD_REQUEST: {
    code: 9103,
  },
  PREMIUM_VIDEOS_UNAUTHORIZED: {
    code: 9104,
  },
  // endregion PREMIUM
};
