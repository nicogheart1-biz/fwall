import { isServer } from "@/src/utils/common.utils";
import { isMocked, isReleased } from "@/src/utils/envs.utils";
import { FirebaseConstants } from "@/src/constants/firebase.constants";
import { CmsContentType } from "@/src/enums/cms.enums";

const checkIfIsMock = (isMock: boolean): boolean =>
  (isMock || isMocked) && !isReleased;

const apiRoot = {
  MOCKS: "http://localhost:3000",
  RELEASE: isServer ? "" : `${window.location.origin}`,
  FIRESTORE_DB: `https://firestore.googleapis.com/v1/projects/${FirebaseConstants.projectId}/databases/(default)/documents`,
};

const getEnv = (isMock: boolean) => {
  if (isReleased) {
    return apiRoot.RELEASE;
  }
  if (checkIfIsMock(isMock)) {
    return apiRoot.MOCKS;
  }
  return apiRoot.RELEASE;
};

const apiBase = {
  V1: (isMock = false) => `${getEnv(isMock)}/api/v1`,
};

const apiControllers = {
  // region CMS
  CONTENT: (
    contentType: CmsContentType,
    contentId: string,
    isMock?: boolean
  ): string => `${apiBase.V1(isMock)}/cms/${contentType}/${contentId}`,
  // endregion CMS

  // region reCAPTCHA
  VALIDATE: (isMock?: boolean): string =>
    `${apiBase.V1(isMock)}/validate-recaptcha`,
  // endregion reCAPTCHA

  // region PAYMENT
  CREATE_PAYMENT_INTENT: (isMock?: boolean): string =>
    `${apiBase.V1(isMock)}/payment/create-payment-intent`,
  VERIFY_PAYMENT_INTENT: (isMock?: boolean): string =>
    `${apiBase.V1(isMock)}/payment/verify-payment-intent`,
  PAYMENT_INTENT: (paymentIntentId?: string, isMock?: boolean): string =>
    `${apiBase.V1(isMock)}/payment/intent${
      paymentIntentId ? `/${paymentIntentId}` : ""
    }`,
  // endregion PAYMENT

  // region PREMIUM
  CREATE_VOUCHER: (isMock?: boolean): string =>
    `${apiBase.V1(isMock)}/premium/create-voucher`,
  VERIFY_VOUCHER: (isMock?: boolean): string =>
    `${apiBase.V1(isMock)}/premium/verify-voucher`,
  PREMIUM_VIDEOS: (isMock?: boolean): string =>
    `${apiBase.V1(isMock)}/premium/videos`,
  // endregion PREMIUM

  VIDEO_PROVIDERS: (isMock?: boolean): string =>
    `${apiBase.V1(isMock)}/video-providers`,
};

export const apiRecaptcha = {
  VALIDATE: (isMock?: boolean): string => apiControllers.VALIDATE(isMock),
};

export const apiCms = {
  CONTENT: (
    contentType: CmsContentType,
    contentId: string,
    isMock?: boolean
  ): string => apiControllers.CONTENT(contentType, contentId, isMock),
  CONTENT_SSR: (pathToDocument: string) =>
    `${apiRoot.FIRESTORE_DB}/${pathToDocument}`,
};

export const apiVideoProvider = {
  PORNHUB: (isMock?: boolean) =>
    `${apiControllers.VIDEO_PROVIDERS(isMock)}/pornhub`,
};

export const apiPayment = {
  CREATE_INTENT: (isMock?: boolean): string =>
    apiControllers.CREATE_PAYMENT_INTENT(isMock),
  VERIFY_INTENT: (isMock?: boolean): string =>
    apiControllers.VERIFY_PAYMENT_INTENT(isMock),
  INTENT: (paymentIntentId?: string, isMock?: boolean): string =>
    apiControllers.PAYMENT_INTENT(paymentIntentId, isMock),
};

export const apiPremium = {
  CREATE_VOUCHER: (isMock?: boolean): string =>
    apiControllers.CREATE_VOUCHER(isMock),
  VERIFY_VOUCHER: (isMock?: boolean): string =>
    apiControllers.VERIFY_VOUCHER(isMock),
  VIDEOS: (isMock?: boolean): string =>
    apiControllers.PREMIUM_VIDEOS(isMock),
};
