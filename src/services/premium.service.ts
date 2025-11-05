import { ApiService } from "@/src/services";
import { apiPremium } from "@/src/constants/api.constants";
import { PremiumConstants } from "@/src/constants/premium.constants";
import { 
  CreateVoucherRequest, 
  CreateVoucherResponse, 
  VerifyVoucherRequest, 
  VerifyVoucherResponse,
  PremiumVideosResponse,
  PremiumSessionI,
  PremiumVoucherI
} from "@/src/types/premium.types";

export const PremiumService = {
  // Crea un voucher dopo il pagamento
  createVoucher: async (request: CreateVoucherRequest): Promise<CreateVoucherResponse> => {
    try {
      const response = (await ApiService.post(
        apiPremium.CREATE_VOUCHER(),
        request
      )) as CreateVoucherResponse;
      return response;
    } catch (error) {
      console.error("PremiumService createVoucher error", {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : null,
      });
      throw error;
    }
  },

  // Verifica un voucher e crea una sessione
  verifyVoucher: async (request: VerifyVoucherRequest): Promise<VerifyVoucherResponse> => {
    try {
      const response = (await ApiService.post(
        apiPremium.VERIFY_VOUCHER(),
        request
      )) as VerifyVoucherResponse;
      
      if (response?.success && response?.valid && response?.session) {
        PremiumService.saveSession(response.session);
      }
      
      return response;
    } catch (error) {
      console.error("PremiumService verifyVoucher error", {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  // Ottieni i video premium
  getPremiumVideos: async (): Promise<PremiumVideosResponse> => {
    try {
      const response = (await ApiService.get(
        apiPremium.VIDEOS()
      )) as PremiumVideosResponse;
      return response;
    } catch (error) {
      console.error("PremiumService getPremiumVideos error", {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  // Salva la sessione premium nel localStorage
  saveSession: (session: PremiumSessionI): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PremiumConstants.PREMIUM_SESSION_KEY, JSON.stringify(session));
    }
  },

  // Ottieni la sessione corrente dal localStorage
  getSession: (): PremiumSessionI | null => {
    if (typeof window !== 'undefined') {
      const sessionStr = localStorage.getItem(PremiumConstants.PREMIUM_SESSION_KEY);
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr) as PremiumSessionI;
          // Controlla se la sessione è ancora valida
          if (session.expiresAt > Date.now()) {
            return session;
          } else {
            // Rimuovi la sessione scaduta
            PremiumService.clearSession();
          }
        } catch (error) {
          console.error("Error parsing premium session", error);
          PremiumService.clearSession();
        }
      }
    }
    return null;
  },

  // Rimuovi la sessione dal localStorage
  clearSession: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(PremiumConstants.PREMIUM_SESSION_KEY);
    }
  },

  // Controlla se l'utente ha accesso premium
  hasAccess: (): boolean => {
    const session = PremiumService.getSession();
    return session !== null && session.expiresAt > Date.now();
  },

  // Ottieni il tempo rimanente dell'accesso in millisecondi
  getTimeRemaining: (): number => {
    const session = PremiumService.getSession();
    if (session) {
      return Math.max(0, session.expiresAt - Date.now());
    }
    return 0;
  },

  // Formatta il tempo rimanente in una stringa leggibile
  formatTimeRemaining: (): string => {
    const timeRemaining = PremiumService.getTimeRemaining();
    if (timeRemaining <= 0) return "Expired";
    
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  },

  // Salva un voucher usato per evitare riutilizzo
  markVoucherAsUsed: (voucherCode: string): void => {
    if (typeof window !== 'undefined') {
      const usedVouchersStr = localStorage.getItem(PremiumConstants.USED_VOUCHERS_KEY) || '[]';
      try {
        const usedVouchers = JSON.parse(usedVouchersStr) as string[];
        if (!usedVouchers.includes(voucherCode)) {
          usedVouchers.push(voucherCode);
          localStorage.setItem(PremiumConstants.USED_VOUCHERS_KEY, JSON.stringify(usedVouchers));
        }
      } catch (error) {
        console.error("Error saving used voucher", error);
      }
    }
  },

  // Controlla se un voucher è già stato usato localmente
  isVoucherUsed: (voucherCode: string): boolean => {
    if (typeof window !== 'undefined') {
      const usedVouchersStr = localStorage.getItem(PremiumConstants.USED_VOUCHERS_KEY) || '[]';
      try {
        const usedVouchers = JSON.parse(usedVouchersStr) as string[];
        return usedVouchers.includes(voucherCode);
      } catch (error) {
        console.error("Error checking used voucher", error);
      }
    }
    return false;
  },
};
