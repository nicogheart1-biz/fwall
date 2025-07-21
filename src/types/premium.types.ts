export type PremiumVoucherI = {
  code: string;
  createdAt: number;
  expiresAt: number;
  used: boolean;
  paymentIntentId?: string;
};

export type PremiumSessionI = {
  accessCode: string;
  expiresAt: number;
  startedAt: number;
};

export type CreateVoucherRequest = {
  paymentIntentId: string;
};

export type CreateVoucherResponse = {
  success: boolean;
  voucher: PremiumVoucherI | null;
  code: number;
  message?: string;
};

export type VerifyVoucherRequest = {
  code: string;
};

export type VerifyVoucherResponse = {
  success: boolean;
  valid: boolean;
  session?: PremiumSessionI;
  message: string;
  code: number;
};

export type PremiumVideoI = {
  id: string;
  title: string;
  cover: string;
  duration: string;
  provider: string;
  embedUrl: string;
  premium: true;
  description?: string;
};

export type PremiumVideosResponse = {
  success: boolean;
  videos: PremiumVideoI[];
  code: number;
};
