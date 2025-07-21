export const PremiumConstants = {
  // Prezzo dell'accesso giornaliero in centesimi ($1.49 = 149 centesimi)
  DAILY_ACCESS_PRICE: 149,
  // Valuta
  CURRENCY: 'usd',
  // Durata dell'accesso in millisecondi (24 ore)
  ACCESS_DURATION: 24 * 60 * 60 * 1000,
  // Durata di validità del voucher in millisecondi (30 giorni)
  VOUCHER_VALIDITY_DURATION: 30 * 24 * 60 * 60 * 1000,
  // Chiave localStorage per la sessione premium
  PREMIUM_SESSION_KEY: 'fwall_premium_session',
  // Chiave localStorage per i voucher usati
  USED_VOUCHERS_KEY: 'fwall_used_vouchers',
};

export const PremiumMessages = {
  ACCESS_GRANTED: 'Premium access granted for 24 hours.',
  ACCESS_EXPIRED: 'Your premium access has expired.',
  INVALID_VOUCHER: 'Access denied. Invalid voucher code.',
  VOUCHER_ALREADY_USED: 'This voucher has already been used.',
  PAYMENT_SUCCESS: 'Payment successful!',
  PAYMENT_ERROR: 'Payment failed. Please try again.',
};
