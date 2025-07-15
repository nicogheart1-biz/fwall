export const PremiumConstants = {
  // Prezzo dell'accesso giornaliero in centesimi ($0.99 = 99 centesimi)
  DAILY_ACCESS_PRICE: 99,
  // Valuta
  CURRENCY: 'usd',
  // Durata dell'accesso in millisecondi (24 ore)
  ACCESS_DURATION: 24 * 60 * 60 * 1000,
  // Chiave localStorage per la sessione premium
  PREMIUM_SESSION_KEY: 'fwall_premium_session',
  // Chiave localStorage per i voucher usati
  USED_VOUCHERS_KEY: 'fwall_used_vouchers',
};

export const PremiumMessages = {
  ACCESS_GRANTED: 'Accesso premium attivato con successo!',
  ACCESS_EXPIRED: 'Il tuo accesso premium è scaduto.',
  INVALID_VOUCHER: 'Codice di accesso non valido.',
  VOUCHER_ALREADY_USED: 'Questo codice è già stato utilizzato.',
  PAYMENT_SUCCESS: 'Pagamento completato con successo!',
  PAYMENT_ERROR: 'Errore durante il pagamento. Riprova.',
};
