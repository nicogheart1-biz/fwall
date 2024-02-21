import { User } from "firebase/auth";
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

  // region USER
  USER: (isMock?: boolean): string => `${apiBase.V1(isMock)}/user`,
  // endregion USER
};

export const apiUser = {
  SIGNUP: (isMock?: boolean): string => `${apiControllers.USER(isMock)}/signup`,
  DETAILS: (uid: User["uid"], isMock?: boolean): string =>
    `${apiControllers.USER(isMock)}/${isMock ? "user" : uid}`,
  TERMS: (uid: User["uid"], isMock?: boolean): string =>
    `${apiControllers.USER(isMock)}/${uid}/terms`,
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
