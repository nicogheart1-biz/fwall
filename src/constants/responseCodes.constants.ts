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
};
