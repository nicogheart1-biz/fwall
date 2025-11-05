import { initAdmin } from "@/server/firebaseAdmin";
import admin from "firebase-admin";
import { PremiumVoucherI, PremiumSessionI } from "@/src/types/premium.types";

export class PremiumDatabaseService {
  private static instance: PremiumDatabaseService;
  private db: admin.database.Database | null = null;

  private constructor() {}

  public static getInstance(): PremiumDatabaseService {
    if (!PremiumDatabaseService.instance) {
      PremiumDatabaseService.instance = new PremiumDatabaseService();
    }
    return PremiumDatabaseService.instance;
  }

  private async getDatabase(): Promise<admin.database.Database> {
    if (!this.db) {
      const app = await initAdmin();
      if (!app) {
        throw new Error("Impossibile inizializzare Firebase Admin");
      }
      this.db = app.database();
    }
    return this.db;
  }

  /**
   * Crea un nuovo voucher nel database
   */
  async createVoucher(voucher: PremiumVoucherI): Promise<PremiumVoucherI> {
    try {
      const db = await this.getDatabase();
      const voucherRef = db.ref(`vouchers/${voucher.code}`);
      
      // Verifica se il voucher esiste già
      const snapshot = await voucherRef.once('value');
      if (snapshot.exists()) {
        throw new Error('Voucher già esistente');
      }

      // Salva il voucher
      await voucherRef.set(voucher);
      
      console.log(`Voucher creato: ${voucher.code}`);
      return voucher;
    } catch (error) {
      console.error('Errore durante la creazione del voucher:', error);
      throw error;
    }
  }

  /**
   * Verifica se un voucher esiste ed è valido
   */
  async getVoucher(code: string): Promise<PremiumVoucherI | null> {
    try {
      const db = await this.getDatabase();
      const voucherRef = db.ref(`vouchers/${code}`);
      const snapshot = await voucherRef.once('value');
      
      if (!snapshot.exists()) {
        return null;
      }

      return snapshot.val() as PremiumVoucherI;
    } catch (error) {
      console.error('Errore durante il recupero del voucher:', error);
      throw error;
    }
  }

  /**
   * Marca un voucher come usato
   */
  async markVoucherAsUsed(code: string): Promise<void> {
    try {
      const db = await this.getDatabase();
      const voucherRef = db.ref(`vouchers/${code}`);
      
      // Aggiorna solo il campo "used" e aggiunge il timestamp di utilizzo
      await voucherRef.update({
        used: true,
        usedAt: Date.now()
      });
      
      console.log(`Voucher marcato come usato: ${code}`);
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del voucher:', error);
      throw error;
    }
  }

  /**
   * Verifica se un voucher è scaduto
   */
  isVoucherExpired(voucher: PremiumVoucherI): boolean {
    return Date.now() > voucher.expiresAt;
  }

  /**
   * Salva una sessione premium nel database
   */
  async createPremiumSession(session: PremiumSessionI): Promise<void> {
    try {
      const db = await this.getDatabase();
      // Usa l'accessCode come ID della sessione
      const sessionRef = db.ref(`premium_sessions/${session.accessCode}`);
      
      await sessionRef.set(session);
      
      console.log(`Sessione premium creata: ${session.accessCode}`);
    } catch (error) {
      console.error('Errore durante la creazione della sessione premium:', error);
      throw error;
    }
  }

  /**
   * Recupera una sessione premium
   */
  async getPremiumSession(accessCode: string): Promise<PremiumSessionI | null> {
    try {
      const db = await this.getDatabase();
      const sessionRef = db.ref(`premium_sessions/${accessCode}`);
      const snapshot = await sessionRef.once('value');
      
      if (!snapshot.exists()) {
        return null;
      }

      return snapshot.val() as PremiumSessionI;
    } catch (error) {
      console.error('Errore durante il recupero della sessione premium:', error);
      throw error;
    }
  }

  /**
   * Verifica se una sessione premium è scaduta
   */
  isSessionExpired(session: PremiumSessionI): boolean {
    return Date.now() > session.expiresAt;
  }

  /**
   * Pulisce i voucher scaduti (funzione di manutenzione)
   */
  async cleanupExpiredVouchers(): Promise<number> {
    try {
      const db = await this.getDatabase();
      const vouchersRef = db.ref('vouchers');
      const snapshot = await vouchersRef.once('value');
      
      if (!snapshot.exists()) {
        return 0;
      }

      const vouchers = snapshot.val();
      const now = Date.now();
      let deletedCount = 0;
      const updates: { [key: string]: null } = {};

      for (const [code, voucher] of Object.entries(vouchers as Record<string, PremiumVoucherI>)) {
        if (now > voucher.expiresAt) {
          updates[code] = null;
          deletedCount++;
        }
      }

      if (deletedCount > 0) {
        await vouchersRef.update(updates);
        console.log(`Eliminati ${deletedCount} voucher scaduti`);
      }

      return deletedCount;
    } catch (error) {
      console.error('Errore durante la pulizia dei voucher scaduti:', error);
      throw error;
    }
  }

  /**
   * Pulisce le sessioni scadute (funzione di manutenzione)
   */
  async cleanupExpiredSessions(): Promise<number> {
    try {
      const db = await this.getDatabase();
      const sessionsRef = db.ref('premium_sessions');
      const snapshot = await sessionsRef.once('value');
      
      if (!snapshot.exists()) {
        return 0;
      }

      const sessions = snapshot.val();
      const now = Date.now();
      let deletedCount = 0;
      const updates: { [key: string]: null } = {};

      for (const [code, session] of Object.entries(sessions as Record<string, PremiumSessionI>)) {
        if (now > session.expiresAt) {
          updates[code] = null;
          deletedCount++;
        }
      }

      if (deletedCount > 0) {
        await sessionsRef.update(updates);
        console.log(`Eliminate ${deletedCount} sessioni scadute`);
      }

      return deletedCount;
    } catch (error) {
      console.error('Errore durante la pulizia delle sessioni scadute:', error);
      throw error;
    }
  }

  /**
   * Genera un codice voucher univoco
   */
  generateVoucherCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Formato: XXXX-XXXX-XXXX
    return `${result.slice(0, 4)}-${result.slice(4, 8)}-${result.slice(8, 12)}`;
  }

  /**
   * Verifica il formato del codice voucher
   */
  isValidVoucherFormat(code: string): boolean {
    const voucherFormat = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    return voucherFormat.test(code);
  }

  /**
   * Verifica se un paymentIntentId è già stato utilizzato per creare un voucher
   */
  async isPaymentIntentAlreadyUsed(paymentIntentId: string): Promise<boolean> {
    try {
      const db = await this.getDatabase();
      const vouchersRef = db.ref('vouchers');
      const snapshot = await vouchersRef.orderByChild('paymentIntentId').equalTo(paymentIntentId).once('value');
      
      return snapshot.exists();
    } catch (error) {
      console.error('Errore durante la verifica del paymentIntentId:', error);
      throw error;
    }
  }
}

export const premiumDatabaseService = PremiumDatabaseService.getInstance();
